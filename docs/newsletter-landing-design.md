# Newsletter landing page — one editorial composition

## Status and boundaries

Implemented a presentation-only React page and an isolated local SSR design preview. **Not routed, published, connected to Brevo or activated.** No existing application, route, newsletter gate, provider configuration or source stylesheet was edited.

The layout uses the approved V15 cream `#fff9ee`, petrol `#086d61`, deep petrol `#075449`, mint `#e6f3e9`, coral `#f4a394` and local variable Manrope. Display copy is weight 300; body and controls are 400. The large actual PDF cover and page 7 occupy the dominant right-hand document stage on desktop. Mobile reads headline → supporting line → document → conditions → form. There is no benefits grid, invented evidence, urgency or testimonial.

Approved headline and supporting sentence are preserved verbatim as accessible text:

- Kauf noch keine Milchpumpe, bevor du das geprüft hast.
- Der ausfüllbare Kaufcheck hilft dir, Bauart, Größe und Lieferumfang vor dem Kauf zu sortieren.

## Files

- `src/newsletter-landing.tsx` — `NewsletterLandingPage({ formSlot?: ReactNode })`, page shell, real preview image, newsletter conditions and privacy link. With no slot it displays an inactive status and **no input, form or submit button**.
- `src/newsletter-landing.css` — scoped page styles, local font face and opt-in control classes; responsive single composition.
- `scripts/newsletter-landing.test.tsx` — SSR, caller slot, approved copy, legal conditions, real raster, disabled preview and isolated-server safety tests.
- `public/newsletter-assets/kaufcheck-preview.webp` — sole new public promotional asset, 1800 × 2040; actual rendered PDF pages 1 and 7, not drawn substitutes.
- `tools/newsletter-landing/generate_artwork.py` — reproducible PyMuPDF/Pillow renderer; preserves actual page content and records source/output SHA-256 hashes privately.
- `tools/newsletter-landing/render-preview.tsx` — React SSR generator for the standalone design preview and inactive-state preview. No browser JS, external dependency URLs, provider endpoint or submission handler.
- `tools/newsletter-landing/serve-preview.mjs` — loopback-only, exact-path allowlisted preview server; rejects POST and access to private guide/repository files. CSP disallows connections, form actions and scripts.
- `tools/newsletter-landing/verify_preview.py` — isolated headless native Edge/Playwright responsive verification and screenshots.
- `docs/newsletter-landing-design.md` — this handoff.

Ignored generated material lives only in `private/newsletter-landing/`: `index.html`, `inactive.html`, page-source rasters, source/output provenance JSON, responsive evidence JSON, full-page screenshots and control crops. The private eight-page fillable PDF remains at its original location and was not copied into public.

## Reproduce the preview

Run from `C:/Users/andy_/Documents/Kunden/Freie Arbeiten/Milchpumpe Vergleich/website`:

```sh
uv run --with pymupdf --with pillow python tools/newsletter-landing/generate_artwork.py
npx tsx tools/newsletter-landing/render-preview.tsx
node tools/newsletter-landing/serve-preview.mjs
```

Open **http://127.0.0.1:4318/**. Inactive production default: **http://127.0.0.1:4318/inactive.html**.

Optional alternative port: `NEWSLETTER_PREVIEW_PORT=4319 node tools/newsletter-landing/serve-preview.mjs` (the QA script uses the default 4318). If launching this server through the Windows Hermes terminal, use `background=true, pty=true`; the non-PTY background shell in this session exited with `stdin is not a tty`.

The generated HTML has inline CSS and absolute local `/fonts/...` and `/newsletter-assets/...` URLs, which work with the isolated server and existing Vite public-asset serving. Opening it directly via `file:` is not the supported preview path. Do not serve the whole private folder or repository with a generic web server. The isolated preview intentionally does not serve the site's magazine or privacy routes; those local links target the existing website routes for eventual integration.

## Safety and integration contract

The preview supplies only a disabled `fieldset`: one labelled email field, one unchecked consent checkbox and one prominent disabled CTA. The separate preview banner sits **outside** the production page composition and states that registration and delivery are unavailable. No request is made when using controls; there is no form, API call, fake success screen or fake delivery behavior.

