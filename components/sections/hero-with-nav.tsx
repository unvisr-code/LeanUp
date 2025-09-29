"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X, Lock, Bell } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { QuoteModal } from "@/components/quote-modal";
import { Logo } from "@/components/ui/logo";
import { ModalPortal } from "@/components/modal-portal";

// Dynamic import to avoid SSR issues with WebGL
const Prism = dynamic(() => import("@/components/effects/Prism"), {
  ssr: false,
});

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
  { label: "문의", href: "/contact" },
];

export function HeroSection() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  useEffect(() => {
    setMounted(true);

    // 스크롤 시 자동 스냅 기능
    let isScrolling = false;
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 히어로 섹션에서 10% 이상 스크롤하면 자동으로 다음 섹션으로
      if (scrollY > windowHeight * 0.1 && scrollY < windowHeight * 0.9) {
        isScrolling = true;
        window.scrollTo({
          top: windowHeight,
          behavior: 'smooth'
        });
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleServiceClick = (item: typeof serviceItems[0], e: React.MouseEvent) => {
    if (item.status === "development" || item.status === "coming-soon") {
      e.preventDefault();
      setSelectedService(item.label);
      setIsNotificationModalOpen(true);
      setIsServicesOpen(false);
    }
  };

  return (
    <>
      <section className="relative min-h-screen overflow-hidden flex items-center bg-black">
        {/* WebGL Prism Background - 3D rotating prism effect */}
        <div className="absolute inset-0 w-full h-full bg-black">
          {mounted && (
            <Prism
              animationType="rotate"
              timeScale={0.4}
              height={3.5}
              baseWidth={5.5}
              scale={3.0}
              hueShift={0}
              colorFrequency={1.2}
              noise={0}
              glow={1.0}
              bloom={0.9}
              suspendWhenOffscreen={true}
            />
          )}
        </div>

        {/* Subtle overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

        {/* Content overlay needs a higher stacking context so the fixed nav stays above following sections */}
        <div className="absolute inset-0 z-[120]">
          {/* Glassmorphism Navigation Bar - Fixed/Sticky */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-[999999999] flex justify-center p-6"
          >
            <div className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-2xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center gap-8 hover:bg-black/60 transition-all duration-300">
              {/* Logo */}
              <Link href="/" className="flex items-center text-white group hover:opacity-90 transition-opacity">
                <Logo size="md" variant="light" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  item.dropdown ? (
                    <div
                      key={item.href}
                      className="relative group"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button className={cn(
                        "flex items-center text-sm font-medium transition-all px-3 py-1.5 rounded-full",
                        pathname?.startsWith('/services')
                          ? "bg-white/[0.15] border border-white/[0.25] text-white"
                          : "text-white/80 hover:text-white hover:bg-white/[0.08]"
                      )}>
                        {item.label}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={cn(
                          "absolute top-full left-0 mt-2 w-56 rounded-lg bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-200",
                          isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                        )}
                      >
                        {item.dropdown.map((subItem) => (
                          subItem.status === "available" ? (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-4 py-3 text-sm text-white hover:bg-white/20 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{subItem.label}</span>
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              </div>
                            </Link>
                          ) : (
                            <div
                              key={subItem.href}
                              onClick={(e) => handleServiceClick(subItem, e)}
                              className="block px-4 py-3 text-sm cursor-pointer text-white/50 hover:bg-white/10 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <span className="opacity-60">{subItem.label}</span>
                                    <Lock className="h-3 w-3" />
                                  </div>
                                  <span className="text-xs mt-1 opacity-50">{subItem.subtitle}</span>
                                </div>
                                <Bell className="h-3 w-3" />
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
                        "text-sm font-medium transition-all px-3 py-1.5 rounded-full",
                        pathname === item.href
                          ? "bg-white/[0.15] border border-white/[0.25] text-white"
                          : "text-white/80 hover:text-white hover:bg-white/[0.08]"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>

              {/* Quote Button */}
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="hidden md:inline-flex items-center px-4 py-2 bg-white/[0.15] backdrop-blur-xl border border-white/[0.2] rounded-full text-white text-sm font-medium hover:bg-white/[0.25] transition-all duration-200 shadow-sm"
              >
                견적 문의
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 text-white hover:bg-white/10 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </motion.nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden absolute top-20 left-4 right-4 bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl p-4"
            >
              <nav className="space-y-2">
                {navItems.map((item) => (
                  item.dropdown ? (
                    <div key={item.href}>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center justify-between w-full px-3 py-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                      >
                        {item.label}
                        <ChevronDown className={cn("h-4 w-4 transition-transform", isServicesOpen && "rotate-180")} />
                      </button>
                      {isServicesOpen && (
                        <div className="pl-4 mt-2 space-y-1">
                          {item.dropdown.map((subItem) => (
                            subItem.status === "available" ? (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                              >
                                {subItem.label}
                              </Link>
                            ) : (
                              <div
                                key={subItem.href}
                                onClick={(e) => {
                                  handleServiceClick(subItem, e);
                                  setIsMobileMenuOpen(false);
                                }}
                                className="block px-3 py-2 text-sm text-white/50 rounded-lg hover:bg-white/10"
                              >
                                <div className="flex items-center gap-2">
                                  <span>{subItem.label}</span>
                                  <Lock className="h-3 w-3" />
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-3 py-2 rounded-lg transition-all",
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
                  className="w-full px-3 py-2 bg-white/[0.15] backdrop-blur-xl border border-white/[0.2] rounded-lg text-white font-medium hover:bg-white/[0.25] transition-all duration-200"
                >
                  견적 문의
                </button>
              </nav>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="container flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-5xl text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] text-white text-sm font-medium">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  LeanUp Agency
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
              >
                빠르고 전문적인
                <br />
                {mounted && (
                  <TypeAnimation
                    sequence={[
                      "웹사이트 제작",
                      2000,
                      "데이터 추적 설정",
                      2000,
                      "온보딩 지원",
                      2000,
                      "성장 가속화",
                      3000,
                    ]}
                    wrapper="span"
                    speed={50}
                    className="bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent"
                    repeat={Infinity}
                  />
                )}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
              >
                전문가 퀄리티 · 스타트업 속도 · 합리적 비용
                <br />
                템플릿과 AI를 활용하여 2주일 내 MVP 웹사이트 완성
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-base transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 hover:scale-105"
                >
                  견적 문의
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-semibold text-base transition-all hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
                >
                  포트폴리오 보기
                </Link>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
              onClick={() => {
                // 다음 섹션으로 정확히 스크롤
                const nextSection = document.querySelector('section:nth-of-type(2)');
                if (nextSection) {
                  nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-white/60 font-medium">Scroll</span>
                <ChevronDown className="w-5 h-5 text-white/60" />
              </div>
            </motion.div>
          </div>

          {/* Bottom Gradient Transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />

        </div>
      </section>

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
    </>
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
        className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                    <Bell className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">출시 알림 신청</h2>
                  <p className="text-gray-600">
                    <strong>{serviceName}</strong> 서비스가 출시되면 이메일로 알려드릴게요!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 주소
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      알림 신청
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                  <Bell className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">신청 완료!</h2>
                <p className="text-gray-600">
                  <strong>{serviceName}</strong> 출시 소식을<br />
                  <strong>{email}</strong>로 알려드릴게요.
                </p>
              </div>
            )}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
