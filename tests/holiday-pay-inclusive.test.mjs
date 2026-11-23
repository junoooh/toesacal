import assert from "node:assert/strict";
import test from "node:test";
import { calculateHolidayPay } from "../src/lib/calculations/holidayPay.ts";

const input = {
  hourlyWage: 12600,
  dailyHours: [8, 8, 8, 8, 8, 0, 0],
  hadAbsence: "no",
  absenceDays: 0,
  workType: "fullTime",
};

test("an inclusive wage is not increased by a second weekly holiday payment", () => {
  const result = calculateHolidayPay({ ...input, wageIncludesHolidayPay: "yes" });
  assert.equal(result.weeklyHolidayPay, 0);
  assert.equal(result.weeklyPayWithHolidayPay, 504000);
  assert.equal(Math.round(result.monthlyEstimateWithHolidayPay), 2190000);
  assert.equal(result.weeklyPayWithoutHolidayPay, null);
  assert.equal(result.monthlyEstimateWithoutHolidayPay, null);
});

for (const inclusion of ["no", "unknown"]) {
  test(`the two original estimates are unchanged when inclusion is "${inclusion}"`, () => {
    const result = calculateHolidayPay({ ...input, wageIncludesHolidayPay: inclusion });
    assert.equal(result.status, inclusion === "no" ? "success" : "warning");
    assert.equal(result.weeklyHolidayPay, 100800);
    assert.equal(result.weeklyPayWithHolidayPay, 604800);
    assert.equal(Math.round(result.monthlyEstimateWithHolidayPay), 2628000);
    assert.equal(result.weeklyPayWithoutHolidayPay, 504000);
    assert.equal(Math.round(result.monthlyEstimateWithoutHolidayPay), 2190000);
  });
}
