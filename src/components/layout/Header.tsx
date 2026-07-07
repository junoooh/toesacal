import Link from "next/link";
import { CalculatorIcon } from "@/components/ui/icons";
import { SITE_NAME } from "@/lib/site";
import MobileNav from "./MobileNav";

const NAV_LINKS = [
  { href: "/retirement", label: "퇴직금 계산기" },
  { href: "/unemployment", label: "실업급여 조건 체크" },
  { href: "/holiday-pay", label: "주휴수당 계산기" },
  { href: "/summary", label: "통합 결과" },
  { href: "/articles", label: "정보글" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-text">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <CalculatorIcon className="h-5 w-5" />
          </span>
          <span className="text-lg">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text/80 transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
