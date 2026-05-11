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

  const calculatePrice = useCallback(async (overrides?: any) => {
    if (!pkg) return;

    setValue("isCalculatingPrice", true);

    const values = { ...getValues(), ...overrides };
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
        
        // Extract promoStatus from either root level or data object
        const finalPromoStatus = result.promoStatus ?? result.data?.promoStatus ?? null;
        setValue("promoStatus", finalPromoStatus);
        setValue("selectedDestinations", selectedDestinations);
      } else {
        const errorResult = await response.json().catch(() => ({}));
        const finalPromoStatus = errorResult.promoStatus ?? errorResult.data?.promoStatus ?? null;
        if (finalPromoStatus !== null) {
          setValue("promoStatus", finalPromoStatus);
        } else if (values.promoCode) {
          // If the calculation failed and there's a promo code, it's safe to mark it invalid.
          setValue("promoStatus", "not valid");
        }
      }
    } catch (error) {
      
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
      ...(pkg.customizations?.map((c) => c.groupId) || []),
    ];

    const subscription = watch((value, { name, type }) => {
      
      // If name is undefined, it's a bulk update (like reset), so we should calculate
      // Otherwise, only recalculate if the changed field is in our list
      const shouldTrigger = !name || triggerFields.includes(name);
      
      if (!shouldTrigger) return;

      // Prevent infinite loops if we are already calculating
      if (name === "isCalculatingPrice") return;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      // Show loading state immediately
      setTimeout(() => setValue("isCalculatingPrice", true), 0);
      
      timeoutRef.current = setTimeout(() => {
        calculatePrice();
      }, 500);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pkg, calculatePrice, watch, setValue]);

  return { calculatePrice };
};
