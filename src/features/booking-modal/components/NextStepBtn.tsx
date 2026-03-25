import { useTranslations } from "next-intl";
import { memo } from "react";

function NextStepBtn({ nextStep }: { nextStep: () => void }) {
  const t = useTranslations("bookingModal.footer");
  return (
    <button
      onClick={nextStep}
      aria-label="next step button"
      className="w-34.75 h-10.25 bg-[#F2C975] hover:bg-[#887142] rounded-[10px] flex flex-row gap-2 items-center justify-center cursor-pointer"
    >
      <span className="text-sm text-black font-semibold">{t("next")}</span>
      <img src={"/icons/arrow-right.svg"} alt="arrow icon" />
    </button>
  );
}

export default memo(NextStepBtn);
