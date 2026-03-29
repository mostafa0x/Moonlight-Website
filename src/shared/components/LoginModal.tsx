"use client";

import { memo, useCallback, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { useAuth } from "@/shared/providers/AuthProvider";
import SimpleCloseBtn from "@/shared/button/SimpleCloseBtn";
import { supabase } from "@/shared/lib/supabase";
import { cn } from "@/shared/lib/utils";
import { useBookingPersistence } from "@/features/booking-modal/hooks/use-booking-persistence";

/**
 * LoginModal Component
 * Premium Egyptian-themed authentication modal.
 * Refactored for performance, accessibility, and Vercel React best practices.
 */
function LoginModal() {
  const { showLoginModal, setShowLoginModal } = useAuth();
  const { clearPendingBooking } = useBookingPersistence();
  const pathname = usePathname();
  const t = useTranslations("auth");

  const handleClose = useCallback(() => {
    setShowLoginModal(false);
    clearPendingBooking();
  }, [setShowLoginModal, clearPendingBooking]);

  // Close modal on Escape key press
  useEffect(() => {
    if (!showLoginModal) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showLoginModal, handleClose]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      // Clean locale from pathname to set correct redirect path
      const currentPath = pathname.replace(/^\/(en|fr|it|es|pt)/, "") || "/";

      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/callback?next=${encodeURIComponent(currentPath)}`,
        },
      });
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }, [pathname]);

  // Memoize decorative hieroglyphics to avoid recalculation
  const decorativeBackground = useMemo(() => (
    <div className="absolute inset-0 grid grid-cols-4 gap-4 p-8 opacity-[0.04] select-none pointer-events-none overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <svg key={i} viewBox="0 0 100 100" className="h-full w-full fill-[#F2C975]">
          <path d="M50 20 L80 50 L50 80 L20 50 Z M50 30 L70 50 L50 70 L30 50 Z" />
        </svg>
      ))}
    </div>
  ), []);

  if (!showLoginModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      className="fixed inset-0 z-10000 flex items-center justify-center bg-black/90 p-4 shadow-2xl backdrop-blur-md animate-in fade-in duration-500"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[30px] border-2 border-[#F2C975]/30 bg-[#0D0D0D] p-8 text-center animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 md:p-12"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Decorative Hieroglyphic Background */}
        {decorativeBackground}

        {/* Top Decorative Border */}
        <div className="absolute inset-x-0 top-0 h-1 opacity-50 bg-linear-to-r from-transparent via-[#F2C975] to-transparent" />

        <div className="absolute right-6 top-6 z-50">
          <SimpleCloseBtn
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Ancient Egyptian Icon - Eye of Horus */}
          <header className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-[#F2C975]/20 blur-2xl" />
            <svg
              viewBox="0 0 100 100"
              className="relative z-10 h-20 w-20 filter brightness-110 drop-shadow-[0_0_10px_rgba(242,201,117,0.8)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 50 Q25 15 50 15 Q75 15 90 50 Q75 85 50 85 Q25 85 10 50Z"
                stroke="#F2C975"
                strokeWidth="2.5"
              />
              <circle cx="50" cy="50" r="10" fill="#F2C975" />
              <path
                d="M40 70 L40 85 Q30 85 30 72"
                stroke="#F2C975"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M60 65 Q70 85 85 80"
                stroke="#F2C975"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </header>

          <h2 id="login-title" className="mb-3 font-serif text-3xl tracking-widest text-[#F2C975] uppercase [text-shadow:0_0_10px_rgba(242,201,117,0.3)]">
            {t("welcome")}
          </h2>
          <p className="mb-2 text-sm font-medium tracking-widest text-[#A1A1A1] uppercase italic">
            {t("secureVoyage")}
          </p>
          <div className="mb-8 h-0.5 w-12 rounded-full bg-[#F2C975]/40" aria-hidden="true" />

          <p className="mb-10 max-w-xs text-base leading-relaxed text-[#8B8B8B]">
            {t("loginDescription")}
          </p>

          <button
            onClick={handleGoogleLogin}
            className="group relative flex w-full cursor-pointer items-center justify-center gap-4 overflow-hidden rounded-[15px] border-2 border-[#313131] bg-[#1A1A1A] py-4 font-medium text-white transition-all duration-300 hover:border-[#F2C975]/50 hover:bg-[#222222]"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 -translate-x-full transition-transform duration-700 bg-linear-to-r from-[#F2C975]/0 via-[#F2C975]/5 to-[#F2C975]/0 group-hover:translate-x-full" />

            <svg className="relative z-10 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.23l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="relative z-10 tracking-wider transition-colors group-hover:text-[#F2C975]">
              {t("loginWithGoogle")}
            </span>
          </button>

          {/* Decorative Egyptian-style dots */}
          <div className="mt-8 flex gap-4 opacity-20" aria-hidden="true">
            <div className="h-1.5 w-1.5 rounded-full bg-[#F2C975]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#F2C975]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#F2C975]" />
          </div>
        </div>
      </div>
    </div>
  );
}

LoginModal.displayName = "LoginModal";

export default memo(LoginModal);
