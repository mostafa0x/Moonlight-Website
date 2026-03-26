import type { PackageType } from "@/shared/global";
import Image from "next/image";
import { memo } from "react";
import { useTranslations } from "next-intl";

function PackageCard({
  pkg,
  priority = false,
}: {
  pkg: PackageType;
  priority?: boolean;
}) {
  const { packageName, packageImage, startingPrice } = pkg;
  const t = useTranslations("home");

  return (
    <div className="relative w-full h-130 rounded-2xl overflow-hidden select-none cursor-pointer group">
      <Image
        src={packageImage}
        alt={packageName}
        fill
        priority={priority}
        sizes="(max-width: 640px) 318px, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 435px"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-130"
      />

      <div className="relative w-full h-full bg-linear-to-b from-transparent from-10% to-black to-95% z-5 pointer-events-none" />

      <div className="absolute w-full z-6 bottom-0 left-0 pb-2.75 px-4">
        <div>
          <h1 className="font-semibold text-2xl text-white">{packageName}</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium text-[32px] text-[#F2C975]">
            {startingPrice}$
          </p>
          <p className="font-medium text-[16px] text-[#F2C975] underline underline-offset-3">
            {t("viewMore")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(PackageCard);
