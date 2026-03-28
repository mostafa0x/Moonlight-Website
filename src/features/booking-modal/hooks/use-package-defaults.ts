"use client";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import type { PackageDetailsType } from "@/shared/global";

export const usePackageDefaults = (
  pkg: PackageDetailsType | undefined,
  methods: UseFormReturn<any>
) => {
  const { setValue } = methods;

  useEffect(() => {
    if (!pkg) return;

    // Set default selections for specific packages
    if (pkg.packageId === "1d0e1402-78a2-4366-a59b-13f38d9a8486") {
      pkg.customizations?.forEach((group) => {
        if (group.options.some((o) => o.id === "dest-nmec")) {
          const other = group.options.find((o) => o.id !== "dest-nmec")?.id;
          const defaults = other ? ["dest-nmec", other] : ["dest-nmec"];
          setValue(
            group.groupId as any,
            group.maxSelect === 1
              ? "dest-nmec"
              : defaults.slice(0, Math.min(group.maxSelect, 2))
          );
        } else if (group.options.length > 0) {
          setValue(
            group.groupId as any,
            group.maxSelect === 1 ? group.options[0].id : [group.options[0].id]
          );
        }
      });
    } else if (pkg.packageId === "617ff210-e29a-4ebe-bfa7-6e904275e9f5") {
      pkg.customizations?.forEach((group) => {
        if (group.maxSelect >= 3) {
          setValue(
            group.groupId as any,
            group.options.slice(0, 3).map((o) => o.id)
          );
        }
      });
    }
  }, [pkg, setValue]);
};
