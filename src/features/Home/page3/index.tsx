"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import PackageCard from "@/features/home/page3/components/PackageCard";
import type { PackageType } from "@/features/home/page3/types";
import { useState } from "react";

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

      <div className="flex flex-col w-full justify-center gap-[44px] z-10">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-center font-cairo text-[#F2C975]"
        >
          GIZA TOUR PACKAGES
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView={isActive ? "show" : "hidden"}
          viewport={{ once: true }}
          className="flex flex-row justify-between gap-7.5"
        >
          {packages.map((pkg, i) => (
            <motion.div
              className="w-full h-full"
              key={i}
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
