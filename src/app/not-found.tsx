import BackgroundImage from "@/shared/components/background-image/BackgroundImage";
import FooterPage from "@/shared/components/footer";
import Section from "@/features/home/components/Section";
import NavBar from "@/shared/components/nav-bar";
import AllProviders from "@/shared/providers/AllProviders";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../messages/en.json";
import Link from "next/link";

/**
 * Global Not Found — Catches 404s for URLs without a locale prefix.
 * 
 * No <html>/<body> here — the root layout.tsx provides them.
 * We wrap with AllProviders so NavBar can access AuthProvider context.
 * We read text from the imported JSON directly (no useTranslations hook).
 */
export default function GlobalNotFound() {
  return (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <AllProviders>
        <BackgroundImage />
        <NavBar locale="en" />
        <div className="flex flex-col items-center justify-between min-h-screen pt-32 pb-10 gap-16 w-full">
          <div className="flex flex-col items-center justify-center grow text-center px-4">
            <h1 className="text-[#F2C975] font-bold text-7xl md:text-9xl mb-4 font-cairo">
              404
            </h1>
            <h2 className="text-white font-bold text-2xl md:text-4xl mb-4 font-cairo">
              {enMessages.notFound.title}
            </h2>
            <p className="text-[#888888] text-base md:text-lg max-w-md mb-8 font-cairo">
              {enMessages.notFound.description}
            </p>
            <Link
              href="/en"
              className="bg-[#F2C975] text-black font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all font-cairo"
            >
              {enMessages.notFound.backHome}
            </Link>
          </div>
          <Section id="footer">
            <FooterPage />
          </Section>
        </div>
      </AllProviders>
    </NextIntlClientProvider>
  );
}
