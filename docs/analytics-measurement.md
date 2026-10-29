# Consent-limited production measurement

## Scope and production policy

The only measurement origin is **`https://milchpumpe-vergleich.de`** (default HTTPS port). `www.milchpumpe-vergleich.de` is a redirect-only alias, not a second measurement origin. HTTP, localhost, preview deployments, `p.superdesign.dev`, subdomains, suffix lookalikes and nondefault ports cannot load GA or dispatch our events, even with stored acceptance. The same guard is checked by the loader, the queued `gtag` wrapper and each custom event dispatcher.

The existing property ID is `G-4MTYQGF7VK`. No account settings, filters or historical data are changed. In particular, legitimate production visitors arriving from a design preview or any other referral are **not** excluded. Nonproduction execution is excluded by its own origin, not by the visitor's referrer.

Measurement also requires a current accepted `mv-analytics-consent-v1` record (maximum 180 days; malformed, nonfinite, expired and future timestamps do not authorize measurement). Withdrawal disables the loaded runtime with `ga-disable-G-4MTYQGF7VK`, clears the queued data layer, deletes GA cookies and reloads a loaded runtime as before. Storage errors fail closed without throwing from consent controls. No interaction is queued for later consent; delayed React measurements require the same acceptance timestamp at the interaction and dispatch.

## Owner opt-out (this browser only)

On the production origin, run in the browser console:

```js
localStorage.setItem('mv-analytics-owner-opt-out', '1');
location.reload();
```

Every **present** value blocks measurement, including an empty or malformed value. This is a non-identifying local setting, not an account ID, cookie, query-string switch or server-side visitor filter. Reload immediately after changing it so an already-running Google runtime is torn down; simply setting localStorage does not synchronously call the site's code. Future loader/custom-event/queued-event checks also disable the runtime when the key is present. Repeat this setting in each browser/profile used for owner QA. Clearing site data removes it.

To remove only this opt-out:

```js
localStorage.removeItem('mv-analytics-owner-opt-out');
location.reload();
```

Removing the setting does not grant consent. Normal consent remains required. There are deliberately no `?analytics=...`, debug or production-bypass URL parameters.

## Event contract

All custom parameters below come from fixed vocabularies, known model/product identities, pathname context or a bounded result count. No email, newsletter fields, finder query text, PDF contents/notes, full destination URLs, query strings or hash fragments are custom parameters.

| Event | Exact parameters | Meaning |
| --- | --- | --- |
| `affiliate_click` | `product_id`, `page_path`, `article_slug`, `link_placement`, `outbound_provider: 'amazon'` | Activation of a known Amazon purchase destination, not a purchase or commission. |
| `guide_download` | `guide_id`, `file_type: 'pdf'`, `download_surface` | Click on one of six known same-origin public PDF destinations. Not proof of download completion or reading. |
| `comparison_use` | `comparison_surface`, `comparison_action`, `model_a`, `model_b` | Explicit comparison action using the selected known model identities; initial render/restored URL state is not counted. |
| `finder_results` | `finder_surface`, `filter_kind`, `result_count` | Rendered result count following a finder action. No entered search text or selected filter value. |

### Values and APIs

- `trackAffiliateClick(_productName: string, productId = '', placement = 'product_card')` retains its calling convention but intentionally **does not send `product_name`**. Known IDs are an ID-only catalogue/market projection in `analytics.ts`, avoiding heavy browser imports. Unknown product IDs/placements are dropped. Existing placements: `product_card`, `intent_check`, `practical_tip`, `home_model_comparison`, `home_case_shortlist`; new market placements: `market_model_card`, `market_case_shortlist`. `outbound_provider` is always `amazon`. `page_path` is `location.pathname`, never `href`/`search`; `article_slug` is the article pathname segment or an empty string.
- `trackComparisonUse(surface, action, modelA, modelB)`: surfaces `home`, `detail_comparison`; action vocabulary `select_a`, `select_b`, `swap`, `reset`, `preset`, `directory_pick`, `open`, `share`, `differences`. Home uses the existing exact `brand|canonicalModel` registry keys; detailed comparison uses product IDs. These are product identities, not entered search terms. `share` means button use, not successful clipboard delivery.
- `trackFinderResults(surface, kind, count)`: surfaces `home_directory`, `magazine_finder`; kinds `query`, `architecture`, `offers`, `reset`; result count must be an integer 0–100. The home directory reports each native input/change/reset action after its synchronous filter. Magazine search is debounced 500 ms; select/reset measurements run after React commits. Event counts are interactions, not unique people or completed decisions.
- `bindAnalyticsInteractions(document): () => void` installs document delegation before route imports finish. Rebinding cleans the previous binding. Cleanup removes listeners and cancels scheduled measurements. Bootstrap cleans it on a non-bfcache `pagehide`; a persisted page keeps its listeners. Home hooks retain the runtime's existing AbortController cleanup.
- `guide_id`: `unterwegs-packplan`, `arbeitsplatz-uebergabeplan`, `reinigung-teileroutine`, `passform-beratungsvorbereitung`, `set-teilepass`, `dein-milchpumpen-kaufcheck`.
- `download_surface`: `guide_hub`, `guide_landing`, `purchase_check`, `other`.

### Actual interaction owners / duplicate prevention

