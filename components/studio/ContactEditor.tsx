"use client";

import { useState } from "react";
import { ContactContent } from "@/lib/types";
import { useContentEditor } from "./useContentEditor";
import { TextField, TextAreaField } from "./FormFields";
import SaveBar from "./SaveBar";

function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

// A plain TextAreaField would re-derive its value from `list.join("\n")`
// on every keystroke, stripping the trailing blank line the moment you
// press Enter and making it impossible to start a new line. Editing the
// raw text locally and only committing the parsed list on blur avoids that.
function OptionListField({
  label,
  list,
  onCommit,
  rows,
}: {
  label: string;
  list: string[];
  onCommit: (list: string[]) => void;
  rows: number;
}) {
  const [text, setText] = useState(list.join("\n"));

  return (
    <TextAreaField
      label={label}
      value={text}
      rows={rows}
      onChange={(v) => {
        setText(v);
        onCommit(linesToList(v));
      }}
    />
  );
}

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

      <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 mt-10">
        Start Your Deal — Lead Notifications
      </p>
      <div className="space-y-6">
        <TextField
          label="Notification Email (where new deal submissions are sent)"
          value={data.adminEmail}
          onChange={(v) => setData({ ...data, adminEmail: v })}
        />
        <OptionListField
          label="Loan Type Options (one per line)"
          list={data.loanTypeOptions}
          onCommit={(list) => setData({ ...data, loanTypeOptions: list })}
          rows={4}
        />
        <OptionListField
          label="Property Type Options (one per line)"
          list={data.propertyTypeOptions}
          onCommit={(list) => setData({ ...data, propertyTypeOptions: list })}
          rows={10}
        />
      </div>

      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
