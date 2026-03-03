import { PackageType } from "@/features/home/page3/types";
import Image from "next/image";
import { memo } from "react";

function PackageCard({ pkg }: { pkg: PackageType }) {
  const { title, src, price } = pkg;
  return (
    <div className="relative  w-full h-[520px] rounded-2xl overflow-hidden select-none cursor-pointer">
      <Image src={src} alt={title} fill className=" object-cover " />
      <div className="relative w-full h-full bg-linear-to-b from-transparent from-10% to-black to-86%   z-5" />
      <div className="absolute w-full z-6 bottom-0 left-0 pb-[11px] px-[16px]">
        <div>
          <h1 className="font-semibold text-2xl text-white">{title}</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium text-[32px] text-[#F2C975]">{price}$</p>
          <p className="font-medium text-[16px] text-[#F2C975]">view more</p>
        </div>
      </div>
    </div>
  );
}

export default memo(PackageCard);
