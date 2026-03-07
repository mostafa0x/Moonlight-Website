import { useState } from "react";

export const useBookingModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return { isOpen };
};
