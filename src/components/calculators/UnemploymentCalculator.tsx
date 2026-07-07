"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import UnemploymentForm from "@/components/forms/UnemploymentForm";
import UnemploymentResult from "@/components/results/UnemploymentResult";
import {
  calculateUnemploymentEligibility,
  type UnemploymentInput,
  type UnemploymentResult as UnemploymentResultType,
} from "@/lib/calculations/unemployment";
import { saveCalculatorResult, STORAGE_KEYS } from "@/lib/storage";

export default function UnemploymentCalculator() {
  const [result, setResult] = useState<UnemploymentResultType | null>(null);

  function handleSubmit(input: UnemploymentInput) {
    const calculated = calculateUnemploymentEligibility(input);
    if (!calculated) return;
    setResult(calculated);
    saveCalculatorResult(STORAGE_KEYS.unemployment, {
      input,
      result: calculated,
      savedAt: new Date().toISOString(),
    });
  }

  if (result) {
    return (
      <div className="flex flex-col gap-4">
        <UnemploymentResult result={result} />
        <button
          type="button"
          onClick={() => setResult(null)}
          className="self-start text-xs font-medium text-sub hover:text-primary"
        >
          ← 처음부터 다시 확인하기
        </button>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <UnemploymentForm onSubmit={handleSubmit} />
    </Card>
  );
}
