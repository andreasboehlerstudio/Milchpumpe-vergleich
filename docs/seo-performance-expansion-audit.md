# Read-only SEO and mobile performance audit

Audit: 15 October 2026. Target: https://milchpumpe-vergleich.de/. Scope: deployed site, current source and existing `dist`; **no build, application edit, publication, git mutation or account/browser-profile access**. Only this report and `private/seo-expansion/` were written. Other agents' in-progress source changes are not deployment evidence. Source hashes/line counts are in `private/seo-expansion/source-snapshot.json`.

## Outcome

The existing 50-route site has no duplicate title/description, missing canonical, noindex, H1-count, orphan-route or internal-fragment problem in this crawl. There is no technical justification here for publishing more articles or merging existing articles speculatively.

The meaningful performance issues are a delayed font request, two substantial fixed-size photo deliveries, a lazily loaded actual article LCP, and the same full application/data bundle on every sampled route. Three foundation articles also inherit schema dates without a visible research date. The five bounded implementation recommendations below address those findings without redesigning the approved V15 homepage.

**These are laboratory observations, not field Core Web Vitals, Lighthouse scores, indexing guarantees, ranking evidence or forecast speed gains.** No Search Console/account data was accessed.

## 1. Actual production mobile baseline

### Method and limits

- Fresh headless Edge/Chromium process, version `155.0.4283.45`, using Playwright installed through an isolated `uv run --with playwright` environment. Not an authenticated/persistent profile or an existing browser tab.
- Three fresh, cache-disabled browser contexts for each of four production URLs: **12 completed runs**, serially, 390 × 844 CSS px, DPR 3, Android-style user agent, mobile/touch emulation.
- CDP configuration requested 4× CPU slowdown, 150 ms latency, 1.6 Mbps download and 750 kbps upload. These are configured lab conditions, not a claim of equivalent physical phone/network hardware. Browser-process connections/DNS and CDN state can be reused between fresh contexts; recorded navigation response-start values were sometimes below the configured network latency. Do not use the TTFB column as a cold-origin/CDN diagnosis.
- Observed until eight seconds after `load`, with no scrolling, clicking, navigation interaction or custom analytics events. V8 precise coverage was enabled; instrumentation and the shared host can perturb timings. Coverage ranges overlap and are **not** reported as an unused-JS percentage.
- Initial local storage consent was `declined`, and the GA disable flag was set before application execution. Analytics endpoints were additionally deny-routed. **All 12 runs had declined consent, no GA runtime, zero attempted analytics requests, HTTP 200, no page errors, a real 390 px document viewport and no document-level horizontal overflow.** Endpoint denials were a fail-safe, not evidence that analytics tried to load.
- Reported CLS is the sum of observed layout shifts without recent input in this bounded load window, not session-window field CLS. No INP measurement was made. “Long-task excess” below is sum(max(duration − 50 ms, 0)) during the observed window, **not Lighthouse TBT**.
- Resource transfer totals exclude navigation HTML. Image totals include preload-initiated requests; filtering only `initiatorType=img` would miss the magazine photo because React emitted an image preload.

### Results

All times in milliseconds. Medians of the three runs unless a range is stated. Bytes are browser Resource Timing `transferSize` totals, not uncompressed bundle size.

| Production path | TTFB median* | FCP median | LCP median | LCP runs | Observed CLS sum median | Long-task excess median | Resource transfer bytes |
| --- | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| `/` | 115.8 | 2360 | 4136 | 4176 / 4104 / 4136 | 0.000197 | 175 | 721829 |
| `/ratgeber/` | 55.5 | 2444 | 4212 | 3756 / 4212 / 4224 | 0.054625 | 184 | 649072 |
| `/vergleich/` | 63.0 | 1772 | 1772 | 1712 / 2120 / 1772 | 0 | 437 | 334846 |
| `/ratgeber/milchpumpe-reinigen/` | 151.1 | 1768 | 2040 | 2008 / 2268 / 2040 | 0 | 260 | 339625 |

\* See network/connection limitation above. The magazine shift sum was 0.054625 / 0 / 0.054625; the article was 0.000443 / 0 / 0. Do not turn these samples into field pass/fail claims.

Actual final LCP candidates in all three runs per route:

