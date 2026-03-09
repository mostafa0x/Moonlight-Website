import clsx from "clsx";
import { memo } from "react";

function PaymentMethodCard({
  type,
  isActive,
}: {
  type: "card" | "cash";
  isActive: boolean;
}) {
  const isCard = type === "card";
  return (
    <div
      className={clsx(
        "flex flex-col gap-2.25 justify-center items-center bg-[#131313] border rounded-[5px] w-full h-18",
        isActive ? "border-[#F2C975] " : "border-[#86868B] ",
      )}
    >
      <img src={`/icons/${isCard ? "card" : "cash"}.svg`} alt="icon" />
      <span
        className={clsx(
          "text-[12px] font-medium",
          isActive ? "text-[#F2C975] " : "text-[#86868B]",
        )}
      >
        {isCard ? "Credit Card" : "Cash ( 25% Deposit )"}
      </span>
    </div>
  );
}

export default memo(PaymentMethodCard);
