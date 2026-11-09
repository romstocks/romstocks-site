import type { ReactElement } from "react";

export const ogSize = { width: 1200, height: 630 };

export function ogSafeLine(line: string): string {
  if (/\$\s?\d|\b\d+(?:\.\d+)?\s?%/.test(line)) {
    return "Bull case, bear case, and what would change the view.";
  }
  return line;
}

export function OgCard({
  kicker,
  title,
  footer,
}: {
  kicker: string;
  title: string;
  footer: string;
}): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f6f3ec",
        color: "#1c1915",
        padding: "72px",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, letterSpacing: 4 }}>ROMSTOCKS</div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
        <div style={{ display: "flex", fontSize: 28, color: "#1e4636" }}>{kicker}</div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            lineHeight: 1.15,
            marginTop: 20,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#3f3a34" }}>{footer}</div>
    </div>
  );
}
