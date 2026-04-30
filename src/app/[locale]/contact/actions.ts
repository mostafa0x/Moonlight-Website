"use server";

import { Resend } from "resend";
import { createClient } from "@/shared/lib/supabase-server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let emailContent = formData.message;
    
    if (user) {
      const name = user.user_metadata.full_name || user.user_metadata.name || `${formData.firstName} ${formData.lastName}`;
      const email = user.email;
      emailContent += `\n\n---\nSent by: ${name} (${email})`;
    }

    const { data, error } = await resend.emails.send({
      from: "Moonlight Contact Form <onboarding@resend.dev>", // Replace with your verified domain in production
      to: ["moonlightegypttours@gmail.com"],
      subject: `New Contact Message from ${formData.firstName} ${formData.lastName}`,
      text: emailContent,
      replyTo: formData.email,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Action error:", error);
    return { success: false, error: error.message };
  }
}
