"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

interface DrawerNavProps {
  onClose: () => void;
  locale: string;
  isOpen: boolean;
}

/**
 * DrawerNav - Navigation links for the mobile drawer.
 */
function DrawerNav({ onClose, locale, isOpen }: DrawerNavProps) {
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
  );
}

export default memo(DrawerNav);
