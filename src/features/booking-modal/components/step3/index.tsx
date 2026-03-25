import SelectDestinations from "@/features/booking-modal/components/step2/SelectDestinations";
import PickLocation from "@/features/booking-modal/components/step2/PickLocation";
import type { PackageDetailsType } from "@/shared/global";
import React from "react";

export default function Step3({
  customizations,
}: {
  customizations: PackageDetailsType["customizations"];
}) {
  return (
    <div className="space-y-6 mt-[50px]">
      <SelectDestinations customizations={customizations} />
    
    </div>
  );
}
