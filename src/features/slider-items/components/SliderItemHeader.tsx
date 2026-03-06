import { memo } from "react";

function SliderItemHeader({
  name,
  desc,
  isInView,
}: {
  name: string;
  desc: string;
  isInView: boolean;
}) {
  return (
    <div
      key={name}
      className={`
        pt-7.25 sm:pt-10 lg:pt-32.75 space-y-4 select-none ${isInView && "animate-fade"} animate-ease-in animate-duration-100`}
    >
      <h2 className="text-[#F2C975] font-cairo font-bold text-2xl hidden lg:flex">
        {name}
      </h2>

      <p className="text-[#E0E0E0] font-cairo font-medium text-[16px] sm:text-[20px] md:max-w-[96%] lg:max-w-152.75">
        {desc}
      </p>
    </div>
  );
}

export default memo(SliderItemHeader);
