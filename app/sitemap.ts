import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://leanup.kr';

  // 정적 페이지들 (공개된 페이지만 포함)
  const staticPages = [
    { route: '', priority: 1, changeFrequency: 'monthly' as const },
    { route: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/services/website', priority: 0.9, changeFrequency: 'monthly' as const },
    // '/services/data-module', // 공개 예정
    // '/services/maintenance-module', // 공개 예정
    // '/services/live-status', // 공개 예정
    { route: '/portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
  ];

  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // 포트폴리오 최신 업데이트 시간 가져오기
  try {
    const { data: portfolios } = await supabaseAdmin
      .from('portfolio')
      .select('updated_at')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(1);

    if (portfolios && portfolios.length > 0) {
      // 포트폴리오 페이지의 lastModified를 최신 포트폴리오 업데이트 시간으로 변경
      const portfolioIndex = staticRoutes.findIndex(route => route.url === `${baseUrl}/portfolio`);
      if (portfolioIndex !== -1) {
        staticRoutes[portfolioIndex].lastModified = new Date(portfolios[0].updated_at);
      }
    }
  } catch (error) {
    console.error('Failed to fetch portfolio data for sitemap:', error);
    // 에러 발생 시 현재 날짜 사용
  }

  // 나중에 동적 컨텐츠 (예: 블로그 포스트, 포트폴리오 상세)가 추가되면
  // 여기서 데이터베이스 쿼리를 통해 동적으로 추가할 수 있습니다
  // const dynamicRoutes = await fetchDynamicRoutes();

  return [...staticRoutes];
}