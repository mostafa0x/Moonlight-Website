import clsx from "clsx";
import { memo } from "react";
import { useTranslations } from "next-intl";

function PaymentMethodCard({
  type,
  isActive,
  onClick,
  disabled
}: {
  type: "full" | "deposit";
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  const t = useTranslations("bookingModal.step5");
  const isFull = type === "full";
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={clsx(
        "relative flex flex-col gap-2 justify-center items-center bg-[#131313] border rounded-[5px] w-full h-18 transition-colors",
        disabled ? "opacity-50 cursor-not-allowed border-[#313131]" : "cursor-pointer",
        !disabled && isActive ? "border-[#F2C975]" : "",
        !disabled && !isActive ? "border-[#86868B]" : ""
      )}
    >
      {/* Not Available Badge */}
      {disabled && (
        <div className="absolute -top-2 bg-[#ff5555] text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider z-10 shadow-sm">
          {t("notAvailable")}
        </div>
      )}
      <img src={`/icons/${isFull ? "card" : "cash"}.svg`} alt="icon" className={disabled ? "grayscale opacity-50" : ""} />
      <span
        className={clsx(
          "text-[12px] font-medium text-center",
          disabled ? "text-[#555]" : isActive ? "text-[#F2C975]" : "text-[#86868B]"
        )}
      >
        {isFull ? t("paymentFull") : t("paymentDeposit")}
      </span>
    </div>
  );
}

export default memo(PaymentMethodCard);
