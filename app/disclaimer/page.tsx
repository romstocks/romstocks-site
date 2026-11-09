import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { TodoNote } from "@/components/todo-note";
import { webPageJsonLd } from "@/lib/schema";
import { SHORT_DISCLAIMER, pageMetadata } from "@/lib/site";

const TITLE = "Disclaimer & Position Disclosure Policy | Romstocks";
const DESCRIPTION =
  "Romstocks content is educational, not investment advice. Read the disclaimer template and the open position-disclosure questions.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Disclaimer", path: "/disclaimer" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={webPageJsonLd({
          path: "/disclaimer",
          name: "Disclaimer and position disclosure",
          description: SHORT_DISCLAIMER,
          breadcrumbs: crumbs,
        })}
      />
      <Breadcrumbs items={crumbs} />
      <TodoNote title="TEMPLATE — needs review by a qualified attorney">
        <p>
          This page is a draft for the site, written so visitors can see the intended posture. It has not been reviewed
          by counsel. It is not legal advice. Do not treat it as a finished policy. A lawyer should review it before
          launch, including any publisher-style or registration questions.
        </p>
      </TodoNote>
      <h1 className="mt-6 text-4xl">Disclaimer and position disclosure</h1>
      <p className="mt-4 text-lg">{SHORT_DISCLAIMER}</p>

      <h2 className="mt-10 text-2xl">What Romstocks is</h2>
      <p className="mt-3">
        Romstocks publishes general, impersonal writing about US stocks for a broad audience. A thesis states one
        person&apos;s view, the opposing case, and the evidence that would change that view. Reading it does not create
        an advisory relationship.
      </p>

      <h2 className="mt-10 text-2xl">What it is not</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>It is not personalized investment, legal, or tax advice.</li>
        <li>It is not a recommendation to buy, sell, or hold any security.</li>
        <li>It is not an offer to manage money and not a solicitation tailored to you.</li>
        <li>It does not promise results, and it does not present a track record.</li>
      </ul>

      <h2 className="mt-10 text-2xl">Risk</h2>
      <p className="mt-3">
        Equities can fall in price. You can lose money, including the amount you invest. Past events described in a
        thesis do not indicate future results. Figures in a valuation table, when a real thesis has them, are estimates
        under stated assumptions as of a date. They are not predictions of a future market price.
      </p>

      <h2 className="mt-10 text-2xl">Positions</h2>
      <p className="mt-3">
        A thesis is meant to say, at publication, whether the author is long, short, or has no position. A position can
        change after publication without an immediate update to the page.
      </p>
      <TodoNote title="TODO: position-disclosure policy">
        <ul className="list-disc space-y-2 pl-5">
          <li>Confirm that every thesis will disclose the author&apos;s position.</li>
          <li>Decide whether there is a trading blackout around publication, and for how many days.</li>
          <li>Decide whether the author will write about stocks he is short.</li>
          <li>Decide whether bear, base, and bull value ranges are published, or only qualitative views.</li>
        </ul>
      </TodoNote>

      <h2 className="mt-10 text-2xl">Registration and conflicts</h2>
      <p className="mt-3">
        This template does not claim that Rom is, or is not, registered with any regulator. That fact was not provided.
        Where Rom is based was not confirmed for this page, so no jurisdiction is stated as fact.
      </p>
      <p className="mt-3">
        If the author is ever paid by an issuer, or by someone acting for an issuer, to publish about a security, that
        payment, its source, and the amount need to be disclosed on the piece. No such arrangement is described here.
      </p>
      <TodoNote title="TODO: counsel and status">
        <p>
          Have a qualified attorney review this page before launch. Confirm regulatory status and whether any
          publisher-style exclusion is being relied on. Do not publish a registration claim until it is checked.
        </p>
      </TodoNote>

      <h2 className="mt-10 text-2xl">Accuracy and other sites</h2>
      <p className="mt-3">
        Research can be wrong, incomplete, or out of date. Primary documents such as SEC filings can differ from a
        summary. Links to other sites, including Substack and EDGAR, are there for the reader. Romstocks does not
        control those sites.
      </p>
      <p className="mt-3">
        Questions about your own portfolio are outside what this site can answer. A licensed adviser who knows your
        circumstances is the right place for that.
      </p>
      <p className="mt-6">
        <Link href="/methodology" className="text-forest underline underline-offset-2">
          Methodology
        </Link>
        {" · "}
        <Link href="/newsletter" className="text-forest underline underline-offset-2">
          Newsletter
        </Link>
      </p>
    </div>
  );
}
