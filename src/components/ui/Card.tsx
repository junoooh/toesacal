import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-surface border border-border rounded-2xl shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