- Home: `/editorial-photos/nursery.jpg`, `fetchpriority=high`, no responsive candidates. First-run request started at 256 ms and completed at 4141 ms; paint at 4176 ms. Rendered photo box was 302 × 250 CSS px at DPR 3; original was 1600 × 1067, **379726 encoded image bytes**. Dimensions alone do not establish the optimal derivative: account for DPR and `object-fit` cropping.
- Magazine: `/editorial-photos/pump-parts.jpg`, eager/high, already preloaded by React SSR. First-run request started at 276 ms and completed at 3714 ms; paint at 3756 ms. Rendered 292.4 × 330 CSS px, starting at y=764; original 1350 × 1800, **313926 encoded image bytes**. The top of this photo enters the mobile viewport; making it lazy solely because most of the photo is below the fold would be unjustified.
- Comparison: the introductory paragraph describing the six-model selection, not a photo. Do not add a hero-image preload to this route.
- Cleaning article: `/editorial-v2/reinigung.svg`, currently **lazy**, rendered 348 × 261 CSS px starting at y=734.5. This image enters the viewport and was the final LCP candidate; it should not inherit the same lazy behavior as offscreen article illustrations.

### JavaScript, CSS and fonts

Every sampled route downloaded the same five JavaScript assets: **1082186 decoded bytes**, **281097 transferred bytes** in each run. The three data/content chunks alone contain **591888 decoded bytes**. Named chunks are not route-level lazy loading when every page preloads them.

| Existing production asset | Decoded bytes | Transfer bytes, first home run |
| --- | ---: | ---: |
| `index-DZhrcjEk.js` | 291029 | 79026 |
| `vendor-CbcIf0gj.js` | 199269 | 62901 |
| `editorial-content-lRI0oadC.js` | 265109 | 79123 |
| `wearable-data-CxRjuDwj.js` | 233046 | 36704 |
| `catalogue-data-C9RzIWuh.js` | 93733 | 23343 |
| `index-CmDxblsX.css` | 151504 | 27468 |

The CSS is a single render-blocking stylesheet, confirmed by Resource Timing `renderBlockingStatus=blocking`. In home run 1 it completed at 1448 ms. JavaScript modules were `non-blocking` in that API; this does **not** mean their network competition, parsing or hydration are free. All six deployed assets were fetched separately and byte-compared with existing `dist`: all matched. Existing output is therefore useful evidence; no rebuild was needed. Responses used gzip and `cache-control: max-age=600`; do not prescribe unsupported GitHub Pages custom caching headers as a source-only fix.

Only the Latin Manrope font downloaded in the samples: **24836 encoded bytes**. There was no font preload. In the first runs the font request began at 1494 ms on home, 1469 ms on magazine, 1324 ms on comparison and 1342 ms on the article—after stylesheet discovery. On magazine run 1 the font completed at 2623 ms and the recorded shift followed at 2866 ms, affecting lead/actions/photo. This is consistent with font-swap layout movement, not proof of exclusive causation.

Both WOFF2 files were inspected with fontTools: actual `wght` axis **200–800**. `src/visual-editorial.css:1–15` declares 300–800; `src/methodology-v4.css:1–15` declares a separate family using the same URLs at 300–600; both use `font-display: swap`. Ordinary 300/400/500/600 weights are supported. No duplicate font transfer or external Google Fonts request occurred in these samples. Do not replace the variable font with multiple static weight files.

## 2. Five implementation recommendations

These are recommendations only. No fix or improvement has been claimed as implemented or measured.

### A. Preload the one actually used Latin variable font — small, first

**Location:** `index.html:8–10`, with declarations at `src/visual-editorial.css:9–15`.

Insert one early same-origin preload:

```html
<link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin />
```

Keep `font-display: swap`; do not preload the Latin-ext subset or separate weight variants without evidence of first-viewport use. Do not preload both family aliases of the same URL. This directly addresses the measured late discovery without a typography redesign.

**Tests:** inspect all built heads for exactly one matching font preload, correct MIME/CORS and an existing asset. Browser network readback must show a single font fetch, no duplicate/unconsumed-preload warning and earlier discovery under the same lab conditions. Rerun the four URLs, including magazine layout-shift sources. No numeric speed-gain promise is warranted before that comparison.

