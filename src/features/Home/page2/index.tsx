"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useAutoSlider } from "@/shared/hooks/useSectionSlider";
import type { ItemSliderType } from "@/shared/global";
import SliderItem from "@/shared/components/location-section/SliderItem";
import SliderItemHeader from "@/shared/components/location-section/SliderItemHeader";
import BackgroundVideo from "@/shared/components/background-video/BackgroundVideo";

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

export default function Page2({ page }: { page: number }) {
  const isInView = page === 1;
  const index = useAutoSlider(isInView, slides.length);

  return (
    <section className="h-screen w-full flex  overflow-hidden pt-[173px] px-[73px] ">
      <BackgroundVideo />
      <div className="flex w-full max-w-7xl  justify-between">
        <div className="w-1/2 ">
          <motion.h1
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-bold mb-6"
          >
            Gize
          </motion.h1>

          <SliderItemHeader
            name={slides[index].name}
            desc={slides[index].desc}
          />
        </div>

        <SliderItem slide={slides[index]} />
      </div>
    </section>
  );
}
