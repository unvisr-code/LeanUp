"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Lock, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { QuoteModal } from "@/components/quote-modal";
import { ModalPortal } from "@/components/modal-portal";

const serviceItems = [
  {
    label: "웹사이트 개발",
    href: "/services/website",
    status: "available"
  },
  {
    label: "데이터 모듈",
    href: "/services/data-module",
    status: "coming-soon",
    subtitle: "공개예정"
  },
  {
    label: "유지보수 모듈",
    href: "/services/maintenance-module",
    status: "coming-soon",
    subtitle: "공개예정"
  },
  {
    label: "실시간 현황 공유",
    href: "/services/live-status",
    status: "coming-soon",
    subtitle: "공개예정"
  },
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
  { label: "Q&A", href: "/contact" },
];

export function DarkHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  useEffect(() => {
    if (typeof document === "undefined") return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousTouchAction = body.style.touchAction;

    if (isMobileMenuOpen) {
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      body.style.overflow = "";
      body.style.touchAction = "";
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.touchAction = previousTouchAction;
    };
  }, [isMobileMenuOpen]);

  // 모바일 메뉴가 닫힐 때 서비스 드롭다운도 초기화
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileServicesOpen(false);
    }
  }, [isMobileMenuOpen]);

  const handleServiceClick = (item: typeof serviceItems[0], e: React.MouseEvent) => {
    if (item.status === "development" || item.status === "coming-soon") {
      e.preventDefault();
      setSelectedService(item.label);
      setIsNotificationModalOpen(true);
      setIsDesktopServicesOpen(false);
      setIsMobileServicesOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-[9999] flex justify-center p-2 sm:p-3"
    >
      <div className="w-full max-w-4xl px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/50 backdrop-blur-2xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-between gap-3 sm:gap-6 hover:bg-black/60 transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 text-white group hover:opacity-90 transition-opacity">
          <Logo size="sm" variant="light" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-3 lg:gap-4">
          {navItems.map((item) => (
            item.dropdown ? (
              <div
                key={item.href}
                className="relative group"
                onMouseEnter={() => setIsDesktopServicesOpen(true)}
                onMouseLeave={() => setIsDesktopServicesOpen(false)}
              >
                <button className={cn(
                  "flex items-center justify-center text-[13px] font-medium transition-all px-2.5 py-1 rounded-full",
                  pathname?.startsWith('/services')
                    ? "bg-white/[0.15] border border-white/[0.25] text-white"
                    : "text-white/80 hover:text-white hover:bg-white/[0.08]"
                )}>
                  {item.label}
                  <ChevronDown className={cn("ml-0.5 h-3 w-3 transition-transform", isDesktopServicesOpen && "rotate-180")} />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={cn(
                    "absolute top-full left-0 mt-1 w-56 rounded-lg bg-black/90 backdrop-blur-xl border border-white/[0.25] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200",
                    isDesktopServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  )}
                >
                  {item.dropdown.map((subItem) => (
                    subItem.status === "available" ? (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-3 text-sm text-white hover:bg-blue-500/20 transition-colors border-l-2 border-blue-400/50 bg-blue-500/10"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-blue-300">{subItem.label}</span>
                          <div className="w-2 h-2 bg-blue-400 rounded-full shadow-sm shadow-blue-400/50"></div>
                        </div>
                      </Link>
                    ) : (
                      <div
                        key={subItem.href}
                        onClick={(e) => handleServiceClick(subItem, e)}
                        className="block px-4 py-3 text-sm cursor-pointer hover:bg-gray-500/10 transition-colors border-l-2 border-gray-500/30 bg-gray-500/5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">{subItem.label}</span>
                              <Lock className="h-3 w-3 text-gray-500" />
                            </div>
                            <span className="text-xs mt-1 text-gray-500">{subItem.subtitle}</span>
                          </div>
                          <Bell className="h-3 w-3 text-gray-500" />
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-center text-[13px] font-medium transition-all px-2.5 py-1 rounded-full",
                  pathname === item.href
                    ? "bg-white/[0.15] border border-white/[0.25] text-white"
                    : "text-white/80 hover:text-white hover:bg-white/[0.08]"
                )}
              >
                {item.label}
              </Link>
            )
          ))}
          {/* Quote Button */}
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="inline-flex items-center justify-center px-3 py-1 bg-white/[0.15] backdrop-blur-xl border border-white/[0.2] rounded-full text-white text-[13px] font-medium hover:bg-white/[0.25] transition-all duration-200 shadow-sm whitespace-nowrap"
          >
            견적 문의
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 min-w-[48px] min-h-[48px] flex-shrink-0 text-white hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
          aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[9997] bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden fixed top-20 left-4 right-4 z-[9998] bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl p-4 max-h-[calc(100vh-120px)] overflow-y-auto mobile:hide-scrollbar"
        >
          <nav className="space-y-2">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.href}>
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 min-h-[48px] rounded-lg transition-all touch-manipulation",
                      isMobileServicesOpen
                        ? "bg-white/[0.15] text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                    aria-expanded={isMobileServicesOpen}
                  >
                    {item.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isMobileServicesOpen && "rotate-180")} />
                  </button>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-2 mt-2 space-y-1 overflow-hidden"
                    >
                      {item.dropdown.map((subItem) => (
                        subItem.status === "available" ? (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between px-4 py-3 min-h-[48px] text-sm rounded-lg transition-colors touch-manipulation border-l-2 border-blue-400/50 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"
                          >
                            <span className="font-medium">{subItem.label}</span>
                            <div className="w-2 h-2 bg-blue-400 rounded-full shadow-sm shadow-blue-400/50"></div>
                          </Link>
                        ) : (
                          <div
                            key={subItem.href}
                            onClick={(e) => {
                              handleServiceClick(subItem, e);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center justify-between px-4 py-3 min-h-[48px] text-sm rounded-lg cursor-pointer transition-colors touch-manipulation border-l-2 border-gray-500/30 bg-gray-500/5 hover:bg-gray-500/10"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">{subItem.label}</span>
                              <Lock className="h-3 w-3 text-gray-500" />
                            </div>
                            <Bell className="h-3 w-3 text-gray-500" />
                          </div>
                        )
                      ))}
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 min-h-[48px] rounded-lg transition-all touch-manipulation",
                    pathname === item.href
                      ? "bg-white/[0.15] text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
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
              className="w-full px-4 py-3 min-h-[48px] bg-white/[0.15] backdrop-blur-xl border border-white/[0.2] rounded-lg text-white font-medium hover:bg-white/[0.25] transition-all duration-200 active:scale-95 touch-manipulation"
            >
              견적 문의
            </button>
          </nav>
        </motion.div>
      )}

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* Notification Modal */}
      {isNotificationModalOpen && (
        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
          serviceName={selectedService}
        />
      )}
    </motion.nav>
  );
}

