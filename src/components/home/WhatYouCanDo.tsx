import { CheckCircleIcon } from "@/components/ui/icons";

const ITEMS = [
  "입사일과 퇴사일을 입력하면 예상 퇴직금을 계산할 수 있습니다.",
  "월급과 평균임금을 입력하면 퇴직금 기준을 확인할 수 있습니다.",
  "고용보험 가입기간과 퇴사 사유를 입력하면 실업급여 가능성을 체크할 수 있습니다.",
  "시급, 근무시간, 근무일수를 입력하면 주휴수당을 계산할 수 있습니다.",
];

export default function WhatYouCanDo() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <h2 className="text-2xl text-text">이 사이트에서 할 수 있는 것</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {ITEMS.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
          >
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm leading-relaxed text-text">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
