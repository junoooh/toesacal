import type { Metadata } from "next";
import UnemploymentCalculator from "@/components/calculators/UnemploymentCalculator";

export const metadata: Metadata = {
  title: "실업급여 조건 체크",
  description:
    "고용보험 가입기간과 퇴사 사유를 입력하면 실업급여(구직급여) 가능성을 확인할 수 있어요.",
  alternates: { canonical: "/unemployment" },
};

export default function UnemploymentPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-bold text-primary">실업급여 조건 체크</p>
      <h1 className="mt-2 text-2xl text-text sm:text-3xl">
        실업급여를 받을 수 있는지 확인해보세요
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-sub">
        정확히 모르는 항목은 &ldquo;모르겠음&rdquo;을 선택해도 괜찮아요. 회원가입
        없이 비회원으로 바로 확인할 수 있습니다.
      </p>

      <div className="mt-8">
        <UnemploymentCalculator />
      </div>
    </div>
  );
}
