"use client";

import { memo, useCallback, useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FullPage } from "react-abohook-fullpage";

import type { HomeDataType } from "@/shared/global";
import { useBookingState } from "@/features/booking-modal/context/BookingContextProvider";
import { useFullPageState } from "@/features/home/hooks";

import Page1 from "@/features/home/page1";
import LandMarks from "@/features/home/land-marks";
import PackagesPage from "@/features/home/packages-page";

// Individual feature sections — kept as dynamic but allowed to SSR if needed in future
const FooterPage = dynamic(() => import("@/shared/components/footer"), { ssr: false });

interface HomeProps {
  data: HomeDataType[];
}

/**
 * Home — Optimized Orchestrator Component
 *
 * Performance Fixes for TBT (Total Blocking Time):
 * 1. Progressive Mounting: Only mounts the 'nearby' sections content. 
 *    Initial load only hydrates Hero (Page1). As the user scrolls, adjacent
 *    sections mount. This avoids a 2.9s main-thread bottleneck from 10+ 
 *    full-screen sections hydrating simultaneously.
 * 
 * 2. Stable Callbacks: Continues using memoized handlers to prevent 
 *    ripple re-renders.
 */
function Home({ data }: HomeProps) {
  const { currentPage, handlePageChange: originalHandlePageChange } = useFullPageState();
  const { isOpen } = useBookingState();
  const [hasInteracted, setHasInteracted] = useState(false);

  // Wrap the page change to detect initial interaction
  const handlePageChange = useCallback((page: number) => {
    originalHandlePageChange(page);
    setHasInteracted(true);
  }, [originalHandlePageChange]);

  const sections = useMemo(
    () =>
      data.flatMap((section) => ({
        key: section.name,
        section,
      })),
    [data]
  );

  // Pre-hydration state: Starts with Hero + Giza (2 pages)
  const [preloadedPages, setPreloadedPages] = useState(2);

  useEffect(() => {
    // Staggered Hydration: Mount one section at a time every 400ms to keep main thread free
    const interval = setInterval(() => {
      setPreloadedPages((prev) => {
        if (prev >= sections.length * 2 + 2) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [sections.length]);

  /**
   * isSectionNearby: Intelligent Hydration Strategy
   * Optimized to eliminate "Scroll Lag" by:
   * 1. Initial Load: Hero + Giza are hydrated immediately.
   * 2. Background Wave: Other sections hydrate one by one in the background.
   * 3. Sticky Mounting: Once a section is mounted, it stays mounted.
   */
  const isSectionNearby = (sectionPage: number) => {
    if (typeof window === "undefined") return sectionPage <= 2;

    // Buffer for active scrolling
    const buffer = hasInteracted ? 2 : 0;

    // Return true if the page is within our preloaded horizon OR nearby current scroll
    return sectionPage <= preloadedPages || sectionPage <= currentPage + buffer;
  };

  return (
    <main className="h-full w-full">
      <FullPage
        directionDots="right"
        duration={500}
        enableContextMenu
        onChange={handlePageChange}
        disable={isOpen}
      >
        {/* Section 0: Hero — Always mounted as it's the LCP entry point */}
        <FullPage.Section>
          <Page1 currentPage={currentPage} />
        </FullPage.Section>

        {/* Dynamic sections with Progressive Mounting */}
        {sections.flatMap(({ key, section }) => [
          <FullPage.Section key={`${key}-landmarks`}>
            {isSectionNearby(section.page) ? (
              <LandMarks
                currentPage={currentPage}
                landmarks={section.landmarks}
                titleHeader={section.name}
                page={section.page}
              />
            ) : (
              <div className="h-full w-full bg-transparent" /> // Lightweight placeholder
            )}
          </FullPage.Section>,
          <FullPage.Section key={`${key}-packages`}>
            {isSectionNearby(section.page + 1) ? (
              <PackagesPage
                currentPage={currentPage}
                packages={section.packages}
                titleHeader={section.name}
                page={section.page + 1}
              />
            ) : (
              <div className="h-full w-full bg-transparent" />
            )}
          </FullPage.Section>,
        ])}

        {/* Last Section: Footer — Hydrated slightly before reaching the end for smoothness */}
        <FullPage.Section>
          {currentPage >= sections.length * 2 - 1 ? (
            <FooterPage />
          ) : (
            <div className="h-full w-full bg-black flex items-center justify-center">
              <div className="w-16 h-1 bg-[#F2C975]/20 rounded-full animate-pulse" />
            </div>
          )}
        </FullPage.Section>
      </FullPage>
    </main>
  );
}

Home.displayName = "Home";
export default memo(Home);
