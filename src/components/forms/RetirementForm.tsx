"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import NumberField from "@/components/ui/NumberField";
import type { RetirementInput, WageMode } from "@/lib/calculations/retirement";

type RetirementFormProps = {
  initialValues?: Partial<RetirementInput>;
  onSubmit: (input: RetirementInput) => void;
};

const DEFAULT_VALUES: RetirementInput = {
  hireDate: "",
  resignDate: "",
  wageMode: "monthly",
  recent3MonthWage: 0,
  recent3MonthBonus: 0,
  recent3MonthOtherAllowance: 0,
  unusedAnnualLeavePay: 0,
  dailyAverageWageDirect: 0,
};

export default function RetirementForm({
  initialValues,
  onSubmit,
}: RetirementFormProps) {
  const [values, setValues] = useState<RetirementInput>({
    ...DEFAULT_VALUES,
    ...initialValues,
  });

  function set<K extends keyof RetirementInput>(key: K, value: RetirementInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function setMode(mode: WageMode) {
    set("wageMode", mode);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-bold text-sub">
          입사일
          <input
            type="date"
            value={values.hireDate}
            onChange={(e) => set("hireDate", e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-sm text-text"
          />
        </label>
        <label className="text-xs font-bold text-sub">
          퇴사일
          <input
            type="date"
            value={values.resignDate}
            onChange={(e) => set("resignDate", e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-sm text-text"
          />
        </label>
      </div>

      <div>
        <p className="text-xs font-bold text-sub">평균임금 입력 방식</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("monthly")}
            className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
              values.wageMode === "monthly"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-sub"
            }`}
          >
            월급으로 계산
          </button>
          <button
            type="button"
            onClick={() => setMode("averageDirect")}
            className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
              values.wageMode === "averageDirect"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-sub"
            }`}
          >
            평균임금 직접 입력
          </button>
        </div>
      </div>

      {values.wageMode === "monthly" ? (
        <div className="flex flex-col gap-4">
          <p className="rounded-lg bg-primary/10 px-3 py-2.5 text-xs leading-relaxed text-primary">
            근로기준법상 평균임금은 <strong>퇴사일 이전 3개월간</strong> 받은
            임금총액을 그 기간의 총일수로 나눈 금액이에요. 상여금·연차수당처럼
            1년 단위로 받는 항목은 3개월치를 그대로 넣지 않고, 연간 지급액의
            3/12만 반영해서 계산해드려요.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              label="최근 3개월 총 급여"
              value={values.recent3MonthWage}
              onChange={(v) => set("recent3MonthWage", v)}
              suffix="원"
            />
            <NumberField
              label="최근 1년간 받은 상여금 총액"
              value={values.recent3MonthBonus}
              onChange={(v) => set("recent3MonthBonus", v)}
              suffix="원"
            />
            <NumberField
              label="최근 3개월 기타 수당"
              value={values.recent3MonthOtherAllowance}
              onChange={(v) => set("recent3MonthOtherAllowance", v)}
              suffix="원"
              helpText="기본급, 연장·야간·휴일근로수당, 식대처럼 매달 받는 급여는 이미 '최근 3개월 총 급여'에 포함해서 입력하시면 돼요. 여기에는 그 외에 3개월 동안 추가로 받았지만 매달 받지는 않는 수당(예: 자격수당, 특별수당 등 임금 성격의 금액)이 있다면 입력해주세요. 상여금이나 미사용 연차수당처럼 1년 단위로 받는 금액은 각각의 칸에 따로 입력해주세요."
            />
            <NumberField
              label="미사용 연차수당"
              value={values.unusedAnnualLeavePay}
              onChange={(v) => set("unusedAnnualLeavePay", v)}
              suffix="원"
            />
          </div>
        </div>
      ) : (
        <NumberField
          label="1일 평균임금"
          value={values.dailyAverageWageDirect}
          onChange={(v) => set("dailyAverageWageDirect", v)}
          suffix="원"
        />
      )}

      <Button type="submit" className="w-full">
        퇴직금 계산하기
      </Button>
    </form>
  );
}
