import { getContent } from "@/lib/content";
import FooterEditor from "@/components/studio/FooterEditor";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function FooterDashboardPage() {
  const footer = await getContent("footer");
  return <FooterEditor initial={footer} />;
}
