import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("about");

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
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/about`,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/about`,
      languages: {
        en: "/en/about",
        fr: "/fr/about",
        es: "/es/about",
        it: "/it/about",
        pt: "/pt/about",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  console.log(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  return (
    <div className="flex justify-center items-center w-full h-full pt-20 px-6.25 pb-7.5">
      <div className="flex flex-col h-full px-6.25 py-9 gap-6 scrollbar-custom overflow-y-auto bg-black w-107 md:w-157">
        <h1 className="text-[#F2C975] font-bold text-4xl">{t("title")}</h1>

        <h2 className="text-white font-semibold text-base">{t("subtitle")}</h2>

        {/* Who */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("who.title")}
          </h3>

          <p className="text-[#888888] text-sm md:text-base">{t("who.text")}</p>
        </div>

        {/* What */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("what.title")}
          </h3>

          <p className="text-[#888888] text-sm md:text-base">
            {t("what.intro")}
          </p>

          <ul className="list-disc pl-5 text-[#888888] text-sm md:text-base flex flex-col gap-1">
            {t.raw("what.items").map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Why */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("why.title")}
          </h3>

          <p className="text-[#888888] text-sm md:text-base">{t("why.text")}</p>
        </div>
      </div>
    </div>
  );
}
