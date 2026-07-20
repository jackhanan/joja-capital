import { NextResponse } from "next/server";

export const runtime = "edge";

const SITE_URL = "https://jojacapital.com";

const URLS: { loc: string; changefreq: string; priority: string }[] = [
  { loc: SITE_URL, changefreq: "weekly", priority: "1.0" },
  { loc: `${SITE_URL}/start-your-deal`, changefreq: "monthly", priority: "0.8" },
];

// Implemented as an explicit Route Handler rather than the app/sitemap.ts
// metadata-route convention -- next-on-pages does not reliably route
// requests to that special file's generated function on Cloudflare Pages
// (confirmed: the function builds and uploads correctly, but requests to
// /sitemap.xml resolved to the app's own 404 page instead). Route Handlers
// use the same mechanism as every other working API route in this app.
export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map(
  (u) =>
    `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
).join("\n")}
</urlset>
`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
