"use client";

import { DarkHeader } from "@/components/layout/dark-header";
import { Footer } from "@/components/layout/footer";
import { PageWrapper, PageHeader } from "@/components/layout/page-wrapper";
import { QuoteModal } from "@/components/quote-modal";
import { motion } from "framer-motion";
import { Users, Zap, Target, Heart, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const teamMembers = [
  { emoji: "👨‍💼", name: "프로젝트 매니저", description: "전반 설계, 컨설팅, 프로젝트 관리" },
  { emoji: "💻", name: "프론트엔드 엔지니어", description: "인터랙션 설계, 비즈니스 로직, 배포" },
  { emoji: "🔧", name: "백엔드 엔지니어", description: "데이터베이스, 스키마 설계, 서버 로직 구현" },
  { emoji: "🖊️", name: "데이터 보안 엔지니어", description: "보안 설계, 암호 패키 및 관리, 역할 수정" },
  { emoji: "📊", name: "데이터 엔지니어", description: "태깅, GTM, BigQuery, 리포트" },
  { emoji: "🎨", name: "디자이너", description: "색상 팔 컨포넌트 제품화, 배너 디자인" },
];

const values = [
  {
    icon: Zap,
    title: "속도",
    description: "빠른 납기와 신속한 대응으로\n비즈니스 성장을 가속화합니다",
  },
  {
    icon: Target,
    title: "효율",
    description: "불필요한 과정을 제거하고\n핵심에 집중하여 비용을 최적화합니다",
  },
  {
    icon: Heart,
    title: "고객 중심",
    description: "고객의 성공이 우리의 성공이라는\n믿음으로 함께 성장합니다",
  },
  {
    icon: Users,
    title: "협업",
    description: "투명한 소통과 체계적인 협업으로\n최고의 결과를 만듭니다",
  },
];

// Background 3D Elements for Mission Section
function Background3DElements() {
  return (
    <div className="absolute inset-0 z-10">
      {/* Data Analytics Icon - Top Left */}
      <div
        className="absolute top-16 left-16 w-32 h-32 opacity-20"
        style={{
          animation: "float 8s ease-in-out infinite",
          animationDelay: "0s"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="bgChart3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>
            <linearGradient id="bgBars3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
          </defs>
          <g transform="perspective(1000) rotateX(15) rotateY(-10)">
            <rect x="15" y="20" width="70" height="60" fill="url(#bgChart3d)" rx="8" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <rect x="25" y="60" width="8" height="15" fill="url(#bgBars3d)" rx="2" />
            <rect x="38" y="50" width="8" height="25" fill="url(#bgBars3d)" rx="2" />
            <rect x="51" y="35" width="8" height="40" fill="url(#bgBars3d)" rx="2" />
            <rect x="64" y="45" width="8" height="30" fill="url(#bgBars3d)" rx="2" />
            <circle cx="29" cy="52" r="2" fill="rgba(255,255,255,0.8)" />
            <circle cx="42" cy="42" r="2" fill="rgba(255,255,255,0.8)" />
            <circle cx="55" cy="27" r="2" fill="rgba(255,255,255,0.8)" />
            <circle cx="68" cy="37" r="2" fill="rgba(255,255,255,0.8)" />
            <path d="M29 52 Q35 47 42 42 Q48 34 55 27 Q61 32 68 37" stroke="rgba(255,255,255,0.9)" strokeWidth="3" fill="none" />
          </g>
        </svg>
      </div>

      {/* Web Development Icon - Top Right */}
      <div
        className="absolute top-20 right-20 w-36 h-36 opacity-15"
        style={{
          animation: "float 10s ease-in-out infinite",
          animationDelay: "2s"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="bgWeb3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>
          </defs>
          <g transform="perspective(1000) rotateX(10) rotateY(15)">
            <rect x="10" y="15" width="80" height="60" fill="url(#bgWeb3d)" rx="6" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <rect x="10" y="15" width="80" height="12" fill="rgba(255,255,255,0.6)" rx="6" />
            <circle cx="18" cy="21" r="2" fill="rgba(59,130,246,0.4)" />
            <circle cx="26" cy="21" r="2" fill="rgba(59,130,246,0.4)" />
            <circle cx="34" cy="21" r="2" fill="rgba(59,130,246,0.4)" />
            <rect x="20" y="35" width="60" height="3" fill="rgba(255,255,255,0.7)" rx="1" />
            <rect x="20" y="42" width="45" height="3" fill="rgba(255,255,255,0.7)" rx="1" />
            <rect x="20" y="49" width="55" height="3" fill="rgba(255,255,255,0.7)" rx="1" />
            <rect x="20" y="56" width="40" height="3" fill="rgba(255,255,255,0.7)" rx="1" />
          </g>
        </svg>
      </div>

      {/* Collaboration Icon - Bottom Left */}
      <div
        className="absolute bottom-24 left-24 w-28 h-28 opacity-25"
        style={{
          animation: "float 7s ease-in-out infinite",
          animationDelay: "4s"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="bgCollab3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#DBEAFE" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
          </defs>
          <g transform="perspective(1000) rotateX(-10) rotateY(-15)">
            <circle cx="30" cy="25" r="8" fill="url(#bgCollab3d)" />
            <circle cx="70" cy="25" r="8" fill="url(#bgCollab3d)" />
            <circle cx="50" cy="45" r="8" fill="url(#bgCollab3d)" />
            <path d="M30 33 Q40 40 50 37" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" />
            <path d="M50 53 Q60 40 70 33" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" />
            <path d="M22 25 Q15 35 22 45" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" />
            <circle cx="15" cy="35" r="3" fill="rgba(255,255,255,0.8)" />
            <circle cx="85" cy="35" r="3" fill="rgba(255,255,255,0.8)" />
            <circle cx="50" cy="70" r="3" fill="rgba(255,255,255,0.8)" />
          </g>
        </svg>
      </div>

      {/* Server/Database Icon - Bottom Right */}
      <div
        className="absolute bottom-16 right-16 w-30 h-30 opacity-20"
        style={{
          animation: "float 9s ease-in-out infinite",
          animationDelay: "1s"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="bgServer3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>
          </defs>
          <g transform="perspective(1000) rotateX(5) rotateY(20)">
            <rect x="25" y="20" width="50" height="60" fill="url(#bgServer3d)" rx="4" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <rect x="30" y="28" width="40" height="8" fill="rgba(255,255,255,0.6)" rx="2" />
            <rect x="30" y="40" width="40" height="8" fill="rgba(255,255,255,0.6)" rx="2" />
            <rect x="30" y="52" width="40" height="8" fill="rgba(255,255,255,0.6)" rx="2" />
            <rect x="30" y="64" width="40" height="8" fill="rgba(255,255,255,0.6)" rx="2" />
            <circle cx="67" cy="32" r="2" fill="rgba(34,197,94,0.8)" />
            <circle cx="67" cy="44" r="2" fill="rgba(34,197,94,0.8)" />
            <circle cx="67" cy="56" r="2" fill="rgba(34,197,94,0.8)" />
            <circle cx="67" cy="68" r="2" fill="rgba(34,197,94,0.8)" />
          </g>
        </svg>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/3 left-1/3 w-24 h-24 opacity-10">
        <div className="w-full h-full bg-white rounded-full blur-xl"></div>
      </div>

      <div className="absolute bottom-1/3 right-1/3 w-32 h-32 opacity-10">
        <div className="w-full h-full bg-blue-200 rounded-full blur-2xl"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          25% { transform: translateY(-15px) rotateZ(2deg); }
          50% { transform: translateY(-10px) rotateZ(0deg); }
          75% { transform: translateY(-20px) rotateZ(-2deg); }
        }
      `}</style>
    </div>
  );
}

// FloatingIcons Component with 3D Icons
function FloatingIcons() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-96 flex items-center justify-center">
      {/* Data Analytics Icon */}
      <div
        className={`absolute top-8 left-8 w-24 h-24 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{
          animation: isVisible ? "float 6s ease-in-out infinite" : "none",
          animationDelay: "0s"
        }}
      >
        <div className="w-full h-full bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="chart3d" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DBEAFE" />
                <stop offset="50%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="bars3d" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <rect x="20" y="25" width="60" height="50" fill="url(#chart3d)" rx="4" stroke="#CBD5E1" strokeWidth="1" />
            <rect x="28" y="55" width="6" height="15" fill="url(#bars3d)" rx="1" />
            <rect x="38" y="50" width="6" height="20" fill="url(#bars3d)" rx="1" />
            <rect x="48" y="40" width="6" height="30" fill="url(#bars3d)" rx="1" />
            <rect x="58" y="45" width="6" height="25" fill="url(#bars3d)" rx="1" />
            <circle cx="31" cy="48" r="1.5" fill="#3B82F6" />
            <circle cx="41" cy="43" r="1.5" fill="#3B82F6" />
            <circle cx="51" cy="33" r="1.5" fill="#3B82F6" />
            <circle cx="61" cy="38" r="1.5" fill="#3B82F6" />
            <path d="M31 48 Q36 45 41 43 Q46 38 51 33 Q56 35 61 38" stroke="#2563EB" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Onboarding Icon */}
      <div
        className={`absolute top-16 right-12 w-28 h-28 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{
          animation: isVisible ? "float 6s ease-in-out infinite" : "none",
          animationDelay: "1s"
        }}
      >
        <div className="w-full h-full bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="person3d" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="book3d" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DBEAFE" />
                <stop offset="50%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <circle cx="35" cy="28" r="8" fill="url(#person3d)" />
            <rect x="27" y="38" width="16" height="20" rx="8" fill="url(#person3d)" />
            <rect x="55" y="25" width="25" height="18" rx="2" fill="url(#book3d)" />
            <rect x="55" y="47" width="25" height="18" rx="2" fill="url(#book3d)" />
            <line x1="59" y1="30" x2="75" y2="30" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="59" y1="34" x2="70" y2="34" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="59" y1="52" x2="75" y2="52" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="59" y1="56" x2="72" y2="56" stroke="#FFFFFF" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* All-in-One Icon */}
      <div
        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-32 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{
          animation: isVisible ? "float 6s ease-in-out infinite" : "none",
          animationDelay: "2s"
        }}
      >
        <div className="w-full h-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="puzzle3d" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="30%" stopColor="#CBD5E1" />
                <stop offset="70%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            <path d="M25 25 h15 v5 a5 5 0 0 1 10 0 v-5 h15 v15 h-5 a5 5 0 0 1 0 10 h5 v15 h-15 v-5 a5 5 0 0 1 -10 0 v5 h-15 v-15 h5 a5 5 0 0 1 0 -10 h-5 z" fill="url(#puzzle3d)" />
            <path d="M27 27 h11 v3 a3 3 0 0 1 6 0 v-3 h11 v11 h-3 a3 3 0 0 1 0 6 h3 v11 h-11 v-3 a3 3 0 0 1 -6 0 v3 h-11 v-11 h3 a3 3 0 0 1 0 -6 h-3 z" fill="#FFFFFF" opacity="0.3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export default function AboutPageClient() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  return (
    <PageWrapper>
      <DarkHeader />

      {/* Add padding to account for fixed header */}
      <div className="pt-24">
        <PageHeader
          title="LEANUP 소개"
          subtitle="스타트업과 소규모 기업의 성장을 돕는 웹 개발 전문 팀입니다"
        />


        {/* Values Section */}
        <motion.section
          className="py-16 md:py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
                핵심 가치
              </h2>
              <p className="mb-12 text-lg text-white/70">
                우리가 추구하는 가치
              </p>
            </motion.div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-6 shadow-lg hover:bg-white/[0.12] hover:border-white/[0.25] transition-all">
                      <div className="w-16 h-16 mx-auto mb-4" style={{ filter: "drop-shadow(0 8px 16px rgba(59, 130, 246, 0.15))" }}>
                        {index === 0 && (
                          // 속도 - 3D 번개 아이콘
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <defs>
                              <linearGradient id="lightning3d" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="50%" stopColor="#3B82F6" />
                                <stop offset="100%" stopColor="#2563EB" />
                              </linearGradient>
                              <linearGradient id="lightningShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1E40AF" />
                                <stop offset="100%" stopColor="#1E3A8A" />
                              </linearGradient>
                            </defs>
                            <ellipse cx="52" cy="85" rx="20" ry="4" fill="#000000" opacity="0.1" />
                            <path d="M35 15 L55 15 L45 45 L60 45 L40 85 L50 55 L35 55 Z" fill="url(#lightning3d)" />
                            <path d="M40 85 L45 70 L42 55 L35 55 L35 50 L40 45 L35 30 L40 15 L35 15 L30 30 L35 45 L25 45 L40 85" fill="url(#lightningShadow)" opacity="0.4" />
                            <path d="M50 15 Q45 20 50 25 Q55 20 55 15 Q52 12 50 15" fill="#93C5FD" />
                            <circle cx="47" cy="30" r="2" fill="#FFFFFF" opacity="0.8" />
                            <circle cx="52" cy="65" r="2" fill="#FFFFFF" opacity="0.6" />
                          </svg>
                        )}
                        {index === 1 && (
                          // 효율 - 3D 타겟 아이콘
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <defs>
                              <linearGradient id="target3d" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="50%" stopColor="#3B82F6" />
                                <stop offset="100%" stopColor="#2563EB" />
                              </linearGradient>
                              <radialGradient id="targetCenter3d">
                                <stop offset="0%" stopColor="#DBEAFE" />
                                <stop offset="50%" stopColor="#93C5FD" />
                                <stop offset="100%" stopColor="#3B82F6" />
                              </radialGradient>
                            </defs>
                            <ellipse cx="52" cy="52" rx="25" ry="25" fill="#000000" opacity="0.1" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#target3d)" strokeWidth="4" />
                            <circle cx="50" cy="50" r="22" fill="none" stroke="url(#target3d)" strokeWidth="3" />
                            <circle cx="50" cy="50" r="14" fill="none" stroke="url(#target3d)" strokeWidth="2" />
                            <circle cx="50" cy="50" r="8" fill="url(#targetCenter3d)" />
                            <circle cx="50" cy="50" r="4" fill="#2563EB" />
                            <path d="M20 50 L30 50" stroke="url(#target3d)" strokeWidth="2" strokeLinecap="round" />
                            <path d="M70 50 L80 50" stroke="url(#target3d)" strokeWidth="2" strokeLinecap="round" />
                            <path d="M50 20 L50 30" stroke="url(#target3d)" strokeWidth="2" strokeLinecap="round" />
                            <path d="M50 70 L50 80" stroke="url(#target3d)" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="46" cy="46" r="1.5" fill="#FFFFFF" opacity="0.8" />
                          </svg>
                        )}
                        {index === 2 && (
                          // 고객 중심 - 3D 하트 아이콘
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <defs>
                              <linearGradient id="heart3d" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="50%" stopColor="#3B82F6" />
                                <stop offset="100%" stopColor="#2563EB" />
                              </linearGradient>
                              <linearGradient id="heartShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1E40AF" />
                                <stop offset="100%" stopColor="#1E3A8A" />
                              </linearGradient>
                            </defs>
                            <ellipse cx="52" cy="85" rx="20" ry="4" fill="#000000" opacity="0.1" />
                            <path d="M50 75 C35 60 20 45 20 30 C20 20 30 15 40 20 C45 15 50 15 50 20 C50 15 55 15 60 20 C70 15 80 20 80 30 C80 45 65 60 50 75 Z" fill="url(#heart3d)" />
                            <path d="M50 75 C40 65 30 55 25 45 C22 40 20 35 20 30 C20 25 22 20 25 18 C22 20 20 25 20 30 C20 45 35 60 50 75" fill="url(#heartShadow)" opacity="0.4" />
                            <circle cx="35" cy="28" r="3" fill="url(#heartShadow)" />
                            <circle cx="65" cy="28" r="3" fill="url(#heartShadow)" />
                            <ellipse cx="42" cy="35" rx="6" ry="4" fill="#93C5FD" opacity="0.6" />
                            <ellipse cx="58" cy="35" rx="6" ry="4" fill="#93C5FD" opacity="0.6" />
                            <circle cx="38" cy="32" r="2" fill="#FFFFFF" opacity="0.8" />
                            <circle cx="62" cy="32" r="2" fill="#FFFFFF" opacity="0.8" />
                          </svg>
                        )}
                        {index === 3 && (
                          // 협업 - 3D 팀 아이콘
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <defs>
                              <linearGradient id="team3d" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="50%" stopColor="#3B82F6" />
                                <stop offset="100%" stopColor="#2563EB" />
                              </linearGradient>
                              <radialGradient id="person3d">
                                <stop offset="0%" stopColor="#DBEAFE" />
                                <stop offset="50%" stopColor="#93C5FD" />
                                <stop offset="100%" stopColor="#3B82F6" />
                              </radialGradient>
                            </defs>
                            <ellipse cx="52" cy="85" rx="25" ry="4" fill="#000000" opacity="0.1" />
                            <circle cx="35" cy="25" r="8" fill="url(#person3d)" />
                            <ellipse cx="35" cy="45" rx="10" ry="15" fill="url(#team3d)" />
                            <circle cx="65" cy="25" r="8" fill="url(#person3d)" />
                            <ellipse cx="65" cy="45" rx="10" ry="15" fill="url(#team3d)" />
                            <circle cx="50" cy="35" r="10" fill="url(#person3d)" />
                            <ellipse cx="50" cy="60" rx="12" ry="18" fill="url(#team3d)" />
                            <circle cx="32" cy="22" r="2" fill="#FFFFFF" opacity="0.8" />
                            <circle cx="62" cy="22" r="2" fill="#FFFFFF" opacity="0.8" />
                            <circle cx="47" cy="32" r="2.5" fill="#FFFFFF" opacity="0.8" />
                            <path d="M25 45 Q35 40 45 45" stroke="#93C5FD" strokeWidth="2" fill="none" opacity="0.6" />
                            <path d="M55 45 Q65 40 75 45" stroke="#93C5FD" strokeWidth="2" fill="none" opacity="0.6" />
                          </svg>
                        )}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white">
                        {value.title}
                      </h3>
                      <p className="text-sm text-white/60 whitespace-pre-line">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="py-16 md:py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
                우리 팀
              </h2>
              <p className="mb-12 text-lg text-white/70">
                각 분야의 전문가들이 함께 만들어가는 LEANUP
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl bg-[#1a1a1a] border border-white/[0.1] p-8 transition-all hover:bg-[#222222] hover:border-white/[0.2] hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mb-6 text-6xl">
                    {member.emoji}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>


        {/* CTA Section */}
        <motion.section
          className="py-20 md:py-24 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container text-center relative z-10">
            <motion.h2
              className="mb-4 text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              함께 성장할 준비가 되셨나요?
            </motion.h2>
            <motion.p
              className="mb-8 text-lg text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              LEANUP과 함께 비즈니스의 다음 단계로 나아가세요
            </motion.p>
            <motion.button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              견적 문의
            </motion.button>
          </div>
        </motion.section>
      </div>

      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </PageWrapper>
  );
}