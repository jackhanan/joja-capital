import DashboardNav from "@/components/studio/DashboardNav";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-navy-950">
      <DashboardNav />
      <main className="flex-1 px-6 sm:px-12 py-10 max-w-4xl">{children}</main>
    </div>
  );
}
