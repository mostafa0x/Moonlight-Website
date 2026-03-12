import type { PackageType } from "@/shared/global";
import Image from "next/image";
import { memo } from "react";

function PackageCard({ pkg }: { pkg: PackageType }) {
  const { title, coverImageUrl, startingPrice } = pkg;

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden select-none cursor-pointer group">
      <Image
        src={coverImageUrl}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-130"
      />

      <div className="relative w-full h-full bg-linear-to-b from-transparent from-10% to-black to-95% z-5 pointer-events-none" />

      <div className="absolute w-full z-6 bottom-0 left-0 pb-[11px] px-[16px]">
        <div>
          <h1 className="font-semibold text-2xl text-white">{title}</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium text-[32px] text-[#F2C975]">
            {startingPrice}$
          </p>
          <p className="font-medium text-[16px] text-[#F2C975] underline underline-offset-3">
            view more
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(PackageCard);
