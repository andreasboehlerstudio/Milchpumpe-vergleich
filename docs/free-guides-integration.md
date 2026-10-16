# Free-guide route integration

## Published-route registry (local build only)

The owner approved full direct downloads independently of newsletter readiness. These six routes now belong to the synchronous SSR registry, sitemap and prerender build:

- `/gratis-guides/`
- `/gratis-guides/unterwegs-packplan/`
- `/gratis-guides/arbeitsplatz-uebergabeplan/`
- `/gratis-guides/reinigung-teileroutine/`
- `/gratis-guides/passform-beratungsvorbereitung/`
- `/gratis-guides/set-teilepass/`

Each detail route has its own curiosity-led H1, one explanatory lead, real document preview, dominant full-PDF download, concrete task and outcome, four inside sections, three usage steps, sources, relevant existing articles and explicit limits. The hub offers all five full PDFs as well as their detail pages. No email address, form, exclusive signup, guide-email delivery promise, artificial urgency, product recommendation or medical result is required. Personal worksheet notes are not collected by these pages.

The original `/kaufcheck/` and newsletter readiness gates are preserved. No newsletter settings, provider contract, privacy content or accounts were changed by this integration. At the parent's request, `main.tsx` additionally loads `newsletter-provider-form.css` immediately after `newsletter-landing.css`, only in the existing newsletter presentation branch; neither stylesheet is imported by an SSR TSX module.

## Implementation

- `src/free-guides-data.ts` owns the five distinct task definitions, primary-source context, related article links, stable asset paths and six SEO records. Research basis: the supplied 15.10.2026 brief; its old newsletter-only sequencing was superseded by the owner's direct-download approval.
- `src/free-guide-landing.tsx` owns V15 landing and hub markup, including its own header/main/footer. `src/free-guide-landing.css` is scoped to `.free-guides`, with local Manrope, cream/petrol/mint/coral, light display type, natural-height text and shrinkable layout tracks.
- `src/route-free-guides.tsx` is an independent lazy browser family. The Node `App` imports it synchronously. `RouteView` selects the standalone layout only for recognized free-guide routes; unknown slugs retain the normal legal/404 family and noindex SEO.
- `main.tsx` loads the free-guide CSS and metadata only for that family before hydrating the same complete SSR tree. Existing independent consent remains usable during delayed/rejected imports.
- Header and footer links expose the hub in the existing editorial site. `seo.ts` adds the six records unconditionally, while the newsletter route remains readiness-gated. The existing prerender/sitemap consumer needs no changes. Hub structured data includes five canonical guide URLs.

## Real asset contract

The separate PDF production worker supplied these files. This route integration did not create, resize or modify PDFs or images:

| Slug | Full download | Preview |
| --- | --- | --- |
| unterwegs-packplan | `/downloads/unterwegs-packplan.pdf` | `/free-guide-assets/unterwegs-packplan-preview.webp` |
| arbeitsplatz-uebergabeplan | `/downloads/arbeitsplatz-uebergabeplan.pdf` | `/free-guide-assets/arbeitsplatz-uebergabeplan-preview.webp` |
| reinigung-teileroutine | `/downloads/reinigung-teileroutine.pdf` | `/free-guide-assets/reinigung-teileroutine-preview.webp` |
| passform-beratungsvorbereitung | `/downloads/passform-beratungsvorbereitung.pdf` | `/free-guide-assets/passform-beratungsvorbereitung-preview.webp` |
| set-teilepass | `/downloads/set-teilepass.pdf` | `/free-guide-assets/set-teilepass-preview.webp` |

All five final WebPs were independently read from disk with Pillow and loaded in real Chromium: **1200 × 1080**. The actual `<img>` attributes reserve that size. No asset was altered to match an assertion. All five PDF files were independently opened with PyMuPDF: each has four pages; widget counts were respectively 64, 41, 40, 29 and 48 in the table's order. Those checks establish page/field presence, not cross-reader form compatibility or medical effectiveness.

The production asset test checks every required file in both `public` and `dist`, validates PDF/WebP signatures and reports precise missing paths. All ten local HTTP asset requests returned 200 with `application/pdf` or `image/webp` as appropriate. There are no missing-asset blockers at completion.

