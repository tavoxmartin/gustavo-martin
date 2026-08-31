import type { Article } from "@/lib/supabase";

export type DigestArticle = Pick<Article, "title" | "excerpt" | "slug">;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function digestSubject(issueNumber: number) {
  return `El Primer Crack — Edición ${issueNumber}`;
}

export function buildDigestEmail(
  issueNumber: number,
  articles: DigestArticle[],
  siteUrl: string
) {
  const items = articles
    .map((article) => {
      const url = `${siteUrl}/articulos/${article.slug}`;
      const excerpt = article.excerpt
        ? `<p style="margin: 0 0 12px; font-size: 15px; line-height: 1.6; color: #666;">${escapeHtml(
            article.excerpt
          )}</p>`
        : "";

      return `
      <div style="border-top: 1px solid #e5e5e5; padding: 22px 0;">
        <h2 style="margin: 0 0 8px; font-size: 19px; line-height: 1.3; color: #333;">${escapeHtml(
          article.title
        )}</h2>
        ${excerpt}
        <a href="${url}" style="font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #4b3f72; text-decoration: none;">Leer →</a>
      </div>`;
    })
    .join("\n");

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <p style="font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #666;">Gustavo Martin</p>
      <h1 style="font-size: 24px; line-height: 1.3;">Edición ${issueNumber}</h1>
      ${items}
      <p style="margin: 28px 0 0; font-size: 14px;">
        <a href="${siteUrl}" style="color: #4b3f72;">gustavo-martin.com</a>
      </p>
    </div>
  `;

  const text = [
    `Gustavo Martin — Edición ${issueNumber}`,
    "",
    ...articles.flatMap((article) => [
      article.title,
      ...(article.excerpt ? [article.excerpt] : []),
      `Leer → ${siteUrl}/articulos/${article.slug}`,
      "",
    ]),
    "gustavo-martin.com",
  ].join("\n");

  return { html, text };
}
