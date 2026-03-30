"use client";

import { useState, useEffect, useMemo } from "react";

/**
 * Shared session-level image cache to prevent flicker across navigations.
 */
const loadedImagesCache = new Set<string>();

/**
 * useImageLoader Hook
 * Manages image loading state with browser-level cache detection.
 * 
 * @param imageUrl - URL of the image to load
 * @returns { isLoaded: boolean, onImageLoad: () => void }
 */
export function useImageLoader(imageUrl: string) {
  const [currentUrl, setCurrentUrl] = useState(imageUrl);
  const [isLoaded, setIsLoaded] = useState(() => loadedImagesCache.has(imageUrl));

  // Synchronously reset loading state when imageUrl changes during render
  if (currentUrl !== imageUrl) {
    setCurrentUrl(imageUrl);
    setIsLoaded(loadedImagesCache.has(imageUrl));
  }

  useEffect(() => {
    // If already marked as loaded (from cache or previous session), skip
    if (isLoaded) return;

    // Check browser native cache using Image constructor
    const img = new window.Image();
    img.src = imageUrl;
    
    if (img.complete) {
      setIsLoaded(true);
      loadedImagesCache.add(imageUrl);
    }
  }, [imageUrl, isLoaded]);

  const onImageLoad = () => {
    loadedImagesCache.add(imageUrl);
    setIsLoaded(true);
  };

  return { 
    isLoaded, 
    onImageLoad 
  };
}
