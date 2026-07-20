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

export function getResendApiKey(): string | undefined {
  const { env } = getRequestContext();
  return env.RESEND_API_KEY;
}

export function getFredApiKey(): string | undefined {
  const { env } = getRequestContext();
  // Trimmed defensively -- FRED rejects the key outright (400) if it has
  // any stray whitespace/newline, a common copy-paste artifact when pasting
  // secrets into the Cloudflare dashboard.
  return env.FRED_API_KEY?.trim() || undefined;
}
