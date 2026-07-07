"use client";

import { useState } from "react";

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix: string;
  min?: number;
  max?: number;
  helpText?: string;
};

function clamp(value: number, min?: number, max?: number): number {
  let result = value;
  if (min !== undefined) result = Math.max(min, result);
  if (max !== undefined) result = Math.min(max, result);
  return result;
}

export default function NumberField({
  label,
  value,
  onChange,
  suffix,
  min = 0,
  max,
  helpText,
}: NumberFieldProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="text-xs font-bold text-sub">
      <div className="flex items-center gap-1.5">
        <span>{label}</span>
        {helpText && (
          <button
            type="button"
            onClick={() => setShowHelp((v) => !v)}
            aria-label={`${label} 설명 보기`}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-sub text-[10px] font-bold leading-none text-sub transition hover:border-primary hover:text-primary"
          >
            ?
          </button>
        )}
      </div>
      {helpText && showHelp && (
        <p className="mt-1.5 rounded-lg bg-neutral-bg/60 p-2.5 text-[11px] font-normal leading-relaxed text-sub">
          {helpText}
        </p>
      )}
      <div className="mt-1 flex items-center gap-1 rounded-lg border border-border px-3 py-2.5">
        <input
          type="number"
          min={min}
          max={max}
          value={value || ""}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0, min, max))}
          className="w-full text-sm text-text outline-none"
          placeholder="0"
        />
        <span className="text-xs text-sub">{suffix}</span>
      </div>
    </div>
  );
}
