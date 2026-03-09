import Link from "next/link";

const metrics = [
  "보고서 생성 성공률과 실패 유형",
  "크레딧 차감/환불 이력 점검",
  "결제 승인, 취소, Webhook 재처리 상태",
  "AI 호출 비용과 응답 시간 모니터링",
];

export default function AdminPage() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-[color:rgba(29,45,42,0.12)] bg-white/80 p-8 shadow-[0_24px_80px_rgba(69,54,34,0.10)] backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[color:#8a4b1e]">Admin</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight">
          운영 대시보드가 다뤄야 할 핵심 포인트
        </h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {metrics.map((metric) => (
            <article key={metric} className="rounded-[24px] border border-[color:rgba(29,45,42,0.12)] bg-[color:rgba(255,250,244,0.9)] p-5 text-sm leading-7 text-[color:rgba(29,45,42,0.8)]">
              {metric}
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[24px] border border-dashed border-[color:rgba(29,45,42,0.16)] bg-[color:rgba(40,88,75,0.08)] p-5 text-sm leading-7 text-[color:rgba(29,45,42,0.78)]">
          운영자 기능은 일반 사용자 기능과 세션, 메뉴, 권한을 분리해 RBAC로 관리하는 것을 기본 전제로 둡니다.
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-[color:#1d2d2a] px-5 py-3 text-sm font-semibold tracking-[0.18em] text-white">
            홈으로
          </Link>
          <Link href="/billing" className="rounded-full border border-[color:rgba(29,45,42,0.12)] bg-white px-5 py-3 text-sm font-semibold tracking-[0.18em] text-[color:#1d2d2a]">
            결제 정책 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
