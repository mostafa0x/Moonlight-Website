import Image from "next/image";
import { memo } from "react";

function Avatar({ size = 34 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={`relative  bg-black rounded-full`}
    >
      <Image
        src={"/imgs/avatar.png"}
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
