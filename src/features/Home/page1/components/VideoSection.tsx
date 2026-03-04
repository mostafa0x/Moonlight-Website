import { useEffect, useRef, useState } from "react";

export default function VideoSection({ isActive }: { isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      <video
        ref={videoRef}
        src="/videos/HeroSection.webm"
        muted
        loop
        autoPlay={isActive}
        playsInline
        preload="metadata"
        poster="imgs/HeroSection.png"
        className={`w-full h-full object-cover  absolute top-0 left-0`}
      />
    </div>
  );
}
