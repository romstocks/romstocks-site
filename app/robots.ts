import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ALLOWED = [
  "*",
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ALLOWED.map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
