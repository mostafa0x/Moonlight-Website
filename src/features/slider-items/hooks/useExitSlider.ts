/** @format */

import { useState, useEffect, useCallback, useRef } from "react";
import type { LandmarksType } from "@/shared/global";

/**
 * useExitSlider Hook
 * 
 * Manages the transition/exit state when a slide changes.
 * Consolidates state updates for atomic transitions and UI consistency.
 * 
 * @param slide - Current active slide/landmark
 * @param exitDuration - Duration of the exit animation in ms
 * @returns { displayItem: LandmarksType, isExiting: boolean }
 */
export const useExitSlider = (
  slide: LandmarksType,
  exitDuration: number = 300,
) => {
  const [state, setState] = useState({
    displayItem: slide,
    isExiting: false,
  });

  const timerRef = useRef<NodeJS.Timeout| null>(null);

  useEffect(() => {
    // Only trigger exit if the actual content (identified by title) changes
    if (slide.title === state.displayItem.title) return;

    // Start exit transition
    setState((prev) => ({ ...prev, isExiting: true }));

    // Cleanup previous timer if it exists to avoid race conditions
    if (timerRef.current) clearTimeout(timerRef.current);

    // After animation duration, switch content and end exiting state
    // Added 100ms buffer to ensure animation completion before content switch
    timerRef.current = setTimeout(() => {
      setState({
        displayItem: slide,
        isExiting: false,
      });
    }, exitDuration + 100);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [slide, state.displayItem.title, exitDuration]);

  return state;
};
