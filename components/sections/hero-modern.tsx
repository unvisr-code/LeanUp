"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x * 0.1);
      mouseY.set(y * 0.1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Aurora effect component
  const AuroraBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Mesh gradient layers */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-600 via-cyan-400 to-indigo-400 blur-3xl mix-blend-multiply" />
        </div>

        {/* Animated aurora waves */}
        <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
          <defs>
            <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8">
                <animate attributeName="stop-color" values="#818cf8;#c084fc;#f472b6;#818cf8" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.5">
                <animate attributeName="stop-color" values="#c084fc;#f472b6;#818cf8;#c084fc" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3">
                <animate attributeName="stop-color" values="#f472b6;#818cf8;#c084fc;#f472b6" dur="8s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          <motion.path
            d="M0,100 Q250,50 500,100 T1000,100 L1000,300 Q750,250 500,300 T0,300 Z"
            fill="url(#aurora1)"
            animate={{
              d: [
                "M0,100 Q250,50 500,100 T1000,100 L1000,300 Q750,250 500,300 T0,300 Z",
                "M0,150 Q250,100 500,150 T1000,150 L1000,250 Q750,200 500,250 T0,250 Z",
                "M0,100 Q250,50 500,100 T1000,100 L1000,300 Q750,250 500,300 T0,300 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    );
  };

  // Floating orbs with 3D effect
  const FloatingOrb = ({ delay = 0, size = 400, color = "blue" }: { delay?: number; size?: number; color?: string }) => {
    const colors = {
      blue: "from-blue-400/20 to-cyan-400/20",
      purple: "from-purple-400/20 to-pink-400/20",
      indigo: "from-indigo-400/20 to-purple-400/20",
    };

    return (
      <motion.div
        className={`absolute rounded-full bg-gradient-to-br ${colors[color as keyof typeof colors]} blur-3xl`}
        style={{
          width: size,
          height: size,
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  };

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center">
      {/* Advanced background effects */}
      <AuroraBackground />

      {/* Floating 3D orbs */}
      <div className="absolute inset-0">
        <FloatingOrb delay={0} size={400} color="blue" />
        <div className="absolute right-0 top-1/4">
          <FloatingOrb delay={2} size={300} color="purple" />
        </div>
        <div className="absolute left-1/4 bottom-0">
          <FloatingOrb delay={4} size={350} color="indigo" />
        </div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mx-auto max-w-5xl"
          style={{
            x: mouseXSpring,
            y: mouseYSpring,
          }}
        >
          {/* Premium badge with holographic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-70 group-hover:opacity-100 animate-pulse-ring" />
              <span className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  스타트업 전문 · 7일 완성 보장
                </span>
              </span>
            </div>
          </motion.div>

          {/* Main headline with advanced gradient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8 text-center"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block mb-4 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                합리적인 가격의
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
                  className="inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse-subtle"
                  repeat={Infinity}
                />
              )}
            </h1>
          </motion.div>

          {/* Subheadline with subtle animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-12 text-center text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            전문가 퀄리티 · 스타트업 속도 · 합리적 비용
            <br />
            <span className="text-gray-400">LEANUP과 함께 성장의 첫걸음을 시작하세요</span>
          </motion.p>

          {/* CTA buttons with liquid effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link href="/contact" className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
              <button className="relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-semibold text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2">
                무료 상담 신청
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href="/portfolio" className="group relative">
              <button className="relative px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-semibold text-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-white/20 flex items-center gap-2">
                포트폴리오 보기
                <span className="w-2 h-2 bg-white rounded-full group-hover:animate-pulse" />
              </button>
            </Link>
          </motion.div>

          {/* Bento grid feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {/* Card 1 - Large */}
            <motion.div
              whileHover={{ scale: 1.02, rotateX: 5, rotateY: -5 }}
              className="md:col-span-2 group relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-4xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">초고속 제작</h3>
                <p className="text-gray-300">7-10일 내 완성되는 프리미엄 웹사이트. 빠르지만 퀄리티는 타협하지 않습니다.</p>
              </div>
            </motion.div>

            {/* Card 2 - Small stack */}
            <div className="flex flex-col gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotateX: -5, rotateY: 5 }}
                className="group relative flex-1"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl h-full">
                  <span className="text-3xl mb-3 block">💰</span>
                  <h3 className="text-xl font-bold text-white mb-1">합리적 가격</h3>
                  <p className="text-sm text-gray-300">스타트업 맞춤형 가격</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
                className="group relative flex-1"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl h-full">
                  <span className="text-3xl mb-3 block">🎯</span>
                  <h3 className="text-xl font-bold text-white mb-1">원스톱 솔루션</h3>
                  <p className="text-sm text-gray-300">기획부터 런칭까지</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}