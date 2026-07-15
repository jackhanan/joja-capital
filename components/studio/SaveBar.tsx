"use client";

export default function SaveBar({
  onSave,
  saving,
  saved,
}: {
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  return (
    <div className="sticky bottom-0 mt-10 bg-navy-950/95 backdrop-blur border-t border-slate-800/60 py-4 flex items-center gap-4">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="btn-primary disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
      {saved && !saving && (
        <span className="text-gold-400 text-sm">Saved. Live site updated.</span>
      )}
    </div>
  );
}
