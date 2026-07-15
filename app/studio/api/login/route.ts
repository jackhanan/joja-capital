import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { ADMIN_COOKIE_NAME, getExpectedSessionToken } from "@/lib/auth";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { password } = await req.json<{ password?: string }>();
  const { env } = getRequestContext();

  if (!password || password !== env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await getExpectedSessionToken(env.ADMIN_PASSWORD);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
