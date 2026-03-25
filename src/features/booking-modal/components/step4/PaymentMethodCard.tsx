import clsx from "clsx";
import { memo } from "react";
import { useTranslations } from "next-intl";

function PaymentMethodCard({
  type,
  isActive,
  onClick,
}: {
  type: "full" | "deposit";
  isActive: boolean;
  onClick: () => void;
}) {
  const t = useTranslations("bookingModal.step5");
  const isFull = type === "full";
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex flex-col gap-2.25 justify-center items-center bg-[#131313] border rounded-[5px] w-full h-18 cursor-pointer transition-colors",
        isActive ? "border-[#F2C975] " : "border-[#86868B] ",
      )}
    >
      <img src={`/icons/${isFull ? "card" : "cash"}.svg`} alt="icon" />
      <span
        className={clsx(
          "text-[12px] font-medium",
          isActive ? "text-[#F2C975] " : "text-[#86868B]",
        )}
      >
        {isFull ? t("paymentFull") : t("paymentDeposit")}
      </span>
    </div>
  );
}

export default memo(PaymentMethodCard);
