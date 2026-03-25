import { useFormContext } from "react-hook-form";
import { memo } from "react";
import { useTranslations } from "next-intl";

function PromoCode() {
  const { register } = useFormContext();
  const t = useTranslations("bookingModal.step5");

  return (
    <div className=" space-y-5.5">
      <h2 className="text-base text-[#F2C975] font-medium">{t("promoTitle")}</h2>
      <div className="flex flex-row gap-3">
        <input
          placeholder={t("promoPlaceholder")}
          type="text"
          {...register("promoCode")}
          className="bg-[#131313] border border-[#313131] rounded-[5px] text-[12px] text-[#8B8B8Bpx] px-3.75 py-1.5 w-full uppercase"
        />
        {/* <button
          aria-label="apply button"
          className="w-[84px] h-[32px] bg-[#131313] hover:bg-[#575555] rounded-[5px] border border-[#F2C975] text-[12px] text-[#F2C975]"
        >
          Apply
        </button> */}
      </div>
    </div>
  );
}
export default memo(PromoCode);
