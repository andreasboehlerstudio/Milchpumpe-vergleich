# Magazine hub and visual comparison upgrade

## Integration contract

Created only these task-owned repository files:

- `src/magazine-upgrade.tsx`
- `src/magazine-upgrade.css`
- `scripts/magazine-upgrade.test.tsx`
- `docs/magazine-upgrade-notes.md`

Exports:

```tsx
import { MagazineGuideHub, VisualComparisonPage } from './magazine-upgrade';
import './magazine-upgrade.css';

// Both components already contain exactly one <main id="inhalt">.
<MagazineGuideHub footerSlot={<NewsletterSignup />} />
<VisualComparisonPage footerSlot={<NewsletterSignup />} />
```

Both accept optional `footerSlot?: ReactNode` (default undefined), rendered as the final child **inside** the existing main. They do not import the newsletter, mount a second main, subscribe anyone or contact a service. Import the CSS after existing editorial CSS. No global homepage selectors were changed; all new CSS is scoped beneath `.magazine-upgrade`.

Parent owns route/page wiring, metadata and final integrated build/release verification. No existing repository files were edited by this task. Other concurrent parent work was visible in git status and was left untouched.

### Exact intended H1 labels for route metadata

- `/ratgeber/`: **Weniger Sucherei. Mehr Alltag, der passt.**
- `/vergleich/`: **Was unterscheidet deine Auswahl?**

A literal space after each `<br />` preserves natural flattened DOM text. Tests assert these exact strings and one H1/main per standalone page.

## Delivered behaviour

### Magazine

- Three reader intents: **Auswählen & vergleichen**, **Passform & Anwendung**, **Muttermilch im Alltag**.
- Large image-led cover story plus two differently composed secondary stories; mint/coral panels, open ruled article lists and model-cluster navigation instead of a uniform card wall.
- Existing `GUIDE_ARTICLES` is the sole library source: all **35 destinations occur exactly once within `#artikel`**, in full initial SSR HTML. Filtering keeps article nodes rather than replacing the complete library.
- Native labelled search and topic select intersect, trim/case-normalize search text and expose result announcements with `role="status"`, polite atomic live updates, a clear zero state and a reset button returning focus to search.
- Intent jump links clear an unsuccessful search and select the relevant topic; native hash destinations still work without JavaScript.
- Original `#modellfragen`, all six `#cluster-{product.id}` anchors, model/article links, `#artikel` and the existing **`#pumpenfinder`** remain. The existing `PumpFinder` is reused without importing `pages.tsx` or changing its registry.
- Methodology/health boundaries and the broader market/product-directory paths remain available.

### Comparison

- Explicitly distinguishes **six selected detail models** (five electric, manual Haakaa separately) from the existing **40-model electric market overview**.
- Native two-model selectors contain labelled electric/manual optgroups. Defaults: **Momcozy Mobile Flow M9 / Medela Freestyle Hands-free**.
- Swap, reset (focus to model A), same-selection guidance and a manual-system warning work with React state.
- Differences emphasis applies exact inequality to seven registry core fields: focus, category, set, app, energy, wearStyle, cleaning. It is a reversible highlight, not a filter/rating: equal facts remain visible and changed rows also have a textual “Unterschied” indicator.
- Full stacked definition-list cards on narrow screens; no horizontally scrolling comparison table, clipped specs or ellipsized fact text.
- All six complete model records remain accessible independently of the selected pair, including summary, seven core facts, manufacturer facts, strengths, limitations, product links, primary sources and the existing model-specific source date where supplied.
- Existing `ProductVisual` renders clearly labelled architectural schematics, not purported product photography. No prices, test scores, invented specs, new freshness/research dates or additional affiliate targets were introduced.

## Existing image rights and boundaries

Only existing local files are used; no assets were purchased/generated/downloaded/uploaded:

- `/editorial-photos/pump-parts.jpg`: LeslieKnope345 / Wikimedia Commons, CC0. Existing evidence: `docs/editorial-pump-parts-photo-rights.json`. CSS crops this cover illustration; no source image is altered.
- `/article-photos/milk-containers-960.webp`: Beukbeuk / Wikimedia Commons, Public domain. Existing evidence: `docs/article-photo-rights.json`.
- `/article-photos/frozen-milk-480.webp`: Shmarrighan / Wikimedia Commons, CC BY-SA 4.0. Visible creator/source/license link and existing “verkleinert, WebP” modification disclosure. Image uses contain, not a new crop. Existing evidence: `docs/article-photo-rights.json`.

