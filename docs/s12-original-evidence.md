# Original Momcozy S12 Pro evidence

Research / article update: **2026-10-29**. Scope: existing `/ratgeber/momcozy-m9-oder-s12-pro/` only. No new route, product rating, own test, or claim that Quick specifications apply to the original.

## Primary-source recovery and exact URLs

1. Manufacturer support article <https://support.momcozy.com/article/51897825715609> points users looking for S12 Pro manuals to <https://momcozy.com/pages/momcozy-breast-pump-user-guide-your-comfort-our-priority>.
2. The current hub's S12 slot instead says **S12 Pro Quick** and links `https://cdn.shopify.com/s/files/1/0559/2321/2486/files/Momcozy_S12_Pro_Quick_1.pdf?v=1782178968`. This is not original-S12-Pro evidence. Direct HTML checks of the US, German, UK and Australian hub entry points all exposed that Quick PDF. A search snippet still describing an original S12 Pro slot was stale. The old original-product address also redirected to the Quick product page.
3. Wayback CDX returned the manufacturer hub snapshot **20250802222430** (2025-08-02 22:24:30 UTC). The `available` API had returned HTTP 429; CDX was a successful alternative, not a fabricated archive hit. Exact snapshot: <https://web.archive.org/web/20250802222430/https://momcozy.com/pages/momcozy-breast-pump-user-guide-your-comfort-our-priority>. Raw historical HTML read successfully at <https://web.archive.org/web/20250802222430id_/https://momcozy.com/pages/momcozy-breast-pump-user-guide-your-comfort-our-priority>.
4. Under the historical **S12 Pro Breast Pump** heading the actual manufacturer HTML contained:
   - `data-manual_url_us="https://cdn.shopify.com/s/files/1/0559/2321/2486/files/momcozy_S12_Pro_User_Manual-US.pdf?v=1743470937"`
   - `data-guide_url_de="https://cdn.shopify.com/s/files/1/0559/2321/2486/files/Momcozy-S12pro_User_Guide-DE.pdf?v=1741161422"`
5. Both exact URLs were then fetched **live from the manufacturer-linked Shopify CDN**, not downloaded from the archive or a third-party manual mirror. Both returned HTTP **200**, `application/pdf`, without changing the final URL.

The archive establishes the manufacturer's historical model/link/locale assignment; it is explicitly dated in the article. Current CDN retrieval establishes that the recovered files were actually accessible on the research date. Neither establishes today's retail stock or bundle.

### Full manual — original S12 Pro, US / English

<https://cdn.shopify.com/s/files/1/0559/2321/2486/files/momcozy_S12_Pro_User_Manual-US.pdf?v=1743470937>

- **39 PDF pages**, **4,365,835 bytes**.
- SHA-256: `1dcea103aba736e1d6f5b3f904820029a696af70c4f11081850f8dff3fd72e0a`.
- PDF title metadata, preserved literally: `momcozy S12 Pro吸奶器说明书（单英文减配版 ）-20240111-C7`.
- The PDF has an English language divider. Locale assignment is `manual_url_us` in the manufacturer hub; this is not represented as a German full manual or proof of identical German retail contents.
- Chapter 3 / PDF page 5 / printed page 03 explicitly says `(model: S12 Pro)`.
- Chapter 9 / PDF page 29 / printed page 27 explicitly lists `Model No. S12 Pro`, `Pump options Single pumping`. It does not say Quick.

### German quick-start guide — not a full German manual

<https://cdn.shopify.com/s/files/1/0559/2321/2486/files/Momcozy-S12pro_User_Guide-DE.pdf?v=1741161422>

- **1 PDF page**, **2,507,994 bytes**; a printer-layout sheet showing front and back of the German card.
- SHA-256: `19ab7e9efaa7c26004a7daf1fb76f7fbc1a581982dcf459466add70c4d9c10ce`.
- German assembly illustrations, pouring direction, and washable vs nonwashable component diagrams were visually inspected.
- The card itself refers readers to the Gebrauchsanweisung for further details. It is labelled a **Kurzanleitung** in the article, not a complete German manual. “Quick-start guide” here is a document type, not the S12 Pro Quick generation.

## Facts used in the article

Page numbers below distinguish actual PDF page positions from the manual's printed page numbers. Text extraction with PyMuPDF was cross-checked against rendered PDF images for model identification, control settings, components, flange size, and the German card.

