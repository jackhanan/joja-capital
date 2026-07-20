CREATE TABLE IF NOT EXISTS market_rates (
  series_id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  value REAL,
  fetched_at TEXT NOT NULL
);
