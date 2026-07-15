import { getContent } from "@/lib/content";
import HeroEditor from "@/components/studio/HeroEditor";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function HeroDashboardPage() {
  const hero = await getContent("hero");
  return <HeroEditor initial={hero} />;
}
