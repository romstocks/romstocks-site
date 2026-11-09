import Link from "next/link";
import { SHORT_DISCLAIMER } from "@/lib/site";

const LINKS = [
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <p className="max-w-3xl text-base text-ink-soft">
          {SHORT_DISCLAIMER}{" "}
          <Link href="/disclaimer" className="text-forest underline underline-offset-2">
            Full disclaimer
          </Link>
          .
        </p>
        <nav aria-label="Footer" className="mt-4">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-12 items-center text-forest underline underline-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-4 text-base text-ink-soft">
          TODO: logo, brand colors, and a public profile link are not provided yet. The wordmark is set in text.
        </p>
      </div>
    </footer>
  );
}
