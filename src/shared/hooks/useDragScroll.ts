import { useCallback, useMemo, useRef } from "react";

/**
 * Optimized useDragScroll Hook
 * - Prevents Forced Reflow by caching layout positions.
 * - Uses refs for internal state to avoid unnecessary re-renders.
 * - Improves performance using useCallback/useMemo.
 */
export default function useDragScroll<T extends HTMLElement = HTMLDivElement>(alignment: "X" | "Y" = "X") {
  const ref = useRef<T | null>(null);
  const isX = alignment === "X";

  // Using refs for tracking state to avoid closure issues and unnecessary re-renders
  const state = useRef({
    isDown: false,
    startPos: 0,
    scrollSide: 0,
    offset: 0, // Cache the offset here to avoid reading it during mousemove
  });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;

    state.current.isDown = true;
    
    // 💡 Read layout properties ONCE here to prevent Forced Reflow during movement
    state.current.offset = isX ? ref.current.offsetLeft : ref.current.offsetTop;
    state.current.startPos = (isX ? e.pageX : e.pageY) - state.current.offset;
    state.current.scrollSide = isX ? ref.current.scrollLeft : ref.current.scrollTop;

    // Optional: add a class or style for cursor feedback
    ref.current.style.cursor = "grabbing";
    ref.current.style.userSelect = "none";
  }, [isX]);

  const onMouseLeave = useCallback(() => {
    state.current.isDown = false;
    if (ref.current) ref.current.style.cursor = "grab";
  }, []);

  const onMouseUp = useCallback(() => {
    state.current.isDown = false;
    if (ref.current) ref.current.style.cursor = "grab";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!state.current.isDown || !ref.current) return;

    e.preventDefault();

    // 💡 Calculation without reading DOM properties from the element
    const currentPos = (isX ? e.pageX : e.pageY) - state.current.offset;
    const walk = (currentPos - state.current.startPos) * 1.5;

    if (isX) {
      ref.current.scrollLeft = state.current.scrollSide - walk;
    } else {
      ref.current.scrollTop = state.current.scrollSide - walk;
    }
  }, [isX]);

  const events = useMemo(() => ({
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  }), [onMouseDown, onMouseLeave, onMouseUp, onMouseMove]);

  return {
    ref,
    events,
  };
}
