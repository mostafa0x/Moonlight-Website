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
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 select-none">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10000 p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Close gallery"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullets {
          position: fixed !important;
          bottom: max(24px, env(safe-area-inset-bottom)) !important;
          left: 0 !important;
          width: 100% !important;
          z-index: 2147483647 !important;
          display: flex !important;
          justify-content: center !important;
          flex-wrap: wrap !important;
          gap: 6px !important;
          padding: 0 16px !important;
        }
        .swiper-pagination-bullet {
          background: #ffffff !important;
          opacity: 0.4 !important;
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          display: block !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background: #F2C975 !important;
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }
        .swiper-button-next, .swiper-button-prev {
          z-index: 2147483647 !important;
        }
        @media (min-width: 768px) {
          .swiper-pagination-bullets {
            gap: 8px !important;
            bottom: 30px !important;
          }
          .swiper-pagination-bullet {
            width: 10px !important;
            height: 10px !important;
          }
        }
      `}} />

      <div className="w-full h-full flex items-center justify-center">
        <Swiper
          modules={[Navigation, Pagination, Zoom, Keyboard]}
          initialSlide={initialIndex}
          navigation
          pagination={{ clickable: true }}
          zoom={{ maxRatio: 3, minRatio: 1 }}
          keyboard={{ enabled: true, onlyInViewport: false }}
          grabCursor={true}
          className="w-full h-full max-h-screen pb-16"
          style={{
            "--swiper-navigation-color": "#F2C975",
            "--swiper-pagination-color": "#F2C975",
            "--swiper-pagination-bullet-inactive-color": "#ffffff",
            "--swiper-pagination-bullet-inactive-opacity": "0.4",
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-pagination-bottom": "24px",
          } as React.CSSProperties}
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
