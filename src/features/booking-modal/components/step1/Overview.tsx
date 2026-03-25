import { memo } from "react";
import { useTranslations } from "next-intl";

function Overview({ description }: { description: string }) {
  const t = useTranslations("bookingModal.step1");
  return (
    <div>
      <h2 className="text-[20px] text-[#F2C975] font-medium">{t("description")}</h2>
      <p className="text-[16px] text-[#E0E0E0] font-medium line-clamp-2 ">
        {description}
      </p>
    </div>
  );
}
export default memo(Overview);
