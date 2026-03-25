import Image from "next/image";
import { memo } from "react";
import { useTranslations } from "next-intl";
function HeaderModal({
  titleTour,
  price,
  image,
}: {
  titleTour: string;
  price: string;
  image: string;
}) {
  const t = useTranslations("bookingModal.header");
  return (
    <div className="relative w-157.5 h-25 z-1">
      <div className="absolute  top-0 left-0  text-white z-3 px-4.25 py-3.75">
        <h1 className="text-base truncate w-70 md:w-full md:text-2xl text-white font-bold">{titleTour}</h1>
        <div className="flex flex-row gap-5.5 mt-1.75 items-center">
          <span className="text-[20px] text-[#F2C975] font-medium">
            {t("price")}
          </span>
          <div className="flex flex-row gap-1.5 w-full items-center">
            <img src={"/icons/group.svg"} alt="group icon" />
            <span className="text-[14px] text-[#00D26A] font-medium">
              {t("morePeopleLessPrice")}
            </span>
          </div>
        </div>
      </div>

      <div className=" absolute inset-0 w-full h-full bg-linear-to-b from-transparent to-black to-95% z-2" />
      <Image
        src={image}
        alt="modal img"
        fill
        className="object-cover"
      />
    </div>
  );
}

export default memo(HeaderModal);
