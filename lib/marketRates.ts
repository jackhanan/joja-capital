import { getDB } from "./db";
import { MarketRate } from "./types";
import { SERIES } from "./fredSeries";

interface CachedRateRow {
  series_id: string;
  label: string;
  value: number | null;
  fetched_at: string;
}

export interface MarketRatesResult {
  rates: MarketRate[];
  fetchedAt: string | null;
}

// Pure D1 read -- the homepage NEVER calls FRED directly, so there is zero
// added latency or FRED-availability dependency on a visitor's page load.
// All data is written by the scheduled Cron Trigger Worker in
// workers/market-rates-cron (runs daily at 9am ET; see that directory for
// the fetch/write logic and failure handling).
export async function getMarketRates(): Promise<MarketRatesResult> {
  const db = getDB();
  const { results } = await db
    .prepare("SELECT series_id, label, value, fetched_at FROM market_rates")
    .all<CachedRateRow>();

  const rows = results ?? [];
  const cached = new Map(rows.map((r) => [r.series_id, r]));
  let fetchedAt: string | null = null;
  for (const row of rows) {
    if (!fetchedAt || row.fetched_at > fetchedAt) fetchedAt = row.fetched_at;
  }

  return {
    rates: SERIES.map((s) => ({
      seriesId: s.seriesId,
      label: s.label,
      value: cached.get(s.seriesId)?.value ?? null,
    })),
    fetchedAt,
  };
}
