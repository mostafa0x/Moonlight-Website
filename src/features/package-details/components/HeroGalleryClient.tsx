"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const GalleryModal = dynamic(() => import("./GalleryModal"), {
  ssr: false,
});

interface HeroGalleryClientProps {
  images: string[];
  name: string;
}

export default function HeroGalleryClient({ images, name }: HeroGalleryClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const displayImages = images.slice(0, 4);
  const remainingCount = images.length - 4;

  const getImage = (index: number) => {
    return images[index] || images[0];
  };

  const renderImage = (index: number, isMain: boolean = false) => {
    const isLast = index === 3;
    const showOverlay = isLast && remainingCount > 0;
    const src = getImage(index);

    return (
      <div
        key={index}
        className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group bg-zinc-800 animate-pulse"
        onClick={() => openModal(index)}
      >
        <Image
          src={src}
          alt={`${name} - View ${index + 1}`}
          fill
          sizes={isMain ? "(max-width: 1440px) 50vw, 610px" : "(max-width: 1440px) 25vw, 295px"}
          className="object-cover transition-all duration-500 group-hover:scale-105 opacity-0"
          priority={isMain}
          onLoad={(e) => {
            const target = e.target as HTMLElement;
            target.classList.remove('opacity-0');
            target.parentElement?.classList.remove('animate-pulse', 'bg-zinc-800');
          }}
        />
        {showOverlay && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-colors group-hover:bg-black/60">
            <span className="text-white text-2xl font-bold font-cairo">+{remainingCount}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[1.02fr_1fr] gap-3 h-112.5">
        {/* Primary Image */}
        {renderImage(0, true)}

        {/* Secondary Grid */}
        <div className="grid grid-rows-[1fr_1fr] gap-3">
          {/* Top secondary */}
          {renderImage(1)}

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-3">
            {renderImage(2)}
            {renderImage(3)}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden grid grid-cols-2 gap-2 h-40">
        {/* Primary Image - spans full height */}
        <div className="row-span-2">
          {renderImage(0, true)}
        </div>

        {/* Right column */}
        {renderImage(1)}

        {/* Bottom right - split into 2 */}
        <div className="grid grid-cols-2 gap-2">
          {renderImage(2)}
          {renderImage(3)}
        </div>
      </div>

      {modalOpen && <GalleryModal images={images} isOpen={modalOpen} onClose={() => setModalOpen(false)} initialIndex={currentIndex} />}
    </div>
  );
}
