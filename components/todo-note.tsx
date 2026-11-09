import type { ReactNode } from "react";

export function TodoNote({
  title = "TODO",
  children,
  id,
}: {
  title?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <aside
      id={id}
      role="note"
      className="border border-line bg-badge px-4 py-4 text-ink"
    >
      <p className="font-semibold">{title}</p>
      <div className="mt-2 text-ink">{children}</div>
    </aside>
  );
}
