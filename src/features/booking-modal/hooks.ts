import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useBookingModal = () => {
  const query = useSearchParams();
  const router = useRouter();
  const xx = new URLSearchParams(query);

  const tourId = query.get("tourId");
  const isOpen = !!tourId;
  const adults = Number(query.get("adults") ?? "1");
  const step = Number(query.get("step") ?? "1");

  const nextStep = `/?tourId=${tourId}&step=${step + 1}`;
  const prevStep = `/?tourId=${tourId}&step=${step - 1}`;

  const handleChangeAdults = useCallback(
    (type: "increase" | "decrease") => {
      if (Number(adults) === 1 && type === "decrease") return;
      type === "increase"
        ? xx.set("adults", String(Number(adults) + 1))
        : xx.set("adults", String(Number(adults) - 1));
      router.push(`/?${xx.toString()}`);
    },
    [adults],
  );
  useEffect(() => {
    if (isOpen && step !== 1) {
      // router.replace(`/?tourId=${tourId}&step=1`);
    }
  }, [isOpen]);

  return { isOpen, step, nextStep, adults, prevStep, handleChangeAdults };
};
