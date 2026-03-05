"use client";

import { motion, type Variants } from "motion/react";
import PackageCard from "@/features/packages/components/PackageCard";
import type { PackageType } from "@/features/home/page3/types";
import PackageSectionHeader from "@/features/packages/components/PackageSectionHeader";
import { memo } from "react";
import PackageCardSkeleton from "@/features/packages/components/PackageCardSkeleton";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};

function PackageSection({
  title,
  packages,
  isInView,
}: {
  title: string;
  packages: PackageType[];
  isInView: boolean;
}) {
  return (
    <section className="h-full w-full pt-[18px] px-[90px] relative">
      <div className="flex flex-col w-full justify-center gap-[44px] z-10">
        <PackageSectionHeader title={title} isInView={isInView} />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView={"show"}
          className="flex flex-row justify-between gap-7.5"
        >
          {packages.map((pkg, i) => (
            <motion.div className="flex-1" key={i} variants={itemVariants}>
              <PackageCardSkeleton pkg={pkg} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
export default memo(PackageSection);
