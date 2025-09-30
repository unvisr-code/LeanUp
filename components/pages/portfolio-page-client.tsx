"use client";

import { useState } from "react";
import Image from "next/image";
import { DarkHeader } from "@/components/layout/dark-header";
import { Footer } from "@/components/layout/footer";
import { PageWrapper, PageHeader } from "@/components/layout/page-wrapper";
import { QuoteModal } from "@/components/quote-modal";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Smartphone, Layout } from "lucide-react";
import { api } from "@/lib/trpc/provider";
import { cn } from "@/lib/utils";

const categoryTabs = [
  { value: "all", label: "전체", icon: Layout },
  { value: "web", label: "웹 플랫폼", icon: Globe },
  { value: "app", label: "앱", icon: Smartphone },
  { value: "landing", label: "랜딩페이지", icon: Layout },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "web" | "app" | "landing">("all");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const { data: portfolios, isLoading } = api.portfolio.getByCategory.useQuery({
    category: selectedCategory,
  });

  return (
    <PageWrapper>
      <DarkHeader />

      {/* Add padding to account for fixed header */}
      <div className="pt-24">
        <PageHeader
          title="포트폴리오"
          subtitle="다양한 산업군에서 성공적으로 완료한 프로젝트들을 확인하세요"
        />
        {/* Filter Tabs */}
        <motion.section
          className="backdrop-blur-xl bg-black/50 -mt-16"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="container">
            <div className="flex justify-center py-2">
              <div className="inline-flex rounded-lg bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] p-1">
                {categoryTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.value}
                      onClick={() => setSelectedCategory(tab.value as any)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                        selectedCategory === tab.value
                          ? "bg-white/[0.15] text-white shadow-sm border border-white/[0.25]"
                          : "text-white/60 hover:text-white hover:bg-white/[0.08]"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Portfolio Grid */}
        <section className="py-16 md:py-20">
          <div className="container">
            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="h-[500px] animate-pulse rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.15]"
                  />
                ))}
              </div>
            ) : portfolios && portfolios.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {portfolios.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] transition-all hover:bg-white/[0.12] hover:border-white/[0.25] hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
                  >
                    {/* Thumbnail with Overlay */}
                    <div className="aspect-[16/10] bg-gradient-to-br from-blue-600/20 to-purple-600/20 relative overflow-hidden">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={`${item.name} - ${item.description}`}
                          width={600}
                          height={375}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="mb-2 text-6xl font-bold text-white/30">
                              {item.name.charAt(0)}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay with Quick Info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-6 text-white w-full">
                          <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                          <p className="text-white/80 mb-3">{item.description}</p>
                          {item.serviceLink && (
                            <a
                              href={item.serviceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 text-sm font-medium bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
                            >
                              사이트 방문
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Service Type Tags */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {item.serviceType.map((type: string, i: number) => (
                          <span
                            key={i}
                            className="inline-block rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 px-3 py-1 text-xs font-medium text-blue-400"
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-2xl font-bold text-white">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="mb-4 text-white/80 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Work Scope */}
                      {item.workScope && item.workScope.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-white/60 mb-2">작업 범위</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.workScope.map((scope: string, i: number) => (
                              <span
                                key={i}
                                className="inline-block rounded-md bg-green-500/20 border border-green-500/30 px-2 py-1 text-xs font-medium text-green-400"
                              >
                                {scope}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white/60 mb-2">기술 스택</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.techStack.slice(0, 6).map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="inline-block rounded-md bg-white/[0.1] border border-white/[0.2] px-2 py-1 text-xs font-medium text-white/70"
                            >
                              {tech}
                            </span>
                          ))}
                          {item.techStack.length > 6 && (
                            <span className="inline-block rounded-md bg-white/[0.05] border border-white/[0.1] px-2 py-1 text-xs font-medium text-white/50">
                              +{item.techStack.length - 6}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/[0.1]">
                        <div className="text-sm text-white/50">
                          2024년 완성
                        </div>
                        {item.serviceLink && (
                          <a
                            href={item.serviceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.1] backdrop-blur-xl rounded-lg text-sm font-medium text-white hover:bg-white/[0.15] transition-all"
                          >
                            자세히 보기
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60">
                  선택한 카테고리에 해당하는 포트폴리오가 없습니다.
                </p>
              </div>
            )}
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
              프로젝트를 시작할 준비가 되셨나요?
            </motion.h2>
            <motion.p
              className="mb-8 text-lg text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              우리와 함께 성공적인 프로젝트를 만들어보세요
            </motion.p>
            <motion.button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              견적 문의
            </motion.button>
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