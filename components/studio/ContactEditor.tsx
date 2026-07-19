"use client";

import { AddressItem, ContactContent } from "@/lib/types";
import { useContentEditor } from "./useContentEditor";
import { TextField, TextAreaField } from "./FormFields";
import OptionListField from "./OptionListField";
import SaveBar from "./SaveBar";
import { SortableList } from "./SortableList";

function emptyAddress(): AddressItem {
  return { id: crypto.randomUUID(), label: "New Office", address: "" };
}

export default function ContactEditor({ initial }: { initial: ContactContent }) {
  const { data, setData, saving, saved, save } = useContentEditor("contact", initial);

  function updateAddress(id: string, patch: Partial<AddressItem>) {
    setData({
      ...data,
      addresses: data.addresses.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    });
  }

  function removeAddress(id: string) {
    setData({ ...data, addresses: data.addresses.filter((a) => a.id !== id) });
  }

  function addAddress() {
    setData({ ...data, addresses: [...data.addresses, emptyAddress()] });
  }

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
      </div>

      <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 mt-10">
        Addresses
      </p>
      <SortableList
        items={data.addresses}
        onReorder={(addresses) => setData({ ...data, addresses })}
        renderItem={(addr) => (
          <div className="border border-slate-800/60 p-5 pr-24">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => removeAddress(addr.id)}
                className="ml-auto text-slate-500 hover:text-red-400 text-xs"
              >
                Delete
              </button>
            </div>
            <div className="space-y-4">
              <TextField
                label="Label (e.g. New York Office)"
                value={addr.label}
                onChange={(v) => updateAddress(addr.id, { label: v })}
              />
              <TextAreaField
                label="Address"
                value={addr.address}
                onChange={(v) => updateAddress(addr.id, { address: v })}
                rows={2}
              />
            </div>
          </div>
        )}
      />
      <button type="button" onClick={addAddress} className="btn-secondary mt-4 !px-6 !py-2.5">
        + Add Address
      </button>

      <div className="space-y-6 mt-10">
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
