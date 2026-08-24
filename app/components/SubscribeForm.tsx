"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions";

const initialState: SubscribeState = { status: "idle" };

export function SubscribeForm() {
  const [state, formAction, isPending] = useActionState(
    subscribe,
    initialState
  );

  return (
    <>
      <form
        action={formAction}
        className="mt-7 flex flex-col gap-[10px] sm:flex-row sm:items-center"
      >
        <input
          type="email"
          name="email"
          required
          placeholder="tu correo"
          className="w-full rounded-[10px] bg-white px-5 py-[15px] text-[15px] text-[var(--color-muted)] placeholder:text-[var(--color-muted)] focus:outline-2 focus:outline-[var(--color-lav-ink)] sm:w-[400px]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-fit rounded-[10px] bg-[var(--color-lav-ink)] px-[30px] py-4 text-[15px] font-semibold whitespace-nowrap text-white hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "enviando..." : "suscribirme"}
        </button>
      </form>

      {state.status !== "idle" && state.message && (
        <p
          className={`font-label mt-3 text-[11px] tracking-[1px] ${
            state.status === "success"
              ? "text-[var(--color-lav-ink)]"
              : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </>
  );
}
