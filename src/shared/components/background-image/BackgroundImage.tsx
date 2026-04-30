import { memo } from "react";
import Image from "next/image";

/**
 * BackgroundImage — Fixed premium global background with custom GIF glowing hieroglyphs
 */
function BackgroundImage({ isHasOverlay = true }: { isHasOverlay?: boolean }) {
  return (
    <div className="bg-black">
      {/* Immersive Overlay */}
      {isHasOverlay && (
        <div className="fixed inset-0 bg-black/75 pointer-events-none z-[-1]" />
      )}

      {/* Main Background Image - Fixed position */}
      <div className="fixed inset-0 z-[-2] pointer-events-none">
        <Image
          src="/backgrounds/backgroundPages.webp"
          alt="Ancient Egypt Moonlight Background "
          fill
          className="object-cover opacity-80"
          sizes="100vw"
          quality={60}
          priority
          fetchPriority="high"
        />
      </div>
    </div>
  );
}

export default memo(BackgroundImage);


