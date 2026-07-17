"use client";

import { DealItem, DealsContent } from "@/lib/types";
import { useContentEditor } from "./useContentEditor";
import { TextField, TextAreaField } from "./FormFields";
import ImageUploadField from "./ImageUploadField";
import SaveBar from "./SaveBar";
import { SortableList } from "./SortableList";

function emptyDeal(): DealItem {
  return {
    id: crypto.randomUUID(),
    image: "",
    amount: "$0.0M",
    dealType: "Bridge Loan",
    location: "City, ST",
    assetType: "",
    units: "",
    rate: "",
    transactionDetails: "",
  };
}

export default function DealsEditor({ initial }: { initial: DealsContent }) {
  const { data, setData, saving, saved, save } = useContentEditor("deals", initial);

  function updateItem(id: string, patch: Partial<DealItem>) {
    setData({
      ...data,
      items: data.items.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    });
  }

  function removeItem(id: string) {
    setData({ ...data, items: data.items.filter((d) => d.id !== id) });
  }

  function addItem() {
    setData({ ...data, items: [...data.items, emptyDeal()] });
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-slate-50 mb-1">Results / Track Record</h1>
      <p className="text-slate-500 text-sm mb-8">
        Deal cards and the big banner stat. Drag the handle to reorder.
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
        Banner Stat
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <TextField
          label="Prefix"
          value={data.bannerPrefix}
          onChange={(v) => setData({ ...data, bannerPrefix: v })}
        />
        <TextField
          label="Value"
          value={data.bannerValue}
          onChange={(v) => setData({ ...data, bannerValue: v })}
        />
        <div className="sm:col-span-2">
          <TextField
            label="Suffix"
            value={data.bannerSuffix}
            onChange={(v) => setData({ ...data, bannerSuffix: v })}
          />
        </div>
      </div>
      <TextField
        label="Banner Text"
        value={data.bannerText}
        onChange={(v) => setData({ ...data, bannerText: v })}
      />

      <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 mt-10">
        Deal Cards
      </p>
      <SortableList
        items={data.items}
        onReorder={(items) => setData({ ...data, items })}
        renderItem={(item, i) => (
          <div className="border border-slate-800/60 p-5 pr-24">
            <div className="flex items-center justify-between mb-4">
              <span className="text-accent-400 text-xs">Deal {i + 1}</span>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-slate-500 hover:text-red-400 text-xs"
              >
                Delete
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <TextField
                label="Amount"
                value={item.amount}
                onChange={(v) => updateItem(item.id, { amount: v })}
              />
              <TextField
                label="Deal Type"
                value={item.dealType}
                onChange={(v) => updateItem(item.id, { dealType: v })}
              />
              <TextField
                label="Location"
                value={item.location}
                onChange={(v) => updateItem(item.id, { location: v })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <TextField
                label="Asset Type"
                value={item.assetType ?? ""}
                onChange={(v) => updateItem(item.id, { assetType: v })}
              />
              <TextField
                label="Units"
                value={item.units ?? ""}
                onChange={(v) => updateItem(item.id, { units: v })}
              />
              <TextField
                label="Rate"
                value={item.rate ?? ""}
                onChange={(v) => updateItem(item.id, { rate: v })}
              />
            </div>
            <div className="mb-4">
              <TextAreaField
                label="Transaction Details"
                value={item.transactionDetails ?? ""}
                onChange={(v) => updateItem(item.id, { transactionDetails: v })}
                rows={4}
              />
            </div>
            <ImageUploadField
              label="Photo"
              value={item.image}
              onChange={(v) => updateItem(item.id, { image: v })}
            />
          </div>
        )}
      />

      <button type="button" onClick={addItem} className="btn-secondary mt-6 !px-6 !py-2.5">
        + Add Deal
      </button>

      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
