import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const locales = ["en", "fr", "it", "es", "pt"];
  
  // Validate locale or fallback to "en"
  if (!locale || !locales.includes(locale)) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
