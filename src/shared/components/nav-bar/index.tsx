"use client";

import { memo, useState, useRef, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import { MenuBtn, useMobileMenu } from "@/features/navigation";
import { LANGUAGES } from "@/features/navigation/constants/languages";
import Avatar from "@/shared/components/avatar";
import { useAuth } from "@/shared/providers/AuthProvider";
import { cn } from "@/shared/lib/utils";
import Logo from "@/shared/components/Logo";

// Performance: Defer mobile drawer loading until interaction to reduce FCP/TBT blocking
const MobileDrawer = dynamic(() => import("@/features/navigation").then((mod) => mod.MobileDrawer), {
  ssr: false
});

/**
 * NavBar Component
 * Main navigation bar with locale switching and authentication states.
 * Integrated with the new Ancient Egyptian mobile drawer.
 */
function NavBar({ locale }: { locale: string }) {
  const t = useTranslations("navbar");
  const { isLoggedIn, userData, setShowLoginModal, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Mobile Menu feature hook
  const { isOpen: isMenuOpen, toggle: toggleMenu, close: closeMenu } = useMobileMenu();

  const [isDesktopLangOpen, setIsDesktopLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Handle scroll detection for navbar background
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement | Document;
      const top =
        (target as HTMLElement).scrollTop ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.scrollY ||
        0;
      setIsScrolled(top > 20);
    };
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, []);

  // Memoize current language based on locale prop
  const currentLang = useMemo(
    () => LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0],
    [locale]
  );

  // Memoize nav links for desktop
  const navLinks = useMemo(() => [
    { title: t("home"), link: `/${locale}` },
    { title: t("about"), link: `/${locale}/about` },
    { title: t("contact"), link: `/${locale}/contact` },
    { title: t("privacy"), link: `/${locale}/privacy` },
    { title: t("terms"), link: `/${locale}/terms` },
  ], [locale, t]);

  const handleLanguageChange = useCallback((newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
    setIsDesktopLangOpen(false);
  }, [pathname, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (desktopRef.current && !desktopRef.current.contains(target)) {
        setIsDesktopLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full flex items-center justify-between px-6 lg:px-20 transition-all duration-500 border-b",
          isScrolled 
            ? "py-3 md:py-4 bg-zinc-900/80 backdrop-blur-md shadow-lg border-white/10" 
            : "pt-6 bg-transparent border-transparent"
        )}
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <Link
          href={`/${locale}`}
          onClick={(e) => {
            if (pathname === `/${locale}`) {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("scroll-to-top"));
            }
          }}
          className="z-50 transition-transform hover:scale-105"
        >
          <Logo />
        </Link>

        {/* Mobile Actions Container */}
        <div className="flex items-center gap-4 lg:hidden">
          <MenuBtn isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden items-center gap-4 xl:gap-8 lg:flex">
          <ul className="flex items-center gap-4 xl:gap-9" role="list">
            {navLinks.map((link) => (
              <li key={link.title} className="whitespace-nowrap">
                <Link
                  href={link.link}
                  className="font-cairo text-sm font-bold transition-colors hover:text-[#F2C975] select-none md:text-base xl:text-lg"
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
              onClick={() => setIsDesktopLangOpen(!isDesktopLangOpen)}
              aria-haspopup="listbox"
              aria-expanded={isDesktopLangOpen}
              className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <span className="text-lg transition-transform group-hover:scale-110">{currentLang.flag}</span>
              <span className="text-xs font-bold uppercase tracking-widest">{currentLang.code}</span>
              <img
                src="/icons/arrow-down.svg"
                alt=""
                className={cn("w-2.5 transition-transform duration-300", isDesktopLangOpen && "rotate-180")}
              />
            </button>

            {isDesktopLangOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-3 flex w-52 flex-col overflow-hidden rounded-2xl border border-[#F2C975]/30 bg-black/90 py-2 shadow-2xl backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-300"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={locale === lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={cn(
                      "group flex w-full items-center gap-4 px-5 py-3 text-sm text-white transition-all hover:bg-white/10 cursor-pointer",
                      locale === lang.code && "bg-[#F2C975]/5 font-bold text-[#F2C975]"
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

      {/* Mobile Drawer Feature */}
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={closeMenu}
        locale={locale}
      />
    </>
  );
}

NavBar.displayName = "NavBar";

export default memo(NavBar);
