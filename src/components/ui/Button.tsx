import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const sizeClass = size === "lg" ? "text-base px-6 py-3.5" : "text-sm";
  const disabledClass = disabled ? "cursor-not-allowed opacity-50" : "";
  const classes = `btn ${variant === "outline" ? "btn-outline" : ""} ${sizeClass} ${disabledClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
