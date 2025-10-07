/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode - 개발 중 잠재적 문제 감지
  reactStrictMode: true,

  // SWC 기반 최소화 (더 빠른 빌드)
  swcMinify: true,

  // gzip 압축 활성화
  compress: true,

  // 불필요한 헤더 제거
  poweredByHeader: false,

  // 프로덕션 소스맵 비활성화 (번들 크기 감소)
  productionBrowserSourceMaps: false,

  // 폰트 최적화
  optimizeFonts: true,

  // 이미지 최적화 - 모바일 우선
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // AVIF 우선 (더 작은 용량)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 실험적 기능 - 성능 최적화
  experimental: {
    // optimizeCss: true, // critters 의존성 이슈로 비활성화
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // 헤더 설정 - 보안 및 캐싱
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
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
  },

  // Webpack 설정 - 번들 최적화 (모바일 성능 강화)
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // 프로덕션 최적화
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // React 관련 라이브러리 최우선 분리 (모바일 성능)
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 50,
              enforce: true,
            },
            // Framer Motion 별도 분리 (무거운 애니메이션 라이브러리)
            framer: {
              name: 'framer',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 40,
              enforce: true,
            },
            // GSAP 별도 분리
            gsap: {
              name: 'gsap',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              priority: 40,
              enforce: true,
            },
            // 프레임워크 코드 분리
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](prop-types|use-subscription)[\\/]/,
              priority: 35,
              enforce: true,
            },
            // 큰 라이브러리 분리
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1];
                return `npm.${packageName?.replace('@', '')}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // 공통 코드 분리
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;