import type { StatusLevel } from "@/lib/types";

export type YesNoUnknown = "yes" | "no" | "unknown";

export type ResignReason =
  | "recommended"
  | "contractEnd"
  | "closure"
  | "voluntary"
  | "wageDelay"
  | "illness"
  | "commute"
  | "other";

export const RESIGN_REASONS: { value: ResignReason; label: string }[] = [
  { value: "recommended", label: "권고사직" },
  { value: "contractEnd", label: "계약만료" },
  { value: "closure", label: "회사 폐업" },
  { value: "voluntary", label: "자진퇴사" },
  { value: "wageDelay", label: "임금체불" },
  { value: "illness", label: "질병" },
  { value: "commute", label: "통근 곤란" },
  { value: "other", label: "기타" },
];

const INVOLUNTARY: ResignReason[] = [
  "recommended",
  "contractEnd",
  "closure",
  "wageDelay",
];
const JUSTIFIED_VOLUNTARY: ResignReason[] = ["illness", "commute"];

export type UnemploymentInput = {
  resignDate: string;
  hireDate: string | null; // null = 모르겠음
  workedOver15hPerWeek: YesNoUnknown;
  reason: ResignReason | null;
};

export type UnemploymentResult = {
  status: StatusLevel;
  label: string;
  summaryLines: string[];
  checklist: { text: string; status: StatusLevel }[];
  centerChecks: string[];
  documents: string[];
  cautions: string[];
  policyNotes: string[];
};

const REQUIRED_DAYS = 180;
const LOOKBACK_MONTHS = 18;

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function daysBetween(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
}

function subtractMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
}

// 이직일 이전 18개월 중 실제 고용보험에 가입되어 있던 달력일수(주말·공휴일 포함)를 계산합니다.
// 실제 피보험단위기간(보수지급의 기초가 된 날)은 무급 휴무일 등에 따라 이 값과 다소 달라질 수 있습니다.
function calculateInsuredCalendarDays(hireDate: Date, resignDate: Date): number {
  const lookbackStart = subtractMonths(resignDate, LOOKBACK_MONTHS);
  const windowStart = hireDate > lookbackStart ? hireDate : lookbackStart;
  return Math.max(daysBetween(windowStart, resignDate), 0);
}

