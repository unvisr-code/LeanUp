"use client";

import { useState } from "react";
import { DarkHeader } from "@/components/layout/dark-header";
import { Footer } from "@/components/layout/footer";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { motion } from "framer-motion";
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

function FAQItemComponent({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] hover:bg-white/[0.12] hover:border-white/[0.25] transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg shadow-lg">
            {item.icon ? (
              <span className="text-white">{item.icon}</span>
            ) : (
              <HelpCircle className="h-5 w-5 text-white" />
            )}
          </div>
          <span className="font-medium text-white group-hover:text-blue-300 transition-colors">
            {item.question}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-white/60 group-hover:text-blue-300 transition-colors" />
        ) : (
          <ChevronDown className="h-5 w-5 text-white/60 group-hover:text-blue-300 transition-colors" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-white/70 leading-relaxed pl-11">
            {item.answer}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function ContactPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const filteredFAQ = selectedCategory === "전체"
    ? faqItems
    : faqItems.filter(item => item.category === selectedCategory);

  return (
    <PageWrapper>
      <DarkHeader />

      {/* Add padding to account for fixed header */}
      <div className="pt-24">
        {/* Hero Section */}
        <motion.section
          className="relative overflow-hidden py-20 md:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container relative">
            <motion.div
              className="mx-auto max-w-4xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight text-white">
                무엇을 도와드릴까요?
              </h1>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                프로젝트에 대한 궁금증을 해결해드립니다
              </p>
              <motion.button
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                견적 받기
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </motion.section>


        {/* Why LeanUp */}
        <motion.section
          className="py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-2xl font-bold text-white mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                왜 LeanUp인가요?
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Zap, title: "빠른 개발", desc: "7-10일 내 웹사이트 완성" },
                  { icon: Shield, title: "안정적 유지보수", desc: "6개월 무상 유지보수 제공" },
                  { icon: Users, title: "전담 PM 배정", desc: "원활한 소통과 프로젝트 관리" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mx-auto mb-4 shadow-lg">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <motion.h2
                className="mb-12 text-center text-3xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                자주 묻는 질문
              </motion.h2>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-white text-black shadow-lg"
                        : "bg-white/[0.08] text-white/80 border border-white/[0.15] hover:bg-white/[0.12] hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <FAQItemComponent key={index} item={item} index={index} />
                ))}
              </div>

              {/* CTA */}
              <div className="mt-16 text-center">
                <p className="text-white/60 mb-6">
                  원하는 답변을 찾지 못하셨나요?
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      if (window.ChannelIO) {
                        window.ChannelIO('show');
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-all shadow-lg"
                  >
                    채널톡 문의하기
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <Footer />
    </PageWrapper>
  );
}