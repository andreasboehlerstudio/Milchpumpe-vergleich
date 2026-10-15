# Route-aware JavaScript loading

## Ownership and scope

Implemented on `perf/route-loading-reading-flow`, with exclusive ownership of builds until handoff. Parent-owned magazine/search/comparison-sharing files were not edited. No CSS, approved home source/template/runtime, research registries, product facts, affiliate destinations, metadata, dates or newsletter activation were changed by this implementation. No commits, pushes or publication were performed.

## Architecture

- `App.tsx` remains a **synchronous Node/prerender entry** for every route. It statically imports the same route-family components used by the browser. `pages.tsx` remains a compatible synchronous export surface; its original function bodies were mechanically separated into route-family modules.
- `main.tsx` does **not** import `App`, `pages` or `seo`. The lightweight `route-family.ts` selects exactly one dynamic importer in `route-loader.ts`: home, magazine (hub/comparison), catalogue, product details, articles, wearable market, methodology or legal/404.
- The browser awaits the selected component **before hydrating the existing root** with the shared synchronous `RouteView` and exact existing `Layout`. There is no lazy/Suspense SSR fallback, loading screen, empty root, replacement navigation or blanket dynamic import of the old pages barrel. An empty root still supports client rendering for Vite development.
- A temporary React consent root is appended **outside** the intact prerender root while the page import is pending. It runs the unchanged consent component, including focus trapping, inert background, analytics gating and revocation. A temporary listener connects the existing SSR footer's Cookie-Einstellungen button. On success, this root/listener are removed before full-tree hydration. On import failure they remain available; the original SSR page stays readable and its native links remain navigable. Page-specific React interactions naturally remain unavailable if their JavaScript cannot load. A console error reports the import failure; no public production disclaimer was added.
- No location rewrite is performed. Query strings and fragments survive bootstrap unchanged. Parent-owned comparison URL state is restored by its existing post-hydration effect.
- `route-path.ts` contains only the unchanged pure normalizer; `seo.ts` keeps a compatibility reexport. No SEO metadata/date/content change was made.
- `product-data.ts` contains the exact former constants, six detailed product records and URL helpers from `data.ts`. Shared components no longer pull an article registry just to obtain contact information or product link helpers.
- `guide-summary-data.json` contains only the existing guide-link metadata and product-link IDs. `data.ts` exports these lightweight projections instead of evaluating every article body. Product details select related links with the same filter/order/limit. Tests check the full projections against the authoritative original guide and milk registries, including ordering, dates, symbols and per-product selection.
- Vite retains the original vendor and catalogue-JSON cache boundaries without turning all families into eager imports. It emits the standard manifest plus a root-relative `.vite/route-loading.json` module-provenance report for dependency tests. No warning threshold was raised.

The article family still shares its article bodies/catalogue examples; the magazine family still shares its hub/comparison dependencies. This is rendering-family splitting, not one generated chunk per article. The approved interactive home deliberately keeps its own template and comparison snapshot.

## RED → GREEN evidence

All raw logs/readbacks are ignored under `private/route-loading/` and are not required by public tests.

1. `red-build.txt`: the first built-ESM test failed against the untouched baseline because the browser entry had no deferred page families. The real dynamic route imports and shared hydration tree made it green.
2. `red-bootstrap.txt`: the failed-page test failed specifically because consent was unavailable. The independent consent root made rejection/reopening work without replacing SSR. A later successful delayed-import characterization test confirms original main/H1 nodes are retained and consent/query/hash survive handoff.
3. `red-nonarticle.txt`: a subsequent built-closure test failed because catalogue fetched `src/guides.ts` only through the shared data barrel. Lightweight metadata projections and product-related-link separation made catalogue, market, methodology, product and legal closures exclude all full guide bodies.

Public regression tests:

- `scripts/route-loading-build.test.ts`: parses actual emitted JavaScript with the TypeScript AST, follows static imports plus HTML module preloads and the selected dynamic family, and checks Rollup module provenance. Home excludes App/SEO/pages, article registries, catalogue and wearable data, and magazine UI. Non-article families exclude article bodies. Home must remain below half the **measured** old 1,092,058-byte dependency closure; no ignored fixture is read.
- `scripts/route-loading-bootstrap.test.tsx`: executes the actual main/components/React DOM against Happy DOM, with only the asynchronous importer controlled to simulate rejection/delay. Verifies complete SSR preservation, functioning rejection and footer reopening, delayed hydration of the same main/H1 nodes, removal of the temporary root, live menu events, and unchanged query/hash.
- `scripts/route-loading-contract.test.tsx`: exact lightweight-projection parity; normalizer compatibility; exact synchronous-vs-demand-loaded rendering equality, one main/H1 and no Suspense fallback for all 50 registry routes plus unknown product/article/404 paths.
- Existing meaningful tests, including vendor/catalogue cache boundaries, were retained without rewriting their assertions.

