import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useBookingModal = () => {
  const query = useSearchParams();
  const tourId = query.get("tourId");
  const isOpen = !!tourId;
  const step = Number(query.get("step") ?? "1");
  const nextStep = `/?tourId=${tourId}&step=${step + 1}`;

  return { isOpen, step, nextStep };
};
