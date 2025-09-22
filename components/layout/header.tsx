"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceItems = [
  { label: "웹사이트 개발", href: "/services/website" },
  { label: "데이터 모듈 (개발중)", href: "/services/data-module" },
  { label: "유지보수 모듈 (공개예정)", href: "/services/maintenance-module" },
  { label: "실시간 현황 공유 (공개예정)", href: "/services/live-status" },
];

const navItems = [
  { label: "홈", href: "/" },
  {
    label: "서비스",
    href: "/services",
    dropdown: serviceItems
  },
  { label: "포트폴리오", href: "/portfolio" },
  { label: "팀 소개", href: "/about" },
  { label: "문의", href: "/contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/main.png"
            alt="LeanUp"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            item.dropdown ? (
              <div
                key={item.href}
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={cn(
                    "absolute top-full left-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden transition-all duration-200",
                    isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  )}
                >
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )
          ))}
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="ml-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            견적 문의
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="ml-auto inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden",
          isMobileMenuOpen ? "block" : "hidden"
        )}
      >
        <nav className="space-y-1 px-2 pb-3 pt-2">
          {navItems.map((item) => (
            item.dropdown ? (
              <div key={item.href}>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {item.label}
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    isServicesOpen ? "rotate-180" : ""
                  )} />
                </button>
                <div className={cn(
                  "pl-6 space-y-1",
                  isServicesOpen ? "block" : "hidden"
                )}>
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsQuoteModalOpen(true);
            }}
            className="block w-full rounded-md bg-primary px-3 py-2 text-center text-base font-medium text-primary-foreground hover:bg-primary/90"
          >
            견적 문의
          </button>
        </nav>
      </div>

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </header>
  );
}

// Quote Modal Component
function QuoteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 body 스크롤 복원
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const projectTypes = [
    '웹사이트 개발',
    '랜딩페이지',
    '쇼핑몰',
    '포트폴리오 사이트',
    '기업 사이트',
    '기타'
  ];

  const budgetRanges = [
    '100만원 미만',
    '100-300만원',
    '300-500만원',
    '500-1000만원',
    '1000만원 이상',
    '협의 후 결정'
  ];

  const timelines = [
    '1주일 이내',
    '2-4주',
    '1-2개월',
    '2-3개월',
    '3개월 이상',
    '협의 후 결정'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 폼 데이터를 처리 (API 호출 등)
    console.log('견적 요청:', formData);
    alert('견적 요청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    onClose();
    // 폼 초기화
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden z-[10000]">
      
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">프로젝트 문의하기</h2>
              <p className="text-blue-100 mt-2">간단한 정보만 입력하시면 빠르게 연락드리겠습니다</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto space-y-8">
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
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              <Send className="h-5 w-5" />
              무료 견적 받기
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 pt-2">
            제출하시면 개인정보 처리방침에 동의하는 것으로 간주됩니다
          </p>
        </form>
      </div>
    </div>
  );
}