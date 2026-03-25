"use client";
import { useQuery } from "@tanstack/react-query";
import type { PackageType } from "@/shared/global";

export const useGetPackage = (id: string) => {
  
  return useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const response = await fetch(`/api/packages/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return (data.data || data) as PackageType;
    },
    enabled: !!id,
  });
};
