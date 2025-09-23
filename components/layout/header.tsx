"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown, Send, Lock, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuoteModal } from "@/components/quote-modal";

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

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleServiceClick = (item: typeof serviceItems[0], e: React.MouseEvent) => {
    if (item.status === "development" || item.status === "coming-soon") {
      e.preventDefault();
      setSelectedService(item.label);
      setIsNotificationModalOpen(true);
      setIsServicesOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                    "absolute top-full left-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden transition-all duration-200",
                    isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  )}
                >
                  {item.dropdown.map((subItem) => (
                    subItem.status === "available" ? (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-3 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{subItem.label}</span>
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      </Link>
                    ) : (
                      <div
                        key={subItem.href}
                        onClick={(e) => handleServiceClick(subItem, e)}
                        className="block px-4 py-3 text-sm cursor-pointer transition-colors text-gray-400 bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="opacity-60">
                                {subItem.label}
                              </span>
                              <Lock className="h-3 w-3 text-gray-400" />
                            </div>
                            <span className="text-xs mt-1 text-gray-500">
                              {subItem.subtitle}
                            </span>
                          </div>
                          <Bell className="h-3 w-3 text-gray-400" />
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
                    subItem.status === "available" ? (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block rounded-md px-3 py-2 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-800 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{subItem.label}</span>
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      </Link>
                    ) : (
                      <div
                        key={subItem.href}
                        onClick={(e) => {
                          handleServiceClick(subItem, e);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block rounded-md px-3 py-2 text-sm cursor-pointer text-gray-400 bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="opacity-60">
                                {subItem.label}
                              </span>
                              <Lock className="h-3 w-3 text-gray-400" />
                            </div>
                            <span className="text-xs mt-1 text-gray-500">
                              {subItem.subtitle}
                            </span>
                          </div>
                          <Bell className="h-3 w-3 text-gray-400" />
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

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        serviceName={selectedService}
      />
    </header>
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
    
    // TODO: 실제 API 호출로 알림 신청 처리
    console.log(`${serviceName} 출시 알림 신청:`, email);
    setIsSubmitted(true);
    
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setEmail("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 mx-auto">
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
  );
}
