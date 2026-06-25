"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EMAIL = "contact@leanup.kr";

// 미세 grain — data URI SVG noise
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Maintenance() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.18,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <main
      className="relative grid min-h-[100dvh] w-full place-items-center overflow-hidden bg-[#0a0a0b] px-5 py-12 text-[#f4f2ec]"
      style={{ wordBreak: "keep-all" }}
    >
      {/* ambient accent glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[min(80vw,720px)] w-[min(80vw,720px)] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,92,43,0.16), rgba(255,92,43,0.04) 45%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={reduce ? {} : { opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* fine grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "180px" }}
      />

      <motion.section
        initial={reduce ? false : { opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[540px] overflow-hidden rounded-[6px] border-[1.5px] border-[rgba(244,242,236,0.2)] bg-[#111114] shadow-[0_50px_140px_-30px_rgba(0,0,0,0.85)]"
      >
        {/* top status bar */}
        <div className="flex items-center justify-between border-b border-[rgba(244,242,236,0.12)] px-6 py-4">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[rgba(244,242,236,0.4)]">
            leanup.kr
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[rgba(244,242,236,0.64)]">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#ff5c2b]"
              animate={reduce ? {} : { opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            재정비 중
          </span>
        </div>

        {/* body */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-7 px-7 py-11 sm:px-10 sm:py-14"
        >
          <motion.div variants={item}>
            <Image
              src="/leanup-wordmark.png"
              alt="LEANUP"
              width={196}
              height={63}
              priority
              className="h-auto w-[148px] sm:w-[176px]"
            />
          </motion.div>

          <motion.h1
            variants={item}
            className="text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.02em]"
          >
            홈페이지를 재정비하고 있습니다
          </motion.h1>

          <motion.p
            variants={item}
            className="text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-[rgba(244,242,236,0.64)]"
          >
            더 나은 모습으로 곧 다시 찾아뵙겠습니다.
            <br className="hidden sm:block" />
            그동안 프로젝트 문의는 이메일로 받고 있어요.
          </motion.p>

          <motion.div variants={item} className="pt-2">
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-3 rounded-full bg-[#ff5c2b] py-4 pl-7 pr-4 font-mono text-[0.85rem] uppercase tracking-[0.04em] text-[#0a0a0b] transition-colors duration-300 hover:bg-[#e8431a]"
            >
              이메일로 문의하기
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0a0a0b] text-[#ff5c2b] transition-transform duration-300 group-hover:rotate-45">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 11L11 3M11 3H4M11 3V10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* bottom bar */}
        <div className="flex items-center justify-between border-t border-[rgba(244,242,236,0.12)] px-6 py-4">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[rgba(244,242,236,0.4)]">
            © 2026 LEANUP
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="font-mono text-[0.72rem] tracking-[0.01em] text-[rgba(244,242,236,0.4)] transition-colors duration-300 hover:text-[#ff5c2b]"
          >
            {EMAIL}
          </a>
        </div>
      </motion.section>
    </main>
  );
}
