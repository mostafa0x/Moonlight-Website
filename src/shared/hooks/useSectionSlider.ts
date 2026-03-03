import { useEffect, useState } from "react";

export function useAutoSlider(isActive: boolean, length: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, length]);

  return index;
}
