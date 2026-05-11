"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

interface GalleryModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
}

export default function GalleryModal({ images, isOpen, onClose, initialIndex }: GalleryModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10000 p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Close gallery"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
      </button>

      <div className="w-full h-full flex items-center justify-center">
        <Swiper
          modules={[Navigation, Pagination, Zoom, Keyboard]}
          initialSlide={initialIndex}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          zoom={{ maxRatio: 3, minRatio: 1 }}
          keyboard={{ enabled: true, onlyInViewport: false }}
          grabCursor={true}
          className="w-full h-full max-h-screen"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx} className="flex items-center justify-center overflow-hidden">
              <div className="swiper-zoom-container w-full h-full relative p-4 md:p-12">
                <Image
                  src={src}
                  alt={`Gallery view ${idx + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={idx === initialIndex}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
