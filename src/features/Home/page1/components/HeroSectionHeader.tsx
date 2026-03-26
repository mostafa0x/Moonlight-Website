"use client";
import { useTranslations } from "next-intl";
import { memo } from "react";

function HeroSectionHeader() {
  const t = useTranslations("home.hero");
  return (
    <div className="flex flex-col w-full h-full justify-center items-center z-5 gap-[5px] tracking-[1px] select-none px-[29px] md:px-0">
      <h2 className="text-[32px] sm:text-4xl  md:text-5xl font-cairo font-bold md:font-medium text-white drop-shadow-[0_4px_10px_rgba(255,237,187,0.9)]">
        {t("title")}
      </h2>
      <h1 className="text-[32px] sm:text-4xl md:text-5xl text-center  max-w-[300px] md:max-w-full  font-cairo font-bold md:font-medium text-white drop-shadow-[0_4px_10px_rgba(255,237,187,0.9)]">
        {t("subtitle")}
      </h1>
    </div>
  );
}

export default memo(HeroSectionHeader);
