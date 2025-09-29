import * as dotenv from 'dotenv';

// Load environment variables first
dotenv.config({ path: '.env.local' });

// Now import supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Hardcoded portfolio data from the original file
const portfolioData = [
  {
    id: "startup-sejong",
    name: "세종대학교 융합창업연계전공",
    description: "세종대학교 융합창업연계전공 소개 홈페이지",
    tech_stack: ["Next.js", "AWS", "Vibe Coding"],
    service_type: ["Landing Page", "Web"],
    service_link: "https://startup-sejong.vercel.app/",
    category: "landing" as const,
    thumbnail: "/portfolio/startup-sejong.png",
    work_scope: ["기획", "디자인", "개발"],
    features: ["반응형 웹(PC/Mobile)", "화면설계", "UI 디자인", "어드민 페이지"],
    sort_order: 1,
  },
  {
    id: "horang-edu",
    name: "호랑에듀",
    description: "한글 프로그래밍 언어 기반의 코딩 교육 플랫폼",
    tech_stack: ["Next.js"],
    service_type: ["Web"],
    service_link: "https://horang.it",
    category: "web" as const,
    thumbnail: "/portfolio/horang-edu.png",
    work_scope: ["개발"],
    features: ["한글 프로그래밍 언어", "코딩 교육 플랫폼"],
    sort_order: 2,
  },
  {
    id: "dimipay",
    name: "디미페이",
    description: "무인 매점 결제 핀테크 서비스 플랫폼",
    tech_stack: ["Next.js", "ETC"],
    service_type: ["App", "Web"],
    category: "app" as const,
    thumbnail: "/portfolio/dimipay.png",
    work_scope: ["기획", "개발"],
    features: ["핀테크 서비스", "무인 매점 결제 시스템"],
    sort_order: 3,
  },
  {
    id: "dimigo-in",
    name: "디미고인",
    description: "교내 생활 인트라넷 플랫폼",
    tech_stack: ["Next.js", "ETC"],
    service_type: ["App", "Web"],
    category: "app" as const,
    thumbnail: "/portfolio/dimigo-in.png",
    work_scope: ["기획", "개발"],
    features: ["교내 인트라넷", "학생 생활 관리"],
    sort_order: 4,
  },
  {
    id: "real-second-hand",
    name: "RealSecondHand",
    description: "SNS 기반 중고거래 플랫폼",
    tech_stack: ["React Native", "ETC"],
    service_type: ["App"],
    category: "app" as const,
    thumbnail: "/portfolio/real-second-hand.png",
    work_scope: ["기획", "개발"],
    features: ["SNS 연동", "중고거래 기능"],
    sort_order: 5,
  },
  {
    id: "dalgeurak",
    name: "달그락",
    description: "교내 급식 관리 플랫폼",
    tech_stack: ["ETC"],
    service_type: ["App"],
    category: "app" as const,
    thumbnail: "/portfolio/dalgeurak.png",
    work_scope: ["기획", "개발"],
    features: ["급식 메뉴 관리", "알림 시스템"],
    sort_order: 6,
  },
  {
    id: "hows-the-weather",
    name: "Hows the weather",
    description: "콘텐츠 제작사 웹사이트 디자인 및 개발",
    tech_stack: ["Next.js", "Vibe Coding"],
    service_type: ["Landing Page", "Web"],
    service_link: "https://www.howstheweather.kr/",
    category: "landing" as const,
    thumbnail: "/portfolio/hows-the-weather.png",
    work_scope: ["기획", "디자인", "개발"],
    features: ["반응형 웹(PC/Mobile)", "화면설계", "UI 디자인", "폼빌더 연동"],
    sort_order: 7,
  },
  {
    id: "sejong-env",
    name: "세종대학교 환경융합공학과",
    description: "세종대학교 환경융합공학과 소개 홈페이지",
    tech_stack: ["Next.js", "Vibe Coding"],
    service_type: ["Landing Page", "Web"],
    category: "landing" as const,
    work_scope: ["기획", "디자인", "개발"],
    features: ["반응형 웹", "학과 소개 페이지"],
    sort_order: 8,
  },
];

async function seedDatabase() {
  console.log('🚀 Seeding database with portfolio data...');
  console.log('📍 Supabase URL:', supabaseUrl);

  try {
    // First, check if tables exist
    console.log('🧪 Testing portfolio table access...');
    const { data: existingItems, error: testError } = await supabase
      .from('portfolio')
      .select('id')
      .limit(1);

    if (testError) {
      console.error('❌ Cannot access portfolio table:', testError.message);
      console.log('📝 Please ensure the tables are created first by running the SQL commands provided by "npm run db:test"');
      return;
    }

    console.log('✅ Portfolio table is accessible');

    // Clear existing data (optional - be careful in production!)
    console.log('🧹 Clearing existing portfolio data...');
    const { error: clearError } = await supabase
      .from('portfolio')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all except non-existent ID

    if (clearError) {
      console.warn('⚠️ Could not clear existing data:', clearError.message);
    } else {
      console.log('✅ Existing portfolio data cleared');
    }

    // Insert portfolio items
    console.log('📝 Inserting portfolio items...');
    for (const item of portfolioData) {
      console.log(`   Inserting: ${item.name}`);

      const { error: insertError } = await supabase
        .from('portfolio')
        .insert({
          // id: item.id, // Let PostgreSQL generate UUID automatically
          name: item.name,
          description: item.description,
          tech_stack: item.tech_stack,
          service_type: item.service_type,
          service_link: item.service_link || null,
          category: item.category,
          thumbnail: item.thumbnail || null,
          detail_link: null,
          features: item.features || null,
          work_scope: item.work_scope || null,
          is_active: true,
          sort_order: item.sort_order,
        });

      if (insertError) {
        console.error(`   ❌ Failed to insert ${item.name}:`, insertError.message);
      } else {
        console.log(`   ✅ ${item.name} inserted successfully`);
      }
    }

    // Verify the data
    console.log('🔍 Verifying inserted data...');
    const { data: allPortfolios, error: verifyError } = await supabase
      .from('portfolio')
      .select('id, name, category')
      .order('sort_order', { ascending: true });

    if (verifyError) {
      console.error('❌ Verification failed:', verifyError.message);
    } else {
      console.log('✅ Verification successful!');
      console.log(`📊 Total portfolio items in database: ${allPortfolios.length}`);

      console.log('\n📋 Portfolio items by category:');
      const categories = allPortfolios.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      Object.entries(categories).forEach(([category, count]) => {
        console.log(`   ${category}: ${count} items`);
      });

      console.log('\n📋 All items:');
      allPortfolios.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.name} (${item.category})`);
      });
    }

    console.log('\n🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
  }
}

if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };