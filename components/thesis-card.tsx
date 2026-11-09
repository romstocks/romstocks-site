import Link from "next/link";
import { formatDate } from "@/lib/site";
import { positionLabel, statusLabel, type Thesis } from "@/lib/theses";

export function ThesisCard({
  thesis,
  heading = "h2",
}: {
  thesis: Thesis;
  heading?: "h2" | "h3";
}) {
  return (
    <article className="border border-line bg-paper-raised p-4 sm:p-5">
      <div className="flex flex-wrap gap-2">
        {thesis.sample ? (
          <span className="bg-badge px-2 py-1 text-sm font-semibold text-ink">Sample · not research</span>
        ) : null}
        <span className="bg-badge px-2 py-1 text-sm font-semibold text-ink">{statusLabel(thesis.status)}</span>
        <span className="bg-badge px-2 py-1 text-sm font-semibold text-ink">{positionLabel(thesis.position)}</span>
      </div>
      {heading === "h2" ? (
        <h2 className="mt-3 text-2xl">
          <Link href={`/research/${thesis.slug}`} className="text-ink underline underline-offset-2">
            {thesis.company} ({thesis.ticker})
          </Link>
        </h2>
      ) : (
        <h3 className="mt-3 text-2xl">
          <Link href={`/research/${thesis.slug}`} className="text-ink underline underline-offset-2">
            {thesis.company} ({thesis.ticker})
          </Link>
        </h3>
      )}
      <p className="mt-2">{thesis.oneLiner}</p>
      <p className="mt-3 text-base text-ink-soft">
        {thesis.sector} · Published {formatDate(thesis.publishedAt)} · Updated {formatDate(thesis.updatedAt)}
      </p>
    </article>
  );
}
