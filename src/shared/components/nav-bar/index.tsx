import Link from "next/link";
import { memo } from "react";

const LINKS = [
  {
    title: "Home",
    link: "#",
  },
  {
    title: "About",
    link: "#",
  },
  {
    title: "Contact",
    link: "#",
  },
  {
    title: "Privacy Policy",
    link: "#",
  },
  {
    title: "Terms of use",
    link: "#",
  },
  {
    title: "Login",
    link: "#",
  },
];
function NavBar() {
  return (
    <div className="absolute top-0 left-0 w-full px-[80px] pt-[13px] flex flex-row justify-between z-65">
      <div>Logo</div>
      <div className="flex flex-row gap-9 justify-between pt-[12px]">
        {LINKS.map((link) => (
          <Link
            href={link.link}
            className="font-bold font-cairo text-xl text-white hover:text-gray-300"
            key={link.title}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default memo(NavBar);