| Fact | Original source location / wording | Editorial boundary |
| --- | --- | --- |
| Direct button operation, three modes, nine settings per mode | PDF page 25 / printed 23: `Stimulation Mode & Expression Mode & Mixed Mode`; `9 vacuum pressure settings for each mode` | No inference of higher milk output, comfort or superiority over M9's existing documented app options. |
| Not usable while charging | PDF page 25 / printed 23: `does not support use while charging`; also PDF page 12 / printed 10 | Practical charging-pause check; not an instruction to select a particular pumping duration. |
| 24-mm silicone flange in this documented version | PDF page 19 / printed 17: `only provides 24mm silicone flange`; other flanges/inserts available separately | Not a universal German bundle specification, personal fit recommendation or promise of extra included inserts. |
| Five milk-contact parts per collection system | PDF page 13 / printed 11: Double-sealed Flange, Linker, Diaphragm, Valve, Milk collector; also PDF page 8 / printed 06 and the German card | Extra inserts are additional where used. Five is not a market-wide “fewer parts” or faster-cleaning claim. |
| Handwashing; dishwasher procedure not validated | PDF page 14 / printed 12: `Please manually clean the device! The safety of using a dishwasher to clean and disinfect this product has not been verified.` | Motor, cable and adapter must not enter water or a dishwasher. Do not substitute Quick quick-clean marketing. |
| Container capacity vs recommended stopping point | PDF page 8 / printed 06: `Milk collector (180ml)`; PDF page 26 / printed 24: stop when volume `approaches 120 ml to avoid overflow` | Capacity is not the recommended maximum pumping target or a predicted yield. No automatic full-sensor inference. |
| Pump option vs actual retail set | PDF page 29 / printed 27: `Single pumping` | Does not establish whether the merchant supplies a Single or Double carton. Ask for motors, cups, flange sizes and charging contents for the exact region/set. |

Other original-S12-Pro manufacturer support pages were retrievable as corroborating research: [specifications](https://support.momcozy.com/article/52718189260313), [assembly/disassembly](https://support.momcozy.com/article/49231641929241), [operation](https://support.momcozy.com/article/53219132947737). They were not used to pretend that the full German manual was recovered. The operation support page even contains a link labelled S12 Pro Plus; the recovered model-identified PDF avoids relying on that ambiguous cross-link.

No battery life, motor-noise, suction-performance, speed, medical-outcome or current-price comparison was added. Existing Quick-generation boundary text, substantive M9 discussion, fit advice, hygiene/parts discussion, safety limits, FAQs and original sources remain. Only the generic S12-family opening sentence in the operation paragraph was replaced by model-specific original-manual evidence; its surrounding practical advice remains.

## Strict TDD record and focused execution

Command used for each RED and subsequent GREEN:

```bash
npx tsx --test scripts/s12-original-evidence.test.tsx
```

Five vertical RED→GREEN slices were executed, not an implementation followed by invented test results:

1. **Source identity / locale / date:** RED `Missing verified original S12 Pro manufacturer PDF`; GREEN 1/1 after adding original-manual provenance, German quick-guide distinction, genuine links and `updated: '2026-10-29'`.
2. **Operation:** RED missing original three-mode/nine-level description; GREEN 2/2 after replacing the generic family-level evidence and linking PDF page 25. The test rejects a Quick URL as the operation source.
3. **Fit:** RED missing original S12 Pro 24-mm silicone-flange evidence; GREEN 3/3 after adding the scoped included-vs-extra distinction and page 19 link.
4. **Cleaning:** RED missing original five-part / hand-cleaning description; GREEN 4/4 after adding actual model-specific component/cleaning instructions and page 13 link. The test rejects Quick evidence for that instruction and rejects unsupported simpler/faster-cleaning language.
5. **Buying checklist:** RED missing 180-ml / near-120-ml distinction; GREEN after adding capacity and set checks. Tests retain the original-versus-Quick boundary and reject the Quick 210-ml / 46-dB / quick-clean values as original article facts.

Final focused command:

```bash
npx tsx --test scripts/s12-original-evidence.test.tsx scripts/depth.test.tsx
```

**Actual result: 7 tests passed, 0 failed** (five new evidence/rendered-section tests plus two existing article-depth/library tests). Tests render the real `BuyingGuidePage` and check source anchors within the relevant sections; they do not fetch the network or depend on private scratch PDFs. `git diff --check -- src/buying-guides.ts` also passed. No full build, full suite, commit or publication was run by this worker.

## Integration / remaining limit

Only `src/buying-guides.ts`, `scripts/s12-original-evidence.test.tsx`, and this document were changed/created. Parent should refresh the lightweight article-summary projection for the new `2026-10-29` update date, then run its integrated release checks. A current full German manual and the precise current German merchant set remain **unverified**; the article tells the reader exactly what to request instead of treating the US manual or German card as proof of them.
