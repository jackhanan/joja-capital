import { getContent } from "@/lib/content";
import TeamEditor from "@/components/studio/TeamEditor";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function TeamDashboardPage() {
  const team = await getContent("team");
  return <TeamEditor initial={team} />;
}
