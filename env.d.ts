declare global {
  interface CloudflareEnv {
    DB: D1Database;
    IMAGES: R2Bucket;
    ADMIN_PASSWORD: string;
    RESEND_API_KEY: string;
    FRED_API_KEY: string;
  }
}

export {};
