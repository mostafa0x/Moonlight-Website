import PackageCard from "@/features/packages/components/PackageCard";
import type { PackageType } from "@/features/home/page3/types";
import PackageSectionHeader from "@/features/packages/components/PackageSectionHeader";
import { memo } from "react";
import PackageCardSkeleton from "@/features/packages/components/PackageCardSkeleton";

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
    <section className="h-full w-full pt-[18px] px-[90px] relative">
      <div className="flex flex-col w-full justify-center gap-[44px] z-10">
        <PackageSectionHeader title={title} isInView={isInView} />

        <div className="flex flex-row justify-between gap-7.5">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`
                flex-1 
                ${isInView && "slide-fade-up blur-none"}`}
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {isLoading ? <PackageCardSkeleton /> : <PackageCard pkg={pkg} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default memo(PackageSection);
