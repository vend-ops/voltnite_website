# Visual validation

Reference: `reference/homepage-reference.png`, 1199 × 1312 pixels. The attached image was found locally and inspected before implementation. The implementation was captured in actual Chrome through Playwright, visually compared with the reference, and refined across several passes.

## Desktop measurements

Positions are CSS pixels from the top of the page at 1199px viewport width.

| Element | Reference | Implementation |
| --- | --- | --- |
| Header height | 56 | 56 |
| Hero top / height | 56 / 348 | 56 / 348 |
| Service cards top / height | 506 / 148 | 506 / 148 |
| Project cards top / height | 762 / 176 | 762 / 176 |
| About photo top / height | 984 / 195 | 984 / 195 |
| CTA top / height | 1219 / 88 | 1219 / 88 |

The product and lab image regions use the supplied screenshot pixels. Branding was subsequently replaced at the user's request with their supplied logo files: header, footer, favicons, Apple touch icon, and the hero device display. The hero illustration, three-quarter perspective, shadows, and diagonal background outside the display remain the source pixels. The headline preserves the two required lines. The service and project descriptions preserve reference line breaks on desktop and wrap naturally on smaller screens.

## Captures

- `screenshots/desktop-comparison.jpg`: the original and rendered reference viewport side by side.
- `screenshots/homepage-1199.png`: complete desktop page, including the requested footer.
- `screenshots/homepage-reference-viewport.png`: the same 1199 × 1312 region as the original.
- `screenshots/homepage-1169.png`: the approximate reference width specified in the brief.
- `screenshots/homepage-375.png`, `homepage-768.png`, `homepage-1024.png`, `homepage-1440.png`, `homepage-1920.png`: additional responsive checks.

## Remaining differences and limits

- Inter approximates the reference letterforms; rasterized/generated source text cannot be reproduced character-for-character. Small glyph, weight, spacing, and paragraph-wrap differences remain.
- Lucide line icons have minor shape differences from the reference icons.
- Card widths and border geometry can differ by roughly 1–2 pixels because of fractional CSS grid placement and source-image irregularities.
- The CSS CTA gradient and diagonal shapes are close approximations. Subtle background texture and color variation in the original screenshot are not reproduced exactly.
- Branding intentionally differs from the original homepage screenshot, following the subsequently supplied logo files. Raster logo masters retain the higher resolution of those supplied files; cropped product/lab illustrations still have limited native resolution.
- The footer follows the reference content as requested. Mobile and tablet layouts are responsive adaptations; no separate original mobile reference was supplied.

This is a close visual recreation, not a claim of identical pixels.

## Functional verification

Final results: production build passed; strict TypeScript passed; ESLint passed without warnings; three validation unit tests passed; five browser tests passed; production and full dependency audits reported zero vulnerabilities. The browser suite covers seven homepage widths; no horizontal overflow, broken images, homepage console errors, or uncaught page errors; project and contact layouts at mobile/tablet widths; menu open/close and Escape handling; section navigation; project routes and 404; canonical metadata, sitemap and robots; client/server validation; and honest handling of unconfigured enquiry delivery.

External enquiry delivery is unconfigured and has not been tested against a real provider. No public deployment or live-domain change was performed.
