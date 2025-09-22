"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactModal } from "@/components/contact-modal";

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
      <ContactModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </header>
  );
}