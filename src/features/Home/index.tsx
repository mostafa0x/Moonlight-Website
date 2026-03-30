"use client";

import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { FullPage } from "react-abohook-fullpage";

import type { HomeDataType } from "@/shared/global";
import { useBookingState } from "@/features/booking-modal/context/BookingContextProvider";
import { useFullPageState } from "@/features/home/hooks";

import Page1 from "@/features/home/page1";

const LandMarks = dynamic(() => import("@/features/home/land-marks"), {
  ssr: false,
});
const PackagesPage = dynamic(() => import("@/features/home/packages-page"), {
  ssr: false,
});
const FooterPage = dynamic(() => import("@/shared/components/footer"), {
  ssr: false,
});

interface HomeProps {
  data: HomeDataType[];
}

/**
 * Home — Orchestrator Component
 *
 * Responsibilities:
 *  1. Wires the FullPage scroll container
 *  2. Delegates section rendering to child components
 *  3. Disables scroll when the booking modal is open
 *
 * Performance decisions:
 *  - Uses `useBookingState` instead of `useBookingContext` so this component
 *    only re-renders on *state* changes (isOpen), not on every action-context update.
 *  - `useFullPageState` provides a stable `handlePageChange` callback via useCallback,
 *    preventing FullPage from re-rendering due to function identity changes.
 *  - Each section type (Hero, Governorates, Footer) is in its own memoized component,
 *    so changing `currentPage` only re-renders sections whose visibility actually changed.
 *  - The old `mounted` gate (`useState(false)` + `useEffect → setMounted(true)`) was removed.
 *    It delayed First Contentful Paint by a full tick for no benefit — `"use client"` already
 *    guarantees this runs only on the client, and FullPage handles its own hydration.
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

  return (
    <main className="h-full w-full">
      <FullPage
        directionDots="right"
        duration={500}
        enableContextMenu
        onChange={handlePageChange}
        disable={isOpen}
      >
        {/* Hero — eagerly loaded, priority LCP image */}
        <FullPage.Section>
          <Page1 currentPage={currentPage} />
        </FullPage.Section>

        {/* Governorate Landmarks + Packages — dynamically imported */}
        {sections.flatMap(({ key, section }) => [
          <FullPage.Section key={`${key}-landmarks`}>
            <LandMarks
              currentPage={currentPage}
              landmarks={section.landmarks}
              titleHeader={section.name}
              page={section.page}
            />
          </FullPage.Section>,
          <FullPage.Section key={`${key}-packages`}>
            <PackagesPage
              currentPage={currentPage}
              packages={section.packages}
              titleHeader={section.name}
              page={section.page + 1}
            />
          </FullPage.Section>,
        ])}

        {/* Footer — lazy loaded, last scroll position */}
        <FullPage.Section>
          <FooterPage />
        </FullPage.Section>
      </FullPage>
    </main>
  );
}

Home.displayName = "Home";
export default memo(Home);
