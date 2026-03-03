import { memo } from "react";

function BackgroundVideo() {
  return (
    <div className="abolute ">
      <video
        src="/videos/background.webm"
        muted
        loop
        autoPlay
        poster="imgs/BackgroundVideo.png"
        className={`w-full h-full object-cover  absolute top-0 left-0`}
      />
    </div>
  );
}

export default memo(BackgroundVideo);
