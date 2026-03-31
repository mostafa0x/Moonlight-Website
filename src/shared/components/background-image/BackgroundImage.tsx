"use client";

import { useEffect, useState, memo } from "react";
import Image from "next/image";

/**
 * BackgroundImage — Shared background for static pages
 * 
 * Performance:
 * This component uses 'Delayed Hydration' (isMounted state after 2s).
 * This removes it from the initial critical main-thread work (TBT), 
 * allowing the Hero section (Page1) to hydrate and interact faster.
 */
function BackgroundImage({ isHasOverlay = true }: { isHasOverlay?: boolean }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Defer rendering until main thread is likely idle
    const timer = setTimeout(() => setIsMounted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {isHasOverlay && (
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]" />
      )}
      <div className="w-full h-full absolute top-0 left-0 z-[-2]">
        <Image
          src="/backgrounds/backgroundPages.webp"
          alt="background pages"
          fill
          priority={false}
          quality={60}
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </>
  );
}

export default memo(BackgroundImage);
