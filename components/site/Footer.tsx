import Link from "next/link";
import { FooterContent } from "@/lib/types";

export default function Footer({
  footer,
  companyName,
}: {
  footer: FooterContent;
  companyName: string;
}) {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-content mx-auto px-6 sm:px-10 py-16">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
          <div className="max-w-sm">
            <div className="font-serif text-xl text-slate-900">
              {companyName}
            </div>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed">
              {footer.blurb}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footer.navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-graphite-400 text-xs">{footer.copyrightText}</p>
          <Link
            href="/studio"
            className="text-graphite-300 hover:text-graphite-600 text-xs transition-colors"
          >
            Studio Access
          </Link>
        </div>
      </div>
    </footer>
  );
}
