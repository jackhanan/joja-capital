"use client";

import { TeamContent, TeamMember } from "@/lib/types";
import { useContentEditor } from "./useContentEditor";
import { TextField, TextAreaField } from "./FormFields";
import ImageUploadField from "./ImageUploadField";
import SaveBar from "./SaveBar";
import { SortableList } from "./SortableList";

function emptyMember(): TeamMember {
  return {
    id: crypto.randomUUID(),
    photo: "",
    name: "New Team Member",
    title: "Title",
    email: "name@example.com",
    phone: "(555) 010-0000",
  };
}

export default function TeamEditor({ initial }: { initial: TeamContent }) {
  const { data, setData, saving, saved, save } = useContentEditor("team", initial);

  function updateItem(id: string, patch: Partial<TeamMember>) {
    setData({
      ...data,
      items: data.items.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    });
  }

  function removeItem(id: string) {
    setData({ ...data, items: data.items.filter((m) => m.id !== id) });
  }

  function addItem() {
    setData({ ...data, items: [...data.items, emptyMember()] });
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-slate-50 mb-1">Team</h1>
      <p className="text-slate-500 text-sm mb-8">
        Team member cards. Drag the handle to reorder.
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
          label="Subheading"
          value={data.subheading}
          onChange={(v) => setData({ ...data, subheading: v })}
        />
      </div>

      <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 mt-10">
        Team Members
      </p>
      <SortableList
        items={data.items}
        onReorder={(items) => setData({ ...data, items })}
        renderItem={(item, i) => (
          <div className="border border-slate-800/60 p-5 pr-24">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gold-400 text-xs">Member {i + 1}</span>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-slate-500 hover:text-red-400 text-xs"
              >
                Delete
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <TextField
                label="Name"
                value={item.name}
                onChange={(v) => updateItem(item.id, { name: v })}
              />
              <TextField
                label="Title"
                value={item.title}
                onChange={(v) => updateItem(item.id, { title: v })}
              />
              <TextField
                label="Email"
                value={item.email}
                onChange={(v) => updateItem(item.id, { email: v })}
              />
              <TextField
                label="Phone"
                value={item.phone}
                onChange={(v) => updateItem(item.id, { phone: v })}
              />
            </div>
            <ImageUploadField
              label="Headshot"
              value={item.photo}
              onChange={(v) => updateItem(item.id, { photo: v })}
            />
          </div>
        )}
      />

      <button type="button" onClick={addItem} className="btn-secondary mt-6 !px-6 !py-2.5">
        + Add Team Member
      </button>

      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
