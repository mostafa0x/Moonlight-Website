import BackBtn from "./BackBtn";
import ConfirmBooking from "./ConfirmBooking";
import NextStepBtn from "./NextStepBtn";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import { useGetPackage } from "@/features/booking-modal/hooks";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useAuth } from "@/shared/providers/AuthProvider";
import { supabase } from "@/shared/lib/supabase";
import EgyptianLoader from "@/shared/components/EgyptianLoader";

function FooterModal({ step }: { step: number }) {
  const { nextStep, prevStep, tourId, totalSteps } = useBookingContext();
  const { data: pkg } = useGetPackage(tourId);
  const { control, trigger, getValues } = useFormContext();
  const t = useTranslations("bookingModal.footer");
  const te = useTranslations("bookingModal.backendErrors");
  const { isLoggedIn, setShowLoginModal } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleNext = async () => {
    setErrorMsg(null);
    const hasCustomizations =
      pkg?.customizations && pkg.customizations.length > 0;
    const isContactStep = hasCustomizations ? step === 4 : step === 3;

    if (isContactStep) {
      if (!isLoggedIn) {
        setShowLoginModal(true);
        return;
      }
      const isValid = await trigger([
        "customerName",
        "customerPhone",
        "tourDate",
        "nationality",
        "address",
      ]);
      if (isValid) nextStep();
    } else {
      nextStep();
    }
  };

  const handleBookingSubmit = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
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
        window.location.reload();
      } else {
        const errorData = await response.json();
        const errorCode = errorData.code || "UNKNOWN_ERROR";
        // Use translation or fallback to raw message if code not found
        try {
          setErrorMsg(te(errorCode));
        } catch {
          setErrorMsg(errorData.message || te("UNKNOWN_ERROR"));
        }
      }
    } catch (err) {
      setErrorMsg(te("INTERNAL_SERVER_ERROR"));
    } finally {
      setLoading(false);
    }
  };

  const name = "totalPrice";
  const {
    field: { value = 0 },
  } = useController({ name, control, defaultValue: 0 });

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  return (
    <div className="relative flex flex-row justify-between items-center border-t border-[#313131] pt-3.5">
      {loading && (
        <div className="fixed inset-0 z-1000000 flex items-center justify-center opacity-50 ">
          <EgyptianLoader />
        </div>
      )}
      {errorMsg && (
        <div className="absolute -top-14 left-0 right-0 flex justify-center z-100 px-4 pointer-events-none">
          <div className="bg-[#0D0D0D]/90 backdrop-blur-md border border-[#F2C975]/40 px-6 py-2.5 rounded-2xl flex items-center gap-3 shadow-[0_10px_40px_-10px_rgba(242,201,117,0.2)] animate-in fade-in slide-in-from-bottom-3 duration-500 pointer-events-auto">
            <div className="shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F2C975]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <span className="text-[#ff9191] text-xs font-medium tracking-wider uppercase">
              {errorMsg}
            </span>
          </div>
        </div>
      )}

      <BackBtn prevStep={prevStep} />
      <div
        className={clsx(
          "flex md:flex-row items-center gap-4",
          step === totalSteps && "flex-col-reverse",
        )}
      >
        {step === totalSteps ? (
          <div className="flex flex-row gap-1.5">
            <img
              src={"/icons/visa.webp"}
              alt="visa"
              className="w-[30] h-7.5 md:w-12.5 md:h-12.5"
            />
            <img
              src={"/icons/master-card.webp"}
              alt="master card"
              className="w-[30] h-7.5 md:w-12.5 md:h-12.5"
            />
            <img
              src={"/icons/paypal.webp"}
              alt="paypal"
              className="w-[30] h-7.5 md:w-12.5 md:h-12.5"
            />
          </div>
        ) : (
          <div className="flex flex-col text-right">
            <span className="text-base text-[#8B8B8B] font-semibold">
              {t("totalPrice")}
            </span>
            <span className="text-[20px] text-[#F2C975] font-medium">
              {value}$
            </span>
          </div>
        )}
        {step === totalSteps ? (
          <ConfirmBooking callback={handleBookingSubmit} />
        ) : (
          <NextStepBtn nextStep={handleNext} />
        )}
      </div>
    </div>
  );
}

export default memo(FooterModal);
