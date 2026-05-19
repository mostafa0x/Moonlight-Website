import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { supabase } from "@/shared/lib/supabase";
import { useTranslations } from "next-intl";

interface UseBookingSubmitProps {
  tourId: string;
  setShowLoginModal: (show: boolean) => void;
}

/**
 * useBookingSubmit: Custom hook to encapsulate the complex booking submission flow.
 * 
 * Benefits:
 * - Isolation: Logic is separated from UI components, improving testability.
 * - Single Responsibility: Handles API communication, validation, and error state mapping.
 */
export function useBookingSubmit({ tourId, setShowLoginModal }: UseBookingSubmitProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { trigger, getValues } = useFormContext();
  const te = useTranslations("bookingModal.backendErrors");

  const submitBooking = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      // Final validation safeguard before API submission
      const isValid = await trigger();
      if (!isValid) {
        setLoading(false);
        setErrorMsg("Please fix the errors in your details.");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setShowLoginModal(true);
        setLoading(false);
        return;
      }

      const values = getValues();
      const payload = {
        packageId: tourId,
        adultsNumber: Number(values.adultsNumber),
        kidsNumber: Number(values.kidsNumber),
        tourguideLanguage: values.tourguideLanguage,
        selectedDestinations: values.selectedDestinations || [],
        tourDate: values.tourDate,
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        nationality: values.nationality,
        address: values.address,
        pickupLocation: values.pickupLocation,
        paymentPreference: values.paymentPreference,
      };

      const idempotencyKey = crypto.randomUUID();
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
          "x-idempotency-key": idempotencyKey,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.status === "error" || result.error) {
          const errorCode = result.code || result.error || "UNKNOWN_ERROR";
          try {
            setErrorMsg(te(errorCode));
          } catch {
            setErrorMsg(te("UNKNOWN_ERROR"));
          }
          setLoading(false);
        } else {
          if (typeof window !== "undefined") {
            localStorage.removeItem("pending_booking_data");
          }
          const currentPath = window.location.pathname;
          const currentLocale = currentPath.split('/')[1] || "en";
          window.location.href = `/${currentLocale}/payment/success`;
        }
      } else {
        const text = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(text);
        } catch (e) {
          errorData = { code: "UNKNOWN_ERROR" };
        }

        const errorCode = errorData?.details?.code || errorData.code || errorData.error || "UNKNOWN_ERROR";

        // Whitelist of valid keys present in messages/*.json under bookingModal.backendErrors
        const knownErrors = [
          "VALIDATION_ERROR",
          "AUTH_ERROR",
          "DUPLICATE_BOOKING",
          "INTERNAL_SERVER_ERROR",
          "PAYMENT_URL_MISSING",
          "UNKNOWN_ERROR"
        ];

        if (knownErrors.includes(errorCode)) {
          setErrorMsg(te(errorCode as any));
        } else {
          setErrorMsg(te("UNKNOWN_ERROR"));
        }
        setLoading(false);
      }
    } catch (err) {
      setErrorMsg(te("INTERNAL_SERVER_ERROR"));
      setLoading(false);
    }
  };

  return { submitBooking, loading, errorMsg, setErrorMsg };
}
