"use client";

import { useState } from "react";
import { FooterNavLink } from "@/lib/types";

export default function Nav({
  companyName,
  navLinks,
}: {
  companyName: string;
  navLinks: FooterNavLink[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-navy-950/85 backdrop-blur border-b border-slate-800/60">
      <div className="max-w-content mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        <a
          href="#home"
          className="font-serif text-lg sm:text-xl text-slate-50 tracking-wide"
        >
          {companyName}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-slate-300 hover:text-gold-400 text-sm uppercase tracking-widest transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary !px-6 !py-2.5">
            Start Your Deal
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden text-slate-100"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-slate-800/60 bg-navy-950 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-gold-400 text-sm uppercase tracking-widest transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary">
            Start Your Deal
          </a>
        </nav>
      )}
    </header>
  );
}
