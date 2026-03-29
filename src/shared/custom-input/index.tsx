"use client";

import { useFormContext, useFormState } from "react-hook-form";
import { CustomInputProps } from "./types";
import TelInput from "./TelInput";
import NationalityInput from "./NationalityInput";
import StandardInput from "./StandardInput";

/**
 * CustomInput: Entry point that routes to specialized sub-components based on 'type'.
 * 
 * Optimized to re-render precisely when validation errors for its specific 'name' change.
 */
function CustomInput(props: CustomInputProps) {
  const { register, control } = useFormContext();
  
  // Specifically subscribe to errors for this field name to ensure immediate UI feedback
  const { errors } = useFormState({ control, name: props.name as any });
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

export default CustomInput;
