"use client";

import type { ItemSliderType } from "@/shared/global";
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

const slides: ItemSliderType[] = [
  {
    name: "Tutankhamun's Mask",
    src: "/imgs/item1.png",
    desc: "A timeless masterpiece that has endured for millennia. The golden mask of the young King Tutankhamun was crafted from pure gold and adorned with precious lapis lazuli and colored glass. Its astonishing detail reflects the grandeur of ancient Egyptian art and the majesty of the pharaohs.",
  },
  {
    name: "Nefertiti",
    src: "/imgs/item2.png",
    desc: "Nefertiti was a queen of ancient Egypt and the Great Royal Wife of Pharaoh Akhenaten. She is famous for her extraordinary beauty and her iconic limestone bust, which symbolizes elegance and grace. Nefertiti played a key role in religious reforms, promoting the worship of the sun god Aten. Her legacy remains a symbol of power, influence, and timeless Egyptian art.",
  },
  {
    name: "Horus",
    src: "/imgs/item3.png",
    desc: "Horus is a major deity in ancient Egyptian civilization, often shown as a falcon or a man with a falcon head. He symbolized kingship, protection, and divine authority. Son of Osiris and Isis, Horus defeated Set to reclaim Egypt's throne, representing order over chaos. The Eye of Horus became a famous symbol of protection, healing, and royal power, reflecting Egypt’s spiritual and political heritage.",
  },
];

function Page2({ currentPage }: { currentPage: number }) {
  const isPageInView = currentPage === 1;
  const currentIndex = useAutoSlider(isPageInView, slides.length, 7500);
  const currentSlide = slides[currentIndex];
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
                name={currentSlide.name}
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
            name={currentSlide.name}
            description={currentSlide.desc}
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
