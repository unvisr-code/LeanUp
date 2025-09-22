"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Users, Zap, Target, Heart, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const teamMembers = [
  { name: "개발자", role: "Frontend/Backend 개발", description: "최신 기술 스택으로 빠르고 안정적인 웹사이트 구축" },
  { name: "디자이너", role: "UI/UX 디자인", description: "사용자 중심의 직관적이고 아름다운 디자인" },
  { name: "PM", role: "프로젝트 관리", description: "체계적인 프로세스로 일정과 품질 관리" },
  { name: "데이터분석가", role: "데이터 분석", description: "GA4, GTM 설정 및 데이터 기반 인사이트 제공" },
  { name: "세일즈 매니저", role: "고객 상담", description: "맞춤형 솔루션 제안 및 지속적인 고객 지원" },
  { name: "AI전문가", role: "AI 솔루션", description: "AI 기술을 활용한 혁신적인 웹 서비스 개발" },
];

const values = [
  {
    icon: Zap,
    title: "속도",
    description: "빠른 납기와 신속한 대응으로 비즈니스 성장을 가속화합니다",
  },
  {
    icon: Target,
    title: "효율",
    description: "불필요한 과정을 제거하고 핵심에 집중하여 비용을 최적화합니다",
  },
  {
    icon: Heart,
    title: "고객 중심",
    description: "고객의 성공이 우리의 성공이라는 믿음으로 함께 성장합니다",
  },
  {
    icon: Users,
    title: "협업",
    description: "투명한 소통과 체계적인 협업으로 최고의 결과를 만듭니다",
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

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                LeanUp 소개
              </h1>
              <p className="text-lg text-gray-600">
                스타트업과 소규모 기업의 성장을 돕는
                <br />
                웹 개발 전문 팀입니다
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400"></div>
          
          {/* 3D Background Icons */}
          <Background3DElements />
          
          <div className="container relative z-20">
            <div className="max-w-5xl mx-auto text-center">
              {/* Main Content */}
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  웹사이트 제작부터 데이터 추적, 온보딩까지 한 번에
                </h2>
                
                <div className="max-w-4xl mx-auto">
                  <p className="text-xl md:text-2xl text-blue-100 leading-relaxed font-medium mb-6">
                    LeanUP은 합리적인 가격으로 전문적인 웹사이트를 제작하고, 
                    데이터 추적과 온보딩을 통해 기업 성장을 돕습니다.
                  </p>
                  
                  <p className="text-lg text-blue-200 leading-relaxed">
                    🚧 데이터 모듈과 실시간 현황 공유 서비스는 현재 개발 중입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
                핵심 가치
              </h2>
              <p className="mb-12 text-lg text-gray-600">
                우리가 추구하는 가치
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gradient-to-b from-white to-blue-50 py-16 md:py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
                우리 팀
              </h2>
              <p className="mb-12 text-lg text-gray-600">
                각 분야의 전문가들이 함께 만들어가는 LeanUp
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-primary">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 py-16 md:py-20">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              함께 성장할 준비가 되셨나요?
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              LeanUp과 함께 비즈니스의 다음 단계로 나아가세요
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-primary shadow-lg transition-all hover:bg-gray-50"
            >
              프로젝트 시작하기
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}