# DS_PA

AI 기반 부동산 입지 분석 보고서 서비스를 위한 초기 프로젝트입니다.

## 서비스 개요

사용자가 주소 또는 지역 정보를 입력하면:

1. Gemini가 입지 분석 초안을 생성하고
2. Claude가 PDF용 문서 구조를 정리하고
3. 서버가 HTML을 PDF로 렌더링해 다운로드 가능한 보고서를 제공합니다

이 과정에서 회원 인증, 크레딧 차감, 결제, 보안 검증, 생성 이력 관리가 함께 동작합니다.

## 기술 방향

- Web: Next.js 16 + TypeScript + Tailwind CSS
- Runtime: Node.js LTS
- DB: PostgreSQL
- ORM: Prisma
- Queue: BullMQ + Redis
- Payment: PortOne 또는 Toss Payments
- AI: Gemini + Claude
- PDF: Playwright 또는 Gotenberg
- Storage: S3 compatible storage

## 폴더 구조

- `apps/web`: 사용자 웹앱
- `docs`: 서비스 기획, 아키텍처, 보안, 로드맵
- `packages`: 이후 공통 도메인/설정 패키지 확장 영역

## 시작 명령

루트에서 아래 명령으로 실행합니다.

```bash
npm run dev
npm run lint
npm run build
```

## 우선 문서

- `docs/product-plan.md`
- `docs/architecture.md`
- `docs/security-checklist.md`
- `docs/implementation-roadmap.md`

## 다음 구현 우선순위

1. Prisma 스키마 설계
2. Auth 도입
3. 결제/크레딧 원장 구현
4. 보고서 생성 Job 파이프라인 구현
5. PDF 렌더링 및 스토리지 연결
