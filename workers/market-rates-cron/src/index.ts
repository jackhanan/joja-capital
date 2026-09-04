import { SERIES, fetchFredLatest } from "../../../lib/fredSeries";
import type { Env } from "../env";

// Two cron expressions cover both US Eastern DST states year-round (see
// wrangler.toml). Only the one matching "today's" actual America/New_York
// offset should do real work; the other one is expected to fire and no-op.
const EDT_CRON = "0 13 * * 1-5";
const EST_CRON = "0 14 * * 1-5";

function isCurrentlyEDT(now: Date): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "short",
  }).formatToParts(now);
  return parts.find((p) => p.type === "timeZoneName")?.value === "EDT";
}

const STALE_THRESHOLD_MS = 2 * 24 * 60 * 60 * 1000;

type RefreshResult = { updated: string[]; failed: string[] };

async function refreshMarketRates(env: Env): Promise<RefreshResult> {
  const apiKey = env.FRED_API_KEY?.trim();
  if (!apiKey) {
    console.error("FRED_API_KEY is not configured on this Worker -- skipping refresh.");
    return { updated: [], failed: SERIES.map((s) => s.seriesId) };
  }

  const settled = await Promise.allSettled(SERIES.map((s) => fetchFredLatest(s.seriesId, apiKey)));
  const fetchedAt = new Date().toISOString();

  const updates: { seriesId: string; label: string; value: number }[] = [];
  settled.forEach((outcome, i) => {
    const s = SERIES[i];
    if (outcome.status === "fulfilled" && outcome.value !== null) {
      updates.push({ seriesId: s.seriesId, label: s.label, value: outcome.value });
    } else {
      const reason = outcome.status === "rejected" ? outcome.reason : "FRED returned no usable observation";
      console.error(`FRED fetch failed for ${s.seriesId}:`, reason);
    }
  });

  if (updates.length === 0) {
    console.error("Every FRED series failed to fetch this run -- leaving D1 untouched.");
    return { updated: [], failed: SERIES.map((s) => s.seriesId) };
  }

  // Only series that actually got a fresh value are written, so any series
  // that failed this run simply keeps its last successfully-fetched value
  // in D1 -- the site never shows a blank or null rate because of a
  // transient FRED failure.
  const stmts = updates.map((u) =>
    env.DB.prepare(
      `INSERT INTO market_rates (series_id, label, value, fetched_at) VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(series_id) DO UPDATE SET label = ?2, value = ?3, fetched_at = ?4`
    ).bind(u.seriesId, u.label, u.value, fetchedAt)
  );

  const failedIds = SERIES.filter((s) => !updates.some((u) => u.seriesId === s.seriesId)).map((s) => s.seriesId);

  try {
    await env.DB.batch(stmts);
  } catch (err) {
    console.error("Failed to write market rates to D1:", err);
    return { updated: [], failed: SERIES.map((s) => s.seriesId) };
  }

  console.log(`Market rates refreshed: ${updates.length}/${SERIES.length} series updated at ${fetchedAt}.`);
  if (failedIds.length > 0) {
    console.error(`Kept previous D1 value for series that failed this run: ${failedIds.join(", ")}`);
  }

  return { updated: updates.map((u) => u.seriesId), failed: failedIds };
}

async function getStaleness(env: Env): Promise<{ seriesId: string; fetchedAt: string; staleMs: number }[]> {
  const { results } = await env.DB.prepare("SELECT series_id, fetched_at FROM market_rates").all<{
    series_id: string;
    fetched_at: string;
  }>();
  const now = Date.now();
  return (results ?? []).map((r) => ({
    seriesId: r.series_id,
    fetchedAt: r.fetched_at,
    staleMs: now - new Date(r.fetched_at).getTime(),
  }));
}

export default {
  // Manual recovery path for when the Cron Trigger itself silently fails to
  // fire (observed intermittently on the Cloudflare platform -- confirmed via
  // Workers Analytics showing zero invocations on affected days, with the
  // Worker itself never erroring when it does run). POST /trigger with a
  // bearer TRIGGER_SECRET re-runs the same refresh the cron would have.
  // GET /health is unauthenticated and reports per-series staleness so an
  // external uptime monitor can alert if any series goes >2 days stale.
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      const staleness = await getStaleness(env);
      const stale = staleness.filter((s) => s.staleMs > STALE_THRESHOLD_MS);
      return Response.json(
        { ok: stale.length === 0, staleThresholdHours: STALE_THRESHOLD_MS / 3600000, series: staleness, stale },
        { status: stale.length === 0 ? 200 : 503 }
      );
    }

    if (url.pathname === "/trigger" && request.method === "POST") {
      const auth = request.headers.get("Authorization");
      if (auth !== `Bearer ${env.TRIGGER_SECRET}`) {
        return new Response("Unauthorized", { status: 401 });
      }
      const result = await refreshMarketRates(env);
      return Response.json(result, { status: result.updated.length > 0 ? 200 : 502 });
    }

    return new Response("Not found", { status: 404 });
  },

  async scheduled(event: ScheduledEvent, env: Env): Promise<void> {
    if (event.cron === EDT_CRON || event.cron === EST_CRON) {
      const edtActive = isCurrentlyEDT(new Date(event.scheduledTime));
      const thisSlotIsEdt = event.cron === EDT_CRON;
      if (thisSlotIsEdt !== edtActive) {
        console.log(
          `Skipping "${event.cron}" run -- America/New_York is currently ${
            edtActive ? "EDT" : "EST"
          }, this cron slot is for the other DST offset.`
        );
        return;
      }
    }
    // A manual "test scheduled event" from the dashboard reports an empty
    // or unrecognized cron string -- always run in that case rather than
    // skipping, so manual testing works regardless of day/DST state.

    await refreshMarketRates(env);
  },
};
