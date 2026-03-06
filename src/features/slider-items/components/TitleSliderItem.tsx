import clsx from "clsx";
import { memo } from "react";

function TitleSliderItem({
  name,
  isVisible,
}: {
  name: string;
  isVisible: boolean;
}) {
  return (
    <h2
      className={clsx(
        "text-[#F2C975] font-cairo font-bold text-[20px] sm:text-2xl select-none",
        isVisible && "animate-fade-in",
      )}
    >
      {name}
    </h2>
  );
}
export default memo(TitleSliderItem);
