import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import type { StatusLevel } from "@/lib/types";

type ResultCardProps = {
  title: string;
  status: StatusLevel;
  statusLabel: string;
  lines: string[];
  href: string;
  ctaLabel: string;
};

export default function ResultCard({
  title,
  status,
  statusLabel,
  lines,
  href,
  ctaLabel,
}: ResultCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base text-text">{title}</h3>
        <StatusBadge status={status}>{statusLabel}</StatusBadge>
      </div>
      <ul className="space-y-1.5 text-sm text-sub">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <Button href={href} variant="outline" className="mt-auto w-full">
        {ctaLabel}
      </Button>
    </Card>
  );
}
