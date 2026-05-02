"use client";

import dynamic from "next/dynamic";
import { MenuBtn, useMobileMenu } from "@/features/navigation";

// Performance: Defer mobile drawer loading until interaction to reduce FCP/TBT blocking
const MobileDrawer = dynamic(
  () => import("@/features/navigation").then((mod) => mod.MobileDrawer),
  { ssr: false }
);

export default function MobileSection({ locale }: { locale: string }) {
  const { isOpen: isMenuOpen, toggle: toggleMenu, close: closeMenu } = useMobileMenu();

  return (
    <>
      <div className="flex items-center gap-4 lg:hidden">
        <MenuBtn isOpen={isMenuOpen} onClick={toggleMenu} />
      </div>
      <MobileDrawer isOpen={isMenuOpen} onClose={closeMenu} locale={locale} />
    </>
  );
}
