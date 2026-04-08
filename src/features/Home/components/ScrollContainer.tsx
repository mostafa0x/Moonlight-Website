import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * ScrollContainer — Next-gen Server Component for Full Page Scrolling.
 * Leverages native CSS Scroll Snap for 60fps performance on all devices.
 * Zero-JS initial scroll layout.
 */
export default function ScrollContainer({ children, className }: ScrollContainerProps) {
  return (
    <main
      className={cn(
        "h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide overscroll-contain",
        className
      )}
    >
      {children}
    </main>
  );
}
