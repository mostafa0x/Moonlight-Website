import { motion } from "motion/react";
import React, { memo } from "react";

function PackageSectionHeader({ title }: { title: string }) {
  return (
    <motion.h1
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-bold mb-6 text-center font-cairo text-[#F2C975] select-none"
    >
      {title}
    </motion.h1>
  );
}

export default memo(PackageSectionHeader);
