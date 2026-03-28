"use client";

import { useEffect, useState, memo } from "react";
import dynamic from "next/dynamic";
import { FullPage } from "react-abohook-fullpage";

import type { HomeDataType } from "@/shared/global";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import Page1 from "@/features/home/page1";

// Dynamic components with SSR disabled for browser-only libraries/APIs
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
 * Home Component
 * Top-level feature component for the landing page.
 * Uses full-page scroll layout and dynamic sections.
 */
function Home({ data }: HomeProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { isOpen } = useBookingContext();

  // Handle hydration and mounting
  useEffect(() => {
    setMounted(true);
    
    // Log for debugging (optional, can be removed in production)
    if (process.env.NODE_ENV === 'development') {
      console.debug("Home component mounted, modal state:", isOpen);
    }
  }, [isOpen]);

  // Prevent hydration mismatch by delaying render until mounted
  if (!mounted) {
    return null; // A loading spinner or skeleton could go here
  }

  return (
    <main className="h-full w-full">
      <FullPage
        directionDots="right"
        duration={500}
        enableContextMenu
        onChange={setCurrentPage}
        disable={isOpen}
      >
        {/* Hero Section */}
        <FullPage.Section>
          <Page1 currentPage={currentPage} />
        </FullPage.Section>

        {/* Dynamic Governorates Sections */}
        {data.flatMap((section) => [
          <FullPage.Section key={`${section.name}-landmarks`}>
            <LandMarks
              currentPage={currentPage}
              landmarks={section.landmarks}
              titleHeader={section.name}
              page={section.page}
            />
          </FullPage.Section>,

          <FullPage.Section key={`${section.name}-packages`}>
            <PackagesPage
              currentPage={currentPage}
              packages={section.packages}
              titleHeader={section.name}
              page={section.page + 1}
            />
          </FullPage.Section>,
        ])}

        {/* Footer Section */}
        <FullPage.Section>
          <FooterPage />
        </FullPage.Section>
      </FullPage>
    </main>
  );
}

Home.displayName = "Home";

export default memo(Home);
