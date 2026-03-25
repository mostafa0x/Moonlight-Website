import { useFormContext } from "react-hook-form";
import { memo, useState } from "react";
import clsx from "clsx";

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

  const [loading, setLoading] = useState(false);
  const error = errors[name];

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await response.json();
          const address = `${latitude}, ${longitude}`;
          setValue(name, address, { shouldValidate: true });
        } catch (err) {
          console.error("Error fetching address:", err);
          alert("Could not fetch address. Please enter it manually.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Permission denied or location not found.");
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          )}
          {loading ? "Getting location..." : "Use Current Location"}
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