## TDD and automated verification

Actual RED → GREEN executions were performed for:

1. Recognized hub/detail routing, identical synchronous/lazy SSR trees and one main/H1 (initially classified as legal).
2. Real document targets, preview, distinct task content, usage/source/article sections and hub/navigation exposure (initially missing).
3. Independent indexable SEO records, hub collection and breadcrumbs (initially zero guide records).
4. Production deferred-family/style closure and prerender/sitemap output (initially no family or generated pages).
5. Browser bootstrap metadata with delayed/rejected route chunks and working consent (initially blank guide metadata).
6. Actual 1200 × 1080 preview sizing (initially incorrect 1800 × 2040 attributes).
7. Unknown guide slugs retaining the normal editorial 404 shell (initially incorrectly standalone).

Commands:

```sh
npm run lint
npm test
```

Final combined execution: **TypeScript lint passed; Vite production build and SSR prerender passed; 369 tests passed, 0 failed, 0 skipped**. The production registry contains 56 routes: all 50 original routes plus six free-guide routes; a simulated fully verified newsletter connection adds only the original Kaufcheck route, for 57. Existing article/product/source/affiliate/consent assertions remain in the full suite.

New tests:

- `scripts/free-guides.test.tsx`
- `scripts/free-guides-seo.test.ts`
- `scripts/free-guides-build.test.ts`
- `scripts/free-guides-bootstrap.test.tsx`

Regression updates are limited to the explicit new route count and standalone V15 family: `route-loading-contract.test.tsx`, `newsletter-integration.test.tsx`, `editorial-site-release.test.tsx`. The first two still assert all 50 original routes, readiness failure for every missing newsletter prerequisite and exact synchronous/lazy rendering. The editorial release test keeps its original assertions for existing pages and adds equivalent header/main/footer/consent/no-input assertions for all six standalone guide pages.

## Real Chromium verification

A local Vite preview was served at `http://127.0.0.1:4179/`; nothing was deployed. Browser Use rejected the loopback URL, so local Chrome DevTools was used instead.

- Desktop (1440) and native emulated mobile (320) screenshots inspected; hub screenshot inspected. No visible clipping or overlaps.
- All six routes checked in real same-origin Chromium iframe viewports at requested widths 320, 390, 768, 1024 and 1440, including 15px classic-scrollbar reduction. All 30 cases had `scrollWidth === clientWidth` and no out-of-bounds/scroll-clipped main headings, paragraphs, links or list items.
- Separate native mobile probe read back `innerWidth = clientWidth = scrollWidth = 320`.
- Existing homepage/header checked at widths 320, 390, 768, 900, 1024, 1200 and 1440. No document overflow or out-of-bounds visible nav controls after the new hub link.
- No console warnings/errors on any of the six guide routes.
- Actual homepage resource entries contained no `free-guides-data`, `route-free-guides` or `free-guide-landing` resources. A guide route fetched all three. The emitted manifest/static-import closure test independently confirms the guide presentation is absent from all unrelated rendering families.

## Files owned by this integration

Created:

- `src/free-guides-data.ts`
- `src/free-guide-landing.tsx`
- `src/free-guide-landing.css`
- `src/route-free-guides.tsx`
- `scripts/free-guides.test.tsx`
- `scripts/free-guides-seo.test.ts`
- `scripts/free-guides-build.test.ts`
- `scripts/free-guides-bootstrap.test.tsx`
- `docs/free-guides-integration.md`

Modified additively:

- `src/App.tsx`
- `src/route-family.ts`
- `src/route-loader.ts`
- `src/route-view.tsx`
- `src/main.tsx`
- `src/components.tsx`
- `src/seo.ts`
- `scripts/route-loading-contract.test.tsx`
- `scripts/newsletter-integration.test.tsx`
- `scripts/editorial-site-release.test.tsx`

No commits, Git operations, publishing, account changes, package changes, PDF/image writes, newsletter-provider changes or private parent-manifest changes were performed by this worker. Real original newsletter delivery verification and any future posting remain parent-owned and are not implied by these local route tests.
