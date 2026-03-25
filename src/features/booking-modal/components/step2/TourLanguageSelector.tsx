"use client";

import useClickOutside from "@/shared/hooks/useClickOutside";
import { memo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

const languageNames: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
};

const options = Object.keys(languageNames);

function TourLanguageSelector() {
  const t = useTranslations("bookingModal.step2");
  const [open, setOpen] = useState(false);
  const name = "tourguideLanguage";
  const { containerRef } = useClickOutside(() => setOpen(false));

  const { control } = useFormContext();
  const {
    field: { value = "en", onChange },
  } = useController({ name, control, defaultValue: "en" });

  return (
    <div ref={containerRef} className="relative w-full select-none flex flex-col gap-1 ">
      <label className="text-base text-[#8B8B8B] font-medium select-none">
        {t("guideLanguage")}
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="bg-[#131313] text-[18px] text-white font-semibold cursor-pointer w-full h-14 rounded-2xl border border-[#313131] pl-3.5 pr-10 flex items-center"
        >
          <span className="opacity-60 text-sm mr-2 font-normal uppercase">{value}</span>
          {languageNames[value]}
        </button>

        <img
          src="/icons/arrow-down.svg"
          alt="arrow down"
          className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />

        <div
          className={`
          absolute top-full mt-2 w-full bg-[#131313] border border-[#313131] rounded-2xl overflow-hidden z-50
          transform transition-all duration-200 origin-top
          ${
            open
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          }
        `}
        >
          {options.map((item) => (
            <div
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="px-3.5 py-4 text-white text-[18px] cursor-pointer hover:bg-[#1f1f1f] transition-colors flex items-center justify-between"
            >
              <span>{languageNames[item]}</span>
              <span className="text-sm opacity-40 uppercase font-mono">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(TourLanguageSelector);
