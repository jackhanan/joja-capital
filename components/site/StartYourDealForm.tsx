"use client";

import { useState } from "react";

const inputClass =
  "w-full border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:border-accent-600 transition-colors";
const labelClass = "block text-slate-600 text-xs uppercase tracking-widest mb-2";

type Status = "idle" | "submitting" | "success" | "error";

export default function StartYourDealForm({
  loanTypeOptions,
  propertyTypeOptions,
}: {
  loanTypeOptions: string[];
  propertyTypeOptions: string[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    loanType: "",
    propertyType: "",
    loanSize: "",
    details: "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-slate-200 bg-slate-50 px-8 py-16 text-center">
        <h2 className="font-serif text-2xl text-slate-900 mb-3">Thanks — we&apos;ve got it.</h2>
        <p className="text-slate-600">
          A member of our team will be in touch shortly to discuss your deal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>First Name *</label>
          <input
            required
            type="text"
            className={inputClass}
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Last Name *</label>
          <input
            required
            type="text"
            className={inputClass}
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Mobile Number *</label>
        <input
          required
          type="tel"
          className={inputClass}
          value={form.mobile}
          onChange={(e) => update("mobile", e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>Email Address *</label>
        <input
          required
          type="email"
          className={inputClass}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Loan Type</label>
          <select
            className={inputClass}
            value={form.loanType}
            onChange={(e) => update("loanType", e.target.value)}
          >
            <option value="">Select...</option>
            {loanTypeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Property Type</label>
          <select
            className={inputClass}
            value={form.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
          >
            <option value="">Select...</option>
            {propertyTypeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Loan Size</label>
        <input
          type="text"
          placeholder="e.g. $2.5M"
          className={inputClass}
          value={form.loanSize}
          onChange={(e) => update("loanSize", e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>What are you looking to close?</label>
        <textarea
          rows={5}
          className={inputClass}
          value={form.details}
          onChange={(e) => update("details", e.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">{errorMessage}</p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-50">
        {status === "submitting" ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
