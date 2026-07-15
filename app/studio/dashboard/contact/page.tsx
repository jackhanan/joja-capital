import { getContent } from "@/lib/content";
import ContactEditor from "@/components/studio/ContactEditor";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function ContactDashboardPage() {
  const contact = await getContent("contact");
  return <ContactEditor initial={contact} />;
}
