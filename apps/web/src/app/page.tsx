import Link from "next/link";

const pillars = [
  {
    title: "보고서 생성",
    description: "주소 입력부터 PDF 다운로드까지 한 번에 이어지는 생성 흐름",
  },
  {
    title: "크레딧 차감",
    description: "생성 요청, 실패 복구, 환불 정책까지 Ledger 중심으로 관리",
  },
  {
    title: "회원과 결제",
    description: "개인 회원 로그인, 결제, 충전, 생성 이력을 하나의 대시보드로 통합",
  },
  {
    title: "운영 보안",
    description: "Webhook 검증, 관리자 권한 분리, 감사 로그, 비밀키 관리까지 포함",
  },
];

const pipeline = [
  "입력 주소 정규화와 검증",
  "Gemini 분석 초안 생성",
  "Claude 문서 구조화 및 톤 정리",
  "HTML 템플릿 렌더링",
  "PDF 렌더링과 스토리지 업로드",
  "크레딧 확정 차감과 결과 이력 저장",
];

const reportSections = [
  "지역 개요와 인구/수요 관점 요약",
  "교통 접근성 및 생활 인프라",
  "학군, 업무 지구, 상권 연결성",
  "개발 호재와 규제 리스크",
  "수요·공급 균형과 투자 관점 의견",
  "면책 조항과 데이터 기준 시점",
];

const guardrails = [
  "결제 Webhook 서명 검증과 중복 처리 방지",
  "크레딧 Ledger 기반 잠금·차감·환불 처리",
  "관리자 RBAC와 감사 로그",
  "입력 검증, Rate limit, 민감정보 마스킹",
];

const milestones = [
  {
    phase: "Phase 1",
    title: "인증과 데이터 모델",
    description: "회원가입, 로그인, Prisma 스키마, 기본 대시보드를 먼저 고정합니다.",
  },
  {
    phase: "Phase 2",
    title: "결제와 크레딧 원장",
    description: "충전 상품, 결제 승인, Webhook 검증, Credit Ledger를 구현합니다.",
  },
  {
    phase: "Phase 3",
    title: "AI 보고서 파이프라인",
    description: "Gemini 분석, Claude 문서 구조화, PDF 렌더링을 Worker 흐름으로 연결합니다.",
  },
  {
    phase: "Phase 4",
    title: "운영과 안정화",
    description: "실패 복구, 관리자 화면, 모니터링, 보안 점검으로 운영 준비를 마무리합니다.",
  },
];

const primaryAction =
  "inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--sage)]";
const secondaryAction =
  "inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-white/70 px-5 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--foreground)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-white";
