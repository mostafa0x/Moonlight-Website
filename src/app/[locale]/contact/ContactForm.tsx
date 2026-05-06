"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getContactSchema, type ContactSchemaType } from "./schema";
import CustomInput from "@/shared/custom-input";
import { useTranslations } from "next-intl";
import CustomTextarea from "@/features/booking-modal/components/step4/CustomTextarea";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/shared/lib/supabase";
import { useAuth } from "@/shared/providers/AuthProvider";
import { sendContactEmail } from "./actions";
import { motion } from "framer-motion";

export default function ContactForm() {
  const t = useTranslations("contact");
  const schema = getContactSchema(t);
  const { setShowLoginModal } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<ContactSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const { setValue } = methods;

  const fillUser = async () => {
    const user = await getUserInfo();
    if (user) {
      if (user.name) {
        const names = user.name.split(" ");
        setValue("firstName", names[0] || "");
        setValue("lastName", names.slice(1).join(" ") || "");
      }
      if (user.email) {
        setValue("email", user.email);
      }
    }
  };

  // Auto-fill if user is logged in
  useEffect(() => {
    fillUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  // Load saved data from sessionStorage after redirect
  useEffect(() => {
    const savedData = sessionStorage.getItem("contact_form_data");
    if (savedData) {
      const data = JSON.parse(savedData);
      Object.keys(data).forEach((key) => {
        setValue(key as keyof ContactSchemaType, data[key]);
      });
      sessionStorage.removeItem("contact_form_data");

      // Auto submit if user is now logged in
      // const checkAndSubmit = async () => {
      //   const user = await getUserInfo();
      //   if (user) {
      //     methods.handleSubmit(onSubmit)();
      //   }
      // };
      // checkAndSubmit();
    }
  }, [setValue]);

  const onSubmit = async (data: ContactSchemaType) => {
    const user = await getUserInfo();

    if (!user) {
      // Save data and show modal
      sessionStorage.setItem("contact_form_data", JSON.stringify(data));
      setShowLoginModal(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        setIsSuccess(true);
        methods.reset();
      } else {
        alert(t("form.errors.submitError"));
      }
    } catch (error) {
      alert(t("form.errors.submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-5.25 w-full"
      >
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-[#F2C975]/10 border border-[#F2C975]/30 rounded-[15px] text-center"
          >
            <h3 className="text-[#F2C975] text-xl font-bold mb-2">Message Sent!</h3>
            <p className="text-zinc-400">We will get back to you shortly.</p>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                fillUser();
              }}
              className="mt-4 text-[#F2C975] text-sm underline cursor-pointer"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-2.5">
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
              disabled={isSubmitting}
              aria-label="send message contact us"
              className="bg-[#F2C975] hover:bg-[#b69555] disabled:opacity-50 text-base rounded-[10px] px-6 py-1.75 cursor-pointer text-black font-medium w-fit transition-shadow hover:shadow-[0_0_15px_rgba(242,201,117,0.3)]"
            >
              {isSubmitting ? "Sending..." : t("form.send")}
            </button>
          </>
        )}
      </form>
    </FormProvider>
  );
}
