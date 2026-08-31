import { createHmac, timingSafeEqual } from "node:crypto";

// Stateless unsubscribe tokens: an HMAC of the subscriber's email keyed by
// UNSUBSCRIBE_SECRET. No token column needed, and every existing subscriber
// gets a valid link immediately. The link removes the row (see
// app/api/unsubscribe/route.ts); re-subscribing later just re-inserts it.

function secret(): string {
  const value = process.env.UNSUBSCRIBE_SECRET;
  if (!value) throw new Error("UNSUBSCRIBE_SECRET is not set");
  return value;
}

export function unsubscribeToken(email: string): string {
  return createHmac("sha256", secret()).update(email).digest("hex");
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  let expected: string;
  try {
    expected = unsubscribeToken(email);
  } catch {
    return false;
  }
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://gustavo-martin.com";
}

export function unsubscribeUrl(email: string, base = siteUrl()): string {
  const params = new URLSearchParams({ email, token: unsubscribeToken(email) });
  return `${base}/api/unsubscribe?${params.toString()}`;
}

// RFC 8058 one-click unsubscribe headers. Gmail/Yahoo show a native
// "Unsubscribe" control and treat the message as compliant bulk mail.
export function listUnsubscribeHeaders(
  email: string,
  base = siteUrl()
): Record<string, string> {
  return {
    "List-Unsubscribe": `<${unsubscribeUrl(email, base)}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}
