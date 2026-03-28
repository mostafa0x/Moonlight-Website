"use client";

import { memo, useState, useMemo, useCallback } from "react";
import { useController } from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import countriesData from "./countries.json";
import FieldWrapper from "./FieldWrapper";
import CountryDropdown from "./CountryDropdown";
import { Country } from "./types";

const TelInput = memo(({ label, name, placeholder, error, control }: any) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { field } = useController({ name, control, defaultValue: "" });
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countriesData.find((c) => c.name === "Egypt") || countriesData[0]
  );

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return countriesData.filter(c => c.name.toLowerCase().includes(s) || c.code.includes(s));
  }, [search]);

  const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const val = (e.currentTarget).value.replace(/\D/g, "");
    field.onChange(val ? `${selectedCountry.code}${val}` : "");
  }, [field, selectedCountry.code]);

  const displayVal = useMemo(() => 
    field.value?.startsWith(selectedCountry.code) ? field.value.slice(selectedCountry.code.length) : ""
  , [field.value, selectedCountry.code]);

  return (
    <FieldWrapper label={label} name={name} error={error}>
      <div className="flex gap-2">
        <CountryDropdown 
          isOpen={open} setIsOpen={setOpen}
          search={search} setSearch={setSearch}
          filteredCountries={filtered}
          onSelect={(c) => {
            setSelectedCountry(c);
            setOpen(false);
            field.onChange(displayVal ? `${c.code}${displayVal}` : "");
          }}
          placeholder=""
          customTrigger={
            <button type="button" className={cn("flex h-10 w-32 items-center justify-between gap-2 rounded-lg border bg-[#131313] px-3 text-sm text-white transition-all hover:border-[#F2C975]", error ? "border-red-500" : "border-[#313131]")}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedCountry.emoji}</span>
                <span className="font-bold tracking-tight">{selectedCountry.code}</span>
              </div>
              <img src="/icons/arrow-down.svg" className={cn("w-2.5 transition-transform", open && "rotate-180")} alt="" />
            </button>
          }
        />
        <input
          id={name} type="tel" value={displayVal} onInput={handleInput}
          className={cn("bg-[#131313] border flex-1 h-10 rounded-lg px-4 text-sm font-medium text-white transition-all outline-none", error ? "border-red-500" : "border-[#313131] focus:border-[#F2C975]")}
          placeholder={placeholder} autoComplete="off"
        />
      </div>
    </FieldWrapper>
  );
});

TelInput.displayName = "TelInput";

export default TelInput;
