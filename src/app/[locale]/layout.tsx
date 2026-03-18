import { Cairo } from "next/font/google";
import AllProviders from "@/shared/providers/AllProviders";
import NavBar from "@/shared/components/nav-bar";
import BackgroundImage from "@/shared/components/background-image/BackgroundImage";
import { NextIntlClientProvider } from "next-intl";

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
  const { locale } = await params;

  return (
    <html lang={locale} className={`${cairo.variable} scrollbar-hide`}>
      <body>
        <NextIntlClientProvider>
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
