"use client";

import { useState } from "react";
import { TextAreaField } from "./FormFields";

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
export default function OptionListField({
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
