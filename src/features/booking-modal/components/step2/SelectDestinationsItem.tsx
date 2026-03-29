"use client";

import { memo } from "react";
import clsx from "clsx";

interface SelectDestinationsItemProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}

/**
 * SelectDestinationsItem: A "dumb" presentational component for a single destination option.
 * 
 * Optimized for Vercel React Best Practices:
 * - INP: Minimal logic ensuring fast interaction.
 * - Re-renders: Wrapped in memo to prevent unnecessary renders when other items in the group change.
 * - Accessibility: Uses semantic button and clear aria-label/checked state.
 */
function SelectDestinationsItem({
  label,
  isSelected,
  onToggle,
}: SelectDestinationsItemProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      aria-label={`Select ${label}`}
      onClick={onToggle}
      className={clsx(
        "flex flex-row items-center p-1.5 h-10.25 min-w-25 w-fit border rounded-[5px] gap-1.5 select-none cursor-pointer transition-all duration-200",
        "bg-[#131313] hover:border-[#F2C975]",
        isSelected ? "border-[#F2C975] shadow-[0_0_10px_rgba(242,201,117,0.1)]" : "border-[#313131]"
      )}
    >
      <div className={clsx(
        "flex items-center justify-center w-4.75 h-4.75 rounded-xs transition-colors",
        isSelected ? "bg-[#F2C975]" : "bg-white"
      )}>
        {isSelected && (
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="black" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span className={clsx(
        "text-sm truncate font-medium",
        isSelected ? "text-[#F2C975]" : "text-white"
      )}>
        {label}
      </span>
    </button>
  );
}

SelectDestinationsItem.displayName = "SelectDestinationsItem";

export default memo(SelectDestinationsItem);
