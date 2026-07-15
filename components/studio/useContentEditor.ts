"use client";

import { useState } from "react";
import { ContentKey, SiteContent } from "@/lib/types";

export function useContentEditor<K extends ContentKey>(
  key: K,
  initial: SiteContent[K]
) {
  const [data, setData] = useState<SiteContent[K]>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/studio/api/content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return { data, setData, saving, saved, save };
}
