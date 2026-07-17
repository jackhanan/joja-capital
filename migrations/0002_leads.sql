CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  loan_type TEXT,
  property_type TEXT,
  loan_size TEXT,
  details TEXT,
  email_sent INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
