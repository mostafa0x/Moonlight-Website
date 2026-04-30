"use client";

import { memo } from "react";

import { motion } from "motion/react";
import PackageSection from "@/features/packages/components/index";
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.8 }}
      className="relative flex h-full w-full scrollbar-hide "
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

