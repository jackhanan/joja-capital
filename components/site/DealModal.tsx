"use client";

import { useEffect } from "react";
import { DealItem } from "@/lib/types";
import PlaceholderImage from "./PlaceholderImage";

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-graphite-500 text-xs uppercase tracking-[0.2em] mb-1">
        {label}
      </div>
      <div className="text-slate-900">{value}</div>
    </div>
  );
}

export default function DealModal({
  deal,
  onClose,
}: {
  deal: DealItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!deal) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [deal, onClose]);

  if (!deal) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-navy-950/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${deal.dealType} — ${deal.location} deal details`}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white/90 border border-slate-200 text-slate-900 hover:border-accent-600 hover:text-accent-600 transition-colors"
        >
          ✕
        </button>

        <PlaceholderImage
          src={deal.image}
          alt={`${deal.dealType} — ${deal.location}`}
          label="Deal Photo Placeholder"
          className="w-full aspect-[16/9] object-cover"
        />

        <div className="p-6 sm:p-10">
          <div className="font-serif text-3xl sm:text-4xl text-slate-900">
            {deal.amount}
          </div>
          <div className="mt-2 text-accent-600 text-xs uppercase tracking-[0.2em]">
            {deal.dealType}
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-slate-200 pt-8">
            <Field label="Location" value={deal.location} />
            <Field label="Units" value={deal.units} />
            <Field label="Asset Type" value={deal.assetType} />
            <Field label="Rate" value={deal.rate} />
          </div>

          {deal.transactionDetails && (
            <div className="mt-8 border-t border-slate-200 pt-8">
              <div className="text-graphite-500 text-xs uppercase tracking-[0.2em] mb-3">
                Transaction Details
              </div>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {deal.transactionDetails}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
