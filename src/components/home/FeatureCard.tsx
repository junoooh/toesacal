import type { ReactNode } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
  href,
}: FeatureCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </span>
      <div>
        <h3 className="text-lg text-text">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-sub">{description}</p>
      </div>
      <Button href={href} className="mt-auto w-full">
        계산 시작하기
      </Button>
    </Card>
  );
}
