"use client";

import { memo, useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import MenuBtn from "@/shared/button/MenuBtn";
import Avatar from "@/shared/components/avatar";
import { useAuth } from "@/shared/providers/AuthProvider";
import { cn } from "@/shared/lib/utils";

// Static constants moved outside to prevent recreation on each render
const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
];

/**
 * NavBar Component
 * Main navigation bar with locale switching and authentication states.
 * Refactored for performance and accessibility.
 */
function NavBar({ locale }: { locale: string }) {
  const t = useTranslations("navbar");
  const { isLoggedIn, userData, setShowLoginModal, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Memoize current language based on locale prop
  const currentLang = useMemo(
    () => LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0],
    [locale]
  );

  // Memoize nav links
  const navLinks = useMemo(() => [
    { title: t("home"), link: `/${locale}` },
    { title: t("about"), link: `/${locale}/about` },
    { title: t("contact"), link: `/${locale}/contact` },
    { title: t("privacy"), link: `/${locale}/privacy` },
    { title: t("terms"), link: `/${locale}/terms` },
  ], [locale, t]);

  const handleLanguageChange = useCallback((newLocale: string) => {
    if (!pathname) return;
    
    // Standard next-intl structure: /[locale]/path...
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    
    router.push(newPath);
    setIsMobileOpen(false);
    setIsDesktopOpen(false);
  }, [pathname, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (mobileRef.current && !mobileRef.current.contains(target)) {
        setIsMobileOpen(false);
      }
      if (desktopRef.current && !desktopRef.current.contains(target)) {
        setIsDesktopOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav 
      className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 pt-6 lg:px-20"
      aria-label="Main Navigation"
    >
      {/* Brand Logo - Future: Add Logo Component */}
      <Link href={`/${locale}`} className="z-50 font-bold text-white transition-opacity hover:opacity-80">
        MOONLIGHT
      </Link>

      {/* Mobile Actions Container */}
      <div className="flex items-center gap-4 lg:hidden">
        <div className="relative" ref={mobileRef}>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-haspopup="listbox"
            aria-expanded={isMobileOpen}
            aria-label="Select Language"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            <span className="text-sm">{currentLang.flag}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{currentLang.code}</span>
          </button>

          {isMobileOpen && (
            <div 
              role="listbox" 
              className="absolute right-0 z-50 mt-2 flex w-36 flex-col overflow-hidden rounded-xl border border-white/10 bg-black/80 py-1 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200"
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={locale === lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-xs text-white transition-colors hover:bg-white/10",
                    locale === lang.code && "bg-white/5 font-bold text-[#F2C975]"
                  )}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <MenuBtn />
      </div>

      {/* Desktop Navigation Menu */}
      <div className="hidden items-center gap-8 lg:flex">
        <ul className="flex items-center gap-9" role="list">
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link
                href={link.link}
                className="font-cairo text-base font-bold text-white transition-colors hover:text-[#F2C975] select-none xl:text-lg"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="h-6 w-px bg-white/20" aria-hidden="true" />

        {isLoggedIn ? (
          <div className="flex items-center gap-6">
            <Link 
              href={`/${locale}/profile`} 
              className="group flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Avatar src={userData?.avatar || ""} />
              <span className="font-cairo text-base font-bold text-white group-hover:text-[#F2C975]">
                {userData?.name?.split(' ')[0]}
              </span>
            </Link>
            <button 
              onClick={() => signOut()}
              className="cursor-pointer text-xs font-bold uppercase text-red-500 transition-colors hover:text-red-400"
            >
              {t("logout") || "Logout"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="cursor-pointer font-cairo text-base font-bold text-white transition-colors hover:text-[#F2C975] select-none xl:text-lg"
          >
            {t("login") || "Login"}
          </button>
        )}
        
        {/* Language Switcher Desktop */}
        <div className="relative flex items-center" ref={desktopRef}>
          <button
            onClick={() => setIsDesktopOpen(!isDesktopOpen)}
            aria-haspopup="listbox"
            aria-expanded={isDesktopOpen}
            className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            <span className="text-lg transition-transform group-hover:scale-110">{currentLang.flag}</span>
            <span className="text-xs font-bold uppercase tracking-widest">{currentLang.code}</span>
            <img 
              src="/icons/arrow-down.svg" 
              alt="" 
              className={cn("w-2.5 transition-transform duration-300", isDesktopOpen && "rotate-180")} 
            />
          </button>

          {isDesktopOpen && (
            <div 
              role="listbox"
              className="absolute right-0 top-full mt-3 flex w-52 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/90 py-2 shadow-2xl backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-300"
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={locale === lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "group flex w-full items-center gap-4 px-5 py-3 text-sm text-white transition-all hover:bg-white/10",
                    locale === lang.code && "bg-white/5 font-bold text-[#F2C975]"
                  )}
                >
                  <span className="text-xl transition-transform group-hover:scale-110">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.name}</span>
                  {locale === lang.code && (
                    <div className="h-2 w-2 rounded-full bg-[#F2C975] shadow-[0_0_12px_#F2C975]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

NavBar.displayName = "NavBar";

export default memo(NavBar);
