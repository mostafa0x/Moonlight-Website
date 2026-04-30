import { getTranslations } from "next-intl/server";

/**
 * OverviewSection — Server Component
 * Renders the tour description text.
 * Zero client JS — pure server rendering for SEO and performance.
 */
interface OverviewSectionProps {
  description: string;
  locale: string
}

export default async function OverviewSection({
  description,
  locale
}: OverviewSectionProps) {
  const t = await getTranslations({ locale, namespace: "packageDetails" });

  if (!description) return null;

  return (
    <section aria-labelledby="overview-heading">
      <h2
        id="overview-heading"
        className="text-xl md:text-3xl font-bold text-[#F2C975] font-cairo mb-3 md:mb-4"
      >
        {t("overview")}
      </h2>
      <p className="text-base md:text-3xl font-medium text-zinc-100 font-cairo leading-relaxed md:leading-10">
        {description}
      </p>
    </section>
  );
}
