import MenuBtn from "@/shared/button/MenuBtn";
import Link from "next/link";
import { memo } from "react";

const LINKS = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Privacy Policy",
    link: "/privacy",
  },
  {
    title: "Terms of use",
    link: "/terms",
  },
  {
    title: "Login",
    link: "#",
  },
];
function NavBar() {
  return (
    <div className="absolute top-0 left-0 w-full px-6 lg:px-20 pt-3.25 flex flex-row justify-between z-65">
      <div>Logo</div>
      <div className=" lg:hidden">
        <MenuBtn />
      </div>
      <div className="hidden flex-row gap-9 justify-between pt-3 lg:flex">
        {LINKS.map((link) => (
          <Link
            href={link.link}
            className="font-bold font-cairo text-xl text-white hover:text-gray-300 select-none"
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
