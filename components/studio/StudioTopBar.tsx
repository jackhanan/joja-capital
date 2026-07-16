import Link from "next/link";

export default function StudioTopBar() {
  return (
    <div className="fixed top-0 inset-x-0 flex items-center justify-between px-6 sm:px-10 h-20 border-b border-slate-800/60 bg-navy-950">
      <Link href="/" className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/joja-logo-dark-bg.png"
          alt="JOJA Capital"
          className="h-8 sm:h-9 w-auto"
        />
      </Link>
      <Link href="/" className="btn-secondary !px-5 !py-2 !text-xs">
        View Site
      </Link>
    </div>
  );
}
