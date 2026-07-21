"use client";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-navy-900 border border-slate-700 px-4 py-2.5 text-slate-100 focus:outline-none focus:border-accent-400 transition-colors"
      />
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
        {label}
      </label>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-navy-900 border border-slate-700 px-4 py-2.5 text-slate-100 focus:outline-none focus:border-accent-400 transition-colors resize-y"
      />
    </div>
  );
}

export function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder = "Select…",
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-navy-900 border border-slate-700 px-4 py-2.5 text-slate-100 focus:outline-none focus:border-accent-400 transition-colors"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-navy-900 border border-slate-700 px-4 py-2.5 text-slate-100 focus:outline-none focus:border-accent-400 transition-colors"
      />
    </div>
  );
}
