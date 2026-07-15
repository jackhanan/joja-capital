"use client";

import { FooterContent, FooterNavLink } from "@/lib/types";
import { useContentEditor } from "./useContentEditor";
import { TextField, TextAreaField } from "./FormFields";
import SaveBar from "./SaveBar";

function emptyLink(): FooterNavLink {
  return { id: crypto.randomUUID(), label: "New Link", href: "#" };
}

export default function FooterEditor({ initial }: { initial: FooterContent }) {
  const { data, setData, saving, saved, save } = useContentEditor("footer", initial);

  function updateLink(id: string, patch: Partial<FooterNavLink>) {
    setData({
      ...data,
      navLinks: data.navLinks.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    });
  }

  function removeLink(id: string) {
    setData({ ...data, navLinks: data.navLinks.filter((l) => l.id !== id) });
  }

  function addLink() {
    setData({ ...data, navLinks: [...data.navLinks, emptyLink()] });
  }

  function move(id: string, dir: -1 | 1) {
    const idx = data.navLinks.findIndex((l) => l.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= data.navLinks.length) return;
    const links = [...data.navLinks];
    [links[idx], links[newIdx]] = [links[newIdx], links[idx]];
    setData({ ...data, navLinks: links });
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-slate-50 mb-1">Footer</h1>
      <p className="text-slate-500 text-sm mb-8">
        Footer blurb, nav links, and copyright text.
      </p>

      <div className="space-y-6">
        <TextAreaField
          label="Footer Blurb"
          value={data.blurb}
          onChange={(v) => setData({ ...data, blurb: v })}
        />
        <TextField
          label="Copyright Text"
          value={data.copyrightText}
          onChange={(v) => setData({ ...data, copyrightText: v })}
        />
      </div>

      <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 mt-10">
        Nav Links
      </p>
      <div className="space-y-3">
        {data.navLinks.map((link) => (
          <div key={link.id} className="border border-slate-800/60 p-4 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
            <div className="sm:col-span-2">
              <TextField
                label="Label"
                value={link.label}
                onChange={(v) => updateLink(link.id, { label: v })}
              />
            </div>
            <div className="sm:col-span-2">
              <TextField
                label="Link (e.g. #about)"
                value={link.href}
                onChange={(v) => updateLink(link.id, { href: v })}
              />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => move(link.id, -1)} className="text-slate-500 hover:text-slate-200 text-xs">
                ↑
              </button>
              <button type="button" onClick={() => move(link.id, 1)} className="text-slate-500 hover:text-slate-200 text-xs">
                ↓
              </button>
              <button type="button" onClick={() => removeLink(link.id)} className="text-slate-500 hover:text-red-400 text-xs">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={addLink} className="btn-secondary mt-6 !px-6 !py-2.5">
        + Add Nav Link
      </button>

      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
