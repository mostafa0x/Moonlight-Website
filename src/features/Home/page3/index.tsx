import type { PackageType } from "@/features/home/page3/types";
import PackageSection from "@/features/packages/components";

const packages: PackageType[] = [
  {
    title: "Giza All-Inclusive VIP Tour",
    src: "/packages/gize/package1.png",
    price: 320,
  },
  {
    title: "Giza All-Inclusive VIP Tour",
    src: "/packages/gize/package1.png",
    price: 320,
  },
  {
    title: "Giza All-Inclusive VIP Tour",
    src: "/packages/gize/package1.png",
    price: 320,
  },
];

export default function Page3({ currentPage }: { currentPage: number }) {
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
