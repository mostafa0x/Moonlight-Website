"use client";
import MenuBtn from "@/shared/button/MenuBtn";
import Link from "next/link";
import { memo } from "react";
import { useTranslations } from "next-intl";
import Avatar from "@/shared/components/avatar";
import { useAuth } from "@/shared/providers/AuthProvider";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function NavBar({ locale }: { locale: string }) {
  const t = useTranslations("navbar");
  const { isLoggedIn, userData, setShowLoginModal, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
  ];

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;
    
    // Replace current locale with the new one
    // Standard next-intl structure: /[locale]/path...
    const segments = pathname.split("/");
    // index 0 is empty (before first /), index 1 is current locale
    segments[1] = newLocale;
    const newPath = segments.join("/");
    
    router.push(newPath);
    setIsMobileOpen(false);
    setIsDesktopOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
      if (desktopRef.current && !desktopRef.current.contains(event.target as Node)) {
        setIsDesktopOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const LINKS = [
    { title: t("home"), link: `/${locale}` },
    { title: t("about"), link: `/${locale}/about` },
    { title: t("contact"), link: `/${locale}/contact` },
    { title: t("privacy"), link: `/${locale}/privacy` },
    { title: t("terms"), link: `/${locale}/terms` },
  ];

  return (
    <div className="absolute top-0 left-0 w-full px-6 lg:px-20 pt-3.25 flex flex-row justify-between z-65">
      <div>Logo</div>
      <div className="flex flex-row items-center gap-4 lg:hidden">
        <div className="relative" ref={mobileRef}>
           <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer"
          >
            <span className="text-sm">{currentLang.flag}</span>
            <span className="uppercase text-[10px] font-bold">{currentLang.code}</span>
          </button>
          {isMobileOpen && (
            <div className="absolute right-0 mt-2 w-32 rounded-lg bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 shadow-2xl py-1 overflow-hidden z-70 flex flex-col">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors ${
                    locale === lang.code ? "bg-white/5 font-bold text-[#F2C975]" : ""
                  }`}
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
      <div className="hidden flex-row gap-9 justify-between pt-3 lg:flex">
        {LINKS.map((link) => (
          <Link
            href={link.link}
            className="font-bold font-cairo text-base  xl:text-xl text-white hover:text-gray-300 select-none"
            key={link.title}
          >
            {link.title}
          </Link>
        ))}
        {isLoggedIn ? (
          <div className="flex flex-row gap-4 items-center">
            <Link href={`/${locale}/profile`} className="flex flex-row gap-1 items-center">
              <Avatar src={userData?.avatar || ""} />
              <span className="text-base text-white font-bold">{userData?.name?.split(' ')[0]}</span>
            </Link>
            <button 
              onClick={() => signOut()}
              className="text-xs text-red-500 hover:text-red-400 font-bold uppercase cursor-pointer"
            >
              {t("logout") || "Logout"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="font-bold font-cairo text-base xl:text-xl text-white hover:text-[#F2C975] select-none cursor-pointer"
          >
            {t("login") || "Login"}
          </button>
        )}
        
        {/* Language Switcher Desktop */}
        <div className="relative flex items-center" ref={desktopRef}>
          <button
            onClick={() => setIsDesktopOpen(!isDesktopOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer group"
          >
            <span className="text-base group-hover:scale-110 transition-transform">{currentLang.flag}</span>
            <span className="uppercase text-xs font-bold tracking-wider">{currentLang.code}</span>
            <img src="/icons/arrow-down.svg" alt="down" className={`w-2.5 transition-transform duration-300 ${isDesktopOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDesktopOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 overflow-hidden z-70 flex flex-col animate-in fade-in slide-in-from-top-2 duration-300">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-4 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-all group ${
                    locale === lang.code ? "bg-white/5 font-bold text-[#F2C975]" : ""
                  }`}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.name}</span>
                  {locale === lang.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F2C975] shadow-[0_0_8px_#F2C975]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(NavBar);
