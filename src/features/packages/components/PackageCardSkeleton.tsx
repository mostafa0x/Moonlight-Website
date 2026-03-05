import { cn } from "@/shared/lib/utils";

function PackageCardSkeleton() {
  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden select-none">
      {/* Image Skeleton */}
      <div className="absolute inset-0 skeleton opacity-70 " />

      {/* Content */}
      <div className="absolute w-full bottom-0 left-0 pb-[11px] px-[16px] space-y-3 ">
        <div className="h-7 w-2/3 rounded skeleton" />

        <div className="flex items-center justify-between">
          <div className="h-8 w-20 rounded skeleton" />
          <div className="h-5 w-24 rounded skeleton" />
        </div>
      </div>
    </div>
  );
}
export default PackageCardSkeleton;
