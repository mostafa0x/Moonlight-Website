"use client";

import { useCallback, useState } from "react";

/**
 * useFullPageState
 * Encapsulates the current page index state for the FullPage scroll component.
 * 
 * Performance: Uses useCallback to provide a stable onChange handler,
 * preventing FullPage from re-rendering due to a new function reference.
 */
export function useFullPageState(initialPage = 0) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Stable reference — FullPage.onChange won't cause re-renders
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return { currentPage, handlePageChange } as const;
}
