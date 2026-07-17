import { NextRequest, NextResponse } from "next/server";
import { getDB, getResendApiKey } from "@/lib/db";
import { getContent } from "@/lib/content";
import { DealLeadInput } from "@/lib/types";

export const runtime = "edge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendLeadEmail(lead: DealLeadInput, adminEmail: string, apiKey: string) {
  const rows: [string, string][] = [
    ["First Name", lead.firstName],
    ["Last Name", lead.lastName],
    ["Mobile", lead.mobile],
    ["Email", lead.email],
    ["Loan Type", lead.loanType || "—"],
    ["Property Type", lead.propertyType || "—"],
    ["Loan Size", lead.loanSize || "—"],
  ];

  const html = `
    <h2>New "Start Your Deal" submission</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`
        )
        .join("")}
    </table>
    <p><strong>What are you looking to close?</strong></p>
    <p>${escapeHtml(lead.details || "—").replace(/\n/g, "<br/>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "JOJA Capital Leads <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New Deal Submission — ${lead.firstName} ${lead.lastName}`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend API responded ${res.status}: ${body}`);
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Partial<DealLeadInput> | null;
  if (!body) return badRequest("Invalid request body");

  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  // Country code is no longer collected separately -- the mobile field is a
  // single freeform text input, so this column is kept for schema
  // compatibility but always stored empty going forward.
  const countryCode = (body.countryCode ?? "").trim();
  const mobile = (body.mobile ?? "").trim();
  const email = (body.email ?? "").trim();
  const loanType = (body.loanType ?? "").trim();
  const propertyType = (body.propertyType ?? "").trim();
  const loanSize = (body.loanSize ?? "").trim();
  const details = (body.details ?? "").trim();

  if (!firstName) return badRequest("First name is required");
  if (!lastName) return badRequest("Last name is required");
  if (!mobile) return badRequest("Mobile number is required");
  if (!email || !EMAIL_RE.test(email)) return badRequest("A valid email is required");

  const lead: DealLeadInput = {
    firstName,
    lastName,
    countryCode,
    mobile,
    email,
    loanType,
    propertyType,
    loanSize,
    details,
  };

  const db = getDB();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  // Save to D1 first -- this is the source of truth for the lead. Email
  // notification is best-effort on top of it, so a Resend outage never
  // costs us the submission.
  try {
    await db
      .prepare(
        `INSERT INTO leads
          (id, first_name, last_name, country_code, mobile, email, loan_type, property_type, loan_size, details, email_sent, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, 0, ?11)`
      )
      .bind(
        id,
        firstName,
        lastName,
        countryCode,
        mobile,
        email,
        loanType || null,
        propertyType || null,
        loanSize || null,
        details || null,
        createdAt
      )
      .run();
  } catch (err) {
    console.error("Failed to save deal lead to D1:", err);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }

  const apiKey = getResendApiKey();
  if (!apiKey) {
    console.warn(
      `RESEND_API_KEY is not configured -- skipping email notification for lead ${id}. The submission was still saved.`
    );
    return NextResponse.json({ ok: true, emailSent: false });
  }

  try {
    const contact = await getContent("contact");
    await sendLeadEmail(lead, contact.adminEmail, apiKey);
    await db.prepare(`UPDATE leads SET email_sent = 1 WHERE id = ?1`).bind(id).run();
    return NextResponse.json({ ok: true, emailSent: true });
  } catch (err) {
    console.error(`Failed to send Resend notification for lead ${id}:`, err);
    return NextResponse.json({ ok: true, emailSent: false });
  }
}
