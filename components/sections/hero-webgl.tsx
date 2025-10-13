"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with WebGL
const Iridescence = dynamic(() => import("@/components/effects/Iridescence"), {
  ssr: false,
});

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* WebGL Iridescence Background - darker */}
      {mounted && <Iridescence color={[0.6, 0.6, 0.7]} speed={0.7} amplitude={0.06} />}

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10">
        {/* Navigation - Hidden as it's handled by the main Header component */}

        {/* Main Content */}
        <div className="container flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-5xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                LEANUP Agency
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Radiant iridescence with
              <br />
              {mounted && (
                <TypeAnimation
                  sequence={[
                    "웹사이트 제작",
                    2000,
                    "데이터 추적 설정",
                    2000,
                    "온보딩 지원",
                    2000,
                    "customizable colors",
                    3000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent"
                  repeat={Infinity}
                />
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              전문가 퀄리티 · 스타트업 속도 · 합리적 비용
              <br />
              2주내 MVP 완성 보장
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-base transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-semibold text-base transition-all hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
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
      </div>
    </section>
  );
}