### B. Stop lazily requesting the foundation article's actual first-viewport illustration — small

**Locations:** `src/pages.tsx:229`; `src/editorial-images.tsx:5–7` already supports the required `eager` prop.

For the foundation article hero, use the existing component contract:

```tsx
<EditorialImage slug={slug} title={article.title} eager />
```

Limit the change to the article's main `figure.article-visual`, not `ArticleInlineVisual` figures, related cards or magazine thumbnails. In this sampled article the image is visible in the first viewport and becomes LCP. The 35-article library cards must remain lazy. The buying/milk templates at `src/article.tsx:31` and `src/milk-articles.tsx:48` share the default lazy component; inspect their actual first viewport before broadening the rule rather than blindly boosting every article image.

**Tests:** SSR assertions for a single eager/high-priority article hero and lazy inline/library images; ensure React's generated image preload agrees with the real `src`/`srcset`, and verify no hydration errors. Repeat mobile measurement for the sampled article. Add a test proving `EditorialImage` is still lazy by default.

### C. Add verified responsive delivery for the two existing hero photographs — bounded media task

**Locations:** home image is inside `src/home-editorial-template.json:4` (consumed unchanged by `src/home-editorial.tsx:9`); magazine photo is `src/editorial.tsx:50`; methodology reuses pump-parts at `src/methodology-v4.tsx:30`.

Both measured LCP photos already have explicit dimensions and high priority; the defect is fixed-size delivery, not missing priority. Generate properly sized/compressed derivatives of the **same already licensed images**, retaining the original fallback, alt text, credit, crop and V15 geometry. Neither `public/editorial-photos/nursery.jpg` nor `pump-parts.jpg` currently has a sibling responsive derivative. Do not reference guessed filenames or substitute a different scene.

Use a verified derivative manifest to supply `srcset`/`sizes` (or `<picture>` with supported-format sources). Set sizes from the real mobile and desktop slot widths and retain intrinsic aspect-ratio dimensions. Because these slots crop, do not assume 302 px display width means a 302 px file is sufficient at DPR 3. Keep the magazine photo eager/high; React already emits its preload. If responsive candidates are introduced, verify the emitted preload uses the same candidate selection rather than fetching an extra full-size fallback.

Rights evidence: `docs/editorial-v4-photo-rights.json` and `docs/editorial-pump-parts-photo-rights.json`; their historical publication booleans are not the current deployment truth. Preserve attribution and existing non-product-photo role.

**Tests:** manifest entries have actual decoded dimensions and byte sizes; every emitted candidate exists; no EXIF/GPS; exact original credits remain; mobile `currentSrc` is an emitted candidate; no double-fetch; desktop DPR/quality and V15 layout remain acceptable; main landmark content and interactive selectors remain unchanged. Re-measure instead of inventing an expected byte/speed saving.

### D. Align article research dates with the actual article record and visible byline — small SEO hygiene

**Locations:** `src/data.ts:224–241`, `src/seo.ts:111–118,203,260–261`, `src/pages.tsx:229`, `scripts/prerender.tsx:22,55`; future-proof the hardcoded milk byline at `src/milk-articles.tsx:48`.

The three foundation records (`richtige-flanschgroesse`, `milchpumpe-reinigen`, `tragbar-oder-elektrisch`) lack explicit dates and visible `<time>` elements. Their Article dates, article social metadata and sitemap dates inherit global `2026-07-16`. This audit cannot establish whether that is the true original publication/research date. Do not replace it with today's date to manufacture freshness.

Give each foundation article a verified record date, render that same record in its byline, and derive Article/OG/sitemap dates consistently. If original publication is unknown, do not invent it; distinguish known research/update date from publication and omit unsupported fields where appropriate. Render milk byline text from `guide.updated` as the buying template already does at `src/article.tsx:25,29`, rather than hardcoding `14. Oktober 2026`. The 32 other article pages currently expose a matching update datetime; the concern is real coverage and future drift, not a claim that all dates are wrong.

**Tests:** enumerate all 35 registered guide routes, compare visible `time[datetime]` with each Article's `dateModified` and article-modified meta; verify dates do not change simply because a build runs. For each schema citation, preserve a matching visible source link. Extend `scripts/article-schema.test.ts`/route-wide schema tests rather than checking only one buying article.

