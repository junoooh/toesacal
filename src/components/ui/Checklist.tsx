"use client";

import { useEffect, useState } from "react";
import { CheckCircleIcon } from "./icons";

type ChecklistProps = {
  items: string[];
  className?: string;
  // 지정하면 완료 표시가 브라우저(localStorage)에 저장되어 새로고침해도 유지됩니다.
  storageKey?: string;
};

export default function Checklist({ items, className = "", storageKey }: ChecklistProps) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(`bboggl:checklist:${storageKey}`);
      if (raw) {
        const saved = JSON.parse(raw) as boolean[];
        setChecked(items.map((_, i) => Boolean(saved[i])));
      }
    } catch {
      // 저장된 값을 읽을 수 없으면 기본값(전부 미완료)을 사용합니다.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  function toggle(index: number) {
    setChecked((prev) => {
      const next = prev.map((v, i) => (i === index ? !v : v));
      if (storageKey && typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            `bboggl:checklist:${storageKey}`,
            JSON.stringify(next)
          );
        } catch {
          // localStorage를 사용할 수 없어도 화면 동작에는 문제가 없습니다.
        }
      }
      return next;
    });
  }

  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {items.map((item, index) => (
        <li key={item}>
          <button
            type="button"
            onClick={() => toggle(index)}
            className="flex w-full items-start gap-2.5 rounded-lg border border-border bg-surface px-3 py-2.5 text-left text-sm transition hover:border-primary/40"
          >
            <CheckCircleIcon
              className={`mt-0.5 h-5 w-5 shrink-0 ${
                checked[index] ? "text-success" : "text-border"
              }`}
            />
            <span
              className={
                checked[index] ? "text-sub line-through" : "text-text"
              }
            >
              {item}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
