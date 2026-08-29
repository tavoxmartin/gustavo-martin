import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto — Gustavo Martin",
  description:
    "Escríbeme sobre proyectos de café: estrategia, posicionamiento y desarrollo de mercado.",
};

const channels = [
  {
    label: "EMAIL",
    value: "hola@gustavo-martin.com",
    href: "mailto:hola@gustavo-martin.com",
    external: false,
  },
  {
    label: "LINKEDIN",
    value: "in/gustavo-adolfo-martin-paz",
    href: "https://www.linkedin.com/in/gustavo-adolfo-martin-paz-49334446/",
    external: true,
  },
  {
    label: "INSTAGRAM",
    value: "@tavoxmartin",
    href: "https://www.instagram.com/tavoxmartin",
    external: true,
  },
];

export default function ContactoPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden">
      <header className="flex w-full items-center justify-between px-6 py-6 sm:px-12 lg:px-[180px] lg:py-[26px]">
        <Link
          href="/"
          className="text-[17px] font-semibold tracking-[-0.5px] whitespace-nowrap"
        >
          gustavo martin
        </Link>
        <Link
          href="/#suscribirte"
          className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          SUSCRIBIRTE
        </Link>
      </header>

      <section className="flex w-full flex-col px-6 pt-6 pb-20 sm:px-12 lg:px-[180px] lg:pt-8 lg:pb-[88px]">
        <Link
          href="/"
          className="font-label w-fit text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← VOLVER
        </Link>

        <span className="font-label mt-8 text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
          CONTACTO
        </span>

        <h1 className="mt-[18px] max-w-[905px] text-[32px] leading-[1.12] font-semibold tracking-[-1.1px] sm:text-[42px] sm:leading-[1.1] sm:tracking-[-1.6px]">
          Hablemos de tu proyecto de café
        </h1>

        <p className="mt-[22px] max-w-[620px] text-[17px] leading-[26px] text-[var(--color-muted)]">
          Trabajo con proyectos de café en estrategia, posicionamiento y desarrollo de
          mercado. Escríbeme por correo o encuéntrame en redes.
        </p>

        <ul className="mt-10 flex max-w-[680px] flex-col border-t border-[var(--color-border)]">
          {channels.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex flex-col gap-2 border-b border-[var(--color-border)] py-[22px] sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
              >
                <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] sm:w-[120px] sm:shrink-0">
                  {channel.label}
                </span>
                <span className="flex-1 text-[19px] leading-[26px] font-semibold tracking-[-0.4px] group-hover:underline">
                  {channel.value}
                </span>
                <span
                  aria-hidden
                  className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] group-hover:text-[var(--color-ink)]"
                >
                  {channel.external ? "↗" : "→"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="flex w-full flex-col gap-10 border-t border-[var(--color-border)] px-6 py-10 sm:px-12 lg:flex-row lg:justify-between lg:px-[180px] lg:py-[30px] lg:pb-[44px]">
        <div className="flex w-full flex-col gap-[10px] lg:w-[400px] lg:shrink-0">
          <span className="text-[17px] font-semibold tracking-[-0.5px] whitespace-nowrap">
            Gustavo Martin
          </span>
          <p className="text-[15px] leading-[23px] text-[var(--color-muted)]">
            Trabajo con proyectos de café en estrategia, posicionamiento y desarrollo de
            mercado.
          </p>
        </div>

        <span className="font-label text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] lg:self-end">
          © 2026
        </span>
      </footer>
    </div>
  );
}
