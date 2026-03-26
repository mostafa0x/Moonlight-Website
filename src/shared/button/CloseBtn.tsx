import Link from "next/link";
import { memo } from "react";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";

function CloseBtn() {
  const { lang } = useBookingContext();

  return (
    <Link
      aria-label="close modal button"
      href={`/${lang}`}
      prefetch={false}
      className="flex items-center justify-center w-8.5 h-8.5 select-none transition-transform hover:scale-110"
    >
      <img
        src={"/icons/close.svg"}
        alt="close icon"
        className="w-8.5 h-8.5"
      />
    </Link>
  );
}

export default memo(CloseBtn);
