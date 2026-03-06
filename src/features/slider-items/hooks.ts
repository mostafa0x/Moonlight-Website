import type { ItemSliderType } from "@/shared/global";
import { useEffect, useState } from "react";

export const useExitSlider = (
  slide: ItemSliderType,
  exitDuration: number = 300,
) => {
  const [displayItem, setDisplayItem] = useState(slide);
  const [isExiting, setIsExiting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (slide.name !== displayItem.name) {
      setIsExiting(true);

      const timeoutChange = setTimeout(() => {
        // setDisplayItem(slide);
        setIsLoaded(true);
      }, exitDuration - 100);

      return () => {
        clearTimeout(timeoutChange);
      };
    }
  }, [slide]);
  useEffect(() => {
    if (!isLoaded) return;

    const timeout = setTimeout(() => {
      setDisplayItem(slide);
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
