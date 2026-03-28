"use client";

import { memo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Avatar from "@/shared/components/avatar";
import { useAuth } from "@/shared/providers/AuthProvider";

interface DrawerProfileProps {
  onClose: () => void;
  locale: string;
}

/**
 * DrawerProfile - Handles user authentication states in the mobile drawer.
 */
function DrawerProfile({ onClose, locale }: DrawerProfileProps) {
  const t = useTranslations("navbar");
  const { isLoggedIn, userData, setShowLoginModal, signOut } = useAuth();

  if (!isLoggedIn) {
    return (
      <button
        onClick={() => {
          setShowLoginModal(true);
          onClose();
        }}
        className="mb-8 w-full rounded-xl border border-[#F2C975]/30 bg-[#F2C975]/5 py-3.5 text-center font-cairo text-base font-black text-[#F2C975] shadow-lg transition-all hover:bg-[#F2C975]/10 active:scale-95 sm:py-4"
      >
        {t("login") || "Login"}
      </button>
    );
  }

  return (
    <div className="mb-8 flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10">
      <Link
        href={`/${locale}/profile`}
        onClick={onClose}
        className="flex flex-1 items-center gap-4 cursor-pointer"
      >
        <Avatar src={userData?.avatar || ""} />
        <div className="flex flex-col">
          <span className="font-cairo text-base font-bold text-white leading-tight">
            {userData?.name || "User"}
          </span>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          signOut();
          onClose();
        }}
        className="text-[10px] font-bold uppercase text-red-500/80 hover:text-red-400 transition-colors cursor-pointer"
      >
        {t("logout") || "Logout"}
      </button>
    </div>
  );
}

export default memo(DrawerProfile);
