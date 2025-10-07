# 📱 모바일 최적화 가이드

LeanUp 프로젝트의 모바일 최적화 내역 및 가이드입니다.

## 🎯 적용된 최적화 사항

### 1. 터치 인터랙션 최적화 ✅

#### 최소 터치 타겟 크기 (44px-48px)
```css
/* globals.css */
button:not(.no-min-size):not(.icon-only),
a:not(.no-min-size):not(.inline-link),
[role="button"]:not(.no-min-size) {
  min-height: 44px;
  min-width: 44px;
}

.touch-target {
  min-height: 48px;
  min-width: 48px;
}
```

**사용 예시:**
```tsx
// 자동 적용
<button className="...">클릭</button>

// 제외가 필요한 경우
<button className="icon-only ...">아이콘만</button>
<a className="inline-link ...">인라인 링크</a>
```

#### 터치 딜레이 제거
```css
html {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
```

---

### 2. iOS 자동 줌 방지 ✅

#### 입력 필드 폰트 크기 고정 (16px)
```css
/* iOS에서 input 포커스 시 자동 줌 방지 */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
textarea {
  font-size: 16px !important;
}
```

**중요:** iOS Safari는 폰트 크기가 16px 미만일 때 자동으로 줌인합니다.

---

### 3. 성능 최적화 ✅

#### GPU 가속
```css
.gpu-accelerate {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

#### 스크롤 성능
```css
* {
  -webkit-overflow-scrolling: touch;
}
```

#### 애니메이션 최적화
```css
.animate-scroll-left {
  animation: scroll-left 20s linear infinite;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  contain: layout style paint;
  transform: translateZ(0);
}
```

---

### 4. 이미지 최적화 ✅

#### Next.js Image 설정
```js
// next.config.mjs
images: {
  formats: ['image/avif', 'image/webp'], // AVIF 우선 (더 작은 용량)
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60 * 60 * 24 * 365, // 1년 캐싱
}
```

**사용법:**
```tsx
import Image from 'next/image';

<Image
  src="/images/example.png"
  alt="예시"
  width={750}
  height={500}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority // LCP 이미지에만 사용
/>
```

---

### 5. 번들 최적화 ✅

#### 코드 스플리팅 전략
```js
// Framer Motion, GSAP, React 별도 분리
splitChunks: {
  cacheGroups: {
    react: { priority: 50 },      // React 최우선
    framer: { priority: 40 },     // Framer Motion
    gsap: { priority: 40 },       // GSAP
    framework: { priority: 35 },
    lib: { priority: 30 },
    commons: { priority: 20 }
  }
}
```

#### Dynamic Import 사용
```tsx
// app/page.tsx - 무거운 컴포넌트 지연 로딩
const FeaturesSection = dynamic(
  () => import("@/components/sections/features"),
  { ssr: false, loading: () => <div className="h-screen bg-black" /> }
);
```

---

### 6. 반응형 디자인 ✅

#### Tailwind Breakpoints
```js
// tailwind.config.ts
screens: {
  sm: "640px",   // 모바일 가로
  md: "768px",   // 태블릿
  lg: "1024px",  // 노트북
  xl: "1280px",  // 데스크톱
  "2xl": "1400px" // 대형 모니터
}
```

#### 반응형 컨테이너 패딩
```js
container: {
  padding: {
    DEFAULT: "1rem",    // 모바일: 16px
    sm: "1.5rem",       // 640px+: 24px
    md: "1.75rem",      // 768px+: 28px
    lg: "2rem",         // 1024px+: 32px
    xl: "2.5rem",       // 1280px+: 40px
    "2xl": "3rem",      // 1400px+: 48px
  }
}
```

---

### 7. 모바일 전용 유틸리티 클래스 ✅

```css
/* 모바일에서만 적용되는 클래스들 */
@media (max-width: 767px) {
  .mobile\:text-balance { text-wrap: balance; }
  .mobile\:hide-scrollbar { /* 스크롤바 숨김 */ }
  .mobile\:reduce-motion { /* 애니메이션 축소 */ }

  /* iOS Safe Area 대응 */
  .mobile\:safe-top { padding-top: env(safe-area-inset-top); }
  .mobile\:safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
  .mobile\:safe-left { padding-left: env(safe-area-inset-left); }
  .mobile\:safe-right { padding-right: env(safe-area-inset-right); }

  .mobile\:compact { padding: 0.75rem; }
  .mobile\:text-readable { font-size: 16px; line-height: 1.6; }
}
```

**사용 예시:**
```tsx
<div className="p-4 mobile:compact mobile:safe-bottom">
  <p className="text-sm mobile:text-readable">모바일 최적화 텍스트</p>
