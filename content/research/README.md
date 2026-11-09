# Adding a thesis

Research posts are markdown files in this folder. Copy `_template.md` to a new file. The filename is the URL and should not change later.

```text
content/research/adbe-adobe-investment-thesis.md
→ https://romstocks.com/research/adbe-adobe-investment-thesis
```

Use lowercase kebab-case. Do not put a date or the word "buy" in the filename.

## Before it can be indexed

The site refuses to index a file when any of these are true:

- `status` is `draft`
- `sample` is `true`
- `noindex` is `true`
- the ticker is `SAMPLE`
- the filename contains `sample`

`draft` is the right status for work in progress. When a real thesis is ready, set `status` to `active`, `updated`, `under-review`, or `closed`, set `sample` to `false`, and set `noindex` to `false`.

Files whose names start with `_` are templates. They are checked when the site builds, and they are not published.

## What to edit

The top of the file (between the `---` lines) holds the tables: summary, at-a-glance row, valuation scenarios, catalysts, risks, kill criteria, FAQ, and changelog. The FAQ answers are shown on the page and copied into the page's structured data, so write them once, here.

The body, under the frontmatter, is the prose. Use the `##` headings from the template so the page can place each section. You can use paragraphs, lists, and links.

## Tone

Write in the first person as an opinion: "In my view", "My base case assumes". A value range needs a method, a date, and the assumptions, and it has to be labeled as an estimate.

Do not write guaranteed results, a promise to beat the market, "buy now", a countdown, a performance percentage, or a price target stated as a prediction.

The sample file `sample-northwind-investment-thesis.md` is fictional. Replace it with real research only by adding a new file. Do not turn the sample into a real company.
