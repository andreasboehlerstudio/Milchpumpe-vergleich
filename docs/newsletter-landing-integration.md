# Newsletter landing integration — inactive, not published

## Implemented

- `/kaufcheck/` has its own `newsletter` route family: synchronous `App` rendering for Node/SSR and the identical `RouteView` tree after demand-loaded browser resolution.
- `src/route-newsletter.tsx` currently renders **`<NewsletterLandingPage />` with no `formSlot`**. The page displays its explicit inactive status and contains no collecting form, email input, provider iframe/script or PDF download.
- The approved component and its stylesheet are unchanged except the permitted **Zum Magazin → `/ratgeber/`** link correction. Neither the disabled preview fixture nor `tools/newsletter-landing` is imported by the app.
- A minimal standalone `Layout` omits the existing editorial header/footer and any extra `main`. It provides the existing skip-link target and a small separate cookie-settings footer. Consent remains outside the design scope. The existing consent implementation is unchanged.
- Browser bootstrap keeps the independent consent root available while the selected route chunk is delayed or fails. The standalone SSR cookie control uses the same bootstrap listener/hydrated event handoff as existing pages. The footer participates in the consent modal's existing inert-background policy.
- Approved landing CSS is loaded only for this route, before hydration. Existing pages do not fetch the landing rendering chunk or its stylesheet.
- Local/dev head metadata uses the same lightweight `getNewsletterRouteSeo` values as the Node SEO registry. Canonical, title, description, robots and social text are updated only on the newsletter route; inactive robots are `noindex,follow`.
- `getSitePages(connection)` and its compatibility `ROUTES` export include `/kaufcheck/` only when `isNewsletterReady(connection)` is true. The unchanged prerender/sitemap script consumes `ROUTES`. With the actual default connection there are still exactly 50 published pages, no `/kaufcheck/index.html`, and no Kaufcheck sitemap entry.
- `NewsletterSignup` retains its readiness gate, compact flag and legal conditions. When verified it links to the owned `/kaufcheck/` route rather than directly to Brevo. With the actual default connection, acquisition remains absent on all existing pages.

## Not activated: parent-owned work remains

`src/newsletter-config.ts` is untouched: `formUrl: null` and all five verification booleans remain false. No account, sender, DOI, delivery or unsubscribe success is claimed by this integration.

The parent must supply the real verified exported Brevo classic HTML form through the existing `NewsletterLandingPage` **`formSlot`** seam in `src/route-newsletter.tsx`. That provider integration must separately enforce its actual verification gate; setting connection flags alone does not magically install a form. Do not substitute the disabled isolated design fixture or redesign the approved composition. Re-run SSR/hydration, consent and provider-specific tests when inserting the real slot.

The latest user instruction is **verification only**: the parent read back a Free Business Email allocation for `milchpumpe-vergleich.de`, but no mailbox has been created. Do not adopt the earlier `milchpumpe@andreasboehler.com` idea or change public `CONTACT_EMAIL`. A possible domain mailbox remains subject to user confirmation and parent-owned creation/verification. Hostinger, Brevo sender/reply-to and any eventual legal/contact changes belong to the parent. Do not publish until the parent has completed the verified sender, DOI, PDF delivery, unsubscribe and published privacy conditions and verified the real form integration.

No API keys/contact records, private PDFs, mailbox artifacts or provider-account exports were added to the frontend/public directory. Public newsletter assets still contain only the pre-existing intended `kaufcheck-preview.webp`.

## RED → GREEN evidence

Each implementation slice was preceded by an executed failing test, then rerun green:

1. Route/standalone composition failed because `/kaufcheck/` resolved to `legal`; adding the newsletter family, SSR/dynamic mapping and standalone layout made it pass.
2. Deferred/failed and successful hydration consent cases failed because the standalone SSR cookie-settings control was absent; the minimal control fixed all three.
3. Verified CTA failed because it linked to the bare provider URL; changing to `/kaufcheck/` passed while preserving terms/compact mode and the inactive gate.
4. Local/publication SEO failed because the route returned the 404 title; additive metadata and readiness-dependent `getSitePages` passed, preserving the existing 50 records.
5. Bootstrap local metadata cases failed with an empty local title; route-only presentation/metadata preparation made both delayed/failed cases pass.
6. The standalone cookie control initially failed the modal-background footer contract; placing that small control in its own footer made it participate in the existing inert policy.

The only pre-existing test changed is `scripts/newsletter.test.tsx`: its explicit bare-provider-link expectation contradicted the requested new owned-route behavior. It now requires `/kaufcheck/` and explicitly rejects a provider URL; its fail-closed, legal-copy and non-collecting assertions remain intact. No unrelated tests were edited.

## Verification actually run

- Targeted route/SSR parity, readiness/CTA and bootstrap tests passed during every corresponding GREEN cycle.
- Final targeted newsletter/landing/route-loading run: **22 passed, 0 failed, 0 skipped**. `git diff --check` passed after removing one trailing blank line in the consent-only CSS addition.
- `npm run lint`: **passed** (`tsc --noEmit`).
- `npm test`: **passed, 303 tests, 0 failures, 0 skipped**; includes a successful full Vite build plus synchronous prerender, all pre-existing route/content/registry/affiliate/schema tests and the new integration/build contracts.
- Emitted manifest/dependency-closure tests confirm a separate deferred newsletter family and no approved landing code/CSS in any of the eight unrelated family closures. The current real sitemap/static output excludes Kaufcheck; source and built newsletter assets each contain only the intended WebP.
- Real Chrome local-app QA at `http://127.0.0.1:4319/kaufcheck/?source=qa#newsletter`: one header/main, no collecting controls, actual 1800px preview loaded, Manrope weight 300, correct title/canonical/noindex, query/hash preserved, no browser warnings/errors. Desktop and real emulated 390px mobile screenshots were inspected: approved layout/order preserved, no clipping or duplicate shell; mobile document/client width both 390px.
- Real Chrome consent rejection persisted `declined`, loaded no Analytics, and the standalone cookie control reopened the dialog with focus on “Nur notwendige Funktionen”. At 390×844 the dialog height was approximately 506px, all header/main/footer landmarks were inert while open. Existing automated tests additionally exercised explicit acceptance after hydration and verified only one Analytics script.
- Real Chrome home QA found **no** `newsletter-landing`/`route-newsletter` network resources and **zero** `/kaufcheck/` acquisition links.

Browser Use's private-address policy blocked its localhost navigation; local Chrome DevTools was used successfully instead. Screenshots stayed in the Hermes image cache, outside the repo/public directory. No commit, push, deployment or account action was performed.
