"use client";

import { memo, useEffect, useState } from "react";
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
 * Performance Fix for Mobile:
 * - Deferred Background: The decorative background image (120KB) no longer 
 *   loads on initial page load. It is only rendered once the drawer has been 
 *   opened for the first time. This significantly reduces initial bandwidth 
 *   contention and improves mobile LCP.
 */
function MobileDrawer({ isOpen, onClose, locale }: MobileDrawerProps) {
  const t = useTranslations("navbar");
  const [hasOpenedEver, setHasOpenedEver] = useState(false);

  // Mark drawer as opened to trigger lazy asset loading
  useEffect(() => {
    if (isOpen && !hasOpenedEver) {
      setHasOpenedEver(true);
    }
  }, [isOpen, hasOpenedEver]);

  // Close on Escape key
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
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-1001 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Content */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-1002 h-full w-[85%] max-w-90 border-l border-[#F2C975]/60 bg-[#0a0a0a] text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) will-change-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Egyptian Pattern Background — Only render after first open to save bandwidth */}
        {hasOpenedEver && (
          <div
            className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none fade-in duration-500"
            style={{
              backgroundImage: "url(/backgrounds/egyptian-menu-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        )}

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

            {/* Navigation Links */}
            <DrawerNav onClose={onClose} locale={locale} />

            {/* Language Selection */}
            <LanguageSelector currentLocale={locale} onClose={onClose} />
          </div>
        </div>

        {/* Decorative Footer */}
        <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
          <div className="h-px w-24 rounded-full bg-linear-to-r from-transparent via-[#F2C975] to-transparent" aria-hidden="true" />
        </footer>
      </aside>
    </>
  );
}

MobileDrawer.displayName = "MobileDrawer";
export default memo(MobileDrawer);
