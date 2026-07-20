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

async function refreshMarketRates(env: Env): Promise<void> {
  const apiKey = env.FRED_API_KEY?.trim();
  if (!apiKey) {
    console.error("FRED_API_KEY is not configured on this Worker -- skipping refresh.");
    return;
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
    return;
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

  try {
    await env.DB.batch(stmts);
  } catch (err) {
    console.error("Failed to write market rates to D1:", err);
    return;
  }

  console.log(`Market rates refreshed: ${updates.length}/${SERIES.length} series updated at ${fetchedAt}.`);
  if (updates.length < SERIES.length) {
    const failedIds = SERIES.filter((s) => !updates.some((u) => u.seriesId === s.seriesId)).map(
      (s) => s.seriesId
    );
    console.error(`Kept previous D1 value for series that failed this run: ${failedIds.join(", ")}`);
  }
}

export default {
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
