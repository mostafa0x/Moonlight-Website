import PackageCard from "@/features/packages/components/PackageCard";
import PackageSectionHeader from "@/features/packages/components/PackageSectionHeader";
import { memo } from "react";
import PackageCardSkeleton from "@/features/packages/components/PackageCardSkeleton";
import Link from "next/link";
import type { PackageType } from "@/shared/global";

function PackageSection({
  title,
  packages,
  isInView,
  isLoading,
}: {
  title: string;
  packages: PackageType[];
  isInView: boolean;
  isLoading?: boolean;
}) {
  return (
    <div className="w-full h-full flex">
      <div className="flex flex-col w-full h-full justify-center  gap-11 z-10">
        <PackageSectionHeader title={title} isInView={isInView} />

        <div
          className={`flex overflow-x-auto snap-x snap-mandatory scroll-smooth lg:overflow-visible ${
            packages.length === 1 ? "justify-center" : ""
          }`}
        >
          {packages.map((pkg, i) => (
            <Link
              href={"/?tourId=1"}
              prefetch={false}
              key={pkg.packageId}
              className={`flex-none w-79.5 snap-start pl-3.25 ${
                packages.length > 1 ? "lg:flex-1" : ""
              } ${isInView && "slide-fade-up blur-none"}`}
              style={{
                animationDelay: `${i * 0.3}s`,
                paddingRight: i === packages.length - 1 ? 13 : 0,
              }}
            >
              {isLoading ? <PackageCardSkeleton /> : <PackageCard pkg={pkg} />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default memo(PackageSection);
