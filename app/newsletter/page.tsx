import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SubstackCta } from "@/components/substack-cta";
import { TodoNote } from "@/components/todo-note";
import { webPageJsonLd } from "@/lib/schema";
import { getSubstackLink, pageMetadata } from "@/lib/site";

const TITLE = "Romstocks Newsletter: New US Stock Theses by Email";
const DESCRIPTION =
  "Get Rom's new theses and thesis updates on US stocks in your inbox via Substack. Educational research, not personalized advice.";
const H1 = "Get new theses on Substack";
const LEAD =
  "Romstocks does not run an email list. The subscribe button leaves this site for Substack, once that address is known. The research on this site stays available to read here.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/newsletter",
});

export default function NewsletterPage() {
  const substack = getSubstackLink();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Newsletter", path: "/newsletter" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={webPageJsonLd({
          path: "/newsletter",
          name: H1,
          description: LEAD,
          breadcrumbs: crumbs,
        })}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl">{H1}</h1>
      <p className="mt-4">{LEAD}</p>
      {substack.configured ? (
        <p className="mt-4">
          The publication address is set. Use the button below. It opens in a new tab and does not add personal
          information to the link.
        </p>
      ) : (
        <TodoNote id="substack-url" title="TODO: Substack URL">
          <p>
            <code>NEXT_PUBLIC_SUBSTACK_URL</code> is empty or not a public https address. No placeholder URL is shown.
            Set the variable in Vercel, then redeploy. Until then, Subscribe stays on this page.
          </p>
        </TodoNote>
      )}
      <SubstackCta location="newsletter" href={substack.href} configured={substack.configured} variant="band" />
      <h2 className="mt-10 text-2xl">What the newsletter is for</h2>
      <p className="mt-3">
        It is the delivery path for the same kind of research as the archive: a thesis, an update, or a note that a
        view changed. It is not a trade alert and not a review of a reader&apos;s portfolio.
      </p>
      <TodoNote title="TODO: cadence and tiers">
        <p>
          Publishing cadence is not set. Whether the Substack is entirely unpaid, or has a paid tier, is not set. This
          page will not say &quot;free&quot; or name a price until those facts are real.
        </p>
      </TodoNote>
      <p className="mt-6">
        There is no popup and no exit prompt.{" "}
        <Link href="/disclaimer" className="text-forest underline underline-offset-2">
          Read the disclaimer
        </Link>{" "}
        before you subscribe.{" "}
        <Link href="/research" className="text-forest underline underline-offset-2">
          Browse the research
        </Link>
        .
      </p>
    </div>
  );
}
