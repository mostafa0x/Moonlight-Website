"use client";

import { useFormContext, useController } from "react-hook-form";
import { memo, useState, useMemo } from "react";
import clsx from "clsx";
import useClickOutside from "@/shared/hooks/useClickOutside";
import countriesData from "./countries.json";

interface Country {
  name: string;
  code: string;
  emoji: string;
}

function CustomInput({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: "text" | "date" | "tel" | "email" | "nationality";
  placeholder: string;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  // Logic for tel type
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { containerRef } = useClickOutside(() => setOpen(false));

  const filteredCountries = useMemo(() => {
    return countriesData.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search)
    );
  }, [search]);

  // For tel type, we use a composite approach
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countriesData.find((c) => c.name === "Egypt") || countriesData[0]
  );

  const handleNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value.replace(/\D/g, "");
    // If local number is empty, field is empty (to trigger validation)
    field.onChange(val ? `${selectedCountry.code}${val}` : "");
  };

  const currentLocalNumber = field.value?.startsWith(selectedCountry.code)
    ? field.value.slice(selectedCountry.code.length)
    : "";

  const minDate = useMemo(() => {
    if (type !== "date") return undefined;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  }, [type]);

  if (type === "tel") {
    return (
      <div className="flex w-full flex-col gap-1">
        <label className="text-base text-[#8B8B8B] font-medium select-none" htmlFor={name}>
          {label}
        </label>

        <div className="flex gap-2">
          {/* Country Selector */}
          <div ref={containerRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={clsx(
                "bg-[#131313] border border-[#313131] h-8 rounded-[5px] px-2 flex items-center gap-2 text-sm text-white font-medium transition-colors hover:border-[#F2C975] cursor-pointer w-27.5 whitespace-nowrap",
                error && "border-red-500"
              )}
            >
              <span>{selectedCountry.emoji}</span>
              <span>{selectedCountry.code}</span>
              <img
                src="/icons/arrow-down.svg"
                className={clsx("w-3 transition-transform", open && "rotate-180")}
                alt=""
              />
            </button>

            {open && (
              <div className="absolute top-full mt-1 w-62.5 bg-[#1a1a1a] border border-[#313131] rounded-lg overflow-hidden z-9999 shadow-2xl">
                <div className="p-2 border-b border-[#313131]">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search country..."
                    className="w-full bg-[#131313] border border-[#313131] rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-[#F2C975]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="max-h-50 overflow-y-auto scrollbar-hide">
                  {filteredCountries.map((c) => (
                    <div
                      key={c.name}
                      onClick={() => {
                        setSelectedCountry(c);
                        setOpen(false);
                        setSearch("");
                        // Update the combined value based on the new country code
                        field.onChange(currentLocalNumber ? `${c.code}${currentLocalNumber}` : "");
                      }}
                      className="px-3 py-2 text-xs text-white hover:bg-[#F2C975]/10 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span>{c.emoji}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="text-[#8B8B8B]">{c.code}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Number Input */}
          <input
            id={name}
            type="tel"
            aria-label={`${label} input`}
            value={currentLocalNumber}
            onInput={handleNumberInput}
            className={clsx(
              "bg-[#131313] border flex-1 h-8 rounded-[5px] px-3.75 py-1.5 text-sm text-[#8B8B8B] font-medium transition-colors focus:outline-none",
              error ? "border-red-500" : "border-[#313131] focus:border-[#F2C975]"
            )}
            placeholder={placeholder}
            autoComplete="off"
          />
        </div>

        {error && (
          <span className="text-sm text-red-500 font-medium">
            {error.message as string}
          </span>
        )}
      </div>
    );
  }

  if (type === "nationality") {
    return (
      <div className="flex w-full flex-col gap-1" ref={containerRef}>
        <label
          className="text-base text-[#8B8B8B] font-medium select-none"
          htmlFor={name}
        >
          {label}
        </label>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={clsx(
              "bg-[#131313] border w-full h-8 rounded-[5px] px-3.75 py-1.5 flex items-center justify-between text-sm text-white font-medium transition-colors hover:border-[#F2C975] cursor-pointer",
              error ? "border-red-500" : "border-[#313131]"
            )}
          >
            <span className={clsx(!field.value && "text-[#4b4b4b]")}>
              {field.value || placeholder}
            </span>
            <img
              src="/icons/arrow-down.svg"
              className={clsx("w-3 transition-transform", open && "rotate-180")}
              alt=""
            />
          </button>

          {open && (
            <div className="absolute top-full mt-1 w-full bg-[#1a1a1a] border border-[#313131] rounded-lg overflow-hidden z-9999 shadow-2xl">
              <div className="p-2 border-b border-[#313131]">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search country..."
                  className="w-full bg-[#131313] border border-[#313131] rounded-md px-2 py-1 text-sm text-white focus:outline-none focus:border-[#F2C975]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="max-h-50 overflow-y-auto scrollbar-hide">
                {filteredCountries.map((c) => (
                  <div
                    key={c.name}
                    onClick={() => {
                      field.onChange(c.name);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={clsx(
                      "px-3 py-2 text-sm text-white hover:bg-[#F2C975]/10 cursor-pointer flex items-center gap-2 transition-colors",
                      field.value === c.name && "bg-[#F2C975]/20"
                    )}
                  >
                    <span>{c.emoji}</span>
                    <span>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && (
          <span className="text-sm text-red-500 font-medium">
            {error.message as string}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <label
        className="text-base text-[#8B8B8B] font-medium select-none"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        aria-label={`${label} input`}
        {...register(name)}
        className={clsx(
          "bg-[#131313] border w-full h-8 rounded-[5px] px-3.75 py-1.5 text-sm text-[#8B8B8B] font-medium transition-colors focus:outline-none",
          error ? "border-red-500" : "border-[#313131] focus:border-[#F2C975]",
          type === "date" && "[&::-webkit-calendar-picker-indicator]:invert-[1] [&::-webkit-calendar-picker-indicator]:brightness-200 cursor-pointer"
        )}
        placeholder={placeholder}
        type={type}
        autoComplete="off"
        min={minDate}
        onKeyDown={(e) => {
          if (type === "date") e.preventDefault();
        }}
        onClick={(e) => {
          if (type === "date") {
            try {
              (e.currentTarget as HTMLInputElement).showPicker();
            } catch (err) {
              console.warn("Picker not supported or failed", err);
            }
          }
        }}
      />
      {error && (
        <span className="text-sm text-red-500 font-medium">
          {error.message as string}
        </span>
      )}
    </div>
  );
}

export default memo(CustomInput);
