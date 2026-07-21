// 서버 컴포넌트 (SSR) — 초기 HTML에 계산기 6종 링크·설명을 포함해
// 검색/애드센스 크롤러가 재정비 페이지 아래의 실제 콘텐츠에 도달하도록 한다.
// framer-motion 등 클라이언트 전용 코드 없음(정적).

const EMAIL = "contact@leanup.kr";

const TOOLS = [
  {
    name: "연봉 실수령액 계산기",
    tag: "SALARY",
    url: "https://salary.leanup.kr",
    desc: "2026년 4대보험료와 소득세·지방소득세를 반영해 연봉에서 세후 실수령 월급을 계산합니다.",
  },
  {
    name: "퇴직금 계산기",
    tag: "SEVERANCE",
    url: "https://severance.leanup.kr",
    desc: "입사일·퇴사일과 평균임금을 기준으로 예상 퇴직금과 1일 평균임금을 산정합니다.",
  },
  {
    name: "시급 · 주휴수당 계산기",
    tag: "WAGE",
    url: "https://wage.leanup.kr",
    desc: "2026년 최저시급 10,320원을 기준으로 주휴수당과 주급·월급 환산 급여를 계산합니다.",
  },
  {
    name: "대출이자 계산기",
    tag: "LOAN",
    url: "https://loan.leanup.kr",
    desc: "원리금균등·원금균등·만기일시 방식별 월 상환액과 총이자를 한눈에 비교합니다.",
  },
  {
    name: "전역일 계산기",
    tag: "ARMY",
    url: "https://army.leanup.kr",
    desc: "육군·해군·공군·해병대 복무 기간에 맞춰 전역일과 복무 진행률(D-day)을 계산합니다.",
  },
  {
    name: "만 나이 계산기",
    tag: "AGE",
    url: "https://age.leanup.kr",
    desc: "생년월일만 입력하면 만 나이·연 나이·띠(십이지)를 즉시 확인할 수 있습니다.",
  },
];

export function ToolsHub() {
  return (
    <section
      aria-label="LEANUP 무료 계산기"
      className="w-full bg-[#0a0a0b] px-5 text-[#f4f2ec]"
      style={{
        wordBreak: "keep-all",
        paddingTop: "clamp(72px, 9vw, 128px)",
        paddingBottom: "clamp(72px, 9vw, 128px)",
        borderTop: "1px solid rgba(244,242,236,0.10)",
      }}
    >
      <div className="mx-auto w-full max-w-[960px]">
        <header className="mb-11 flex flex-col items-start gap-4">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[#ff5c2b]">
            LEANUP TOOLS
          </span>
          <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
            무료로 쓰는 실생활 계산기 6종
          </h2>
          <p className="max-w-[620px] text-[clamp(0.98rem,1.5vw,1.12rem)] leading-relaxed text-[rgba(244,242,236,0.62)]">
            LEANUP이 직접 만든 2026년 기준 세금·노동·금융 계산기입니다. 회원가입 없이
            바로 사용할 수 있고, 계산 방식과 관련 법·요율 설명을 함께 제공합니다.
          </p>
        </header>

        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <li key={t.url}>
              <a
                href={t.url}
                className="group flex h-full flex-col gap-3 rounded-[6px] border border-[rgba(244,242,236,0.12)] bg-[#111114] p-6 no-underline transition-colors duration-300 hover:border-[rgba(255,92,43,0.55)]"
              >
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[rgba(244,242,236,0.4)]">
                  {t.tag}
                </span>
                <h3 className="text-[1.14rem] font-semibold leading-snug tracking-[-0.01em] text-[#f4f2ec]">
                  {t.name}
                </h3>
                <p className="text-[0.92rem] leading-relaxed text-[rgba(244,242,236,0.6)]">
                  {t.desc}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-1 font-mono text-[0.75rem] uppercase tracking-[0.04em] text-[#ff5c2b]">
                  계산기 열기
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-11 text-[0.86rem] leading-relaxed text-[rgba(244,242,236,0.4)]">
          문의 및 오류 제보:{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="text-[rgba(244,242,236,0.62)] underline-offset-4 hover:text-[#ff5c2b] hover:underline"
          >
            {EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
