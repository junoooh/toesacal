"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import NumberField from "@/components/ui/NumberField";
import YesNoUnknown from "@/components/ui/YesNoUnknown";
import type { YesNoUnknown as YesNoUnknownValue } from "@/lib/calculations/unemployment";
import {
  DAY_LABELS,
  WORK_TYPES,
  type HolidayPayInput,
  type WorkType,
} from "@/lib/calculations/holidayPay";

type HolidayPayFormProps = {
  onSubmit: (input: HolidayPayInput) => void;
};

type HourMode = "uniform" | "byDay";

const EMPTY_DAYS = [0, 0, 0, 0, 0, 0, 0];

export default function HolidayPayForm({ onSubmit }: HolidayPayFormProps) {
  const [hourlyWage, setHourlyWage] = useState(0);
  const [hourMode, setHourMode] = useState<HourMode>("uniform");

  // 매일 동일 모드
  const [hoursPerDay, setHoursPerDay] = useState(0);
  const [daysPerWeek, setDaysPerWeek] = useState(0);

  // 요일마다 다름 모드 (알바·일용직처럼 하루하루 근무시간이 다른 경우)
  const [dailyHours, setDailyHours] = useState<number[]>(EMPTY_DAYS);

  const [hadAbsence, setHadAbsence] = useState<YesNoUnknownValue>("no");
  const [absenceDays, setAbsenceDays] = useState(1);
  const [workType, setWorkType] = useState<WorkType>("partTime");
  const [wageIncludesHolidayPay, setWageIncludesHolidayPay] =
    useState<YesNoUnknownValue>("no");
  const [error, setError] = useState<string | null>(null);

  function setDayHour(index: number, value: number) {
    setDailyHours((prev) => prev.map((h, i) => (i === index ? value : h)));
  }

  function buildDailyHours(): number[] {
    if (hourMode === "byDay") return dailyHours;
    return Array.from({ length: 7 }, (_, i) => (i < daysPerWeek ? hoursPerDay : 0));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const resolvedDailyHours = buildDailyHours();
    const totalWeeklyHours = resolvedDailyHours.reduce((sum, h) => sum + h, 0);
    if (hourlyWage <= 0 || totalWeeklyHours <= 0) {
      setError("시급과 근무시간은 0보다 커야 해요.");
      return;
    }
    setError(null);
    onSubmit({
      hourlyWage,
      dailyHours: resolvedDailyHours,
      hadAbsence: hourMode === "byDay" ? "no" : hadAbsence,
      absenceDays: hourMode === "uniform" && hadAbsence === "yes" ? absenceDays : 0,
      workType,
      wageIncludesHolidayPay,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <p className="rounded-lg bg-danger-bg px-3 py-2 text-xs font-medium text-danger">
          {error}
        </p>
      )}

      <NumberField
        label="시급"
        value={hourlyWage}
        onChange={setHourlyWage}
        suffix="원"
      />

      <div>
        <p className="text-xs font-bold text-sub">근무시간 입력 방식</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setHourMode("uniform")}
            className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
              hourMode === "uniform"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-sub"
            }`}
          >
            매일 동일해요
          </button>
          <button
            type="button"
            onClick={() => setHourMode("byDay")}
            className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
              hourMode === "byDay"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-sub"
            }`}
          >
            요일마다 달라요
          </button>
        </div>
        <p className="mt-1.5 text-xs text-sub">
          알바·일용직처럼 하루하루 근무시간이 다르다면 &ldquo;요일마다
          달라요&rdquo;를 선택해서 요일별로 입력해주세요.
        </p>
      </div>

      {hourMode === "uniform" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="하루 근무시간"
            value={hoursPerDay}
            onChange={setHoursPerDay}
            suffix="시간"
            max={24}
          />
          <NumberField
            label="주간 근무일수"
            value={daysPerWeek}
            onChange={setDaysPerWeek}
            suffix="일"
            max={7}
          />
        </div>
      ) : (
        <div>
          <p className="text-xs font-bold text-sub">요일별 근무시간</p>
          <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {DAY_LABELS.map((day, index) => (
              <NumberField
                key={day}
                label={`${day}요일`}
                value={dailyHours[index]}
                onChange={(value) => setDayHour(index, value)}
                suffix="시간"
                max={24}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-sub">
            쉬는 요일이나 결근한 요일은 모두 0시간으로 입력해주세요. 주간 총
            근무시간은 입력한 값을 모두 더해 자동으로 계산해드려요.
          </p>
        </div>
      )}

      {hourMode === "uniform" && (
        <>
          <YesNoUnknown
            label="이번 주에 결근한 날이 있나요?"
            value={hadAbsence}
            onChange={setHadAbsence}
          />

          {hadAbsence === "yes" && (
            <NumberField
              label="결근 일수"
              value={absenceDays}
              onChange={setAbsenceDays}
              suffix="일"
              min={1}
              max={7}
            />
          )}
        </>
      )}

      <div>
        <p className="text-xs font-bold text-sub">근무 형태</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {WORK_TYPES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setWorkType(option.value)}
              className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
                workType === option.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-sub"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <YesNoUnknown
        label="지금 받는 시급에 주휴수당이 이미 포함되어 있나요?"
        value={wageIncludesHolidayPay}
        onChange={setWageIncludesHolidayPay}
      />

      <Button type="submit" className="w-full">
        주휴수당 계산하기
      </Button>
    </form>
  );
}
