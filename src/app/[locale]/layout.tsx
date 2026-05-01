import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import AllProviders from "@/shared/providers/AllProviders";
import NavBar from "@/shared/components/nav-bar";
import BackgroundImage from "@/shared/components/background-image/BackgroundImage";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import "../globals.css";


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
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        it: "/it",
        es: "/es",
        pt: "/pt",
        "x-default": "/en",
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
          url: "/icon.png",
          width: 512,
          height: 512,
          alt: "Moonlight Egypt Logo",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
      images: ["/icon.png"],
    },
    // Performance: Preconnect to external asset hosts to reduce LCP discovery time
    other: {
      "dns-prefetch": "https://res.cloudinary.com",
      "preconnect": "https://res.cloudinary.com"
    }

  };
}

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  // Optimization: Using 'variable' allows us to load a single font file for all weights,
  // reducing HTTP requests and total font payload while providing granular control.
  weight: "variable",
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

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

  // PERFORMANCE: Only pass GLOBAL messages to the layout provider.
  // This reduces the initial HTML size (TTFB) and hydration time (TBT).
  // Page-specific messages will be loaded by individual page providers if needed,
  // or simply accessed directly in Server Components.
  // const globalNamespaces = ["navbar", "footer", "loader", "auth"];
  // const globalMessages = Object.fromEntries(
  //   Object.entries(messages).filter(([key]) => globalNamespaces.includes(key))
  // );

  return (
    <html lang={locale} className={`${cairo.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AllProviders>
            <NavBar locale={locale} />
            {children}
            <BackgroundImage />
          </AllProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
