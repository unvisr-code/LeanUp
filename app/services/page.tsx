"use client";

import { DarkHeader } from "@/components/layout/dark-header";
import { Footer } from "@/components/layout/footer";
import { PageWrapper, PageHeader } from "@/components/layout/page-wrapper";
import { motion } from "framer-motion";
import {
  Globe,
  BarChart3,
  Wrench,
  Bell,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Users,
  TrendingUp
} from "lucide-react";

const services = [
  {
    id: "website",
    title: "웹사이트 제작",
    subtitle: "빠르고 효율적인 웹사이트 구축",
    description: "템플릿과 AI를 활용한 속도/비용 최적화로 전환 중심의 웹사이트를 제작합니다.",
    icon: Globe,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "7-10일 빠른 납기",
      "반응형 디자인 (모바일/태블릿/PC)",
      "SEO 최적화",
      "전환 중심 설계 (CTA, 폼, 이벤트)",
      "관리자 온보딩 30분",
      "런칭 후 7일 하이퍼케어",
    ],
    process: [
      { step: "1", title: "자료 수령", description: "브랜드 자료 및 콘텐츠 수집" },
      { step: "2", title: "골격 배치", description: "와이어프레임 및 레이아웃 구성" },
      { step: "3", title: "카피/이미지", description: "콘텐츠 배치 및 디자인 적용" },
      { step: "4", title: "추적/SEO", description: "데이터 추적 코드 및 SEO 설정" },
      { step: "5", title: "QA/런칭", description: "품질 검증 및 실제 배포" },
    ],
  },
  {
    id: "data",
    title: "데이터 모듈",
    subtitle: "데이터 기반 의사결정 지원",
    description: "GA4, GTM, UTM, MS Clarity 기본 세팅과 퍼널 대시보드를 제공합니다.",
    icon: BarChart3,
    gradient: "from-purple-600 to-pink-600",
    badge: "기본 포함",
    features: [
      "GA4/GTM 기본 설치 및 설정",
      "주요 이벤트 추적 설정",
      "UTM 파라미터 설정",
      "MS Clarity 히트맵 설정",
      "퍼널 대시보드 템플릿 제공",
      "BigQuery/Looker Studio 연계 (옵션)",
    ],
    benefits: [
      { icon: TrendingUp, text: "사용자 행동 분석" },
      { icon: Users, text: "전환율 최적화" },
      { icon: Zap, text: "실시간 데이터 수집" },
    ],
  },
  {
    id: "maintenance",
    title: "유지보수 효율화 모듈",
    subtitle: "간편한 유지보수 시스템",
    description: "Framer 기반의 시각화된 피드백과 프롬프트 입력으로 간단한 수정이 가능합니다.",
    icon: Wrench,
    gradient: "from-green-600 to-emerald-600",
    badge: "곧 공개",
    features: [
      "Framer 기반 시각화 피드백",
      "프롬프트 입력으로 간단 수정",
      "텍스트 인라인 수정",
      "검수 → 배포 알림 시스템",
      "커뮤니케이션 비용 절감",
      "24시간 내 처리",
    ],
    benefits: [
      { icon: Clock, text: "빠른 수정 반영" },
      { icon: Shield, text: "안전한 배포" },
      { icon: Users, text: "효율적인 협업" },
    ],
  },
  {
    id: "status",
    title: "실시간 개발 현황 공유",
    subtitle: "투명한 프로젝트 진행",
    description: "단계 전환 시 자동 알림과 진행 현황을 실시간으로 공유합니다.",
    icon: Bell,
    gradient: "from-orange-600 to-red-600",
    badge: "곧 공개",
    features: [
      "단계별 자동 알림 (이메일/브라우저)",
      "실시간 진행 현황 대시보드",
      "작업 완료 현황 공유",
      "OAuth 인증 시스템",
      "관리받는 느낌 제공",
      "불필요한 회의 감소",
    ],
    benefits: [
      { icon: Bell, text: "실시간 알림" },
      { icon: CheckCircle, text: "투명한 진행" },
      { icon: Clock, text: "시간 절약" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <PageWrapper>
      <DarkHeader />

      {/* Add padding to account for fixed header */}
      <div className="pt-24">
        <PageHeader
          title="서비스 소개"
          subtitle="웹사이트 제작부터 데이터 추적, 유지보수까지 비즈니스 성장을 위한 완벽한 솔루션"
        />

        {/* Services Grid */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="space-y-24">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                        {/* Service Header */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg shadow-white/10`}>
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                          {service.badge && (
                            <span className="inline-flex items-center rounded-full bg-green-500/20 border border-green-500/30 px-3 py-1 text-xs font-medium text-green-400">
                              {service.badge}
                            </span>
                          )}
                        </div>

                        <h2 className="mb-2 text-3xl font-bold text-white">
                          {service.title}
                        </h2>
                        <p className="mb-4 text-lg font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          {service.subtitle}
                        </p>
                        <p className="mb-8 text-white/70">
                          {service.description}
                        </p>

                        {/* Features List */}
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start group">
                              <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" />
                              <span className="text-white/80 group-hover:text-white transition-colors">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                        {/* Process Steps or Benefits */}
                        {service.process ? (
                          <div className="space-y-4">
                            <h3 className="mb-6 text-xl font-semibold text-white">
                              프로세스
                            </h3>
                            <div className="space-y-4">
                              {service.process.map((item, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: i * 0.1 }}
                                  className="flex gap-4 group"
                                >
                                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${service.gradient} text-white font-semibold shadow-lg group-hover:shadow-xl transition-shadow`}>
                                    {item.step}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-white mb-1">
                                      {item.title}
                                    </h4>
                                    <p className="text-sm text-white/60">
                                      {item.description}
                                    </p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ) : service.benefits ? (
                          <div className="space-y-4">
                            <h3 className="mb-6 text-xl font-semibold text-white">
                              주요 이점
                            </h3>
                            <div className="grid gap-4">
                              {service.benefits.map((benefit, i) => {
                                const BenefitIcon = benefit.icon;
                                return (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="flex items-center gap-4 rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-5 hover:bg-white/[0.12] hover:border-white/[0.25] transition-all"
                                  >
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${service.gradient} shadow-lg`}>
                                      <BenefitIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="font-medium text-white">
                                      {benefit.text}
                                    </span>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

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
              지금 바로 시작하세요
            </motion.h2>
            <motion.p
              className="mb-8 text-lg text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              전문가와 상담하고 맞춤형 견적을 받아보세요
            </motion.p>
            <motion.a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              무료 견적 받기
            </motion.a>
          </div>
        </motion.section>
      </div>

      <Footer />
    </PageWrapper>
  );
}