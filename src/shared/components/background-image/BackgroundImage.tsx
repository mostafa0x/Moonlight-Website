import Image from "next/image";
import { memo } from "react";

function BackgroundImage({ isHasOverlay = true }: { isHasOverlay?: boolean }) {
  return (
    <div>
      {isHasOverlay && (
        <div className="absolute top-0 left-0 w-full h-full  bg-black opacity-80 z-[-1]" />
      )}
      <div className={`w-full h-full absolute top-0 left-0 z-[-2] `}>
        <Image
          src="/backgrounds/backgroundPages.webp"
          alt="background pages"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 100vw"
        />
      </div>
    </div>
  );
}

export default memo(BackgroundImage);
