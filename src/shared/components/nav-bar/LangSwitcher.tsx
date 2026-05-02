"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LANGUAGES } from "@/features/navigation/constants/languages";
import { cn } from "@/shared/lib/utils";

export default function LangSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  const currentLang = useMemo(
    () => LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0],
    [locale]
  );

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      if (!pathname) return;
      const segments = pathname.split("/");
      segments[1] = newLocale;
      const newPath = segments.join("/");
      router.push(newPath);
      setIsOpen(false);
    },
    [pathname, router]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (desktopRef.current && !desktopRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center" ref={desktopRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
      >
        <span className="text-lg transition-transform group-hover:scale-110">
          {currentLang.flag}
        </span>
        <span className="text-xs font-bold uppercase tracking-widest">
          {currentLang.code}
        </span>
        <img
          src="/icons/arrow-down.svg"
          alt=""
          className={cn(
            "w-2.5 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
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
              <span className="text-xl transition-transform group-hover:scale-110">
                {lang.flag}
              </span>
              <span className="flex-1 text-left">{lang.name}</span>
              {locale === lang.code && (
                <div className="h-2 w-2 rounded-full bg-[#F2C975] shadow-[0_0_12px_#F2C975]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
