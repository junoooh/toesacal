import type { RetirementInput, RetirementResult } from "@/lib/calculations/retirement";
import type { UnemploymentInput, UnemploymentResult } from "@/lib/calculations/unemployment";
import type { HolidayPayInput, HolidayPayResult } from "@/lib/calculations/holidayPay";

const PREFIX = "bboggl:";

export type SavedRetirement = {
  input: RetirementInput;
  result: RetirementResult;
  savedAt: string;
};

export type SavedUnemployment = {
  input: UnemploymentInput;
  result: UnemploymentResult;
  savedAt: string;
};

export type SavedHolidayPay = {
  input: HolidayPayInput;
  result: HolidayPayResult;
  savedAt: string;
};

export const STORAGE_KEYS = {
  retirement: "retirement",
  unemployment: "unemployment",
  holidayPay: "holidayPay",
} as const;

// 모든 데이터는 브라우저(localStorage)에만 저장되며 서버로 전송되지 않습니다.
export function saveCalculatorResult<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(data));
  } catch {
    // localStorage를 사용할 수 없는 환경(예: 프라이빗 모드)에서는 조용히 무시합니다.
  }
}

export function loadCalculatorResult<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
