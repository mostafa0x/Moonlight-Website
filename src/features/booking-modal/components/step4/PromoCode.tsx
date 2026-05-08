"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";

function PromoCode() {
  const { register, control } = useFormContext();
  const t = useTranslations("bookingModal.step5");
  
  const promoStatus = useWatch({ name: "promoStatus", control });
  const isCalculating = useWatch({ name: "isCalculatingPrice", control });
  const promoCodeValue = useWatch({ name: "promoCode", control });

  let statusClasses = "border-[#313131] focus:ring-[#F2C975]";

  const normalizedStatus = String(promoStatus || "").toLowerCase();

  if (promoCodeValue && promoCodeValue.trim() !== "") {
    if (normalizedStatus === "valid" || normalizedStatus === "true") {
      statusClasses = "border-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.4)] focus:ring-[#22c55e] text-[#22c55e] bg-green-500/5";
    } else if (normalizedStatus === "not valid" || normalizedStatus === "invalid" || normalizedStatus === "false") {
      statusClasses = "border-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.4)] focus:ring-[#ef4444] text-[#ef4444] bg-red-500/5";
    }
  }

  return (
    <div className="space-y-3.5">
      <h2 className="text-base text-[#F2C975] font-medium">{t("promoTitle")}</h2>
      <div className="relative flex flex-row gap-3">
        <input
          placeholder={t("promoPlaceholder")}
          type="text"
          {...register("promoCode")}
          className={`bg-[#131313] border rounded-[5px] text-[12px] text-[#8B8B8B] px-3.75 py-1.5 w-full uppercase transition-all duration-300 outline-none focus:outline-none focus:bg-[#131313]! focus:ring-1 focus:ring-offset-0 [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#131313_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#8B8B8B] ${statusClasses}`}
        />
        {isCalculating && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <svg className="animate-spin h-4 w-4 text-[#F2C975]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default PromoCode;
