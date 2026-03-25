import SelectDestinationsItem from "@/features/booking-modal/components/step2/SelectDestinationsItem";
import type { PackageDetailsType } from "@/shared/global";
import { memo } from "react";

function SelectDestinations({
  customizations,
}: {
  customizations: PackageDetailsType["customizations"];
}) {
  if (!customizations || customizations.length === 0) return null;

  return (
    <div className="space-y-4">
      {customizations.map((group) => (
        <div key={group.groupId} className="space-y-2">
          <h2 className="text-base text-[#F2C975] font-medium">
            {group.title}
          </h2>
          <div className=" flex flex-wrap  gap-2.5">
            {group.options.map((option) => (
              <SelectDestinationsItem
                key={option.id}
                label={option.name}
                groupId={group.groupId}
                optionId={option.id}
                maxSelect={group.maxSelect}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default memo(SelectDestinations);
