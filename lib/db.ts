import { getRequestContext } from "@cloudflare/next-on-pages";

export function getDB(): D1Database {
  const { env } = getRequestContext();
  return env.DB;
}

export function getImagesBucket(): R2Bucket {
  const { env } = getRequestContext();
  return env.IMAGES;
}

export function getAdminPassword(): string {
  const { env } = getRequestContext();
  return env.ADMIN_PASSWORD;
}
