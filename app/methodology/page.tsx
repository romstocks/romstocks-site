import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SubstackCta } from "@/components/substack-cta";
import { TodoNote } from "@/components/todo-note";
import { webPageJsonLd } from "@/lib/schema";
import { getSubstackLink, pageMetadata } from "@/lib/site";

const TITLE = "How Romstocks Researches Stocks: Methodology";
const DESCRIPTION =
  "The process page for Romstocks is a stub. Coverage, sources, valuation, disclosure, and the update policy are still open.";
const H1 = "How Romstocks researches stocks";
const LEAD =
  "This page will describe how companies are chosen, which sources are used, how a valuation range is built, how positions are disclosed, and when a thesis is updated or closed. Those choices are not confirmed, so this stub does not present them as Rom's method.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/methodology",
});

export default function MethodologyPage() {
  const substack = getSubstackLink();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Methodology", path: "/methodology" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={webPageJsonLd({
          path: "/methodology",
          name: H1,
          description: LEAD,
          breadcrumbs: crumbs,
        })}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl">{H1}</h1>
      <p className="mt-4">{LEAD}</p>
      <p className="mt-4">
        The thesis template already has a fixed shape: a summary, both cases, a dated range, catalysts, ranked risks,
        and what would change the view. That shape is a publishing format. It is not a claim about results.
      </p>
      <TodoNote title="TODO: write the actual methodology">
        <ul className="list-disc space-y-2 pl-5">
          <li>Which tickers, sectors, and market caps are in scope, and whether shorts are included.</li>
          <li>Time horizon: long-term fundamental work, special situations, or something else.</li>
          <li>Sources Rom actually uses, and how filings and transcripts are cited.</li>
          <li>Which valuation methods are used, and whether per-share ranges are published.</li>
          <li>Position disclosure and any trading blackout. See the disclaimer.</li>
          <li>Publishing cadence.</li>
          <li>How updates, closures, and post-mortems are written, without performance percentages.</li>
          <li>Conflicts, including any paid mention, after a lawyer reviews the rule.</li>
        </ul>
      </TodoNote>
      <p className="mt-6">
        <Link href="/disclaimer" className="text-forest underline underline-offset-2">
          Disclaimer
        </Link>
        {" · "}
        <Link href="/research" className="text-forest underline underline-offset-2">
          Research archive
        </Link>
      </p>
      <SubstackCta location="methodology" href={substack.href} configured={substack.configured} variant="band" />
    </div>
  );
}
