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

    keywords: t.raw("keywords"),

    openGraph: {
      title,
      description,
      type: "website",
      locale: locale,
      siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/privacy`,
    },

    twitter: {
      card: "summary",
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
    <div className="flex flex-col items-center w-full min-h-screen pt-32 pb-10 gap-16 animate-fade-up animate-once animate-duration-800 animate-ease-out">
      <div className="flex flex-col text-left items-start px-6 md:px-12 py-9 gap-6 bg-black w-[95%] md:w-157 mx-auto rounded-lg">
        <h1 className="text-[#F2C975] font-bold text-4xl self-center mb-2">
          {t("title")}
        </h1>

        <span className="text-base text-[#888888] self-end">
          {t("lastUpdated")}
        </span>

        {/* Intro */}
        <div className="flex flex-col gap-2">
          {t.raw("intro").map((paragraph: string, i: number) => (
            <p key={i} className="text-white font-medium text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-2 w-full mt-4">
          <h2 className="text-[#F2C975] font-semibold text-2xl mb-2">
            {t("summaryTitle")}
          </h2>
          <p className="text-[#888888] text-base mb-2">
            {t("summaryIntro")}
          </p>
          <ul className="list-disc pl-5 text-[#888888] text-base flex flex-col gap-2">
            {t.raw("summaryItems").map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        {t.raw("sections").map((section: { title: string; content: string[] }, i: number) => (
          <div key={i} className="flex flex-col gap-3 w-full mt-6">
            <h3 className="text-[#F2C975] font-semibold text-xl">
              {section.title}
            </h3>
            <div className="flex flex-col gap-2">
              {section.content.map((paragraph: string, j: number) => {
                const isBullet = paragraph.startsWith("• ");
                if (isBullet) {
                  return (
                    <ul key={j} className="list-disc pl-5 text-[#888888] text-sm">
                      <li>{paragraph.substring(2)}</li>
                    </ul>
                  );
                }
                return (
                  <p key={j} className="text-[#888888] text-sm leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Section id="footer">
        <FooterPage />
      </Section>
    </div>
  );
}
