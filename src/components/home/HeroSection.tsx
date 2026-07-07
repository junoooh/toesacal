import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
        <span className="inline-flex items-center rounded-full border border-border bg-neutral-bg/60 px-3 py-1 text-xs font-medium text-sub">
          회원가입 없이 바로 이용하는 비회원 계산기
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-3xl leading-tight text-text sm:text-4xl md:text-5xl">
          퇴직금·실업급여·주휴수당
          <br />한 번에 계산하기
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-sub">
          급여와 근무기간을 입력하면, 내가 받을 수 있는 금액과 조건을 바로
          확인할 수 있어요.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="#features" size="lg">
            지금 계산 시작하기
          </Button>
          <Button href="/summary" variant="outline" size="lg">
            통합 결과 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
