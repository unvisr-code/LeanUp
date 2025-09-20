"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { api } from "@/lib/trpc/provider";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  Loader2
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    timeline: "",
    requirements: "",
    referenceUrl: "",
    industry: "",
    includeDataModule: true,
    includeMaintenanceModule: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const createLead = api.lead.create.useMutation({
    onSuccess: () => {
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        budget: "",
        timeline: "",
        requirements: "",
        referenceUrl: "",
        industry: "",
        includeDataModule: true,
        includeMaintenanceModule: false,
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createLead.mutateAsync({
        ...formData,
        budget: formData.budget as any,
        timeline: formData.timeline as any,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                문의하기
              </h1>
              <p className="text-lg text-gray-600">
                프로젝트에 대해 상담하고 무료 견적을 받아보세요
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                      연락처
                    </h2>
                    <p className="mb-6 text-gray-600">
                      빠른 응답을 위해 채널톡을 이용해주세요
                    </p>
                  </div>

                  <div className="space-y-4">
                    <a
                      href="mailto:contact@leanup.kr"
                      className="flex items-center gap-3 rounded-lg border bg-white p-4 transition-all hover:shadow-md"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">이메일</p>
                        <p className="text-sm text-gray-600">contact@leanup.kr</p>
                      </div>
                    </a>

                    <a
                      href="https://channel.io/leanup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border bg-white p-4 transition-all hover:shadow-md"
                    >
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">채널톡</p>
                        <p className="text-sm text-gray-600">실시간 상담</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 rounded-lg border bg-white p-4">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">업무시간</p>
                        <p className="text-sm text-gray-600">평일 10:00 - 19:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-6">
                    <h3 className="mb-2 font-semibold text-gray-900">
                      빠른 응답 보장
                    </h3>
                    <p className="text-sm text-gray-600">
                      문의 주시면 24시간 내에 답변드립니다
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="rounded-xl bg-white p-8 shadow-lg">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    프로젝트 문의
                  </h2>

                  {submitSuccess && (
                    <div className="mb-6 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <p>문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다!</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                          이름 *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                          이메일 *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                          연락처
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
                          회사명
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="budget" className="mb-2 block text-sm font-medium text-gray-700">
                          예산 범위
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">선택해주세요</option>
                          <option value="under-500">500만원 미만</option>
                          <option value="500-1000">500-1,000만원</option>
                          <option value="1000-3000">1,000-3,000만원</option>
                          <option value="3000-5000">3,000-5,000만원</option>
                          <option value="over-5000">5,000만원 이상</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="timeline" className="mb-2 block text-sm font-medium text-gray-700">
                          희망 일정
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="">선택해주세요</option>
                          <option value="asap">ASAP</option>
                          <option value="1month">1개월 이내</option>
                          <option value="2month">2개월 이내</option>
                          <option value="3month">3개월 이내</option>
                          <option value="over-3month">3개월 이상</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="industry" className="mb-2 block text-sm font-medium text-gray-700">
                          업종
                        </label>
                        <input
                          type="text"
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          placeholder="예: 이커머스, 교육, 헬스케어 등"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="referenceUrl" className="mb-2 block text-sm font-medium text-gray-700">
                          참고 사이트 URL
                        </label>
                        <input
                          type="url"
                          id="referenceUrl"
                          name="referenceUrl"
                          value={formData.referenceUrl}
                          onChange={handleChange}
                          placeholder="https://example.com"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="requirements" className="mb-2 block text-sm font-medium text-gray-700">
                          프로젝트 설명
                        </label>
                        <textarea
                          id="requirements"
                          name="requirements"
                          rows={4}
                          value={formData.requirements}
                          onChange={handleChange}
                          placeholder="프로젝트에 대해 자세히 설명해주세요"
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-3">
                        <p className="text-sm font-medium text-gray-700">추가 모듈 선택</p>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="includeDataModule"
                            checked={formData.includeDataModule}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">
                            데이터 모듈 포함 (GA4, GTM, MS Clarity)
                          </span>
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="includeMaintenanceModule"
                            checked={formData.includeMaintenanceModule}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-gray-700">
                            유지보수 모듈 포함
                          </span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-primary px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          제출 중...
                        </span>
                      ) : (
                        "문의하기"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}