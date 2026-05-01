import { memo } from "react";

export const SOCIAL_LINKS = {
  facebook: "https://www.instagram.com/egypt_moonlight_tours?igsh=MWhyM2JyNm5wMnQzdg%3D%3D&utm_source=qr",
  instagram: "https://www.instagram.com/egypt_moonlight_tours?igsh=MWhyM2JyNm5wMnQzdg%3D%3D&utm_source=qr",
  tiktok: "https://www.tiktok.com/@moonlight.egypt.t?_r=1&_t=ZS-95zKwdNacy5",
  whatsapp: null,
} as const;

type IconType = keyof typeof SOCIAL_LINKS;

function SocialIcon({ icon }: { icon: IconType }) {
  const href = SOCIAL_LINKS[icon];

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow us on ${icon}`}
      className="relative flex items-center justify-center w-11 h-11 md:w-20.25 md:h-20.25 border border-white/20 rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-110 active:scale-95 cursor-pointer select-none"
    >
      <img
        src={`/icons/${icon}.svg`}
        alt={`${icon} icon`}
        className="w-6 h-6 md:w-10.75 md:h-10.75 object-contain"
        loading="lazy"
      />
    </a>
  );
}

export default memo(SocialIcon);
