import assert from "node:assert/strict";
import test from "node:test";
import { calculateUnemploymentEligibility } from "../src/lib/calculations/unemployment.ts";

const input = {
  resignDate: "2026-11-15",
  hireDate: "2026-05-18",
  workedOver15hPerWeek: "yes",
  reason: "recommended",
};

function assertUnconfirmed(result) {
  assert.ok(result);
  assert.equal(result.status, "warning");
  assert.equal(result.label, "추가 확인 필요");
  const insuredDaysItem = result.checklist.find((item) => item.text.includes("피보험단위기간"));
  assert.equal(insuredDaysItem.status, "warning");
  assert.match(insuredDaysItem.text, /180일 이상인지 확인 필요/);
}

test("181 elapsed calendar days do not establish 180 insured days", () => {
  // Under one paid-Sunday/unpaid-Saturday schedule the actual total could be 156.
  const result = calculateUnemploymentEligibility(input);
  assertUnconfirmed(result);
  assert.match(result.summaryLines.join("\n"), /달력상 181일 경과, 참고용/);
  assert.doesNotMatch(result.checklist.map(({ text }) => text).join("\n"), /181일|156일/);
  assert.match(result.policyNotes.join("\n"), /무급휴일은 제외/);
});

test("153 elapsed days with the latest employer do not rule out earlier coverage", () => {
  const result = calculateUnemploymentEligibility({ ...input, hireDate: "2026-06-15" });
  assertUnconfirmed(result);
  assert.match(result.summaryLines.join("\n"), /달력상 153일 경과, 참고용/);
  assert.match(result.centerChecks.join("\n"), /이전 직장 일수의 합산 가능 여부/);
});

test("a missing hire date does not give a zero-day estimate or prevent guidance", () => {
  const result = calculateUnemploymentEligibility({ ...input, hireDate: null });
  assertUnconfirmed(result);
  assert.match(result.summaryLines.join("\n"), /근무 시작일: 모르겠음/);
  assert.doesNotMatch(result.summaryLines.join("\n"), /달력상/);
  assert.equal(calculateUnemploymentEligibility({ ...input, resignDate: "" }), null);
  assert.equal(calculateUnemploymentEligibility({ ...input, hireDate: "2026-11-16" }), null);
});

test("wage arrears and ordinary voluntary resignation both need case-specific review", () => {
  for (const reason of ["wageDelay", "voluntary"]) {
    const result = calculateUnemploymentEligibility({ ...input, reason });
    assertUnconfirmed(result);
    const reasonItem = result.checklist.find((item) => item.text.startsWith("퇴사 사유:"));
    assert.equal(reasonItem.status, "warning");
    assert.match(reasonItem.text, reason === "wageDelay" ? /증빙과 함께 확인 필요/ : /예외 사유/);
    if (reason === "wageDelay") assert.match(result.centerChecks.join("\n"), /임금체불.*증빙자료/);
  }
});

test("short weekly hours alone do not imply a different lookback period", () => {
  const result = calculateUnemploymentEligibility({ ...input, workedOver15hPerWeek: "no" });
  assertUnconfirmed(result);
  assert.match(result.checklist.map(({ text }) => text).join("\n"), /적용 기준기간 확인 필요/);
  assert.doesNotMatch(result.policyNotes.join("\n"), /24개월/);
});