### E. Bound initial JavaScript to the selected route before adding more client features — separate performance change

**Locations:** `src/main.tsx:3,18–25`; `src/App.tsx:1–6`; `src/pages.tsx:4–13`; `src/data.ts:1–2,224–241`; `src/seo.ts:1–7`; `vite.config.ts:11–16`.

The current static import graph pulls all page families, full editorial bodies, catalogue data and wearable data into the initial application. Even the homepage's approved prerendered HTML hydrates after fetching all five JS assets. `manualChunks` groups modules but does not defer them. `data.ts` imports full guide bodies just to derive summaries; `pages.tsx` also statically imports article, catalogue, methodology and market components. A small dynamic import alone cannot remove a payload if shared summary/layout modules still import it.

Start with one explicit acceptance target: **the homepage must not initially request `editorial-content-*` or catalogue body data unrelated to its interactions**. Separate lightweight guide summaries and pure path normalization from full bodies/schema builders, and load the selected route's implementation before hydration. Keep all static SSR text, links, defaults and current schema in the prerendered HTML. Inspect shared `components.tsx:4` → `data.ts` dependencies while doing this. Do not merely rename chunks or remove modulepreload tags for modules still statically imported; do not introduce a mismatched Suspense shell over already-rendered markup.

**Tests:** production request assertions for home and one article prove unrelated chunks are not requested; every route's main-landmark SSR remains content-equivalent; hydrated page has no mismatch/page errors; menu, filter, two-model compare, consent and article aids still work. Run existing route/affiliate/schema assertions and the full build/test pipeline only when the main owner can serialize `dist` writes. Rerun this lab after implementation. This has a larger dependency surface than A–D; defer it rather than rushing an unverified hydration rewrite into the SEO/newsletter change.

## 3. SEO and schema checks: passes, caveats and small follow-ups

### Metadata and crawlable structure

Direct HTTP HTML crawl of all **50 sitemap routes**, including **35 articles**:

- All returned HTTP 200, one H1, one exact self-canonical and indexable robots meta. All titles and meta descriptions were unique.
- Every route had at least one incoming link from another crawled page. All internal link fragments whose destination is in the sitemap resolved. These are technical checks, not indexing status.
- All emitted `img` elements in this production crawl had explicit width and height. The optional dimensionless branch at `src/catalogue.tsx:34` is not emitted by current production data; it is not a current layout-shift finding.
- Existing SVG editorial illustrations need no raster `srcset`; their scalability is not the photo-delivery problem. Licensed inline-photo media already uses responsive derivatives in `src/article-media.tsx:75`; preserve that.
- Social image records used PNG URLs, `image/png` and 1200 × 630 declarations. Every unique referenced social PNG exists in local public assets at 1200 × 630. The current prerenderer's fixed image MIME/dimensions are consistent with these records; they would need a manifest if future social images change format or dimensions. This was not a social-crawler cache test.

`/`, `/vergleich/` and `/tragbare-milchpumpen/` all cover selection but have different functions: entry/shortlist, six-model detailed comparison, and 40-model market directory. Preserve separate canonicals and useful cross-links. A narrow metadata improvement is to make the existing six-model scope explicit in the comparison title, e.g. **`6 Milchpumpen im Vergleich: Bauarten und Funktionen`**, at `src/seo.ts:34`. It already appears in the description/H1. This is intent clarity, not evidence of cannibalization or a ranking fix. Do not canonicalize these distinct pages to each other.

### Structured-data visible parity

Raw graph extraction and a separate visible-body parity probe are saved in `schema-parity.json`.

