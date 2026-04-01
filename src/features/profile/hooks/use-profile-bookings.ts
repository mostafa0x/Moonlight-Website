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
export function useProfileBookings() {
  const queryClient = useQueryClient();

  // 1. Fetching Bookings
  const { data: bookings = [], isLoading, error } = useQuery<Booking[]>({
    queryKey: ["profile-bookings"],
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
      // Handle the case where the API might return the actual array in result.data or similar
      return Array.isArray(result) ? result : (result.data || []);
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
  };
}
