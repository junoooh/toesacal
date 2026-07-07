import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  CalculatorIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "이용 가이드",
  description:
    "퇴사계산기의 퇴직금·실업급여·주휴수당 계산기와 통합 결과를 처음 이용하는 분들을 위한 사용법 안내입니다.",
  alternates: { canonical: "/guide" },
};

type Step = { title: string; description: string };

function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="mt-4 flex flex-col gap-3">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-3 rounded-xl border border-border bg-neutral-bg/40 p-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {index + 1}
          </span>
          <div>
            <p className="text-sm font-bold text-text">{step.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-sub">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-sm font-bold text-primary">이용 가이드</p>
      <h1 className="mt-2 text-2xl text-text sm:text-3xl">
        퇴사계산기 처음 사용하시나요?
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-sub">
        회원가입 없이 바로 쓸 수 있도록 만들었어요. 각 계산기를 어떻게
        사용하면 되는지, 데이터는 어떻게 처리되는지 이 페이지에서 한 번에
        확인해보세요.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheckIcon />
            </span>
            <h2 className="text-lg text-text">비회원·비저장 원칙</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-sub">
            퇴사계산기는 회원가입이 없어요. 계산기에 입력한 정보와 계산 결과는
            서버로 전송되지 않고, 이용 중인 브라우저에만
            저장(localStorage)돼요. 그래서 다른 기기나 다른 브라우저에서는
            이전 결과가 보이지 않고, 브라우저 저장공간을 삭제하면 함께
            사라져요. 자세한 내용은{" "}
            <a href="/privacy" className="text-primary underline">
              개인정보처리방침
            </a>
            을 참고해주세요.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalculatorIcon />
            </span>
            <h2 className="text-lg text-text">퇴직금 계산기 사용법</h2>
          </div>
          <StepList
            steps={[
              {
                title: "입사일·퇴사일과 급여 정보를 입력해요",
                description:
                  "월급으로 계산하거나, 1일 평균임금을 알고 있다면 직접 입력할 수도 있어요.",
              },
              {
                title: "결과를 확인해요",
                description:
                  "예상 퇴직금과 계산 기준, 퇴사 전 체크리스트, 관련 글까지 한 번에 볼 수 있어요.",
              },
            ]}
          />
          <Button href="/retirement" variant="outline" className="mt-4 w-full">
            퇴직금 계산기로 이동
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheckIcon />
            </span>
            <h2 className="text-lg text-text">실업급여 조건 체크 사용법</h2>
          </div>
          <StepList
            steps={[
              {
                title: "퇴사(예정)일과 근무 시작일을 입력해요",
                description:
                  "입력한 두 날짜를 기준으로 이직일 이전 18개월 중 피보험단위기간을 자동으로 계산해드려요.",
              },
              {
                title: "근무시간과 퇴사 사유를 선택해요",
                description:
                  "정확히 모르는 항목은 '모르겠음'을 선택해도 괜찮아요. 결과가 '추가 확인 필요'로 안내돼요.",
              },
              {
                title: "결과와 준비 서류를 확인해요",
                description:
                  "가능성 높음/추가 확인 필요/낮음 중 하나로 안내되고, 준비 서류와 주의사항도 함께 보여드려요.",
              },
            ]}
          />
          <Button href="/unemployment" variant="outline" className="mt-4 w-full">
            실업급여 조건 체크로 이동
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClockIcon />
            </span>
            <h2 className="text-lg text-text">주휴수당 계산기 사용법</h2>
          </div>
          <StepList
            steps={[
              {
                title: "시급을 입력해요",
                description: "최저임금 미달 여부도 함께 안내해드려요.",
              },
              {
                title: "근무시간 입력 방식을 선택해요",
                description:
                  "매일 근무시간이 같다면 '매일 동일해요'를, 알바·일용직처럼 요일마다 다르다면 '요일마다 달라요'를 선택해 요일별로 입력하세요.",
              },
              {
                title: "결근 여부와 결과를 확인해요",
                description:
                  "결근이 있으면 개근 조건에 영향을 줄 수 있어요. 주휴수당 포함/미포함 비교까지 함께 확인할 수 있어요.",
              },
            ]}
          />
          <Button href="/holiday-pay" variant="outline" className="mt-4 w-full">
            주휴수당 계산기로 이동
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg text-text">통합 결과 페이지는 이렇게 활용하세요</h2>
          <p className="mt-3 text-sm leading-relaxed text-sub">
            퇴직금·실업급여·주휴수당을 각각 계산했다면{" "}
            <a href="/summary" className="text-primary underline">
              통합 결과
            </a>{" "}
            페이지에서 한 번에 모아볼 수 있어요. 아직 계산하지 않은 항목은
            회색 &ldquo;정보 부족&rdquo;으로 표시되고, 바로 이동해서 계산할 수
            있는 버튼이 함께 나와요. 퇴사 예정일을 입력하면 D-day와 퇴사
            전후 체크리스트도 확인할 수 있고, 체크한 항목은 다시 방문해도
            그대로 남아있어요.
          </p>
        </Card>

        <p className="text-xs leading-relaxed text-sub">
          더 궁금한 점이 있다면{" "}
          <a href="/faq" className="text-primary underline">
            자주 묻는 질문
          </a>
          도 확인해보세요.
        </p>
      </div>
    </div>
  );
}
