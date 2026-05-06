import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import FooterPage from "@/shared/components/footer";
import Section from "@/features/home/components/Section";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "contact" });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    keywords: t.raw("keywords"),

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/contact`,
      languages: {
        en: "/en/contact",
        fr: "/fr/contact",
        es: "/es/contact",
        it: "/it/contact",
        pt: "/pt/contact",
      },
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/contact`,
      siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
      locale: locale,

      images: [
        {
          url: "/icon.png",
          width: 512,
          height: 512,
          alt: `Contact ${process.env.NEXT_PUBLIC_WEBSITE_NAME} Egypt Tours`,
        },
      ],
    },

    twitter: {
      card: "summary",
      title,
      description,
      images: ["/icon.png"],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" })

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-32 pb-10 gap-16">
      <div className="flex flex-col items-center h-full px-6 md:px-12 py-9 gap-3 md:gap-6 bg-black w-[95%] md:w-157 mx-auto rounded-[20px]">
        <h1 className="text-white text-center font-bold text-4xl mb-5.5">
          {t("title").split(" ")[0]}{" "}
          <span className="text-[#F2C975]">{t("title").split(" ")[1]}</span>
        </h1>

        <h2 className="text-[#8B8B8B] text-center font-medium text-base px-7.5 lg:px-20">
          {t("headline")}
        </h2>

        {/* Phone + Email */}
        <div className="flex flex-col items-start lg:flex-row gap-3 lg:gap-43.75 w-full justify-start">
          <a
            href="tel:201022500171"
            className="flex items-center gap-3.5 mt-3.5 text-[#8B8B8B] font-medium text-[14px] hover:text-white transition-colors"
          >
            <img src="/icons/phone.svg" alt="phone" loading="lazy" fetchPriority="low" />
            <span>{t("phone")}: +201022500171</span>
          </a>

          <a
            href="mailto:moonlightegypttours@gmail.com"
            className="flex items-center gap-3.5 mt-3.5 text-[#8B8B8B] font-medium text-[14px] hover:text-white transition-colors"
          >
            <img src="/icons/mail.svg" alt="email" loading="lazy" fetchPriority="low" />
            <span>{t("email")}: moonlightegypttours@gmail.com</span>
          </a>
        </div>

        {/* Form Container */}
        <ContactForm />
      </div>
      <Section id="footer">
        <FooterPage />
      </Section>
    </div>
  );
}