// Notification Modal Component
function NotificationModal({
  isOpen,
  onClose,
  serviceName
}: {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 모달이 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // 스크롤 위치 복원
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitted(true);

    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setEmail("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-2xl transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-black/90 backdrop-blur-2xl border border-white/[0.2] rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] p-6 transition-all duration-300">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full mx-auto mb-4 backdrop-blur-xl">
                    <Bell className="h-8 w-8 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">출시 알림 신청</h2>
                  <p className="text-white/70">
                    <strong className="text-white">{serviceName}</strong> 서비스가 출시되면 이메일로 알려드릴게요!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      이메일 주소
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/[0.08] border border-white/[0.15] rounded-lg text-white placeholder-white/40 focus:bg-white/[0.12] focus:border-white/[0.25] focus:outline-none backdrop-blur-xl transition-all shadow-sm"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 bg-white/[0.08] border border-white/[0.15] text-white/70 rounded-lg hover:bg-white/[0.12] hover:text-white hover:border-white/[0.25] transition-all font-medium backdrop-blur-xl"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 border border-blue-500/30 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 hover:border-blue-500/50 transition-all font-medium shadow-sm backdrop-blur-xl"
                    >
                      알림 신청
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full mx-auto mb-4 backdrop-blur-xl">
                  <Bell className="h-8 w-8 text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">신청 완료!</h2>
                <p className="text-white/70">
                  <strong className="text-white">{serviceName}</strong> 출시 소식을<br />
                  <strong className="text-white">{email}</strong>로 알려드릴게요.
                </p>
              </div>
            )}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/[0.15] transition-all duration-200 text-white/70 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
