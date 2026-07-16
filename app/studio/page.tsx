import LoginForm from "@/components/studio/LoginForm";
import StudioTopBar from "@/components/studio/StudioTopBar";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default function StudioLoginPage() {
  return (
    <>
      <StudioTopBar />
      <main className="min-h-screen flex flex-col items-center justify-center bg-navy-950 px-6">
        <p className="text-accent-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-3">
          Studio Access
        </p>
        <h1 className="font-serif text-2xl text-slate-50 mb-8">
          Sign in to manage site content
        </h1>
        <LoginForm />
      </main>
    </>
  );
}
