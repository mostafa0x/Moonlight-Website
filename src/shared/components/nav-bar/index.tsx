import { memo } from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import NavContainer from "./NavContainer";
import LogoLink from "./LogoLink";
import AuthSection from "./AuthSection";
import LangSwitcher from "./LangSwitcher";
import MobileSection from "./MobileSection";

/**
 * NavBar Component (Server Component)
 * 
 * Refactored to follow Next.js 16 RSC best practices.
 * The shell, layout, and links are rendered on the server (0 JS).
 * Interactivity (auth, mobile menu, language switcher) is isolated into smaller client components.
 */
async function NavBar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "navbar" });

  const navLinks = [
    { title: t("home"), link: `/${locale}` },
    { title: t("about"), link: `/${locale}/about` },
    { title: t("contact"), link: `/${locale}/contact` },
    { title: t("privacy"), link: `/${locale}/privacy` },
    { title: t("terms"), link: `/${locale}/terms` },
  ];

  return (
    <NavContainer>
      {/* Brand Logo */}
      <LogoLink locale={locale} />

      {/* Mobile Actions Container */}
      <MobileSection locale={locale} />

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

        {/* Authentication Section */}
        <AuthSection locale={locale} />

        {/* Language Switcher Desktop */}
        <LangSwitcher locale={locale} />
      </div>
    </NavContainer>
  );
}

NavBar.displayName = "NavBar";

export default memo(NavBar);
