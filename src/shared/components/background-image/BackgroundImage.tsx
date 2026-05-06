import { memo } from "react";
import Image from "next/image";

/**
 * BackgroundImage — Fixed premium global background with custom GIF glowing hieroglyphs
 */
function BackgroundImage({ isHasOverlay = true }: { isHasOverlay?: boolean }) {

  return (
    <div className="fixed inset-0 -z-10 bg-black pointer-events-none overflow-hidden">
      {/* Main Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/backgrounds/backgroundPages.webp"
          alt="Ancient Egypt Moonlight Background"
          fill
          className="object-cover"
          sizes="100vw"
          quality={60}
          priority
          fetchPriority="high"
        />
      </div>

      {/* Premium Overlay Layer */}
      {isHasOverlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}
    </div>
  );
}

export default memo(BackgroundImage);


