"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuoteModal } from "@/components/quote-modal";
import {
  Mail,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Users,
  DollarSign,
  Calendar,
  Code,
  Headphones,
  FileText,
  Globe,
  Building2
} from "lucide-react";

interface FAQItem {
  category: string;
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

const faqItems: FAQItem[] = [
  // 가격 및 비용
  {
    category: "가격 및 비용",
    question: "견적은 무료인가요?",
    answer: "네, 상담과 견적은 완전히 무료입니다. 프로젝트에 대한 상세한 견적을 받으신 후 진행 여부를 결정하실 수 있습니다.",
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    category: "가격 및 비용",
    question: "예산이 500만원 미만인데 가능한가요?",
    answer: "네, 가능합니다. LeanUp은 템플릿과 AI를 활용하여 비용을 최소화하면서도 품질 높은 웹사이트를 제작합니다. 예산에 맞는 최적의 솔루션을 제공해드립니다.",
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    category: "가격 및 비용",
    question: "추가 비용이 발생할 수 있나요?",
    answer: "처음 합의된 견적 외에 추가 비용은 발생하지 않습니다. 단, 프로젝트 진행 중 추가 기능이나 변경사항이 있을 경우 사전에 협의 후 진행됩니다.",
    icon: <DollarSign className="h-5 w-5" />
  },

  // 프로젝트 진행
  {
    category: "프로젝트 진행",
    question: "프로젝트 진행 기간은 얼마나 걸리나요?",
    answer: "일반적인 웹사이트는 7-10일, 복잡한 기능이 포함된 경우 2-4주 정도 소요됩니다. 프로젝트 규모에 따라 정확한 일정을 안내해드립니다.",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    category: "프로젝트 진행",
    question: "진행 과정을 확인할 수 있나요?",
    answer: "네, 프로젝트 진행 상황을 실시간으로 공유드립니다. 개발 중간 단계마다 테스트 링크를 제공하여 직접 확인하실 수 있습니다.",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    category: "프로젝트 진행",
    question: "수정 요청은 몇 번까지 가능한가요?",
    answer: "개발 기간 동안 합리적인 수준의 수정 요청은 횟수 제한 없이 반영해드립니다. 대규모 변경의 경우 별도 협의가 필요할 수 있습니다.",
    icon: <Calendar className="h-5 w-5" />
  },

  // 기술 및 기능
  {
    category: "기술 및 기능",
    question: "어떤 기술 스택을 사용하나요?",
    answer: "최신 웹 기술인 Next.js, React, TypeScript를 기본으로 사용합니다. 프로젝트 요구사항에 따라 최적의 기술 스택을 선택하여 개발합니다.",
    icon: <Code className="h-5 w-5" />
  },
  {
    category: "기술 및 기능",
    question: "모바일 반응형도 지원하나요?",
    answer: "네, 모든 웹사이트는 모바일, 태블릿, 데스크톱 등 다양한 기기에서 완벽하게 작동하는 반응형으로 제작됩니다.",
    icon: <Code className="h-5 w-5" />
  },
  {
    category: "기술 및 기능",
    question: "SEO 최적화도 포함되나요?",
    answer: "기본적인 SEO 최적화가 포함됩니다. 메타 태그 설정, 사이트맵 생성, 구조화된 데이터 마크업 등을 통해 검색엔진 최적화를 진행합니다.",
    icon: <Code className="h-5 w-5" />
  },
  {
    category: "기술 및 기능",
    question: "데이터 분석 툴 연동이 가능한가요?",
    answer: "네, GA4, GTM, MS Clarity 등 다양한 분석 툴 연동을 무료로 지원합니다. 사용자 행동 데이터를 수집하고 분석할 수 있도록 설정해드립니다.",
    icon: <Code className="h-5 w-5" />
  },

  // 유지보수 및 지원
  {
    category: "유지보수 및 지원",
    question: "유지보수는 어떻게 진행되나요?",
    answer: "프로젝트 완료 후 6개월간 무상 유지보수를 제공합니다. 이후 월간 유지보수 계약을 통해 지속적인 관리를 받으실 수 있습니다.",
    icon: <Headphones className="h-5 w-5" />
  },
  {
    category: "유지보수 및 지원",
    question: "긴급 이슈 대응이 가능한가요?",
    answer: "유지보수 계약 고객의 경우 24시간 내 긴급 대응을 보장합니다. 심각한 장애의 경우 즉시 대응하여 해결해드립니다.",
    icon: <Headphones className="h-5 w-5" />
  },
  {
    category: "유지보수 및 지원",
    question: "소스코드를 제공받을 수 있나요?",
    answer: "네, 프로젝트 완료 시 전체 소스코드와 관련 문서를 제공해드립니다. 원하실 경우 GitHub 저장소로도 전달 가능합니다.",
    icon: <Headphones className="h-5 w-5" />
  },

  // 기타
  {
    category: "기타",
    question: "스타트업인데 할인이 있나요?",
    answer: "스타트업과 소상공인을 위한 특별 패키지를 운영하고 있습니다. 상담 시 자세한 할인 혜택을 안내해드립니다.",
    icon: <Building2 className="h-5 w-5" />
  },
  {
    category: "기타",
    question: "해외 사이트도 제작 가능한가요?",
    answer: "네, 다국어 웹사이트 제작이 가능합니다. 영어, 중국어, 일본어 등 다양한 언어로 웹사이트를 제작할 수 있습니다.",
    icon: <Globe className="h-5 w-5" />
  },
  {
    category: "기타",
    question: "계약서 작성이 필요한가요?",
    answer: "네, 프로젝트 시작 전 표준 계약서를 작성합니다. 프로젝트 범위, 일정, 비용 등이 명시되어 양측의 권리를 보호합니다.",
    icon: <FileText className="h-5 w-5" />
  }
];

const categories = ["전체", "가격 및 비용", "프로젝트 진행", "기술 및 기능", "유지보수 및 지원", "기타"];

function FAQItemComponent({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg hover:border-blue-300 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-600 rounded-lg">
            {item.icon || <HelpCircle className="h-5 w-5" />}
          </div>
          <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {item.question}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 leading-relaxed pl-11">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const filteredFAQ = selectedCategory === "전체"
    ? faqItems
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/30" />
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/20 to-blue-300/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-300/20 to-blue-200/20 blur-3xl" />

          <div className="container relative">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                <Sparkles className="h-4 w-4" />
                24시간 내 답변 보장
              </div>
              <h1 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                무엇을 도와드릴까요?
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                프로젝트에 대한 궁금증을 해결해드립니다
              </p>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                무료 견적 받기
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Quick Contact Methods */}
        <section className="py-12 border-y bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="https://channel.io/leanup"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl bg-gradient-to-r from-blue-50 to-white p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">채널톡 상담</p>
                  <p className="text-sm text-gray-600">실시간 1:1 상담</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 ml-auto" />
              </a>

              <a
                href="mailto:contact@leanup.kr"
                className="group flex items-center gap-4 rounded-xl bg-gradient-to-r from-blue-50 to-white p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">이메일 문의</p>
                  <p className="text-sm text-gray-600">contact@leanup.kr</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-gray-50 to-white p-6 border border-gray-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">업무시간</p>
                  <p className="text-sm text-gray-600">평일 10:00 - 19:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why LeanUp */}
        <section className="py-12 bg-gradient-to-br from-blue-50 to-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">왜 LeanUp인가요?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-4">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">빠른 개발</h3>
                  <p className="text-sm text-gray-600">7-10일 내 웹사이트 완성</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">안정적 유지보수</h3>
                  <p className="text-sm text-gray-600">6개월 무상 유지보수 제공</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">전담 PM 배정</h3>
                  <p className="text-sm text-gray-600">원활한 소통과 프로젝트 관리</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
                자주 묻는 질문
              </h2>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <FAQItemComponent key={index} item={item} />
                ))}
              </div>

              {/* CTA */}
              <div className="mt-16 text-center">
                <p className="text-gray-600 mb-6">
                  원하는 답변을 찾지 못하셨나요?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    무료 상담 신청
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <a
                    href="https://channel.io/leanup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
                  >
                    채널톡 문의하기
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <Footer />
    </>
  );
}