"use client";
import { useEffect, useRef, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import type { PackageDetailsType } from "@/shared/global";

export const usePriceCalculation = (
  pkg: PackageDetailsType | undefined,
  methods: UseFormReturn<any>
) => {
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const { setValue, getValues, watch } = methods;

  const calculatePrice = useCallback(async () => {
    if (!pkg) return;

    const values = getValues();
    const selectedDestinations: string[] = [];

    pkg.customizations?.forEach((group) => {
      const groupValue = values[group.groupId];
      if (Array.isArray(groupValue)) {
        selectedDestinations.push(...groupValue);
      } else if (groupValue) {
        selectedDestinations.push(groupValue);
      }
    });

    const body = {
      packageId: pkg.packageId,
      adultsNumber: values.adultsNumber,
      kidsNumber: values.kidsNumber,
      tourguideLanguage: values.tourguideLanguage,
      selectedDestinations,
      pickupLocation: values.pickupLocation || "",
      promoCode: values.promoCode || "",
      paymentPreference: values.paymentPreference || "full",
    };

    try {
      const response = await fetch("/api/bookings/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        setValue("totalPrice", result.data.totalAmount || 0);
        setValue("selectedDestinations", selectedDestinations);
      }
    } catch (error) {
      
    }
  }, [pkg, getValues, setValue]);

  useEffect(() => {
    if (!pkg) return;

    // Initial calculation when package is loaded
    calculatePrice();

    const triggerFields = [
      "adultsNumber",
      "kidsNumber",
      "tourguideLanguage",
      "pickupLocation",
      "promoCode",
      "paymentPreference",
      "customerPhone",
      ...(pkg.customizations?.map((c) => c.groupId) || []),
    ];

    const subscription = watch((value, { name }) => {
      if (name && triggerFields.includes(name)) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          calculatePrice();
        }, 500);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pkg, calculatePrice, watch]);

  return { calculatePrice };
};