## Measured production resources

Measured against the actual pre-change `dist` saved before any build, then served on a separate local HTTP origin. Microsoft Edge **155.0.4283.45**, isolated headless process and fresh browser contexts, no account profile. Analytics consent was declined at document start; non-local requests were blocked. Values are the sum of JavaScript HTTP response-body bytes, **not gzip transfer, CPU time or a speed claim**.

| Route / family | Decoded JavaScript bytes | JS responses |
| --- | ---: | ---: |
| Old home, release f375880 | 1,092,058 | 5 |
| New home | 314,126 | 4 |
| Guide hub / comparison | 711,840 | 8 |
| Catalogue | 330,982 | 5 |
| Momcozy M9 product details | 268,203 | 5 |
| Wearable market | 484,806 | 4 |
| Methodology | 523,808 | 5 |
| Privacy | 238,893 | 4 |
| Basic article: Flanschgröße | 696,044 | 9 |

Home's measured reduction is **71.24%** relative to that actual baseline. Its only responses are the bootstrap, vendor, selected home family, and responsive-photo helper. No catalogue/article/market-registry chunk is requested.

`edge-resources.json` records all 50 routes: one main, one H1, original main-node identity retained, working hydrated menu, **zero hydration/browser warnings or errors**, and zero Analytics scripts. `edge-probe.txt` also records deliberately blocked and delayed home imports: original SSR remains connected, consent rejection/reopening works, query/hash survive, and the delayed successful handoff has no errors. The deliberately blocked import has the expected network/import errors, not hydration errors. With JavaScript disabled, home still has one main, one H1 and 104 links.

## Content equivalence and final verification

- The saved before/after `renderToString` comparison covers all 50 routes plus 404. **49/51 are byte-exact**. The two differences are `/vergleich/` (parent's new sharing button) and `/ratgeber/` (parent's new search hint), intentionally introduced concurrently by the parent. The implementation did not edit those files. All route-loader trees equal the current synchronous App trees.
- Final `npm run lint`: exit 0. Final `npm test` (fresh Vite build, prerender and full suite): **289 passed, 0 failed/skipped**. `git diff --check`: exit 0. `node private/route-loading/edge-probe.mjs`: exit 0 with all 50 routes verified.
- A non-ignored source export in a separate Hermes scratch directory, with private evidence and `.superdesign` absent, also passed lint and the full build/289-test suite. Only the already-installed locked dependencies were reused via a directory junction; this is source-portability verification, not a fresh dependency-install/CI claim. Evidence: `private/route-loading/portable-tests.txt`. Public tests use only checked-in sources and generated `dist`; they never read private screenshots, baseline exports or browser packages.
- Parent retains integrated visual/mobile QA and publication ownership after handoff. This work does not claim layout approval, field Core Web Vitals gains, indexing or revenue changes.

## Maintaining the lightweight projection

The article bodies remain authoritative. After editing guide metadata or product associations, refresh the derived JSON and run the full suite. Preserve the first three basic-guide summaries in the JSON (those are their source records); derive the rest from `milk-guides.json` and `EDITORIAL_GUIDES`:

```sh
npx tsx --eval "import fs from 'node:fs'; import { GUIDE_ARTICLES } from './src/data.ts'; import { EDITORIAL_GUIDES } from './src/guides.ts'; import milk from './src/milk-guides.json'; const project = ({slug,title,description,published,updated,category}) => ({slug,title,description,published,updated,category,image:'/editorial/'+slug+'-og.png'}); fs.writeFileSync('src/guide-summary-data.json', JSON.stringify({summaries:[...GUIDE_ARTICLES.slice(0,3),...milk.map(project),...EDITORIAL_GUIDES.map(project)],links:EDITORIAL_GUIDES.map(({slug,title,description,category,productIds})=>({slug,title,description,category,productIds}))},null,2)+'\n');"
npm run lint
npm test
```

Keep new browser route imports in `route-loader.ts`; never import the synchronous App into bootstrap. Keep the exact shared `RouteView` tree on both sides of hydration. Run the built-closure tests after modifying cache chunk rules, because separately named files alone do not establish demand loading.
