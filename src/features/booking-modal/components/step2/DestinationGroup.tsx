"use client";

import { memo, useCallback } from "react";
import SelectDestinationsItem from "./SelectDestinationsItem";
import { useDestinationSelection } from "@/features/booking-modal/hooks/use-destination-selection";
import type { PackageDetailsType } from "@/shared/global";

type GroupType = PackageDetailsType["customizations"][number];

interface DestinationGroupProps {
  group: GroupType;
}

/**
 * DestinationGroup: A group-level component that manages state for its destination options.
 * 
 * Optimized for Vercel React Best Practices:
 * - INP: Group-level subscription using useDestinationSelection.
 * - Re-renders: Memoized item toggles and sub-components. 
 * - Accessibility: Uses semantic grouping headers.
 */
function DestinationGroup({ group }: DestinationGroupProps) {
  const { isSelected, toggleOption } = useDestinationSelection(group.groupId, group.maxSelect);

  return (
    <div key={group.groupId} className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base text-[#F2C975] font-semibold tracking-wide">
          {group.title}
        </h3>
        {group.maxSelect > 1 && (
          <span className="text-xs text-[#8B8B8B] font-medium px-2 py-0.5 bg-[#ffffff]/5 rounded-full border border-white/10 uppercase tracking-wider">
            Up to {group.maxSelect} 
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {group.options.map((option) => (
          <SelectDestinationsItem
            key={option.id}
            label={option.name}
            isSelected={isSelected(option.id)}
            onToggle={() => toggleOption(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

DestinationGroup.displayName = "DestinationGroup";

export default memo(DestinationGroup);
