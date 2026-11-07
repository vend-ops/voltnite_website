# VOLTNITE corporate website

A responsive Next.js App Router implementation of the supplied homepage reference, with project pages, an accessible mobile menu, and a validated contact form. Built with React, strict TypeScript, Tailwind CSS, Lucide React, `next/image`, and locally bundled Inter through `next/font/local`.

## Run locally

Requires Node.js 22.18+ and npm. The lockfile pins the installed versions, including Next.js 16.4.5.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

## Pages and navigation

- `/`: reference-matched homepage; Services and About use working section anchors.
- `/projects`: the three supplied projects.
- `/projects/vendis`, `/projects/vendops`, `/projects/custom-iot`: project information and contact links.
- `/contact`: enquiry form with Name, Email, optional Company, and Project Details.
- `/sitemap.xml`, `/robots.txt`: SEO discovery, with canonical URLs under `https://voltnite.com`.

The homepage is server rendered and statically generated. Client JavaScript is limited to navigation and the contact form. The contact page and its submission route run on the server. No database, authentication, CMS, analytics, or external font calls are required.

## Contact delivery status

**Delivery is not configured by default. Nothing is emailed or stored.** The form says this before submission. It validates fields on both the client and server, preserves the enquiry, and offers a copyable draft. It never shows a successful delivery message when no integration exists.

To connect delivery, copy `.env.example` to `.env.local` and set `CONTACT_WEBHOOK_URL` to a real HTTPS endpoint that you control. Optionally set `CONTACT_WEBHOOK_TOKEN`; the server sends it as a bearer token. Keep these variables server-side, without a `NEXT_PUBLIC_` prefix.

The endpoint must accept a JSON POST:

```json
{
  "name": "The visitor's name",
  "email": "The visitor's email",
  "company": "Optional company or an empty string",
  "details": "Project details",
  "source": "voltnite.com"
}
```

The integration must return 2xx only after accepting the enquiry. The website then reports that it was submitted; this is not a claim of email arrival. Non-2xx responses, redirects, and timeouts show an honest error and retain the draft. Requests time out after 10 seconds. Validation rejects malformed inputs, invalid email addresses, excessive lengths, and mismatched browser origins. Apply abuse protection and rate limits at your hosting edge or delivery endpoint before enabling a public integration. A real external delivery provider has not been exercised in this workspace.

Field limits: name 2–100 characters; email up to 254; optional company up to 150; project details 20–5,000; request payload up to 20KB. The application does not log enquiry bodies or expose delivery credentials to the browser.

## Visual reference and assets

The exact supplied reference is retained at `docs/reference/homepage-reference.png`. Its native width is **1199px**, rather than the approximate 1169px in the brief. Both widths are checked. Product and lab illustrations come from this reference. Branding uses the separately supplied logos, including the header, footer, browser icons, and an updated logo on the hero display. See [asset provenance](docs/ASSETS.md) for sources, editing details, crop coordinates, resolution limits, and font licensing.

The screenshot is the design authority. Desktop content preserves its 56px header, 348px hero, service row, three project cards, About row, and 88px purple CTA. The requested footer is added afterward. Smaller layouts adapt the same content for readability.

## Browser verification and screenshots

The browser tests use Playwright with locally installed Google Chrome:

```sh
npm run test:e2e
```

The command starts a dev server if one is not already running. Contact tests expect delivery environment variables to be unset. To use Playwright's bundled Chromium instead, remove `channel: "chrome"` from `playwright.config.ts` and install Chromium with `npx playwright install chromium`.

Tests check all seven viewport widths (375, 768, 1024, 1169, 1199, 1440, 1920), image loading, horizontal overflow, homepage console errors, menu interactions, section anchors, project routes, canonical metadata, sitemap, 404 handling, and contact validation. Unit tests cover malformed inputs and field boundaries.

Screenshots are saved in `docs/screenshots/`. The principal comparison files are:

- [Full desktop page, 1199px](docs/screenshots/homepage-1199.png)
- [Reference beside implementation](docs/screenshots/desktop-comparison.jpg)
- [Same 1199 × 1312 reference viewport](docs/screenshots/homepage-reference-viewport.png)
- [Tablet, 768px](docs/screenshots/homepage-768.png)
- [Mobile, 375px](docs/screenshots/homepage-375.png)

The source image and the actual rendered screenshots have been inspected visually and the implementation refined against them. See [visual validation](docs/VISUAL-VALIDATION.md) for measurements and remaining differences; exact pixel identity is not claimed.

## Deployment

Deploy the repository to a Next.js-compatible Node.js host, such as Vercel, using `npm ci` and `npm run build`. For a regular Node host, start the production server with `npm start`; it respects `PORT` and binds to `0.0.0.0`. Configure HTTPS and your domain at the host, and set contact integration environment variables there if delivery is ready.

The contact route and Next.js image optimization require a server deployment. This project is not configured as a static-only export. Connect `voltnite.com` only when you are ready; no production domain or hosting configuration has been changed by this implementation.

## Source structure

```text
src/app/                 Routes, metadata, global styles, and contact API
src/components/layout/   Header and footer
src/components/home/     Homepage sections
src/components/ui/       Shared cards and layout primitives
src/components/contact/  Interactive enquiry form
src/data/                Static service and project content
src/lib/                 Site constants and shared form validation
src/types/               Project type
public/brand/            Supplied logo and mark
public/images/           Local optimized reference assets
docs/                    Reference, provenance, screenshots, validation
tests/                   Browser checks
```
