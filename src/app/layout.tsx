import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SidebarAdSlot from "@/components/ui/SidebarAdSlot";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = `${SITE_NAME} · 퇴직금·실업급여·주휴수당 계산기`;
const DESCRIPTION =
  "입사일과 퇴사일, 급여 정보만 있으면 퇴직금, 실업급여 조건, 주휴수당을 회원가입 없이 바로 확인할 수 있는 계산기 사이트입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "퇴직금 계산기",
    "실업급여 조건",
    "주휴수당 계산기",
    "퇴직금 계산",
    "구직급여",
    "권고사직",
    "알바 급여",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <SidebarAdSlot side="left" />
        <SidebarAdSlot side="right" />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
