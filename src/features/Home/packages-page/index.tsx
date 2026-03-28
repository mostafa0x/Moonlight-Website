"use client";

import { memo } from "react";
import PackageSection from "@/features/packages/components";
import type { PackageType } from "@/shared/global";

interface PackagesPageProps {
  currentPage: number;
  packages: PackageType[];
  titleHeader: string;
  page: number;
}

/**
 * PackagesPage Component
 * Acts as a wrapper and visibility controller for individual package sections
 * in the full-page scroll layout.
 */
function PackagesPage({
  currentPage,
  packages,
  titleHeader,
  page,
}: PackagesPageProps) {
  // Determine if this section is currently visible to trigger animations
  const isInView = currentPage === page;

  return (
    <section 
      className="relative flex h-screen w-full overflow-hidden px-0 pt-8 scrollbar-hide lg:px-20 lg:pt-5"
      aria-label={`Packages for ${titleHeader}`}
    >
      <PackageSection
        title={titleHeader}
        packages={packages}
        isInView={isInView}
        isLoading={false}
      />
    </section>
  );
}

PackagesPage.displayName = "PackagesPage";

export default memo(PackagesPage);
