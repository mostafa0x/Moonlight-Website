"use client";

import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";

const languageNames: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
};

const options = Object.keys(languageNames);

/**
 * TourLanguageSelector: A fully controlled styled native HTML select for guide language selection.
 * 
 * Optimized for Vercel React Best Practices:
 * - Reliability: Fully synchronized with react-hook-form state via useWatch to support seamless persistence.
 * - Accessibility: Native elements provide robust screen reader support out of the box.
 */
function TourLanguageSelector() {
  const t = useTranslations("bookingModal.step2");
  const { register, setValue, control } = useFormContext();
  const name = "tourguideLanguage";
  const registered = register(name);

  // Use watch to make the select controlled, ensuring it stays in sync with form state across reloads
  const currentValue = useWatch({
    control,
    name,
    defaultValue: "en",
  });

  return (
    <div className="relative w-full flex flex-col gap-2 select-none">
      <label htmlFor={name} className="text-base text-[#8B8B8B] font-medium px-1">
        {t("guideLanguage")}
      </label>

      <div className="relative group">
        <select
          id={name}
          {...registered}
          value={currentValue}
          onChange={async (e) => {
            const newValue = e.target.value;
            // 1. Update the form state immediately and wait for it
            setValue(name, newValue, { shouldValidate: true, shouldDirty: true });

            // 2. Execute original register onChange to trigger form subscription callbacks
            await registered.onChange(e);
          }}
          className="w-full h-15 bg-[#131313] border border-[#313131] rounded-2xl px-4 text-white text-lg font-semibold cursor-pointer appearance-none transition-all duration-200 hover:border-[#F2C975]/30 focus:outline-none focus:ring-1 focus:ring-[#F2C975]/30"
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
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

TourLanguageSelector.displayName = "TourLanguageSelector";

export default memo(TourLanguageSelector);
