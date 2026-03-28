"use client";

import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { CustomInputProps } from "./types";
import TelInput from "./TelInput";
import NationalityInput from "./NationalityInput";
import StandardInput from "./StandardInput";

/**
 * CustomInput: Entry point that routes to specialized sub-components based on 'type'.
 */
function CustomInput(props: CustomInputProps) {
  const { register, control, formState: { errors } } = useFormContext();
  const error = errors[props.name];

  const commonProps = { ...props, error, control, register };

  switch (props.type) {
    case "tel":
      return <TelInput {...commonProps} />;
    case "nationality":
      return <NationalityInput {...commonProps} />;
    default:
      return <StandardInput {...commonProps} />;
  }
}

CustomInput.displayName = "CustomInput";

export default memo(CustomInput);
