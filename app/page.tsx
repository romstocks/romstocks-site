import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { SubstackCta } from "@/components/substack-cta";
import { ThesisCard } from "@/components/thesis-card";
import { TodoNote } from "@/components/todo-note";
import { homeFaqs } from "@/lib/faqs";
import { homeJsonLd } from "@/lib/schema";
import {
  AUTHOR_BIO,
  HOME_DESCRIPTION,
  HOME_INTRO,
  HOME_SUBHEAD,
  HOME_TITLE,
  getSubstackLink,
  pageMetadata,
} from "@/lib/site";
import { getAllTheses } from "@/lib/theses";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

const THESIS_PARTS = [
  {
    title: "Thesis summary",
    body: "The view, what the price appears to assume, the status, and the next catalyst, before the long version.",
  },
  {
    title: "Bull case and bear case",
    body: "The strongest reasonable argument on each side. Neither is a prediction or a recommendation, and the bear case gets the same room.",
  },
  {
    title: "Valuation range",
    body: "Bear, base, and bull rows with assumptions, method, and date. A range is an estimate, not a forecast of the share price.",
  },
  {
    title: "Catalysts",
    body: "Dated events that could change what other investors expect, plus what would support the view and what would weaken it.",
  },
  {
    title: "Key risks",
    body: "Ranked risks, with likelihood labeled as subjective, plus impact and what to watch.",
  },
  {
    title: "What would change my mind",
    body: "Measurable kill criteria, written so a reader can check later whether the view still holds.",
  },
];

const STEPS = [
  "State the business in plain English, including how it makes money.",
  "Say what the current price appears to assume.",
  "Write the bull case and a bear case of equal depth.",
  "Show a dated valuation range under explicit assumptions.",
  "Name catalysts, ranked risks, and what would change the view.",
];

const LEARN_CARDS = [
  {
    title: "How to write an investment thesis",
    body: "A step-by-step guide and a one-page template.",
  },
  {
    title: "Bull case vs bear case vs base case",
    body: "What each case is for, including the case the author does not hold.",
  },
  {
    title: "Kill criteria",
    body: "How to decide in advance what evidence would prove a thesis wrong.",
  },
];

export default function HomePage() {
  const theses = getAllTheses();
  const published = theses.filter((thesis) => !thesis.noindex);
  const samples = theses.filter((thesis) => thesis.sample);
  const substack = getSubstackLink();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <JsonLd data={homeJsonLd()} />
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl">Independent US Stock Research, With the Bear Case Included</h1>
        <p className="mt-6 text-lg">{HOME_INTRO}</p>
        <p className="mt-4 text-lg text-ink-soft">{HOME_SUBHEAD}</p>
        <SubstackCta location="home_hero" href={substack.href} configured={substack.configured} variant="primary" />
        <p className="mt-4">
          <Link href="/research" className="text-forest underline underline-offset-2">
            Browse the research
          </Link>
        </p>
      </div>

      <section className="mt-14" aria-labelledby="latest">
        <h2 id="latest" className="text-3xl">
          Latest research
        </h2>
        {published.length > 0 ? (
          <div className="mt-6 grid gap-4">
            {published.slice(0, 6).map((thesis) => (
              <ThesisCard key={thesis.slug} thesis={thesis} heading="h3" />
            ))}
          </div>
        ) : (
          <p className="mt-4 max-w-3xl">
            No published thesis is in the archive yet. A new file will show the ticker, a one-line view, status, dates,
            and position.
          </p>
        )}
        {samples.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-xl">Template preview</h3>
            <p className="mt-2 max-w-3xl">
              The card below is a labeled sample so the archive has something to render. It is not research.
            </p>
            <div className="mt-4 grid gap-4">
              {samples.map((thesis) => (
                <ThesisCard key={thesis.slug} thesis={thesis} heading="h3" />
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="contents">
        <h2 id="contents" className="text-3xl">
          What&apos;s in every Romstocks thesis
        </h2>
        <p className="mt-4">The same six parts show up every time, so the bear case is not an afterthought.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {THESIS_PARTS.map((part) => (
            <article key={part.title} className="border border-line bg-paper-raised p-4">
              <h3 className="text-xl">{part.title}</h3>
              <p className="mt-2">{part.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="process">
        <h2 id="process" className="text-3xl">
          How a thesis is put together
        </h2>
        <p className="mt-4">
          These steps are what the template asks for, not a finished policy. The{" "}
          <Link href="/methodology" className="text-forest underline underline-offset-2">
            methodology page
          </Link>{" "}
          lists what is still unconfirmed.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          {STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-14" aria-labelledby="learn">
        <h2 id="learn" className="text-3xl">
          Learn the method
        </h2>
        <p className="mt-4 max-w-3xl">These guides are not written yet, so the cards are not links.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {LEARN_CARDS.map((card) => (
            <article key={card.title} className="border border-line p-4">
              <h3 className="text-xl">{card.title}</h3>
              <p className="mt-2">{card.body}</p>
              <p className="mt-3 text-base font-semibold">TODO: not published yet.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="author">
        <h2 id="author" className="text-3xl">
          About Rom
        </h2>
        <p className="mt-4">{AUTHOR_BIO}</p>
        <p className="mt-4">
          <Link href="/about" className="text-forest underline underline-offset-2">
            Read the about page
          </Link>
          . It does not add credentials or a photo.
        </p>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="inbox">
        <h2 id="inbox" className="text-3xl">
          Get the next thesis in your inbox
        </h2>
        <p className="mt-4">
          TODO: publishing cadence is not set, and it is not decided whether any tier is paid.
        </p>
        <SubstackCta location="home_inbox" href={substack.href} configured={substack.configured} variant="band" />
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="faq">
        <h2 id="faq" className="text-3xl">
          Questions about Romstocks
        </h2>
        <div className="mt-6 space-y-6">
          {homeFaqs.map((item) => (
            <article key={item.question}>
              <h3 className="text-xl">{item.question}</h3>
              <p className="mt-2">
                <RichText text={item.answer} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-14 max-w-3xl">
        <TodoNote title="Open items">
          <p>
            Still unknown: the Substack URL, tickers and sectors, credentials and byline, the position policy, cadence,
            contact details, and a logo.
          </p>
        </TodoNote>
      </div>
    </div>
  );
}
