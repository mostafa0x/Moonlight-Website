"use client";

import { memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { PackageType } from "@/shared/global";
import PackageCard from "@/features/packages/components/PackageCard";
import PackageSectionHeader from "@/features/packages/components/PackageSectionHeader";
import PackageCardSkeleton from "@/features/packages/components/PackageCardSkeleton";

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

  return (
    <section className="flex h-full w-full" aria-labelledby={`section-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="z-10 flex h-full w-full flex-col justify-center gap-11">
        <PackageSectionHeader title={title} isInView={isInView} />

        <ul
          role="list"
          className={`flex overflow-x-auto overflow-y-hidden scroll-smooth pb-4 scrollbar-custom snap-x snap-mandatory ${
            packages.length === 1 ? "justify-center" : ""
          }`}
          aria-label={`List of tours in ${title}`}
        >
          {packages.map((pkg, i) => {
            const isLast = i === packages.length - 1;
            
            return (
              <li
                key={pkg.packageId}
                className={`flex-none w-80 snap-start pl-3 2xl:w-96 transition-all duration-700 ease-in-out ${
                  packages.length > 1 ? "lg:flex-1 lg:min-w-80 lg:w-auto" : ""
                } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{
                  transitionDelay: isInView ? `${i * 0.15}s` : "0s",
                  paddingRight: isLast ? "1rem" : "0",
                }}
              >
                <Link
                  href={`/${locale}/?tourId=${pkg.packageId}`}
                  prefetch={false}
                  className="block h-full w-full"
                  aria-label={`View details for ${pkg.packageName}`}
                >
                  {isLoading ? (
                    <PackageCardSkeleton />
                  ) : (
                    <PackageCard pkg={pkg} priority={i < 2 && isInView} />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

PackageSection.displayName = "PackageSection";

export default memo(PackageSection);
