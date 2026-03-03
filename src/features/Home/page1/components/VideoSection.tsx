"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoSection({ isActive }: { isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!videoRef.current) return;

    isActive ? videoRef.current.play() : videoRef.current.pause();

    return () => {};
  }, [isActive]);

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="abolute ">
      <video
        ref={videoRef}
        src="/videos/HeroSection.webm"
        muted
        loop
        autoPlay
        onCanPlay={() => setIsLoaded(true)}
        poster="imgs/HeroSection.png"
        className={`w-full h-full object-cover lg:object-fill absolute top-0 left-0  ${
          isLoaded ? "z-[-1]" : "z-[-2]"
        }`}
      />
    </div>
  );
}
