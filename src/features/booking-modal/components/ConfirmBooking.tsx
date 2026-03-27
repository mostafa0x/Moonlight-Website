import { useTranslations } from "next-intl";
import { memo } from "react";

interface ConfirmBookingProps {
  callback: () => void;
}

function ConfirmBooking({ callback }: ConfirmBookingProps) {
  const t = useTranslations("bookingModal.footer");
  return (
    <button
      onClick={callback}
      aria-label="confirm booking button"
      className="w-34.75 h-10.25 bg-[#F2C975] hover:bg-[#887142] rounded-[10px] flex flex-row gap-2 items-center justify-center cursor-pointer transition-colors"
    >
      <span className="text-sm text-black font-semibold">
        {t("confirm")}
      </span>
    </button>
  );
}

export default memo(ConfirmBooking);
