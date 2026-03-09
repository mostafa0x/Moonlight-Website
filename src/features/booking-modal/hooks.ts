import { useRef } from "react";

export function useDragScroll() {
  const ref = useRef<HTMLDivElement | null>(null);

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;

    isDown = true;
    startX = e.pageX - ref.current.offsetLeft;
    scrollLeft = ref.current.scrollLeft;
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

    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.5;

    ref.current.scrollLeft = scrollLeft - walk;
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
