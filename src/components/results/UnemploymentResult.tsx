import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Disclaimer from "@/components/ui/Disclaimer";
import { CheckCircleIcon } from "@/components/ui/icons";
import type { UnemploymentResult as UnemploymentResultType } from "@/lib/calculations/unemployment";

const APPLICATION_STEPS = [
  "고용24(work24.go.kr)에서 구직등록 및 이력서를 작성해요.",
  "고용24에서 제공하는 '수급자격 신청자 온라인 교육'을 시청해요.",
  "교육 이수 후 14일 이내에 거주지 관할 고용센터를 방문해 수급자격 인정 신청서를 작성해요 (신분증 지참).",
  "이후 지정된 실업인정일마다 구직활동 등을 신고하면 구직급여가 지급돼요.",
];

type UnemploymentResultProps = {
  result: UnemploymentResultType;
};

export default function UnemploymentResult({ result }: UnemploymentResultProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg text-text">실업급여 조건 체크 결과</h3>
          <StatusBadge status={result.status}>{result.label}</StatusBadge>
        </div>

        <div className="rounded-xl border border-border bg-neutral-bg/50 p-4">
          <p className="text-xs font-bold text-sub">입력하신 내용 요약</p>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-sub">
            {result.summaryLines.map((line) => (
              <li key={line}>· {line}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-sub">조건 충족 여부 체크리스트</p>
          <ul className="mt-2 space-y-2">
            {result.checklist.map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-2.5 rounded-lg border border-border px-3 py-2.5 text-sm"
              >
                <CheckCircleIcon
                  className={`mt-0.5 h-5 w-5 shrink-0 ${
                    item.status === "success"
                      ? "text-success"
                      : item.status === "danger"
                        ? "text-danger"
                        : "text-warning"
                  }`}
                />
                <span className="text-text">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-base text-text">고용센터에 확인해야 할 항목</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-text">
          {result.centerChecks.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-base text-text">준비해야 할 서류</h3>
        <ul className="mt-3 grid gap-1.5 text-sm text-text sm:grid-cols-2">
          {result.documents.map((doc) => (
            <li key={doc}>· {doc}</li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-base text-text">주의해야 할 행동</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-text">
          {result.cautions.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-base text-text">실업급여 신청하기</h3>
        <ol className="mt-3 flex flex-col gap-2.5">
          {APPLICATION_STEPS.map((step, index) => (
            <li key={step} className="flex gap-2.5 text-sm text-text">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {index + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        <a
          href="https://www.work24.go.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-4 w-full"
        >
          고용24에서 신청하러 가기
        </a>
        <p className="mt-2 text-xs text-sub">
          방문 상담이 필요하면 고용노동부 고객상담센터(국번없이 1350)로
          문의할 수 있어요. 이직일 다음 날부터 12개월이 지나면 남은
          수급일수와 관계없이 지급이 종료되니 가능한 한 빨리 신청하는 것이
          좋아요.
        </p>
      </Card>

      <div className="rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-sub">
        {result.policyNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>

      <p className="text-xs font-medium text-sub">
        이 결과는 참고용이며, 최종 수급 가능 여부는 고용센터 확인이 필요합니다.
      </p>

      <Disclaimer />
    </div>
  );
}
