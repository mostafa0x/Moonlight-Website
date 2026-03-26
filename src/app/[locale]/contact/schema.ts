import { z } from "zod";

export const getContactSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(2, t("form.errors.firstName")),
    lastName: z.string().min(2, t("form.errors.lastName")),
    email: z.string().email(t("form.errors.email")),
    message: z.string().min(10, t("form.errors.message")),
  });

export type ContactSchemaType = z.infer<ReturnType<typeof getContactSchema>>;
