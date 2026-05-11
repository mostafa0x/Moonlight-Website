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
  const count = images.length;

  const renderImage = (index: number, isMain: boolean = false) => {
    if (!images[index]) return null;

    const isLast = index === 3;
    const showOverlay = isLast && remainingCount > 0;
    const src = images[index];

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
          className={`transition-all duration-500 group-hover:scale-105 opacity-0 ${count === 1 ? 'object-contain bg-zinc-900/50' : 'object-cover'}`}
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

  const renderDesktop = () => {
    if (count === 1) {
      return (
        <div className="hidden md:block w-full h-112.5">
          {renderImage(0, true)}
        </div>
      );
    }
    if (count === 2) {
      return (
        <div className="hidden md:grid md:grid-cols-2 gap-3 h-112.5">
          {renderImage(0, true)}
          {renderImage(1, true)}
        </div>
      );
    }
    if (count === 3) {
      return (
        <div className="hidden md:grid md:grid-cols-[1.02fr_1fr] gap-3 h-112.5">
          {renderImage(0, true)}
          <div className="grid grid-rows-2 gap-3">
            {renderImage(1)}
            {renderImage(2)}
          </div>
        </div>
      );
    }
    return (
      <div className="hidden md:grid md:grid-cols-[1.02fr_1fr] gap-3 h-112.5">
        {renderImage(0, true)}
        <div className="grid grid-rows-2 gap-3">
          {renderImage(1)}
          <div className="grid grid-cols-2 gap-3">
            {renderImage(2)}
            {renderImage(3)}
          </div>
        </div>
      </div>
    );
  };

  const renderMobile = () => {
    if (count === 1) {
      return (
        <div className="md:hidden block w-full h-64">
          {renderImage(0, true)}
        </div>
      );
    }
    if (count === 2) {
      return (
        <div className="md:hidden grid grid-cols-2 gap-2 h-48">
          {renderImage(0)}
          {renderImage(1)}
        </div>
      );
    }
    if (count === 3) {
      return (
        <div className="md:hidden grid grid-cols-2 gap-2 h-48">
          <div className="row-span-2">
            {renderImage(0, true)}
          </div>
          {renderImage(1)}
          {renderImage(2)}
        </div>
      );
    }
    return (
      <div className="md:hidden grid grid-cols-2 gap-2 h-48">
        <div className="row-span-2">
          {renderImage(0, true)}
        </div>
        {renderImage(1)}
        <div className="grid grid-cols-2 gap-2">
          {renderImage(2)}
          {renderImage(3)}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderDesktop()}
      {renderMobile()}

      {modalOpen && <GalleryModal images={images} isOpen={modalOpen} onClose={() => setModalOpen(false)} initialIndex={currentIndex} />}
    </div>
  );
}
