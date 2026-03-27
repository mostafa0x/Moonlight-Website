import CustomTextarea from "@/features/booking-modal/components/step3/CustomTextarea";
import CustomInput from "@/shared/custom-input";
import { useTranslations } from "next-intl";
import { useAuth } from "@/shared/hooks/useAuth";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import GoogleAuthButton from "@/shared/components/GoogleAuthButton";

export default function Step4() {
  const t = useTranslations("bookingModal.step4");
  const { user, userName } = useAuth();
  const { setValue, watch } = useFormContext();
  const currentName = watch("customerName");

  useEffect(() => {
    if (user && userName && !currentName) {
      setValue("customerName", userName);
    }
  }, [user, userName, setValue, currentName]);

  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between">
        <h1 className="text-base text-[#F2C975] font-medium">
          {t("contactTitle")}
        </h1>
        {!user && (
          <div className="scale-90 origin-right">
            <GoogleAuthButton />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
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
