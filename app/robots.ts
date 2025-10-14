import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProd =
    process.env.VERCEL_ENV === 'production' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'prod';

  // 개발/프리뷰 환경 차단
  if (!isProd) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap: 'https://leanup.kr/sitemap.xml',
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/', // 내부 빌드 자원만 차단
          '/static/', // 정적 폴더(이미지는 sitemap이 커버)
        ],
      },

      // ✅ 주요 검색엔진 허용
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' }, // Gemini / Search Generative Experience용
      { userAgent: 'GoogleOther', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' }, // Copilot / ChatGPT Bing Search 통합
      { userAgent: 'Yeti', allow: '/' }, // 네이버

      // ✅ 주요 AI 모델 크롤러 허용
      { userAgent: 'GPTBot', allow: '/' }, // OpenAI GPT 학습용
      { userAgent: 'ChatGPT-User', allow: '/' }, // ChatGPT 실시간 요청용
      { userAgent: 'ClaudeBot', allow: '/' }, // Anthropic Claude
      { userAgent: 'Claude-Web', allow: '/' }, // Claude.ai 웹검색
      { userAgent: 'CCBot', allow: '/' }, // Common Crawl (AI 학습 데이터 소스)
      { userAgent: 'PerplexityBot', allow: '/' }, // Perplexity.ai
      { userAgent: 'DuckDuckBot', allow: '/' }, // DuckDuckGo / AI Answers
      { userAgent: 'Applebot', allow: '/' }, // Apple AI Search
      { userAgent: 'GoogleOther', allow: '/' },
    ],
    sitemap: 'https://leanup.kr/sitemap.xml',
  };
}
