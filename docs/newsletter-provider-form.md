# Own-site Brevo newsletter submission (additive; parent-owned integration)

## Scope and launch boundary

`NewsletterProviderForm` is an optional `NewsletterLandingPage` form-slot component. This patch does not wire a route; `newsletter-config.ts`, readiness gates, privacy source, download files and account settings are unchanged. Default rendering has **no form, inputs, CTA or action endpoint**. Even `enabled={true}` stays inactive when `consent` is absent, false, empty or whitespace-only text.

The parent owns final consent wording and real-flow verification. A supplied React element is not proof of readable/legal consent: do not pass empty fragments, components returning null, interactive controls, scripts, or resource-loading content. Supply readable inline text/markup (links are supported). This component checks only basic presence, not legal sufficiency. No DPA, tracking-off, privacy-publication or delivery status is asserted here.

The full direct PDF download remains independently provided by the landing page, without email, opt-in, JavaScript submission or newsletter readiness gates. This component neither hides that link nor creates a gated replacement. Render it alongside the existing independent download, not instead of it. Supplied approved consent wording is unchanged.

## Future integration contract (not performed)

- Render at most **one** instance per document: the export's `sib-form`, `EMAIL` and `OPT_IN` IDs are preserved.
- Render inside `.newsletter-landing`; load `newsletter-landing.css` followed by `newsletter-provider-form.css` at the integration boundary. The TSX does not import CSS, keeping Node SSR tests portable.
- Use the existing `formSlot` with `<NewsletterProviderForm enabled={verifiedLaunchDecision} consent={parentReviewedConsent} />` only after the parent authorizes integration. This example is not route wiring or gate activation.
- Reuses V15 `nl-controls`, `nl-email-label`, `nl-email`, `nl-consent` and `nl-cta`: one large email line, one submit CTA, unchecked required consent, no additional cards.
- Legal links point to `/datenschutz/#newsletter` and `/impressum/`. The provider notice links to the actual export's `https://www.brevo.com/de/legal/privacypolicy/`; that link opens with `nofollow noopener noreferrer`. These link destinations do not establish that matching final legal wording has been published.

## Public contract and native behavior

`src/newsletter-provider-contract.ts` versions the actual Brevo simple-HTML export observed on 2026-10-16 (form identity `6ad0df3f0accffc5587c5a5d`). The exact signed `https://f71c3538.sibforms.com/serve/...` action is a **public form submission address, not an API key**. Do not decode, reconstruct, normalize or replace its identity token. Changing an account export requires a new deliberate contract version and regression review.

The private JSON and HTML were read during implementation only. Tests use the versioned public contract and an independently pinned public action; neither tests nor component require private files. Boolean `required` attributes are present in the source HTML even though the observed JSON represents their attribute values as `null`.

| Name | Export type | Rendered type | Initial successful-control value |
| --- | --- | --- | --- |
| `EMAIL` | `text` | `email` (permitted native validation) | empty; required; `autocomplete="off"` retained |
| `OPT_IN` | `checkbox` | `checkbox` | unchecked; omitted until checked; required; checked value exactly `1` |
| `email_address_check` | `text` | `text` | empty; remains enabled, writable, non-required and submitted |
| `locale` | `hidden` | `hidden` | `de` |
| `html_type` | `hidden` | `hidden` | `simple` |

Email and honeypot are uncontrolled inputs initialized from the export; consent is uncontrolled and never prechecked. The honeypot is in a hidden, `aria-hidden` wrapper with `tabIndex={-1}` and a scoped CSS hiding rule. It is **not** disabled, renamed, converted to `type=hidden`, stripped or cleared on submission.

The observed action, POST method, absent target and five controls remain unchanged. No `enctype` is added to the form. For valid explicit submission, own-site React builds **URLSearchParams containing exactly those five contract names and their successful-control values**, including the unchanged honeypot, then POSTs to the exact public action with `credentials: 'omit'` and `mode: 'cors'`. The browser supplies URL-encoded content encoding for URLSearchParams. Native JSON navigation is prevented by React's submit handler; an SSR disabled fieldset and disabled button prevent submission before that handler is ready. Do not call native `form.submit()` to bypass this protection.

This is **first-party React enhancement, not third-party JavaScript**. There is no provider SDK, third-party script, external stylesheet/font, iframe, reCAPTCHA, server/API addition, secret, background request, automatic retry, PII analytics, cookie or storage access. Caller-supplied React content must follow the same constraints. Hydration and field edits do not send requests. Provider communication occurs only after an enabled form is deliberately and validly submitted; clicked legal links navigate normally.

## Observed native JSON behavior

