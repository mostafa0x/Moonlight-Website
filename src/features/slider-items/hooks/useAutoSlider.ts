"use client";
import { useState, useEffect, useRef } from "react";

/**
 * useAutoSlider Hook
 * 
 * Manages an automatic sliding index (e.g., for a carousel).
 * Pauses automatically when the tab is hidden to save resources.
 * 
 * @param isActive - Whether the auto-advancing is active
 * @param length - Number of items in the slider
 * @param delay - Delay in ms before advancing to next item (default: 5000)
 * @returns currentIndex: number
 */
export const useAutoSlider = (
  isActive: boolean,
  length: number,
  delay: number = 5000,
): number => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Edge case checks: handle inactivity or insufficient items
    if (!isActive || length <= 1) return;

    const startTimer = () => {
      // Clear any existing timer to avoid overlaps
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        // Only advance if the window is physically visible to the user
        // This improves battery life and avoids UI jumps when returning to tab
        if (document.visibilityState === "visible") {
          setCurrentIndex((prev) => (prev + 1) % length);
        }
      }, delay);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        startTimer();
      }
    };

    // Initial setup
    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive, length, delay]);

  return currentIndex;
};
