"use client";

import { MarketRatesContent } from "@/lib/types";
import { useContentEditor } from "./useContentEditor";
import { TextAreaField } from "./FormFields";
import SaveBar from "./SaveBar";

export default function MarketRatesEditor({ initial }: { initial: MarketRatesContent }) {
  const { data, setData, saving, saved, save } = useContentEditor("marketRates", initial);

  return (
    <div>
      <h1 className="font-serif text-2xl text-slate-50 mb-1">Live Market Rates</h1>
      <p className="text-slate-500 text-sm mb-8">
        SOFR, Fed Funds, Prime, and Treasury rates are fetched automatically from the
        Federal Reserve (FRED) and cached — the numbers themselves aren&apos;t editable,
        but you can control whether the section shows and the footer text underneath it.
      </p>

      <label className="flex items-center gap-3 border border-slate-800/60 p-5 cursor-pointer w-fit">
        <input
          type="checkbox"
          checked={data.enabled}
          onChange={(e) => setData({ ...data, enabled: e.target.checked })}
          className="w-4 h-4 accent-accent-500"
        />
        <span className="text-slate-100 text-sm">
          Show the Live Market Rates section on the homepage
        </span>
      </label>

      <div className="mt-6">
        <TextAreaField
          label="Footer Disclaimer Text"
          value={data.disclaimer}
          onChange={(v) => setData({ ...data, disclaimer: v })}
          rows={3}
        />
      </div>

      <SaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
