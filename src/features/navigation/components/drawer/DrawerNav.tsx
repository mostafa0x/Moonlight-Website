"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

interface DrawerNavProps {
  onClose: () => void;
  locale: string;
}

/**
 * DrawerNav - Navigation links for the mobile drawer.
 *
 * Performance notes:
 * - `isOpen` prop was removed: nav re-renders no longer happen on drawer toggle.
 *   The slide-in animation is handled purely by CSS on the parent <aside> transform.
 * - navLinks array is memoized — only recomputes when locale/translations change.
 * - Active path detection uses usePathname which is a lightweight hook.
 */
function DrawerNav({ onClose, locale }: DrawerNavProps) {
  const t = useTranslations("navbar");
  const pathname = usePathname();

  const navLinks = useMemo(() => [
    { title: t("home"), link: `/${locale}` },
    { title: t("about"), link: `/${locale}/about` },
    { title: t("contact"), link: `/${locale}/contact` },
    { title: t("privacy"), link: `/${locale}/privacy` },
    { title: t("terms"), link: `/${locale}/terms` },
  ], [locale, t]);

  return (
    <nav className="flex flex-col gap-1.5 mb-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.link;
        return (
          <Link
            key={link.link}
            href={link.link}
            onClick={onClose}
            className={cn(
              "group relative flex items-center gap-4 rounded-xl py-3.5 px-4 transition-all hover:bg-[#F2C975]/5",
              isActive && "bg-[#F2C975]/10 border border-[#F2C975]/10"
            )}
          >
            <span className={cn(
              "font-cairo text-base font-bold transition-colors",
              isActive ? "text-[#F2C975]" : "text-white/80 group-hover:text-[#F2C975]"
            )}>
              {link.title}
            </span>
            {isActive && (
              <div className="absolute right-4 h-1.5 w-1.5 rounded-full bg-[#F2C975] shadow-[0_0_8px_#F2C975]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default memo(DrawerNav);
