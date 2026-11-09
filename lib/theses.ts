import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content", "research");

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

const thesisSchema = z.object({
  title: z.string().min(10),
  seoTitle: z.string().min(10).max(70),
  description: z.string().min(40).max(200),
  company: z.string().min(1),
  ticker: z.string().min(1).max(12),
  exchange: z.string().min(1),
  sector: z.string().min(1),
  status: z.enum(["draft", "active", "updated", "under-review", "closed"]),
  sample: z.boolean(),
  noindex: z.boolean(),
  publishedAt: dateString,
  updatedAt: dateString,
  author: z.string().min(1),
  position: z.enum(["long", "short", "none"]),
  oneLiner: z.string().min(10),
  tldr: z.string().min(40),
  glance: z.object({
    business: z.string().min(1),
    marketPricing: z.string().min(1),
    variantView: z.string().min(1),
    valueRange: z.string().min(1),
    catalyst: z.string().min(1),
    topRisk: z.string().min(1),
    reviewDate: dateString,
  }),
  valuation: z.object({
    method: z.string().min(1),
    asOf: dateString,
    note: z.string().min(1),
    scenarios: z
      .array(
        z.object({
          name: z.string().min(1),
          assumptions: z.string().min(1),
          range: z.string().min(1),
        }),
      )
      .min(1),
  }),
  catalysts: z
    .array(
      z.object({
        event: z.string().min(1),
        timing: z.string().min(1),
        confirmOrWeaken: z.string().min(1),
      }),
    )
    .min(1),
  risks: z
    .array(
      z.object({
        risk: z.string().min(1),
        likelihood: z.string().min(1),
        impact: z.string().min(1),
        watch: z.string().min(1),
      }),
    )
    .min(1),
  killCriteria: z.array(z.string().min(1)).min(1),
  mustStayTrue: z
    .array(
      z.object({
        metric: z.string().min(1),
        threshold: z.string().min(1),
      }),
    )
    .min(1),
  faq: z
    .array(
      z.object({
        question: z.string().min(8),
        answer: z.string().min(40),
      }),
    )
    .min(1),
  changelog: z
    .array(
      z.object({
        date: dateString,
        note: z.string().min(1),
      }),
    )
    .min(1),
  sources: z.array(
    z.object({
      label: z.string().min(1),
      url: z.string().refine((value) => {
        try {
          return new URL(value).protocol === "https:";
        } catch {
          return false;
        }
      }, "Source URLs must be https"),
    }),
  ),
});

export type Thesis = z.infer<typeof thesisSchema> & {
  slug: string;
  readingMinutes: number;
  sections: ThesisSections;
};

export type ThesisStatus = Thesis["status"];
export type ThesisPosition = Thesis["position"];

export type ThesisSections = {
  business: string;
  price: string;
  bull: string;
  bear: string;
  valuation: string;
  catalysts: string;
  risks: string;
  mind: string;
  stay: string;
  extra: { heading: string; body: string }[];
};

const SECTION_MATCHERS: {
  key: keyof Omit<ThesisSections, "extra">;
  test: (heading: string) => boolean;
}[] = [
  { key: "business", test: (heading) => /business/i.test(heading) },
  { key: "price", test: (heading) => /price/i.test(heading) },
  { key: "bull", test: (heading) => /bull case/i.test(heading) },
  { key: "bear", test: (heading) => /bear case/i.test(heading) },
  { key: "valuation", test: (heading) => /valuation/i.test(heading) },
  { key: "catalysts", test: (heading) => /catalyst/i.test(heading) },
  { key: "risks", test: (heading) => /risk/i.test(heading) },
  {
    key: "mind",
    test: (heading) => /change my mind|kill criteria/i.test(heading),
  },
  { key: "stay", test: (heading) => /must stay true/i.test(heading) },
];

const SKIPPED_HEADINGS = /faq|changelog|disclosure|source/i;

