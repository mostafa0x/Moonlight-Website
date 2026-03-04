"use client";
import { memo, useEffect, useRef, useState } from "react";

function BackgroundVideo({ isHasOverlay = true }: { isHasOverlay?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (!isEnded) return;
    const time = setTimeout(() => {
      setIsEnded(false);
      videoRef.current?.play();
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, [isEnded]);

  return (
    <div>
      {isHasOverlay && (
        <div className="absolute top-0 left-0 w-full h-full  bg-black opacity-80 z-[-1]" />
      )}
      <video
        ref={videoRef}
        src="/videos/background1.webm"
        muted
        playsInline
        autoPlay
        preload="metadata"
        onEnded={() => setIsEnded(true)}
        poster="imgs/BackgroundVideo.png"
        className={`w-full h-full object-cover absolute top-0 left-0 z-[-2] `}
      />
    </div>
  );
}

export default memo(BackgroundVideo);
