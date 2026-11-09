"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { SHORT_DISCLAIMER, type CtaLocation } from "@/lib/site";

export function SubstackCta({
  location,
  href,
  configured,
  variant,
  ticker,
}: {
  location: CtaLocation;
  href: string;
  configured: boolean;
  variant: "primary" | "slim" | "band";
  ticker?: string;
}) {
  const lead =
    variant === "primary"
      ? "New theses are published on Substack. Romstocks does not run its own email list."
      : ticker
        ? `Get the next thesis, and later updates, in your inbox. ${ticker} on this page is not a reason to act.`
        : "Get the next thesis in your inbox.";

  function onClick() {
    try {
      track("substack_cta_click", {
        location,
        configured: configured ? "yes" : "no",
      });
    } catch {
      // Analytics must not block the subscription path.
    }
  }

  const className =
    "inline-flex min-h-12 items-center justify-center bg-ink px-5 py-3 text-base font-semibold text-paper no-underline";

  const link = configured ? (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      Subscribe on Substack
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={className} onClick={onClick}>
      Subscribe on Substack
    </Link>
  );

  return (
    <div
      className={
        variant === "band"
          ? "mt-10 border border-line bg-paper-raised px-4 py-5 sm:px-6"
          : variant === "slim"
            ? "mt-8 border-l-4 border-forest bg-paper-raised px-4 py-4"
            : "mt-6"
      }
    >
      <p className={variant === "primary" ? "max-w-2xl text-ink-soft" : "max-w-2xl"}>{lead}</p>
      <div className="mt-4">{link}</div>
      {configured ? null : (
        <p className="mt-3 text-base text-ink">
          TODO: the Substack URL is not set. This button opens the newsletter page instead of an invented address.
        </p>
      )}
      <p className="mt-3 max-w-2xl text-base text-ink-soft">
        {SHORT_DISCLAIMER}{" "}
        <Link href="/disclaimer" className="text-forest underline underline-offset-2">
          Read the disclaimer
        </Link>
        .
      </p>
    </div>
  );
}
