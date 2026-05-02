import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
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

/**
 * Root Layout — The single source of truth for <html> and <body>.
 * 
 * - Fonts and globals.css are loaded here once for all routes.
 * - The [locale] layout is nested inside and handles providers/navbar.
 * - The root not-found.tsx also inherits this shell (no more nested html).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cairo.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
