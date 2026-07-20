import { getContent } from "@/lib/content";
import MarketRatesEditor from "@/components/studio/MarketRatesEditor";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function MarketRatesDashboardPage() {
  const marketRates = await getContent("marketRates");
  return <MarketRatesEditor initial={marketRates} />;
}
