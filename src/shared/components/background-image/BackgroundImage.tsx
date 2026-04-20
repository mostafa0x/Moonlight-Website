import { memo } from "react";
import Image from "next/image";

/**
 * BackgroundImage — Fixed premium global background
 */
function BackgroundImage({ isHasOverlay = true }: { isHasOverlay?: boolean }) {


  return (
    <div className="bg-black">
      {/* Immersive Overlay */}
      {isHasOverlay && (
        <div className="fixed inset-0 bg-black/70 pointer-events-none z-[-1]" />
      )}

      {/* Main Background Image - Fixed position */}
      <div className="fixed inset-0 z-[-2] pointer-events-none">
        <Image
          src="/backgrounds/backgroundPages.png"
          alt="Ancient Egypt Moonlight Background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </div>
  );
}

export default memo(BackgroundImage);
