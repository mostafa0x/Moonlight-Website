"use client";

import { useAuth } from "@/shared/hooks/useAuth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

/**
 * SignOutButton: A minimalistic Client Component for authentication interactions.
 */
export const SignOutButton: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { signOut } = useAuth();
  const t = useTranslations("profile");
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/"); // Redirect to home immediately
  };

  if (isMobile) {
    return (
      <button
        onClick={handleSignOut}
        className="md:hidden mt-2 bg-rose-500 rounded-[10px] px-6 py-2 flex items-center justify-center gap-2.5 hover:bg-rose-600 transition-colors"
      >
        <img src={"/icons/sign-out.svg"} alt="sign out" />
        <span className="text-white text-sm font-normal font-cairo">{t("signOut")}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleSignOut}
      className="hidden md:flex w-40 h-14 bg-rose-500/40 hover:bg-rose-500 rounded-[20px] items-center justify-center gap-2.5 hover:bg-rose-600 transition-shadow shadow-lg shadow-rose-500/20"
    >
      <img src={"/icons/sign-out.svg"} alt="sign out" />
      <span className="text-white text-xl font-normal font-cairo">{t("signOut")}</span>
    </button>
  );
};