All three photo files exist and loaded in the real browser. Visible notes distinguish topic photography from current-model/test/compatibility or hygiene evidence. No remote product packshots, accounts, paid Superdesign actions, source uploads, commits, pushes or publication.

## Actual RED → GREEN execution record

Primary isolated command throughout:

```sh
npx tsx --test scripts/magazine-upgrade.test.tsx
```

Each feature slice was added as a failing test, run, then implemented and rerun before the next slice:

| Slice | Observed RED (exit 1) | Observed GREEN (exit 0) |
| --- | --- | --- |
| Crawlable SSR magazine | 0/1 pass; “Magazine upgrade module must exist” | 1/1 pass |
| Search/topic/reset | 1/2 pass; “Labelled article search is missing” | 2/2 pass |
| Licensed image-led stories | 2/3 pass; expected 3 stories, got 0 | 3/3 pass |
| Full six-model comparison | 3/4 pass; “VisualComparisonPage export is missing” | 4/4 pass |
| Native selectable pair | 4/5 pass; “Native two-model selectors are missing” | 5/5 pass |
| Differences emphasis | 5/6 pass; “Differences control is missing” | 6/6 pass |
| Optional in-main footer slot | 6/7 pass; expected final child newsletter slot, got empty id | 7/7 pass |
| Scoped responsive stylesheet | 7/8 pass; “Magazine upgrade stylesheet is missing” | 8/8 pass |
| Intent jump recovery | targeted 0/1 pass; query still `zzzz-unbekannt` instead of empty | full 9/9 pass |
| H1 word boundaries | targeted 0/1 pass; `Weniger Sucherei.Mehr…` lacked a space | full 10/10 pass |

An additional visual-refinement RED used:

```sh
npx tsx --test --test-name-pattern='scoped stylesheet' scripts/magazine-upgrade.test.tsx
```

It failed 0/1 on hidden tablet story photos. After keeping all three figures visible and removing the inherited 25ch constraint from the tiny cover kicker, the full 8/8 suite passed (subsequently 10/10 with later slices).

The search test initially assumed there would be no “M9” match in Passform & Anwendung. A real existing accessories description mentions M9, so the test was corrected to use an actual nonexistent query for zero-state testing; no registry/content was changed to fit that assumption.

The first WIP test version used native DOM generic types with happy-dom `querySelector`; it was corrected to happy-dom element aliases. Final TypeScript lint has no such errors.

### Final command results

```text
npx tsx --test scripts/magazine-upgrade.test.tsx
ℹ tests 10
ℹ pass 10
ℹ fail 0
exit_code: 0

npm run lint
> milchpumpe-vergleich@1.0.0 lint
> tsc --noEmit
exit_code: 0
```

## Real-browser verification

An isolated local Vite QA surface rendered the new exports directly, importing index/editorial/home-editorial/new CSS without editing route files. Actual Chrome DevTools rendering was used, not happy-dom layout estimates.

- Magazine desktop at viewport 1440: `clientWidth = scrollWidth = 1425` (desktop scrollbar), all three local photos loaded. Desktop magazine screenshot inspected.
- Comparison desktop at viewport 1440: `clientWidth = scrollWidth = 1425`. Native selectors, diagrams and visual hierarchy inspected. Default pair fact rows aligned at the same measured vertical starts on both sides.
- Magazine **320px** final measurement: `clientWidth = scrollWidth = 320`, **0 elements outside horizontal viewport**; all three figures `display: block`; cover kicker `max-width: none`. The 320px magazine screenshot was inspected.
- Comparison **320px** final measurement: `clientWidth = scrollWidth = 320`, **0 elements outside horizontal viewport**; one 284px card column; **14/14 selected-pair definition values visible**.
- Both pages **375px**: `clientWidth = scrollWidth = 375`, **0 overflowing elements**; comparison single column 339px.
- Magazine **768px**: `clientWidth = scrollWidth = 753`, **0 overflowing elements**.

Browser Use's local URL path was blocked as an internal address; Chrome DevTools successfully accessed the loopback preview instead. DevTools mobile comparison screenshot capture timed out twice, so no mobile comparison screenshot review is claimed; the mobile DOM geometry/visibility checks above completed successfully. This does not block implementation, but parent should include the integrated mobile comparison in final visual QA.
