# Romstocks

Romstocks is Rom's research notebook on US equities: dated, testable theses on individual US stocks, with the bear case included. The site is educational. It is not personalized investment advice.

The only email list is Rom's Substack. This site does not collect addresses.

## Stack

Next.js (App Router), TypeScript, and Tailwind, intended for Vercel Hobby.

## Local development

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run typecheck
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` for local work. In Vercel, set the same name under Project Settings → Environment Variables for Production (and Preview, if previews should link out).

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUBSTACK_URL` | No, until the publication exists | Public `https` URL of the Substack. Example: `https://romstocks.substack.com`. If it is missing, Subscribe buttons go to `/newsletter` and the page shows a TODO. The value is public. Do not put secrets, emails, or personal query parameters in it. |

Vercel Web Analytics needs no key when the project is deployed on Vercel. Enable **Analytics** in the project dashboard or custom events will not be stored. The event name is `substack_cta_click`. Properties are `location` (which button) and `configured` (`yes` or `no`). No name, email, or account id is sent.

No other environment variables are used. Do not commit `.env.local`.

## Content

See [content/research/README.md](content/research/README.md). Posts are markdown files with frontmatter. The shipped post is a fictional sample, marked draft and noindex.

## URLs and SEO

Canonical URLs use `https://romstocks.com`. Drafts, the sample, `/privacy`, and `/terms` are `noindex` and are left out of `sitemap.xml`. `robots.txt` allows Googlebot, Bingbot, and the AI crawlers named in the SEO notes (OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot, Google-Extended), plus everyone else.

The default share image is 1200×630, generated at `/opengraph-image`. Thesis pages get their own image from the one-line summary. Lines that contain a dollar amount or a percent are replaced so a price target is not baked into the image.

## Security headers

`next.config.ts` sends:

- Content-Security-Policy. Production does not allow `unsafe-eval`. `unsafe-inline` stays so Next.js and the visible JSON-LD blocks can run. `unsafe-eval` is added only when `NODE_ENV` is development.
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` with camera, microphone, geolocation, and payment disabled
- `X-Frame-Options: DENY` and `frame-ancestors 'none'`
- `Strict-Transport-Security` outside local development

There is no Substack iframe. `upgrade-insecure-requests` is added when `VERCEL=1`, so local `http://localhost` still loads.

## Brand

The header is the word "Romstocks" in text. Colors are a neutral paper-and-ink palette used until a logo and a palette are supplied. TODO markers in the footer and on `/about` say so.

## Still unknown

These are visible on the site and should not be invented in code:

- Substack URL, cadence, and whether any tier is paid
- Tickers and sectors covered
- Rom's credentials, photo, and whether he publishes under his full name
- Position-disclosure policy, including any trading window
- Contact details
- Logo and brand colors
- Legal review of `/disclaimer`, `/privacy`, and `/terms`

`/privacy` and `/terms` are short templates so the footer does not 404. They are noindex until a lawyer replaces them. `/disclaimer` is also labeled as a template that needs an attorney.