- 35 Article headlines match visible article headings; declared citation URLs have visible source links.
- All six Product summaries/fact values checked are visible. No `reviewRating`, `aggregateRating` or `offers` keys were emitted anywhere in the 50 route graphs.
- ItemLists contain six comparison models, 40 market entries and 61 catalogue entries. Names are visible, and checked market fragment targets resolve. Catalogue entries are not 61 dedicated product pages and should not be described as such.
- The three foundation date gaps are covered by recommendation D.
- Diagnostic exact-string mismatches are **not automatically schema violations**: meta-like Article descriptions paraphrase the body, shortened visible product names refer to the same entities, and schema breadcrumbs use route headings rather than the visible short “Ratgeber”/“Vergleich” labels. For example, the parent crumb uses `Sechs Milchpumpen im direkten Vergleich` while the UI says `Vergleich`. Matching actual breadcrumb labels is a sensible polish at `src/seo.ts:143–160`, not a reason to invent more structured data or promise rich results.
- `Article.about` currently follows original guide product IDs (`src/seo.ts:250–258`) rather than the later single-commercial-focus overlay. Mentioning multiple products is valid if the article still discusses them; one affiliate target does not require one `about` entity. Review identities semantically before narrowing these arrays. No removal is justified by an exact-name-string test alone.

### Internal links

Three guides have exactly one distinct incoming page in the 50-route corpus: only the magazine hub links to them:

1. `/ratgeber/tragbar-oder-elektrisch/`
2. `/ratgeber/stilleinlagen-einweg-mehrweg-unterwegs-organisieren/`
3. `/ratgeber/milchpumpe-mikrowellenbeutel-desinfizieren/`

This is not orphaning. A narrow follow-up is one helpful contextual link from an existing related article: architecture selection → pump types; unterwegs packing → Stilleinlagen; cleaning process → the manufacturer-specific microwave-bag restrictions. `src/contextual-links.ts:9–13` only relates buying guides with shared product IDs; foundation articles are not part of that relationship pool. `src/milk-articles.tsx:40–47` supports explicit related slugs, which is preferable to stuffing footer-wide links. Test exact destinations, anchor wording and no duplicate/self links. Do not add new URLs or repeat all 35 links everywhere to inflate incoming counts.

## 4. Intent review of all 35 guide titles

Current exact production titles, with route slugs shortened below (`/ratgeber/{slug}/`). These are editorial intent assignments, **not query-volume, competition or search-performance findings**. Full titles/H1/description and distinct incoming-page counts are in `html-audit-summary.json` under `guides`.

