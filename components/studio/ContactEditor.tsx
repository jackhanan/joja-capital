"use client";

import { ContactContent } from "@/lib/types";
import { useContentEditor } from "./useContentEditor";
import { TextField } from "./FormFields";
import SaveBar from "./SaveBar";

export default function ContactEditor({ initial }: { initial: ContactContent }) {
  const { data, setData, saving, saved, save } = useContentEditor("contact", initial);

  return (
    <div>
      <h1 className="font-serif text-2xl text-slate-50 mb-1">Contact / Social</h1>
      <p className="text-slate-500 text-sm mb-8">
        Contact details and social links shown in the Contact section.
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
        <TextField
          label="Address"
          value={data.address}
          onChange={(v) => setData({ ...data, address: v })}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Phone"
            value={data.phone}
            onChange={(v) => setData({ ...data, phone: v })}
          />
          <TextField
            label="Email"
            value={data.email}
            onChange={(v) => setData({ ...data, email: v })}
          />
        </div>
        <TextField
          label="Instagram URL"
          value={data.instagramUrl}
          onChange={(v) => setData({ ...data, instagramUrl: v })}
        />
        <TextField
          label="LinkedIn URL"
          value={data.linkedinUrl}
          onChange={(v) => setData({ ...data, linkedinUrl: v })}
        />
        <TextField
          label="Facebook URL"
          value={data.facebookUrl}
          onChange={(v) => setData({ ...data, facebookUrl: v })}
        />
      </div>

      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
