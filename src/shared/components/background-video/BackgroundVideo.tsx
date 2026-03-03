import { memo } from "react";

function BackgroundVideo({ isHasOverlay = true }: { isHasOverlay?: boolean }) {
  return (
    <div>
      {isHasOverlay && (
        <div className="absolute top-0 left-0 w-full h-full  bg-black opacity-80 z-[-1]" />
      )}
      <video
        src="/videos/background.webm"
        muted
        loop
        playsInline
        autoPlay
        poster="imgs/BackgroundVideo.png"
        className={`w-full h-full object-cover  absolute top-0 left-0 z-[-2] `}
      />
    </div>
  );
}

export default memo(BackgroundVideo);
