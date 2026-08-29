"use server";

import { supabase } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function buildWelcomeEmail() {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <p style="font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #666;">Gustavo Martin</p>
      <h1 style="font-size: 24px; line-height: 1.3;">Gracias por suscribirte</h1>
      <p style="line-height: 1.6;">
        Te has suscrito a la newsletter de Gustavo Martin. A partir de ahora recibirás
        un correo cada vez que se publique un artículo nuevo, con el título y un enlace
        directo para leerlo.
      </p>
      <p style="line-height: 1.6;">Nada de spam: solo los artículos, cuando salen.</p>
    </div>
  `;
  const text =
    "Gracias por suscribirte\n\n" +
    "Te has suscrito a la newsletter de Gustavo Martin. A partir de ahora recibirás " +
    "un correo cada vez que se publique un artículo nuevo, con el título y un enlace " +
    "directo para leerlo.\n\n" +
    "Nada de spam: solo los artículos, cuando salen.";
  return { html, text };
}

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
    subject: "Gracias por suscribirte a la newsletter",
    html,
    text,
  });

  if (sendError) {
    console.error("Failed to send welcome email:", sendError);
  }

  return { status: "success", message: "¡Gracias! Revisa tu correo." };
}
