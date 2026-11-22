import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateHolidayPay,
  getDefaultHolidayPayWorkYear,
  HOLIDAY_PAY_MINIMUM_WAGE_FAQ,
} from "../src/lib/calculations/holidayPay.ts";

const baseInput = {
  hourlyWage: 10500,
  dailyHours: [4, 4, 4, 4, 4, 0, 0],
  hadAbsence: "no",
  absenceDays: 0,
  workType: "partTime",
  wageIncludesHolidayPay: "no",
};

test("the work year changes the warning but not the estimate", () => {
  const result2026 = calculateHolidayPay({ ...baseInput, workYear: 2026 });
  const result2027 = calculateHolidayPay({ ...baseInput, workYear: 2027 });
  assert.equal(result2026.belowMinimumWage, false);
  assert.equal(result2027.belowMinimumWage, true);
  assert.match(result2027.notes.join("\n"), /2027년 최저임금\(10,700원\)/);
  assert.equal(result2026.weeklyHolidayPay, 42000);
  assert.equal(result2027.weeklyHolidayPay, result2026.weeklyHolidayPay);
  assert.equal(result2027.weeklyPayWithHolidayPay, result2026.weeklyPayWithHolidayPay);
});

test("only wages below each year's rate trigger the warning", () => {
  for (const [workYear, rate] of [[2026, 10320], [2027, 10700]]) {
    assert.equal(calculateHolidayPay({ ...baseInput, workYear, hourlyWage: rate - 1 }).belowMinimumWage, true);
    assert.equal(calculateHolidayPay({ ...baseInput, workYear, hourlyWage: rate }).belowMinimumWage, false);
  }
});

test("the default follows the Korean calendar and never assumes an unsupported year", () => {
  assert.equal(getDefaultHolidayPayWorkYear(new Date("2026-12-31T14:59:59Z")), 2026);
  assert.equal(getDefaultHolidayPayWorkYear(new Date("2026-12-31T15:00:00Z")), 2027);
  assert.equal(getDefaultHolidayPayWorkYear(new Date("2027-12-31T15:00:00Z")), null);
});

test("an input stored before work-year selection retains its 2026 basis", () => {
  const storedInput = JSON.parse(JSON.stringify({ ...baseInput, hourlyWage: 10319 }));
  const result = calculateHolidayPay(storedInput);
  assert.equal(result.workYear, 2026);
  assert.equal(result.belowMinimumWage, true);
  assert.match(result.notes.join("\n"), /2026년 최저임금\(10,320원\)/);
});

test("FAQ explains both rates and distinguishes the base hourly wage", () => {
  assert.match(HOLIDAY_PAY_MINIMUM_WAGE_FAQ, /2026년 최저임금\(10,320원\)/);
  assert.match(HOLIDAY_PAY_MINIMUM_WAGE_FAQ, /2027년 최저임금\(10,700원\)/);
  assert.match(HOLIDAY_PAY_MINIMUM_WAGE_FAQ, /기본 시급/);
});
