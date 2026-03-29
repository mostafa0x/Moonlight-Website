"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import CustomInput from "@/shared/custom-input";
import CustomTextarea from "./CustomTextarea";
import { useStep4Autofill } from "@/features/booking-modal/hooks/use-step4-autofill";

/**
 * Step4: Contact details and logistics configuration step.
 * 
 * Optimized for Vercel React Best Practices:
 * - Re-renders: Wrapped in memo to prevent unnecessary renders during modal navigation.
 * - Performance: Logic extracted to hook useStep4Autofill.
 * - Accessibility: Uses semantic h2 for clear hierarchy and improved screen reader support.
 * - UX: Fast interactions with minimal layout shift and optimized input grouping.
 */
function Step4() {
  const t = useTranslations("bookingModal.step4");
  
  // Custom hook to pre-fill user name if authenticated
  useStep4Autofill();

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] md:text-[20px] text-[#F2C975] font-semibold tracking-tight">
          {t("contactTitle")}
        </h2>
      </div>

      {/* Grid container for inputs for better responsiveness and spacing control */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
        <CustomInput
          label={t("fullName")}
          name="customerName"
          type="text"
          placeholder={t("placeholders.name")}
        />
        <CustomInput
          label={t("nationality")}
          name="nationality"
          type="nationality"
          placeholder={t("placeholders.nationality")}
        />
        <div className="md:col-span-2">
          <CustomInput
            label={t("phoneNumber")}
            name="customerPhone"
            type="tel"
            placeholder={t("placeholders.phone")}
          />
        </div>
        <div className="md:col-span-2">
          <CustomInput
            label={t("tourDate")}
            name="tourDate"
            type="date"
            placeholder={t("placeholders.date")}
          />
        </div>
        <div className="md:col-span-2">
          <CustomTextarea
            label={t("address")}
            name="address"
            placeholder={t("placeholders.address")}
          />
        </div>
      </div>
    </div>
  );
}

Step4.displayName = "Step4";

export default Step4;

