"use client";
import MenuBtn from "@/shared/button/MenuBtn";
import Link from "next/link";
import { memo } from "react";
import { useTranslations } from "next-intl";
import Avatar from "@/shared/components/avatar";
import { useAuth } from "@/shared/providers/AuthProvider";

function NavBar({ locale }: { locale: string }) {
  const t = useTranslations("navbar");
  const { isLoggedIn, userData, setShowLoginModal, signOut } = useAuth();

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
        {isLoggedIn ? (
          <div className="flex flex-row gap-4 items-center">
            <Link href={`/${locale}/profile`} className="flex flex-row gap-1 items-center">
              <Avatar src={userData?.avatar || ""} />
              <span className="text-base text-white font-bold">{userData?.name?.split(' ')[0]}</span>
            </Link>
            <button 
              onClick={() => signOut()}
              className="text-xs text-red-500 hover:text-red-400 font-bold uppercase cursor-pointer"
            >
              {t("logout") || "Logout"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="font-bold font-cairo text-base xl:text-xl text-white hover:text-[#F2C975] select-none cursor-pointer"
          >
            {t("login") || "Login"}
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(NavBar);
