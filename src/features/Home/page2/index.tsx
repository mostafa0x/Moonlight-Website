"use client";

import type { ItemSliderType, LandmarksType } from "@/shared/global";
const SliderItem = dynamic(
  () => import("@/features/slider-items/components/SliderItem"),
  { ssr: false, loading: () => <SliderItemSkeleton /> },
);
import SliderItemHeader from "@/features/slider-items/components/SliderItemHeader";
import { memo } from "react";
import dynamic from "next/dynamic";
import { useAutoSlider } from "@/features/slider-items/hooks";
import TitleSliderItem from "@/features/slider-items/components/TitleSliderItem";
import { useIsMobile } from "@/shared/hooks/useCheckMobile";
import SliderItemSkeleton from "@/features/slider-items/components/SliderItemSkeleton";

function Page2({
  currentPage,
  landmarks,
}: {
  currentPage: number;
  landmarks: LandmarksType[];
}) {
  const isPageInView = currentPage === 1;
  const currentIndex = useAutoSlider(isPageInView, landmarks.length, 7500);
  const currentSlide = landmarks[currentIndex];
  const isMobileDevice = useIsMobile();

  return (
    <section className="h-screen w-full flex overflow-hidden pt-18.5 lg:pt-43.25 px-6.25 lg:px-18.25">
      <div className="flex w-full lg:max-w-7xl flex-col lg:flex-row lg:justify-between">
        <div className="lg:w-1/2">
          <h1
            className={`text-2xl lg:text-6xl font-bold mb-6 ${isPageInView && "animate-fade-right"} animate-ease-in animate-duration-500`}
          >
            Giza
          </h1>
          {isMobileDevice && (
            <>
              <TitleSliderItem
                name={currentSlide.title}
                isVisible={isPageInView}
              />
              <SliderItem
                item={currentSlide}
                index={currentIndex}
                isVisible={isPageInView}
              />
            </>
          )}
          <SliderItemHeader
            name={currentSlide.title}
            description={currentSlide.description}
            isVisible={isPageInView}
          />
        </div>
        {!isMobileDevice && (
          <SliderItem
            item={currentSlide}
            index={currentIndex}
            isVisible={isPageInView}
          />
        )}
      </div>
    </section>
  );
}
export default memo(Page2);
