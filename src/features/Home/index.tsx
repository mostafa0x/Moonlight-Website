"use client";

import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { FullPage } from "react-abohook-fullpage";

import type { HomeDataType } from "@/shared/global";
import { useBookingState } from "@/features/booking-modal/context/BookingContextProvider";
import { useFullPageState } from "@/features/home/hooks";

import Page1 from "@/features/home/page1";

// Individual feature sections — kept as dynamic but allowed to SSR if needed in future
const LandMarks = dynamic(() => import("@/features/home/land-marks"), { ssr: false });
const PackagesPage = dynamic(() => import("@/features/home/packages-page"), { ssr: false });
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
  const { currentPage, handlePageChange } = useFullPageState();
  const { isOpen } = useBookingState();

  const sections = useMemo(
    () =>
      data.flatMap((section) => ({
        key: section.name,
        section,
      })),
    [data]
  );

  /**
   * isNearby: Simple heuristic to determine if a section's heavy content 
   * should be in the DOM. 
   * We keep current page + 1 buffer to ensure smooth scrolling transitions.
   * Tightened from 2 to 1 to further reduce TBT (Total Blocking Time).
   */
  const isSectionNearby = (pageIndex: number) => {
    // Treat Hero as page 0 or 1 depending on index
    // Initially currentPage = 1. Buffer 1 hydrates Hero and first Landmarks.
    return Math.abs(currentPage - pageIndex) <= 1;
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
              <div className="h-full w-full bg-black" /> // Lightweight placeholder
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
              <div className="h-full w-full bg-black" />
            )}
          </FullPage.Section>,
        ])}

        {/* Last Section: Footer — Only mounts when reaching the end */}
        <FullPage.Section>
          {isSectionNearby(sections.length * 2 + 1) ? (
            <FooterPage />
          ) : (
            <div className="h-full w-full bg-black" />
          )}
        </FullPage.Section>
      </FullPage>
    </main>
  );
}

Home.displayName = "Home";
export default memo(Home);