export function calculateUnemploymentEligibility(
  input: UnemploymentInput
): UnemploymentResult | null {
  if (!input.resignDate || !input.reason) return null;

  const resign = new Date(input.resignDate);
  if (Number.isNaN(resign.getTime())) return null;

  const reasonInfo = RESIGN_REASONS.find((r) => r.value === input.reason);
  const insuredUnknown = input.hireDate === null;

  let insuredDays = 0;
  if (!insuredUnknown) {
    const hire = new Date(input.hireDate as string);
    if (Number.isNaN(hire.getTime()) || hire >= resign) return null;
    insuredDays = calculateInsuredCalendarDays(hire, resign);
  }
  const insuredOk = !insuredUnknown && insuredDays >= REQUIRED_DAYS;

  const isInvoluntary = INVOLUNTARY.includes(input.reason);
  const isJustifiedVoluntary = JUSTIFIED_VOLUNTARY.includes(input.reason);
  const isPlainVoluntary = input.reason === "voluntary";

  const checklist: { text: string; status: StatusLevel }[] = [];

  if (insuredUnknown) {
    checklist.push({
      text: "이직일 이전 18개월 중 피보험단위기간 180일 이상 (확인 필요)",
      status: "warning",
    });
  } else {
    checklist.push({
      text: `이직일 이전 18개월 중 피보험단위기간 180일 이상 (근무 시작일 기준 약 ${insuredDays}일 계산됨)`,
      status: insuredOk ? "success" : "danger",
    });
  }

  if (input.workedOver15hPerWeek === "unknown") {
    checklist.push({ text: "주 15시간 이상 근무 여부 (확인 필요)", status: "warning" });
  } else {
    checklist.push({
      text: `주 15시간 이상 근무: ${input.workedOver15hPerWeek === "yes" ? "예" : "아니오 (초단시간, 24개월 중 180일 기준 적용)"}`,
      status: input.workedOver15hPerWeek === "yes" ? "success" : "warning",
    });
  }

  checklist.push({
    text: `퇴사 사유: ${reasonInfo?.label ?? "-"}`,
    status: isInvoluntary ? "success" : isJustifiedVoluntary ? "warning" : isPlainVoluntary ? "danger" : "warning",
  });

  // 종합 판정
  let status: StatusLevel;
  let label: string;

  if (!insuredUnknown && !insuredOk) {
    status = "danger";
    label = "가능성 낮음";
  } else if (isPlainVoluntary) {
    status = "danger";
    label = "가능성 낮음 (자진퇴사)";
  } else if (
    insuredUnknown ||
    input.workedOver15hPerWeek === "unknown" ||
    isJustifiedVoluntary ||
    input.reason === "other"
  ) {
    status = "warning";
    label = "추가 확인 필요";
  } else if (isInvoluntary && input.workedOver15hPerWeek === "yes" && insuredOk) {
    status = "success";
    label = "가능성 높음";
  } else {
    status = "warning";
    label = "추가 확인 필요";
  }

  const summaryLines = [
    `퇴사(예정)일: ${input.resignDate}`,
    insuredUnknown
      ? "근무 시작일: 모르겠음으로 표시함"
      : `근무 시작일: ${input.hireDate} (이직일 이전 18개월 중 약 ${insuredDays}일 계산됨)`,
    `주 15시간 이상 근무: ${
      input.workedOver15hPerWeek === "unknown"
        ? "모르겠음"
        : input.workedOver15hPerWeek === "yes"
          ? "예"
          : "아니오"
    }`,
    `퇴사 사유: ${reasonInfo?.label ?? "-"}`,
  ];

  const centerChecks: string[] = [
    "정확한 피보험단위기간 및 소정급여일수",
  ];
  if (insuredUnknown) {
    centerChecks.push("고용보험 가입기간 및 실제 근무일수 확인");
  }
  if (input.workedOver15hPerWeek === "unknown") {
    centerChecks.push("주당 실제 소정근로시간 확인");
  }
  if (isJustifiedVoluntary || input.reason === "other") {
    centerChecks.push("자진퇴사의 정당한 사유 인정 여부");
  }
  if (isPlainVoluntary) {
    centerChecks.push("예외적으로 인정되는 자진퇴사 사유에 해당하는지 여부");
  }

  const documents = [
    "이직확인서",
    "고용보험 피보험자격 상실 신고 확인",
    "신분증",
    "통장 사본",
    "구직활동 관련 자료",
  ];

  const cautions = [
    "이직확인서 처리가 끝나기 전에 재취업하면 수급에 불이익이 있을 수 있어요.",
    "퇴사 사유를 허위로 기재해 신청하면 부정수급으로 처벌받을 수 있어요.",
    "퇴사 후에는 워크넷 구직신청과 고용센터 방문(또는 온라인 신청)을 최대한 빨리 진행하세요.",
  ];

  const policyNotes = [
    "2026년 기준 구직급여는 1일 하한액 66,048원(최저임금 10,320원×8시간×80%), 1일 상한액 68,100원입니다.",
    "피보험단위기간은 원칙적으로 18개월 중 180일 이상이어야 하며, 주 15시간 미만 초단시간 근로자는 24개월 중 180일 기준이 적용됩니다.",
    "위 180일 계산은 근무 시작일부터 퇴사일까지의 달력일수(주말·공휴일 포함)를 기준으로 한 근사치입니다. 실제 피보험단위기간은 무급 휴무일 등 회사 취업규칙에 따라 다소 달라질 수 있어 고용센터 확인이 필요합니다.",
  ];

  return {
    status,
    label,
    summaryLines,
    checklist,
    centerChecks,
    documents,
    cautions,
    policyNotes,
  };
}
