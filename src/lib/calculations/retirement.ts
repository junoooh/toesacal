import type { StatusLevel } from "@/lib/types";

export type WageMode = "monthly" | "averageDirect";

export type RetirementInput = {
  hireDate: string;
  resignDate: string;
  wageMode: WageMode;
  recent3MonthWage: number;
  recent3MonthBonus: number;
  recent3MonthOtherAllowance: number;
  unusedAnnualLeavePay: number;
  dailyAverageWageDirect: number;
};

export type RetirementResult = {
  totalServiceDays: number;
  eligibleStatus: StatusLevel;
  eligibleLabel: string;
  dailyAverageWage: number;
  estimatedPay: number;
  basis: string[];
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function daysBetween(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
}

function subtractMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
}

export function calculateRetirementPay(
  input: RetirementInput
): RetirementResult | null {
  const hire = new Date(input.hireDate);
  const resign = new Date(input.resignDate);

  if (
    Number.isNaN(hire.getTime()) ||
    Number.isNaN(resign.getTime()) ||
    resign <= hire
  ) {
    return null;
  }

  const totalServiceDays = daysBetween(hire, resign);
  const threeMonthsAgo = subtractMonths(resign, 3);
  const days3Month = Math.max(daysBetween(threeMonthsAgo, resign), 1);

  const basis: string[] = [];
  let dailyAverageWage: number;

  if (input.wageMode === "averageDirect") {
    dailyAverageWage = input.dailyAverageWageDirect;
    basis.push("입력하신 1일 평균임금을 그대로 사용했습니다.");
  } else {
    const bonusShare = (input.recent3MonthBonus * 3) / 12;
    const leaveShare = (input.unusedAnnualLeavePay * 3) / 12;
    const totalWage =
      input.recent3MonthWage +
      input.recent3MonthOtherAllowance +
      bonusShare +
      leaveShare;
    dailyAverageWage = totalWage / days3Month;
    basis.push(
      `퇴사일 기준 최근 3개월(${days3Month}일)의 급여·수당 합계를 3개월 총일수로 나눠 1일 평균임금을 계산했습니다.`
    );
    basis.push(
      "상여금과 미사용 연차수당은 연간 지급액의 3/12만큼만 반영했습니다."
    );
  }

  const estimatedPay = dailyAverageWage * 30 * (totalServiceDays / 365);

  let eligibleStatus: StatusLevel;
  let eligibleLabel: string;
  if (totalServiceDays >= 365) {
    eligibleStatus = "success";
    eligibleLabel = "퇴직금 발생 가능성 높음";
  } else if (totalServiceDays >= 300) {
    eligibleStatus = "warning";
    eligibleLabel = "1년 근속에 근접 · 추가 확인 필요";
  } else {
    eligibleStatus = "danger";
    eligibleLabel = "퇴직금 발생 가능성 낮음 (1년 미만 근속)";
  }

  basis.push(
    `총 재직일수는 입사일부터 퇴사일까지 ${totalServiceDays}일로 계산했습니다.`
  );

  return {
    totalServiceDays,
    eligibleStatus,
    eligibleLabel,
    dailyAverageWage,
    estimatedPay,
    basis,
  };
}
