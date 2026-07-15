import { getContent } from "@/lib/content";
import ServicesEditor from "@/components/studio/ServicesEditor";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function ServicesDashboardPage() {
  const services = await getContent("services");
  return <ServicesEditor initial={services} />;
}
