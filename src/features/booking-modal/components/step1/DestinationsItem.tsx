import { memo } from "react";

interface DestinationsItemProps {
  title: string;
}

/**
 * Single Destination Item within the list.
 */
function DestinationsItem({ title }: DestinationsItemProps) {
  return (
    <article
      className="flex items-center gap-2 p-2 px-4 bg-[#1A1A1A] hover:bg-[#252525] border border-[#343434] rounded-full transition-all duration-200 select-none group"
      title={title}
    >
      <img
        src="/icons/location-outlined.svg"
        alt="location"
        width={16}
        height={16}
        className="opacity-70 group-hover:opacity-100 transition-opacity"
      />
      <span className="text-sm text-white font-medium whitespace-nowrap">
        {title}
      </span>
    </article>
  );
}

export default memo(DestinationsItem);
