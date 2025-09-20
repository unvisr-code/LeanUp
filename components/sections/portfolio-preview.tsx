"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { api } from "@/lib/trpc/provider";

export function PortfolioPreview() {
  const { data: portfolios, isLoading } = api.portfolio.getAll.useQuery();

  // Show only first 6 items for preview
  const previewItems = portfolios?.slice(0, 6) || [];

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            포트폴리오
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            다양한 산업군의 성공적인 프로젝트들
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-lg bg-gray-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {previewItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {item.serviceType.map((type, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    {item.techStack.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>
                  {item.serviceLink && (
                    <a
                      href={item.serviceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      사이트 방문
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            전체 포트폴리오 보기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}