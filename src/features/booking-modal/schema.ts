import { z } from "zod";
import countriesData from "@/shared/custom-input/countries.json";

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
      .min(1, t("errors.phone"))
      .superRefine((val, ctx) => {
        const sortedCountries = [...countriesData].sort((a, b) => b.code.length - a.code.length);
        const country = sortedCountries.find((c) => val.startsWith(c.code));

        if (!country) {
          if (!/^\+[1-9]\d{6,14}$/.test(val)) {
            ctx.addIssue({
              code: "custom",
              message: t("errors.phone"),
            });
          }
          return;
        }

        const localPart = val.slice(country.code.length);
        if (localPart.length !== country.len) {
          ctx.addIssue({
            code: "custom",
            message: `${t("errors.phone")} (${country.len} digits required for ${country.name})`,
          });
        }
      }),
    nationality: z.string().min(1, t("errors.nationality")),
    pickupLocation: z.string().optional(),
    address: z.string().min(2, t("errors.address")),
    totalPrice: z.number().optional(),
    promoCode: z.string().optional(),
    paymentPreference: z.enum(["full", "deposit"]),
  });

export type BookingSchemaType = z.infer<ReturnType<typeof getBookingSchema>>;
