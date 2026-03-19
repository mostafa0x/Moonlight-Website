import { getTranslations } from "next-intl/server";
import CustomTextarea from "@/features/booking-modal/components/step3/CustomTextarea";
import CustomInput from "@/shared/custom-input";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
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
          url: "/images/og-contact.jpg",
          width: 1200,
          height: 630,
          alt: `Contact ${process.env.NEXT_PUBLIC_WEBSITE_NAME} Egypt Tours`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-contact.jpg"],
    },
  };
}
export default async function Page() {
  const t = await getTranslations("contact");

  return (
    <div className="flex justify-center items-center w-full h-full pt-20 px-6.25 pb-7.5">
      <div className="flex flex-col h-full px-6.25 py-9 gap-3 md:gap-6 bg-black w-107 md:w-157 rounded-[20px]">
        <h1 className="text-white text-center font-bold text-4xl mb-5.5">
          {t("title").split(" ")[0]}{" "}
          <span className="text-[#F2C975]">{t("title").split(" ")[1]}</span>
        </h1>

        <h2 className="text-[#8B8B8B] text-center font-medium text-base px-7.5 lg:px-20">
          {t("headline")}
        </h2>

        {/* Phone + Email */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-43.75">
          <a
            href="tel:0212031212"
            className="flex items-center gap-3.5 mt-3.5 text-[#8B8B8B] font-medium text-[14px] hover:text-white transition-colors"
          >
            <img src="/icons/phone.svg" alt="phone" />
            <span>{t("phone")}: 0212031212</span>
          </a>

          <a
            href="mailto:echo@gmail.com"
            className="flex items-center gap-3.5 mt-3.5 text-[#8B8B8B] font-medium text-[14px] hover:text-white transition-colors"
          >
            <img src="/icons/mail.svg" alt="email" />
            <span>{t("email")}: echo@gmail.com</span>
          </a>
        </div>

        {/* Form */}
        <div className="space-y-5.25">
          <div className="flex flex-row gap-2.5">
            <CustomInput
              label={t("form.firstName")}
              name="firstName"
              type="text"
              placeholder={t("form.firstName")}
            />

            <CustomInput
              label={t("form.lastName")}
              name="lastName"
              type="text"
              placeholder={t("form.lastName")}
            />
          </div>

          <CustomInput
            label={t("form.emailAddress")}
            name="email"
            type="email"
            placeholder={t("form.emailAddress")}
          />

          <CustomTextarea
            name="message"
            label={t("form.message")}
            placeholder={t("form.message")}
          />

          <button
            aria-label="send message contact us"
            className="bg-[#F2C975] hover:bg-[#b69555] text-base rounded-[10px] px-6 py-1.75 cursor-pointer text-black font-medium"
          >
            {t("form.send")}
          </button>
        </div>
      </div>
    </div>
  );
}
