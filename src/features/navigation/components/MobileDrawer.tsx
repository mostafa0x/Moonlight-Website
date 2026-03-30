"use client";

import { memo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

// Sub-components
import DrawerProfile from "./drawer/DrawerProfile";
import DrawerNav from "./drawer/DrawerNav";
import LanguageSelector from "./drawer/LanguageSelector";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

/**
 * MobileDrawer - Side drawer with Ancient Egyptian aesthetic.
 *
 * Performance decisions:
 * - The drawer is ALWAYS in the DOM (not conditionally rendered).
 *   CSS `translate-x-full` hides it with GPU-accelerated transforms (no layout thrashing).
 *   This avoids costly mount/unmount cycles on every toggle → better INP.
 *
 * - `pointer-events-none` on the backdrop when closed ensures invisible elements
 *   never interfere with click targets → better INP.
 *
 * - Sub-components (DrawerNav, DrawerProfile, LanguageSelector) are all memo'd
 *   with stable callback props → no cascading re-renders when drawer toggles.
 *
 * - Escape key handler added for accessibility (WCAG 2.1 AA compliance).
 */
function MobileDrawer({ isOpen, onClose, locale }: MobileDrawerProps) {
  const t = useTranslations("navbar");

  // Close on Escape key → improves keyboard accessibility & INP for keyboard users
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop — GPU-composited opacity transition, pointer-events-none when closed */}
      <div
        className={cn(
          "fixed inset-0 z-1001 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Content — translate-x is GPU-composited, no layout recalculation */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-1002 h-full w-[85%] max-w-90 border-l border-[#F2C975]/30 bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.8)] select-none transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) will-change-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Egyptian Pattern Background — Low opacity, pointer-events disabled */}
        <div
          className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "url(/backgrounds/egyptian-menu-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        {/* Scrollable Container */}
        <div className="relative z-10 flex h-full flex-col overflow-y-auto scrollbar-hide">
          <div className="flex flex-col p-6 pt-10">
            {/* Header Section */}
            <header className="flex items-center justify-between gap-4 mb-8">
              <h2 className="font-cairo text-xl font-black tracking-widest text-[#F2C975]">
                {t("menu") || "MENU"}
              </h2>
              <div className="h-px flex-1 bg-linear-to-r from-[#F2C975]/40 to-transparent" aria-hidden="true" />
            </header>

            {/* User Profile/Authentication Section */}
            <DrawerProfile onClose={onClose} locale={locale} />

            {/* Navigation Links — isOpen removed, no longer causes link re-renders */}
            <DrawerNav onClose={onClose} locale={locale} />

            {/* Language Selection */}
            <LanguageSelector currentLocale={locale} onClose={onClose} />
          </div>
        </div>

        {/* Decorative Footer */}
        <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
          <div className="h-px w-24 rounded-full bg-linear-to-r from-transparent via-[#F2C975] to-transparent" />
        </footer>
      </aside>
    </>
  );
}

MobileDrawer.displayName = "MobileDrawer";
export default memo(MobileDrawer);
