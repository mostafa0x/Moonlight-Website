import { memo } from "react";
import PackageSection from "@/features/packages/components/index";
import type { PackageType } from "@/shared/global";

interface PackagesPageProps {
  packages: PackageType[];
  titleHeader: string;
}

/**
 * PackagesPage Component
 * Optimized for performance by offloading heavy animations.
 */
function PackagesPage({
  packages,
  titleHeader,
}: PackagesPageProps) {
  return (
    <div
      className="relative flex h-full w-full scrollbar-hide"
      aria-label={`Packages for ${titleHeader}`}
    >
      <PackageSection
        title={titleHeader}
        packages={packages}
        isInView={true} 
        isLoading={false}
      />
    </div>
  );
}

PackagesPage.displayName = "PackagesPage";
export default memo(PackagesPage);
