"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Checklist from "@/components/ui/Checklist";

const BEFORE_ITEMS = [
  "퇴사일 확정",
  "사직서 작성 여부 확인",
  "권고사직 사유 확인",
  "이직확인서 요청",
  "퇴직금 지급 예정일 확인",
  "미사용 연차 정산 확인",
  "급여명세서 보관",
  "고용보험 가입기간 확인",
];

const AFTER_ITEMS = [
  "고용보험 상실 신고 확인",
  "이직확인서 처리 여부 확인",
  "워크넷 구직신청",
  "고용센터 방문 또는 온라인 신청",
  "퇴직금 입금 확인",
  "마지막 급여 정산 확인",
];

function daysUntil(dateStr: string): number | null {
  const target = new Date(dateStr);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ResignationChecklist() {
  const [resignDate, setResignDate] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("bboggl:resignDate");
      if (saved) setResignDate(saved);
    } catch {
      // 저장된 날짜가 없으면 빈 값으로 시작합니다.
    }
  }, []);

  function handleDateChange(value: string) {
    setResignDate(value);
    try {
      window.localStorage.setItem("bboggl:resignDate", value);
    } catch {
      // localStorage를 사용할 수 없어도 화면 동작에는 문제가 없습니다.
    }
  }

  const remaining = resignDate ? daysUntil(resignDate) : null;

  return (
    <Card className="p-6">
      <h3 className="text-lg text-text">퇴사 전 체크리스트</h3>
      <p className="mt-1.5 text-sm text-sub">
        퇴사 예정일을 입력하면 퇴사 전후로 확인해야 할 일을 순서대로 보여드려요.
      </p>

      <label className="mt-4 block text-xs font-bold text-sub">
        퇴사 예정일
        <input
          type="date"
          value={resignDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="mt-1 w-full max-w-xs rounded-lg border border-border px-3 py-2.5 text-sm text-text"
        />
      </label>

      {remaining !== null && (
        <p className="mt-2 text-xs font-medium text-primary">
          {remaining > 0
            ? `퇴사까지 ${remaining}일 남았어요.`
            : remaining === 0
              ? "오늘이 퇴사(예정)일이에요."
              : `퇴사 후 ${Math.abs(remaining)}일이 지났어요.`}
        </p>
      )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold text-sub">퇴사 전 확인할 것</p>
          <Checklist
            items={BEFORE_ITEMS}
            className="mt-2"
            storageKey="resignation-before"
          />
        </div>
        <div>
          <p className="text-xs font-bold text-sub">퇴사 후 확인할 것</p>
          <Checklist
            items={AFTER_ITEMS}
            className="mt-2"
            storageKey="resignation-after"
          />
        </div>
      </div>
    </Card>
  );
}
