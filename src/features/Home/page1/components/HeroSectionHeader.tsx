import { memo } from "react";

function HeroSectionHeader() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center z-5 gap-[5px] tracking-[1px] select-none">
      <h2 className="text-5xl font-cairo font-medium text-white">
        Premium Travel
      </h2>
      <h1 className="text-5xl font-cairo font-medium text-white">
        Discover Egypt like a local
      </h1>
    </div>
  );
}

export default memo(HeroSectionHeader);
