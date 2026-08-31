import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { unsubscribeUrl, listUnsubscribeHeaders } from "@/lib/unsubscribe";

const BATCH_SIZE = 100;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function buildEmail(articleTitle: string, articleUrl: string, unsubUrl: string) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <p style="font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #666;">Gustavo Martin</p>
      <h1 style="font-size: 24px; line-height: 1.3;">${articleTitle}</h1>
      <p>
        <a href="${articleUrl}" style="color: #4b3f72;">Leer el artículo →</a>
      </p>
      <p style="margin: 24px 0 0; font-size: 12px; line-height: 1.6; color: #999;">
        ¿No quieres estos correos?
        <a href="${unsubUrl}" style="color: #999;">Darse de baja</a>
      </p>
    </div>
  `;
  const text = `${articleTitle}\n\nLeer el artículo: ${articleUrl}\n\nDarse de baja: ${unsubUrl}`;
  return { html, text };
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.NOTIFY_API_SECRET}`;

  if (!process.env.NOTIFY_API_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const slug = body?.slug;

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Missing 'slug' in request body" }, { status: 400 });
  }

  const { data: article, error: articleError } = await supabaseAdmin
    .from("articles")
    .select("title, slug")
    .eq("slug", slug)
    .single();

  if (articleError || !article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  const { data: subscribers, error: subscribersError } = await supabaseAdmin
    .from("subscribers")
    .select("email");

  if (subscribersError) {
    return NextResponse.json({ error: "Failed to load subscribers" }, { status: 500 });
  }

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ success: true, sent: 0, message: "No subscribers to notify" });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gustavo-martin.com";
  const articleUrl = `${siteUrl}/articulos/${article.slug}`;

  const batches = chunk(subscribers, BATCH_SIZE);

  for (const batch of batches) {
    const { error: sendError } = await resend.batch.send(
      batch.map(({ email }) => {
        const { html, text } = buildEmail(
          article.title,
          articleUrl,
          unsubscribeUrl(email, siteUrl)
        );
        return {
          from: FROM_EMAIL,
          to: email,
          subject: article.title,
          html,
          text,
          headers: listUnsubscribeHeaders(email, siteUrl),
        };
      })
    );

    if (sendError) {
      return NextResponse.json(
        { error: "Failed to send some emails", details: sendError.message },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    sent: subscribers.length,
    article: { title: article.title, url: articleUrl },
  });
}
