"use client";

import { useTranslations } from "next-intl";
import FooterPage from "@/shared/components/footer";
import Section from "@/features/home/components/Section";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen pt-32 pb-10 gap-16 w-full">
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h1 className="text-[#F2C975] font-bold text-7xl md:text-9xl mb-4 font-cairo">
          404
        </h1>
        <h2 className="text-white font-bold text-2xl md:text-4xl mb-4 font-cairo">
          {t("title")}
        </h2>
        <p className="text-[#888888] text-base md:text-lg max-w-md mb-8 font-cairo">
          {t("description")}
        </p>
        <Link
          href={`/${locale}`}
          className="bg-[#F2C975] text-black font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all font-cairo"
        >
          {t("backHome")}
        </Link>
      </div>
      <Section id="footer">
        <FooterPage />
      </Section>
    </div>
  );
}
