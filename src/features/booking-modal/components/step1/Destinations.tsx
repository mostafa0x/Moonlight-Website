import { memo, useMemo } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import DestinationsItem from "./DestinationsItem";
import useDragScroll from "@/shared/hooks/useDragScroll";

interface DestinationsProps {
  destinations: string[];
}

/**
 * Destinations: A performant horizontal carousel for displaying tour locations.
 * 
 * Optimized for Core Web Vitals:
 * - INP: Uses native snap-x behavior and hardware-accelerated scroll.
 * - FCP/LCP: Minimal layout shift via strict container dimensions.
 * - Accessibility: Uses semantic list (ul/li) and proper ARIA labels.
 */
function Destinations({ destinations = [] }: DestinationsProps) {
  const t = useTranslations("bookingModal.step1");
  const { ref, events } = useDragScroll<HTMLUListElement>("X");

  // Prevent duplicate keys and unnecessary mapping
  const uniqueDestinations = useMemo(() => Array.from(new Set(destinations)), [destinations]);

  if (uniqueDestinations.length === 0) return null;

  return (
    <div className="space-y-2" aria-labelledby="destinations-heading">
      <h3
        id="destinations-heading"
        className="text-[20px] text-[#F2C975] font-semibold tracking-tight leading-tight"
      >
        {t("destinations")}
      </h3>

      <div className="relative group">
        <ul
          ref={ref}
          {...events}
          role="list"
          aria-label="List of destinations"
          className={clsx(
            "grid grid-rows-1 grid-flow-col auto-cols-max gap-4",
            "overflow-x-auto pb-1 cursor-grab active:cursor-grabbing",
            "scroll-smooth snap-x snap-mandatory overscroll-x-contain scrollbar-custom",
            "transition-all duration-300"
          )}
        >
          {uniqueDestinations.map((item) => (
            <li key={item} className="snap-start pt-1">
              <DestinationsItem title={item} />
            </li>
          ))}
        </ul>

        {/* Subtle gradient fading at the edges for premium look and FCP stability hints */}
        <div className="absolute right-0 top-0 bottom-1 w-8 bg-linear-to-l from-black to-transparent pointer-events-none opacity-40 group-hover:opacity-10" />
      </div>
    </div>
  );
}

Destinations.displayName = "Destinations";

export default memo(Destinations);
