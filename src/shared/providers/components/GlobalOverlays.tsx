"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

/**
 * Lazy imports for heavy client-side modalities.
 * 
 * Performance Note:
 * Using { ssr: false } ensures these components aren't part of the initial HTML payload (improving TTFB).
 * It also reduces the initial JS bundle size that blocks First Contentful Paint (FCP).
 */

const LoginModal = dynamic(
  () => import("@/shared/components/LoginModal"),
  { 
    ssr: false,
    loading: () => null 
  }
);

/**
 * GlobalOverlays Component
 * 
 * Consolidates all global UI overlays into a single, memoized component 
 * rendered at the root level of the provider tree. This pattern ensures 
 * that UI transitions in modals don't trigger unnecessary re-renders in 
 * sensitive provider logic.
 * 
 * Vercel React Best Practices applied:
 * - Code Splitting (next/dynamic)
 * - Suspense Boundaries for localized hydration
 * - Memoization for INP (Interaction to Next Paint) optimization
 */
const GlobalOverlays = React.memo(() => (
  <>
    <Suspense fallback={null}>
      <LoginModal />
    </Suspense>
  </>
));

GlobalOverlays.displayName = "GlobalOverlays";

export default GlobalOverlays;
