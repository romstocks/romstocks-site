import Link from "next/link";
import type { ReactNode } from "react";

const PHRASES: { phrase: string; href: string }[] = [
  { phrase: "research archive", href: "/research" },
  { phrase: "newsletter page", href: "/newsletter" },
  { phrase: "about page", href: "/about" },
  { phrase: "methodology", href: "/methodology" },
  { phrase: "disclaimer", href: "/disclaimer" },
];

export function RichText({ text }: { text: string }) {
  return <span>{linkPhrases(text)}</span>;
}

function linkPhrases(text: string): ReactNode[] {
  const lower = text.toLowerCase();
  let earliest: { index: number; phrase: string; href: string } | null = null;

  for (const item of PHRASES) {
    const index = lower.indexOf(item.phrase);
    if (index === -1) continue;
    if (!earliest || index < earliest.index) {
      earliest = { index, phrase: item.phrase, href: item.href };
    }
  }

  if (!earliest) return [text];

  const before = text.slice(0, earliest.index);
  const match = text.slice(earliest.index, earliest.index + earliest.phrase.length);
  const after = text.slice(earliest.index + earliest.phrase.length);

  return [
    before,
    <Link
      key={`${earliest.href}-${earliest.index}`}
      href={earliest.href}
      className="text-forest underline underline-offset-2"
    >
      {match}
    </Link>,
    ...linkPhrases(after),
  ];
}
