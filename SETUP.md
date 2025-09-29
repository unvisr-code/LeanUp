# 🚀 LeanUp 백엔드 설정 가이드

## 현재 상태

✅ **완료된 작업:**
- Supabase 클라이언트 설정 완료
- API 엔드포인트 구현 완료 (tRPC)
- 환경 변수 설정 완료
- 포트폴리오 API 정상 작동 (fallback으로 하드코딩 데이터 사용)
- 개발 서버 실행 중 (http://localhost:3005)

⚠️ **대기 중인 작업:**
- 데이터베이스 테이블 수동 생성 필요

## 🛠️ 다음 단계

### 1. Supabase 대시보드에서 테이블 생성

1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. 프로젝트 선택 (fvlknuhdrffzbaqixqbo)
3. 왼쪽 메뉴에서 **SQL Editor** 클릭
4. **New query** 클릭
5. 아래 SQL을 복사해서 붙여넣고 **Run** 클릭:

\`\`\`sql
-- STEP 1: Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  budget VARCHAR(20),
  timeline VARCHAR(20),
  requirements TEXT,
  reference_url VARCHAR(500),
  industry VARCHAR(255),
  include_data_module BOOLEAN DEFAULT false,
  include_maintenance_module BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 2: Create portfolio table
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  service_type TEXT[] NOT NULL DEFAULT '{}',
  service_link VARCHAR(500),
  category VARCHAR(20) NOT NULL,
  thumbnail VARCHAR(500),
  detail_link VARCHAR(500),
  features TEXT[],
  work_scope TEXT[],
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 3: Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- STEP 4: Create Policies
CREATE POLICY "Enable read access for all users" ON public.leads
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON public.portfolio
    FOR SELECT USING (true);

CREATE POLICY "Enable all operations for service role" ON public.portfolio
    FOR ALL USING (true);
\`\`\`

### 2. 테이블 생성 확인

터미널에서 다음 명령어를 실행해서 테이블이 정상적으로 생성되었는지 확인:

\`\`\`bash
npm run db:test
\`\`\`

성공하면 다음과 같이 표시됩니다:
\`\`\`
✅ Leads table is accessible
✅ Portfolio table is accessible
\`\`\`

### 3. 포트폴리오 데이터 마이그레이션

테이블이 생성되면 기존 포트폴리오 데이터를 데이터베이스로 이전:

\`\`\`bash
npm run db:seed
\`\`\`

### 4. 최종 테스트

견적 폼과 포트폴리오가 모두 데이터베이스와 연동되어 작동하는지 확인:

\`\`\`bash
# 포트폴리오 API 테스트
curl -X GET "http://localhost:3005/api/trpc/portfolio.getAll"

# 견적 폼 테스트 (테이블 생성 후)
curl -X POST "http://localhost:3005/api/trpc/lead.create" \\
  -H "Content-Type: application/json" \\
  -d '{
    "json": {
      "name": "테스트 사용자",
      "email": "test@example.com",
      "requirements": "웹사이트 개발 문의"
    }
  }'
\`\`\`

## 🎉 완료 후

모든 설정이 완료되면:
1. 견적 폼이 실제 데이터베이스에 저장됩니다
2. 포트폴리오 데이터가 데이터베이스에서 동적으로 관리됩니다
3. 관리자 API를 통해 포트폴리오 추가/수정/삭제가 가능합니다

## 📝 사용 가능한 스크립트

- \`npm run dev\` - 개발 서버 실행
- \`npm run db:test\` - 데이터베이스 연결 테스트
- \`npm run db:seed\` - 포트폴리오 데이터 마이그레이션
- \`npm run db:create\` - 테이블 생성 가이드 표시

## 🔧 환경 설정

현재 설정된 환경 변수:
- \`NEXT_PUBLIC_SUPABASE_URL\`: ✅ 설정됨
- \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`: ✅ 설정됨
- \`SUPABASE_SERVICE_ROLE_KEY\`: ✅ 설정됨

모든 설정이 완료되었습니다! 테이블만 생성하면 바로 사용할 수 있습니다.