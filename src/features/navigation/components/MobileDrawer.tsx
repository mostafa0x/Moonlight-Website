"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import Avatar from "@/shared/components/avatar";
import { useAuth } from "@/shared/providers/AuthProvider";
import { LANGUAGES } from "../constants/languages";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

/**
 * MobileDrawer - Side drawer with Ancient Egyptian aesthetic.
 * Sliding menu containing navigation links and language selection.
 */
function MobileDrawer({ isOpen, onClose, locale }: MobileDrawerProps) {
  const t = useTranslations("navbar");
  const { isLoggedIn, userData, setShowLoginModal, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = useMemo(() => [
    { title: t("home"), link: `/${locale}` },
    { title: t("about"), link: `/${locale}/about` },
    { title: t("contact"), link: `/${locale}/contact` },
    { title: t("privacy"), link: `/${locale}/privacy` },
    { title: t("terms"), link: `/${locale}/terms` },
  ], [locale, t]);

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[1001] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer Content */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-[1002] h-full w-[85%] max-w-[360px] border-l border-[#F2C975]/30 bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.8)] select-none transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Egyptian Pattern Background */}
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
          {/* Header Section */}
          <div className="flex flex-col p-6 pt-10">
            <div className="flex items-center justify-between gap-4 mb-8">
              <h2 className="font-cairo text-xl font-black tracking-widest text-[#F2C975]">
                {t("menu") || "MENU"}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-[#F2C975]/40 to-transparent" />
            </div>

            {/* Profile/Login Section */}
            {isLoggedIn ? (
              <div className="mb-8 flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10">
                <Link 
                  href={`/${locale}/profile`}
                  onClick={onClose}
                  className="flex flex-1 items-center gap-4 cursor-pointer"
                >
                  <Avatar src={userData?.avatar || ""} />
                  <div className="flex flex-col">
                    <span className="font-cairo text-base font-bold text-white leading-tight">
                      {userData?.name || "User"}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    signOut();
                    onClose();
                  }}
                  className="text-[10px] font-bold uppercase text-red-500/80 hover:text-red-400 transition-colors cursor-pointer"
                >
                  {t("logout") || "Logout"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setShowLoginModal(true); onClose(); }}
                className="mb-8 w-full rounded-xl border border-[#F2C975]/30 bg-[#F2C975]/5 py-3.5 text-center font-cairo text-base font-black text-[#F2C975] shadow-lg transition-all hover:bg-[#F2C975]/10 active:scale-95"
              >
                {t("login") || "Login"}
              </button>
            )}

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5 mb-8">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.title}
                  href={link.link}
                  onClick={onClose}
                  className={cn(
                    "group relative flex items-center gap-4 rounded-xl py-3.5 px-4 transition-all hover:bg-[#F2C975]/5",
                    pathname === link.link && "bg-[#F2C975]/10 border border-[#F2C975]/10"
                  )}
                  style={{
                    animation: isOpen ? `slideFadeUp 0.4s ease-out ${idx * 0.05}s forwards` : "none",
                    opacity: 0
                  }}
                >
                  <span className={cn(
                    "font-cairo text-base font-bold transition-colors",
                    pathname === link.link ? "text-[#F2C975]" : "text-white/80 group-hover:text-[#F2C975]"
                  )}>
                    {link.title}
                  </span>
                  {pathname === link.link && (
                    <div className="absolute right-4 h-1.5 w-1.5 rounded-full bg-[#F2C975] shadow-[0_0_8px_#F2C975]" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Language Selection - Integrated better */}
            <div className="border-t border-white/10 pt-4 pb-10">
              <h3 className="mb-4 font-cairo text-[10px] font-bold uppercase tracking-widest text-white/30">
                {t("language") || "Language"}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 transition-all hover:bg-white/10 active:scale-95 cursor-pointer",
                      locale === lang.code && "border-[#F2C975]/30 bg-[#F2C975]/5 text-[#F2C975]"
                    )}
                  >
                    <span className="text-sm">{lang.flag}</span>
                    <span className="text-[10px] font-bold uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decoration Footer */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
          <div className="h-px w-24 rounded-full bg-gradient-to-r from-transparent via-[#F2C975] to-transparent" />
        </div>
      </aside>
    </>
  );
}

export default memo(MobileDrawer);
