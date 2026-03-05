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
        pt-[131px] space-y-[16px] select-none ${isInView && "animate-fade"} animate-ease-in animate-duration-1000`}
    >
      <h2 className="text-[#F2C975] font-cairo font-bold text-2xl">{name}</h2>
      <p className="text-[#E0E0E0] font-cairo font-medium text-[20px] max-w-[611px]">
        {desc}
      </p>
    </div>
  );
}

export default memo(SliderItemHeader);
