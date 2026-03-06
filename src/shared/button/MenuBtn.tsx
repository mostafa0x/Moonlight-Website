import { memo } from "react";

function MenuBtn() {
  return (
    <div className=" select-none cursor-pointer">
      <img src="/icons/hamburger.svg" alt="hamburger" className="w-6 h-4.25" />
    </div>
  );
}
export default memo(MenuBtn);
