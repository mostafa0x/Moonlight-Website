"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { PackageDetailsType } from "@/shared/global";

export const useGetPackage = (id: string | null) => {
  const params = useParams();
  const locale = params?.locale;
  
  return useQuery({
    queryKey: ["package", id, locale],
    queryFn: async () => {
      const response = await fetch(`/api/packages/${id}?locale=${locale}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return (data.data || data) as PackageDetailsType;
    },
    enabled: !!id,
  });
};
