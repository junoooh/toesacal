import type { Metadata } from "next";
import RetirementCalculator from "@/components/calculators/RetirementCalculator";

export const metadata: Metadata = {
  title: "퇴직금 계산기",
  description: "입사일과 퇴사일, 최근 급여를 입력해서 예상 퇴직금을 바로 확인해보세요.",
  alternates: { canonical: "/retirement" },
};

export default function RetirementPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-bold text-primary">퇴직금 계산기</p>
      <h1 className="mt-2 text-2xl text-text sm:text-3xl">
        예상 퇴직금을 확인해보세요
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-sub">
        입사일·퇴사일과 급여 정보를 입력하면 예상 퇴직금을 바로 계산해드려요.
        회원가입 없이 비회원으로 이용할 수 있습니다.
      </p>

      <div className="mt-8">
        <RetirementCalculator />
      </div>
    </div>
  );
}
