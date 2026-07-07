import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "퇴사계산기의 개인정보처리방침과 쿠키·광고 이용 안내입니다.",
  alternates: { canonical: "/privacy" },
};

const CONTACT_EMAIL = "wnshping@gmail.com";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-sm font-bold text-primary">개인정보처리방침</p>
      <h1 className="mt-2 text-2xl text-text sm:text-3xl">
        퇴사계산기 개인정보처리방침
      </h1>
      <p className="mt-3 text-sm text-sub">
        시행일자: 2026년 7월 7일 · 최종 개정일: 2026년 7월 7일
      </p>
      <p className="mt-2 text-sm leading-relaxed text-sub">
        퇴사계산기(이하 &ldquo;사이트&rdquo;)은 이용자의 개인정보를 소중히
        생각하며, 아래와 같은 방침을 통해 개인정보를 보호하고 관련 법령을
        준수하고 있습니다.
      </p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-text">
        <section>
          <h2 className="text-lg text-text">1. 회원가입 및 개인정보 수집</h2>
          <p className="mt-2">
            퇴사계산기는 회원가입 없이 누구나 이용할 수 있는 비회원 계산기
            서비스입니다. 이름, 이메일, 전화번호, 주민등록번호 등 특정
            개인을 식별할 수 있는 정보를 회원가입 절차를 통해 수집하지
            않습니다.
          </p>
          <p className="mt-2">
            계산기 이용 과정에서 입력하시는 급여, 근무기간, 시급 등의 정보는
            개인을 식별하기 위한 목적이 아니라 계산 결과를 보여드리기 위한
            목적으로만 일시적으로 사용되며, 아래 2번 항목에서 설명하는 방식
            그대로 처리됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">2. 계산기 입력 정보의 처리</h2>
          <p className="mt-2">
            퇴직금·실업급여·주휴수당 계산에 입력하신 정보(급여, 근무기간,
            시급 등)와 계산 결과, 퇴사 전 체크리스트 완료 여부는 서버로
            전송되지 않고 이용자의 <strong>브라우저(localStorage)</strong>
            에만 저장됩니다.
          </p>
          <p className="mt-2">
            이 데이터는 퇴사계산기 운영진을 포함한 어느 누구도 열람할 수 없으며,
            오직 이용자 본인의 브라우저에서만 확인할 수 있습니다. 다른 기기나
            브라우저에서는 이전 계산 결과를 볼 수 없고, 브라우저의 사이트
            데이터(쿠키 및 사이트 데이터)를 삭제하면 함께 영구히 삭제됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">
            3. 자동으로 수집되는 정보 (쿠키·접속기록)
          </h2>
          <p className="mt-2">
            사이트 이용 과정에서 브라우저 종류, 기기 정보, 접속 IP, 방문
            일시, 페이지 이용 기록 등이 쿠키 및 서버 접속 로그를 통해
            자동으로 생성·수집될 수 있습니다. 이 정보는 서비스 품질 개선과
            아래 4번 항목의 광고 게재 목적으로만 사용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">4. 쿠키와 광고</h2>
          <p className="mt-2">
            퇴사계산기는 서비스 운영을 위해 Google AdSense와 같은 제3자 광고
            서비스를 이용할 수 있습니다. Google을 포함한 제3자 공급업체는
            쿠키(광고 식별자 포함)를 사용하여 이용자가 퇴사계산기 또는 다른
            웹사이트를 방문한 기록을 바탕으로 맞춤형 광고를 게재할 수
            있습니다.
          </p>
          <p className="mt-2">
            이용자는{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google 광고 설정
            </a>
            에서 맞춤 광고를 비활성화할 수 있으며, 브라우저 설정에서 쿠키
            저장을 거부할 수도 있습니다. 다만 쿠키 저장을 거부하는 경우
            일부 서비스 이용에 어려움이 있을 수 있습니다. Google의 광고
            정책에 대한 자세한 내용은{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google 파트너 사이트 정책
            </a>
            에서 확인할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">5. 개인정보의 제3자 제공 및 국외 이전</h2>
          <p className="mt-2">
            퇴사계산기는 이용자의 개인정보를 별도로 수집하지 않으므로 이를
            제3자에게 판매하거나 제공하지 않습니다. 다만 광고 게재를 위해
            이용되는 쿠키·기기 정보 등은 서비스 특성상 Google 등 해외
            사업자의 서버에서 처리될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">6. 개인정보의 보유 기간</h2>
          <p className="mt-2">
            계산기 입력값과 결과는 서버에 보관되지 않고 이용자의 브라우저에만
            저장되므로, 퇴사계산기는 해당 정보를 별도의 기간 동안 보유하지
            않습니다. 광고 관련 쿠키의 보유 기간은 Google 등 광고 사업자의
            정책을 따릅니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">7. 만 14세 미만 아동의 개인정보</h2>
          <p className="mt-2">
            퇴사계산기는 만 14세 미만 아동을 대상으로 개인정보를 의도적으로
            수집하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">8. 이용자의 권리</h2>
          <p className="mt-2">
            브라우저에 저장된 계산 결과와 체크리스트 데이터는 이용자가 직접
            브라우저 설정에서 사이트 데이터를 삭제하여 언제든지 제거할 수
            있습니다. 광고 맞춤 설정 거부 방법은 4번 항목을 참고해주세요.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">9. 개인정보 보호책임자 및 문의</h2>
          <p className="mt-2">
            개인정보처리방침에 대해 궁금한 점이나 요청 사항이 있다면 아래
            이메일로 문의해주세요.
          </p>
          <p className="mt-2 font-medium text-primary">{CONTACT_EMAIL}</p>
        </section>

        <section>
          <h2 className="text-lg text-text">10. 방침 변경</h2>
          <p className="mt-2">
            법령이나 서비스 정책 변경에 따라 이 방침이 수정될 수 있으며,
            변경 시 이 페이지의 최종 개정일을 갱신하여 공지합니다. 서비스
            이용 전반에 대한 약관은{" "}
            <Link href="/terms" className="text-primary underline">
              이용약관
            </Link>
            을 참고해주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
