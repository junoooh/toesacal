import type { StatusLevel } from "@/lib/types";

const STYLES: Record<StatusLevel, string> = {
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  neutral: "bg-neutral-bg text-neutral",
};

type StatusBadgeProps = {
  status: StatusLevel;
  children: React.ReactNode;
  className?: string;
};

export default function StatusBadge({
  status,
  children,
  className = "",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${STYLES[status]} ${className}`}
    >
      {children}
    </span>
  );
}
