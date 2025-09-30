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

  // 이미지 최적화
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: false,
  },

  // Webpack 설정 - 번들 최적화
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // 프로덕션 최적화
    if (config.mode === 'production') {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // 프레임워크 코드 분리
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
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
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;