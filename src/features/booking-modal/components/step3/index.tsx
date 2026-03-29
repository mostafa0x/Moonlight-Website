"use client";

import { memo } from "react";
import SelectDestinations from "@/features/booking-modal/components/step2/SelectDestinations";
import type { PackageDetailsType } from "@/shared/global";
import { useTranslations } from "next-intl";

interface Step3Props {
  customizations: PackageDetailsType["customizations"];
}

/**
 * Step3: Specific destination customizations for the selected package.
 * 
 * Optimized for Vercel React Best Practices:
 * - INP: Minimal main-thread work by delegating group-level state to SelectDestinations sub-components.
 * - Re-renders: Wrapped in memo to prevent unnecessary renders during modal navigation.
 * - Accessibility: Uses semantic grouping headers (h2) for the customization title.
 * - Micro-interactions: Adds a smooth slide and fade entrance for better perceived speed.
 */
function Step3({ customizations }: Step3Props) {
  const t = useTranslations("bookingModal.step3");

  if (!customizations || customizations.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
      <div className="space-y-1">
        <h2 className="text-[18px] md:text-[20px] text-[#F2C975] font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="text-[#8B8B8B] text-sm md:text-base leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <SelectDestinations customizations={customizations} />
    </div>
  );
}

Step3.displayName = "Step3";

export default memo(Step3);
