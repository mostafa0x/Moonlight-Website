import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import BackgroundImage from "@/shared/components/background-image/BackgroundImage";
import NotFoundPage from "./[locale]/not-found";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../messages/en.json";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: "variable",
  variable: "--font-cairo",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${cairo.variable} ${jakarta.variable}`}>
      <body>
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <BackgroundImage />
          <NotFoundPage />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
