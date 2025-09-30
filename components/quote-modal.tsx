"use client";

import { useState, memo } from "react";
import {
  X, Send, Phone, Mail, Building, Calendar, DollarSign, FileText,
  Globe, Loader2, CheckCircle, User, Briefcase
} from "lucide-react";
import { ModalPortal } from "./modal-portal";
import { useToast } from "@/components/ui/toast";
import { api } from "@/lib/trpc/provider";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function QuoteModalComponent({ isOpen, onClose }: QuoteModalProps) {
  const { showToast } = useToast();

  type BudgetOption = "under-500" | "500-1000" | "1000-3000" | "3000-5000" | "over-5000" | "";
  type TimelineOption = "asap" | "1month" | "2month" | "3month" | "over-3month" | "";

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    company: string;
    budget: BudgetOption;
    timeline: TimelineOption;
    requirements: string;
    referenceUrl: string;
    industry: string;
    includeDataModule: boolean;
    includeMaintenanceModule: boolean;
    confirmed: boolean;
  }>({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    timeline: "",
    requirements: "",
    referenceUrl: "",
    industry: "",
    includeDataModule: false,
    includeMaintenanceModule: false,
    confirmed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const createLead = api.lead.create.useMutation({
    onSuccess: () => {
      showToast("견적 요청이 성공적으로 접수되었습니다. 24시간 이내에 연락드리겠습니다.", "success");
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
        includeDataModule: false,
        includeMaintenanceModule: false,
        confirmed: false,
      });
      setCurrentStep(1);
      // Reset confirmed state for next time
      setFormData(prev => ({ ...prev, confirmed: false }));
      onClose();
    },
    onError: () => {
      showToast("견적 요청 중 오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createLead.mutateAsync({
        ...formData,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStep1Valid = formData.name && formData.email;
  const isStep2Valid = formData.requirements;

  if (!isOpen) return null;

  return (
    <ModalPortal>
      {/* 백드롭 */}
      <div
        className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-xl transition-all duration-300"
        onClick={onClose}
      />

      {/* 모달 컨테이너 - 모바일 전체 화면 최적화 */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="relative w-full max-w-3xl transform overflow-hidden rounded-t-3xl sm:rounded-2xl bg-black/90 backdrop-blur-2xl border-0 sm:border border-white/[0.2] shadow-[0_20px_80px_rgba(0,0,0,0.8)] transition-all duration-300 min-h-[85vh] sm:min-h-0 max-h-[95vh] sm:max-h-[90vh]">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-white/[0.12] to-white/[0.08] backdrop-blur-xl px-4 sm:px-6 py-4 sm:py-6 border-b border-white/[0.15]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">무료 견적 받기</h2>
                  <p className="mt-1 text-sm sm:text-base text-white/70">
                    간단한 정보만 입력하시면 24시간 내에 맞춤 견적을 보내드립니다
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/[0.15] transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 단계 표시 */}
              <div className="mt-6 flex items-center gap-3">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 h-1.5 rounded-full transition-all ${
                      currentStep >= step ? "bg-white" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 폼 - 모바일 스크롤 개선 */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 text-white overflow-y-auto" style={{ maxHeight: 'calc(85vh - 180px)' }}>
              {/* Step 1: 기본 정보 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.15] text-sm font-bold text-white">1</span>
                      기본 정보
                    </h3>
                    <p className="mt-1 text-sm text-white/60">연락 가능한 정보를 입력해주세요</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/80">
                        <User className="inline h-4 w-4 mr-1" />
                        이름 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/[0.08] border border-white/[0.15] px-4 py-3 min-h-[48px] text-white placeholder-white/40 transition-all focus:bg-white/[0.12] focus:border-white/[0.25] focus:outline-none backdrop-blur-xl shadow-sm touch-manipulation"
                        placeholder="홍길동"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
                        <Mail className="inline h-4 w-4 mr-1" />
                        이메일 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/[0.08] border border-white/[0.15] px-4 py-3 min-h-[48px] text-white placeholder-white/40 transition-all focus:bg-white/[0.12] focus:border-white/[0.25] focus:outline-none backdrop-blur-xl shadow-sm touch-manipulation"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/80">
                        <Phone className="inline h-4 w-4 mr-1" />
                        연락처
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/[0.08] border border-white/[0.15] px-4 py-3 min-h-[48px] text-white placeholder-white/40 transition-all focus:bg-white/[0.12] focus:border-white/[0.25] focus:outline-none backdrop-blur-xl shadow-sm touch-manipulation"
                        placeholder="010-1234-5678"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="mb-2 block text-sm font-medium text-white/80">
                        <Building className="inline h-4 w-4 mr-1" />
                        회사명
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/[0.08] border border-white/[0.15] px-4 py-3 min-h-[48px] text-white placeholder-white/40 transition-all focus:bg-white/[0.12] focus:border-white/[0.25] focus:outline-none backdrop-blur-xl shadow-sm touch-manipulation"
                        placeholder="회사명 입력"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: 프로젝트 정보 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.15] text-sm font-bold text-white">2</span>
                      프로젝트 정보
                    </h3>
                    <p className="mt-1 text-sm text-white/60">프로젝트에 대해 알려주세요</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="budget" className="mb-2 block text-sm font-medium text-white/80">
                        <DollarSign className="inline h-4 w-4 mr-1" />
                        예산 범위
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/[0.08] border border-white/[0.15] px-4 py-3 text-white transition-all focus:bg-white/[0.12] focus:border-white/[0.25] focus:outline-none backdrop-blur-xl shadow-sm [&>option]:bg-gray-900 [&>option]:text-white"
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
                      <label htmlFor="timeline" className="mb-2 block text-sm font-medium text-white/80">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        희망 일정
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full rounded-lg bg-white/[0.08] border border-white/[0.15] px-4 py-3 text-white transition-all focus:bg-white/[0.12] focus:border-white/[0.25] focus:outline-none backdrop-blur-xl shadow-sm [&>option]:bg-gray-900 [&>option]:text-white"
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
                      <label htmlFor="industry" className="mb-2 block text-sm font-medium text-white/80">
                        <Briefcase className="inline h-4 w-4 mr-1" />
                        업종
                      </label>
                      <input
                        type="text"
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="예: 이커머스, 교육, 헬스케어"
                        className="w-full rounded-lg bg-white/[0.08] border border-white/[0.15] px-4 py-3 min-h-[48px] text-white placeholder-white/40 transition-all focus:bg-white/[0.12] focus:border-white/[0.25] focus:outline-none backdrop-blur-xl shadow-sm touch-manipulation"
                      />
                    </div>

                    <div>
                      <label htmlFor="referenceUrl" className="mb-2 block text-sm font-medium text-white/80">
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
                        className="w-full rounded-lg bg-white/[0.08] border border-white/[0.15] px-4 py-3 min-h-[48px] text-white placeholder-white/40 transition-all focus:bg-white/[0.12] focus:border-white/[0.25] focus:outline-none backdrop-blur-xl shadow-sm touch-manipulation"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="requirements" className="mb-2 block text-sm font-medium text-white/80">
                      <FileText className="inline h-4 w-4 mr-1" />
                      프로젝트 설명 <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={4}
                      required
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="프로젝트에 대해 자유롭게 설명해주세요. 목적, 타겟 고객, 주요 기능 등을 포함하시면 더욱 정확한 견적을 받으실 수 있습니다."
                      className="w-full rounded-lg bg-white/[0.08] border border-white/[0.15] px-4 py-3 text-white placeholder-white/40 transition-all focus:bg-white/[0.12] focus:border-white/[0.25] focus:outline-none backdrop-blur-xl resize-none shadow-sm"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: 입력 정보 요약 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.15] text-sm font-bold text-white">3</span>
                      입력 정보 확인
                    </h3>
                    <p className="mt-1 text-sm text-white/60">입력하신 정보를 확인해주세요</p>
                  </div>

                  {/* 요약 정보 */}
                  <div className="rounded-lg bg-white/[0.08] border border-white/[0.15] p-6 shadow-sm backdrop-blur-xl">
                    <h4 className="font-semibold text-white mb-3">입력 정보 요약</h4>
                    <div className="space-y-2 text-sm text-white/60">
                      <div className="flex justify-between">
                        <span>신청자:</span>
                        <span className="font-medium text-white">{formData.name || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>이메일:</span>
                        <span className="font-medium text-white">{formData.email || "-"}</span>
                      </div>
                      {formData.budget && (
                        <div className="flex justify-between">
                          <span>예산:</span>
                          <span className="font-medium text-white">
                            {formData.budget === "under-500" && "500만원 미만"}
                            {formData.budget === "500-1000" && "500-1,000만원"}
                            {formData.budget === "1000-3000" && "1,000-3,000만원"}
                            {formData.budget === "3000-5000" && "3,000-5,000만원"}
                            {formData.budget === "over-5000" && "5,000만원 이상"}
                          </span>
                        </div>
                      )}
                      {formData.timeline && (
                        <div className="flex justify-between">
                          <span>일정:</span>
                          <span className="font-medium text-white">
                            {formData.timeline === "asap" && "ASAP"}
                            {formData.timeline === "1month" && "1개월 이내"}
                            {formData.timeline === "2month" && "2개월 이내"}
                            {formData.timeline === "3month" && "3개월 이내"}
                            {formData.timeline === "over-3month" && "3개월 이상"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 확인 체크박스 */}
                  <div className={`mt-6 p-4 rounded-lg border transition-all duration-300 ${
                    !formData.confirmed
                      ? "bg-yellow-500/[0.05] border-yellow-500/[0.3] animate-pulse"
                      : "bg-green-500/[0.1] border-green-500/[0.3]"
                  }`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="confirmed"
                        checked={formData.confirmed}
                        onChange={handleChange}
                        className="mt-1 h-5 w-5 min-w-[20px] min-h-[20px] rounded border-2 border-white/30 bg-transparent text-white focus:ring-2 focus:ring-white/50 focus:ring-offset-0 focus:ring-offset-transparent checked:bg-white checked:border-white transition-all cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">
                          입력한 정보가 정확함을 확인합니다
                        </p>
                        <p className="text-xs text-white/60 mt-1">
                          위 정보를 바탕으로 맞춤 견적을 준비하여 24시간 이내에 연락드리겠습니다.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* 버튼 */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-4 py-2 min-h-[48px] text-sm font-medium text-white/70 transition-all touch-manipulation ${
                    currentStep === 1 ? "invisible" : "visible"
                  } hover:text-white active:scale-95`}
                >
                  ← 이전
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    취소
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        (currentStep === 1 && !isStep1Valid) ||
                        (currentStep === 2 && !isStep2Valid)
                      }
                      className="px-6 py-3 min-h-[48px] bg-gradient-to-r from-white/[0.2] to-white/[0.15] backdrop-blur-xl text-white rounded-lg font-medium border border-white/[0.25] hover:from-white/[0.25] hover:to-white/[0.2] hover:border-white/[0.3] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 touch-manipulation"
                    >
                      다음 →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !isStep1Valid || !isStep2Valid || !formData.confirmed}
                      className="flex items-center gap-2 px-6 py-3 min-h-[48px] bg-gradient-to-r from-white/[0.2] to-white/[0.15] backdrop-blur-xl text-white rounded-lg font-medium border border-white/[0.25] hover:from-white/[0.25] hover:to-white/[0.2] hover:border-white/[0.3] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 touch-manipulation"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          제출 중...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          견적 요청
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

export const QuoteModal = memo(QuoteModalComponent);