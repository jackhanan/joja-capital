"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/studio/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res
          .json<{ error?: string }>()
          .catch(() => ({ error: undefined }) as { error?: string });
        setError(data.error ?? "Incorrect password");
        setLoading(false);
        return;
      }

      router.push("/studio/dashboard/hero");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
        Admin Password
      </label>
      <input
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-navy-900 border border-slate-700 px-4 py-3 text-slate-100 focus:outline-none focus:border-accent-400 transition-colors"
        placeholder="••••••••"
      />
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-50">
        {loading ? "Signing In…" : "Sign In"}
      </button>
    </form>
  );
}
