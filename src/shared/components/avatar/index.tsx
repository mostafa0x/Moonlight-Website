import Image from "next/image";
import { memo } from "react";

function Avatar({ size = 34, src }: { size?: number; src?: string }) {
  const finalSrc = src || "/imgs/avatar.png";
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
      }}
      className={`relative  bg-black rounded-full overflow-hidden`}
    >
      <Image
        src={finalSrc}
        alt="Avatar"
        fill
        fetchPriority="low"
        className=" object-cover "
        sizes={`${size}px`}
      />
    </div>
  );
}

export default memo(Avatar);
