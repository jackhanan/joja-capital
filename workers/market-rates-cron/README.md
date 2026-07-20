# joja-market-rates-cron

Standalone Cloudflare Worker (separate from the `joja-capital` Pages
project) that fetches SOFR, Fed Funds, Prime, and the 5/7/10/30-Year
Treasury yields from FRED once a day and writes them to the shared
`market_rates` D1 table. The Pages app's homepage only ever reads that
table -- it never calls FRED itself.

Runs at 9:00am America/New_York, Monday-Friday, year-round (two cron
expressions cover both DST states; see `wrangler.toml` and
`src/index.ts` for how the correct one is selected).

## One-time setup after first deploy

This Worker is a separate deployable from the Pages project, so it needs
its own `FRED_API_KEY` secret -- the one already set on the Pages project
does **not** carry over automatically.

```
npm run cron:deploy   # deploys the Worker
npm run cron:secret    # prompts for the FRED API key value, sets it on THIS Worker
```

## Manually triggering a run (e.g. to populate today's data immediately)

Cloudflare dashboard: **Workers & Pages → joja-market-rates-cron →
Triggers tab → Cron Triggers → "Trigger" / "Send test event"** next to
either schedule. This fires the real `scheduled` handler against the
live D1 database and the secret you set above -- safe to click any time,
including weekends (it just re-confirms the same last-published values).

## Logs

```
npm run cron:tail
```
