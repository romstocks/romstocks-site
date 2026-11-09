import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { TodoNote } from "@/components/todo-note";
import { webPageJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const TITLE = "Privacy | Romstocks";
const DESCRIPTION =
  "Draft notes on what the Romstocks site measures. This privacy page is a template and is not indexed.";
const LEAD =
  "The site does not ask for an email address and does not run a mailing list. Subscription, if you choose it, happens on Substack under Substack's own terms.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Privacy", path: "/privacy" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={webPageJsonLd({
          path: "/privacy",
          name: "Privacy",
          description: LEAD,
          breadcrumbs: crumbs,
        })}
      />
      <Breadcrumbs items={crumbs} />
      <TodoNote title="TEMPLATE — needs review by a qualified attorney">
        <p>
          This is not a finished privacy policy. It records how the foundation build is wired so a lawyer has something
          to correct. It is marked noindex.
        </p>
      </TodoNote>
      <h1 className="mt-6 text-4xl">Privacy</h1>
      <p className="mt-4">{LEAD}</p>
      <p className="mt-4">
        Vercel Web Analytics records page views. A custom event fires when a Subscribe control is used. That event
        includes the control&apos;s location on the site, such as home_hero, and whether a Substack URL is configured
        (yes or no). It does not include a name, email address, or account id, and the link is not given extra personal
        query parameters.
      </p>
      <p className="mt-4">
        The site is hosted on Vercel. Vercel processes requests in order to serve the pages. This draft does not try to
        restate Vercel&apos;s policy.
      </p>
      <TodoNote title="TODO">
        <p>
          Contact details for privacy questions are not set. Cookie behavior, retention, and any region-specific notice
          need a lawyer once the hosting and analytics setup is final.
        </p>
      </TodoNote>
    </div>
  );
}
