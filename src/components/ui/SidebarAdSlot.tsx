type SidebarAdSlotProps = {
  side: "left" | "right";
};

export default function SidebarAdSlot({ side }: SidebarAdSlotProps) {
  return (
    <div
      className={`fixed top-24 ${side === "left" ? "left-4" : "right-4"} z-10 hidden h-[600px] w-40 items-center justify-center rounded-xl border border-dashed border-border bg-neutral-bg/40 text-xs text-sub 2xl:flex`}
      aria-hidden
    >
      광고 영역 (AD)
    </div>
  );
}
