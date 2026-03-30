"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { FullPage } from "react-abohook-fullpage";

// Lazy-loaded footer — not visible until user scrolls to the end.
// This keeps the initial JS bundle small and improves FCP/LCP.
const FooterPage = dynamic(() => import("@/shared/components/footer"), {
  ssr: false,
});

/**
 * FooterSection
 * Wraps the lazily-loaded footer inside a FullPage.Section.
 * Separated so the footer chunk is completely tree-shakeable from the
 * initial bundle until the user actually scrolls to the last section.
 */
function FooterSection() {
  return (
    <FullPage.Section>
      <FooterPage />
    </FullPage.Section>
  );
}

FooterSection.displayName = "FooterSection";
export default memo(FooterSection);
