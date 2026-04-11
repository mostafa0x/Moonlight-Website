"use server";

import { createClient } from "@/shared/lib/supabase-server";
import { revalidatePath } from "next/cache";

/**
 * cancelBookingAction: Server Action to handle booking cancellation.
 * 
 * Benefits:
 * - Secure execution on the server.
 * - No client-side JS needed for the fetch logic.
 * - Automatic cache revalidation using revalidatePath.
 */
export async function cancelBookingAction(bookingId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: { session } } = await supabase.auth.getSession(); // Still need session for access_token

  if (!user || !session) {
    throw new Error("Unauthorized: No active session found.");
  }


  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/bookings/${bookingId}/cancel`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        error: response.status === 401 ? "UNAUTHORIZED" : (errorData.error || "CANCEL_FAILED")
      };
    }

    // Trigger on-demand revalidation for the profile page
    revalidatePath("/profile/[locale]"); // Use the localized path
    revalidatePath("/profile");

    return { success: true };
  } catch (error: any) {
    console.error("Cancel Booking Action Error:", error);
    return { success: false, error: "NETWORK_ERROR" };
  }
}

