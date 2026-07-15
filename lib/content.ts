import { getDB } from "./db";
import { defaultContent } from "./defaults";
import { ContentKey, SiteContent } from "./types";

interface ContentRow {
  key: string;
  value: string;
}

export async function getAllContent(): Promise<SiteContent> {
  const db = getDB();
  const { results } = await db
    .prepare("SELECT key, value FROM content")
    .all<ContentRow>();

  const content: SiteContent = {
    hero: defaultContent.hero,
    about: defaultContent.about,
    services: defaultContent.services,
    deals: defaultContent.deals,
    team: defaultContent.team,
    contact: defaultContent.contact,
    footer: defaultContent.footer,
  };

  for (const row of results ?? []) {
    const key = row.key as ContentKey;
    if (key in content) {
      try {
        const parsed = JSON.parse(row.value);
        (content as Record<ContentKey, unknown>)[key] = {
          ...(content as Record<ContentKey, object>)[key],
          ...parsed,
        };
      } catch {
        // malformed row — keep default for this key
      }
    }
  }

  return content;
}

export async function getContent<K extends ContentKey>(
  key: K
): Promise<SiteContent[K]> {
  const db = getDB();
  const row = await db
    .prepare("SELECT value FROM content WHERE key = ?1")
    .bind(key)
    .first<ContentRow>();

  if (!row) return defaultContent[key];

  try {
    return { ...defaultContent[key], ...JSON.parse(row.value) };
  } catch {
    return defaultContent[key];
  }
}

export async function setContent<K extends ContentKey>(
  key: K,
  value: SiteContent[K]
): Promise<void> {
  const db = getDB();
  const json = JSON.stringify(value);
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO content (key, value, updated_at) VALUES (?1, ?2, ?3)
       ON CONFLICT(key) DO UPDATE SET value = ?2, updated_at = ?3`
    )
    .bind(key, json, now)
    .run();
}
