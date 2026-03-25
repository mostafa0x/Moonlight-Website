import { z } from "zod";

export const bookingSchema = z.object({
  adultsNumber: z.number().min(1),
  kidsNumber: z.number().min(0),
  tourguideLanguage: z.string().min(1, "Language is required"),
  selectedDestinations: z.array(z.string()),
  tourDate: z.string().min(1, "Tour date is required"),
  customerName: z.string().min(2, "Full name is required"),
  customerPhone: z.string("Numbers only").min(10, "Phone number must be at least 10 digits"),
  nationality: z.string().min(1, "Nationality is required"),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  address: z.string().min(2, "Address is required"),
  totalPrice: z.number().optional(),
  promoCode: z.string().optional(),
  paymentPreference: z.enum(["full", "deposit"]),
});

export type BookingSchemaType = z.infer<typeof bookingSchema>;
