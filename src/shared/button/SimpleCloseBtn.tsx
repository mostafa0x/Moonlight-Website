"use client";

import { memo } from "react";

interface SimpleCloseBtnProps {
  onClick: (e: React.MouseEvent) => void;
}

/**
 * زرار إغلاق بسيط لمودال التسجيل:
 * وظيفته بس إنه يغير الحالة (Toggle) ومش بيعمل ريدايركت.
 */
function SimpleCloseBtn({ onClick }: SimpleCloseBtnProps) {
  return (
    <button
      aria-label="close modal"
      onClick={onClick}
      className="flex items-center justify-center w-8.5 h-8.5 select-none transition-transform hover:scale-110 cursor-pointer bg-transparent border-none appearance-none"
    >
      <img
        src={"/icons/close.svg"}
        alt="close icon"
        className="w-8.5 h-8.5"
      />
    </button>
  );
}

export default memo(SimpleCloseBtn);
