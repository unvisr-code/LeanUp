"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";

const features: Array<{
  iconSvg: JSX.Element;
  keyword: string;
  title: string;
  description: string;
  align: "left" | "right";
}> = [
  {
    // 전문적인 3D 로켓 - 블루 톤
    iconSvg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="rocket3d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="rocketShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <radialGradient id="window3d">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="50%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3B82F6" />
          </radialGradient>
          <linearGradient id="flame3d" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <ellipse cx="52" cy="85" rx="18" ry="4" fill="#000000" opacity="0.1" />
        <path d="M50 10 C48 10 44 12 42 20 C40 25 38 35 38 45 C38 55 40 62 42 65 L58 65 C60 62 62 55 62 45 C62 35 60 25 58 20 C56 12 52 10 50 10 Z" fill="url(#rocket3d)" />
        <path d="M38 45 C38 55 40 62 42 65 L46 65 C44 60 43 52 44 45 C45 35 46 25 47 20 C45 15 42 25 40 35 C39 40 38 42 38 45 Z" fill="url(#rocketShadow)" opacity="0.4" />
        <path d="M50 8 Q45 8 42 20 Q50 5 58 20 Q55 8 50 8" fill="#93C5FD" />
        <ellipse cx="50" cy="30" rx="8" ry="6" fill="url(#window3d)" />
        <ellipse cx="50" cy="30" rx="5" ry="4" fill="#BFDBFE" />
        <circle cx="47" cy="28" r="2" fill="#FFFFFF" opacity="0.8" />
        <path d="M38 50 C32 52 30 55 32 60 C34 62 38 61 42 58 Z" fill="url(#rocketShadow)" />
        <path d="M62 50 C68 52 70 55 68 60 C66 62 62 61 58 58 Z" fill="url(#rocketShadow)" />
        <rect x="43" y="62" width="14" height="5" fill="#1E40AF" rx="1" />
        <path d="M43 67 Q35 75 42 82 Q47 88 50 78 Q53 88 58 82 Q65 75 57 67 Q50 70 43 67" fill="url(#flame3d)" />
        <path d="M45 70 Q42 75 45 78 Q48 82 50 75 Q52 82 55 78 Q58 75 55 70 Q50 72 45 70" fill="#93C5FD" />
      </svg>
    ),
    keyword: "빠른 납기",
    title: "빠르고 합리적으로 만들어요",
    description: "2주일 내 MVP 완성. 핵심 기능에 집중합니다.",
    align: "left",
  },
  {
    // 전문적인 3D 차트 - 블루 톤
    iconSvg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="chart3d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="50%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="chartBg3d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="bars3d" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <ellipse cx="52" cy="85" rx="20" ry="3" fill="#000000" opacity="0.1" />
        <rect x="15" y="20" width="70" height="55" fill="url(#chartBg3d)" rx="4" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="20" y1="70" x2="80" y2="70" stroke="#E2E8F0" strokeWidth="1" />
        <line x1="20" y1="60" x2="80" y2="60" stroke="#E2E8F0" strokeWidth="0.5" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="#E2E8F0" strokeWidth="0.5" />
        <line x1="20" y1="40" x2="80" y2="40" stroke="#E2E8F0" strokeWidth="0.5" />
        <line x1="20" y1="30" x2="80" y2="30" stroke="#E2E8F0" strokeWidth="0.5" />
        <rect x="25" y="60" width="8" height="10" fill="url(#bars3d)" rx="1" />
        <rect x="40" y="50" width="8" height="20" fill="url(#bars3d)" rx="1" />
        <rect x="55" y="35" width="8" height="35" fill="url(#bars3d)" rx="1" />
        <rect x="70" y="45" width="8" height="25" fill="url(#bars3d)" rx="1" />
        <rect x="26" y="61" width="2" height="8" fill="#FFFFFF" opacity="0.3" />
        <rect x="41" y="51" width="2" height="18" fill="#FFFFFF" opacity="0.3" />
        <rect x="56" y="36" width="2" height="33" fill="#FFFFFF" opacity="0.3" />
        <rect x="71" y="46" width="2" height="23" fill="#FFFFFF" opacity="0.3" />
        <circle cx="29" cy="55" r="2" fill="#3B82F6" />
        <circle cx="44" cy="45" r="2" fill="#3B82F6" />
        <circle cx="59" cy="30" r="2" fill="#3B82F6" />
        <circle cx="74" cy="40" r="2" fill="#3B82F6" />
        <path d="M29 55 Q36 50 44 45 Q51 37 59 30 Q66 35 74 40" stroke="#2563EB" strokeWidth="2.5" fill="none" />
        <path d="M75 25 L80 20 L85 25 L80 22 L80 28 L78 28 L78 22 Z" fill="#2563EB" />
      </svg>
    ),
    keyword: "데이터 분석",
    title: "데이터 분석도 함께 세팅해요",
    description: "GA4, GTM, UTM 기본 세팅 제공. 데이터 기반 의사결정을 시작하세요.",
    align: "right",
  },
  {
    // 전문적인 3D 기어 - 블루 톤
    iconSvg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="gear3d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="30%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <radialGradient id="gearCenter3d">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="50%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3B82F6" />
          </radialGradient>
        </defs>
        <ellipse cx="52" cy="52" rx="25" ry="25" fill="#000000" opacity="0.1" />
        <g fill="url(#gear3d)">
          <rect x="47" y="12" width="6" height="8" rx="1" />
          <rect x="66" y="17" width="8" height="6" rx="1" transform="rotate(45 70 20)" />
          <rect x="83" y="47" width="8" height="6" rx="1" />
          <rect x="66" y="77" width="8" height="6" rx="1" transform="rotate(-45 70 80)" />
          <rect x="47" y="80" width="6" height="8" rx="1" />
          <rect x="26" y="77" width="8" height="6" rx="1" transform="rotate(45 30 80)" />
          <rect x="9" y="47" width="8" height="6" rx="1" />
          <rect x="26" y="17" width="8" height="6" rx="1" transform="rotate(-45 30 20)" />
        </g>
        <circle cx="50" cy="50" r="20" fill="url(#gear3d)" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="#60A5FA" strokeWidth="0.8" opacity="0.4" />
        <circle cx="50" cy="50" r="12" fill="url(#gearCenter3d)" />
        <circle cx="50" cy="50" r="6" fill="#2563EB" />
        <path d="M35 35 Q50 30 65 35 Q60 40 50 38 Q40 40 35 35" fill="#FFFFFF" opacity="0.2" />
        <circle cx="42" cy="42" r="1.5" fill="#2563EB" />
        <circle cx="58" cy="42" r="1.5" fill="#2563EB" />
        <circle cx="42" cy="58" r="1.5" fill="#2563EB" />
        <circle cx="58" cy="58" r="1.5" fill="#2563EB" />
        <rect x="48" y="13" width="1" height="6" fill="#FFFFFF" opacity="0.4" />
        <rect x="84" y="48" width="6" height="1" fill="#FFFFFF" opacity="0.4" />
      </svg>
    ),
    keyword: "유지보수",
    title: "유지보수도 쉽게 할 수 있어요",
    description: "GUI 피드백으로 간단 수정 가능. 소통 비용을 줄입니다.",
    align: "left",
  },
];

