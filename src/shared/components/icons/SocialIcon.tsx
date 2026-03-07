import { memo } from "react";

function SocialIcon({ icon }: { icon: "facebook" | "instagram" | "tiktok" }) {
  const link =
    icon === "facebook"
      ? "#facebook"
      : icon === "instagram"
        ? "#insta"
        : "#tiktok";
  return (
    <a
      href={link}
      target="_blank"
      aria-label={`${icon} link`}
      rel="noopener noreferrer"
      className="relative flex border border-white rounded-full w-11 h-11 md:w-20.25 md:h-20.25 items-center justify-center hover:bg-gray-300/30 hover:scale-105 select-none cursor-pointer"
    >
      <img
        src={`/icons/${icon}.svg`}
        className="w-6 h-6 md:w-10.75 md:h-10.75"
        alt={icon}
      />
    </a>
  );
}

export default memo(SocialIcon);
