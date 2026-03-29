import { memo } from "react";
import Image from "next/image";

interface DestinationsItemProps {
  title: string;
}

/**
 * DestinationsItem: Atomic component for displaying a location tag.
 * 
 * Optimized for Core Web Vitals:
 * - FCP/LCP: Inline width/height on Image for layout stability.
 * - INP: Targeted CSS transitions (opacity, background) to minimize style re-calc.
 * - Performance: Wrapped in memo to prevent re-renders when parent scroll state updates.
 */
function DestinationsItem({ title }: DestinationsItemProps) {
  return (
    <article
      className="flex items-center gap-2 p-2 px-4 bg-[#1A1A1A] hover:bg-[#252525] border border-[#343434] rounded-full transition-[background-color,border-color] duration-200 select-none group cursor-pointer"
      title={title}
      role="listitem"
    >
      <div className="shrink-0 flex items-center justify-center">
        <Image
          src="/icons/location-outlined.svg"
          alt="" // Decorative icon, hide from screen readers
          aria-hidden="true"
          width={16}
          height={16}
          loading="lazy"
          className="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
      <span className="text-sm text-white font-medium whitespace-nowrap leading-none pt-0.5">
        {title}
      </span>
    </article>
  );
}

DestinationsItem.displayName = "DestinationsItem";

export default memo(DestinationsItem);
