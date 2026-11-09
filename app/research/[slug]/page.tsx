import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ThesisArticle } from "@/components/thesis-article";
import { thesisJsonLd } from "@/lib/schema";
import { dateToUtc, getSubstackLink, pageMetadata } from "@/lib/site";
import { getAllTheses, getThesis } from "@/lib/theses";

export function generateStaticParams() {
  return getAllTheses().map((thesis) => ({ slug: thesis.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thesis = getThesis(slug);
  if (!thesis) return {};
  return pageMetadata({
    title: thesis.seoTitle,
    description: thesis.description,
    path: `/research/${thesis.slug}`,
    noindex: thesis.noindex,
    openGraphType: "article",
    publishedTime: dateToUtc(thesis.publishedAt).toISOString(),
    modifiedTime: dateToUtc(thesis.updatedAt).toISOString(),
    image: {
      url: `/research/${thesis.slug}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: `${thesis.company} (${thesis.ticker}) investment thesis on Romstocks. Educational research, not a prediction.`,
    },
  });
}

export default async function ThesisPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thesis = getThesis(slug);
  if (!thesis) notFound();

  return (
    <>
      <JsonLd data={thesisJsonLd(thesis)} />
      <ThesisArticle thesis={thesis} substack={getSubstackLink()} />
    </>
  );
}
