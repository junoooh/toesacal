import type { StatusLevel } from "@/lib/types";
import type { YesNoUnknown } from "@/lib/calculations/unemployment";

export const MINIMUM_WAGE_2026 = 10320;

export const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"] as const;

export type WorkType = "fullTime" | "partTime" | "dailyWork" | "other";

export const WORK_TYPES: { value: WorkType; label: string }[] = [
  { value: "fullTime", label: "정규직" },
  { value: "partTime", label: "아르바이트·시간제" },
  { value: "dailyWork", label: "일용직" },
  { value: "other", label: "기타" },
];

export type HolidayPayInput = {
  hourlyWage: number;
  dailyHours: number[]; // 길이 7, 월~일 각 요일별 근무시간
  hadAbsence: YesNoUnknown;
  absenceDays: number; // hadAbsence가 "yes"일 때만 의미 있음
  workType: WorkType;
  wageIncludesHolidayPay: YesNoUnknown;
};

export type HolidayPayResult = {
  status: StatusLevel;
  label: string;
  dailyHours: number[];
  daysWorked: number;
  absenceDays: number;
  totalWeeklyHours: number;
  weeklyHolidayHours: number;
  weeklyHolidayPay: number;
  weeklyPayWithHolidayPay: number;
  weeklyPayWithoutHolidayPay: number;
  monthlyEstimateWithHolidayPay: number;
  monthlyEstimateWithoutHolidayPay: number;
  belowMinimumWage: boolean;
  notes: string[];
};

const WEEKS_PER_MONTH = 365 / 12 / 7; // 약 4.345주

export function calculateHolidayPay(
  input: HolidayPayInput
): HolidayPayResult | null {
  const totalWeeklyHours = input.dailyHours.reduce((sum, h) => sum + h, 0);
  const daysWorked = input.dailyHours.filter((h) => h > 0).length;

  if (input.hourlyWage <= 0 || totalWeeklyHours <= 0) return null;

  const weeklyHolidayHours = Math.min(8, (totalWeeklyHours / 40) * 8);
  const baseWeeklyPay = input.hourlyWage * totalWeeklyHours;
  const rawHolidayPay = weeklyHolidayHours * input.hourlyWage;

  const meetsHourThreshold = totalWeeklyHours >= 15;
  const wageAlreadyIncludes = input.wageIncludesHolidayPay === "yes";

  const weeklyHolidayPay = wageAlreadyIncludes ? 0 : rawHolidayPay;
  const weeklyPayWithHolidayPay = baseWeeklyPay + rawHolidayPay;
  const weeklyPayWithoutHolidayPay = baseWeeklyPay;

  let status: StatusLevel;
  let label: string;

  if (wageAlreadyIncludes) {
    status = "neutral";
    label = "시급에 이미 포함됨";
  } else if (!meetsHourThreshold || input.hadAbsence === "yes") {
    status = "danger";
    label = "발생 가능성 낮음";
  } else if (
    input.hadAbsence === "unknown" ||
    input.wageIncludesHolidayPay === "unknown"
  ) {
    status = "warning";
    label = "추가 확인 필요";
  } else {
    status = "success";
    label = "발생 가능성 높음";
  }

  const notes: string[] = [
    "주 15시간 이상 근무하고 소정근로일을 개근한 경우 주휴수당 대상이 될 수 있습니다.",
    "주휴시간은 (주간 총 근무시간 ÷ 40) × 8시간으로 계산하며, 최대 8시간까지만 인정됩니다.",
    "요일별로 입력한 근무시간을 모두 더해 주간 총 근무시간을 계산했습니다.",
  ];

  if (wageAlreadyIncludes) {
    notes.push(
      "입력하신 시급에 주휴수당이 이미 포함되어 있다고 하셨으므로, 별도의 주휴수당은 추가로 발생하지 않아요. 근로계약서에서 포함 여부를 다시 한번 확인해보세요."
    );
  }
  if (input.wageIncludesHolidayPay === "unknown") {
    notes.push(
      "시급에 주휴수당이 포함되어 있는지 모르겠다고 하셨어요. 포함되어 있다면 아래 예상 주휴수당만큼 이미 받고 있는 셈이니 근로계약서나 급여명세서를 확인해보세요."
    );
  }
  if (input.hadAbsence === "unknown") {
    notes.push("결근 여부를 모르겠다고 하셨어요. 결근이 있으면 개근 조건을 충족하지 못해 주휴수당이 발생하지 않을 수 있어요.");
  }
  if (input.hadAbsence === "yes") {
    notes.push(
      `이번 주 ${input.absenceDays}일 결근하여 소정근로일 개근 조건을 충족하지 못했어요. 원칙적으로 이번 주는 주휴수당이 발생하지 않아요.`
    );
  }

  const belowMinimumWage = input.hourlyWage < MINIMUM_WAGE_2026;
  if (belowMinimumWage) {
    notes.push(
      `입력하신 시급이 2026년 최저임금(${MINIMUM_WAGE_2026.toLocaleString("ko-KR")}원)보다 낮아요. 최저임금 미달 여부를 확인해보세요.`
    );
  }

  return {
    status,
    label,
    dailyHours: input.dailyHours,
    daysWorked,
    absenceDays: input.hadAbsence === "yes" ? input.absenceDays : 0,
    totalWeeklyHours,
    weeklyHolidayHours,
    weeklyHolidayPay,
    weeklyPayWithHolidayPay,
    weeklyPayWithoutHolidayPay,
    monthlyEstimateWithHolidayPay: weeklyPayWithHolidayPay * WEEKS_PER_MONTH,
    monthlyEstimateWithoutHolidayPay: weeklyPayWithoutHolidayPay * WEEKS_PER_MONTH,
    belowMinimumWage,
    notes,
  };
}
