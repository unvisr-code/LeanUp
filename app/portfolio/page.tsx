"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PortfolioAutoScroll } from "@/components/sections/portfolio-auto-scroll";
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

  const { data: portfolios, isLoading } = api.portfolio.getByCategory.useQuery({
    category: selectedCategory,
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                포트폴리오
              </h1>
              <p className="text-lg text-gray-600">
                다양한 산업군에서 성공적으로 완료한 프로젝트들을 확인하세요
              </p>
            </div>
          </div>

          {/* Portfolio Auto Scroll Section */}
          <PortfolioAutoScroll />
        </section>

        {/* Filter Tabs */}
        <section className="sticky top-16 z-40 border-b bg-white">
          <div className="container">
            <div className="flex justify-center py-4">
              <div className="inline-flex rounded-lg bg-gray-100 p-1">
                {categoryTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.value}
                      onClick={() => setSelectedCategory(tab.value as any)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                        selectedCategory === tab.value
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
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
        </section>

        {/* Portfolio Grid */}
        <section className="py-16 md:py-20">
          <div className="container">
            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-96 animate-pulse rounded-lg bg-gray-200"
                  />
                ))}
              </div>
            ) : portfolios && portfolios.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {portfolios.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-xl"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-white/20">
                              {item.name.charAt(0)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="mb-3 flex flex-wrap gap-2">
                        {item.serviceType.map((type, i) => (
                          <span
                            key={i}
                            className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="mb-4 text-gray-600">
                        {item.description}
                      </p>

                      {/* Work Scope */}
                      {item.workScope && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {item.workScope.map((scope, i) => (
                            <span
                              key={i}
                              className="inline-block rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
                            >
                              {scope}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {item.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Link */}
                      {item.serviceLink && (
                        <a
                          href={item.serviceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          사이트 방문
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  선택한 카테고리에 해당하는 포트폴리오가 없습니다.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              프로젝트를 시작할 준비가 되셨나요?
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              우리와 함께 성공적인 프로젝트를 만들어보세요
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-primary/90"
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