**The simple HTML export does NOT implement Brevo's JavaScript-dependent hosted redirect pages or step-5 confirmation/error messages.** The parent's authorized actual POST returned HTTP200 JSON `success:true` with a message asking the recipient to check their inbox and confirm through the email link; native navigation showed raw JSON instead of a confirmation page. A separate actual empty-email browser CORS probe returned readable HTTP400 `success:false, errors.EMAIL`. These are parent-owned observations in `private/newsletter-setup/real-flow/`, not this patch's mocked unit-test results. Local-origin validation readability does not prove successful client signup from every deployed origin. The WAF403 urllib probe is not validation evidence and was not repeated. Do not add `html_type=full`, response guesses or provider scripts to make hosted settings appear supported.

## On-site response UI and hydration safety

- SSR renders a disabled fieldset and explicitly disabled submit button even with `enabled=true`. This prevents clicks and implicit email-field Enter submission before hydration or without JavaScript. React attaches the handler before its effect unlocks the controls. A static-markup-only preview is intentionally **not interactive**; a client React render/hydration is required. `noscript` explains the JavaScript requirement and independent PDF alternative without claiming signup or delivery.
- Every handled submit first prevents native navigation, checks readiness/enablement/consent presence, enforces native required-email and explicit-checkbox validity, and takes a synchronous in-flight lock. While sending, controls are disabled and `aria-busy=true`; the separate PDF link remains outside the fieldset. No concurrent duplicate or automatic retry is allowed.
- Acceptance requires a readable response type (`basic`, `cors` or `default`), successful HTTP status via `response.ok`, parsed JSON `success === true` and a nonempty string `message`. The exact provider message is rendered as escaped React text in a persistent `role=status`, `aria-live=polite`, `aria-atomic=true` region, never HTML. Accepted requests remain locked against repeat submission. **Acceptance is only a DOI request, not a completed subscription, confirmed address or delivered PDF.**
- Only readable HTTP400 with `success === false` and nonempty string `errors.EMAIL` is recognized as the observed validation rejection. Its escaped message is associated with the email through `aria-describedby`/`aria-invalid`, and the field receives focus after controls unlock. Values and consent are retained; correction requires another deliberate submit.
- Unknown shapes, unsuccessful HTTP responses, opaque/error/redirect response types, invalid/empty JSON, and network/read failures are **uncertain**, never success. Guidance says the request may already have been processed and asks users to check inbox/spam **before retrying**. Values remain; retry is manual only. There is no automatic timeout/retry: a still-pending fetch stays locked until it settles or the user leaves.
- Feedback uses scoped light typography, natural height and wrapping, without additional cards, clipping or fixed-height status boxes.

Local SSR/Happy DOM validity, FormData and fixture-driven hydration tests do not send email or prove provider acceptance, actual browser response handling, DOI delivery/confirmation, contact-list behavior, PDF attachment, unsubscribe, suppression, or final legal compliance. The parent must integrate/hydrate the actual landing, check real-browser layout/accessibility and intended-origin CORS, and verify DOI → welcome/PDF → unsubscribe before enabling collection. No live submission, account change or publication was made by this patch.

## Portable verification

From the website checkout after the existing dependencies are installed:

```sh
npx tsx --test scripts/newsletter-provider-form.test.tsx scripts/newsletter-provider-submission.test.tsx
npm run lint
npm test
```

Related regression tests (no provider submission):

```sh
npx tsx --test scripts/newsletter-provider-form.test.tsx scripts/newsletter-provider-submission.test.tsx scripts/newsletter.test.tsx scripts/newsletter-landing.test.tsx scripts/newsletter-integration.test.tsx scripts/newsletter-integration-bootstrap.test.tsx
```

Tests retain the meaningful pinned public contract, fail-closed states, exact five input names/types/defaults, native validity, checked/unchecked FormData, honeypot successful-control preservation, legal links/opener protection and scoped dependency-free styling. Superseded expectations of an enabled SSR native button and no own-site submit handler were replaced with hydration-lock and interactive React tests. Added coverage includes SSR-to-client hydration without recoverable mismatches, no hydration/background requests (also under StrictMode), duplicate locking, exact URLSearchParams/credentials/action, escaped accepted/error messages, observed email-error handling, response-shape/readability rejection, no automatic retries, independent download presence through states and scoped wrapping feedback styles.

All submitted test addresses are synthetic `.invalid` fixtures and are never transmitted: the fetch boundary is replaced with explicitly synthetic responses, including impossible opaque+OK combinations to prove rejection. These are **testing only, not actual provider acceptance or delivery evidence**. Tests require no private exports. Happy DOM does not expose the browser's default enctype correctly for an omitted attribute; checks preserve the omitted HTML attribute rather than changing the export.

This enhancement's full `npm test` run passed **345/345** tests including production build; `npm run lint` (`tsc --noEmit`) passed. RED/GREEN, typecheck and full-suite logs are in `private/newsletter-provider-submission/`. CSS assertions are not proof of real-browser narrow-screen geometry. Earlier static-preview/native-control checks do not verify this enhancement's interactive browser flow; parent-owned actual client/browser and inbox verification remain required. No public gate is unlocked here.
