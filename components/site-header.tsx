import Link from "next/link";

const LINKS = [
  { href: "/research", label: "Research" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="no-underline">
          <span className="font-serif text-2xl text-ink">Romstocks</span>
          <span className="mt-0.5 block text-base text-ink-soft">Research notebook</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-12 items-center px-3 text-ink underline-offset-2 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
