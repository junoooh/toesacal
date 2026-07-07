import HeroSection from "@/components/home/HeroSection";
import FeatureCard from "@/components/home/FeatureCard";
import WhatYouCanDo from "@/components/home/WhatYouCanDo";
import AdSlot from "@/components/ui/AdSlot";
import Disclaimer from "@/components/ui/Disclaimer";
import {
  CalculatorIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@/components/ui/icons";

const FEATURES = [
  {
    icon: <CalculatorIcon />,
    title: "퇴직금 계산기",
    description:
      "입사일·퇴사일과 최근 급여를 입력하면 예상 퇴직금을 바로 계산해드려요.",
    href: "/retirement",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "실업급여 조건 체크",
    description:
      "고용보험 가입기간과 퇴사 사유를 입력하면 실업급여 가능성을 확인할 수 있어요.",
    href: "/unemployment",
  },
  {
    icon: <ClockIcon />,
    title: "주휴수당 계산기",
    description:
      "시급, 근무시간, 근무일수를 입력하면 이번 주 주휴수당을 계산해드려요.",
    href: "/holiday-pay",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <section id="features" className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5">
        <AdSlot />
      </div>

      <WhatYouCanDo />

      <div className="mx-auto max-w-6xl px-5 pb-16">
        <Disclaimer />
      </div>
    </>
  );
}
