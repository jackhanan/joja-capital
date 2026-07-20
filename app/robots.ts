import { MetadataRoute } from "next";

export const runtime = "edge";

const SITE_URL = "https://jojacapital.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Admin panel -- not meant for search engines.
      disallow: "/studio",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
