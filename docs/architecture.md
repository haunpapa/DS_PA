# 시스템 아키텍처 초안

## 1. 권장 스택

- Frontend: Next.js App Router, TypeScript, Tailwind CSS
- Backend: Next.js Route Handlers + Server Actions
- DB: PostgreSQL
- ORM: Prisma
- Auth: Auth.js 기반 이메일 로그인
- Payment: PortOne 또는 Toss Payments
- Job Queue: BullMQ + Redis
- PDF Render: Playwright 또는 Gotenberg
- Storage: S3 compatible object storage
- Monitoring: Sentry, OpenTelemetry, structured logs

## 2. 서비스 경계

### Web App

- 랜딩 페이지
- 회원가입/로그인
- 대시보드
- 크레딧 충전
- 보고서 생성
- 보고서 이력 및 다운로드

### API Layer

- 인증 API
- 결제 API
- 보고서 생성 API
- Webhook 수신 API
- 관리자 API

### Worker

- 보고서 생성 작업 처리
- Gemini 호출
- Claude 호출
- PDF 렌더링
- 파일 업로드
- 크레딧 확정 처리

## 3. 권장 생성 플로우

1. 사용자가 주소와 옵션 입력
2. 서버가 요청 검증
3. 사용 가능 크레딧 확인
4. 크레딧 잠금 또는 예약 차감
5. 보고서 생성 Job enqueue
6. Worker가 Gemini에 구조화 분석 요청
7. Worker가 Claude에 서술형 문서 구조화 요청
8. HTML 템플릿 렌더링
9. PDF 엔진으로 파일 생성
10. Storage 업로드
11. 보고서 상태 완료 처리
12. 크레딧 확정 차감

실패 시:

- 상태를 failed로 전환
- 잠금 크레딧 복구
- 재시도 가능 횟수 관리

## 4. 주요 도메인 모델

### User

- id
- email
- passwordHash
- name
- role
- status
- createdAt

### CreditWallet

- userId
- balance
- updatedAt

### CreditLedger

- id
- userId
- type
- amount
- reason
- referenceType
- referenceId
- idempotencyKey
- createdAt

### Payment

- id
- userId
- provider
- orderId
- amount
- status
- rawPayload
- approvedAt

### Report

- id
- userId
- address
- regionCode
- status
- templateVersion
- creditCost
- summary
- pdfUrl
- requestedAt
- completedAt

### ReportJob

- id
- reportId
- status
- attemptCount
- lastError
- startedAt
- finishedAt

## 5. 상태 설계

### Report.status

- draft
- queued
- generating
- rendering
- completed
- failed
- refunded

### Payment.status

- pending
- paid
- failed
- canceled
- refunded

## 6. 보안 설계 포인트

- 비밀번호는 Argon2 또는 bcrypt 해시
- 세션은 HttpOnly, Secure, SameSite 설정
- 결제 Webhook 서명 검증
- AI 프롬프트 입력 검증 및 길이 제한
- 관리자 API RBAC 적용
- 감사 로그 기록
- Rate limiting 적용

## 7. 초기 디렉터리 방향

- `apps/web`: Next.js 웹앱
- `packages/config`: 공통 설정
- `packages/domain`: 타입, 스키마, 비즈니스 규칙
- `docs`: 기획/설계 문서
