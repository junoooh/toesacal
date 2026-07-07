import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-sub">
        <p className="font-extrabold text-text">{SITE_NAME}</p>
        <p className="mt-2 max-w-2xl leading-relaxed">
          {SITE_NAME}은 퇴직금·실업급여·주휴수당을 스스로 확인할 수 있도록 돕는
          비회원 계산기 서비스입니다. 회원가입 없이 누구나 바로 이용할 수
          있으며, 계산에 사용된 정보는 서버에 저장되지 않습니다.
        </p>
        <p className="mt-3 max-w-2xl leading-relaxed">
          본 사이트의 계산 결과는 참고용 예상 결과이며, 법적 효력이 없습니다.
          정확한 확인은 고용노동부, 고용센터 또는 전문가에게 문의하시기
          바랍니다.
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/retirement" className="hover:text-primary">
            퇴직금 계산기
          </Link>
          <Link href="/unemployment" className="hover:text-primary">
            실업급여 조건 체크
          </Link>
          <Link href="/holiday-pay" className="hover:text-primary">
            주휴수당 계산기
          </Link>
          <Link href="/articles" className="hover:text-primary">
            정보글
          </Link>
          <Link href="/guide" className="hover:text-primary">
            이용 가이드
          </Link>
          <Link href="/faq" className="hover:text-primary">
            자주 묻는 질문
          </Link>
        </nav>
        <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
          <Link href="/privacy" className="hover:text-primary">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="hover:text-primary">
            이용약관
          </Link>
        </nav>
        <p className="mt-6 text-xs text-sub/80">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
