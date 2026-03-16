import PackageSection from "@/features/packages/components";
import type { PackageType } from "@/shared/global";
import { memo } from "react";

function PackagesPage({
  currentPage,
  packages,
  titleHeader,
}: {
  currentPage: number;
  packages: PackageType[];
  titleHeader: string;
}) {
  const isInView = currentPage === 2;

  return (
    <div className="relative  h-screen w-full flex overflow-hidden pt-7.5 lg:pt-5 px-0 lg:px-22.5 ">
      <PackageSection
        title={titleHeader}
        packages={packages}
        isInView={isInView}
        isLoading={false}
      />
    </div>
  );
}

export default memo(PackagesPage);
