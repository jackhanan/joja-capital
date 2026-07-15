import Link from "next/link";

export const runtime = "edge";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-navy-950 px-6 text-center">
      <p className="section-eyebrow mb-4">404</p>
      <h1 className="font-serif text-3xl sm:text-4xl text-slate-50 mb-4">
        Page Not Found
      </h1>
      <p className="text-slate-400 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </main>
  );
}
