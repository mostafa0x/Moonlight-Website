import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "@/i18n/config";

export default getRequestConfig(async ({ locale }) => {
  // Validate locale or fallback to default
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
