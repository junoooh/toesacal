"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import HolidayPayForm from "@/components/forms/HolidayPayForm";
import HolidayPayResult from "@/components/results/HolidayPayResult";
import {
  calculateHolidayPay,
  type HolidayPayInput,
  type HolidayPayResult as HolidayPayResultType,
} from "@/lib/calculations/holidayPay";
import { saveCalculatorResult, STORAGE_KEYS } from "@/lib/storage";

export default function HolidayPayCalculator() {
  const [result, setResult] = useState<HolidayPayResultType | null>(null);

  function handleSubmit(input: HolidayPayInput) {
    const calculated = calculateHolidayPay(input);
    if (!calculated) return;
    setResult(calculated);
    saveCalculatorResult(STORAGE_KEYS.holidayPay, {
      input,
      result: calculated,
      savedAt: new Date().toISOString(),
    });
  }

  if (result) {
    return (
      <div className="flex flex-col gap-4">
        <HolidayPayResult result={result} />
        <button
          type="button"
          onClick={() => setResult(null)}
          className="self-start text-xs font-medium text-sub hover:text-primary"
        >
          ← 처음부터 다시 계산하기
        </button>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <HolidayPayForm onSubmit={handleSubmit} />
    </Card>
  );
}
