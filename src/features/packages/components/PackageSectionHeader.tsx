"use client";

import { memo } from "react";

interface PackageSectionHeaderProps {
  title: string;
  isInView: boolean;
}

/**
 * PackageSectionHeader Component
 * Refactored for semantic correctness (H2 for sections) and better performance.
 */
function PackageSectionHeader({ title, isInView }: PackageSectionHeaderProps) {
  // Create a safe ID for accessibility
  const sectionId = `section-title-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <h2
      id={sectionId}
      className={`font-cairo text-left pl-[24px] text-2xl font-bold text-white md:text-4xl transition-all duration-700 ease-in-out select-none ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      {title}
    </h2>
  );
}

PackageSectionHeader.displayName = "PackageSectionHeader";

export default memo(PackageSectionHeader);
