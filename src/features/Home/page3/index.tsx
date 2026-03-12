import PackageSection from "@/features/packages/components";
import type { PackageType } from "@/shared/global";

export default function Page3({
  currentPage,
  packages,
}: {
  currentPage: number;
  packages: PackageType[];
}) {
  const isInView = currentPage === 2;

  return (
    <div className="relative  h-screen w-full flex overflow-hidden pt-7.5 lg:pt-5 px-0 lg:px-22.5 ">
      <PackageSection
        title={"Giza All-Inclusive VIP Tour"}
        packages={packages}
        isInView={isInView}
        isLoading={false}
      />
    </div>
  );
}
