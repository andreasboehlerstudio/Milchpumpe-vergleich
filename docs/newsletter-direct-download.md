# Original Kaufcheck: direct PDF download

## Public behavior

The approved landing now has a full-width **Kaufcheck herunterladen** link before the optional newsletter conditions and caller-supplied form. It identifies the **8-page fillable PDF**, says it is free without registration, and uses a same-origin `/downloads/dein-milchpumpen-kaufcheck.pdf` target with the `download` filename. No email, consent, provider readiness, script, or newsletter launch gate is involved in this link.

The original headline, supporting sentence, brand/source identity, actual cover/page-7 artwork, light Manrope typography and V15 cream/petrol/mint/coral composition are retained. New CSS selectors are scoped beneath `.newsletter-landing`. The optional `formSlot` contract and default non-collecting inactive status remain unchanged.

Newsletter copy separately explains: subscription is optional; the welcome Kaufcheck is also sent by email after email confirmation (Double-Opt-in); afterward at most two emails per month with tips and occasional product recommendations; unsubscribe at any time. This presentation is **not** verification of actual newsletter delivery.

## Public asset identity

`src/newsletter-downloads.ts` contains only public URL, filename and document identity metadata. It contains no private filesystem path or provider/account information.

`public/downloads/dein-milchpumpen-kaufcheck.pdf` is an unchanged binary copy of the existing original, not a newly produced guide. Actual private-original/public-copy byte comparison and the previously recorded welcome QA checksum agree:

- SHA-256: `ecadb2d398414cbd152c3cffd843c9be588d26af3f58acedffab8abbb9abbd99`
- Size: **184473 bytes**
- pypdf: **8 pages, 16 text fields, not encrypted**

The public PDF must be included in version control with this change. It is not ignored. Portable tests read the public file directly and pin its identity; they never need the ignored private master, previous welcome QA evidence, or generated preview HTML. The private master and welcome record were used only for local provenance validation.

## Verification

- Four vertical TDD cycles were exercised: direct independent link, actual public binary/descriptor, optional DOI wording, and full-sized scoped CTA. Expected RED failures and subsequent GREEN output are saved privately.
- `node --import tsx --test scripts/newsletter-download.test.tsx scripts/newsletter-landing.test.tsx`: **9 passed**.
- Same focused command in a minimal public-only scratch tree, with no private directory/master/evidence and only a dependency junction: **9 passed**.
- `npm run lint`: **passed** (`tsc --noEmit`).
- `npm test`: production build/prerender plus **314 tests passed, 0 failed** in the shared working tree at verification time.
- Local headless Chromium: **320 / 390 / 768 / 1440px**, both disabled form-preview and default inactive states, with shared CSS before scoped landing CSS. All actual client widths matched the requested widths; no document horizontal overflow, out-of-bounds text or detected overflow clipping; headline weight 300; artwork loaded; CTA height 64px. Screenshots were visually reviewed. Browser-click downloads in all eight combinations yielded the expected filename and exact original checksum without entering email or consent.

Evidence, scripts, RED/GREEN logs, PDF parity, portable-copy manifest, full-suite output and screenshots are under ignored `private/newsletter-direct-download/`.

## Scope and remaining release work

No route, config, gate, provider component, privacy policy, package, account or Git state was changed by this task. Nothing was committed or published. The five later guides were not produced or copied.

Real sender, DOI, email PDF welcome delivery, unsubscribe and matching privacy/policy checks remain separate release prerequisites owned by the integration task. The direct download is deliberately independent of those newsletter checks; making this asset public is intentional, not protected or subscriber-exclusive delivery.

The older `tools/newsletter-landing/serve-preview.mjs` remains unchanged and intentionally does not allow PDF requests. Therefore its historical allowlisted design preview is not an end-to-end download server. The private QA harness serves only the exact public PDF, local font, artwork and in-memory preview on loopback and proves the actual browser download. Production static hosting must serve the public asset normally.
