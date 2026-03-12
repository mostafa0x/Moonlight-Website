"use client";

import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import Page1 from "@/features/home/page1";
import Page2 from "@/features/home/page2";
import Page3 from "@/features/home/page3";
import { HomeDataType } from "@/shared/global";
import dynamic from "next/dynamic";
const FooterPage = dynamic(() => import("@/shared/components/footer"), {
  ssr: false,
});
import React, { useState } from "react";
import { FullPage } from "react-abohook-fullpage";

export default function Home({ data }: { data: HomeDataType[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const { isOpen } = useBookingContext();
  return (
    <FullPage
      directionDots="right"
      duration={500}
      enableContextMenu
      onChange={setCurrentPage}
      disable={isOpen}
    >
      <FullPage.Section>
        <Page1 currentPage={currentPage} />
      </FullPage.Section>
      {data.map((data) => [
        <FullPage.Section key={data.id}>
          <Page2 currentPage={currentPage} landmarks={data.landmarks} />
        </FullPage.Section>,

        <FullPage.Section key={data.id}>
          <Page3 currentPage={currentPage} packages={data.packages} />
        </FullPage.Section>,
      ])}

      <FullPage.Section>
        <FooterPage />
      </FullPage.Section>
    </FullPage>
  );
}
