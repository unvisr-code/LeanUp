"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Iridescent background */}
      <div className="absolute inset-0 iridescent-bg" />

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-blue-950/20" />

      {/* Iridescent shimmer overlay */}
      <div className="iridescent-overlay" />

      {/* Grid pattern for subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Simple badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              2주내 MVP 완성 · 합리적 가격
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="block text-white mb-3">
                합리적인 가격으로 만드는
              </span>
              {mounted && (
                <TypeAnimation
                  sequence={[
                    "웹사이트 제작",
                    2000,
                    "데이터 추적 설정",
                    2000,
                    "온보딩 지원",
                    2000,
                    "원스톱 솔루션",
                    3000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200"
                  repeat={Infinity}
                />
              )}
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-10 text-center text-lg text-white/90 max-w-2xl mx-auto"
          >
            전문가 퀄리티 · 스타트업 속도 · 합리적 비용
            <br />
            <span className="text-white/70">LeanUp과 함께 성장의 첫걸음을 시작하세요</span>
          </motion.p>

          {/* CTA buttons - simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-7 py-3.5 bg-white text-blue-600 rounded-xl font-semibold text-base transition-all hover:bg-blue-50 hover:shadow-lg hover:shadow-white/25 hover:-translate-y-0.5"
            >
              무료 상담 신청
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-medium text-base transition-all hover:bg-white/20 hover:border-white/30"
            >
              포트폴리오 보기
            </Link>
          </motion.div>

          {/* Simple feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {[
              {
                icon: "⚡",
                title: "빠른 납기",
                desc: "2주내 MVP 완성"
              },
              {
                icon: "💎",
                title: "합리적 가격",
                desc: "스타트업 맞춤형"
              },
              {
                icon: "🎯",
                title: "원스톱 솔루션",
                desc: "기획부터 런칭까지"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.9 + index * 0.1,
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:shadow-white/5"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/70">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-white/60"
          >
            <span className="flex items-center gap-2">
              <span className="text-white">✓</span> 10+ 프로젝트 완료
            </span>
            <span className="flex items-center gap-2">
              <span className="text-white">✓</span> 98% 고객 만족도
            </span>
            <span className="flex items-center gap-2">
              <span className="text-white">✓</span> 24시간 응답
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}