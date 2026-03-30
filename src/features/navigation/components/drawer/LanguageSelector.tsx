"use client";

import { memo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { LANGUAGES } from "../../constants/languages";

interface LanguageSelectorProps {
  currentLocale: string;
  onClose: () => void;
}

/**
 * LanguageSelector - Language choice grid in the mobile drawer.
 * Memoized to prevent re-renders when parent state changes (e.g. drawer open/close).
 */
function LanguageSelector({ currentLocale, onClose }: LanguageSelectorProps) {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const router = useRouter();

  // useCallback prevents recreation of this function on every render → improves INP
  const handleLanguageChange = useCallback((newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    onClose();
  }, [pathname, router, onClose]);

  return (
    <div className="border-t border-white/10 pt-4 pb-10">
      <h3 className="mb-4 font-cairo text-[10px] font-bold uppercase tracking-widest text-white/30">
        {t("language") || "Language"}
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 transition-all hover:bg-white/10 active:scale-95 cursor-pointer",
              currentLocale === lang.code && "border-[#F2C975]/30 bg-[#F2C975]/5 text-[#F2C975]"
            )}
          >
            <span className="text-sm">{lang.flag}</span>
            <span className="text-[10px] font-bold uppercase">{lang.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(LanguageSelector);
