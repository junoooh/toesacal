import type { Metadata } from "next";
import SummaryDashboard from "@/components/summary/SummaryDashboard";

export const metadata: Metadata = {
  title: "통합 결과",
  description:
    "퇴직금, 실업급여, 주휴수당 계산 결과를 한 페이지에서 모아보고 퇴사 전 체크리스트까지 확인하세요.",
  alternates: { canonical: "/summary" },
  // 이 페이지는 브라우저 localStorage에 저장된 개인별 계산 결과를 보여주는
  // 대시보드라 검색엔진에는 내용이 비어 보일 수 있어 색인에서 제외합니다.
  robots: { index: false, follow: true },
};

export default function SummaryPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="text-sm font-bold text-primary">통합 결과</p>
      <h1 className="mt-2 text-2xl text-text sm:text-3xl">
        내 계산 결과를 한눈에 확인하세요
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-sub">
        퇴직금·실업급여·주휴수당 계산기에서 확인한 결과를 모아 보여드려요.
        아직 계산하지 않은 항목은 바로 이동해서 확인할 수 있어요. 모든 데이터는
        이 브라우저에만 저장되며 서버로 전송되지 않습니다.
      </p>

      <div className="mt-8">
        <SummaryDashboard />
      </div>
    </div>
  );
}
