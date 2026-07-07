import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import Disclaimer from "@/components/ui/Disclaimer";
import { formatWon } from "@/lib/format";
import { DAY_LABELS, type HolidayPayResult as HolidayPayResultType } from "@/lib/calculations/holidayPay";

const RELATED_ARTICLES = [
  { title: "주휴수당 조건 쉽게 설명", slug: "eligibility-explained" },
  { title: "알바 주휴수당 계산 방법", slug: "part-time-calculation" },
  { title: "주휴수당 포함 시급이란?", slug: "included-hourly-wage" },
  { title: "결근하면 주휴수당을 못 받나요?", slug: "absence-effect" },
];

type HolidayPayResultProps = {
  result: HolidayPayResultType;
};

export default function HolidayPayResult({ result }: HolidayPayResultProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg text-text">주휴수당 계산 결과</h3>
          <StatusBadge status={result.status}>{result.label}</StatusBadge>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-sub">근무일수</p>
            <p className="mt-1 text-base font-bold text-text">
              {result.daysWorked}일
              {result.absenceDays > 0 && (
                <span className="ml-1 text-xs font-medium text-danger">
                  (결근 {result.absenceDays}일)
                </span>
              )}
            </p>
          </div>
          <div>
            <p className="text-xs text-sub">주간 총 근무시간</p>
            <p className="mt-1 text-base font-bold text-text">
              {result.totalWeeklyHours}시간
            </p>
          </div>
          <div>
            <p className="text-xs text-sub">주휴시간</p>
            <p className="mt-1 text-base font-bold text-text">
              {result.weeklyHolidayHours.toFixed(1)}시간
            </p>
          </div>
          <div>
            <p className="text-xs text-sub">예상 주휴수당</p>
            <p className="mt-1 text-xl font-extrabold text-primary">
              {formatWon(result.weeklyHolidayPay)}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-neutral-bg/50 p-4">
          <p className="text-xs font-bold text-sub">요일별 근무시간</p>
          <div className="mt-2 grid grid-cols-7 gap-1.5 text-center">
            {DAY_LABELS.map((day, index) => (
              <div key={day}>
                <p className="text-[11px] text-sub">{day}</p>
                <p className="mt-1 text-xs font-bold text-text">
                  {result.dailyHours[index]}h
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-neutral-bg/50 p-4">
            <p className="text-xs font-bold text-sub">주휴수당 포함 시</p>
            <p className="mt-1 text-sm text-sub">주급: {formatWon(result.weeklyPayWithHolidayPay)}</p>
            <p className="mt-0.5 text-sm text-sub">
              월 예상 급여: {formatWon(result.monthlyEstimateWithHolidayPay)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-neutral-bg/50 p-4">
            <p className="text-xs font-bold text-sub">주휴수당 미포함 시</p>
            <p className="mt-1 text-sm text-sub">주급: {formatWon(result.weeklyPayWithoutHolidayPay)}</p>
            <p className="mt-0.5 text-sm text-sub">
              월 예상 급여: {formatWon(result.monthlyEstimateWithoutHolidayPay)}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-neutral-bg/50 p-4">
          <p className="text-xs font-bold text-sub">참고 사항</p>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-sub">
            {result.notes.map((note) => (
              <li key={note}>· {note}</li>
            ))}
          </ul>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-base text-text">관련 글 더 보기</h3>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {RELATED_ARTICLES.map((article) => (
            <Button
              key={article.slug}
              href={`/articles/holiday-pay/${article.slug}`}
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
