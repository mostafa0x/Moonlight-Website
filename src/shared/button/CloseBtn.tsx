import Link from "next/link";
import { memo } from "react";

function CloseBtn() {
  return (
    <Link href={"/"} prefetch={false}>
      <img
        src={"/icons/close.svg"}
        alt="close icon"
        className="w-8.5 h-8.5 select-none"
      />
    </Link>
  );
}

export default memo(CloseBtn);
