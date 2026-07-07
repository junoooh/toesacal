"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import YesNoUnknown from "@/components/ui/YesNoUnknown";
import {
  RESIGN_REASONS,
  type ResignReason,
  type UnemploymentInput,
  type YesNoUnknown as YesNoUnknownValue,
} from "@/lib/calculations/unemployment";

type UnemploymentFormProps = {
  onSubmit: (input: UnemploymentInput) => void;
};

export default function UnemploymentForm({ onSubmit }: UnemploymentFormProps) {
  const [resignDate, setResignDate] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [hireDateUnknown, setHireDateUnknown] = useState(false);
  const [workedOver15h, setWorkedOver15h] = useState<YesNoUnknownValue>("yes");
  const [reason, setReason] = useState<ResignReason | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!resignDate || !reason) {
      setError("퇴사(예정)일과 퇴사 사유는 꼭 선택해주세요.");
      return;
    }
    if (!hireDateUnknown && !hireDate) {
      setError("근무 시작일을 입력하거나 모르겠어요를 선택해주세요.");
      return;
    }
    if (!hireDateUnknown && hireDate >= resignDate) {
      setError("근무 시작일은 퇴사(예정)일보다 이전 날짜여야 해요.");
      return;
    }
    setError(null);
    onSubmit({
      resignDate,
      hireDate: hireDateUnknown ? null : hireDate,
      workedOver15hPerWeek: workedOver15h,
      reason,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <p className="rounded-lg bg-danger-bg px-3 py-2 text-xs font-medium text-danger">
          {error}
        </p>
      )}

      <label className="text-xs font-bold text-sub">
        퇴사 예정일 또는 퇴사일
        <input
          type="date"
          value={resignDate}
          onChange={(e) => setResignDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-sm text-text"
        />
      </label>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-sub">근무 시작일 (입사일)</p>
          <button
            type="button"
            onClick={() => setHireDateUnknown((v) => !v)}
            className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
              hireDateUnknown
                ? "border-sub bg-neutral-bg text-sub"
                : "border-border text-sub hover:border-primary"
            }`}
          >
            모르겠어요
          </button>
        </div>
        {!hireDateUnknown && (
          <input
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border px-3 py-2.5 text-sm text-text"
          />
        )}
        {!hireDateUnknown && (
          <p className="mt-1.5 text-xs text-sub">
            근무 시작일과 퇴사(예정)일을 기준으로 이직일 이전 18개월 중
            피보험단위기간을 자동으로 계산해드려요.
          </p>
        )}
        {hireDateUnknown && (
          <p className="mt-2 text-xs text-sub">
            정확한 근무 시작일은 고용센터에서 확인할 수 있어요. 일단 이 항목은
            건너뛰고 계속 진행할게요.
          </p>
        )}
      </div>

      <YesNoUnknown
        label="주 15시간 이상 근무했나요?"
        value={workedOver15h}
        onChange={setWorkedOver15h}
      />

      <div>
        <p className="text-xs font-bold text-sub">퇴사 사유</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {RESIGN_REASONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setReason(option.value)}
              className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
                reason === option.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-sub"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full">
        실업급여 조건 확인하기
      </Button>
    </form>
  );
}
