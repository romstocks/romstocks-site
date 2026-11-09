import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SubstackCta } from "@/components/substack-cta";
import { TodoNote } from "@/components/todo-note";
import { webPageJsonLd } from "@/lib/schema";
import { AUTHOR_BIO, getSubstackLink, pageMetadata } from "@/lib/site";

const TITLE = "About Rom | Romstocks";
const DESCRIPTION =
  "Who writes Romstocks. Credentials, a photo, and the public byline are not published yet, and this page does not invent them.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  const substack = getSubstackLink();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <JsonLd
        data={webPageJsonLd({
          path: "/about",
          name: "About Rom",
          description: AUTHOR_BIO,
          type: "ProfilePage",
          breadcrumbs: crumbs,
        })}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-4xl">About Rom</h1>
      <p className="mt-4">{AUTHOR_BIO}</p>
      <p className="mt-4">
        This stub does not add a job title, a follower count, a track record, or a photograph. Those would be invented,
        so they are left blank.
      </p>
      <TodoNote title="TODO: facts still needed from Rom">
        <ul className="list-disc space-y-2 pl-5">
          <li>Full name, or confirmation that &quot;Rom&quot; is the byline to publish.</li>
          <li>A photo, if one should appear.</li>
          <li>Credentials, work history, or licenses, and only the ones that can be stated as fact.</li>
          <li>Regulatory status. Do not name a country of residence until Rom confirms it.</li>
          <li>Contact details.</li>
          <li>Public profiles, such as X, for a sameAs link. None are linked until the handles are real.</li>
          <li>Whether Romstocks is a personal project or a company.</li>
        </ul>
      </TodoNote>
      <SubstackCta location="about" href={substack.href} configured={substack.configured} variant="band" />
    </div>
  );
}
