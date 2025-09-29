import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { Logo } from "@/components/ui/logo";

function FooterComponent() {
  return (
    <footer className="relative bg-black border-t border-white/[0.1] overflow-hidden">
      {/* Background gradient similar to other sections */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-blue-500/5 rounded-full blur-3xl" />
      <div className="container py-6 md:py-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {/* Logo */}
          <Logo size="md" variant="light" />

          {/* Simple description */}
          <p className="text-sm text-white/60 max-w-md">
            빠르고 전문적인 웹사이트 개발과 데이터 추적 설정까지 한 번에
          </p>

          {/* Contact email */}
          <a
            href="mailto:contact@leanup.kr"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            contact@leanup.kr
          </a>

          {/* Copyright */}
          <div className="pt-4 border-t border-white/[0.1] w-full">
            <p className="text-xs text-white/40">&copy; 2025 LeanUp. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);