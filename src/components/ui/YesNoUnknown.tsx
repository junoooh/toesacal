import type { YesNoUnknown as YesNoUnknownValue } from "@/lib/calculations/unemployment";

type YesNoUnknownProps = {
  label: string;
  value: YesNoUnknownValue;
  onChange: (value: YesNoUnknownValue) => void;
};

const OPTIONS: { value: YesNoUnknownValue; label: string }[] = [
  { value: "yes", label: "예" },
  { value: "no", label: "아니오" },
  { value: "unknown", label: "모르겠음" },
];

export default function YesNoUnknown({ label, value, onChange }: YesNoUnknownProps) {
  return (
    <div>
      <p className="text-xs font-bold text-sub">{label}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
              value === option.value
                ? option.value === "unknown"
                  ? "border-sub bg-neutral-bg text-sub"
                  : "border-primary bg-primary/10 text-primary"
                : "border-border text-sub"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
