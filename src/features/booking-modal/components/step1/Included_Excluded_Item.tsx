import { memo } from "react";

interface IncludedExcludedItemProps {
  title: string;
  icon: "red" | "green";
}

/**
 * A highly optimized leaf component for rendering list items in progress/inclusion lists.
 * Wrapped in memo to prevent re-renders when parent lists are scrolled or filtered.
 */
function Included_Excluded_Item({ title, icon }: IncludedExcludedItemProps) {
  return (
    <div
      className="flex flex-row items-center gap-3.5 select-none transition-opacity hover:opacity-80"
      title={title}
      role="listitem"
    >
      <div className="flex-shrink-0">
        <img
          src={`/icons/ellipse-${icon}.svg`}
          alt="" 
          aria-hidden="true"
          className="w-1.75 h-1.75 object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-sm text-[#E0E0E0] font-medium leading-tight">
        {title}
      </span>
    </div>
  );
}

Included_Excluded_Item.displayName = "Included_Excluded_Item";

export default memo(Included_Excluded_Item);
