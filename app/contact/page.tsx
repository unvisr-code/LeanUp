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
  Loader2,
  MapPin,
  Zap,
  Shield,
  Users,
  Sparkles,
  ArrowRight,
  Calendar,
  DollarSign,
  Building2,
  Globe
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
      <main className="bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-pink-400/20 to-purple-400/20 blur-3xl" />

          <div className="container relative">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                <Sparkles className="h-4 w-4" />
                24시간 내 답변 보장
              </div>
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                프로젝트를 시작하세요
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                아이디어를 현실로 만드는 첫 걸음,<br />
                LeanUp과 함께 시작하세요
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="border-y bg-white py-12">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-gray-900">500+</div>
                <p className="text-sm text-gray-600">완료된 프로젝트</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-gray-900">24h</div>
                <p className="text-sm text-gray-600">평균 응답시간</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-gray-900">98%</div>
                <p className="text-sm text-gray-600">고객 만족도</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-gray-900">10+</div>
                <p className="text-sm text-gray-600">년간 경력</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Cards */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Quick Contact Methods */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      빠른 연락 방법
                    </h2>

                    <a
                      href="https://channel.io/leanup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-5 text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">채널톡 상담</p>
                        <p className="text-sm text-white/90">실시간 1:1 상담</p>
                      </div>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>

                    <a
                      href="mailto:contact@leanup.kr"
                      className="group flex items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">이메일</p>
                        <p className="text-sm text-gray-600">contact@leanup.kr</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">업무시간</p>
                        <p className="text-sm text-gray-600">평일 10:00 - 19:00</p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Card */}
                  <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                      왜 LeanUp인가요?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">2-4주 내 MVP 완성</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">6개월 무상 유지보수</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">전담 PM 배정</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modern Contact Form */}
              <div className="lg:col-span-2">
                <div className="rounded-3xl bg-white p-8 md:p-10 shadow-xl">
                  <div className="mb-8">
                    <h2 className="mb-3 text-3xl font-bold text-gray-900">
                      프로젝트 문의하기
                    </h2>
                    <p className="text-gray-600">
                      간단한 정보만 입력하시면 빠르게 연락드리겠습니다
                    </p>
                  </div>

                  {submitSuccess && (
                    <div className="mb-6 flex items-center gap-3 rounded-2xl bg-green-50 p-4 text-green-800">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">문의가 접수되었습니다!</p>
                        <p className="text-sm">24시간 내에 연락드리겠습니다.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">1</span>
                        기본 정보
                      </h3>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                            이름 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
                            placeholder="홍길동"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                            이메일 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
                            placeholder="email@example.com"
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
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
                            placeholder="010-1234-5678"
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
                            onFocus={() => setFocusedField("company")}
                            onBlur={() => setFocusedField(null)}
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
                            placeholder="회사명 입력"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">2</span>
                        프로젝트 정보
                      </h3>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-gray-700">
                            <DollarSign className="inline h-4 w-4 mr-1" />
                            예산 범위
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
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
                            <Calendar className="inline h-4 w-4 mr-1" />
                            희망 일정
                          </label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
                          >
                            <option value="">선택해주세요</option>
                            <option value="asap">ASAP</option>
                            <option value="1month">1개월 이내</option>
                            <option value="2month">2개월 이내</option>
                            <option value="3month">3개월 이내</option>
                            <option value="over-3month">3개월 이상</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="industry" className="mb-2 block text-sm font-medium text-gray-700">
                            <Building2 className="inline h-4 w-4 mr-1" />
                            업종
                          </label>
                          <input
                            type="text"
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            placeholder="예: 이커머스, 교육, 헬스케어"
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
                          />
                        </div>

                        <div>
                          <label htmlFor="referenceUrl" className="mb-2 block text-sm font-medium text-gray-700">
                            <Globe className="inline h-4 w-4 mr-1" />
                            참고 사이트
                          </label>
                          <input
                            type="url"
                            id="referenceUrl"
                            name="referenceUrl"
                            value={formData.referenceUrl}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="requirements" className="mb-2 block text-sm font-medium text-gray-700">
                          프로젝트 설명
                        </label>
                        <textarea
                          id="requirements"
                          name="requirements"
                          rows={4}
                          value={formData.requirements}
                          onChange={handleChange}
                          placeholder="프로젝트에 대해 자유롭게 설명해주세요. 목적, 타겟 고객, 주요 기능 등을 포함하시면 더욱 정확한 견적을 받으실 수 있습니다."
                          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition-all focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 resize-none"
                        />
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">3</span>
                        추가 옵션
                      </h3>

                      <div className="space-y-3">
                        <label className="flex items-start gap-4 rounded-xl border-2 border-gray-200 p-4 cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50/50">
                          <input
                            type="checkbox"
                            name="includeDataModule"
                            checked={formData.includeDataModule}
                            onChange={handleChange}
                            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <p className="font-medium text-gray-900">데이터 분석 모듈</p>
                            <p className="text-sm text-gray-600">GA4, GTM, MS Clarity 연동 및 대시보드 구축</p>
                          </div>
                        </label>

                        <label className="flex items-start gap-4 rounded-xl border-2 border-gray-200 p-4 cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50/50">
                          <input
                            type="checkbox"
                            name="includeMaintenanceModule"
                            checked={formData.includeMaintenanceModule}
                            onChange={handleChange}
                            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <p className="font-medium text-gray-900">유지보수 패키지</p>
                            <p className="text-sm text-gray-600">월간 정기 점검 및 긴급 대응 서비스</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <div className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>제출 중...</span>
                          </>
                        ) : (
                          <>
                            <span>무료 견적 받기</span>
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </div>
                    </button>

                    <p className="text-center text-sm text-gray-500">
                      제출하시면 개인정보 처리방침에 동의하는 것으로 간주됩니다
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
                자주 묻는 질문
              </h2>

              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    견적은 무료인가요?
                  </h3>
                  <p className="text-gray-600">
                    네, 상담과 견적은 완전히 무료입니다. 부담 없이 문의해주세요.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    프로젝트 진행 기간은 얼마나 걸리나요?
                  </h3>
                  <p className="text-gray-600">
                    프로젝트 규모에 따라 다르지만, 일반적인 웹사이트는 2-4주, 복잡한 시스템은 2-3개월 정도 소요됩니다.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    유지보수는 어떻게 진행되나요?
                  </h3>
                  <p className="text-gray-600">
                    프로젝트 완료 후 6개월간 무상 유지보수를 제공하며, 이후 월간 유지보수 계약을 통해 지속적인 관리를 받으실 수 있습니다.
                  </p>
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