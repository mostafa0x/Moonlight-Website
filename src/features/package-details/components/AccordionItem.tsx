"use client";

import { useState, useCallback, memo } from "react";

/**
 * AccordionItem — Client Component (minimal interactive scope)
 *
 * A reusable expandable/collapsible panel with smooth animations.
 * Client-side only for the toggle interaction — zero unnecessary state/effects.
 */
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div
      className="rounded-lg border border-orange-300 overflow-hidden transition-all duration-300 cursor-pointer group select-none"
      onClick={toggle}

      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
    >
      <div className="w-full px-4 py-4 flex items-center justify-between">
        <span className="text-zinc-300 md:text-white text-base md:text-xl font-bold font-cairo leading-6 text-left">
          {title}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 text-stone-200 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? "rotate-180" : ""
            }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4">
            <div className="text-white text-base md:text-xl font-medium font-cairo leading-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AccordionItem.displayName = "AccordionItem";

export default memo(AccordionItem);