const card =
  "rounded-[28px] border border-[color:var(--line)] bg-[var(--surface)] p-6 shadow-[0_24px_80px_rgba(69,54,34,0.10)] backdrop-blur";

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-6 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <nav className="flex flex-col gap-4 rounded-full border border-[color:var(--line)] bg-white/65 px-6 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-[var(--accent-strong)]">
              DS_PA
            </p>
            <p className="mt-1 text-sm text-[color:rgba(29,45,42,0.72)]">
              AI Real Estate Location Intelligence
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <Link href="/reports/new" className={secondaryAction}>
              Report Flow
            </Link>
            <Link href="/billing" className={secondaryAction}>
              Credits & Billing
            </Link>
            <Link href="/sign-in" className={secondaryAction}>
              Sign In
            </Link>
          </div>
        </nav>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className={`${card} overflow-hidden`}>
            <div className="inline-flex rounded-full border border-[color:var(--sage-soft)] bg-[var(--sage-soft)] px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--sage)]">
              Planning + Setup
            </div>
            <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Gemini로 분석하고 Claude로 정리한 PDF형 부동산 입지 보고서 서비스
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[color:rgba(29,45,42,0.78)] sm:text-lg">
              이 프로젝트는 주소 기반 입지 분석 보고서를 생성하고, 생성과 동시에 크레딧을 차감하며,
              회원 인증과 결제를 포함하는 유료 SaaS를 목표로 합니다. Claude는 PDF 자체를 직접 만들기보다
              PDF용 문서를 구조화하고, 서버는 이를 HTML에서 렌더링해 안정적으로 PDF를 생성하도록 설계합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reports/new" className={primaryAction}>
                보고서 생성 플로우 보기
              </Link>
              <Link href="/admin" className={secondaryAction}>
                운영 체크포인트
              </Link>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="rounded-[24px] border border-[color:var(--line)] bg-white/80 p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent-strong)]">
                    Core
                  </p>
                  <h2 className="mt-3 text-xl font-semibold">{pillar.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[color:rgba(29,45,42,0.72)]">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className={`${card} flex flex-col justify-between bg-[linear-gradient(180deg,rgba(255,250,244,0.95),rgba(255,245,233,0.84))]`}>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--sage)]">
                MVP Outcome
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug">
                회원가입, 결제, 보고서 생성, PDF 다운로드까지 한 흐름으로 연결합니다.
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  "사용자는 로그인 후 크레딧을 충전합니다.",
                  "주소와 옵션을 넣고 보고서 생성을 요청합니다.",
                  "백엔드는 크레딧을 잠금 처리하고 Job을 큐에 넣습니다.",
                  "완료 시 PDF를 저장하고 차감을 확정합니다.",
                ].map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-[22px] border border-[color:var(--line)] bg-white/80 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] font-mono text-sm font-semibold text-[var(--accent-strong)]">
                      0{index + 1}
                    </div>
                    <p className="text-sm leading-7 text-[color:rgba(29,45,42,0.78)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 rounded-[24px] border border-dashed border-[color:var(--line)] bg-[var(--sage-soft)] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--sage)]">
                Design Decision
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:rgba(29,45,42,0.78)]">
                Claude는 최종 레이아웃용 문서 구조화를 맡고, 실제 PDF 파일은 Playwright 또는 Gotenberg가 생성하는
                구조가 품질과 재현성 면에서 가장 안전합니다.
              </p>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className={card}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
              Report Blueprint
            </p>
            <h2 className="mt-4 text-3xl font-semibold">보고서 기본 섹션</h2>
            <div className="mt-6 grid gap-3">
              {reportSections.map((section) => (
                <div key={section} className="rounded-[20px] border border-[color:var(--line)] bg-white/75 px-4 py-4 text-sm leading-7 text-[color:rgba(29,45,42,0.8)]">
                  {section}
                </div>
              ))}
            </div>
          </div>

          <div className={card}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--sage)]">
              Generation Pipeline
            </p>
            <h2 className="mt-4 text-3xl font-semibold">AI 생성 파이프라인</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pipeline.map((step, index) => (
                <article key={step} className="rounded-[24px] border border-[color:var(--line)] bg-white/78 p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                    Step {index + 1}
                  </p>
                  <p className="mt-3 text-base leading-7 text-[color:rgba(29,45,42,0.8)]">{step}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={card}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-strong)]">
              Security & Revenue
            </p>
            <h2 className="mt-4 text-3xl font-semibold">결제, 크레딧, 보안의 기본 원칙</h2>
            <div className="mt-6 grid gap-3">
              {guardrails.map((item) => (
                <div key={item} className="rounded-[20px] border border-[color:var(--line)] bg-white/80 px-4 py-4 text-sm leading-7 text-[color:rgba(29,45,42,0.78)]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={card}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--sage)]">
              Implementation Roadmap
            </p>
            <h2 className="mt-4 text-3xl font-semibold">바로 다음에 구현할 순서</h2>
            <div className="mt-6 space-y-4">
              {milestones.map((milestone) => (
                <article key={milestone.phase} className="rounded-[22px] border border-[color:var(--line)] bg-white/75 p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                    {milestone.phase}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{milestone.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:rgba(29,45,42,0.76)]">
                    {milestone.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
