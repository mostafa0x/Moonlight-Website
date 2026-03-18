"use client";
import MenuBtn from "@/shared/button/MenuBtn";
import Link from "next/link";
import { memo } from "react";
import { useTranslations } from "next-intl";

function NavBar() {
  const t = useTranslations("navbar");

  const LINKS = [
    { title: t("home"), link: "/" },
    { title: t("about"), link: "/about" },
    { title: t("contact"), link: "/contact" },
    { title: t("privacy"), link: "/privacy" },
    { title: t("terms"), link: "/terms" },
    { title: t("login"), link: "#" },
  ];

  return (
    <div className="absolute top-0 left-0 w-full px-6 lg:px-20 pt-3.25 flex flex-row justify-between z-65">
      <div>Logo</div>
      <div className="lg:hidden">
        <MenuBtn />
      </div>
      <div className="hidden flex-row gap-9 justify-between pt-3 lg:flex">
        {LINKS.map((link) => (
          <Link
            href={link.link}
            className="font-bold font-cairo text-base  xl:text-xl text-white hover:text-gray-300 select-none"
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
