import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://leanup.kr';

  // 정적 페이지들 (공개된 페이지만 포함)
  const staticPages = [
    '',
    '/about',
    '/services',
    '/services/website',
    // '/services/data-module', // 공개 예정
    // '/services/maintenance-module', // 공개 예정
    // '/services/live-status', // 공개 예정
    '/portfolio',
    '/contact',
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 나중에 동적 컨텐츠 (예: 블로그 포스트, 포트폴리오 상세)가 추가되면
  // 여기서 데이터베이스 쿼리를 통해 동적으로 추가할 수 있습니다
  // const dynamicRoutes = await fetchDynamicRoutes();

  return [...staticRoutes];
}