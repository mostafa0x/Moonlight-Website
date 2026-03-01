"use client";

import Page1 from "@/features/Home/page1";
import { FullPage } from "react-abohook-fullpage";

export default function page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
    >
      <FullPage directionDots="right" duration={700} closeOutside>
        <FullPage.Section>
          <Page1 />
        </FullPage.Section>
        <FullPage.Section>
          <div
            style={{
              backgroundColor: "orange",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <h1 style={{ fontSize: 24, color: "white" }}>Section 1</h1>
          </div>
        </FullPage.Section>
        <FullPage.Section>
          <div
            style={{
              backgroundColor: "blue",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <h1 style={{ fontSize: 24, color: "white" }}>Section 2</h1>
          </div>
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
    </div>
  );
}
