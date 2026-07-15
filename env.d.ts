declare global {
  interface CloudflareEnv {
    DB: D1Database;
    IMAGES: R2Bucket;
    ADMIN_PASSWORD: string;
  }
}

export {};
