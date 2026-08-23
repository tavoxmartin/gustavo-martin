import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Gustavo Martin — El Primer Crack",
  description:
    "Mercado, origen, calidad y crecimiento de proyectos de café. Una lectura periódica de las señales que están cambiando el café, una vez por semana.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="h-full bg-[var(--color-bg)] text-[var(--color-ink)] font-heading">
        {children}
      </body>
    </html>
  );
}
