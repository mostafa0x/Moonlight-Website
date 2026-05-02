"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAuth } from "@/shared/providers/AuthProvider";
import Avatar from "@/shared/components/avatar";

export default function AuthSection({ locale }: { locale: string }) {
  const t = useTranslations("navbar");
  const { isLoggedIn, userData, setShowLoginModal, signOut } = useAuth();

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-6">
        <Link
          href={`/${locale}/profile`}
          className="group flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Avatar src={userData?.avatar || ""} />
          <span className="font-cairo text-base font-bold text-white group-hover:text-[#F2C975]">
            {userData?.name?.split(" ")[0]}
          </span>
        </Link>
        <button
          onClick={() => signOut()}
          className="cursor-pointer text-xs font-bold uppercase text-red-500 transition-colors hover:text-red-400"
        >
          {t("logout") || "Logout"}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowLoginModal(true)}
      className="cursor-pointer font-cairo text-base font-bold text-white transition-colors hover:text-[#F2C975] select-none xl:text-lg"
    >
      {t("login") || "Login"}
    </button>
  );
}
