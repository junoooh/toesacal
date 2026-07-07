import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "퇴사계산기 서비스 이용약관입니다.",
  alternates: { canonical: "/terms" },
};

const CONTACT_EMAIL = "wnshping@gmail.com";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="text-sm font-bold text-primary">이용약관</p>
      <h1 className="mt-2 text-2xl text-text sm:text-3xl">
        퇴사계산기 이용약관
      </h1>
      <p className="mt-3 text-sm text-sub">시행일자: 2026년 7월 7일</p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-text">
        <section>
          <h2 className="text-lg text-text">제1조 (목적)</h2>
          <p className="mt-2">
            이 약관은 퇴사계산기(이하 &ldquo;사이트&rdquo;)이 제공하는 퇴직금·
            실업급여·주휴수당 계산 및 관련 정보 제공 서비스(이하
            &ldquo;서비스&rdquo;)의 이용과 관련하여 사이트와 이용자 간의
            권리·의무 및 책임사항을 규정하는 것을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">제2조 (서비스의 내용)</h2>
          <p className="mt-2">
            서비스는 이용자가 입력한 정보를 바탕으로 퇴직금, 실업급여
            (구직급여) 조건, 주휴수당을 참고용으로 계산하여 보여주고, 관련
            노동·급여 정보를 제공합니다. 서비스는 회원가입 없이 누구나 이용할
            수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">제3조 (서비스 이용 및 제한)</h2>
          <p className="mt-2">
            이용자는 관계 법령과 이 약관을 준수하여 서비스를 이용해야 하며,
            아래와 같은 행위를 해서는 안 됩니다.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>서비스의 정상적인 운영을 방해하는 행위</li>
            <li>서비스를 이용해 얻은 정보를 상업적으로 무단 복제·배포하는 행위</li>
            <li>관련 법령을 위반하는 목적으로 서비스를 이용하는 행위</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg text-text">
            제4조 (계산 결과의 성격 및 면책)
          </h2>
          <p className="mt-2">
            서비스가 제공하는 모든 계산 결과는 이용자가 입력한 정보를 바탕으로
            한 <strong>참고용 예상 결과</strong>이며, 법적 효력이 없습니다.
            실제 퇴직금 지급액, 실업급여 수급 가능 여부, 주휴수당 발생 여부는
            근로계약, 회사의 신고 내용, 고용보험 가입 이력, 관련 기관의 판단에
            따라 달라질 수 있습니다.
          </p>
          <p className="mt-2">
            사이트는 이용자가 서비스의 계산 결과나 정보글 내용을 신뢰하여
            발생한 손해에 대해 법령이 허용하는 범위 내에서 책임을 지지
            않습니다. 정확한 확인이 필요한 경우 고용노동부, 고용센터, 회사
            인사담당자 또는 전문가(노무사, 변호사 등)에게 문의하시기
            바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">제5조 (개인정보 보호)</h2>
          <p className="mt-2">
            사이트는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을
            별도로 운영합니다. 자세한 내용은 개인정보처리방침 페이지를
            참고해주세요.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">제6조 (지식재산권)</h2>
          <p className="mt-2">
            서비스에서 제공하는 디자인, 텍스트, 로고 등에 대한 저작권 및
            지식재산권은 사이트에 귀속됩니다. 이용자는 사이트의 사전 동의
            없이 이를 영리 목적으로 복제·배포·전송할 수 없습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">제7조 (서비스의 변경 및 중단)</h2>
          <p className="mt-2">
            사이트는 서비스 개선, 운영상·기술상 필요에 따라 서비스의 전부
            또는 일부를 변경하거나 중단할 수 있으며, 중요한 변경 사항은
            사이트를 통해 공지합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">제8조 (준거법 및 관할)</h2>
          <p className="mt-2">
            이 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련하여
            분쟁이 발생할 경우 관계 법령이 정한 절차에 따릅니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg text-text">제9조 (문의)</h2>
          <p className="mt-2">
            이용약관에 대해 궁금한 점이 있다면 아래 이메일로 문의해주세요.
          </p>
          <p className="mt-2 font-medium text-primary">{CONTACT_EMAIL}</p>
        </section>
      </div>
    </div>
  );
}
