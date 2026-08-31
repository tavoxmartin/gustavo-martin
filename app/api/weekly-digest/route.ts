import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { buildDigestEmail, digestSubject } from "@/lib/digest-email";

const BATCH_SIZE = 100;

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

// Current hour (0-23) in Spain, accounting for CET/CEST automatically.
function madridHour(date = new Date()): number {
  const hour = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    hour12: false,
  }).format(date);
  return Number(hour) % 24;
}

// Triggered every Tuesday by the Vercel Cron Jobs defined in vercel.json.
// Vercel Cron runs in UTC with no DST awareness, so the job is scheduled at
// both 07:00 and 08:00 UTC and this route only proceeds during the 09:00-12:00
// Europe/Madrid window (09:00 CEST = 07:00 UTC in summer, 09:00 CET = 08:00 UTC
// in winter); the too-early invocation returns early. Vercel sends
// `Authorization: Bearer ${CRON_SECRET}`, so the route stays private. It finds
// the newest issue_number, and — unless that edition was already emailed —
// sends one digest of all its articles to every subscriber, then flips
// `notified` so a repeat run is a no-op. Add `?force=1` to bypass the clock
// check for manual runs.
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Both cron entries fire Tuesday morning; the first invocation that lands at
  // or after 09:00 Madrid sends, and the `notified` claim makes the rest no-op.
  // A window (not an exact hour) tolerates Vercel Cron delivery delay.
  const force = request.nextUrl.searchParams.get("force") === "1";
  const hour = madridHour();

  if (!force && (hour < 9 || hour >= 12)) {
    return NextResponse.json({
      success: true,
      sent: 0,
      message: "Outside the Tuesday 09:00 Europe/Madrid window; skipping",
    });
  }

  // Most recent edition.
  const { data: latest, error: latestError } = await supabaseAdmin
    .from("articles")
    .select("issue_number")
    .order("issue_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latestError) {
    return NextResponse.json({ error: "Failed to load articles" }, { status: 500 });
  }

  if (!latest) {
    return NextResponse.json({ success: true, sent: 0, message: "No articles yet" });
  }

  const issueNumber = latest.issue_number;

  // All articles in that edition, for the digest body.
  const { data: articles, error: articlesError } = await supabaseAdmin
    .from("articles")
    .select("title, excerpt, slug")
    .eq("issue_number", issueNumber)
    .order("date", { ascending: true });

  if (articlesError || !articles || articles.length === 0) {
    return NextResponse.json(
      { error: "Failed to load edition articles" },
      { status: 500 }
    );
  }

  // Atomic claim: flip every not-yet-notified row of this edition in one
  // statement and see what we got. If nothing comes back, another run already
  // sent this edition — bail before emailing anyone.
  const { data: claimed, error: claimError } = await supabaseAdmin
    .from("articles")
    .update({ notified: true })
    .eq("issue_number", issueNumber)
    .eq("notified", false)
    .select("id");

  if (claimError) {
    return NextResponse.json({ error: "Failed to claim edition" }, { status: 500 });
  }

  if (!claimed || claimed.length === 0) {
    return NextResponse.json({
      success: true,
      sent: 0,
      message: `Edición ${issueNumber} already notified`,
    });
  }

  const { data: subscribers, error: subscribersError } = await supabaseAdmin
    .from("subscribers")
    .select("email");

  if (subscribersError) {
    await supabaseAdmin
      .from("articles")
      .update({ notified: false })
      .eq("issue_number", issueNumber);
    return NextResponse.json({ error: "Failed to load subscribers" }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gustavo-martin.com";
  const subject = digestSubject(issueNumber);
  const { html, text } = buildDigestEmail(issueNumber, articles, siteUrl);

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({
      success: true,
      sent: 0,
      issue_number: issueNumber,
      message: "No subscribers to notify",
    });
  }

  const batches = chunk(subscribers, BATCH_SIZE);

  for (const batch of batches) {
    const { error: sendError } = await resend.batch.send(
      batch.map(({ email }) => ({
        from: FROM_EMAIL,
        to: email,
        subject,
        html,
        text,
      }))
    );

    if (sendError) {
      // Release the claim so a later run retries this edition.
      await supabaseAdmin
        .from("articles")
        .update({ notified: false })
        .eq("issue_number", issueNumber);
      return NextResponse.json(
        { error: "Failed to send some emails", details: sendError.message },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    sent: subscribers.length,
    issue_number: issueNumber,
    articles: articles.length,
  });
}
