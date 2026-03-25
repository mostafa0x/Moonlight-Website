import { useTranslations } from "next-intl";
import { memo } from "react";

function ConfirmBooking({ callback }: { callback: () => void }) {
  const t = useTranslations("bookingModal.footer");
  return (
    <button
      onClick={callback}
      aria-label="next step button"
      className="w-34.75 h-10.25 bg-[#F2C975] hover:bg-[#887142] rounded-[10px] flex flex-row gap-2 items-center justify-center cursor-pointer"
    >
      <span className="text-sm text-black font-semibold">{t("confirm")}</span>
    </button>
  );
}

export default memo(ConfirmBooking);
