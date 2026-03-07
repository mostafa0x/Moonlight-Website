import { memo } from "react";

function MenuBtn() {
  return (
    <button aria-label="menu button" className=" select-none cursor-pointer">
      <img src="/icons/hamburger.svg" alt="hamburger" className="w-6 h-4.25" />
    </button>
  );
}
export default memo(MenuBtn);
