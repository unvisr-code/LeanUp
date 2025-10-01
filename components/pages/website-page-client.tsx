"use client";

import { useState } from "react";
import { DarkHeader } from "@/components/layout/dark-header";
import { Footer } from "@/components/layout/footer";
import { PageWrapper, PageHeader } from "@/components/layout/page-wrapper";
import { QuoteModal } from "@/components/quote-modal";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Zap, Code, Globe, Shield, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function WebsitePageClient() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  return (
    <PageWrapper>
      <DarkHeader />

      {/* Add padding to account for fixed header */}
      <div className="pt-24">
        <PageHeader
          title="웹사이트 개발"
          subtitle="템플릿과 AI를 활용한 빠르고 효율적인 웹사이트 개발"
        />

        {/* Key Features */}
        <section className="py-2 md:py-4">
          <div className="container">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "템플릿 + AI 활용",
                  description: "검증된 템플릿과 AI 기술을 활용하여 개발 속도와 품질을 동시에 확보",
                  color: "from-blue-600 to-cyan-600"
                },
                {
                  icon: TrendingUp,
                  title: "전환율 최적화",
                  description: "히어로, CTA, 폼, 이벤트 등 전환 중심의 설계로 비즈니스 성과 극대화",
                  color: "from-green-600 to-emerald-600"
                },
                {
                  icon: Clock,
                  title: "30분 온보딩",
                  description: "관리자 교육과 함께 직접 운영할 수 있도록 체계적인 온보딩 제공",
                  color: "from-blue-600 to-indigo-600"
                },
                {
                  icon: Shield,
                  title: "7일 하이퍼케어",
                  description: "런칭 후 7일간 집중 모니터링과 즉시 대응으로 안정적인 서비스 운영",
                  color: "from-orange-600 to-red-600"
                },
                {
                  icon: Globe,
                  title: "SEO 최적화",
                  description: "검색 엔진 최적화로 자연 유입 트래픽 증가 및 마케팅 효과 극대화",
                  color: "from-purple-600 to-pink-600"
                },
                {
                  icon: Code,
                  title: "최신 기술 스택",
                  description: "Next.js, TypeScript, tRPC 등 최신 기술로 확장성과 유지보수성 확보",
                  color: "from-indigo-600 to-blue-600"
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
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
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
                2주 MVP 완성 프로세스
              </h2>
              <p className="text-lg text-white/70">
                체계적인 MVP 접근법으로 빠르고 효율적으로 핵심 기능을 구현합니다
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-600/50 to-blue-600/20 z-0"></div>

                {/* Timeline Items */}
                <div className="space-y-8 relative z-10">
                  {[
                    {
                      step: "Step1",
                      title: "요구사항 분석 & 와이어프레임",
                      description: "핵심 기능 정의, 사용자 여정 설계, MVP 범위 결정 (2-3일)"
                    },
                    {
                      step: "Step2",
                      title: "MVP 핵심 기능 개발",
                      description: "필수 기능 중심 개발, 반응형 구조 구현, 기본 UI/UX 적용 (5-6일)"
                    },
                    {
                      step: "Step3",
                      title: "테스트 & 최적화",
                      description: "기능 테스트, 성능 최적화, SEO 기본 설정, 반응형 점검 (2-3일)"
                    },
                    {
                      step: "Step4",
                      title: "배포 & 런칭",
                      description: "서버 배포, 도메인 연결, SSL 설정, 최종 확인 (1일)"
                    },
                    {
                      step: "Step5",
                      title: "7일 하이퍼케어",
                      description: "런칭 후 집중 모니터링, 즉시 대응, 사용법 안내",
                      highlight: true
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {item.step}
                      </div>
                      <div className={`flex-1 ${item.highlight ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/30' : 'bg-white/[0.08] border-white/[0.15]'} backdrop-blur-xl border rounded-xl p-6`}>
                        <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                        <p className="text-white/70">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables */}
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
                제공 사항
              </h2>
              <p className="text-lg text-white/70">
                웹사이트 개발과 함께 제공되는 서비스
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* 개발 & 기술 파트 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg mb-4 text-white flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-400" />
                  개발 & 기술
                </h3>
                <ul className="space-y-3">
                  {[
                    "반응형 웹사이트 (모바일/태블릿/PC)",
                    "최신 기술 스택 (Next.js, TypeScript)",
                    "컴포넌트 기반 설계",
                    "성능 최적화 (이미지 압축, 코드 분할)",
                    "크로스 브라우저 호환성",
                    "접근성 (WCAG) 준수"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 마케팅 & SEO 파트 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg mb-4 text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  마케팅 & SEO
                </h3>
                <ul className="space-y-3">
                  {[
                    "기본 SEO 설정 (메타태그, 구조화 데이터)",
                    "Google Search Console 등록",
                    "사이트맵 생성 및 제출",
                    "Open Graph 메타태그 설정",
                    "페이지 속도 최적화",
                    "기본 전환 추적 설정"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 호스팅 & 보안 파트 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg mb-4 text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-400" />
                  호스팅 & 보안
                </h3>
                <ul className="space-y-3">
                  {[
                    "원하는 DB로 맞춤 배포",
                    "SSL 보안 인증서",
                    "CDN 최적화",
                    "자동 백업 시스템",
                    "보안 헤더 설정",
                    "도메인 연결 지원"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-1" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 지원 & 교육 파트 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg mb-4 text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-400" />
                  지원 & 교육
                </h3>
                <ul className="space-y-3">
                  {[
                    "30분 관리자 온보딩 교육",
                    "사용법 가이드 문서 제공",
                    "7일 하이퍼케어 (집중 지원)",
                    "콘텐츠 업데이트 방법 교육",
                    "기본 유지보수 가이드",
                    "문제 해결 24시간 대응"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-1" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
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
              2주 안에 웹사이트를 런칭하세요
            </motion.h2>
            <motion.p
              className="mb-8 text-xl text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              지금 문의하시면 무료 상담과 함께 맞춤 견적을 제공합니다
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                >
                  견적 문의
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            </div>
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