"use client";
import { memo, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import SocialIcon, { SOCIAL_LINKS } from "@/shared/components/icons/SocialIcon";
/**
 * FooterPage Component
 * Site-wide footer with branding, social links, and navigation.
 * Refactored for performance and semantic HTML perfection.
 */
function FooterPage() {
  const t = useTranslations("footer");

  // Memoize pages to avoid recreation on every render
  const footerLinks = useMemo(() => [
    { name: t("terms"), link: "/terms" },
    { name: t("privacy"), link: "/privacy" },
    { name: t("about"), link: "/about" },
    { name: t("contact"), link: "/contact" },
  ], [t]);

  return (
    <footer
      className="flex h-full w-full flex-col items-center justify-center space-y-16 px-4 mt-24 pb-12"
      aria-labelledby="footer-heading"
    >
      <div className="space-y-12">
        {/* Branding Section */}
        <div className="flex flex-col items-center">
          <h2 id="footer-heading" className="sr-only">Footer</h2>
          {/* <div className="mb-4 text-[#F2C975]" aria-hidden="true">
            LOGO
          </div> */}
          <h1 className="font-cairo text-4xl font-medium tracking-widest text-[#F2C975] md:text-5xl uppercase">
            MOON LIGHT
          </h1>
        </div>

        {/* Social Media Links */}
        <nav aria-label="Social Media">
          <ul className="flex items-center justify-center gap-12" role="list">
            {(Object.keys(SOCIAL_LINKS) as Array<keyof typeof SOCIAL_LINKS>).map((icon) => (
              SOCIAL_LINKS[icon] && (
                <li key={icon}>
                  <SocialIcon icon={icon} />
                </li>
              )
            ))}
          </ul>
        </nav>

        {/* Navigation Links */}
        <nav aria-label="Footer Navigation">
          <ul className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-12" role="list">
            {footerLinks.map((page) => (
              <li key={page.name}>
                <Link
                  href={page.link}
                  className="font-cairo text-lg font-bold text-zinc-100 transition-colors hover:text-white"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Copyright & Credits Section */}
      <div className="flex w-full max-w-4xl flex-col items-center px-6">
        <div className="mb-6 hidden h-px w-full bg-white/10 lg:block" aria-hidden="true" />
        <div className="flex w-full flex-row items-center justify-between text-zinc-100">
          <small className="font-cairo text-sm font-bold sm:text-base">
            © 2026 {t("allRights")}
          </small>
          <small className="font-cairo text-sm font-bold sm:text-base">
            {t("designedBy")} <span className="text-[#F2C975]">Variable X</span>
          </small>
        </div>
      </div>
    </footer>
  );
}

FooterPage.displayName = "FooterPage";

export default memo(FooterPage);