For later integration, import both the component and its CSS:

```tsx
import { NewsletterLandingPage } from './newsletter-landing';
import './newsletter-landing.css';

// Supply the actual verified provider UI here only after the parent-owned checks.
<NewsletterLandingPage formSlot={verifiedProviderForm} />
```

`formSlot` is a layout seam, **not** a verification bypass or provider implementation. The caller remains responsible for sender verification, Double Opt-In, actual PDF delivery, unsubscribe and the published privacy notice. Existing readiness gates remain unchanged. The current historical flow uses provider-hosted navigation; no embedded provider behavior is asserted here. If the final provider UI uses different markup, it must be rechecked in this layout, and duplicate provider legal copy must be reconciled rather than silently removed.

Styles `.nl-email-label`, `.nl-email`, `.nl-consent`, `.nl-cta` and `.nl-controls` are optional presentation hooks, not assumptions about Brevo markup. Every real form needs its own labels, required consent, error and success behavior. This deliverable does not invent them. The visible conditions preserve the existing newsletter frequency, welcome-gift-after-confirmation condition, occasional product recommendations and unsubscribe statement.

## RED → GREEN evidence

Each behavior was added as a vertical test-first slice and run before its implementation:

1. Initial test failed: `NewsletterLandingPage must exist`; then approved copy + inactive default passed.
2. Slot test failed: expected one caller-supplied node, received zero; then supplied-slot rendering + legal conditions passed.
3. Document test failed: `Actual document artwork must be present`; then actual page raster, image and caption passed.
4. Preview test failed: `Reproducible SSR preview renderer must exist`; then SSR preview, local typography, disabled email/checkbox/CTA and no-network markup passed.
5. Server test failed: `Private preview needs an allowlisted isolated server`; then exact asset allowlist, POST rejection and private-file rejection passed.
6. Test portability regression failed when the server ignored explicitly supplied test HTML; then in-memory test HTML support passed. Tests do not depend on ignored generated HTML.

Commands:

```sh
npx tsx --test scripts/newsletter-landing.test.tsx
npm run lint
npx tsx --test scripts/*.test.ts scripts/*.test.tsx
uv run --with playwright python tools/newsletter-landing/verify_preview.py
```

Verified: **5/5 landing tests, 295/295 existing + new tests, TypeScript no-emit check**. The full regression run used existing production fixtures without a build/prerender invocation, avoiding changes to unrelated build output.

## Rendered QA

Isolated headless Microsoft Edge `155.0.4283.45`, fresh browser contexts, at **320 / 390 / 768 / 1440 px**. All passed:

- no page horizontal overflow;
- email and CTA at least 60 px high; full label, consent and CTA text inside their available bounds (320 px CTA wraps naturally to two lines);
- actual WebP decoded at native 1800 px width; local Manrope loaded;
- controls disabled, consent unchecked, no form/script/iframe;
- only local GET requests for HTML, the public WebP and the font;
- no page JavaScript errors;
- inactive default displays a status with zero inputs/buttons/forms.

Full-page screenshots and control crops were opened and visually inspected, including the 1440 px editorial composition, 390/768 px layouts, 320 px full page and 320 px control text. Evidence is `private/newsletter-landing/responsive-evidence.json`; screenshots are `preview-320.png`, `preview-390.png`, `preview-768.png`, `preview-1440.png`, `controls-<width>.png` and `inactive-390.png` in the same private directory.

An initial geometry check incorrectly treated Manrope's visible headline glyph line boxes as clipping when their line boxes extend above a tight line-height. The actual headline uses visible overflow and was visually intact. QA now checks horizontal text bounds everywhere and vertical bounds on the bounded consent/CTA controls instead of confusing font metrics with cropped content.

## Remaining limitations

No real Brevo form, sender, DOI email, PDF delivery, unsubscribe or privacy wording was verified here. No publication, route wiring, commit or deployment occurred. The actual form must be supplied and independently checked later; the disabled design fixture must never be used as a live form. Public preview image is promotional, not a replacement for reading or filling the private PDF.
