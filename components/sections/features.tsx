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
    description: "템플릿과 AI를 활용하여 1주일 내외에 웹사이트 MVP를 완성합니다. 불필요한 비용 없이 핵심 기능에 집중합니다.",
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
    description: "Google Analytics 4, Google Tag Manager, UTM 기본 세팅과 퍼널 대시보드를 제공합니다. 데이터 기반 의사결정을 시작하세요.",
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
    description: "GUI 기반의 시각화된 피드백과 프롬프트 입력으로 간단한 수정이 가능합니다. 커뮤니케이션 비용을 줄입니다.",
    align: "left",
  },
  {
    // 전문적인 3D 모바일/소통 - 블루 톤
    iconSvg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="phone3d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="30%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="screen3d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <radialGradient id="notification3d">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="30%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#3B82F6" />
          </radialGradient>
        </defs>
        <ellipse cx="52" cy="85" rx="18" ry="4" fill="#000000" opacity="0.15" />
        <rect x="35" y="15" width="30" height="55" rx="6" fill="url(#phone3d)" stroke="#3B82F6" strokeWidth="1" />
        <rect x="38" y="22" width="24" height="35" rx="2" fill="url(#screen3d)" />
        <circle cx="50" cy="63" r="3" fill="#2563EB" />
        <rect x="45" y="18" width="10" height="1.5" rx="0.75" fill="#60A5FA" />
        <circle cx="55" cy="19" r="1.5" fill="#3B82F6" />
        <rect x="40" y="26" width="16" height="3" rx="1.5" fill="url(#notification3d)" />
        <rect x="40" y="31" width="18" height="3" rx="1.5" fill="url(#notification3d)" opacity="0.8" />
        <rect x="40" y="36" width="20" height="3" rx="1.5" fill="url(#notification3d)" opacity="0.6" />
        <text x="41" y="28" fontSize="2" fill="#F1F5F9" fontWeight="bold">12:34</text>
        <rect x="56" y="24" width="4" height="2" rx="0.3" fill="none" stroke="#3B82F6" strokeWidth="0.3" />
        <rect x="56.2" y="24.2" width="3.6" height="1.6" rx="0.2" fill="#60A5FA" />
        <rect x="52" y="26" width="1" height="1" fill="#3B82F6" />
        <rect x="53.5" y="25.5" width="1" height="1.5" fill="#60A5FA" />
        <rect x="55" y="25" width="1" height="2" fill="#93C5FD" />
        <rect x="36" y="16" width="2" height="20" fill="#FFFFFF" opacity="0.2" rx="1" />
        <path d="M25 30 Q35 25 45 30" stroke="#60A5FA" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M20 35 Q35 28 50 35" stroke="#3B82F6" strokeWidth="1.2" fill="none" opacity="0.8" />
        <circle cx="75" cy="25" r="3" fill="url(#notification3d)" />
        <circle cx="80" cy="35" r="2" fill="#60A5FA" opacity="0.8" />
        <circle cx="85" cy="45" r="1.5" fill="#93C5FD" opacity="0.6" />
      </svg>
    ),
    keyword: "실시간 공유",
    title: "진행상황을 실시간으로 공유해요",
    description: "단계 전환 시 자동 알림과 진행 현황을 실시간으로 공유합니다. 불필요한 회의 없이도 안심할 수 있습니다.",
    align: "right",
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
          setTimeout(() => setIsVisible(true), index * 200);
        }
      },
      { threshold: 0.2 }
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
        } items-center justify-center gap-6 md:gap-8 py-10 md:py-16 transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        {/* 아이콘 섹션 - 모바일 크기 증가 */}
        <div className="flex-shrink-0">
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 transition-all duration-700 ${
              isVisible ? "scale-100" : "scale-75"
            }`}
            style={{
              filter: "drop-shadow(0 12px 32px rgba(96, 165, 250, 0.3))",
            }}
          >
            {feature.iconSvg}
          </div>
        </div>

        {/* 텍스트 섹션 - 모바일 가독성 개선 */}
        <div className="flex-1 text-center lg:text-left max-w-md px-4">
          {/* 둥근 키워드 - 글래스모피즘 스타일 */}
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] text-white text-sm sm:text-base font-semibold">
              {feature.keyword}
            </span>
          </div>

          {/* 메인 카피 - 반응형 크기 개선 */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            {feature.title}
          </h3>

          {/* 서브 카피 - 모바일 가독성 개선 */}
          <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
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
      className="relative py-16 sm:py-20 md:py-32 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 장식용 그라데이션 원들 - 어두운 톤 */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-blue-300/5 rounded-full blur-2xl"></div>

      <div className="container relative z-10 px-4 sm:px-6">
        {/* 헤더 - 모바일 최적화 */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            이런 점이 특별해요
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed px-4">
            웹사이트 제작부터 데이터 추적, 유지보수까지 원스톱 솔루션
          </p>
        </div>

        {/* 특징 목록 - 가운데 정렬 */}
        <div className="flex flex-col items-center space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
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