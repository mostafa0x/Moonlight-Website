"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBookingSchema } from "../schema";
import { useTranslations } from "next-intl";
import { PackageDetailsType } from "@/shared/global";

export const useBookingForm = (pkg?: PackageDetailsType) => {
  const t = useTranslations("bookingModal");
  
  const methods = useForm({
    resolver: zodResolver(getBookingSchema(t)),
    mode: "onChange",
    defaultValues: {
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
    },
  });

  return methods;
};
