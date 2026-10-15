# Integration and verification: magazine, comparison and purchase guide

## Implemented

- `App.tsx` mounts the main-owning `MagazineGuideHub` and `VisualComparisonPage` directly. Their scoped stylesheet follows legacy site styles; no duplicate main and no iframe.
- Each has an optional in-main newsletter slot. The actual connection remains fail-closed (`formUrl: null`, all verified gates false). No active newsletter call-to-action is rendered in the release.
- Magazine retains all 35 article nodes, article illustrations, exact model-cluster anchors and pump finder. Comparison retains six detail records, grouping five electrical models and manual Haakaa separately from the 40-model overview.
- SEO includes the complete magazine ItemList. Article dates are record-derived and unsupported original publication dates omitted; see `foundation-source-review.md`.
- Manrope Latin font discovery, existing article-hero priority and six independently verified licensed-photo derivatives are implemented. V15 source HTML and image composition remain intact; responsive attributes are applied at rendering only.
- The eight-page A4 purchase guide has 16 fillable text fields, printable checks and links. Reproducible source/licensed fonts live under `tools/purchase-guide/`; blank delivery PDF, raster proofs and real evidence stay in ignored `private/newsletter-guide/`, not `public/`.

## Actual verification

- `npm run lint`: exit 0.
- `npm test`: production build plus **277 tests passed, 0 failed**.
- PDF independent rerun: `pytest tools/purchase-guide/test_purchase_guide.py`: **1 passed**. Source documentation records the page/font/link/form-fill/reproducibility checks. Parent viewed the raster contact sheet and final shopping worksheet.
- Isolated real Edge/Chromium production-build QA: **50 routes × 4 widths (320, 390, 768, 1440) = 200 checks**, no page errors, exact viewport width, no document overflow, one H1/main and no detected clipped visible headings/buttons.
- **72 selected-pair checks** (all 6×6 pairs at 1024 and 1440px): seven corresponding factual rows align within 1px after nested CSS subgrid fix. Initial actual probe detected 38 misaligned pairs; fixed before release.
- Native manual/same-model/reset/swap tested at 320 and 390px; all 14 selected-pair values remain present. Default pair is Momcozy M9 / Medela Freestyle.
- Integrated visual review caught an oversized magazine kicker inherited from legacy heading styles. Explicit scoped specificity restored the intended small label; browser regression assertion now checks ≤16px.
- Account-only readbacks, screenshots and raw lab output stay ignored. Baseline performance measurements in the separate audit are **lab-only**; no post-release field CWV, ranking or numerical speed-gain claim is made.

## Deliberately not activated

The owner approved continuation/publication. This is not a substitute for provider activation, verified sender identity, a real DOI/PDF/unsubscribe end-to-end test or a matching privacy notice. Newsletter remains hidden until every launch gate is evidenced. No contact import, campaign, paid upgrade or test email was sent. Route-independent JS splitting is a separate follow-up, not silently claimed as completed.

## Publication boundary

Local verification is complete. Remote commit, clean-checkout CI, merge/deployment and public HTML/assets must each be read back separately; this document itself is not proof of live publication.
