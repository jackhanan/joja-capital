"use client";

import { ServiceItem, ServicesContent } from "@/lib/types";
import { useContentEditor } from "./useContentEditor";
import { TextField, TextAreaField } from "./FormFields";
import OptionListField from "./OptionListField";
import SaveBar from "./SaveBar";

function emptyService(): ServiceItem {
  return {
    id: crypto.randomUUID(),
    number: "0" + "1",
    title: "New Service",
    description: "Placeholder description. Edit me.",
  };
}

export default function ServicesEditor({ initial }: { initial: ServicesContent }) {
  const { data, setData, saving, saved, save } = useContentEditor("services", initial);

  function updateItem(id: string, patch: Partial<ServiceItem>) {
    setData({
      ...data,
      items: data.items.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  }

  function removeItem(id: string) {
    setData({ ...data, items: data.items.filter((s) => s.id !== id) });
  }

  function addItem() {
    const next = data.items.length + 1;
    setData({
      ...data,
      items: [
        ...data.items,
        { ...emptyService(), number: String(next).padStart(2, "0") },
      ],
    });
  }

  function move(id: string, dir: -1 | 1) {
    const idx = data.items.findIndex((s) => s.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= data.items.length) return;
    const items = [...data.items];
    [items[idx], items[newIdx]] = [items[newIdx], items[idx]];
    setData({ ...data, items });
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-slate-50 mb-1">Services</h1>
      <p className="text-slate-500 text-sm mb-8">Grid of service offering cards.</p>

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
        Service Cards
      </p>
      <div className="space-y-4">
        {data.items.map((item, i) => (
          <div key={item.id} className="border border-slate-800/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-accent-400 text-xs">Card {i + 1}</span>
              <div className="flex gap-3">
                <button type="button" onClick={() => move(item.id, -1)} className="text-slate-500 hover:text-slate-200 text-xs">
                  ↑ Move Up
                </button>
                <button type="button" onClick={() => move(item.id, 1)} className="text-slate-500 hover:text-slate-200 text-xs">
                  ↓ Move Down
                </button>
                <button type="button" onClick={() => removeItem(item.id)} className="text-slate-500 hover:text-red-400 text-xs">
                  Delete
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <TextField
                label="Number"
                value={item.number}
                onChange={(v) => updateItem(item.id, { number: v })}
              />
              <div className="sm:col-span-3">
                <TextField
                  label="Title"
                  value={item.title}
                  onChange={(v) => updateItem(item.id, { title: v })}
                />
              </div>
            </div>
            <div className="mt-4">
              <TextAreaField
                label="Description"
                value={item.description}
                onChange={(v) => updateItem(item.id, { description: v })}
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={addItem} className="btn-secondary mt-6 !px-6 !py-2.5">
        + Add Service Card
      </button>

      <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 mt-10">
        Scrolling Ticker Band (shown above this section)
      </p>
      <OptionListField
        label="Ticker Items (one per line)"
        list={data.tickerItems}
        onCommit={(list) => setData({ ...data, tickerItems: list })}
        rows={6}
      />

      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
