"use client";

import { memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { PackageType } from "@/shared/global";
import PackageCard from "@/features/packages/components/PackageCard";
import PackageCardSkeleton from "@/features/packages/components/PackageCardSkeleton";
import SectionHeader from "@/shared/components/SectionHeader";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface PackageSectionProps {
  title: string;
  packages: PackageType[];
  isInView: boolean;
  isLoading?: boolean;
}

/**
 * PackageSection Component
 * Refactored to follow Vercel/Next.js best practices for performance and accessibility.
 */
function PackageSection({
  title,
  packages,
  isInView,
  isLoading = false,
}: PackageSectionProps) {
  const { locale } = useParams();
  const t = useTranslations("packages");

  return (
    <section className="flex h-full w-full" aria-labelledby={`section-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="z-10 flex h-full w-full flex-col justify-center items-center">

        {packages.length === 0 && !isLoading ? (
          <div
            className={`flex w-full flex-1 items-center justify-center py-16 px-6 text-center transition-all duration-1000 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/10 mb-2">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0h-3.333a2 2 0 01-1.862 1.268H9.195A2 2 0 017.333 12H4" />
                </svg>
              </div>
              <p className="text-white text-lg font-light tracking-wide max-w-md">
                {t("noPackagesAvailable")}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center space-y-6 w-full min-h-0 mb-4">
            <SectionHeader title={title} />
            <Swiper
              modules={[Pagination]}
              slidesPerView={"auto"}
              centeredSlides={true}
              spaceBetween={20}
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: { spaceBetween: 24 },
                1024: { spaceBetween: 40 },
              }}
              className={`w-full pb-16 pt-0 transition-all duration-1000 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              {(isLoading && packages.length === 0 ? Array.from({ length: 4 }) : packages).map((pkg, i) => {
                const packageId = (pkg as PackageType)?.packageId;

                return (
                  <SwiperSlide
                    key={packageId || i}
                    className="w-[85vw]! sm:w-95! md:w-105! lg:w-125!"
                  >
                    {isLoading ? (
                      <div className="block w-full">
                        <PackageCardSkeleton />
                      </div>
                    ) : (
                      <Link
                        href={`/${locale}/packages/${packageId}`}
                        prefetch={true}
                        className="block w-full h-full"
                        aria-label={`View details for ${(pkg as PackageType)?.packageName}`}
                      >
                        <PackageCard pkg={pkg as PackageType} priority={false} />
                      </Link>
                    )}
                  </SwiperSlide>
                );
              })}
              {/* Inject highly optimized styles for performance (Hardware accelerated, no blur, optimized transitions) */}
              <style dangerouslySetInnerHTML={{
                __html: `
              .swiper {
                overflow: visible !important;
                padding: 0 0 !important;
              }
              .swiper-slide {
                transition: opacity 0.3s ease-out, transform 0.3s ease-out !important;
                opacity: 0.6 !important;
                transform: translate3d(0, 0, 0) scale(0.95) !important;
                will-change: opacity, transform;
              }
              .swiper-slide-active {
                opacity: 1 !important;
                transform: translate3d(0, 0, 0) scale(1) !important;
                z-index: 10;
              }
              .swiper-pagination {
                position: absolute !important;
                bottom: -40px !important;
              }
              .swiper-pagination-bullet {
                background: rgba(255, 255, 255, 0.5) !important;
                opacity: 1 !important;
                margin: 0 6px !important;
                transition: background-color 0.3s ease, width 0.3s ease !important;
                will-change: width, background-color;
              }
              .swiper-pagination-bullet-active {
                background: #F2C975 !important;
                width: 24px !important;
                border-radius: 4px !important;
              }
            `}} />
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

PackageSection.displayName = "PackageSection";

export default memo(PackageSection);
