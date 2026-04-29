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
  const t = await getTranslations({ locale, namespace: "terms" });

  const title = t("title");
  const description = t("description");
  const keywords = t.raw("keywords");

  return {
    title,
    description,
    keywords,

    openGraph: {
      title,
      description,
      type: "website",
      locale: locale,
      siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/terms`,
      languages: {
        en: "/en/terms",
        fr: "/fr/terms",
        es: "/es/terms",
        it: "/it/terms",
        pt: "/pt/terms",
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-32 pb-10 gap-16">
      <div className="flex flex-col px-6-25 py-9 gap-4 md:gap-6 bg-black w-107 md:w-157 rounded-lg">
        <h1 className="text-[#F2C975] font-bold text-4xl mb-5.5">
          {t("title")}
        </h1>

        <span className="text-base text-[#888888] flex justify-end">
          {t("lastUpdated")}
        </span>

        <h2 className="text-white font-semibold text-base">{t("intro")}</h2>

        {/* Booking */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("booking.title")}
          </h3>

          <ul className="list-disc pl-5 text-[#888888] text-sm flex flex-col gap-1">
            <li>
              <span className="text-white font-medium">Currency:</span>{" "}
              {t("booking.currency")}
            </li>

            <li>
              <span className="text-white font-medium">Payment Gateway:</span>{" "}
              {t("booking.paymentGateway")}
            </li>

            <li>
              <span className="text-white font-medium">Confirmation:</span>{" "}
              {t("booking.confirmation")}
            </li>
          </ul>
        </div>

        {/* Cancellation */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("cancellation.title")}
          </h3>

          <p className="text-[#888888] text-sm">{t("cancellation.intro")}</p>

          <ul className="list-disc pl-5 text-[#888888] text-sm flex flex-col gap-1">
            <li>
              <span className="text-white font-medium">
                Same-Day & 24-Hour Cancellations:
              </span>{" "}
              {t("cancellation.sameDay")}
            </li>

            <li>
              <span className="text-white font-medium">
                Advance Cancellations:
              </span>{" "}
              {t("cancellation.advance")}
            </li>

            <li>
              <span className="text-white font-medium">Force Majeure:</span>{" "}
              {t("cancellation.forceMajeure")}
            </li>
          </ul>
        </div>

        {/* Refund */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("refunds.title")}
          </h3>

          <p className="text-[#888888] text-sm">{t("refunds.text1")}</p>
          <p className="text-[#888888] text-sm">{t("refunds.text2")}</p>
        </div>

        {/* Itinerary */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("itinerary.title")}
          </h3>

          <p className="text-[#888888] text-sm">{t("itinerary.text")}</p>
        </div>

        {/* Insurance */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("insurance.title")}
          </h3>

          <p className="text-[#888888] text-sm">{t("insurance.text1")}</p>
          <p className="text-[#888888] text-sm">{t("insurance.text2")}</p>
        </div>

        {/* Conduct */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            {t("conduct.title")}
          </h3>

          <p className="text-[#888888] text-sm">{t("conduct.text")}</p>
        </div>
      </div>
      <Section id="footer">
        <FooterPage />
      </Section>
    </div>
  );
}
