import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import FooterPage from "@/shared/components/footer";
import Section from "@/features/home/components/Section";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "privacy" });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,

    keywords: [
      "Moonlight privacy policy",
      "Egypt tours privacy policy",
      "tour booking privacy policy",
      "Moonlight travel privacy",
      "data protection Egypt tours",
    ],

    openGraph: {
      title,
      description,
      type: "website",
      locale: locale,
      siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/privacy`,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/privacy`,
      languages: {
        en: "/en/privacy",
        fr: "/fr/privacy",
        es: "/es/privacy",
        it: "/it/privacy",
        pt: "/pt/privacy",
      },
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-32 pb-10 gap-16">
      <div className="flex flex-col px-6-25 py-9 gap-4 md:gap-6 bg-black w-107 md:w-157 rounded-lg">
        <h1 className="text-[#F2C975] font-bold text-4xl mb-5.5">
          {t("title")}
        </h1>

        <span className="text-base text-[#888888] flex justify-end">
          {t("effectiveDate")}
        </span>

        <h2 className="text-white font-semibold text-base">{t("intro")}</h2>

        {/* Information We Collect */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("collect.title")}
          </h3>

          <p className="text-[#888888] text-sm">{t("collect.intro")}</p>

          <ul className="list-disc pl-5 text-[#888888] text-sm flex flex-col gap-1">
            <li>{t("collect.identification")}</li>
            <li>{t("collect.contact")}</li>
            <li>{t("collect.travel")}</li>
          </ul>
        </div>

        {/* How We Use Data */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("use.title")}
          </h3>

          <p className="text-[#888888] text-sm">{t("use.intro")}</p>

          <ul className="list-disc pl-5 text-[#888888] text-sm flex flex-col gap-1">
            {t.raw("use.items").map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Security */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("security.title")}
          </h3>

          <ul className="list-disc pl-5 text-[#888888] text-sm flex flex-col gap-1">
            <li>{t("security.noSharing")}</li>
            <li>{t("security.providers")}</li>
            <li>{t("security.protection")}</li>
          </ul>
        </div>

        {/* Log Files */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("logs.title")}
          </h3>

          <p className="text-[#888888] text-sm">{t("logs.text")}</p>
        </div>

        {/* Rights */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("rights.title")}
          </h3>

          <ul className="list-disc pl-5 text-[#888888] text-sm flex flex-col gap-1">
            {t.raw("rights.items").map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Consent */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("consent.title")}
          </h3>

          <p className="text-[#888888] text-sm">{t("consent.text")}</p>
        </div>
      </div>

      <Section id="footer">
        <FooterPage />
      </Section>
    </div>
  );
}
