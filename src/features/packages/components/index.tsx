import PackageCard from "@/features/packages/components/PackageCard";
import type { PackageType } from "@/features/home/page3/types";
import PackageSectionHeader from "@/features/packages/components/PackageSectionHeader";
import { memo } from "react";
import PackageCardSkeleton from "@/features/packages/components/PackageCardSkeleton";
import Link from "next/link";

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
    <Link
      className="w-full h-full flex"
      href={"/?tourId=1&step=1"}
      prefetch={false}
    >
      <div className="flex flex-col w-full h-full justify-center  gap-11 z-10">
        <PackageSectionHeader title={title} isInView={isInView} />

        <div className="flex  overflow-x-auto snap-x snap-mandatory scroll-smooth lg:overflow-visible">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`flex-none w-79.5 snap-start lg:flex-1 pl-3.25 ${
                isInView && "slide-fade-up blur-none"
              }`}
              style={{
                animationDelay: `${i * 0.3}s`,
                paddingRight: i === packages.length - 1 ? 13 : 0,
              }}
            >
              {isLoading ? <PackageCardSkeleton /> : <PackageCard pkg={pkg} />}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
export default memo(PackageSection);
