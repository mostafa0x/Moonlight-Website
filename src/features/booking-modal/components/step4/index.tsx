import CustomTextarea from "@/features/booking-modal/components/step3/CustomTextarea";
import CustomInput from "@/shared/custom-input";
import PromoCode from "@/features/booking-modal/components/step4/PromoCode";
import PaymentMethod from "@/features/booking-modal/components/step4/PaymentMethod";
import { useTranslations } from "next-intl";

export default function Step4() {
  const t = useTranslations("bookingModal.step4");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-base text-[#F2C975] font-medium">
          {t("contactTitle")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-3">
          <CustomInput
            label={t("fullName")}
            name="customerName"
            type="text"
            placeholder={t("placeholders.name")}
          />
          <CustomInput
            label={t("phoneNumber")}
            name="customerPhone"
            type="tel"
            placeholder={t("placeholders.phone")}
          />
          <CustomInput
            label={t("tourDate")}
            name="tourDate"
            type="date"
            placeholder={t("placeholders.date")}
          />
          <CustomInput
            label={t("nationality")}
            name="nationality"
            type="text"
            placeholder={t("placeholders.nationality")}
          />
          <div className="md:col-span-2">
            <CustomTextarea
              label={t("address")}
              name="address"
              placeholder={t("placeholders.address")}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
