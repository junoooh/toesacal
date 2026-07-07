"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Disclaimer from "@/components/ui/Disclaimer";
import ResultCard from "./ResultCard";
import ResignationChecklist from "./ResignationChecklist";
import {
  loadCalculatorResult,
  STORAGE_KEYS,
  type SavedRetirement,
  type SavedUnemployment,
  type SavedHolidayPay,
} from "@/lib/storage";
import { formatWon } from "@/lib/format";

const DEFAULT_CENTER_CHECKS = [
  "실업급여 신청 전 고용센터 상담 예약",
  "이직확인서 처리 여부 확인",
  "구직급여 소정급여일수 확인",
];

export default function SummaryDashboard() {
  const [retirement, setRetirement] = useState<SavedRetirement | null>(null);
  const [unemployment, setUnemployment] = useState<SavedUnemployment | null>(null);
  const [holidayPay, setHolidayPay] = useState<SavedHolidayPay | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRetirement(loadCalculatorResult<SavedRetirement>(STORAGE_KEYS.retirement));
    setUnemployment(loadCalculatorResult<SavedUnemployment>(STORAGE_KEYS.unemployment));
    setHolidayPay(loadCalculatorResult<SavedHolidayPay>(STORAGE_KEYS.holidayPay));
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const missingInfo: string[] = [];
  if (!retirement) missingInfo.push("퇴직금 계산이 아직 없어요.");
  else if (retirement.result.eligibleStatus !== "success")
    missingInfo.push("퇴직금 발생 조건을 다시 확인해보세요.");

  if (!unemployment) missingInfo.push("실업급여 조건 체크가 아직 없어요.");
  else if (unemployment.result.status !== "success")
    missingInfo.push("실업급여 조건 중 확인이 필요한 항목이 있어요.");

  if (!holidayPay) missingInfo.push("주휴수당 계산이 아직 없어요.");
  else if (holidayPay.result.status === "danger" || holidayPay.result.status === "warning")
    missingInfo.push("주휴수당 조건 중 확인이 필요한 항목이 있어요.");

  const nextSteps: string[] = [];
  if (!retirement) nextSteps.push("퇴직금 계산기에서 예상 퇴직금을 확인해보세요.");
  if (!unemployment) nextSteps.push("실업급여 조건 체크에서 가능성을 확인해보세요.");
  if (!holidayPay) nextSteps.push("주휴수당 계산기에서 예상 금액을 확인해보세요.");
  if (unemployment)
    nextSteps.push("고용센터에서 정확한 피보험단위기간과 소정급여일수를 확인하세요.");
  if (retirement && retirement.result.eligibleStatus === "success")
    nextSteps.push("퇴직금은 퇴사 후 14일 이내 지급이 원칙이니 지급일을 확인하세요.");
  nextSteps.push("아래 퇴사 전 체크리스트를 하나씩 완료해보세요.");

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <ResultCard
          title="퇴직금 예상 결과"
          status={retirement ? retirement.result.eligibleStatus : "neutral"}
          statusLabel={retirement ? retirement.result.eligibleLabel : "정보 부족"}
          lines={
            retirement
              ? [
                  `예상 퇴직금: ${formatWon(retirement.result.estimatedPay)}`,
                  `총 재직일수: ${retirement.result.totalServiceDays.toLocaleString("ko-KR")}일`,
                ]
              : ["아직 계산하지 않았어요."]
          }
          href="/retirement"
          ctaLabel={retirement ? "다시 계산하기" : "퇴직금 계산하러 가기"}
        />
        <ResultCard
          title="실업급여 조건 결과"
          status={unemployment ? unemployment.result.status : "neutral"}
          statusLabel={unemployment ? unemployment.result.label : "정보 부족"}
          lines={
            unemployment
              ? unemployment.result.summaryLines.slice(0, 2)
              : ["아직 확인하지 않았어요."]
          }
          href="/unemployment"
          ctaLabel={unemployment ? "다시 확인하기" : "실업급여 조건 체크하러 가기"}
        />
        <ResultCard
          title="주휴수당 예상 결과"
          status={holidayPay ? holidayPay.result.status : "neutral"}
          statusLabel={holidayPay ? holidayPay.result.label : "정보 부족"}
          lines={
            holidayPay
              ? [
                  `예상 주휴수당: ${formatWon(holidayPay.result.weeklyHolidayPay)}`,
                  `주간 총 근무시간: ${holidayPay.result.totalWeeklyHours}시간`,
                ]
              : ["아직 계산하지 않았어요."]
          }
          href="/holiday-pay"
          ctaLabel={holidayPay ? "다시 계산하기" : "주휴수당 계산하러 가기"}
        />
      </div>

      <Card className="p-6">
        <h3 className="text-base text-text">고용센터 확인 필요 항목</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-text">
          {(unemployment ? unemployment.result.centerChecks : DEFAULT_CENTER_CHECKS).map(
            (item) => (
              <li key={item}>· {item}</li>
            )
          )}
        </ul>
        {!unemployment && (
          <p className="mt-3 text-xs text-sub">
            실업급여 조건 체크를 진행하면 상황에 맞는 항목을 보여드려요.
          </p>
        )}
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-base text-text">부족하거나 확인이 필요한 정보</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-text">
            {missingInfo.length > 0 ? (
              missingInfo.map((item) => <li key={item}>· {item}</li>)
            ) : (
              <li>모든 계산을 완료했어요.</li>
            )}
          </ul>
        </Card>
        <Card className="p-6">
          <h3 className="text-base text-text">다음에 해야 할 일</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-text">
            {nextSteps.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <ResignationChecklist />

      <Disclaimer />
    </div>
  );
}
