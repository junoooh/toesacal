import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import Checklist from "@/components/ui/Checklist";
import Disclaimer from "@/components/ui/Disclaimer";
import { formatWon } from "@/lib/format";
import type { RetirementResult as RetirementResultType } from "@/lib/calculations/retirement";

const CHECKLIST_ITEMS = [
  "1년 이상 계속 근로했는지 확인했나요?",
  "미사용 연차수당이 정산에 포함되었는지 확인했나요?",
  "퇴직금은 퇴직 후 14일 이내 지급이 원칙이에요.",
  "급여명세서와 근로계약서를 보관해두었나요?",
];

const RELATED_ARTICLES = [
  { title: "퇴직금은 언제 받을 수 있나요?", slug: "when-can-i-receive-it" },
  { title: "1년 미만 근무하면 퇴직금을 못 받나요?", slug: "under-one-year" },
  { title: "권고사직도 퇴직금을 받을 수 있나요?", slug: "recommended-resignation" },
  { title: "퇴직금 계산 시 상여금도 포함되나요?", slug: "bonus-included" },
];

type RetirementResultProps = {
  result: RetirementResultType;
};

export default function RetirementResult({ result }: RetirementResultProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg text-text">퇴직금 계산 결과</h3>
          <StatusBadge status={result.eligibleStatus}>
            {result.eligibleLabel}
          </StatusBadge>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-sub">총 재직일수</p>
            <p className="mt-1 text-base font-bold text-text">
              {result.totalServiceDays.toLocaleString("ko-KR")}일
            </p>
          </div>
          <div>
            <p className="text-xs text-sub">예상 1일 평균임금</p>
            <p className="mt-1 text-base font-bold text-text">
              {formatWon(result.dailyAverageWage)}
            </p>
          </div>
          <div>
            <p className="text-xs text-sub">예상 퇴직금</p>
            <p className="mt-1 text-xl font-extrabold text-primary">
              {formatWon(result.estimatedPay)}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-neutral-bg/50 p-4">
          <p className="text-xs font-bold text-sub">계산에 사용된 기준</p>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-sub">
            {result.basis.map((line) => (
              <li key={line}>· {line}</li>
            ))}
            <li>
              · 1년 이상 계속 근로한 경우 퇴직금 대상이 될 수 있습니다.
            </li>
          </ul>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-base text-text">퇴사 전 확인해야 할 체크리스트</h3>
        <Checklist items={CHECKLIST_ITEMS} className="mt-4" />
      </Card>

      <Card className="p-6">
        <h3 className="text-base text-text">관련 글 더 보기</h3>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {RELATED_ARTICLES.map((article) => (
            <Button
              key={article.slug}
              href={`/articles/retirement/${article.slug}`}
              variant="outline"
              className="justify-start text-left"
            >
              {article.title}
            </Button>
          ))}
        </div>
      </Card>

      <Disclaimer />
    </div>
  );
}
