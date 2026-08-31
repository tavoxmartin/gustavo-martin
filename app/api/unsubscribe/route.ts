import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { verifyUnsubscribeToken, siteUrl } from "@/lib/unsubscribe";

// Removes a subscriber given their email and a matching HMAC token.
//
// GET  — the visible "Darse de baja" link in emails. Unsubscribes and returns
//        a small confirmation page.
// POST — RFC 8058 one-click (List-Unsubscribe-Post). Mail providers POST here
//        with `List-Unsubscribe=One-Click`; email and token ride in the query
//        string. Returns 200 with no body to parse.
//
// Idempotent: unsubscribing an address that is already gone still succeeds.

async function unsubscribe(request: NextRequest): Promise<
  | { ok: true; email: string }
  | { ok: false; status: number; message: string }
> {
  const email = request.nextUrl.searchParams.get("email");
  const token = request.nextUrl.searchParams.get("token");

  if (!email || !token) {
    return { ok: false, status: 400, message: "Missing email or token" };
  }

  if (!verifyUnsubscribeToken(email, token)) {
    return { ok: false, status: 403, message: "Invalid unsubscribe link" };
  }

  const { error } = await supabaseAdmin
    .from("subscribers")
    .delete()
    .eq("email", email);

  if (error) {
    return { ok: false, status: 500, message: "Could not process unsubscribe" };
  }

  return { ok: true, email };
}

function page(title: string, body: string, status = 200) {
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${title} — Gustavo Martin</title>
</head>
<body style="margin:0;font-family:sans-serif;background:#f7f6f3;color:#333;">
<div style="max-width:520px;margin:12vh auto 0;padding:0 24px;">
<p style="font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#666;">Gustavo Martin</p>
<h1 style="font-size:24px;line-height:1.3;">${title}</h1>
<p style="font-size:16px;line-height:1.6;">${body}</p>
<p style="margin-top:28px;font-size:14px;"><a href="${siteUrl()}" style="color:#4b3f72;">Volver a gustavo-martin.com</a></p>
</div>
</body>
</html>`;
  return new NextResponse(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  const result = await unsubscribe(request);

  if (!result.ok) {
    return page(
      "No se pudo completar",
      "Este enlace para darse de baja no es válido o ha caducado. Si sigues recibiendo correos, responde a cualquiera de ellos y lo soluciono.",
      result.status
    );
  }

  return page(
    "Te has dado de baja",
    `<strong>${result.email}</strong> ya no recibirá más correos. Puedes volver a suscribirte cuando quieras desde la web.`
  );
}

export async function POST(request: NextRequest) {
  const result = await unsubscribe(request);

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  return NextResponse.json({ success: true });
}
