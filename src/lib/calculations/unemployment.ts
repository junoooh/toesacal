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
];
const POSSIBLE_JUSTIFIED_VOLUNTARY: ResignReason[] = ["wageDelay", "illness", "commute"];

export const INSURED_DAY_GUIDANCE_URL = "https://1350.moel.go.kr/rtmview.do?id=1000302825";

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

export function calculateUnemploymentEligibility(
  input: UnemploymentInput
): UnemploymentResult | null {
  if (!input.resignDate || !input.reason) return null;

  const resign = new Date(input.resignDate);
  if (Number.isNaN(resign.getTime())) return null;

  const reasonInfo = RESIGN_REASONS.find((r) => r.value === input.reason);

  let calendarDays: number | null = null;
  if (input.hireDate !== null) {
    const hire = new Date(input.hireDate);
    if (Number.isNaN(hire.getTime()) || hire >= resign) return null;
    calendarDays = daysBetween(hire, resign);
  }

  const isInvoluntary = INVOLUNTARY.includes(input.reason);
  const isPossiblyJustifiedVoluntary = POSSIBLE_JUSTIFIED_VOLUNTARY.includes(input.reason);
  const isPlainVoluntary = input.reason === "voluntary";

  const checklist: UnemploymentResult["checklist"] = [
    {
      text: `피보험단위기간 ${REQUIRED_DAYS}일 이상인지 확인 필요 (원칙: 이직일 이전 ${LOOKBACK_MONTHS}개월)`,
      status: "warning",
    },
  ];

  if (input.workedOver15hPerWeek === "unknown") {
    checklist.push({ text: "주 15시간 이상 근무 여부 (확인 필요)", status: "warning" });
  } else {
    checklist.push({
      text: input.workedOver15hPerWeek === "yes"
        ? "주 15시간 이상 근무: 예로 입력함"
        : "주 15시간 이상 근무: 아니오로 입력함 (적용 기준기간 확인 필요)",
      status: input.workedOver15hPerWeek === "yes" ? "neutral" : "warning",
    });
  }

  let reasonCheck = "이직 사유 인정 여부 확인 필요";
  if (isInvoluntary) {
    reasonCheck = "비자발적 사유로 입력함, 이직확인서 확인 필요";
  } else if (isPossiblyJustifiedVoluntary) {
    reasonCheck = "정당한 이직 사유에 해당하는지 증빙과 함께 확인 필요";
  } else if (isPlainVoluntary) {
    reasonCheck = "일반적으로 수급이 제한되지만, 예외 사유가 있는지 확인 필요";
  }
  checklist.push({
    text: `퇴사 사유: ${reasonInfo?.label ?? "-"} (${reasonCheck})`,
    status: "warning",
  });

  const summaryLines = [
    `퇴사(예정)일: ${input.resignDate}`,
    calendarDays === null
      ? "근무 시작일: 모르겠음으로 표시함"
      : `근무 시작일: ${input.hireDate} (퇴사일까지 달력상 ${calendarDays}일 경과, 참고용)`,
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
    "이직확인서상 피보험단위기간, 이전 직장 일수의 합산 가능 여부 및 소정급여일수",
  ];
  if (input.workedOver15hPerWeek !== "yes") {
    centerChecks.push("소정근로시간·근로일수에 따른 적용 기준기간 확인");
  }
  if (isPossiblyJustifiedVoluntary || input.reason === "other") {
    centerChecks.push("자진퇴사의 정당한 사유 인정 여부");
  }
  if (input.reason === "wageDelay") {
    centerChecks.push("임금체불 기간과 금액 등 인정 요건 및 증빙자료");
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
    `원칙적으로 이직일 이전 ${LOOKBACK_MONTHS}개월 동안의 피보험단위기간을 합산해 ${REQUIRED_DAYS}일 이상인지 확인해요. 근무 형태 등에 따라 적용 기준기간이 달라질 수 있어요.`,
    "피보험단위기간은 고용보험 가입기간 중 보수 지급의 기초가 된 날을 합산한 값이에요. 유급휴일은 포함될 수 있고 무급휴일은 제외돼요. 기준기간 안에서 이전 직장의 해당 일수도 합산될 수 있어요.",
    "입력한 날짜로 표시하는 달력상 경과일은 참고용이며, 피보험단위기간이나 수급 자격을 뜻하지 않아요.",
  ];

  return {
    status: "warning",
    label: "추가 확인 필요",
    summaryLines,
    checklist,
    centerChecks,
    documents,
    cautions,
    policyNotes,
  };
}
