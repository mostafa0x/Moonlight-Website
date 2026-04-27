import { getTranslations } from "next-intl/server";

/**
 * IncludedExcludedSection — Server Component
 *
 * Displays what's included and excluded from the tour in a responsive layout.
 * - Mobile: Stacked vertically
 * - Desktop: Side-by-side with equal-width cards
 *
 * Design: Bordered cards with backdrop blur and dot indicators.
 */
interface IncludedExcludedSectionProps {
  included: string[];
  excluded: string[];
}

export default async function IncludedExcludedSection({
  included = [],
  excluded = [],
}: IncludedExcludedSectionProps) {
  const t = await getTranslations("packageDetails");

  return (
    <section aria-labelledby="inclusions-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Included Card */}
        <div className="rounded-[20px] border border-zinc-800 backdrop-blur-sm p-4 md:p-5">
          <h3
            id="inclusions-heading"
            className="text-lg font-medium text-emerald-500 font-cairo tracking-wide mb-3 md:mb-4"
          >
            {t("included")}
          </h3>

          <ul className="space-y-3 md:space-y-4">
            {included.map((item, index) => (
              <li key={`inc-${index}`} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span className="text-neutral-200 text-base md:text-lg font-medium font-cairo leading-6">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded Card */}
        <div className="rounded-[20px] border border-zinc-800 backdrop-blur-sm p-4 md:p-5">
          <h3 className="text-lg font-medium text-rose-500 font-cairo tracking-wide mb-3 md:mb-4">
            {t("excluded")}
          </h3>

          <ul className="space-y-3 md:space-y-4">
            {excluded.map((item, index) => (
              <li key={`exc-${index}`} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span className="text-neutral-200 text-base md:text-lg font-medium font-cairo leading-6">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
