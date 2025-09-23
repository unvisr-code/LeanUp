"use client";

import { useState } from "react";
import { X, Send, Phone, Mail, Building, Calendar, DollarSign, FileText } from "lucide-react";
import { ModalPortal } from "./modal-portal";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: API 호출 구현

    // 성공 메시지
    alert("견적 요청이 성공적으로 접수되었습니다. 24시간 이내에 연락드리겠습니다.");

    // 폼 초기화
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
    });

    // 모달 닫기
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      {/* 백드롭 - z-[9998]로 설정 */}
      <div
        className="fixed inset-0 z-[9998] bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 모달 컨테이너 - z-[9999]로 설정 */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">프로젝트 견적 요청</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-white hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-blue-100">
              프로젝트 정보를 입력해주시면 맞춤형 견적을 보내드립니다
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* 기본 정보 섹션 */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">연락처 정보</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      이름 *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="홍길동"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      이메일 *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      전화번호
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="010-1234-5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      회사명
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="회사명"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 프로젝트 정보 섹션 */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">프로젝트 정보</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                      프로젝트 유형 *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">선택하세요</option>
                      <option value="website">웹사이트 개발</option>
                      <option value="landing">랜딩페이지</option>
                      <option value="ecommerce">쇼핑몰</option>
                      <option value="platform">플랫폼 구축</option>
                      <option value="maintenance">유지보수</option>
                      <option value="other">기타</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      예산 범위
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">선택하세요</option>
                      <option value="under-100">100만원 미만</option>
                      <option value="100-300">100-300만원</option>
                      <option value="300-500">300-500만원</option>
                      <option value="500-1000">500-1000만원</option>
                      <option value="over-1000">1000만원 이상</option>
                      <option value="discuss">협의 필요</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                      희망 일정
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">선택하세요</option>
                      <option value="asap">최대한 빨리</option>
                      <option value="1week">1주일 이내</option>
                      <option value="2weeks">2주일 이내</option>
                      <option value="1month">1개월 이내</option>
                      <option value="2months">2개월 이내</option>
                      <option value="3months">3개월 이내</option>
                      <option value="discuss">협의 필요</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 상세 설명 */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  프로젝트 상세 설명
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                  placeholder="프로젝트의 목적, 타겟 고객, 필요한 기능 등을 자세히 설명해주세요."
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 font-medium text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  견적 요청하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </ModalPortal>
  );
}