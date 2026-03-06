import { type Variants } from "motion/react";
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

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1 } },
};

export default function Page3({ currentPage }: { currentPage: number }) {
  const isInView = currentPage === 2;

  return (
    <div className="relative h-screen w-full flex overflow-hidden pt-[78px] px-[90px] ">
      <PackageSection
        title={"Giza All-Inclusive VIP Tour"}
        packages={packages}
        isInView={isInView}
        isLoading={false}
      />
    </div>
  );
}
