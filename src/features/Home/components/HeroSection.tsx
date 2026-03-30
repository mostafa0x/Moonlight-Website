"use client";

import { memo } from "react";
import { FullPage } from "react-abohook-fullpage";
import Page1 from "@/features/home/page1";

interface HeroSectionProps {
  currentPage: number;
}

/**
 * HeroSection
 * Wraps the Page1 hero component inside a FullPage.Section.
 * 
 * Separated to keep the Home orchestrator lean and to allow
 * independent memoization of the hero content.
 */
function HeroSection({ currentPage }: HeroSectionProps) {
  return (
    <FullPage.Section>
      <Page1 currentPage={currentPage} />
    </FullPage.Section>
  );
}

HeroSection.displayName = "HeroSection";
export default memo(HeroSection);
