import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function formatIssueDate(dateStr: string) {
  return new Intl.DateTimeFormat("es", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(new Date(`${dateStr}T00:00:00`))
    .replace(".", "")
    .toUpperCase();
}

async function getArticle(slug: string) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  // PGRST116 = "no rows found", a genuine 404. Any other error (network
  // blip, timeout, transient 5xx from Supabase) should not be silently
  // treated as a missing article — surface it instead of a false 404.
  if (error && error.code !== "PGRST116") {
    console.error(`Failed to fetch article "${slug}":`, error);
    throw new Error(`Failed to fetch article "${slug}": ${error.message}`);
  }

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return {};

  return {
    title: `${article.title} — Gustavo Martin`,
    description: article.excerpt ?? undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  // Treat a blank cover_image the same as a missing one, so an empty cell in
  // the Supabase Table Editor renders nothing instead of a broken image.
  const coverImage = article.cover_image?.trim();

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

      <article className="flex w-full flex-col px-6 pt-6 pb-20 sm:px-12 lg:px-[180px] lg:pt-8 lg:pb-[88px]">
        <Link
          href="/"
          className="font-label w-fit text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← VOLVER
        </Link>

        <span className="font-label mt-8 text-[11px] tracking-[2px] whitespace-nowrap text-[var(--color-muted)]">
          {formatIssueDate(article.date)}
        </span>

        <h1 className="mt-[18px] max-w-[905px] text-[32px] leading-[1.12] font-semibold tracking-[-1.1px] sm:text-[42px] sm:leading-[1.1] sm:tracking-[-1.6px]">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="mt-[22px] max-w-[620px] text-[17px] leading-[26px] text-[var(--color-muted)]">
            {article.excerpt}
          </p>
        )}

        {coverImage && (
          <figure className="mt-9 max-w-[905px]">
            {/* Decorative: the headline above carries the meaning and the
                caption credits the photographer, so an alt would only
                repeat one of them. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt=""
              className="max-h-[260px] w-full rounded-[20px] object-cover outline outline-[var(--color-border)] -outline-offset-1 sm:max-h-[420px]"
            />
            <figcaption className="font-label mt-3 text-[11px] tracking-[1px] text-[var(--color-muted)]">
              Foto: Ruggero Ramirez
            </figcaption>
          </figure>
        )}

        <div className="mt-10 flex max-w-[680px] flex-col gap-5 border-t border-[var(--color-border)] pt-10 text-[17px] leading-[28px]">
          {(article.content ?? "")
            .split(/\r?\n\r?\n+/)
            .filter((paragraph: string) => paragraph.trim().length > 0)
            .map((paragraph: string, i: number) => (
              <p key={i}>{paragraph.trim()}</p>
            ))}
        </div>
      </article>

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
