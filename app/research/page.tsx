import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SubstackCta } from "@/components/substack-cta";
import { ThesisCard } from "@/components/thesis-card";
import { collectionJsonLd } from "@/lib/schema";
import { getSubstackLink, pageMetadata } from "@/lib/site";
import { getAllTheses, isThesisStatus, statusLabel, THESIS_STATUSES, type ThesisStatus } from "@/lib/theses";

const TITLE = "Stock Investment Theses Archive | Romstocks";
const DESCRIPTION =
  "Browse every Romstocks thesis on US stocks by status. Each includes bull and bear cases, valuation scenarios, and risks.";
const H1 = "US stock investment theses";
const LEAD =
  "This archive lists every thesis file in the site. Published work is meant to include a bull case, a bear case, a dated valuation range, catalysts, risks, and what would change the view. The only file shipped with the foundation is a labeled sample.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/research",
});

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.status) ? params.status[0] : params.status;
  const status: ThesisStatus | undefined = raw && isThesisStatus(raw) ? raw : undefined;
  const all = getAllTheses();
  const visible = status ? all.filter((thesis) => thesis.status === status) : all;
  const substack = getSubstackLink();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <JsonLd
        data={collectionJsonLd({
          path: "/research",
          name: H1,
          description: LEAD,
          theses: visible,
          breadcrumbs: crumbs,
        })}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl">{H1}</h1>
      <p className="mt-4 max-w-3xl">{LEAD}</p>

      <nav aria-label="Filter theses by status" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          <li>
            <FilterLink href="/research" current={status === undefined} label="All" />
          </li>
          {THESIS_STATUSES.map((item) => (
            <li key={item}>
              <FilterLink
                href={`/research?status=${item}`}
                current={status === item}
                label={statusLabel(item)}
              />
            </li>
          ))}
        </ul>
      </nav>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {visible.map((thesis) => (
            <ThesisCard key={thesis.slug} thesis={thesis} />
          ))}
        </div>
      ) : (
        <p className="mt-8">No theses with that status yet.</p>
      )}

      <p className="mt-8 max-w-3xl">
        Ticker hubs and sector pages are not created until there is enough real research to avoid thin pages.{" "}
        <Link href="/methodology" className="text-forest underline underline-offset-2">
          Methodology
        </Link>{" "}
        explains what is still unwritten.
      </p>
      <SubstackCta location="research_index" href={substack.href} configured={substack.configured} variant="band" />
    </div>
  );
}

function FilterLink({ href, current, label }: { href: string; current: boolean; label: string }) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`inline-flex min-h-12 items-center border px-3 ${
        current ? "border-ink bg-ink text-paper no-underline" : "border-line bg-paper-raised text-ink underline"
      }`}
    >
      {label}
    </Link>
  );
}
