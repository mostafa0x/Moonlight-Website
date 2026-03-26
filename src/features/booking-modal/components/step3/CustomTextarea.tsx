"use client";
import { useFormContext } from "react-hook-form";
import { memo, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

function CustomTextarea({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder: string;
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const t = useTranslations("bookingModal.step4");
  const [loading, setLoading] = useState(false);
  const error = errors[name];

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert(t("alerts.notSupported"));
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const address = `${latitude}, ${longitude}`;
          setValue(name, address, { shouldValidate: true });
        } catch (err) {
          alert(t("alerts.fetchError"));
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        alert(t("alerts.denied"));
        setLoading(false);
      },
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="text-base text-[#8B8B8B] font-medium">
          {label}
        </label>
        <button
          type="button"
          onClick={handleGetLocation}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs text-[#F2C975] hover:text-[#887142] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <div className="w-3 h-3 border-2 border-[#F2C975] border-t-transparent rounded-full animate-spin" />
          ) : (
            <img src={"/icons/location-outlined.svg"} alt="icon" />
          )}
          {loading ? t("gettingLocation") : t("useLocation")}
        </button>
      </div>
      <textarea
        id={name}
        {...register(name)}
        className={clsx(
          "w-full bg-[#131313] border resize-none rounded-[5px] px-2 py-1.5 text-sm md:text-base text-white transition-colors focus:outline-none",
          error ? "border-red-500" : "border-[#313131] focus:border-[#F2C975]",
        )}
        rows={4}
        placeholder={placeholder}
      />
      {error && (
        <span className="text-sm text-red-500 font-medium">
          {error.message as string}
        </span>
      )}
    </div>
  );
}

export default memo(CustomTextarea);
