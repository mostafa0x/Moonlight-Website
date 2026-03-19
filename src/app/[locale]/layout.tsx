import { Cairo } from "next/font/google";
import AllProviders from "@/shared/providers/AllProviders";
import NavBar from "@/shared/components/nav-bar";
import BackgroundImage from "@/shared/components/background-image/BackgroundImage";
import { NextIntlClientProvider } from "next-intl";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "fr" },
    { locale: "it" },
    { locale: "es" },
    { locale: "pt" },
  ];
}

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = (await params) as {
    locale: "en" | "fr" | "it" | "es" | "pt";
  };
  const messagesMap = {
    en: () => import("../../../messages/en.json"),
    fr: () => import("../../../messages/fr.json"),
    it: () => import("../../../messages/it.json"),
    es: () => import("../../../messages/es.json"),
    pt: () => import("../../../messages/pt.json"),
  };

  const messages = (await messagesMap[locale]()).default;
  return (
    <html lang={locale} className={`${cairo.variable} scrollbar-hide`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AllProviders>
            <NavBar />
            {children}
            <BackgroundImage />
          </AllProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
