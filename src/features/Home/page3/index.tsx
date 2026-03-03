import { type Variants } from "motion/react";
import Image from "next/image";
import type { PackageType } from "@/features/home/page3/types";
import PackageSection from "@/shared/components/package-section";

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

export default function Page3({ page }: { page: number }) {
  const isActive = page === 2;

  return (
    <section className="h-screen w-full flex overflow-hidden pt-[78px] px-[90px] relative">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full">
        <Image
          src="/backgrounds/back.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <PackageSection
        title={"Giza All-Inclusive VIP Tour"}
        packages={packages}
      />
    </section>
  );
}
