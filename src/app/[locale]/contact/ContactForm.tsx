"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getContactSchema, type ContactSchemaType } from "./schema";
import CustomInput from "@/shared/custom-input";
import { useTranslations } from "next-intl";
import CustomTextarea from "@/features/booking-modal/components/step4/CustomTextarea";

export default function ContactForm() {
  const t = useTranslations("contact");
  const schema = getContactSchema(t);

  const methods = useForm<ContactSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactSchemaType) => {
    console.log("Submitting contact message:", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-5.25 w-full"
      >
        <div className="flex flex-row gap-2.5">
          <CustomInput
            label={t("form.firstName")}
            name="firstName"
            type="text"
            placeholder={t("form.firstName")}
          />

          <CustomInput
            label={t("form.lastName")}
            name="lastName"
            type="text"
            placeholder={t("form.lastName")}
          />
        </div>

        <CustomInput
          label={t("form.emailAddress")}
          name="email"
          type="email"
          placeholder={t("form.emailAddress")}
        />

        <CustomTextarea
          name="message"
          label={t("form.message")}
          placeholder={t("form.message")}
        />

        <button
          type="submit"
          aria-label="send message contact us"
          className="bg-[#F2C975] hover:bg-[#b69555] text-base rounded-[10px] px-6 py-1.75 cursor-pointer text-black font-medium w-fit transition-shadow hover:shadow-[0_0_15px_rgba(242,201,117,0.3)]"
        >
          {t("form.send")}
        </button>
      </form>
    </FormProvider>
  );
}
