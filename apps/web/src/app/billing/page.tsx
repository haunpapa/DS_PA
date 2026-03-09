import Link from "next/link";

const packages = [
  { name: "Starter", credits: "10 Credits", note: "테스트와 초기 사용자를 위한 소량 패키지" },
  { name: "Growth", credits: "50 Credits", note: "중개사무소 또는 투자 검토 팀을 위한 기본 패키지" },
  { name: "Scale", credits: "200 Credits", note: "반복 생성과 팀 운영을 고려한 확장 패키지" },
];

export default function BillingPage() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-[color:rgba(29,45,42,0.12)] bg-white/80 p-8 shadow-[0_24px_80px_rgba(69,54,34,0.10)] backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[color:#8a4b1e]">Billing</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight">
          크레딧과 결제 정책 초안
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:rgba(29,45,42,0.76)]">
          크레딧은 충전형으로 운영하고, 보고서 생성 시 예약 차감 후 완료 시 확정 차감하는 구조를 기본안으로 둡니다.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {packages.map((item) => (
            <article key={item.name} className="rounded-[24px] border border-[color:rgba(29,45,42,0.12)] bg-[color:rgba(255,250,244,0.9)] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[color:#28584b]">Package</p>
              <h2 className="mt-3 text-2xl font-semibold">{item.name}</h2>
              <p className="mt-2 text-lg font-medium text-[color:#8a4b1e]">{item.credits}</p>
              <p className="mt-3 text-sm leading-7 text-[color:rgba(29,45,42,0.74)]">{item.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[24px] border border-dashed border-[color:rgba(29,45,42,0.16)] bg-[color:rgba(40,88,75,0.08)] p-5 text-sm leading-7 text-[color:rgba(29,45,42,0.78)]">
          결제 도입 시에는 Webhook 서명 검증, 주문 상태 재검증, 중복 처리 방지, 환불 이력 기록이 함께 구현되어야 합니다.
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-[color:#1d2d2a] px-5 py-3 text-sm font-semibold tracking-[0.18em] text-white">
            홈으로
          </Link>
          <Link href="/admin" className="rounded-full border border-[color:rgba(29,45,42,0.12)] bg-white px-5 py-3 text-sm font-semibold tracking-[0.18em] text-[color:#1d2d2a]">
            운영 포인트 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
