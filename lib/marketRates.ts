import { getDB, getFredApiKey } from "./db";
import { MarketRate } from "./types";

const SERIES: { seriesId: string; label: string }[] = [
  { seriesId: "SOFR", label: "SOFR" },
  { seriesId: "DFF", label: "Fed Funds Rate" },
  { seriesId: "DPRIME", label: "Prime Rate" },
  { seriesId: "DGS5", label: "5-Year Treasury" },
  { seriesId: "DGS7", label: "7-Year Treasury" },
  { seriesId: "DGS10", label: "10-Year Treasury" },
  { seriesId: "DGS30", label: "30-Year Treasury" },
];

// These rates only move at most once a day, so a cached value is only
// refreshed from FRED after it's this old.
const STALE_MS = 24 * 60 * 60 * 1000;

interface CachedRateRow {
  series_id: string;
  label: string;
  value: number | null;
  fetched_at: string;
}

async function fetchFredLatest(seriesId: string, apiKey: string): Promise<number | null> {
  const url =
    `https://api.stlouisfed.org/fred/series/observations` +
    `?series_id=${encodeURIComponent(seriesId)}&api_key=${encodeURIComponent(apiKey)}` +
    `&file_type=json&sort_order=desc&limit=5`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`FRED ${seriesId} responded ${res.status}: ${await res.text().catch(() => "")}`);
  }

  const data = await res.json<{ observations?: { date: string; value: string }[] }>();
  // FRED uses "." for days with no published value (holidays, etc.) --
  // walk back to the most recent real observation.
  const obs = data.observations?.find((o) => o.value !== ".");
  if (!obs) return null;

  const num = parseFloat(obs.value);
  return Number.isFinite(num) ? num : null;
}

async function readCache(): Promise<{ rates: Map<string, CachedRateRow>; fetchedAt: string | null }> {
  const db = getDB();
  const { results } = await db
    .prepare("SELECT series_id, label, value, fetched_at FROM market_rates")
    .all<CachedRateRow>();

  const rates = new Map<string, CachedRateRow>();
  let fetchedAt: string | null = null;
  for (const row of results ?? []) {
    rates.set(row.series_id, row);
    if (!fetchedAt || row.fetched_at > fetchedAt) fetchedAt = row.fetched_at;
  }
  return { rates, fetchedAt };
}

async function writeCache(rates: MarketRate[], fetchedAt: string): Promise<void> {
  const db = getDB();
  const stmts = rates.map((r) =>
    db
      .prepare(
        `INSERT INTO market_rates (series_id, label, value, fetched_at) VALUES (?1, ?2, ?3, ?4)
         ON CONFLICT(series_id) DO UPDATE SET label = ?2, value = ?3, fetched_at = ?4`
      )
      .bind(r.seriesId, r.label, r.value, fetchedAt)
  );
  await db.batch(stmts);
}

export interface MarketRatesResult {
  rates: MarketRate[];
  fetchedAt: string | null;
}

// Reads the D1 cache; refreshes from FRED only if the cache is missing or
// stale (>24h old). Per-series fetch failures fall back to that series'
// last cached value rather than failing the whole refresh, and if FRED is
// unreachable entirely, the page still renders whatever was last cached.
export async function getMarketRates(): Promise<MarketRatesResult> {
  const { rates: cached, fetchedAt: cachedAt } = await readCache();
  const isStale = !cachedAt || Date.now() - new Date(cachedAt).getTime() > STALE_MS;

  if (!isStale) {
    return {
      rates: SERIES.map((s) => ({
        seriesId: s.seriesId,
        label: s.label,
        value: cached.get(s.seriesId)?.value ?? null,
      })),
      fetchedAt: cachedAt,
    };
  }

  const apiKey = getFredApiKey();
  if (!apiKey) {
    console.warn("FRED_API_KEY is not configured -- serving last cached market rates, if any.");
    return {
      rates: SERIES.map((s) => ({
        seriesId: s.seriesId,
        label: s.label,
        value: cached.get(s.seriesId)?.value ?? null,
      })),
      fetchedAt: cachedAt,
    };
  }

  const settled = await Promise.allSettled(SERIES.map((s) => fetchFredLatest(s.seriesId, apiKey)));
  const now = new Date().toISOString();

  const fresh: MarketRate[] = SERIES.map((s, i) => {
    const outcome = settled[i];
    if (outcome.status === "fulfilled") {
      return { seriesId: s.seriesId, label: s.label, value: outcome.value };
    }
    console.error(`FRED fetch failed for ${s.seriesId}:`, outcome.reason);
    return { seriesId: s.seriesId, label: s.label, value: cached.get(s.seriesId)?.value ?? null };
  });

  const anySucceeded = settled.some((o) => o.status === "fulfilled");
  if (!anySucceeded && cached.size === 0) {
    // Total first-ever failure with nothing to fall back to.
    return { rates: fresh, fetchedAt: null };
  }

  try {
    await writeCache(fresh, now);
  } catch (err) {
    console.error("Failed to write market rates cache to D1:", err);
    // Still return the freshly-fetched values even if the cache write failed.
    return { rates: fresh, fetchedAt: cachedAt };
  }

  return { rates: fresh, fetchedAt: now };
}
