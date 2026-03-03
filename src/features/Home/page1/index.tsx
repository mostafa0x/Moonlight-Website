import HeroSectionHeader from "@/features/home/page1/components/HeroSectionHeader";
import VideoSection from "@/features/home/page1/components/VideoSection";
import React from "react";

export default function Page1({ page }: { page: number }) {
  return (
    <div className="h-screen w-full flex overflow-hidden ">
      <HeroSectionHeader />
      <VideoSection isActive={page === 0} />
    </div>
  );
}
