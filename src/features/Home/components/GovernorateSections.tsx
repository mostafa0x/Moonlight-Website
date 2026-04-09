"use client";
import { memo } from "react";
import type { HomeDataType } from "@/shared/global";
import LandMarks from "@/features/home/land-marks";
import PackagesPage from "@/features/home/packages-page";
import Section from "@/features/home/components/Section";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

interface GovernorateSectionsProps {
  data: HomeDataType[];
}

/**
 * GovernorateSections
 * Renders a nested vertical journey for each governorate.
 * Landmark Explorer (Horizontal) -> Packages (Vertical)
 */
function GovernorateSections({ data }: GovernorateSectionsProps) {
  return (
    <>
      {data.map((item) => (
        <SwiperSlide key={item.governorate} className="h-full w-full overflow-hidden">
          {/* Nested Vertical Scroller for Place Content */}
          <Swiper
            direction="vertical"
            nested={true}
            slidesPerView={1}
            spaceBetween={0}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
            }}
            speed={800}
            modules={[Mousewheel]}
            className="h-full w-full"
          >
            {/* Sub-Section 1: Cultural Landmarks (Horizontal) */}
            <SwiperSlide className="h-full w-full">
              <LandMarks
                landmarks={item.landmarks}
                titleHeader={item.name}
              />
            </SwiperSlide>

            {/* Sub-Section 2: Booking Packages */}
            <SwiperSlide className="h-full w-full overflow-y-auto bg-black/40 backdrop-blur-md pt-24 px-6 lg:px-20 scrollbar-hide">
              <PackagesPage
                packages={item.packages}
                titleHeader={item.name}
              />
            </SwiperSlide>
          </Swiper>
        </SwiperSlide>
      ))}
    </>
  );
}





GovernorateSections.displayName = "GovernorateSections";
export default memo(GovernorateSections);

