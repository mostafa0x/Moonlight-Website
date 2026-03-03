"use client";

import { useState } from "react";

export default function VideoSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      <video
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
