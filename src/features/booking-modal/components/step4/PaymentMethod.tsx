import { useFormContext, useWatch } from "react-hook-form";
import PaymentMethodCard from "@/features/booking-modal/components/step4/PaymentMethodCard";
import { memo } from "react";
import { useTranslations } from "next-intl";

function PaymentMethod() {
  const { control, setValue } = useFormContext();
  const t = useTranslations("bookingModal.step5");
  const paymentPreference = useWatch({
    control,
    name: "paymentPreference",
    defaultValue: "full",
  });

  return (
    <div>
      <h1 className="text-base text-[#F2C975] font-medium">{t("paymentTitle")}</h1>
      <div className="flex flex-row justify-between gap-5.5 mt-5.5">
        <PaymentMethodCard
          type="full"
          isActive={paymentPreference === "full"}
          onClick={() => setValue("paymentPreference", "full")}
        />
        <PaymentMethodCard
          type="deposit"
          isActive={paymentPreference === "deposit"}
          onClick={() => setValue("paymentPreference", "deposit")}
        />
      </div>
    </div>
  );
}

export default memo(PaymentMethod);
