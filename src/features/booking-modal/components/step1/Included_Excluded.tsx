import Included_Excluded_Item from "@/features/booking-modal/components/step1/Included_Excluded_Item";
import useDragScroll from "@/shared/hooks/useDragScroll";
import { memo, useMemo } from "react";
import { useTranslations } from "next-intl";

interface IncludedExcludedProps {
  included: string[];
  excluded: string[];
}

/**
 * Optimized list for showing tour inclusions and exclusions.
 * Uses DragScroll for desktop and native scrolling for mobile devices.
 */
function Included_Excluded({
  included = [],
  excluded = [],
}: IncludedExcludedProps) {
  const t = useTranslations("bookingModal.step1");
  const { ref, events } = useDragScroll("Y");

  // Memoize counts for UI logic to prevent re-calculations during scrolling
  const hasIncluded = useMemo(() => included.length > 0, [included.length]);
  const hasExcluded = useMemo(() => excluded.length > 0, [excluded.length]);

  return (
    <div 
      className="w-full h-95 sm:h-95 md:h-80 xl:h-80 bg-[#131313] border border-[#313131] p-2.5 rounded-[20px] shadow-sm overflow-hidden"
    >
      <div
        ref={ref}
        {...events}
        className="h-full overflow-y-auto scrollbar-custom pr-1.5 cursor-grab active:cursor-grabbing select-none"
      >
        {/* Header Grid: Synchronized Titles */}
        <div className="grid grid-cols-2 px-5 gap-4 sticky top-0 bg-[#131313] z-10 py-4.75 border-b border-[#313131]/20">
          <div className="flex flex-row gap-1.25 items-center">
            <img src="/icons/check.svg" alt="" width={18} height={18} aria-hidden="true" />
            <h3 className="text-base text-[#00D26A] font-semibold tracking-wide uppercase">
              {t("included")}
            </h3>
          </div>

          <div className="flex flex-row gap-1.25 items-center">
            <img src="/icons/minus.svg" alt="" width={18} height={18} aria-hidden="true" />
            <h3 className="text-base text-[#FF5454] font-semibold tracking-wide uppercase">
              {t("excluded")}
            </h3>
          </div>
        </div>

        {/* Content Grid: Individual Items */}
        <div role="list" className="grid grid-cols-2 gap-4 px-5 pt-4 pb-2">
          <div className="space-y-3">
            {!hasIncluded ? (
              <span className="text-gray-500 text-xs italic font-light opacity-80 pl-1">
                {t("empty")}
              </span>
            ) : (
              included.map((item, index) => (
                <Included_Excluded_Item key={`inc-${item}-${index}`} title={item} icon="green" />
              ))
            )}
          </div>
          <div className="space-y-3">
            {!hasExcluded ? (
              <span className="text-gray-500 text-xs italic font-light opacity-80 pl-1">
                {t("empty")}
              </span>
            ) : (
              excluded.map((item, index) => (
                <Included_Excluded_Item key={`exc-${item}-${index}`} title={item} icon="red" />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Included_Excluded.displayName = "Included_Excluded";

export default memo(Included_Excluded);
