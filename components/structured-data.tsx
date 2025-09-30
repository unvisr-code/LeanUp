export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LeanUp",
    "description": "빠른 납기, 저렴한 가격으로 웹사이트 제작부터 데이터 추적 셋업, 온보딩, 유지보수까지 한 번에 해결하세요.",
    "url": "https://leanup.kr",
    "logo": "https://leanup.kr/icon.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@leanup.kr",
      "contactType": "customer service",
      "availableLanguage": ["Korean", "English"]
    },
    "sameAs": [
      // 소셜 미디어 링크 추가 필요
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "웹사이트 제작",
        "description": "맞춤형 웹사이트 개발 서비스"
      },
      {
        "@type": "Offer",
        "name": "데이터 추적 모듈",
        "description": "GA4, GTM 설정 및 데이터 분석 대시보드"
      },
      {
        "@type": "Offer",
        "name": "유지보수 모듈",
        "description": "지속적인 웹사이트 관리 및 업데이트"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}