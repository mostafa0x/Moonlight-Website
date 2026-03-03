import { useEffect, useState } from "react";

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
