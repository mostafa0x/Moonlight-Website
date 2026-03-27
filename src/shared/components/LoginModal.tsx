"use client";

import { useAuth } from "@/shared/providers/AuthProvider";
import { useTranslations } from "next-intl";
import SimpleCloseBtn from "@/shared/button/SimpleCloseBtn";
import { supabase } from "@/shared/lib/supabase";
import { usePathname } from "next/navigation";

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal } = useAuth();
  const pathname = usePathname();
  const t = useTranslations("auth");

  if (!showLoginModal) return null;

  const handleGoogleLogin = async () => {
    const currentPath = pathname.replace(/^\/(en|fr|it|es|pt)/, "") || "/";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback?next=${encodeURIComponent(currentPath)}`,
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-100000 flex items-center justify-center bg-black/90 backdrop-blur-md shadow-2xl animate-in fade-in duration-500"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setShowLoginModal(false);
          e.stopPropagation();
        }
      }}
    >
      <div
        className="relative w-full max-w-md bg-[#0D0D0D] border-2 border-[#F2C975]/30 rounded-[30px] p-8 md:p-12 text-center animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Decorative Hieroglyphic Background */}
        <div className="absolute inset-0 opacity-[0.04] select-none pointer-events-none grid grid-cols-4 gap-4 p-8 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <svg key={i} viewBox="0 0 100 100" className="w-full h-full fill-[#F2C975]">
              <path d="M50 20 L80 50 L50 80 L20 50 Z M50 30 L70 50 L50 70 L30 50 Z" />
            </svg>
          ))}
        </div>

        {/* Top Decorative Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#F2C975] to-transparent opacity-50" />

        <div className="absolute right-6 top-6 z-50">
          <SimpleCloseBtn
            onClick={(e) => {
              e.stopPropagation();
              setShowLoginModal(false);
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Ancient Egyptian Icon - Eye of Horus */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-[#F2C975]/20 blur-2xl rounded-full" />
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20 drop-shadow-[0_0_10px_rgba(242,201,117,0.8)] filter brightness-110 relative z-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          </div>

          <h2 className="text-3xl text-[#F2C975] font-serif tracking-widest uppercase mb-3 [text-shadow:0_0_10px_rgba(242,201,117,0.3)]">
            {t("welcome")}
          </h2>
          <p className="text-[#A1A1A1] mb-2 text-sm tracking-widest font-medium uppercase italic">
            {t("secureVoyage")}
          </p>
          <div className="w-12 h-0.5 bg-[#F2C975]/40 mb-8 rounded-full" />

          <p className="text-[#8B8B8B] mb-10 text-base leading-relaxed max-w-70">
            {t("loginDescription")}
          </p>

          <button
            onClick={handleGoogleLogin}
            className="group relative flex items-center justify-center gap-4 w-full py-4 bg-[#1A1A1A] border-2 border-[#313131] rounded-[15px] text-white hover:border-[#F2C975]/50 hover:bg-[#222222] transition-all duration-300 font-medium cursor-pointer overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-[#F2C975]/0 via-[#F2C975]/5 to-[#F2C975]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.23l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="relative z-10 tracking-wider group-hover:text-[#F2C975] transition-colors">
              {t("loginWithGoogle")}
            </span>
          </button>

          <div className="mt-8 opacity-20 flex gap-4">
            <div className="w-1.5 h-1.5 bg-[#F2C975] rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#F2C975] rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#F2C975] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
