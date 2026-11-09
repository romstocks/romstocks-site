import type { MetadataRoute } from "next";
import { dateToUtc, FOUNDATION_DATE, SITE_URL } from "@/lib/site";
import { getIndexableTheses } from "@/lib/theses";

const STATIC_PATHS = ["/", "/research", "/newsletter", "/about", "/methodology", "/disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: dateToUtc(FOUNDATION_DATE),
  }));

  for (const thesis of getIndexableTheses()) {
    pages.push({
      url: `${SITE_URL}/research/${thesis.slug}`,
      lastModified: dateToUtc(thesis.updatedAt),
    });
  }

  return pages;
}
