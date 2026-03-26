"use client";
import MenuBtn from "@/shared/button/MenuBtn";
import Link from "next/link";
import { memo } from "react";
import { useTranslations } from "next-intl";
import Avatar from "@/shared/components/avatar";

function NavBar({ locale, userToken = "xx" }: { locale: string; userToken?: string }) {
  const t = useTranslations("navbar");

  const LINKS = [
    { title: t("home"), link: `/${locale}` },
    { title: t("about"), link: `/${locale}/about` },
    { title: t("contact"), link: `/${locale}/contact` },
    { title: t("privacy"), link: `/${locale}/privacy` },
    { title: t("terms"), link: `/${locale}/terms` },
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
        {userToken ? (
          <Link href={"/profile"} className="flex flex-row gap-1 items-center">
            <Avatar />
            <span className="text-base text-white font-bold">Alex</span>
          </Link>
        ) : (
          <Link
            href={"/login"}
            className="font-bold font-cairo text-base  xl:text-xl text-white hover:text-gray-300 select-none"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default memo(NavBar);
