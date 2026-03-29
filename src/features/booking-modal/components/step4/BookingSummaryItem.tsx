import { memo } from "react";

/**
 * BookingSummaryItem: Premium display component for individual summary rows.
 * 
 * Performance: Memoized to prevent re-renders when other list items update.
 * UI/UX Support: 
 * - Handles long text (e.g. package names) gracefully by allowing wrapping 
 *   within a fixed width ratio and aligning text to the right for clear reading.
 */
function BookingSummaryItem({ label, hint }: { label: string; hint: any }) {
  const displayHint = hint || "---";

  return (
    <div className="flex flex-row justify-between items-start gap-3">
      {/* Label: Fixed width or shrink-0 to prevent being crushed by long values */}
      <h2 className="text-sm text-[#8B8B8B] font-medium shrink-0 whitespace-nowrap">
        {label}
      </h2>

      {/* Value (Hint): Allows wrapping for long names while maintaining right alignment */}
      <span className="text-sm text-white font-medium text-right leading-snug break-words max-w-[65%]">
        {displayHint}
      </span>
    </div>
  );
}

BookingSummaryItem.displayName = "BookingSummaryItem";

export default memo(BookingSummaryItem);
