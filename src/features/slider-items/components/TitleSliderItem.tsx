import { useExitSlider } from "@/features/slider-items/hooks";
import type { LandmarksType } from "@/shared/global";
import { cn } from "@/shared/lib/utils";
import { memo } from "react";

function TitleSliderItem({
  item,
  isVisible,
}: {
  item: LandmarksType;
  isVisible: boolean;
}) {
  const { displayItem, isExiting } = useExitSlider(item);

  return (
    <h2
      className={cn(
        "text-[#F2C975] font-cairo font-bold text-[20px] sm:text-2xl select-none transition-all duration-500 ease-in-out transform",
        isExiting
          ? "opacity-0 -translate-x-full"
          : isVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0",
      )}
    >
      {displayItem.title}
    </h2>
  );
}
export default memo(TitleSliderItem);
