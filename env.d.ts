declare global {
  interface CloudflareEnv {
    DB: D1Database;
    IMAGES: R2Bucket;
    ADMIN_PASSWORD: string;
    RESEND_API_KEY: string;
    // FRED_API_KEY is intentionally NOT declared here -- the Pages app never
    // calls FRED directly. It's a separate secret bound only to the
    // workers/market-rates-cron Worker, which fetches on a schedule and
    // writes to D1; see that directory's env.d.ts.
  }
}

export {};
