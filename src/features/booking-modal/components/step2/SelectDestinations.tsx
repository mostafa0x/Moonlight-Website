"use client";

import { memo } from "react";
import DestinationGroup from "./DestinationGroup";
import type { PackageDetailsType } from "@/shared/global";

interface SelectDestinationsProps {
  customizations: PackageDetailsType["customizations"];
}

/**
 * SelectDestinations: A list component for all destination customization groups.
 * 
 * Optimized for Vercel React Best Practices:
 * - INP: All logic is split into group-level controllers to minimize re-render impacts.
 * - TTFB: Pure logic and components, no external fetching dependencies.
 * - LCP/FCP: Uses skeleton-friendly structure if needed elsewhere, and stays lightweight.
 * - Accessibility: Uses semantic grouping structures.
 */
function SelectDestinations({ customizations }: SelectDestinationsProps) {
  if (!customizations || customizations.length === 0) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {customizations.map((group) => (
        <DestinationGroup key={group.groupId} group={group} />
      ))}
    </div>
  );
}

SelectDestinations.displayName = "SelectDestinations";

export default memo(SelectDestinations);