function coerceDate(value: unknown): unknown {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getUTCFullYear();
    const month = String(value.getUTCMonth() + 1).padStart(2, "0");
    const day = String(value.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return value;
}

function coerceDates(data: Record<string, unknown>): void {
  data.publishedAt = coerceDate(data.publishedAt);
  data.updatedAt = coerceDate(data.updatedAt);
  if (isRecord(data.glance)) data.glance.reviewDate = coerceDate(data.glance.reviewDate);
  if (isRecord(data.valuation)) data.valuation.asOf = coerceDate(data.valuation.asOf);
  if (Array.isArray(data.changelog)) {
    for (const entry of data.changelog) {
      if (isRecord(entry)) entry.date = coerceDate(entry.date);
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function splitMarkdownSections(markdown: string): { heading: string; body: string }[] {
  const lines = markdown.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: { heading: string; body: string }[] = [];
  const preface: string[] = [];
  let current: { heading: string; lines: string[] } | null = null;
  let seenHeading = false;

  for (const line of lines) {
    const match = /^## (.+)$/.exec(line);
    if (match) {
      if (current) {
        sections.push({
          heading: current.heading,
          body: current.lines.join("\n").trim(),
        });
      }
      current = { heading: match[1].trim(), lines: [] };
      seenHeading = true;
      continue;
    }
    if (!seenHeading) preface.push(line);
    else current?.lines.push(line);
  }

  if (current) {
    sections.push({
      heading: current.heading,
      body: current.lines.join("\n").trim(),
    });
  }

  const prefaceBody = preface.join("\n").trim();
  if (prefaceBody) sections.unshift({ heading: "", body: prefaceBody });
  return sections;
}

function assignSections(markdown: string): ThesisSections {
  const sections: ThesisSections = {
    business: "",
    price: "",
    bull: "",
    bear: "",
    valuation: "",
    catalysts: "",
    risks: "",
    mind: "",
    stay: "",
    extra: [],
  };

  for (const section of splitMarkdownSections(markdown)) {
    if (!section.heading) {
      if (section.body) sections.extra.push({ heading: "Notes", body: section.body });
      continue;
    }
    if (SKIPPED_HEADINGS.test(section.heading)) continue;
    const match = SECTION_MATCHERS.find((candidate) => candidate.test(section.heading));
    if (!match) {
      sections.extra.push(section);
      continue;
    }
    const existing = sections[match.key];
    sections[match.key] = existing ? `${existing}\n\n${section.body}` : section.body;
  }

  return sections;
}

function wordCount(parts: string[]): number {
  return parts
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function readingMinutes(parts: string[]): number {
  return Math.max(1, Math.round(wordCount(parts) / 200));
}

function parseThesisFile(filePath: string): Thesis {
  const base = path.basename(filePath, path.extname(filePath));
  const slug = base.startsWith("_") ? "template" : base;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `${filePath} must use a lowercase kebab-case filename. That filename is the URL slug and should stay stable.`,
    );
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  if (!isRecord(parsed.data)) {
    throw new Error(`${filePath} is missing frontmatter.`);
  }

  const data = parsed.data;
  coerceDates(data);
  if (typeof data.sample !== "boolean") data.sample = false;
  if (typeof data.noindex !== "boolean") data.noindex = false;
  if (!Array.isArray(data.sources)) data.sources = [];

  const result = thesisSchema.safeParse(data);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid thesis file ${path.basename(filePath)}:\n${details}`);
  }

  const value = result.data;
  const forcedNoindex =
    value.sample ||
    value.status === "draft" ||
    value.noindex ||
    value.ticker.toUpperCase() === "SAMPLE" ||
    slug.includes("sample");

  const sections = assignSections(parsed.content);
  const minutes = readingMinutes([
    value.tldr,
    value.oneLiner,
    ...Object.values(sections).flatMap((section) =>
      typeof section === "string" ? [section] : section.map((item) => `${item.heading} ${item.body}`),
    ),
    ...value.faq.map((item) => `${item.question} ${item.answer}`),
    ...value.killCriteria,
  ]);

  return {
    ...value,
    ticker: value.ticker.toUpperCase(),
    noindex: forcedNoindex,
    slug,
    sections,
    readingMinutes: minutes,
  };
}

let cached: Thesis[] | null = null;

function loadTheses(): Thesis[] {
  if (cached) return cached;

  const templatePath = path.join(CONTENT_DIR, "_template.md");
  if (fs.existsSync(templatePath)) parseThesisFile(templatePath);

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_") && name.toLowerCase() !== "readme.md");

  cached = files
    .map((name) => parseThesisFile(path.join(CONTENT_DIR, name)))
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));

  return cached;
}

export function getAllTheses(): Thesis[] {
  return loadTheses();
}

export function getIndexableTheses(): Thesis[] {
  return loadTheses().filter((thesis) => !thesis.noindex);
}

export function getThesis(slug: string): Thesis | undefined {
  return loadTheses().find((thesis) => thesis.slug === slug);
}

export function statusLabel(status: ThesisStatus): string {
  switch (status) {
    case "active":
      return "Active";
    case "updated":
      return "Updated";
    case "under-review":
      return "Under review";
    case "closed":
      return "Closed";
    case "draft":
      return "Draft";
  }
}

export function positionLabel(position: ThesisPosition): string {
  switch (position) {
    case "long":
      return "Long position";
    case "short":
      return "Short position";
    case "none":
      return "No position";
  }
}

export function disclosureText(thesis: Thesis): string {
  const holding =
    thesis.position === "long"
      ? `holds a long position in ${thesis.ticker}`
      : thesis.position === "short"
        ? `holds a short position in ${thesis.ticker}`
        : `has no position in ${thesis.ticker}`;
  const prefix = thesis.sample ? "Sample disclosure for a fictional company. " : "";
  return `${prefix}Disclosure: At publication the author ${holding}. Whether the author may trade within a set number of days is not decided yet (TODO: position-disclosure policy). Not investment advice.`;
}

export const THESIS_STATUSES: ThesisStatus[] = [
  "active",
  "updated",
  "under-review",
  "closed",
  "draft",
];

export function isThesisStatus(value: string): value is ThesisStatus {
  return THESIS_STATUSES.some((status) => status === value);
}