- Five guide PDFs: delegated actual `.fg-download` anchors in the hub and landing renderer. Original Kaufcheck PDF: delegated actual `/downloads/dein-milchpumpen-kaufcheck.pdf` links, including links outside its landing. Links keep working without analytics consent or JavaScript.
- Home directory/comparison: hooks in the existing `bindEditorialHome` renderer path. Bootstrap does not also measure those controls.
- `/vergleich/`: delegated existing `mu-compare-*` controls, plus differences checkbox; model values are read after React renders, not from URL query parameters.
- `/ratgeber/#pumpenfinder`: delegated actual PumpFinder controls/results. It does not inspect newsletter forms or any other input.
- `/tragbare-milchpumpen/`: narrowly delegated `.wearable-market__shop[rel~="sponsored"]` Amazon anchors. All 40 model-card purchase links and the three case-shortlist links are covered by real-renderer tests. Model cards resolve their known `data-market-model`; shortlist labels are matched to the fixed identity vocabulary before anything is sent. This route previously had no affiliate handlers. Existing home and React AffiliateLink/PracticalTip handlers remain the sole owners of their events; there is no blanket sponsored-link handler.
- Other marketplace filters are not instrumented by this change.

`guide_download` deliberately differs from GA enhanced-measurement **`file_download`**. If the account also collects the latter, do not add the two counts together or mark both as the same conversion. A click can produce one custom event and one independent Google enhanced event.

## Data minimization and interpretation

The initial GA config explicitly overrides `page_location` with origin + pathname (no query/hash) and `page_referrer` with HTTP(S) origin only (no referral path/query/hash). This preserves referral-domain attribution without suppressing visitors. The exact already-published combination `utm_source=pinterest`, `utm_medium=organic_social`, `utm_campaign=modellfragen` is mapped to fixed `campaign_source`, `campaign_medium` and `campaign_name` config values. Duplicated keys, unknown campaigns, `utm_content`, search terms and all other arbitrary query values are discarded. Other campaign/UTM detail is intentionally not retained. This does not rewrite the browser URL, comparison sharing or incoming navigation.

Google's independent enhanced measurement/account features were **not** configured or audited here. These controls and tests establish our loader/config/custom-event behavior, not a promise that every third-party automatic event is devoid of URL data. GA processing is consent-based, not anonymous merely because advertising signals are disabled. The existing GA cookie lifespan config remains 180 days; advertising signals/personalization remain disabled.

Reports describe the consented subset. Never interpret clicks as sales or no-event visitors as no use. Start a separately dated post-deployment baseline; do not delete or reinterpret the existing October traffic. Registering custom dimensions/key events is an account-side follow-up requiring its own approval; no changes were made here.

## Privacy wording for the parent-owned page

Suggested addition (retain the existing provider/legal/transfer disclosures):

> Nur nach deiner Einwilligung und nur auf unserer Produktionsdomain messen wir außerdem Klicks auf Amazon-Links und kostenlose PDF-Guides sowie die Nutzung des Modellvergleichs und die Anzahl der Finder-Ergebnisse. Dabei verwenden wir festgelegte Modell-/Guide-Kennungen und Bedienaktionen. Suchtexte, E-Mail-Adressen und persönliche Einträge in den PDFs werden nicht als eigene Ereignisparameter übermittelt. Unsere initiale Analytics-Konfiguration übermittelt die aufgerufene URL ohne Abfrageparameter und Fragment; bei der verweisenden Seite beschränken wir sie auf die Domain. Die Messung lässt keine Aussage darüber zu, ob ein Kauf oder ein vollständiger Download erfolgt ist. Du kannst deine Einwilligung jederzeit in den Cookie-Einstellungen widerrufen.

Owner-only operating instructions belong in this document rather than a public identifying/internal-traffic claim. Do not describe GA as anonymous or suggest historical data were removed.

## Verification and release plan

Controlled Node/Happy DOM tests disable remote JavaScript loading/evaluation. They do not send synthetic traffic to the property. Strict RED/GREEN cycles were exercised for origin gating, local opt-out/storage failure, URL minimization, PDF clicks, real home/React interactions, bootstrap integration and the 43 market purchase links.

Focused commands, with no build:

```sh
npm run lint
npx tsx --test scripts/analytics-production.test.ts scripts/consent-lifecycle.test.ts scripts/consent-dialog.test.ts scripts/route-loading-bootstrap.test.tsx scripts/route-loading-contract.test.tsx scripts/free-guides-bootstrap.test.tsx
```

Two older tests outside this worker's assigned files require owner updates: `editorial-home-integration.test.tsx` currently expects a localhost affiliate event (must instead expect zero or run a separate production-origin stub fixture); `newsletter-integration-bootstrap.test.tsx:106` currently expects a Google script on localhost after acceptance (must expect zero). Their old expectations conflict with the required production-only policy; no production bypass should be introduced to satisfy them.

Before release, run full build/tests serially after those fixture updates. Browser verification should use request interception **before** navigation, aborting Google script and collect endpoints, or substitute a local gtag stub; never generate QA traffic in the real account:

1. Localhost, preview, www alias and suffix-spoof fixtures: accept consent, use comparison/finder/download/affiliate links; no Google script request or event dispatch. Verify PDF/navigation and consent UI still work.
2. Exact production-origin local fixture: intercept Google's script without fetching it, observe the site's queued config/events. Check all six PDFs, homepage select/swap/reset/shortcut, detailed comparison and finder. Expect one event per action and query-free payloads; initial SSR/hydration sends no custom interactions. Check actual downloaded PDF links independently from event observation.
3. Set the owner key and reload: no Google requests/events despite accepted consent; removing the key alone must not create consent. Test blocked localStorage.
4. Withdraw after a stub runtime has loaded: disable flag true, empty queue, GA cookie deletion and reload; no later events. Repeat expired/malformed/future consent.
5. Verify the real production deployment with owner opt-out enabled, then inspect emitted origin guard and sanitized config. Live real-GA receipt is a separate owner-authorized check, not established by local module tests.
