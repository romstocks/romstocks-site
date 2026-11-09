import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Markdown } from "@/components/markdown";
import { RichText } from "@/components/rich-text";
import { SubstackCta } from "@/components/substack-cta";
import { TodoNote } from "@/components/todo-note";
import { AUTHOR_BIO, formatDate, type SubstackLink } from "@/lib/site";
import {
  disclosureText,
  positionLabel,
  statusLabel,
  type Thesis,
} from "@/lib/theses";

export function ThesisArticle({
  thesis,
  substack,
}: {
  thesis: Thesis;
  substack: SubstackLink;
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: `${thesis.company} (${thesis.ticker})`, path: `/research/${thesis.slug}` },
  ];

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <Breadcrumbs items={crumbs} />
      {thesis.sample ? (
        <TodoNote title="Sample template — not research">
          <p>
            {thesis.company} is fictional and {thesis.ticker} is not a listed ticker. This page shows the thesis
            template. It is marked noindex and is not a view on any real company. A published thesis is meant to be
            about 1,800 to 3,500 words. This sample is short on purpose.
          </p>
        </TodoNote>
      ) : null}

      <h1 className="mt-6 text-3xl sm:text-4xl">{thesis.title}</h1>
      <p className="mt-4 text-base text-ink-soft">
        By {thesis.author} · Published <time dateTime={thesis.publishedAt}>{formatDate(thesis.publishedAt)}</time> ·
        Last updated <time dateTime={thesis.updatedAt}>{formatDate(thesis.updatedAt)}</time> · {thesis.readingMinutes}
        -min read · {thesis.ticker} · {thesis.exchange} · {thesis.sector}
      </p>

      <div className="mt-6 border border-ink bg-paper-raised px-4 py-4" role="note">
        <p>{disclosureText(thesis)}</p>
      </div>

      <section className="mt-6 border-l-4 border-forest bg-paper-raised px-4 py-4" aria-labelledby="tldr">
        <h2 id="tldr" className="text-xl">
          Thesis summary
        </h2>
        <p className="mt-3">{thesis.tldr}</p>
        <p className="mt-3 text-base">
          Status: {statusLabel(thesis.status)}. Position: {positionLabel(thesis.position)}.
        </p>
      </section>

      <SubstackCta
        location="thesis_after_summary"
        href={substack.href}
        configured={substack.configured}
        variant="slim"
        ticker={thesis.ticker}
      />

      <section className="mt-10" aria-labelledby="glance">
        <h2 id="glance" className="text-2xl">
          At a glance
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left" aria-labelledby="glance">
            <tbody>
              <GlanceRow label="Business in one line" value={thesis.glance.business} />
              <GlanceRow label="What the market is pricing in" value={thesis.glance.marketPricing} />
              <GlanceRow label="Variant view" value={thesis.glance.variantView} />
              <GlanceRow label="Value range" value={thesis.glance.valueRange} />
              <GlanceRow label="Key catalyst" value={thesis.glance.catalyst} />
              <GlanceRow label="Top risk" value={thesis.glance.topRisk} />
              <GlanceRow label="Review date" value={formatDate(thesis.glance.reviewDate)} />
            </tbody>
          </table>
        </div>
      </section>

      <Section
        id="business"
        heading="The business in plain English"
        body={thesis.sections.business}
        empty="TODO: describe how the company makes money, with the segment mix sourced from the latest 10-K."
      />
      <Section
        id="price"
        heading="What the current price assumes"
        body={thesis.sections.price}
        empty="TODO: say what the price appears to assume, using a dated method. Do not present a price target as a prediction."
      />
      <Section
        id="bull"
        heading={`The bull case for ${thesis.ticker}`}
        body={thesis.sections.bull}
        empty="TODO: three to five numbered arguments, each with evidence and a source. This is an argument, not a prediction."
      />
      <Section
        id="bear"
        heading={`The bear case for ${thesis.ticker}`}
        body={thesis.sections.bear}
        empty="TODO: give the bear case the same depth as the bull case."
      />

      <section className="mt-10" aria-labelledby="valuation">
        <h2 id="valuation" className="text-2xl">
          Valuation: bear, base, and bull
        </h2>
        <Markdown source={thesis.sections.valuation} />
        {!thesis.sections.valuation ? (
          <p className="mt-3">
            TODO: introduce the method in prose. The table below is the dated range under stated assumptions.
          </p>
        ) : null}
        <p className="mt-3">
          Method: {thesis.valuation.method}. As of {formatDate(thesis.valuation.asOf)}. {thesis.valuation.note}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left" aria-labelledby="valuation">
            <thead>
              <tr>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Scenario
                </th>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Assumptions
                </th>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Value range
                </th>
              </tr>
            </thead>
            <tbody>
              {thesis.valuation.scenarios.map((scenario) => (
                <tr key={scenario.name}>
                  <th scope="row" className="border border-line px-3 py-2 font-semibold">
                    {scenario.name}
                  </th>
                  <td className="border border-line px-3 py-2">{scenario.assumptions}</td>
                  <td className="border border-line px-3 py-2">{scenario.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-base text-ink-soft">
          These are estimates under the assumptions in the table, not price targets and not predictions.
        </p>
      </section>

      <SubstackCta
        location="thesis_after_valuation"
        href={substack.href}
        configured={substack.configured}
        variant="slim"
        ticker={thesis.ticker}
      />

      <section className="mt-10" aria-labelledby="catalysts">
        <h2 id="catalysts" className="text-2xl">
          Catalysts to watch
        </h2>
        <Markdown source={thesis.sections.catalysts} />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left" aria-labelledby="catalysts">
            <thead>
              <tr>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Event
                </th>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Expected timing
                </th>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  What would confirm or weaken
                </th>
              </tr>
            </thead>
            <tbody>
              {thesis.catalysts.map((row) => (
                <tr key={row.event}>
                  <th scope="row" className="border border-line px-3 py-2 font-semibold">
                    {row.event}
                  </th>
                  <td className="border border-line px-3 py-2">{row.timing}</td>
                  <td className="border border-line px-3 py-2">{row.confirmOrWeaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="risks">
        <h2 id="risks" className="text-2xl">
          Key risks
        </h2>
        <Markdown source={thesis.sections.risks} />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left" aria-labelledby="risks">
            <thead>
              <tr>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Rank
                </th>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Risk
                </th>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Likelihood (subjective)
                </th>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Impact
                </th>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  What to watch
                </th>
              </tr>
            </thead>
            <tbody>
              {thesis.risks.map((row, index) => (
                <tr key={row.risk}>
                  <td className="border border-line px-3 py-2">{index + 1}</td>
                  <th scope="row" className="border border-line px-3 py-2 font-semibold">
                    {row.risk}
                  </th>
                  <td className="border border-line px-3 py-2">{row.likelihood}</td>
                  <td className="border border-line px-3 py-2">{row.impact}</td>
                  <td className="border border-line px-3 py-2">{row.watch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="mind">
        <h2 id="mind" className="text-2xl">
          What would change my mind
        </h2>
        <Markdown source={thesis.sections.mind} />
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          {thesis.killCriteria.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="stay">
        <h2 id="stay" className="text-2xl">
          What must stay true
        </h2>
        <Markdown source={thesis.sections.stay} />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left" aria-labelledby="stay">
            <thead>
              <tr>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Metric
                </th>
                <th scope="col" className="border border-line bg-paper-raised px-3 py-2">
                  Threshold to check
                </th>
              </tr>
            </thead>
            <tbody>
              {thesis.mustStayTrue.map((row) => (
                <tr key={row.metric}>
                  <th scope="row" className="border border-line px-3 py-2 font-semibold">
                    {row.metric}
                  </th>
                  <td className="border border-line px-3 py-2">{row.threshold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {thesis.sections.extra.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-2xl">{section.heading}</h2>
          <Markdown source={section.body} />
        </section>
      ))}

      <section className="mt-10" aria-labelledby="faq">
        <h2 id="faq" className="text-2xl">
          FAQ about {thesis.company}
        </h2>
        <div className="mt-4 space-y-6">
          {thesis.faq.map((item) => (
            <article key={item.question}>
              <h3 className="text-xl">{item.question}</h3>
              <p className="mt-2">
                <RichText text={item.answer} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="changelog">
        <h2 id="changelog" className="text-2xl">
          Thesis changelog
        </h2>
        <ul className="mt-4 space-y-3">
          {thesis.changelog.map((entry) => (
            <li key={`${entry.date}-${entry.note}`}>
              <time dateTime={entry.date}>{formatDate(entry.date)}</time>
              {": "}
              {entry.note}
            </li>
          ))}
        </ul>
      </section>

      {thesis.sources.length > 0 ? (
        <section className="mt-10" aria-labelledby="sources">
          <h2 id="sources" className="text-2xl">
            Sources
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {thesis.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} className="text-forest underline underline-offset-2" rel="noopener noreferrer">
                  {source.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10" aria-labelledby="related">
        <h2 id="related" className="text-2xl">
          Related reading
        </h2>
        <p className="mt-3">
          <Link href="/methodology" className="text-forest underline underline-offset-2">
            How a Romstocks thesis is structured
          </Link>
          .{" "}
          <Link href="/newsletter" className="text-forest underline underline-offset-2">
            Newsletter
          </Link>
          .{" "}
          <Link href="/disclaimer" className="text-forest underline underline-offset-2">
            Disclaimer
          </Link>
          .
        </p>
        <TodoNote title="TODO">
          <p>
            Related theses, a ticker hub, a sector hub, and learn guides (bull case vs bear case, reverse DCF, kill
            criteria) are not published yet. They should be linked here once they exist. Do not add them as empty pages.
          </p>
        </TodoNote>
      </section>

      <SubstackCta
        location="thesis_end"
        href={substack.href}
        configured={substack.configured}
        variant="band"
      />

      <section className="mt-10 border border-line bg-paper-raised px-4 py-4" aria-labelledby="author">
        <h2 id="author" className="text-xl">
          About the author
        </h2>
        <p className="mt-3">{AUTHOR_BIO}</p>
        <p className="mt-3">
          <Link href="/about" className="text-forest underline underline-offset-2">
            About page
          </Link>
          {" · "}
          <Link href="/methodology" className="text-forest underline underline-offset-2">
            Methodology
          </Link>
        </p>
      </section>

      <p className="mt-8 text-base text-ink-soft">
        {thesis.sample
          ? "Sample only. This is not a recommendation and not a forecast."
          : "Educational research, not a recommendation."}{" "}
        <Link href="/disclaimer" className="text-forest underline underline-offset-2">
          Read the disclaimer
        </Link>
        .
      </p>
    </article>
  );
}

function GlanceRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <th scope="row" className="w-2/5 border border-line bg-paper-raised px-3 py-2 align-top font-semibold">
        {label}
      </th>
      <td className="border border-line px-3 py-2 align-top">{value}</td>
    </tr>
  );
}

function Section({
  id,
  heading,
  body,
  empty,
}: {
  id: string;
  heading: string;
  body: string;
  empty: string;
}) {
  return (
    <section className="mt-10" aria-labelledby={id}>
      <h2 id={id} className="text-2xl">
        {heading}
      </h2>
      {body ? <Markdown source={body} /> : <p className="mt-3">{empty}</p>}
    </section>
  );
}
