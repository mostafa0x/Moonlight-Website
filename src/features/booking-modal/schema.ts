import { z } from "zod";

export const getBookingSchema = (t: (key: string) => string) =>
  z.object({
    adultsNumber: z.number().min(1),
    kidsNumber: z.number().min(0),
    tourguideLanguage: z.string().min(1, t("errors.language")),
    selectedDestinations: z.array(z.string()),
    tourDate: z.string().min(1, t("errors.date")),
    customerName: z.string().min(2, t("errors.name")),
    customerPhone: z
      .string()
      .min(10, t("errors.phone")),
    nationality: z.string().min(1, t("errors.nationality")),
    pickupLocation: z.string().optional(),
    address: z.string().min(2, t("errors.address")),
    totalPrice: z.number().optional(),
    promoCode: z.string().optional(),
    paymentPreference: z.enum(["full", "deposit"]),
  });

export type BookingSchemaType = z.infer<ReturnType<typeof getBookingSchema>>;