interface FeatureItemProps {
  feature: {
    iconSvg: JSX.Element;
    keyword: string;
    title: string;
    description: string;
    align: "left" | "right";
  };
  index: number;
}

function FeatureItem({ feature, index }: FeatureItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 모바일에서 더 빠른 애니메이션 (100ms 딜레이)
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const isLeft = feature.align === "left";

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto">
      <div
        className={`flex flex-col ${
          isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center justify-center gap-4 md:gap-6 py-6 md:py-10 transition-all duration-700 active:scale-[0.98] touch-manipulation ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        {/* 아이콘 섹션 - 모바일 크기 확대 */}
        <div className="flex-shrink-0">
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 transition-all duration-700 ${
              isVisible ? "scale-100" : "scale-75"
            }`}
            style={{
              filter: "drop-shadow(0 8px 24px rgba(96, 165, 250, 0.25))",
            }}
          >
            {feature.iconSvg}
          </div>
        </div>

        {/* 텍스트 섹션 - 모바일 가독성 향상 */}
        <div className="flex-1 text-center lg:text-left max-w-md px-4">
          {/* 둥근 키워드 - 글래스모피즘 스타일 */}
          <div className="mb-3 sm:mb-3 md:mb-4">
            <span className="inline-flex items-center px-4 py-2 md:px-4 md:py-2 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] text-white text-sm sm:text-sm font-semibold">
              {feature.keyword}
            </span>
          </div>

          {/* 메인 카피 - 모바일 크기 증가 */}
          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-3 leading-tight">
            {feature.title}
          </h3>

          {/* 서브 카피 - 모바일 가독성 향상 */}
          <p className="text-sm sm:text-sm md:text-base text-white/70 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FeaturesSectionComponent() {
  return (
    <motion.section
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-label="특별한 서비스 기능"
    >
      {/* 장식용 그라데이션 원들 - 어두운 톤 */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-blue-300/5 rounded-full blur-2xl"></div>

      <div className="container relative z-10 px-4 sm:px-6">
        {/* 헤더 - 모바일 최적화 */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            이런 점이 특별해요
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
            웹사이트 제작부터 데이터 추적까지 원스톱 솔루션
          </p>
        </div>

        {/* 특징 목록 - 가운데 정렬, 모바일에서도 모든 항목 표시 */}
        <div className="flex flex-col items-center space-y-4 md:space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="w-full"
            >
              <FeatureItem feature={feature} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Export memoized component
export const FeaturesSection = memo(FeaturesSectionComponent);