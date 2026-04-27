import { getTranslations } from "next-intl/server";

/**
 * OverviewSection — Server Component
 * Renders the tour description text.
 * Zero client JS — pure server rendering for SEO and performance.
 */
interface OverviewSectionProps {
  description: string;
}

export default async function OverviewSection({
  description,
}: OverviewSectionProps) {
  const t = await getTranslations("packageDetails");

  if (!description) return null;

  return (
    <section aria-labelledby="overview-heading">
      <h2
        id="overview-heading"
        className="text-xl md:text-3xl font-bold text-orange-300 font-cairo mb-3 md:mb-4"
      >
        {t("overview")}
      </h2>
      <p className="text-base md:text-3xl font-medium text-neutral-200 font-cairo leading-relaxed md:leading-10">
        {description}
      </p>
    </section>
  );
}
