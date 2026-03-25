import { useExitSlider } from "@/features/slider-items/hooks";
import type { LandmarksType } from "@/shared/global";
import { cn } from "@/shared/lib/utils";
import { memo } from "react";

function SliderItemHeader({
  item,
  isVisible,
}: {
  item: LandmarksType;
  isVisible: boolean;
}) {
  const { displayItem, isExiting } = useExitSlider(item);

  return (
    <div
      key={displayItem.title}
      className={cn(
        "pt-7.25 sm:pt-10 lg:pt-32.75 space-y-4 select-none transition-all duration-500 ease-in-out transform",
        isExiting
          ? "opacity-0 -translate-x-full"
          : isVisible
            ? "opacity-100 translate-x-0"
            : "-translate-x-full opacity-0",
      )}
    >
      <h2 className="text-[#F2C975] font-cairo font-bold text-2xl hidden lg:flex">
        {displayItem.title}
      </h2>

      <p className="text-[#E0E0E0] font-cairo font-medium text-[16px] sm:text-[20px] md:max-w-[96%] lg:max-w-152.75">
        {displayItem.description}
      </p>
    </div>
  );
}
export default memo(SliderItemHeader);
