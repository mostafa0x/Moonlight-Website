import HeroSectionHeader from "@/features/home/page1/components/HeroSectionHeader";
import VideoSection from "@/features/home/page1/components/VideoSection";
import React from "react";

export default function Page1({ page }: { page: number }) {
  return (
    <div className="w-full h-full">
      <VideoSection isActive={page === 0} />
      <HeroSectionHeader />
    </div>
  );
}
