import { getTranslations } from "next-intl/server";

/**
 * ItinerarySection — Server Component
 *
 * Displays the tour destinations as a timeline/itinerary.
 * - Mobile: Vertical timeline with connecting line
 * - Desktop: Horizontal timeline with Start/End badges
 *
 * Design matches the provided Figma UI with location pin icons.
 */
interface ItinerarySectionProps {
  destinations: string[];
}

export default async function ItinerarySection({
  destinations = [],
}: ItinerarySectionProps) {
  const t = await getTranslations("packageDetails");

  if (destinations.length === 0) return null;

  return (
    <section aria-labelledby="itinerary-heading">
      <h2
        id="itinerary-heading"
        className="text-xl md:text-3xl font-bold text-orange-300 font-cairo mb-4 md:mb-16"
      >
        {t("itinerary")}
      </h2>

      {/* Desktop Itinerary - Horizontal */}
      <div className="hidden md:block">
        <div className="flex items-center gap-0">
          {/* Start Badge */}
          <div className="shrink-0 px-5 py-1 bg-neutral-900 rounded-[20px] border border-orange-300">
            <span className="text-orange-300 text-base font-medium font-cairo">
              {t("start")}
            </span>
          </div>

          {/* Timeline Line */}
          <div className="flex-1 h-0.5 bg-stone-300 mx-2" />

          {/* Destination Stops */}
          <div className="flex items-center gap-4">
            {destinations.map((dest, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1"
              >
                {/* Location Pin */}
                <div className="w-9 h-9 bg-neutral-900 rounded-full border border-zinc-500 flex items-center justify-center">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="#F2C975"
                    className="w-4 h-5"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 5.25 7.13 11.38 7.44 11.66a.75.75 0 0 0 1.12 0C8.87 19.38 16 13.25 16 8c0-4.42-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                  </svg>
                </div>

                {/* Destination Label */}
                <div className="px-4 py-1.5 bg-neutral-900 rounded-full border border-zinc-500">
                  <span className="text-white text-sm md:text-base font-medium font-cairo whitespace-nowrap">
                    {dest}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Line */}
          <div className="flex-1 h-0.5 bg-stone-300 mx-2" />

          {/* End Badge */}
          <div className="shrink-0 px-5 py-1 bg-neutral-900 rounded-[20px] border border-orange-300">
            <span className="text-orange-300 text-base font-medium font-cairo">
              {t("end")}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Itinerary - Vertical */}
      <div className="md:hidden relative">
        {/* Start Badge */}
        <div className="inline-block px-5 py-1 mb-4 bg-neutral-900 rounded-[20px] border border-orange-300">
          <span className="text-orange-300 text-xl font-medium font-cairo">
            {t("start")}
          </span>
        </div>

        {/* Vertical Timeline */}
        <div className="relative ml-6 pl-10 border-l-2 border-stone-300 space-y-4 pb-4">
          {destinations.map((dest, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* Location Pin (on timeline) */}
              <div className="absolute -left-3.5 w-7 h-7 bg-neutral-900 rounded-full border border-zinc-500 flex items-center justify-center">
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 16 20"
                  fill="#F2C975"
                  className="w-3 h-4"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 5.25 7.13 11.38 7.44 11.66a.75.75 0 0 0 1.12 0C8.87 19.38 16 13.25 16 8c0-4.42-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
              </div>

              {/* Destination Chip */}
              <div className="px-4 py-1 bg-neutral-900 rounded-full border border-zinc-500">
                <span className="text-white text-xs font-medium font-cairo">
                  {dest}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* End Badge */}
        <div className="inline-block px-5 py-1 bg-neutral-900 rounded-[20px] border border-orange-300">
          <span className="text-orange-300 text-xl font-medium font-cairo">
            {t("end")}
          </span>
        </div>
      </div>
    </section>
  );
}
