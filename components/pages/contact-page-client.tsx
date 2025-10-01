"use client";

import { useState } from "react";
import { DarkHeader } from "@/components/layout/dark-header";
import { Footer } from "@/components/layout/footer";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { motion } from "framer-motion";
import { QuoteModal } from "@/components/quote-modal";
import { faqItems as baseFaqItems } from "@/lib/faq-data";
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

// Icon 매핑을 위한 map 생성
const categoryIcons: Record<string, React.ReactNode> = {
  "가격 및 비용": <DollarSign className="h-5 w-5" />,
  "프로젝트 진행": <Calendar className="h-5 w-5" />,
  "기술 및 서비스": <Code className="h-5 w-5" />,
  "유지보수 및 지원": <Headphones className="h-5 w-5" />,
  "기타": <FileText className="h-5 w-5" />,
};

// FAQ 항목에 아이콘 추가
const faqItems: FAQItem[] = baseFaqItems.map(item => ({
  ...item,
  icon: categoryIcons[item.category]
}));

const categories = ["전체", "가격 및 비용", "프로젝트 진행", "기술 및 서비스", "유지보수 및 지원", "기타"];

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

export default function ContactPageClient() {
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
                  { icon: Zap, title: "빠른 개발", desc: "1주일 내외에 웹사이트 MVP 완성" },
                  { icon: Shield, title: "안정적 유지보수", desc: "7일 하이퍼케어 제공" },
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