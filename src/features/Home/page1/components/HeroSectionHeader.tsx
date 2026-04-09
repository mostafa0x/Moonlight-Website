import { getTranslations } from "next-intl/server";
import HeroContent from "./HeroContent";

/**
 * HeroSectionHeader Component - Server Component
 * Fetches translations on the server for optimal LCP and SEO.
 * Delegates animations to the HeroContent client component.
 */
export default async function HeroSectionHeader({ locale }: { locale: string }) {
  // Fetch translations server-side
  const t = await getTranslations({ locale, namespace: "home.hero" });

  return (
    <HeroContent
      title={t("title")}
      subtitle={t("subtitle")}
      journey={t("journey")}
    />
  );
}
