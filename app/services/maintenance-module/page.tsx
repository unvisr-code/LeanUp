"use client";

import { DarkHeader } from "@/components/layout/dark-header";
import { Footer } from "@/components/layout/footer";
import { PageWrapper, PageHeader } from "@/components/layout/page-wrapper";
import { motion } from "framer-motion";
import { Wrench, MessageSquare, Zap, Clock, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function MaintenanceModulePage() {
  return (
    <PageWrapper>
      <DarkHeader />

      {/* Add padding to account for fixed header */}
      <div className="pt-24">
        <PageHeader
          title="유지보수 효율화 모듈"
          subtitle="Framer 기반 시각화된 피드백과 프롬프트로 간단한 수정. 커뮤니케이션 비용을 획기적으로 절감합니다."
        >
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 px-4 py-2 text-sm font-medium text-green-400"
            >
              <Clock className="h-4 w-4" />
              Coming Soon
            </motion.div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              >
                출시 알림 신청
              </Link>
            </motion.div>
          </div>
        </PageHeader>

        {/* Coming Soon Notice */}
        <motion.section
          className="py-8 bg-gradient-to-r from-green-600/10 to-teal-600/10 border-y border-green-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="container">
            <div className="flex items-center justify-center gap-3 text-green-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">곧 공개 예정입니다. 출시 알림을 신청하시면 가장 먼저 소식을 전해드립니다.</p>
            </div>
          </div>
        </motion.section>

        {/* Preview Features */}
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                주요 기능 (예정)
              </h2>
              <p className="text-lg text-white/70">
                유지보수를 더 쉽고 빠르게
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: "시각화된 피드백",
                  description: "Framer 기반으로 화면에서 직접 수정 사항을 표시하고 피드백",
                  color: "from-green-600 to-teal-600"
                },
                {
                  icon: Zap,
                  title: "프롬프트 수정",
                  description: "간단한 텍스트 입력만으로 웹사이트 콘텐츠 수정 가능",
                  color: "from-blue-600 to-cyan-600"
                },
                {
                  icon: Shield,
                  title: "검수 & 배포",
                  description: "수정 사항 검수 후 원클릭 배포와 자동 알림",
                  color: "from-purple-600 to-pink-600"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-xl p-6 hover:bg-white/[0.12] hover:border-white/[0.25] transition-all"
                  >
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-white/70">
                      {feature.description}
                    </p>
                    <div className="mt-4 inline-block px-3 py-1 bg-gradient-to-r from-green-600/20 to-teal-600/20 border border-green-500/30 text-green-400 rounded-full text-xs font-medium">
                      개발 중
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Preview */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="mb-12 text-3xl font-bold text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                기대 효과
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "커뮤니케이션 비용 80% 절감",
                    description: "이메일, 전화 대신 직관적인 인터페이스로 수정 요청"
                  },
                  {
                    title: "수정 시간 90% 단축",
                    description: "간단한 수정은 프롬프트 입력만으로 즉시 반영"
                  },
                  {
                    title: "24/7 수정 가능",
                    description: "업무 시간 외에도 언제든 수정 요청 가능"
                  },
                  {
                    title: "투명한 진행 상황",
                    description: "수정 요청부터 배포까지 실시간으로 확인"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                      <p className="text-white/70">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
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
              유지보수의 새로운 패러다임
            </motion.h2>
            <motion.p
              className="mb-8 text-xl text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              출시 알림을 신청하고 얼리버드 혜택을 받으세요
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              >
                출시 알림 신청하기
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </PageWrapper>
  );
}