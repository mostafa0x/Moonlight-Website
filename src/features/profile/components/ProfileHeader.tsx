import React from "react";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { SignOutButton } from "./SignOutButton";

interface ProfileHeaderProps {
  user: User;
}

/**
 * ProfileHeader: A Server Component for the user profile header.
 * 
 * Optimized for:
 * - 0% Client JS for layout and data rendering.
 * - Optimized LCP using next/image priority.
 * - Scalable design.
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const userName = user.user_metadata?.full_name || user.user_metadata?.name || "USER";
  const userEmail = user.email || "";
  const avatarSrc = user.user_metadata?.avatar_url || "/imgs/placeholder.webp";

  return (
    <div className="flex flex-col bg-black/30 p-10 rounded-b-2xl md:flex-row items-center justify-between gap-6 md:px-10">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Avatar Section - Optimized for LCP */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-zinc-800 shadow-xl shadow-white/5">
          <Image
            src={avatarSrc}
            alt={userName}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 128px, 160px"
          />
        </div>

        {/* Info Section */}
        <div className="text-center md:text-left flex flex-col gap-1 items-center md:items-start">
          <h1 className="text-3xl md:text-4xl font-bold font-cairo uppercase leading-tight">
            {userName}
          </h1>
          <p className="text-slate-400 text-base md:text-lg font-normal font-cairo">
            {userEmail}
          </p>

          {/* Sign Out (Mobile) */}
          <SignOutButton isMobile={true} />
        </div>
      </div>

      {/* Sign Out (Desktop) */}
      <SignOutButton isMobile={false} />
    </div>
  );
};
