"use client";

import Page1 from "@/features/home/page1";
import Page2 from "@/features/home/page2";
import Page3 from "@/features/home/page3";
import { useState } from "react";
import { FullPage } from "react-abohook-fullpage";

export default function FullPagesProvider() {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <FullPage
      directionDots="right"
      duration={700}
      closeOutside
      onChange={setCurrentPage}
    >
      <FullPage.Section>
        <Page1 page={currentPage} />
      </FullPage.Section>
      <FullPage.Section>
        <Page2 page={currentPage} />
      </FullPage.Section>
      <FullPage.Section>
        <Page3 page={currentPage} />
      </FullPage.Section>

      {/* <FullPage.Footer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h1>Footer</h1>
        </div>
      </FullPage.Footer> */}
    </FullPage>
  );
}
