import { AlertIcon } from "./icons";

type DisclaimerProps = {
  className?: string;
};

export default function Disclaimer({ className = "" }: DisclaimerProps) {
  return (
    <div
      className={`flex gap-3 rounded-2xl border border-border bg-neutral-bg/60 p-4 text-sm text-sub ${className}`}
    >
      <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-sub" />
      <p className="leading-relaxed">
        본 사이트의 계산 결과는 사용자가 입력한 정보를 바탕으로 한 참고용
        예상 결과입니다. 실제 퇴직금 지급액, 실업급여 수급 가능 여부, 주휴수당
        발생 여부는 근로계약, 회사의 신고 내용, 고용보험 가입 이력, 관련 기관
        판단에 따라 달라질 수 있습니다. 정확한 확인이 필요한 경우 고용노동부,
        고용센터, 회사 인사담당자 또는 전문가에게 확인하시기 바랍니다.
      </p>
    </div>
  );
}
