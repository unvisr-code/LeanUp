import { Zap, BarChart3, Wrench, Bell } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "빠른 납기 & 합리적인 가격",
    description:
      "템플릿과 AI를 활용하여 7-10일 내 웹사이트를 완성합니다. 불필요한 비용 없이 핵심 기능에 집중합니다.",
  },
  {
    icon: BarChart3,
    title: "데이터 모듈 (기본 포함)",
    description:
      "GA4, GTM, UTM, MS Clarity 기본 세팅과 퍼널 대시보드를 제공합니다. 데이터 기반 의사결정을 시작하세요.",
  },
  {
    icon: Wrench,
    title: "효율적인 유지보수",
    description:
      "Framer 기반의 시각화된 피드백과 프롬프트 입력으로 간단한 수정이 가능합니다. 커뮤니케이션 비용을 줄입니다.",
  },
  {
    icon: Bell,
    title: "실시간 개발 현황 공유",
    description:
      "단계 전환 시 자동 알림과 진행 현황을 실시간으로 공유합니다. 불필요한 회의 없이도 안심할 수 있습니다.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            LeanUp이 특별한 이유
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            웹사이트 제작부터 데이터 추적, 유지보수까지 원스톱 솔루션
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}