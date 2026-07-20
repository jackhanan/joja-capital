import { MetadataRoute } from "next";

export const runtime = "edge";

const SITE_URL = "https://jojacapital.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/start-your-deal`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
