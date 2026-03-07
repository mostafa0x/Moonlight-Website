import HeroSectionHeader from "@/features/home/page1/components/HeroSectionHeader";
import Image from "next/image";

import { memo } from "react";
function Page1({ currentPage }: { currentPage: number }) {
  return (
    <div className="h-screen w-full flex overflow-hidden ">
      <div className={`w-full h-full  absolute top-0 left-0 z-[-2] `}>
        <Image
          src={"/backgrounds/background.webp"}
          alt="background image"
          fill
          priority
          fetchPriority="high"
          loading="eager"
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
        />
      </div>
      <HeroSectionHeader />
    </div>
  );
}

export default memo(Page1);
