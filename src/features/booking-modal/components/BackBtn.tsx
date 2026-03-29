import { memo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

interface BackBtnProps {
  prevStep: () => void;
  className?: string;
}

/**
 * BackBtn: Minimalist back navigation button with micro-interactions.
 * 
 * Best Practices:
 * - INP: Immediate active-state feedback (scale-95) for tactile response.
 * - FCP: Inline SVG avoids external icon loading delay.
 * - Performance: Memoized to prevent parent-driven redundant renders.
 */
function BackBtn({ prevStep, className }: BackBtnProps) {
  const t = useTranslations("bookingModal.footer");

  return (
    <button
      type="button"
      onClick={prevStep}
      aria-label={t("back")}
      className={cn(
        "group flex items-center gap-2.5 cursor-pointer outline-none transition-all active:scale-95",
        className
      )}
    >
      <div className="flex h-5 w-5 items-center justify-center transition-transform group-hover:-translate-x-1">
        <svg 
          viewBox="0 0 24 24" 
          className="w-4.5 h-4.5 text-[#8B8B8B] group-hover:text-[#F2C975] transition-colors" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </div>

      <span className="text-sm text-[#8B8B8B] font-bold group-hover:text-white transition-colors tracking-wide uppercase">
        {t("back")}
      </span>
    </button>
  );
}

BackBtn.displayName = "BackBtn";

export default memo(BackBtn);

