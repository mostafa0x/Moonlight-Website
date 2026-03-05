import Image from "next/image";
import React, { memo } from "react";

function SocialIcon({ icon }: { icon: "facebook" | "instagram" | "tiktok" }) {
  return (
    <div className="relative flex border border-white rounded-full w-[81px] h-[81px] items-center justify-center hover:bg-gray-300/30 hover:scale-105 select-none cursor-pointer">
      <Image src={`/icons/${icon}.svg`} width={43} height={43} alt={icon} />
    </div>
  );
}

export default memo(SocialIcon);
