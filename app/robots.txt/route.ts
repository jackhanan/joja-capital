import { NextResponse } from "next/server";

export const runtime = "edge";

const SITE_URL = "https://jojacapital.com";

// Implemented as a Route Handler for the same reason as app/sitemap.xml/route.ts.
//
// Note: Cloudflare's own account-level "Content Signals" / AI Crawl Control
// feature serves a Cloudflare-managed robots.txt at the edge, ahead of this
// Worker, for zones where it's enabled -- so this app-level robots.txt may
// not actually reach visitors until that's turned off in the Cloudflare
// dashboard (Zone -> AI Crawl Control / Bots -> robots.txt management).
export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /studio

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
