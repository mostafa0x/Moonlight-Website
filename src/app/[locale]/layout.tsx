import AllProviders from "@/shared/providers/AllProviders";
import NavBar from "@/shared/components/nav-bar";
import BackgroundImage from "@/shared/components/background-image/BackgroundImage";
import SetHtmlLang from "@/shared/components/SetHtmlLang";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";


export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "fr" },
    { locale: "it" },
    { locale: "es" },
    { locale: "pt" },
  ];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "layout" });

  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${t("title")}`,
      default: t("title"),
    },
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: `/${locale}`,   // ✅ Each locale page is its own canonical
      languages: {
        en: "/en",
        fr: "/fr",
        it: "/it",
        es: "/es",
        pt: "/pt",
        "x-default": "/en",     // ✅ x-default = default language (since "/" redirects to "/en")
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "./",
      siteName: "Moonlight Egypt",
      locale: locale,
      type: "website",
      images: [
        {
          url: `${baseUrl}/icon.png`,
          width: 512,
          height: 512,
          alt: "Moonlight Egypt Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/icon.png`],
    },
    verification: {
      google: "googlec06bd032c1c83941",
    },
    // Performance: Preconnect to external asset hosts to reduce LCP discovery time
    other: {
      "dns-prefetch": "https://res.cloudinary.com",
      "preconnect": "https://res.cloudinary.com"
    }

  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = (await params);
  setRequestLocale(locale);

  const supportedLocales = ["en", "fr", "it", "es", "pt"];
  if (!supportedLocales.includes(locale)) {
    redirect("/en");
  }

  const messagesMap: any = {
    en: () => import("../../../messages/en.json"),
    fr: () => import("../../../messages/fr.json"),
    it: () => import("../../../messages/it.json"),
    es: () => import("../../../messages/es.json"),
    pt: () => import("../../../messages/pt.json"),
  };

  const messages = (await messagesMap[locale]()).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Update <html lang=""> to match the current locale */}
      <SetHtmlLang locale={locale} />
      <AllProviders>
        <BackgroundImage />
        <NavBar locale={locale} />
        {children}
      </AllProviders>
    </NextIntlClientProvider>
  );
}

