"use client";

import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { useAutoSlider } from "@/shared/hooks/useSectionSlider";

const slides = [
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
  const ref = useRef(null);
  //   const isInView = useInView(ref, { amount: 0.6 });
  const isInView = page === 1;

  const index = useAutoSlider(isInView, slides.length);

  return (
    <section
      ref={ref}
      className="h-screen w-full flex  overflow-hidden pt-[173px] px-[73px] "
    >
      <div className="absolute top-0 left-0 z-[-1] w-full h-full">
        <Image src="/backgrounds/back.png" alt="" fill />
      </div>
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

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="pt-[131px] space-y-[16px] "
              key={slides[index].name}
            >
              <h2 className="text-[#F2C975] font-cairo font-bold text-2xl ">
                {slides[index].name}
              </h2>
              <p className="text-[#E0E0E0] font-cairo font-medium text-[20px] max-w-[611px]">
                {slides[index].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className=" relative  w-[405px] h-[745px] select-none ">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: "100%", y: -150, opacity: 0 }}
              whileInView={{ x: "50%", opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute w-full h-full "
            >
              <Image
                src={slides[index].src}
                alt="slide"
                fill
                priority
                className="object-contain "
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
