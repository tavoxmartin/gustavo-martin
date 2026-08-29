"use server";

import { supabase } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { WELCOME_SUBJECT, buildWelcomeEmail } from "@/lib/welcome-email";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = String(formData.get("email") || "").trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Introduce un correo válido." };
  }

  const { error } = await supabase.from("subscribers").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return { status: "error", message: "Ese correo ya está suscrito." };
    }
    return {
      status: "error",
      message: "No se pudo completar la suscripción. Inténtalo de nuevo.",
    };
  }

  const { html, text } = buildWelcomeEmail();
  const { error: sendError } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: WELCOME_SUBJECT,
    html,
    text,
  });

  if (sendError) {
    console.error("Failed to send welcome email:", sendError);
  }

  return { status: "success", message: "¡Gracias! Revisa tu correo." };
}
