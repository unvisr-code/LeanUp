# 이메일 알림 서비스 설정 가이드

LeanUP 프로젝트의 이메일 알림 서비스 설정 방법입니다.

## 📧 기능 개요

문의 접수 시 **2가지 이메일**이 자동 발송됩니다:

1. **고객 확인 이메일** - 문의자에게 접수 완료 안내
2. **관리자 알림 이메일** - 담당자에게 새 문의 알림 (우선순위 포함)

## 🚀 설정 방법

### 1. Resend 계정 생성

1. [Resend](https://resend.com) 접속 및 회원가입
2. 이메일 인증 완료
3. API Keys 메뉴에서 새 API Key 생성
4. API Key 복사 (re_vkVegtBk_G43zoTJFqhGYisVv532awFSF)

### 2. 도메인 인증 (선택사항)

**개발/테스트 환경**: 도메인 인증 없이 Resend 제공 도메인(`onboarding@resend.dev`) 사용 가능

**프로덕션 환경**: 자체 도메인 인증 필요
1. Resend Dashboard → Domains
2. 도메인 추가 (예: `leanup.kr`)
3. DNS 레코드 설정
   - SPF: `v=spf1 include:amazonses.com ~all`
   - DKIM: Resend에서 제공하는 값 입력
4. 인증 완료 대기 (보통 24시간 이내)

### 3. 환경 변수 설정

`.env.local` 파일에 다음 변수 추가:

```bash
# Resend API Key
RESEND_API_KEY=re_123456789_your_actual_api_key

# 관리자 이메일 (새 문의 알림 수신)
ADMIN_EMAIL=admin@leanup.kr
```

### 4. 이메일 발신자 주소 설정

`lib/email/resend.ts` 파일 수정:

```typescript
export const EMAIL_CONFIG = {
  // 개발 환경 (도메인 인증 전)
  from: 'LeanUP <onboarding@resend.dev>',

  // 프로덕션 환경 (도메인 인증 후)
  // from: 'LeanUP <noreply@leanup.kr>',

  adminEmail: process.env.ADMIN_EMAIL || 'admin@leanup.kr',
} as const;
```

## 📝 이메일 템플릿

### 고객 확인 이메일 (`emails/customer-confirmation.tsx`)

- 접수 완료 안내
- 제출한 정보 요약
- 응답 예정 시간 안내 (1-2 영업일)

### 관리자 알림 이메일 (`emails/admin-notification.tsx`)

- 우선순위 배지 (높음 🔥 / 보통 ⚡ / 낮음 📝)
- 고객 정보 (이름, 이메일, 연락처, 회사)
- 프로젝트 정보 (예산, 일정, 추가 모듈)
- 요구사항 및 참고 URL
- Lead ID 및 우선순위 점수

## 🎨 이메일 템플릿 커스터마이징

### 템플릿 미리보기 (개발용)

```bash
# React Email 개발 서버 실행
npx react-email dev
```

브라우저에서 `http://localhost:3000` 접속하여 이메일 템플릿 미리보기 및 수정 가능

### 템플릿 수정 위치

- `emails/customer-confirmation.tsx` - 고객용
- `emails/admin-notification.tsx` - 관리자용

## 🧪 테스트

### 개발 환경에서 테스트

1. 개발 서버 실행
```bash
npm run dev
```

2. 문의 폼 작성 및 제출
3. 터미널 로그 확인
```
Customer email sent: <message-id>
Admin email sent: <message-id>
```

4. Resend Dashboard → Logs에서 발송 내역 확인

### 테스트용 이메일

개발 중에는 실제 고객 이메일 대신 본인 이메일로 테스트 가능:

```typescript
// lib/email/send-lead-emails.ts
to: process.env.NODE_ENV === 'development'
  ? 'your-test@email.com'  // 개발용 테스트 이메일
  : leadData.email,         // 프로덕션용 실제 이메일
```

## 🔧 트러블슈팅

### 이메일이 발송되지 않을 때

1. **API Key 확인**
   - `.env.local`의 `RESEND_API_KEY` 값 확인
   - Resend Dashboard에서 API Key 활성화 상태 확인

2. **도메인 인증 상태 확인**
   - Resend Dashboard → Domains
   - 인증 상태가 "Verified"인지 확인
   - 개발 환경에서는 `onboarding@resend.dev` 사용

3. **콘솔 로그 확인**
   ```bash
   # 에러 메시지 확인
   Customer email failed: <error-message>
   Admin email failed: <error-message>
   ```

4. **Resend 발송 제한**
   - 무료 플랜: 월 3,000통
   - 초과 시 유료 플랜 업그레이드 필요

### 스팸 폴더 확인

- 첫 발송 시 스팸으로 분류될 수 있음
- 도메인 인증(SPF, DKIM) 완료 시 해결됨

## 📊 우선순위 점수 계산

Lead 우선순위는 다음 기준으로 자동 계산됩니다:

| 항목 | 점수 |
|------|------|
| 기본 점수 | 50점 |
| 예산 5,000만원 이상 | +20점 |
| 예산 3,000~5,000만원 | +15점 |
| 예산 1,000~3,000만원 | +10점 |
| 최대한 빠르게 | +10점 |
| 1개월 이내 | +8점 |
| 데이터 관리 모듈 | +10점 |
| 유지보수 모듈 | +10점 |

**우선순위 등급**:
- 🔥 **높음** (80점 이상)
- ⚡ **보통** (60-79점)
- 📝 **낮음** (60점 미만)

## 🔐 보안 주의사항

1. `.env.local` 파일은 절대 Git에 커밋하지 마세요
2. API Key는 서버 사이드에서만 사용하세요
3. `RESEND_API_KEY`는 프론트엔드에 노출되면 안 됩니다

## 📚 추가 정보

- [Resend 공식 문서](https://resend.com/docs)
- [React Email 문서](https://react.email/docs)
- [Resend + Next.js 가이드](https://resend.com/docs/send-with-nextjs)

## 💡 다음 단계

- [ ] CRM 시스템 연동
- [ ] 이메일 템플릿 다국어 지원
- [ ] 이메일 발송 실패 시 재시도 로직
- [ ] 이메일 오픈률 및 클릭률 트래킹
