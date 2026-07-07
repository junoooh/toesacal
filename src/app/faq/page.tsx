import type { Metadata } from "next";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description:
    "퇴사계산기 이용 방법, 데이터 저장 방식, 계산 결과의 신뢰도 등 자주 묻는 질문을 모았습니다.",
  alternates: { canonical: "/faq" },
};

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "회원가입을 해야 이용할 수 있나요?",
    answer:
      "아니요. 퇴사계산기는 회원가입 없이 누구나 바로 이용할 수 있는 비회원 계산기예요.",
  },
  {
    question: "입력한 정보는 어디에 저장되나요?",
    answer:
      "계산기에 입력한 정보와 결과는 서버로 전송되지 않고 이용자의 브라우저(localStorage)에만 저장돼요. 다른 기기나 브라우저에서는 이전 결과를 볼 수 없어요.",
  },
  {
    question: "계산 결과가 실제 지급액과 다를 수 있나요?",
    answer:
      "네. 모든 계산 결과는 입력하신 정보를 바탕으로 한 참고용 예상 결과이며 법적 효력이 없어요. 실제 퇴직금, 실업급여, 주휴수당은 근로계약, 회사의 신고 내용, 고용보험 가입 이력, 관련 기관의 판단에 따라 달라질 수 있어요. 정확한 확인은 고용노동부, 고용센터, 회사 인사담당자 또는 전문가에게 문의해주세요.",
  },
  {
    question: "정확히 모르는 항목은 어떻게 입력하나요?",
    answer:
      "실업급여 조건 체크나 주휴수당 계산기처럼 예/아니오로 답하는 질문에는 '모르겠음'을 선택할 수 있어요. 이 경우 결과가 '추가 확인 필요'로 조정되고, 확인이 필요한 항목이 결과 화면에 안내돼요.",
  },
  {
    question: "통합 결과 페이지의 데이터는 언제 사라지나요?",
    answer:
      "브라우저의 사이트 데이터(쿠키 및 사이트 데이터)를 삭제하거나, 시크릿 모드에서 이용해 창을 닫으면 저장된 계산 결과와 체크리스트 완료 표시가 함께 사라져요.",
  },
  {
    question: "실업급여·주휴수당 계산에 사용된 정책 수치는 최신인가요?",
    answer:
      "네. 2026년 기준 최저임금(10,320원), 구직급여 1일 상한액(68,100원)·하한액(66,048원), 피보험단위기간 요건(18개월 중 180일) 등 최신 수치를 반영하고 있어요. 다만 정책은 매년 바뀔 수 있으니 정확한 확인은 고용노동부 등 공식 채널을 통해 다시 확인해주세요.",
  },
  {
    question: "여러 계산기를 꼭 순서대로 사용해야 하나요?",
    answer:
      "아니요. 퇴직금, 실업급여, 주휴수당 계산기는 각각 독립적으로 사용할 수 있어요. 필요한 계산기만 골라 이용하시면 되고, 계산한 결과들은 통합 결과 페이지에서 모아볼 수 있어요.",
  },
  {
    question: "모바일에서도 사용할 수 있나요?",
    answer:
      "네. 퇴사계산기는 모바일과 데스크탑 화면 모두에 맞춰 반응형으로 만들어져 있어 스마트폰에서도 편하게 이용할 수 있어요.",
  },
  {
    question: "왜 광고가 있나요?",
    answer:
      "퇴사계산기는 별도의 이용료 없이 무료로 운영되는 서비스라서, 서비스 운영비를 충당하기 위해 일부 광고를 게재하고 있어요. 광고 관련 자세한 내용은 개인정보처리방침을 참고해주세요.",
  },
  {
    question: "계산 결과가 이상하거나 오류를 발견했어요. 어떻게 알려야 하나요?",
    answer:
      "이메일(wnshping@gmail.com)로 어떤 화면에서 어떤 값을 입력했는지 알려주시면 빠르게 확인해볼게요.",
  },
  {
    question: "데이터를 다른 기기에서도 이어서 볼 수 있나요?",
    answer:
      "아니요. 계산 결과는 브라우저별로 각각 저장되기 때문에 다른 기기나 다른 브라우저에서는 이어서 볼 수 없어요. 필요하다면 결과 화면을 캡처하거나 별도로 메모해두는 것을 추천해요.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-sm font-bold text-primary">자주 묻는 질문</p>
      <h1 className="mt-2 text-2xl text-text sm:text-3xl">
        궁금한 점을 먼저 확인해보세요
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-sub">
        퇴사계산기 이용과 관련해 자주 들어오는 질문을 모았어요. 원하는 답을 찾지
        못했다면{" "}
        <a href="/privacy" className="text-primary underline">
          개인정보처리방침
        </a>
        도 함께 확인해보세요.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {FAQ_ITEMS.map((item) => (
          <Card key={item.question} className="p-5">
            <h2 className="text-sm font-bold text-text">Q. {item.question}</h2>
            <p className="mt-2 text-sm leading-relaxed text-sub">
              A. {item.answer}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
