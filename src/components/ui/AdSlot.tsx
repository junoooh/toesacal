type AdSlotProps = {
  label?: string;
  className?: string;
};

export default function AdSlot({ label = "광고 영역", className = "" }: AdSlotProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-neutral-bg/40 py-6 text-xs text-sub ${className}`}
      aria-hidden
    >
      {label} (AD)
    </div>
  );
}
