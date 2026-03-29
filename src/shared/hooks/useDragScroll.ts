import { useRef } from "react";

export default function useDragScroll<T extends HTMLElement = HTMLDivElement>(alignment?: "X" | "Y") {
  const ref = useRef<T | null>(null);
  const isX = alignment === "X";

  let isDown = false;
  let startPos = 0;
  let scrollSide = 0;

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;

    isDown = true;
    startPos = isX
      ? e.pageX - ref.current.offsetLeft
      : e.pageY - ref.current.offsetTop;
    scrollSide = isX ? ref.current.scrollLeft : ref.current.scrollTop;
  };

  const onMouseLeave = () => {
    isDown = false;
  };

  const onMouseUp = () => {
    isDown = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !ref.current) return;

    e.preventDefault();

    const pos = isX
      ? e.pageX - ref.current.offsetLeft
      : e.pageY - ref.current.offsetTop;
    const walk = (pos - startPos) * 1.5;

    if (isX) {
      ref.current.scrollLeft = scrollSide - walk;
    } else {
      ref.current.scrollTop = scrollSide - walk;
    }
  };

  return {
    ref,
    events: {
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
    },
  };
}
