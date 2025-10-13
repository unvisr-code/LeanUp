"use client";

import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Particle animation component
  const Particles = () => {
    const particles = Array.from({ length: 50 });
    return (
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((_, i) => {
          // Generate random values once per particle
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const targetX = Math.random() * 100;
          const targetY = Math.random() * 100;
          const duration = Math.random() * 20 + 10;

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                left: `${initialX}%`,
                top: `${initialY}%`,
              }}
              animate={{
                left: [`${initialX}%`, `${targetX}%`, `${initialX}%`],
                top: [`${initialY}%`, `${targetY}%`, `${initialY}%`],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 py-20 md:py-32">
      {/* Animated background elements */}
      {mounted && <Particles />}

      {/* Gradient orbs */}
      <motion.div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <Sparkle className="h-4 w-4" />
              <span className="text-sm font-medium">빠른 납기 · 합리적 가격</span>
            </span>
          </motion.div>

          {/* Main Headline with typing animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            <span className="block mb-2">합리적인 가격으로 만드는</span>
            {mounted && (
              <TypeAnimation
                sequence={[
                  "웹사이트 제작",
                  2000,
                  "데이터 추적 설정",
                  2000,
                  "온보딩 지원",
                  2000,
                  "웹사이트 제작 + 데이터 + 온보딩",
                  3000,
                ]}
                wrapper="span"
                speed={50}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200"
                repeat={Infinity}
              />
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 text-lg text-white/90 md:text-xl"
          >
            전문가 퀄리티, 스타트업 속도, 합리적인 비용<br />
            LEANUP에서 모두 경험하세요
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl hover:scale-105"
            >
              무료 상담 신청
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-white/20 hover:border-white/50 hover:shadow-lg hover:scale-105"
            >
              포트폴리오 보기
            </Link>
          </motion.div>

          {/* Feature Cards with enhanced animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {[
              { emoji: "🚀", title: "빠른 납기", desc: "7-10일 내 완성" },
              { emoji: "💰", title: "합리적 가격", desc: "스타트업 친화적" },
              { emoji: "🎯", title: "원스톱 솔루션", desc: "기획부터 런칭까지" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1 + index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="group rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all cursor-pointer"
              >
                <motion.div
                  className="text-4xl mb-3"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.emoji}
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/80">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}