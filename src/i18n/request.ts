import { cookies, headers } from "next/headers";
import { getRequestConfig, getLocale } from "next-intl/server";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value || "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
