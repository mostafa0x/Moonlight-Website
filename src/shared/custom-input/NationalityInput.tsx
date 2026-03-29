"use client";

import { memo, useState, useMemo } from "react";
import { useController } from "react-hook-form";
import countriesData from "./countries.json";
import FieldWrapper from "./FieldWrapper";
import CountryDropdown from "./CountryDropdown";

const NationalityInput = ({ label, name, placeholder, error, control }: any) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { field } = useController({ name, control, defaultValue: "" });

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return countriesData.filter(c => c.name.toLowerCase().includes(s));
  }, [search]);

  return (
    <FieldWrapper label={label} name={name} error={error}>
      <CountryDropdown 
        isOpen={open} setIsOpen={setOpen}
        search={search} setSearch={setSearch}
        filteredCountries={filtered}
        onSelect={(c) => { field.onChange(c.name); setOpen(false); }}
        placeholder={placeholder}
        selectedName={field.value}
        error={error}
      />
    </FieldWrapper>
  );
};


NationalityInput.displayName = "NationalityInput";

export default NationalityInput;
