# Asset provenance

The product and lab illustrations were extracted from the exact user-provided homepage reference, also available locally as `Voltnite Intelligent Technology Solutions (2).png`. A copy is retained in `docs/reference/homepage-reference.png` (1199 × 1312). Branding now uses the five separate logo images subsequently supplied by the user.

The header and footer use the supplied horizontal purple V and dark wordmark on white, without redrawing or substituting a font. The favicon and Apple touch icon use the supplied app icon. Additional horizontal dark-background, stacked, and wordmark-only variants are available locally for appropriate future placements; they are not added as extra page content.

| Asset in `public/brand/` | Supplied file suffix | Use |
| --- | --- | --- |
| `voltnite-logo-light.webp` | `01_21_00 AM-1.png` | Header and footer |
| `voltnite-logo-dark.webp` | `01_21_02 AM-2.png` | Dark-background brand variant and hero display reference |
| `voltnite-logo-stacked.webp` | `01_21_05 AM-4.png` | Stacked brand variant |
| `voltnite-wordmark.webp` | `01_21_08 AM-5.png` | Wordmark-only variant |
| `voltnite-app-icon.webp` | `01_21_10 AM-6.png` | Source for 32, 48, 180, and 512px PNG icons |

All five filenames begin `ChatGPT Image Oct 1, 2026, `. Only outer whitespace was cropped from these supplied logos; colors, lettering, and proportions are preserved. WebP brand masters use lossless encoding. The header and footer serve responsive versions through `next/image`.

The built-in image editing tool updated the hero device display using the supplied dark-background horizontal logo. Only the display region from the edited output was composited into the original hero; the board, connectors, frame, shadows, and background outside the display remain the original pixels. The final asset is `public/images/voltnite-controller-hero-branded.webp` (641 × 348), used by both the homepage and Open Graph metadata. The editing prompt is retained in [brand-update-prompt.txt](brand-update-prompt.txt).

The source illustrations are not independently verified photographs of actual Voltnite products or premises. Alt text and project detail captions identify them as reference illustrations.

Coordinates are `(left, top, right, bottom)` in the original image:

| Asset in `public/` | Source crop | Native size |
| --- | --- | --- |
| Original hero before display rebranding | 558, 56, 1199, 404 | 641 × 348 |
| `images/vendis-controller.webp` | 55, 777, 211, 923 | 156 × 146 |
| `images/vendops-dashboard.webp` | 435, 777, 591, 923 | 156 × 146 |
| `images/custom-iot-pcb.webp` | 812, 777, 967, 923 | 155 × 146 |
| `images/voltnite-engineering-lab.webp` | 61, 984, 526, 1179 | 465 × 195 |

These crops use lossless WebP. `next/image` serves responsive optimized image variants at quality 95. The hero retains its original background and diagonal geometry.

The locally bundled Inter variable font comes from `@fontsource-variable/inter` 5.3.0. Its SIL Open Font License is included at `src/app/fonts/OFL.txt`. `next/font/local` serves it without external font requests.

Original full-resolution product/lab imagery and vector branding would improve larger and high-density views. Keep filenames and aspect ratios consistent when replacing assets.
