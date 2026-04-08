"use client";

import { memo } from "react";

import { motion } from "motion/react";
import PackageSection from "@/features/packages/components";
import type { PackageType } from "@/shared/global";

interface PackagesPageProps {
  packages: PackageType[];
  titleHeader: string;
}

/**
 * PackagesPage Component — RSC Version
 * Optimized for performance by offloading animations to the server.
 */
function PackagesPage({
  packages,
  titleHeader,
}: PackagesPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.8 }}
      className="relative flex h-full w-full overflow-hidden px-0 pt-8 scrollbar-hide lg:px-20 lg:pt-5"
      aria-label={`Packages for ${titleHeader}`}
    >
      <PackageSection
        title={titleHeader}
        packages={packages}
        isInView={true} // In RSC version, we assume visibility for the client component logic or handle it via CSS
        isLoading={false}
      />
    </motion.div>
  );
}

PackagesPage.displayName = "PackagesPage";
export default memo(PackagesPage);

