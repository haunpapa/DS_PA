import Link from "next/link";

const tasks = [
  "이메일 회원가입과 로그인",
  "비밀번호 해시 저장",
  "이메일 인증 여부 결정",
  "마이페이지와 생성 이력 연결",
];

export default function SignInPage() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-[color:rgba(29,45,42,0.12)] bg-white/80 p-8 shadow-[0_24px_80px_rgba(69,54,34,0.10)] backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[color:#8a4b1e]">Auth</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight">
          회원 인증 영역 초안
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[color:rgba(29,45,42,0.76)]">
          MVP는 개인 회원 기준으로 이메일 로그인부터 시작하고, 이후 소셜 로그인이나 팀 계정을 확장하는 방향을 권장합니다.
        </p>
        <div className="mt-8 grid gap-3">
          {tasks.map((task) => (
            <div key={task} className="rounded-[20px] border border-[color:rgba(29,45,42,0.12)] bg-[color:rgba(255,250,244,0.9)] px-4 py-4 text-sm leading-7 text-[color:rgba(29,45,42,0.8)]">
              {task}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-[color:#1d2d2a] px-5 py-3 text-sm font-semibold tracking-[0.18em] text-white">
            홈으로
          </Link>
          <Link href="/reports/new" className="rounded-full border border-[color:rgba(29,45,42,0.12)] bg-white px-5 py-3 text-sm font-semibold tracking-[0.18em] text-[color:#1d2d2a]">
            보고서 플로우 보기
          </Link>
        </div>
      </div>
    </main>
  );
}
