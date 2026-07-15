"use client";

import { AboutContent } from "@/lib/types";
import { useContentEditor } from "./useContentEditor";
import { TextField, TextAreaField } from "./FormFields";
import ImageUploadField from "./ImageUploadField";
import SaveBar from "./SaveBar";

export default function AboutEditor({ initial }: { initial: AboutContent }) {
  const { data, setData, saving, saved, save } = useContentEditor("about", initial);

  return (
    <div>
      <h1 className="font-serif text-2xl text-slate-50 mb-1">About — Who We Are</h1>
      <p className="text-slate-500 text-sm mb-8">
        Company story shown in the About section.
      </p>

      <div className="space-y-6">
        <TextField
          label="Eyebrow Label"
          value={data.eyebrow}
          onChange={(v) => setData({ ...data, eyebrow: v })}
        />
        <TextField
          label="Headline"
          value={data.headline}
          onChange={(v) => setData({ ...data, headline: v })}
        />
        <TextAreaField
          label="Paragraph 1"
          value={data.paragraph1}
          onChange={(v) => setData({ ...data, paragraph1: v })}
          rows={5}
        />
        <TextAreaField
          label="Paragraph 2"
          value={data.paragraph2}
          onChange={(v) => setData({ ...data, paragraph2: v })}
          rows={5}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="CTA Button Text"
            value={data.ctaText}
            onChange={(v) => setData({ ...data, ctaText: v })}
          />
          <TextField
            label="CTA Button Link"
            value={data.ctaHref}
            onChange={(v) => setData({ ...data, ctaHref: v })}
          />
        </div>
        <ImageUploadField
          label="About Image"
          value={data.image}
          onChange={(v) => setData({ ...data, image: v })}
        />
      </div>

      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