</div>
```

---

### 8. Viewport 및 메타태그 ✅

```tsx
// app/layout.tsx
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover"
/>
```

**설정 설명:**
- `width=device-width`: 기기 너비에 맞춤
- `initial-scale=1.0`: 초기 줌 레벨 1.0
- `maximum-scale=5.0`: 최대 5배 줌 허용 (접근성)
- `user-scalable=yes`: 사용자 줌 허용
- `viewport-fit=cover`: 노치 대응 (iPhone X+)

---

### 9. 캐싱 전략 ✅

```js
// next.config.mjs
async headers() {
  return [
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, stale-while-revalidate=604800',
        },
      ],
    },
  ];
}
```

---

## 📊 성능 지표

### 빌드 결과
```
Route (app)                              Size     First Load JS
┌ ○ /                                    8.14 kB         222 kB
├ ○ /services/website                    3.16 kB         217 kB
├ ○ /portfolio                           2.48 kB         216 kB
+ First Load JS shared by all            132 kB
```

### 목표 성능 지표
- **First Contentful Paint (FCP)**: < 1.8초
- **Largest Contentful Paint (LCP)**: < 2.5초
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8초
- **Total Blocking Time (TBT)**: < 200ms

---

## 🎨 모바일 UX 패턴

### 1. 터치 친화적 네비게이션
```tsx
// hero-with-nav.tsx
<button
  className="md:hidden inline-flex items-center justify-center
             p-2 min-w-[48px] min-h-[48px]
             text-white hover:bg-white/10 rounded-lg
             transition-colors touch-manipulation"
  aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
>
  {isMobileMenuOpen ? <X /> : <Menu />}
</button>
```

### 2. 모바일 메뉴 스크롤 방지
```tsx
useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  } else {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }
}, [isMobileMenuOpen]);
```

### 3. 반응형 텍스트 크기
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl
               font-bold tracking-tight leading-tight">
  빠르고 전문적인
</h1>

<p className="text-sm sm:text-base md:text-lg lg:text-xl
              text-white/80 leading-relaxed">
  전문가 퀄리티 · 스타트업 속도
</p>
```

### 4. 모바일 간격 조정
```tsx
<div className="pt-28 pb-16 sm:pt-32 sm:pb-20">
  <div className="mb-4 sm:mb-6 md:mb-10">
    <div className="gap-3 sm:gap-4 px-6">
      {/* 콘텐츠 */}
    </div>
  </div>
</div>
```

---

## 🧪 테스트 체크리스트

### 기기별 테스트
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 14 Plus (428px)
- [ ] Samsung Galaxy S21 (360px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro (1024px)

### 기능 테스트
- [ ] 터치 타겟이 충분히 큰가? (최소 44px)
- [ ] 입력 필드 포커스 시 자동 줌이 발생하지 않는가?
- [ ] 스크롤이 부드러운가?
- [ ] 애니메이션이 끊기지 않는가?
- [ ] 이미지가 빠르게 로딩되는가?
- [ ] 네비게이션 메뉴가 잘 작동하는가?
- [ ] iOS Safe Area가 올바르게 처리되는가?

### 성능 테스트
- [ ] Lighthouse Mobile 점수 > 90
- [ ] PageSpeed Insights Mobile 점수 > 85
- [ ] WebPageTest Mobile 성능 확인
- [ ] 3G 환경에서 로딩 시간 < 5초

---

## 🚀 추가 최적화 권장사항

### 1. 프리로드 힌트 추가
```tsx
// app/layout.tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://analytics.google.com" />
</head>
```

### 2. Service Worker 도입 (PWA)
```bash
npm install next-pwa
```

### 3. 이미지 지연 로딩
```tsx
<Image
  src="/image.jpg"
  alt="예시"
  loading="lazy" // 뷰포트에 들어올 때 로딩
/>
```

### 4. Critical CSS 인라인화
- 첫 화면에 필요한 CSS만 인라인으로 포함
- 나머지는 비동기 로딩

### 5. 폰트 최적화
```tsx
// 현재: CDN 로딩
// 권장: next/font 사용으로 자동 최적화
import { Pretendard } from 'next/font/google';

const pretendard = Pretendard({
  subsets: ['latin'],
  display: 'swap'
});
```

---

## 📚 참고 자료

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Mobile Performance](https://web.dev/mobile/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Touch Targets](https://m3.material.io/foundations/interaction/states/overview)
- [Core Web Vitals](https://web.dev/vitals/)

---

## 🔧 문제 해결

### iOS에서 스크롤이 부자연스러울 때
```css
-webkit-overflow-scrolling: touch;
```

### Android에서 터치 하이라이트가 표시될 때
```css
-webkit-tap-highlight-color: transparent;
```

### 모달 열릴 때 배경 스크롤 방지
```tsx
useEffect(() => {
  if (isOpen) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }
}, [isOpen]);
```

---

**마지막 업데이트:** 2025-10-06
**빌드 버전:** Next.js 14.2.5
**프로젝트:** LeanUp Website
