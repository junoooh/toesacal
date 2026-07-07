"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon, XIcon } from "@/components/ui/icons";

const NAV_LINKS = [
  { href: "/retirement", label: "퇴직금 계산기" },
  { href: "/unemployment", label: "실업급여 조건 체크" },
  { href: "/holiday-pay", label: "주휴수당 계산기" },
  { href: "/summary", label: "통합 결과" },
  { href: "/articles", label: "정보글" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-text"
      >
        {open ? <XIcon /> : <MenuIcon />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-surface shadow-sm">
          <nav className="flex flex-col px-5 py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-medium text-text last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
