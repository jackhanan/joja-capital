// Pure FRED-fetching logic shared between the standalone cron Worker
// (workers/market-rates-cron) that actually calls FRED and writes D1, and
// this app's type definitions. Deliberately has zero dependency on
// @cloudflare/next-on-pages or any Pages-specific runtime so it can be
// imported unmodified from a plain Workers entrypoint.

export const SERIES: { seriesId: string; label: string }[] = [
  { seriesId: "SOFR", label: "SOFR" },
  { seriesId: "DFF", label: "Fed Funds Rate" },
  { seriesId: "DPRIME", label: "Prime Rate" },
  { seriesId: "DGS5", label: "5-Year Treasury" },
  { seriesId: "DGS7", label: "7-Year Treasury" },
  { seriesId: "DGS10", label: "10-Year Treasury" },
  { seriesId: "DGS30", label: "30-Year Treasury" },
];

export async function fetchFredLatest(seriesId: string, apiKey: string): Promise<number | null> {
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
