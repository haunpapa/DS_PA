import Link from "next/link";

const fields = [
  "주소 또는 지역명 입력",
  "분석 반경 및 보고서 타입 선택",
  "추가 옵션과 예상 크레딧 확인",
  "생성 요청 후 상태 추적",
];

export default function NewReportPage() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-[color:rgba(29,45,42,0.12)] bg-white/80 p-8 shadow-[0_24px_80px_rgba(69,54,34,0.10)] backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[color:#8a4b1e]">Reports</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight">
          보고서 생성 화면 초안
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[color:rgba(29,45,42,0.76)]">
          다음 구현 단계에서는 이 페이지에 주소 검색, 옵션 선택, 예상 크레딧, 생성 상태 타임라인을 붙입니다.
        </p>
        <div className="mt-8 grid gap-4">
          {fields.map((field, index) => (
            <div key={field} className="rounded-[22px] border border-[color:rgba(29,45,42,0.12)] bg-[color:rgba(255,250,244,0.9)] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[color:#28584b]">Step {index + 1}</p>
              <p className="mt-2 text-lg font-medium">{field}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-[color:#1d2d2a] px-5 py-3 text-sm font-semibold tracking-[0.18em] text-white">
            홈으로
          </Link>
          <Link href="/billing" className="rounded-full border border-[color:rgba(29,45,42,0.12)] bg-white px-5 py-3 text-sm font-semibold tracking-[0.18em] text-[color:#1d2d2a]">
            크레딧 정책 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
