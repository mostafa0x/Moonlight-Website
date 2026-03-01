"use client";

import Page1 from "@/features/home/page1";
import { FullPage } from "react-abohook-fullpage";

export default function FullPagesProvider() {
  return (
    <FullPage directionDots="right" duration={700} closeOutside>
      <FullPage.Section>
        <Page1 />
      </FullPage.Section>

      <FullPage.Footer>
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
      </FullPage.Footer>
    </FullPage>
  );
}
