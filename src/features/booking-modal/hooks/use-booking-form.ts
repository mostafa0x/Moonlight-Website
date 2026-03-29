"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBookingSchema } from "../schema";
import { useTranslations } from "next-intl";
import { PackageDetailsType } from "@/shared/global";

export const useBookingForm = (pkg?: PackageDetailsType) => {
  const t = useTranslations("bookingModal");
  
  // Logic to instantly restore pending data if available (e.g., after login redirect)
  const getInitialValues = () => {
    const base = {
      adultsNumber: 1,
      kidsNumber: 0,
      tourguideLanguage: "en",
      totalPrice: pkg?.startingPrice || 0,
      selectedDestinations: [] as string[],
      tourDate: "",
      customerName: "",
      customerPhone: "",
      nationality: "",
      pickupLocation: "Giza",
      address: "",
      promoCode: "",
      paymentPreference: "full",
    };

    if (typeof window === "undefined") return base;

    const saved = localStorage.getItem("pending_booking_data");
    if (!saved || !pkg) return base;

    try {
      const data = JSON.parse(saved);
      // Ensure the saved data belongs to the currently active tour package
      if (data.tourId === pkg.packageId) {
        return { ...base, ...data.formValues };
      }
    } catch (e) {
      console.error("Failed to restore initial booking values", e);
    }
    return base;
  };

  const methods = useForm({
    resolver: zodResolver(getBookingSchema(t)),
    mode: "onChange",
    defaultValues: getInitialValues(),
  });

  return methods;
};

