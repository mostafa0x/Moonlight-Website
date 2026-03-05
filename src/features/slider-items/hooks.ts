import type { ItemSliderType } from "@/shared/global";
import { useEffect, useState } from "react";

export const useExitSlider = (
  slide: ItemSliderType,
  exitDuration: number = 400,
) => {
  const [displaySlide, setDisplaySlide] = useState(slide);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (slide.name !== displaySlide.name) {
      setIsExiting(true);

      const timeoutChange = setTimeout(() => {
        setDisplaySlide(slide);
      }, exitDuration - 100);

      const timeout = setTimeout(() => {
        // setDisplaySlide(slide);
        setIsExiting(false);
      }, exitDuration);

      return () => {
        clearTimeout(timeoutChange);
        clearTimeout(timeout);
      };
    }
  }, [slide]);

  return { displaySlide, isExiting };
};

export function useAutoSlider(
  isActive: boolean,
  length: number,
  delay: number = 5000,
) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      //   setIndex(0);
      return;
    }

    const interval = setInterval(() => {
      console.log("x");

      setIndex((prev) => (prev + 1) % length);
    }, delay);

    return () => clearInterval(interval);
  }, [isActive]);
  return index;
}
