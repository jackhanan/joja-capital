import { getContent } from "@/lib/content";
import AboutEditor from "@/components/studio/AboutEditor";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AboutDashboardPage() {
  const about = await getContent("about");
  return <AboutEditor initial={about} />;
}