| # | Slug | Production title | Owned decision / overlap boundary |
| ---: | --- | --- | --- |
| 1 | `richtige-flanschgroesse` | Milchpumpe: Flanschgröße und passende Einsätze prüfen | General fit; Philips insert page owns exact part-code compatibility. |
| 2 | `milchpumpe-reinigen` | Milchpumpe reinigen: Hygiene, Trocknen & Modellanleitung | General hygiene hub; handwashing, Medela cups and microwave bags own narrower procedures. |
| 3 | `tragbar-oder-elektrisch` | Tragbare, elektrische oder manuelle Milchpumpe? | Pump-type taxonomy; buying checklist owns shopping steps. “Tragbar” and “elektrisch” are not exclusive categories. |
| 4 | `muttermilchbeutel-oder-mehrwegbecher` | Muttermilchbeutel oder Becher? Einweg & Mehrweg | Storage-container format; not fridge placement or label workflow. |
| 5 | `muttermilch-beschriften-portionen-gefrierfach` | Muttermilch beschriften: Portionen im Gefrierfach ordnen | Freezer labels/portion ordering; not general storage-time advice. |
| 6 | `muttermilch-arbeitsplatz-transport-kuehlkette` | Muttermilch transportieren: Kühlkette vom Arbeitsplatz | Workplace cold-chain journey; Kita owns recipient handover. |
| 7 | `muttermilch-kuehlschrankbox-getrennt-aufbewahren` | Muttermilch im Kühlschrank: Box und Behälter organisieren | Fridge organization; distinguish from choosing bags versus cups. |
| 8 | `muttermilch-erwaermen-ohne-flaschenwaermer` | Muttermilch erwärmen: Wasserbad oder Flaschenwärmer? | Warming method/no-device option; not feeding-bottle choice. |
| 9 | `reserve-pumpset-reinigen-trocknen-organisieren` | Reserve-Pumpset: Kompatibilität, Reinigung und Trocknen | Managing a clean spare set; general cleaning owns the hygiene baseline. |
| 10 | `abgepumpte-muttermilch-flasche-sauger-auswaehlen` | Flasche für Muttermilch: Sauger und Systeme auswählen | Feeding system/flow; Medela capacity page owns storage-bottle pack sizes. |
| 11 | `stilleinlagen-einweg-mehrweg-unterwegs-organisieren` | Stilleinlagen unterwegs: Einweg oder waschbar? | Pad replacement/wash routine; not pump selection for travel. |
| 12 | `milchpumpe-reinigen-ohne-spuelmaschine` | Milchpumpe reinigen ohne Spülmaschine: Handspül-Ablauf | Manual washing procedure; keep distinct from general hygiene and disinfection. |
| 13 | `muttermilch-kita-mitgeben` | Muttermilch Kita mitgeben: Behälter, Etikett & Übergabe | Daycare acceptance/handover; overlap with workplace transport is contextual, not identical. |
| 14 | `medela-muttermilchflaschen-150-250-ml` | Medela Muttermilchflaschen: 150 oder 250 ml? | Brand-specific capacity/pack decision; not broad bottle/sauger choice. |
| 15 | `milchpumpe-mikrowellenbeutel-desinfizieren` | Milchpumpe mit Mikrowellenbeutel desinfizieren: Quick Clean | Specific compatible-parts disinfection; never substitute for cleaning. |
| 16 | `momcozy-m9-oder-s12-pro` | Momcozy M9 vs. S12 Pro: Unterschiede & Kaufhilfe | Cross-model purchase; M9 app and S12 generation pages own narrower questions. |
| 17 | `medela-freestyle-oder-philips-avent` | Medela Freestyle vs. Philips Avent SCF547/11 | Two external-motor systems; avoid expanding to a second market directory. |
| 18 | `hands-free-milchpumpe-kaufen` | Hands-free-Milchpumpe kaufen: Checkliste & Modelle | Shopping checklist; highest broad overlap with market/home/type guide, but distinct decision artifact. |
| 19 | `milchpumpe-fuer-unterwegs` | Milchpumpe für unterwegs: Bauart, Akku & Transport | Pumping-place/equipment readiness; milk-transport article owns cold chain. |
| 20 | `milchpumpe-einzel-oder-doppelpumpe` | Einzel- oder Doppelmilchpumpe? Sets richtig vergleichen | Generic single/double decision; M9/Elvie pages own exact complete-unit inventory. |
| 21 | `milchpumpe-zubehoer-checkliste` | Milchpumpen-Zubehör: Was passt zu welchem Modell? | Missing-accessory inventory; replacement-parts page owns actual valve/membrane identity. |
| 22 | `momcozy-m9-ohne-app` | Momcozy M9 ohne App: Welche Funktionen bleiben? | M9 offline controls; app/privacy page owns data handling. |
| 23 | `momcozy-m9-einzel-oder-doppelset` | Momcozy M9: Einzel- oder Doppelset? Lieferumfang prüfen | Exact M9 unit count/order variant; not generic pump architecture. |
| 24 | `momcozy-s12-pro-quick-unterschiede` | S12 Pro vs. S12 Pro Quick: Generationen unterscheiden | Generation/parts identity; not another M9 versus S12 comparison. |
| 25 | `medela-freestyle-hands-free-drei-teile-reinigung` | Medela Freestyle Hands-free reinigen: Teile & Ablauf | Model-specific cup components; general handwashing page owns generic procedure. |
| 26 | `medela-freestyle-hands-free-schlaeuche-motor` | Medela Freestyle Hands-free: Motor, Cups & Schläuche | Exact external-motor architecture; no duplicate cross-brand buying guide. |
| 27 | `philips-avent-scf547-11-oder-scd553-11` | Philips SCF547/11 vs. SCD553/11: Pumpe oder Set? | Pump versus starter bundle; insert page owns accessory compatibility. |
| 28 | `philips-avent-scf547-einsaetze-15-17-mm` | Philips Avent SCF547: 15-/17-mm-Einsätze prüfen | Exact SCF554/11 insert/system fit; general flange page owns personal fit. |
| 29 | `elvie-pump-single-oder-double` | Elvie Pump Single vs. Double: Welche Ausführung? | Elvie Hub/kit unit count; generic single/double page supplies baseline. |
| 30 | `elvie-pump-oder-elvie-stride` | Elvie Pump vs. Elvie Stride: Bauart und Unterschiede | Elvie architectures/generations; do not collapse into single/double discussion. |
| 31 | `haakaa-generation-3-oder-generation-2` | Haakaa Gen 2 vs. Gen 3: Aufbau und Zubehör | Generation/modular construction; size page owns Gen 3 capacity/kit. |
| 32 | `haakaa-generation-3-groessen` | Haakaa Generation 3: Größen & Lieferumfang prüfen | Gen 3 size and kit; not another Gen 2/Gen 3 page. |
| 33 | `milchpumpe-app-datenschutz` | Milchpumpen mit App: M9, Elvie & Datenschutz | Permissions/data/deletion across apps; M9 offline page owns button-accessible functionality. |
| 34 | `milchpumpe-ersatzteile-ventile-membranen` | Milchpumpen-Ersatzteile: Ventile & Membranen zuordnen | Exact replaceable component identity; accessory checklist owns purchase inventory. |
| 35 | `milchpumpe-lautstaerke-herstellerangaben` | Leise Milchpumpe? dB-Angaben richtig vergleichen | Interpretation of incomparable manufacturer measurements; no “quietest” ranking implied. |

