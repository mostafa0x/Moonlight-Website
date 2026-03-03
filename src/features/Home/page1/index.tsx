import HeroSectionHeader from "@/features/home/page1/components/HeroSectionHeader";
import dynamic from "next/dynamic";
const VideoSection = dynamic(
  () => import("@/features/home/page1/components/VideoSection"),
);
import React, { memo } from "react";

function Page1({ page }: { page: number }) {
  return (
    <div className="h-screen w-full flex overflow-hidden ">
      <HeroSectionHeader />
      <VideoSection isActive={page === 0} />
    </div>
  );
}

export default memo(Page1);
