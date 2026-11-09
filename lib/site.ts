import type { Metadata } from "next";

export const SITE_URL = "https://romstocks.com";
export const SITE_NAME = "Romstocks";
export const AUTHOR_NAME = "Rom";
export const FOUNDATION_DATE = "2026-11-09";

export const HOME_TITLE = "Romstocks | Independent US Stock Research & Theses";
export const HOME_DESCRIPTION =
  "In-depth investment theses on US stocks, with bull case, bear case, valuation range, and risks. Educational research on Substack.";

export const ORG_DESCRIPTION =
  "Romstocks is an independent research site that publishes dated, testable investment theses on individual US stocks.";

export const HOME_INTRO = `${ORG_DESCRIPTION} Each thesis includes a bull case, a bear case, the assumptions behind a valuation range, catalysts, key risks, and the evidence that would change the view.`;

export const HOME_SUBHEAD =
  "Rom publishes in-depth theses on individual US companies: bull case, bear case, valuation range, catalysts, and what would change his mind. Educational research, not personalized advice.";

export const AUTHOR_BIO =
  "Rom writes Romstocks. A photo, a factual bio, credentials, and confirmation of the public byline are not published yet.";

export const SHORT_DISCLAIMER =
  "This is educational research, not a recommendation to buy or sell. Do your own research and consider a licensed adviser. Past events do not indicate future results.";

export const PERSON_ID = `${SITE_URL}/#rom`;
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type CtaLocation =
  | "home_hero"
  | "home_inbox"
  | "research_index"
  | "thesis_after_summary"
  | "thesis_after_valuation"
  | "thesis_end"
  | "newsletter"
  | "about"
  | "methodology";

export type SubstackLink = {
  href: string;
  configured: boolean;
};

export function getSubstackLink(): SubstackLink {
  const raw = process.env.NEXT_PUBLIC_SUBSTACK_URL?.trim();
  if (!raw) {
    return { href: "/newsletter#substack-url", configured: false };
  }

  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") {
      return { href: "/newsletter#substack-url", configured: false };
    }
    if (url.username || url.password) {
      return { href: "/newsletter#substack-url", configured: false };
    }
    return { href: url.toString(), configured: true };
  } catch {
    return { href: "/newsletter#substack-url", configured: false };
  }
}

export function absoluteUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const url = absoluteUrl(input.path);
  const type = input.openGraphType ?? "website";
  const image = input.image ?? {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Romstocks: independent US stock research, with the bear case included.",
  };

  return {
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [image],
      ...(type === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image.url],
    },
  };
}

export function formatDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function dateToUtc(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00.000Z`);
}
