import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                서비스 소개
              </h1>
              <p className="text-lg text-gray-600">
                웹사이트 제작부터 데이터 추적, 유지보수까지
                <br />
                비즈니스 성장을 위한 완벽한 솔루션을 제공합니다
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="space-y-24">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    id={service.id}
                    className={`${index % 2 === 1 ? "bg-gray-50" : ""} -mx-4 px-4 py-12 md:-mx-8 md:px-8 md:py-16 rounded-2xl`}
                  >
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          {service.badge && (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                              {service.badge}
                            </span>
                          )}
                        </div>
                        <h2 className="mb-2 text-3xl font-bold text-gray-900">
                          {service.title}
                        </h2>
                        <p className="mb-4 text-lg font-medium text-primary">
                          {service.subtitle}
                        </p>
                        <p className="mb-6 text-gray-600">
                          {service.description}
                        </p>

                        {/* Features List */}
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                        {/* Process Steps or Benefits */}
                        {service.process ? (
                          <div className="space-y-4">
                            <h3 className="mb-6 text-xl font-semibold text-gray-900">
                              프로세스
                            </h3>
                            {service.process.map((item, i) => (
                              <div key={i} className="flex gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white font-semibold">
                                  {item.step}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {item.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : service.benefits ? (
                          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                            <h3 className="col-span-full mb-4 text-xl font-semibold text-gray-900">
                              주요 이점
                            </h3>
                            {service.benefits.map((benefit, i) => {
                              const BenefitIcon = benefit.icon;
                              return (
                                <div
                                  key={i}
                                  className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm"
                                >
                                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <BenefitIcon className="h-5 w-5 text-primary" />
                                  </div>
                                  <span className="font-medium text-gray-900">
                                    {benefit.text}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              지금 바로 시작하세요
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              전문가와 상담하고 맞춤형 견적을 받아보세요
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-primary shadow-lg transition-all hover:bg-gray-50"
            >
              무료 견적 받기
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}