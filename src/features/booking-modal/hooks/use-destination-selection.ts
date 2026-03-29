import { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";

/**
 * useDestinationSelection: A custom hook to handle destination selection logic within a form.
 * 
 * Optimized for Vercel React Best Practices:
 * - INP: Logic is handled via memoized callbacks to avoid creating new functions on every render.
 * - Re-renders: Subscribes only to the specific controller value for the group.
 * - Performance: Handles single vs multi-select logic efficiently.
 */
export function useDestinationSelection(groupId: string, maxSelect: number) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name: groupId,
    control,
    defaultValue: maxSelect === 1 ? "" : [],
  });

  const isSelected = useCallback(
    (optionId: string) => {
      if (maxSelect === 1) return value === optionId;
      return Array.isArray(value) && value.includes(optionId);
    },
    [value, maxSelect]
  );

  const toggleOption = useCallback(
    (optionId: string) => {
      if (maxSelect === 1) {
        onChange(value === optionId ? "" : optionId);
      } else {
        const currentArr = Array.isArray(value) ? value : [];
        const isCurrentlySelected = currentArr.includes(optionId);
        
        if (isCurrentlySelected) {
          onChange(currentArr.filter((id) => id !== optionId));
        } else if (currentArr.length < maxSelect) {
          onChange([...currentArr, optionId]);
        }
      }
    },
    [value, onChange, maxSelect]
  );

  return { isSelected, toggleOption };
}
