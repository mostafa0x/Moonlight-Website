"use client";

import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

const languageNames: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
};

const options = Object.keys(languageNames);

/**
 * TourLanguageSelector: A styled native HTML select for guaranteed guide language visibility.
 * 
 * Optimized for Vercel React Best Practices:
 * - Reliability: Native select options always appear on top of all DOM containers.
 * - Performance: Minimal state, using standard register() for fast I/O.
 * - Accessibility: Native elements provide the best screen reader support out of the box.
 */
function TourLanguageSelector() {
  const t = useTranslations("bookingModal.step2");
  const { register } = useFormContext();
  const name = "tourguideLanguage";

  return (
    <div className="relative w-full flex flex-col gap-2">
      <label htmlFor={name} className="text-base text-[#8B8B8B] font-medium px-1 select-none">
        {t("guideLanguage")}
      </label>
      
      <div className="relative group">
        <select
          id={name}
          {...register(name)}
          className="w-full h-15 bg-[#131313] border border-[#313131] rounded-2xl px-4 text-white text-lg font-semibold cursor-pointer appearance-none transition-all duration-200 hover:border-[#F2C975]/30 focus:outline-none focus:ring-1 focus:ring-[#F2C975]/30"
          defaultValue="en"
        >
          {options.map((item) => (
            <option key={item} value={item} className="bg-[#131313] text-white py-2">
              {languageNames[item]} ({item.toUpperCase()})
            </option>
          ))}
        </select>

        {/* Custom Chevron icon to maintain premium look while using native select */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8B8B8B] group-hover:text-[#F2C975] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

TourLanguageSelector.displayName = "TourLanguageSelector";

export default memo(TourLanguageSelector);
