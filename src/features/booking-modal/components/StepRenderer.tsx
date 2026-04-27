"use client";
import React from "react";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import type { PackageDetailsType } from "@/shared/global";

interface StepRendererProps {
  step: number;
  pkg: PackageDetailsType;
  hasCustomizations: boolean;
}

/**
 * StepRenderer: Renders the booking flow steps.
 *
 * Step 1 (tour details) has been moved to a standalone SSG page.
 * The modal now starts directly at step 1 = Travelers (old step 2).
 *
 * New step mapping:
 * - Step 1: Travelers & Pickup (old Step 2)
 * - Step 2: Customizations if available, else Contact (old Step 3)
 * - Step 3: Contact if customizations, else Summary (old Step 4)
 * - Step 4: Summary if customizations (old Step 5)
 */
const StepRenderer = ({ step, pkg, hasCustomizations }: StepRendererProps) => {
  const containerClass = "flex-1 overflow-y-auto scrollbar-custom";
  const standardPadding = "px-3.5 lg:px-14.25 py-4";

  switch (step) {
    case 1:
      return (
        <div className={`${standardPadding} ${containerClass}`}>
          <Step2 />
        </div>
      );
    case 2:
      return (
        <div className={`${standardPadding} ${containerClass}`}>
          {hasCustomizations ? (
            <Step3 customizations={pkg.customizations} />
          ) : (
            <Step4 />
          )}
        </div>
      );
    case 3:
      return (
        <div className={`${standardPadding} ${containerClass}`}>
          {hasCustomizations ? <Step4 /> : <Step5 />}
        </div>
      );
    case 4:
      if (hasCustomizations) {
        return (
          <div className={`${standardPadding} ${containerClass}`}>
            <Step5 />
          </div>
        );
      }
      return null;
    default:
      return null;
  }
};

export default StepRenderer;
