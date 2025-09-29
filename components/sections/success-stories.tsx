"use client";

import { useState } from "react";
import { Star, ArrowRight, ExternalLink, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { api } from "@/lib/trpc/provider";

interface SuccessStory {
  id: string;
  category: string;
  emoji: string;
  author: string;
  challenge: string;
  solution: string;
  result: string;
  testimonial: string;
  portfolio?: {
    name: string;
    thumbnail?: string;
    serviceLink?: string;
    tech?: string[];
  };
}

const successStories: SuccessStory[] = [
  {
    id: "startup-1",
    category: "스타트업",
    emoji: "🧑‍💼",
    author: "스타트업 대표",
    challenge: "제한된 예산으로 전문적인 웹사이트 필요",
    solution: "템플릿 기반 빠른 개발 + 맞춤 커스터마이징",
    result: "2주 만에 MVP 웹사이트 완성, 투자 유치 성공",
    testimonial: "처음엔 예산 때문에 전문 웹사이트는 엄두도 못 냈어요. LeanUp 덕분에 합리적인 가격에 전문가 수준의 웹사이트를 만들 수 있었죠.",
    portfolio: {
      name: "테크 스타트업 랜딩페이지",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    }
  },
  {
    id: "marketing-1",
    category: "마케팅",
    emoji: "👩‍💻",
    author: "마케팅 담당자",
    challenge: "브랜드 이미지와 성과 측정 동시 해결",
    solution: "디자인 시스템 구축 + GA4/GTM 완벽 세팅",
    result: "전환율 35% 향상, 데이터 기반 의사결정 가능",
    testimonial: "비용 절감이 1순위였는데, 저렴하다고 해서 퀄리티가 낮을까 걱정했어요. 막상 받아보니 브랜드 이미지까지 완벽했습니다.",
    portfolio: {
      name: "마케팅 에이전시 웹사이트",
      tech: ["React", "Framer Motion", "GA4"],
    }
  },
  {
    id: "commerce-1",
    category: "이커머스",
    emoji: "🛒",
    author: "쇼핑몰 운영자",
    challenge: "복잡한 온라인 쇼핑몰 구축",
    solution: "커머스 특화 템플릿 + 결제 시스템 통합",
    result: "2주 만에 완성, 첫 달 매출 200% 달성",
    testimonial: "온라인 쇼핑몰 구축이 복잡할 줄 알았는데, 2주 만에 완성되어서 놀랐습니다. 유지보수도 쉽게 할 수 있어서 좋아요.",
    portfolio: {
      name: "패션 이커머스 플랫폼",
      tech: ["Next.js", "Stripe", "Vercel"],
    }
  },
  {
    id: "education-1",
    category: "교육",
    emoji: "🎓",
    author: "학원 원장",
    challenge: "학원 홍보와 마케팅 효과 측정",
    solution: "교육 특화 디자인 + 완벽한 데이터 추적",
    result: "온라인 문의 300% 증가, ROI 측정 가능",
    testimonial: "학원 홈페이지를 만들면서 GA4 설정까지 해주셔서 마케팅 효과를 바로 확인할 수 있었어요. 정말 만족스럽습니다.",
    portfolio: {
      name: "어학원 통합 플랫폼",
      tech: ["React", "Node.js", "GA4", "GTM"],
    }
  },
];

const categories = ["전체", "스타트업", "마케팅", "이커머스", "교육"];

export function SuccessStoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const { data: portfolios } = api.portfolio.getAll.useQuery();

  const filteredStories = selectedCategory === "전체"
    ? successStories
    : successStories.filter(story => story.category === selectedCategory);

  return (
    <motion.section
      className="py-20 md:py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-purple-500/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* 통합 헤더 */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            고객 성공 스토리
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            실제 고객들의 도전 과제와 LeanUp의 솔루션, 그리고 놀라운 결과를 확인하세요
          </motion.p>
        </div>

        {/* 카테고리 필터 */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-white text-black shadow-lg shadow-white/20"
                  : "bg-white/[0.08] text-white/80 hover:bg-white/[0.15] border border-white/[0.15]"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-2xl p-6 md:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(96,165,250,0.2)] transition-all duration-500 hover:border-white/[0.25]">
                  {/* Story Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{story.emoji}</span>
                      <div>
                        <span className="text-xs font-semibold text-blue-400">
                          {story.category}
                        </span>
                        <p className="text-sm font-medium text-white">
                          {story.author}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Challenge → Solution → Result */}
                  <div className="space-y-4 mb-6">
                    <div className="relative pl-6">
                      <span className="absolute left-0 top-1 text-xs font-bold text-red-400">문제</span>
                      <p className="text-sm text-white/60 ml-6">{story.challenge}</p>
                    </div>
                    <div className="relative pl-6">
                      <span className="absolute left-0 top-1 text-xs font-bold text-blue-400">해결</span>
                      <p className="text-sm text-white/60 ml-6">{story.solution}</p>
                    </div>
                    <div className="relative pl-6">
                      <span className="absolute left-0 top-1 text-xs font-bold text-green-400">결과</span>
                      <p className="text-sm text-white/60 ml-6">{story.result}</p>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <blockquote className="text-sm text-white/80 italic mb-6 border-l-2 border-white/20 pl-4">
                    &ldquo;{story.testimonial}&rdquo;
                  </blockquote>

                  {/* Portfolio Preview */}
                  {story.portfolio && (
                    <div className="border-t border-white/10 pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/50 mb-1">완성된 프로젝트</p>
                          <p className="text-sm font-medium text-white">
                            {story.portfolio.name}
                          </p>
                          {story.portfolio.tech && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {story.portfolio.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-0.5 rounded-full bg-white/[0.08] text-white/60"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedStory(story)}
                          className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          자세히 보기
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Transition Bridge */}
        <motion.div
          className="text-center mt-16 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
            <p className="text-lg text-white/60">이런 결과물들을 만들어냈습니다</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30" />
          </div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-4"
          >
            <ChevronRight className="w-6 h-6 text-white/40 rotate-90 mx-auto" />
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/[0.15]">
            <h3 className="text-xl font-bold text-white">
              다음 성공 스토리의 주인공이 되어보세요
            </h3>
            <p className="text-sm text-white/70 max-w-md">
              2주 안에 전문적인 웹사이트를 만들고, 데이터 기반 성장을 시작하세요
            </p>
            <button className="group inline-flex items-center px-6 py-3 bg-white text-black rounded-full font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20">
              무료 상담 신청하기
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}