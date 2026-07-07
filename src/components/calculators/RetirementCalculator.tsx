"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import RetirementForm from "@/components/forms/RetirementForm";
import RetirementResult from "@/components/results/RetirementResult";
import {
  calculateRetirementPay,
  type RetirementInput,
  type RetirementResult as RetirementResultType,
} from "@/lib/calculations/retirement";
import { saveCalculatorResult, STORAGE_KEYS } from "@/lib/storage";

type Mode = "form" | "result";

export default function RetirementCalculator() {
  const [mode, setMode] = useState<Mode>("form");
  const [result, setResult] = useState<RetirementResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(input: RetirementInput) {
    const calculated = calculateRetirementPay(input);
    if (!calculated) {
      setError("퇴사일은 입사일보다 이후 날짜여야 해요. 날짜를 다시 확인해주세요.");
      return;
    }
    setError(null);
    setResult(calculated);
    setMode("result");
    saveCalculatorResult(STORAGE_KEYS.retirement, {
      input,
      result: calculated,
      savedAt: new Date().toISOString(),
    });
  }

  if (mode === "form") {
    return (
      <Card className="p-6">
        {error && (
          <p className="mb-4 rounded-lg bg-danger-bg px-3 py-2 text-xs font-medium text-danger">
            {error}
          </p>
        )}
        <RetirementForm onSubmit={handleSubmit} />
      </Card>
    );
  }

  if (mode === "result" && result) {
    return (
      <div className="flex flex-col gap-4">
        <RetirementResult result={result} />
        <button
          type="button"
          onClick={() => {
            setMode("form");
            setResult(null);
          }}
          className="self-start text-xs font-medium text-sub hover:text-primary"
        >
          ← 처음부터 다시 계산하기
        </button>
      </div>
    );
  }

  return null;
}
