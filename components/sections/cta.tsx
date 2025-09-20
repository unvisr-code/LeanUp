import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-primary py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            빠른 납기와 합리적인 가격으로 웹사이트를 제작하고
            <br />
            데이터 기반 의사결정을 시작하세요
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-primary shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
            >
              무료 견적 받기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://channel.io/leanup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 text-base font-medium text-white transition-all hover:bg-white hover:text-primary"
            >
              채널톡 상담
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}