import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Romstocks" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-4xl">Page not found</h1>
      <p className="mt-4">That address is not on Romstocks.</p>
      <p className="mt-4">
        <Link href="/" className="text-forest underline underline-offset-2">
          Go to the homepage
        </Link>
        {" · "}
        <Link href="/research" className="text-forest underline underline-offset-2">
          Browse the research
        </Link>
      </p>
    </div>
  );
}
