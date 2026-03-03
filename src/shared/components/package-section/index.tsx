"use client";

import { motion, type Variants } from "motion/react";
import PackageCard from "@/shared/components/package-section/PackageCard";
import type { PackageType } from "@/features/home/page3/types";
import PackageSectionHeader from "@/shared/components/package-section/PackageSectionHeader";
import { memo } from "react";

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

function PackageSection({
  title,
  packages,
}: {
  title: string;
  packages: PackageType[];
}) {
  return (
    <section className="h-full w-full pt-[58px] px-[90px] relative">
      <div className="flex flex-col w-full justify-center gap-[44px] z-10">
        <PackageSectionHeader title={title} />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView={"show"}
          className="flex flex-row justify-between gap-7.5"
        >
          {packages.map((pkg, i) => (
            <motion.div
              className="flex-1"
              key={i}
              whileTap={{
                scale: 1.05,
              }}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
export default memo(PackageSection);
