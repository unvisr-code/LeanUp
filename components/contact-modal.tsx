"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ModalPortal } from "./modal-portal";
import { useToast } from "@/components/ui/toast";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    budget: "",
    timeline: "",
    projectType: "",
    description: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
      // 애니메이션을 위한 약간의 지연
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // 모달이 닫힐 때 body 스크롤 복원
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: API 연동
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const result = await response.json();

      // Form submitted successfully
      showToast("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다!", "success");

      // Reset form
      setFormData({
        company: "",
        name: "",
        email: "",
        phone: "",
        budget: "",
        timeline: "",
        projectType: "",
        description: "",
      });

      onClose();
    } catch (error) {
      showToast("문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ModalPortal>
      {/* Backdrop with blur - z-[9998]로 최상위 레이어 설정 */}
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-[9998] transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal Container - z-[9999]로 최상위 배치 */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 transform transition-all duration-300 ${
              isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - 개선된 디자인 */}
            <div className="bg-white border-b border-gray-200 px-6 py-5 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">견적 문의</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    프로젝트 정보를 입력해주시면 빠르게 견적을 안내해드립니다
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                  aria-label="닫기"
                >
                  <X className="h-6 w-6 text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>
            </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  회사명
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="회사명을 입력해주세요"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  담당자명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="담당자명을 입력해주세요"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="example@company.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="010-0000-0000"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  예상 예산
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">선택해주세요</option>
                  <option value="under-500">500만원 미만</option>
                  <option value="500-1000">500-1,000만원</option>
                  <option value="1000-2000">1,000-2,000만원</option>
                  <option value="2000-3000">2,000-3,000만원</option>
                  <option value="over-3000">3,000만원 이상</option>
                  <option value="discuss">협의</option>
                </select>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  희망 일정
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">선택해주세요</option>
                  <option value="asap">가능한 빨리</option>
                  <option value="1week">1주 이내</option>
                  <option value="2weeks">2주 이내</option>
                  <option value="1month">1개월 이내</option>
                  <option value="discuss">협의</option>
                </select>
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                프로젝트 유형 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "웹사이트 제작",
                  "쇼핑몰 제작",
                  "랜딩페이지",
                  "리뉴얼",
                  "유지보수",
                  "기타"
                ].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer transition-all ${
                      formData.projectType === type
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="projectType"
                      value={type}
                      checked={formData.projectType === type}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                프로젝트 설명
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="프로젝트에 대해 자세히 설명해주세요. (참고 사이트, 필요 기능, 특별 요구사항 등)"
              />
            </div>

            {/* Notice */}
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 문의 주신 내용은 영업일 기준 24시간 이내에 답변드립니다.
                <br />
                더 빠른 상담을 원하시면 채널톡을 이용해주세요.
              </p>
            </div>

            {/* Submit Buttons - 개선된 디자인 */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                견적 요청하기
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}