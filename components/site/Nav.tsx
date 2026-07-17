"use client";

import { useState } from "react";
import { FooterNavLink } from "@/lib/types";

export default function Nav({
  companyName,
  navLinks,
  ctaText,
}: {
  companyName: string;
  navLinks: FooterNavLink[];
  ctaText: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-content mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/joja-logo.png"
            alt={companyName}
            className="h-9 sm:h-10 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-slate-600 hover:text-accent-600 text-sm uppercase tracking-widest transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="/start-your-deal" className="btn-primary !px-6 !py-2.5">
            {ctaText}
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden text-slate-900"
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
        <nav className="md:hidden border-t border-slate-200 bg-white px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-slate-600 hover:text-accent-600 text-sm uppercase tracking-widest transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="/start-your-deal" onClick={() => setOpen(false)} className="btn-primary">
            {ctaText}
          </a>
        </nav>
      )}
    </header>
  );
}
