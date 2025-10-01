"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X, Lock, Bell } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, memo, useCallback } from "react";
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
  { label: "Q&A", href: "/contact" },
];

function HeroSectionComponent() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();
  // 성능 최적화: 설정값 조정
  const prismSettings = isMobile
    ? { timeScale: 0.2, scale: 2.0, glow: 1.0, bloom: 0.8 }
    : { timeScale: 0.3, scale: 2.8, glow: 0.8, bloom: 0.8 };
  const showPrismEffect = mounted && !shouldReduceMotion;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  useEffect(() => {
    if (!mounted || isMobile || shouldReduceMotion) return;

    let isScrolling = false;
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let hasTriggeredSnap = false;

    const handleScroll = () => {
      if (isScrolling) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollDelta = scrollY - lastScrollY;
      const isScrollingDown = scrollDelta > 0;

      lastScrollY = scrollY;

      const threshold = 0.15;
      const upperBound = 0.75;
      const inSnapZone = scrollY > windowHeight * threshold && scrollY < windowHeight * upperBound;

      if (isScrollingDown && inSnapZone && !hasTriggeredSnap) {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
          scrollTimeout = null;
        }

        scrollTimeout = setTimeout(() => {
          const currentScrollY = window.scrollY;
          const stillInZone = currentScrollY > windowHeight * threshold && currentScrollY < windowHeight * upperBound;

          if (stillInZone && !isScrolling) {
            isScrolling = true;
            hasTriggeredSnap = true;

            window.scrollTo({
              top: windowHeight,
              behavior: "smooth",
            });

            setTimeout(() => {
              isScrolling = false;
              if (window.scrollY < windowHeight * 0.2) {
                hasTriggeredSnap = false;
              }
            }, 600);
          }
        }, 100);
      }

      if (scrollY < windowHeight * 0.1) {
        hasTriggeredSnap = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [mounted, isMobile, shouldReduceMotion]);

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

  const handleServiceClick = useCallback((item: typeof serviceItems[0], e: React.MouseEvent) => {
    if (item.status === "development" || item.status === "coming-soon") {
      e.preventDefault();
      setSelectedService(item.label);
      setIsNotificationModalOpen(true);
      setIsServicesOpen(false);
    }
  }, []);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden flex items-center bg-black">
        {/* WebGL Prism Background - 3D rotating prism effect */}
        <div className="absolute inset-0 w-full h-full bg-black">
          {showPrismEffect ? (
            <Prism
              animationType="rotate"
              timeScale={prismSettings.timeScale}
              height={3.5}
              baseWidth={5.5}
              scale={prismSettings.scale}
              hueShift={0}
              colorFrequency={1.0}
              noise={0}
              glow={prismSettings.glow}
              bloom={prismSettings.bloom}
              suspendWhenOffscreen={true}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-blue-600/30 via-blue-500/10 to-black" />
          )}
        </div>

        {/* Subtle overlay for better text visibility - 모바일에서 더 밝게 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

        {/* Content overlay needs a higher stacking context so the fixed nav stays above following sections */}
        <div className="absolute inset-0 z-[50]">
          {/* Glassmorphism Navigation Bar - Fixed/Sticky with highest z-index */}
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
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button className={cn(
                        "flex items-center justify-center text-[13px] font-medium transition-all px-2.5 py-1 rounded-full",
                        pathname?.startsWith('/services')
                          ? "bg-white/[0.15] border border-white/[0.25] text-white"
                          : "text-white/80 hover:text-white hover:bg-white/[0.08]"
                      )}>
                        {item.label}
                        <ChevronDown className="ml-0.5 h-3 w-3" />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={cn(
                          "absolute top-full left-0 mt-1 w-56 rounded-lg bg-black/90 backdrop-blur-xl border border-white/[0.25] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200",
                          isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
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

              {/* Mobile Menu Button - 터치 영역 및 접근성 개선 */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 min-w-[48px] min-h-[48px] flex-shrink-0 text-white hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </motion.nav>

          {/* Mobile Menu - 터치 영역 및 애니메이션 개선 */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden fixed top-20 left-4 right-4 z-[9998] bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl p-4 max-h-[calc(100vh-120px)] overflow-y-auto"
            >
              <nav className="space-y-2">
                {navItems.map((item) => (
                  item.dropdown ? (
                    <div key={item.href}>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 min-h-[48px] text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors touch-manipulation"
                        aria-expanded={isServicesOpen}
                      >
                        {item.label}
                        <ChevronDown className={cn("h-4 w-4 transition-transform", isServicesOpen && "rotate-180")} />
                      </button>
                      {isServicesOpen && (
                        <div className="pl-2 mt-2 space-y-1">
                          {item.dropdown.map((subItem) => (
                            subItem.status === "available" ? (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 min-h-[48px] text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors touch-manipulation"
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
                                className="block px-4 py-3 min-h-[48px] text-sm text-white/50 rounded-lg hover:bg-white/10 cursor-pointer transition-colors touch-manipulation"
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

          {/* Main Content */}
          <div className="container flex flex-col items-center justify-center min-h-screen pt-28 pb-16 sm:pt-32 sm:pb-20">
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

              {/* Main Title - 모바일 반응형 개선 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight px-4"
              >
                빠르고 전문적인
                <br />
                {mounted && !shouldReduceMotion ? (
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
                ) : (
                  <span className="bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent">
                    웹사이트 제작
                  </span>
                )}
              </motion.h1>

              {/* Subtitle - 모바일 가독성 개선 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-6 leading-relaxed"
              >
                전문가 퀄리티 · 스타트업 속도 · 합리적 비용
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                템플릿과 AI를 활용하여 2주일 내 MVP 웹사이트 완성
              </motion.p>

              {/* CTA Buttons - 터치 영역 및 반응성 개선 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-6 w-full sm:w-auto"
              >
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="group inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] bg-white text-gray-900 rounded-full font-semibold text-sm sm:text-base transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95 touch-manipulation"
                >
                  견적 문의
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] bg-transparent border-2 border-white/30 text-white rounded-full font-semibold text-sm sm:text-base transition-all hover:bg-white/10 hover:border-white/50 backdrop-blur-sm active:scale-95 touch-manipulation"
                >
                  포트폴리오 보기
                </Link>
              </motion.div>
            </div>

            {/* Scroll Indicator - 터치 영역 개선 */}
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
              className="flex absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer p-3 min-w-[48px] min-h-[48px] items-center justify-center touch-manipulation"
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
              role="button"
              aria-label="다음 섹션으로 스크롤"
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

// Export memoized component
export const HeroSection = memo(HeroSectionComponent);

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
