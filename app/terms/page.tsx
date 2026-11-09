import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { TodoNote } from "@/components/todo-note";
import { webPageJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const TITLE = "Terms | Romstocks";
const DESCRIPTION =
  "Draft terms for using the Romstocks site. This page is a template for counsel and is not indexed.";
const LEAD =
  "The pages on this site are educational writing. They are not a contract to provide advice, and they are not an offer to buy or sell securities.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Terms", path: "/terms" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={webPageJsonLd({
          path: "/terms",
          name: "Terms",
          description: LEAD,
          breadcrumbs: crumbs,
        })}
      />
      <Breadcrumbs items={crumbs} />
      <TodoNote title="TEMPLATE — needs review by a qualified attorney">
        <p>These are not finished terms of use. They are marked noindex until counsel replaces them.</p>
      </TodoNote>
      <h1 className="mt-6 text-4xl">Terms</h1>
      <p className="mt-4">
        {LEAD} The{" "}
        <Link href="/disclaimer" className="text-forest underline underline-offset-2">
          disclaimer
        </Link>{" "}
        describes that limit in more detail and is itself a draft.
      </p>
      <p className="mt-4">
        You may read the research for your own information. You may not present it as personalized advice from
        Romstocks. Quotes, if you use them, should keep the date and the disclaimer context.
      </p>
      <TodoNote title="TODO">
        <p>
          Governing law, liability limits, and intellectual-property wording are for a lawyer. Nothing numeric about
          results belongs in the terms, because the site does not publish a track record.
        </p>
      </TodoNote>
    </div>
  );
}
