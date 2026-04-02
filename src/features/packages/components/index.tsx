"use client";

import { memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { PackageType } from "@/shared/global";
import PackageCard from "@/features/packages/components/PackageCard";
import PackageSectionHeader from "@/features/packages/components/PackageSectionHeader";
import PackageCardSkeleton from "@/features/packages/components/PackageCardSkeleton";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import { useTranslations } from "next-intl";

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
  const { handleSetTourId } = useBookingContext();
  const t = useTranslations("packages");

  return (
    <section className="flex h-full w-full" aria-labelledby={`section-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="z-10 flex h-full w-full flex-col justify-center gap-11">
        <PackageSectionHeader title={title} isInView={isInView} />

        {packages.length === 0 && !isLoading ? (
          <div
            className={`flex w-full items-center justify-center py-16 px-6 text-center transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-2">
                <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0h-3.333a2 2 0 01-1.862 1.268H9.195A2 2 0 017.333 12H4" />
                </svg>
              </div>
              <p className="text-white/40 text-lg font-light tracking-wide max-w-md">
                {t("noPackagesAvailable")}
              </p>
            </div>
          </div>
        ) : (
          <ul
            role="list"
            className={`flex overflow-x-auto overflow-y-hidden scroll-smooth pb-4 scrollbar-custom snap-x snap-mandatory ${packages.length === 1 ? "justify-center" : ""
              }`}
            aria-label={`List of tours in ${title}`}
          >
            {(isLoading && packages.length === 0 ? Array.from({ length: 4 }) : packages).map((pkg, i) => {
              const isLast = (packages.length > 0 ? i === packages.length - 1 : i === 3);
              const packageId = (pkg as PackageType)?.packageId;

              return (
                <li
                  key={packageId || i}
                  className={`flex-none w-80 snap-start pl-3 2xl:w-96 transition-all duration-700 ease-in-out ${(packages.length > 1 || (isLoading && packages.length === 0)) ? "lg:flex-1 lg:min-w-80 lg:w-auto" : ""
                    } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{
                    transitionDelay: isInView ? `${i * 0.15}s` : "0s",
                    paddingRight: isLast ? "1rem" : "0",
                  }}
                >
                  {isLoading ? (
                    <div className="block h-full w-full">
                      <PackageCardSkeleton />
                    </div>
                  ) : (
                    <Link
                      href={`/${locale}/?tourId=${packageId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (packageId) {
                          handleSetTourId(packageId);
                          window.history.pushState({}, '', `/${locale}/?tourId=${packageId}`);
                        }
                      }}
                      prefetch={false}
                      scroll={false}
                      className="block h-full w-full"
                      aria-label={`View details for ${(pkg as PackageType)?.packageName}`}
                    >
                      <PackageCard pkg={pkg as PackageType} priority={i < 2 && isInView} />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

PackageSection.displayName = "PackageSection";

export default memo(PackageSection);