**Conclusion:** hygiene and broad hands-free selection have the most adjacency, but the titles and existing decision artifacts support distinct tasks. Preserve the general-to-specific relationship with contextual links and accurate scope. No redirect, canonical consolidation, deletion or new article is justified from titles alone. Any later consolidation needs actual per-query/page search evidence and a content-level review; this audit intentionally does not invent that evidence.

## 5. Evidence and reproduction

All evidence paths are relative to this website repository. `private/` is intentionally ignored and must not be published or made an input to portable CI.

- `private/seo-expansion/lab-settings.json` — timestamp, browser and configured lab conditions.
- `private/seo-expansion/mobile-lab-raw.json` — all 12 runs, navigation/paint/LCP/shift/long-task records, resource timings, image geometry/candidates, network response headers, consent state and errors.
- `private/seo-expansion/mobile-lab-summary.json` — corrected per-run and median summary, including preload-initiated images.
- `private/seo-expansion/lab-verification.json` — all completion/privacy/viewport checks and deployed-asset byte comparisons.
- `private/seo-expansion/report-verification.json` — executed assertions: 50 crawled routes, 35 exact guide-title/slug table rows, 12 mobile runs, privacy/viewport checks and screenshot/evidence presence.
- `private/seo-expansion/html-audit-raw.json`, `html-audit-summary.json`, `live-sitemap.xml` — 50-route metadata, graph, link and image inventory; full guide title registry.
- `private/seo-expansion/schema-parity.json` — separate schema visible-body diagnostics, not an assertion that literal paraphrase/short-name differences are violations.
- `private/seo-expansion/source-snapshot.json` — inspected source hashes/line counts; source can change concurrently after the snapshot.
- `private/seo-expansion/mobile-home.png`, `mobile-ratgeber.png`, `mobile-vergleich.png`, `mobile-ratgeber-milchpumpe-reinigen.png` — first-run mobile screenshots. Home, magazine and article were visually inspected; screenshot is layout evidence, not performance scoring.
- Four saved `html-*.html` response snapshots and the audit runners in the same private directory.

Reproduce without a build or repo dependency installation, from the website working directory:

```bash
node private/seo-expansion/html-audit.mjs
uv run --with playwright python private/seo-expansion/live-mobile-audit.py
node private/seo-expansion/summarize.mjs
node private/seo-expansion/schema-parity.mjs
```

These overwrite only their own private evidence files. Edge must be installed for `channel='msedge'`; otherwise select an isolated installed Playwright Chromium, never a persistent authenticated profile. The only tooling issue encountered was Happy DOM's non-iterable `document.images`; the collector was corrected to `querySelectorAll('img')` and the full 50-route run succeeded. The initial image transfer summary omitted preloaded images; it was corrected from the untouched raw timings and the reproducible runner was fixed as well.

**Verification boundary:** no application tests or build were run, because this was read-only and `npm test` itself runs the build. The report does not claim the parent's concurrent implementation passes. Parent should apply selected fixes with tests in its owned files, serialize the build, then repeat the production-independent local tests and this same deployed lab only after an authorized release.
