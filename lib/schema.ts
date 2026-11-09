import { homeFaqs } from "@/lib/faqs";
import {
  AUTHOR_BIO,
  AUTHOR_NAME,
  HOME_INTRO,
  ORG_ID,
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
  getSubstackLink,
} from "@/lib/site";
import type { Thesis } from "@/lib/theses";

type Json = Record<string, unknown>;

function personNode(): Json {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR_NAME,
    url: absoluteUrl("/about"),
    description: AUTHOR_BIO,
  };
}

function organizationNode(description?: string): Json {
  const substack = getSubstackLink();
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    ...(description ? { description } : {}),
    ...(substack.configured ? { sameAs: [substack.href] } : {}),
  };
}

export function homeJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(HOME_INTRO),
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        description: HOME_INTRO,
        publisher: { "@id": ORG_ID },
      },
      personNode(),
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        url: SITE_URL,
        mainEntity: homeFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionJsonLd(input: {
  path: string;
  name: string;
  description: string;
  theses: Thesis[];
  breadcrumbs: { name: string; path: string }[];
}): Json {
  const graph: Json[] = [
    {
      "@type": "CollectionPage",
      "@id": absoluteUrl(input.path),
      url: absoluteUrl(input.path),
      name: input.name,
      description: input.description,
      isPartOf: { "@id": WEBSITE_ID },
    },
    breadcrumbJsonLd(input.breadcrumbs),
  ];

  if (input.theses.length > 0) {
    graph.push({
      "@type": "ItemList",
      itemListElement: input.theses.map((thesis, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${thesis.company} (${thesis.ticker})`,
        url: absoluteUrl(`/research/${thesis.slug}`),
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function thesisJsonLd(thesis: Thesis): Json {
  const url = absoluteUrl(`/research/${thesis.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      personNode(),
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: thesis.title,
        description: thesis.tldr,
        datePublished: thesis.publishedAt,
        dateModified: thesis.updatedAt,
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: url,
        isAccessibleForFree: true,
        creativeWorkStatus: thesis.noindex ? "Draft" : "Published",
        about: {
          "@type": "Corporation",
          name: thesis.company,
          tickerSymbol: thesis.ticker,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: thesis.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Research", path: "/research" },
        { name: `${thesis.company} (${thesis.ticker})`, path: `/research/${thesis.slug}` },
      ]),
    ],
  };
}

export function webPageJsonLd(input: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "ProfilePage" | "AboutPage";
  breadcrumbs?: { name: string; path: string }[];
}): Json {
  const graph: Json[] = [
    {
      "@type": input.type ?? "WebPage",
      "@id": absoluteUrl(input.path),
      url: absoluteUrl(input.path),
      name: input.name,
      description: input.description,
      isPartOf: { "@id": WEBSITE_ID },
      ...(input.type === "ProfilePage" ? { mainEntity: { "@id": PERSON_ID } } : {}),
    },
  ];

  if (input.type === "ProfilePage") {
    graph.push(personNode(), organizationNode());
  }

  if (input.breadcrumbs) graph.push(breadcrumbJsonLd(input.breadcrumbs));

  return { "@context": "https://schema.org", "@graph": graph };
}
