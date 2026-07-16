"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const SECTIONS = [
  { href: "/studio/dashboard/hero", label: "Hero & Stats" },
  { href: "/studio/dashboard/about", label: "About" },
  { href: "/studio/dashboard/services", label: "Services" },
  { href: "/studio/dashboard/deals", label: "Results / Deals" },
  { href: "/studio/dashboard/team", label: "Team" },
  { href: "/studio/dashboard/contact", label: "Contact / Social" },
  { href: "/studio/dashboard/footer", label: "Footer" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/studio/api/logout", { method: "POST" });
    router.push("/studio");
    router.refresh();
  }

  return (
    <aside className="w-full sm:w-56 shrink-0 border-b sm:border-b-0 sm:border-r border-slate-800/60 sm:min-h-screen">
      <Link href="/" className="block px-6 pt-6 hover:bg-navy-900 transition-colors">
        <p className="text-accent-400 text-[10px] font-semibold uppercase tracking-[0.25em]">
          JOJA Capital
        </p>
        <p className="font-serif text-lg text-slate-50 mt-1">Studio</p>
      </Link>
      <div className="px-6 pt-4 pb-6">
        <Link
          href="/"
          className="btn-secondary !px-4 !py-2 !text-xs w-full sm:w-auto"
        >
          View Site
        </Link>
      </div>
      <nav className="flex sm:flex-col overflow-x-auto sm:overflow-visible px-3 gap-1">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`px-3 py-2.5 text-sm whitespace-nowrap transition-colors ${
              pathname === s.href
                ? "bg-navy-800 text-accent-400"
                : "text-slate-400 hover:text-slate-100 hover:bg-navy-900"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </nav>
      <div className="px-6 py-6 mt-auto">
        <button
          type="button"
          onClick={handleLogout}
          className="text-slate-500 hover:text-red-400 text-xs uppercase tracking-widest transition-colors"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
