import type { ItemSliderType, LandmarksType } from "@/shared/global";
import { useEffect, useState } from "react";

export const useExitSlider = (
  slide: LandmarksType,
  exitDuration: number = 300,
) => {
  const [displayItem, setDisplayItem] = useState(slide);
  const [isExiting, setIsExiting] = useState(false);
  useEffect(() => {
    if (slide.title !== displayItem.title) {
      setIsExiting(true);

      const timeoutChange = setTimeout(() => {
        setDisplayItem(slide);
      }, exitDuration + 200);

      return () => {
        clearTimeout(timeoutChange);
      };
    }
  }, [slide, displayItem, exitDuration]);

  useEffect(() => {
    if (!isExiting) return;

    const timeout = setTimeout(() => {
      setIsExiting(false);
    }, exitDuration + 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [isExiting, exitDuration]);

  return { displayItem, isExiting };
};

export const useAutoSlider = (
  isActive: boolean,
  length: number,
  delay: number = 5000,
): number => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      console.log("x");

      setCurrentIndex((prev) => (prev + 1) % length);
    }, delay);

    return () => clearInterval(intervalId);
  }, [isActive, length, delay]);

  return currentIndex;
};
