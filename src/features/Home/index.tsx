"use client";

import dynamic from "next/dynamic";
import type { HomeDataType } from "@/shared/global";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
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
import { useEffect, useState } from "react";
import { FullPage } from "react-abohook-fullpage";

export default function Home({
  data,
  tourId,
}: {
  data: HomeDataType[];
  tourId: string;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const { isOpen, handleSetTourId } = useBookingContext();

  useEffect(() => {
    handleSetTourId(tourId);
    return () => {
      handleSetTourId("");
    };
  }, [tourId]);

  return (
    <FullPage
      directionDots="right"
      duration={500}
      enableContextMenu
      onChange={setCurrentPage}
      // disable={isOpen}
    >
      <FullPage.Section>
        <Page1 currentPage={currentPage} />
      </FullPage.Section>
      {data.map((pg) => [
        <FullPage.Section key={pg.name}>
          <LandMarks
            currentPage={currentPage}
            landmarks={pg.landmarks}
            titleHeader={pg.name}
            page={pg.page}
          />
        </FullPage.Section>,

        <FullPage.Section key={pg.name}>
          <PackagesPage
            currentPage={currentPage}
            packages={pg.packages}
            titleHeader={pg.name}
          />
        </FullPage.Section>,
      ])}

      <FullPage.Section>
        <FooterPage />
      </FullPage.Section>
    </FullPage>
  );
}
