import type { Metadata } from "next";
import HolidayPayCalculator from "@/components/calculators/HolidayPayCalculator";

export const metadata: Metadata = {
  title: "주휴수당 계산기",
  description:
    "시급, 근무시간, 근무일수를 입력하면 이번 주 예상 주휴수당을 바로 계산할 수 있어요.",
  alternates: { canonical: "/holiday-pay" },
};

export default function HolidayPayPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-sm font-bold text-primary">주휴수당 계산기</p>
      <h1 className="mt-2 text-2xl text-text sm:text-3xl">
        예상 주휴수당을 확인해보세요
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-sub">
        시급과 근무시간을 입력하면 주휴수당 발생 가능 여부와 예상 금액을 바로
        계산해드려요. 회원가입 없이 비회원으로 이용할 수 있습니다.
      </p>

      <div className="mt-8">
        <HolidayPayCalculator />
      </div>
    </div>
  );
}
