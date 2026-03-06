import { memo } from "react";

function TitleSliderItem({
  name,
  isInView,
}: {
  name: string;
  isInView: boolean;
}) {
  return (
    <h2
      className={`text-[#F2C975]  font-cairo font-bold text-[20px] sm:text-2xl select-none ${isInView && "animate-fade"} animate-ease-in animate-duration-1000`}
    >
      {name}
    </h2>
  );
}

export default memo(TitleSliderItem);
