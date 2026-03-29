"use client";
import React from "react";
import Step1 from "./step1";
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

const StepRenderer = ({ step, pkg, hasCustomizations }: StepRendererProps) => {
  const containerClass = "flex-1 overflow-y-auto scrollbar-custom";

  const standardPadding = "px-3.5 lg:px-14.25 py-4";
  const step1Padding = "px-2.5 lg:px-5.25 py-4 flex";

  switch (step) {
    case 1:
      return (
        <div className={`${step1Padding} ${containerClass}`}>
          <Step1
            description={pkg.description}
            destinations={pkg.destinations}
            included={pkg.included}
            excluded={pkg.excluded}
          />
        </div>
      );
    case 2:
      return (
        <div className={`${standardPadding} ${containerClass}`}>
          <Step2 />
        </div>
      );
    case 3:
      return (
        <div className={`${standardPadding} ${containerClass}`}>
          {hasCustomizations ? (
            <Step3 customizations={pkg.customizations} />
          ) : (
            <Step4 />
          )}
        </div>
      );
    case 4:
      return (
        <div className={`${standardPadding} ${containerClass}`}>
          {hasCustomizations ? <Step4 /> : <Step5 />}
        </div>
      );
    case 5:
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
