import { memo } from "react";

function CloseBtn() {
  return (
    <img
      src={"/icons/close.svg"}
      alt="close icon"
      className="w-8.5 h-8.5 select-none"
    />
  );
}

export default memo(CloseBtn);
