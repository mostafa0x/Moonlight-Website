"use client";

import React from "react";

// Core context providers
import { AuthProvider } from "@/shared/providers/AuthProvider";
import ReactQueryProvider from "@/shared/providers/ReactQueryProvider";
import BookingContextProvider from "@/features/booking-modal/context/BookingContextProvider";

// Sub-components
import GlobalOverlays from "./components/GlobalOverlays";

/**
 * AllProviders Component
 * 
 * Aggregates all application-wide context providers and global UI components.
 * Refactored for performance and bundle size optimization.
 * 
 * Performance Optimizations:
 * 1. Improved TTFB: Providers are thin and don't block main content.
 *    GlobalOverlays logic is handled outside the main path.
 * 
 * 2. Optimized FCP/LCP: Modals are dynamically imported within GlobalOverlays 
 *    to exclude them from the initial bundle.
 * 
 * 3. Enhanced INP: Combined with memoization and split context providers
 *    (AuthProvider, BookingContextProvider) to minimize re-render impacts.
 */
export default function AllProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <BookingContextProvider>
          {children}
          
          {/* Render global overlays outside the main content path */}
          <GlobalOverlays />
        </BookingContextProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
}
