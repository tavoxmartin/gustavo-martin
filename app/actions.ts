"use server";

import { supabase } from "@/lib/supabase";

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

  return { status: "success", message: "¡Gracias! Revisa tu correo." };
}
