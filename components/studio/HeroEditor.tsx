"use client";

import { HeroContent, HeroStat } from "@/lib/types";
import { useContentEditor } from "./useContentEditor";
import { TextField, TextAreaField, NumberField } from "./FormFields";
import ImageUploadField from "./ImageUploadField";
import SaveBar from "./SaveBar";

export default function HeroEditor({ initial }: { initial: HeroContent }) {
  const { data, setData, saving, saved, save } = useContentEditor("hero", initial);

  function updateStat(id: string, patch: Partial<HeroStat>) {
    setData({
      ...data,
      stats: data.stats.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-slate-50 mb-1">Hero &amp; Stats</h1>
      <p className="text-slate-500 text-sm mb-8">
        The first thing visitors see. Stats animate on scroll.
      </p>

      <div className="space-y-6">
        <TextField
          label="Company Name"
          value={data.companyName}
          onChange={(v) => setData({ ...data, companyName: v })}
        />
        <TextField
          label="Tagline"
          value={data.tagline}
          onChange={(v) => setData({ ...data, tagline: v })}
        />
        <TextAreaField
          label="Subheading"
          value={data.subheading}
          onChange={(v) => setData({ ...data, subheading: v })}
        />
        <TextField
          label="Primary Button Text (also the 'Start Your Deal' nav bar button)"
          value={data.ctaPrimaryText}
          onChange={(v) => setData({ ...data, ctaPrimaryText: v })}
        />
        <p className="text-slate-500 text-xs -mt-4">
          Both always link to the deal intake form at /start-your-deal.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Secondary Button Text"
            value={data.ctaSecondaryText}
            onChange={(v) => setData({ ...data, ctaSecondaryText: v })}
          />
          <TextField
            label="Secondary Button Link"
            value={data.ctaSecondaryHref}
            onChange={(v) => setData({ ...data, ctaSecondaryHref: v })}
          />
        </div>
        <ImageUploadField
          label="Background Image"
          value={data.backgroundImage}
          onChange={(v) => setData({ ...data, backgroundImage: v })}
        />

        <div>
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 mt-8">
            Stat Counters
          </p>
          <div className="space-y-5">
            {data.stats.map((stat) => (
              <div
                key={stat.id}
                className="border border-slate-800/60 p-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                <TextField
                  label="Label"
                  value={stat.label}
                  onChange={(v) => updateStat(stat.id, { label: v })}
                />
                <TextField
                  label="Prefix"
                  value={stat.prefix}
                  onChange={(v) => updateStat(stat.id, { prefix: v })}
                />
                <NumberField
                  label="Value"
                  value={stat.value}
                  onChange={(v) => updateStat(stat.id, { value: v })}
                />
                <TextField
                  label="Suffix"
                  value={stat.suffix}
                  onChange={(v) => updateStat(stat.id, { suffix: v })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
