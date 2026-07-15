import { getContent } from "@/lib/content";
import DealsEditor from "@/components/studio/DealsEditor";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function DealsDashboardPage() {
  const deals = await getContent("deals");
  return <DealsEditor initial={deals} />;
}
