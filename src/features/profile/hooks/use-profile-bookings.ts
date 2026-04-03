import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/lib/supabase";
import { Booking } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

/**
 * useProfileBookings: Custom hook to handle booking-related API interactions.
 * 
 * Features:
 * - Reactive data fetching with automatic revalidation (React Query)
 * - Seamless integration with Supabase for authentication (Bearer token)
 * - Optimistic UI updates for better perceived performance (INP/FCP)
 */
export function useProfileBookings(initialData: Booking[] = []) {
  const queryClient = useQueryClient();

  // 1. Fetching Bookings
  const { data: bookings = [], isLoading, error ,refetch} = useQuery<Booking[]>({
    queryKey: ["profile-bookings"],
    initialData: initialData.length > 0 ? initialData : undefined,
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const response = await fetch(`${BASE_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const result = await response.json();
      const rawData = result.data || [];

      // Mapping backend data (snake_case) to frontend (camelCase)
      return rawData.map((item: any) => ({
        id: item.id,
        packageName: item.package_name || "Moonlight Experience", // Placeholder for now
        tourDate: item.tour_date,
        tourTime: item.tour_time || "09:00 AM",
        status: item.status, // Let it use the new backend statuses directly
        paymentType: item.due_amount === 0 ? "full" : "deposit",
        price: item.total_amount,
        currency: item.currency || "$",
        imageUrl: item.image_url || "/imgs/placeholder.webp",
        ticketUrl: item.ticket_url,
      })) as Booking[];
    },
    // Keep data fresh but don't over-fetch
    staleTime: 5 * 60 * 1000, 
  });

  // 2. Cancellation Mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session found");

      const response = await fetch(`${BASE_URL}/bookings/${bookingId}/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      return response.json();
    },
    onSuccess: () => {
      // Revalidate to show updated status
      queryClient.invalidateQueries({ queryKey: ["profile-bookings"] });
    },
  });

  return {
    bookings,
    isLoading,
    error,
    cancelBooking: cancelBookingMutation.mutate,
    isCancelling: cancelBookingMutation.isPending,
    refetch
  };
}
