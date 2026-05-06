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

    setValue("isCalculatingPrice", true);

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
      paymentPreference: values.paymentPreference || "deposit",
    };

    try {
      const response = await fetch("/api/bookings/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.data) {
          setValue("totalPrice", result.data.totalAmount || 0);
          setValue("dueAmount", result.data.dueAmount || 0);
          setValue("payNowAmount", result.data.payNowAmount || 0);
        }
        
        setValue("promoStatus", result.promoStatus ?? null);
        setValue("selectedDestinations", selectedDestinations);
      }
    } catch (error) {
      console.error("Price calculation failed", error);
    } finally {
      setValue("isCalculatingPrice", false);
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
      // Ignore updates to our own calculation state to prevent infinite loops
      const internalFields = ["isCalculatingPrice", "promoStatus", "totalPrice", "dueAmount", "payNowAmount", "selectedDestinations"];
      if (name && internalFields.includes(name)) return;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      // Show loading state immediately (deferred slightly to avoid RHF sync update issues)
      setTimeout(() => setValue("isCalculatingPrice", true), 0);
      
      timeoutRef.current = setTimeout(() => {
        calculatePrice();
      }, 500);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pkg, calculatePrice, watch]);

  return { calculatePrice };
};
