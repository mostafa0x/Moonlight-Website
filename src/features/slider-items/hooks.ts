import type { ItemSliderType, LandmarksType } from "@/shared/global";
import { useEffect, useState } from "react";

export const useExitSlider = (
  slide: LandmarksType,
  exitDuration: number = 300,
) => {
  const [displayItem, setDisplayItem] = useState(slide);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (slide.title !== displayItem.title) {
      setIsExiting(true);

      const timeoutChange = setTimeout(() => {
        // setDisplayItem(slide);
        setIsLoaded(true);
        setDisplayItem(slide);
      }, exitDuration + 200);

      return () => {
        clearTimeout(timeoutChange);
      };
    }
  }, [slide, displayItem]);
  useEffect(() => {
    if (!isLoaded) return;

    const timeout = setTimeout(() => {
      setIsExiting(false);
      setIsLoaded(false);
    }, exitDuration + 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoaded, slide]);

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
