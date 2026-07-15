"use client";

import { useRef, useState } from "react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/studio/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json<{ url: string }>();
      onChange(data.url);
    } catch {
      setError("Upload failed. Try a different image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 bg-navy-900 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-slate-600 text-[10px] text-center px-1">
              No Image
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="btn-secondary !px-5 !py-2 !text-xs disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Upload Image"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-slate-500 hover:text-red-400 text-xs text-left transition-colors"
            >
              Remove
            </button>
          )}
          {error && <p className="text-red-400 text-xs">{error}</p>}
        </div>
      </div>
    </div>
  );
}
