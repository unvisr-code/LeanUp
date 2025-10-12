# Slack 알림 설정 가이드

LeanUP 프로젝트의 Slack 알림 서비스 설정 방법입니다.

## 📢 기능 개요

문의 접수 시 **Slack 채널에 실시간 알림**이 발송됩니다:

- 📧 이메일과 동시에 Slack 알림 발송 (병렬 처리)
- 🎨 리치 포맷팅으로 가독성 높은 메시지
- 🔥 우선순위 배지 (높음/보통/낮음)
- 📊 고객 및 프로젝트 정보 한눈에 확인
- ⚡ 실시간 알림으로 빠른 대응 가능

## 🚀 설정 방법

### 1. Slack Incoming Webhook 생성

1. Slack 워크스페이스에서 Apps 열기
   - 워크스페이스 이름 클릭 → `Settings & administration` → `Manage apps`

2. **Incoming Webhooks** 앱 검색 및 추가
   - https://api.slack.com/messaging/webhooks 에서 직접 시작 가능
   - `Add to Slack` 버튼 클릭

3. 알림을 받을 **채널 선택**
   - 예: `#leads`, `#문의`, `#sales`, `#영업팀`
   - 새 채널을 만들거나 기존 채널 선택

4. **Webhook URL 복사**
   - 형식: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX`
   - ⚠️ 이 URL은 비밀로 관리해야 합니다!

### 2. 환경 변수 설정

`.env.local` 파일에 Webhook URL 추가:

```bash
# Slack Configuration (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**참고**:
- Slack Webhook URL이 설정되지 않으면 알림이 스킵됩니다 (에러 없음)
- 문의 접수는 정상적으로 처리됩니다

### 3. 개발 서버 재시작

환경 변수 변경 후 개발 서버를 재시작해야 합니다:

```bash
# 개발 서버 중지 (Ctrl + C)
# 개발 서버 재시작
npm run dev
```

## 📱 Slack 메시지 형식

### 메시지 구성

**헤더**
- 🔥/⚡/📝 아이콘과 함께 우선순위 표시
- 고객 이름 및 회사명

**고객 정보 섹션**
- 이름, 이메일, 연락처
- 회사명, 업종

**프로젝트 정보 섹션**
- 예산, 희망 일정
- 추가 모듈 (데이터 관리, 유지보수)

**요구사항 섹션** (있는 경우)
- 고객이 작성한 요구사항 전체

**참고 URL** (있는 경우)
- 클릭 가능한 링크

**푸터**
- 접수 시간 (한국 시간대)
- Lead ID
- 우선순위 점수

### 우선순위 표시

| 우선순위 | 아이콘 | 색상 | 점수 |
|---------|-------|------|------|
| 높음 | 🔥 | 빨강 | 80점 이상 |
| 보통 | ⚡ | 주황 | 60-79점 |
| 낮음 | 📝 | 남색 | 60점 미만 |

## 🧪 테스트

### 1. Webhook URL 테스트

간단한 curl 명령어로 테스트:

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"text":"LeanUP 테스트 메시지"}' \
  YOUR_WEBHOOK_URL
```

성공하면 Slack 채널에 "LeanUP 테스트 메시지"가 표시됩니다.

### 2. 전체 시스템 테스트

개발 서버에서 문의 폼 제출:

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
# 문의 폼 작성 및 제출
```

### 3. 테스트 스크립트 실행

```bash
# 이메일 + Slack 통합 테스트
npx tsx scripts/test-email.ts
```

터미널에서 다음과 같은 로그를 확인:
```
✅ Slack notification sent successfully
```

## 🔧 트러블슈팅

### Slack 알림이 발송되지 않을 때

**1. Webhook URL 확인**
- `.env.local`의 `SLACK_WEBHOOK_URL` 값이 올바른지 확인
- URL이 `https://hooks.slack.com/services/`로 시작하는지 확인

**2. Webhook 상태 확인**
- Slack Apps 설정에서 Webhook이 활성화되어 있는지 확인
- Webhook이 삭제되거나 비활성화되지 않았는지 확인

**3. 콘솔 로그 확인**
```bash
# 성공 로그
Slack notification sent successfully

# 실패 로그
Slack notification failed: <error-message>
```

**4. 채널 권한 확인**
- Incoming Webhooks 앱이 해당 채널에 접근 권한이 있는지 확인
- 필요시 채널 설정에서 앱 추가

**5. 방화벽 확인**
- 서버에서 `hooks.slack.com`으로의 HTTPS 연결이 가능한지 확인

### Webhook URL이 없어도 정상 작동

Slack Webhook URL이 설정되지 않았을 때:
- ✅ 문의는 정상적으로 접수됩니다
- ✅ 이메일은 정상적으로 발송됩니다
- ℹ️ Slack 알림만 스킵됩니다
- ℹ️ 콘솔에 "Slack webhook not configured" 로그 출력

## 📊 알림 우선순위 계산

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
- 🔥 **높음** (80점 이상): 긴급 대응 필요
- ⚡ **보통** (60-79점): 일반 대응
- 📝 **낮음** (60점 미만): 일반 대응

## 🎨 알림 커스터마이징

### 메시지 형식 변경

`lib/slack/send-slack-notification.ts` 파일에서 메시지 블록 수정:

```typescript
// 메시지 블록 구조 변경
const message = {
  text: '...',
  blocks: [
    // 커스텀 블록 추가
  ],
};
```

Slack Block Kit Builder 사용 추천: https://app.slack.com/block-kit-builder

### 다른 채널로 알림 보내기

우선순위에 따라 다른 채널로 알림을 보낼 수 있습니다:

```bash
# .env.local
SLACK_WEBHOOK_URL_HIGH=https://hooks.slack.com/services/.../high-priority
SLACK_WEBHOOK_URL_NORMAL=https://hooks.slack.com/services/.../normal
```

코드 수정 필요 (`lib/slack/send-slack-notification.ts`)

## 🔐 보안 주의사항

1. **Webhook URL 보호**
   - `.env.local` 파일은 절대 Git에 커밋하지 마세요
   - Webhook URL은 누구나 메시지를 보낼 수 있으므로 비밀로 관리

2. **Rate Limiting**
   - Slack API는 초당 1개 메시지 제한이 있습니다
   - 대량 테스트 시 주의

3. **프로덕션 배포**
   - 환경 변수는 호스팅 플랫폼의 환경 변수 설정에서 관리
   - Vercel, Netlify 등의 환경 변수 설정 이용

## 📚 추가 정보

- [Slack Incoming Webhooks 공식 문서](https://api.slack.com/messaging/webhooks)
- [Slack Block Kit 문서](https://api.slack.com/block-kit)
- [Slack Message Formatting](https://api.slack.com/reference/surfaces/formatting)

## 💡 다음 단계

- [ ] 우선순위별 다른 채널 알림
- [ ] Slack 버튼으로 Lead 상태 변경
- [ ] Slack에서 직접 고객에게 응답
- [ ] 알림 시간대 설정 (업무 시간만 알림)
