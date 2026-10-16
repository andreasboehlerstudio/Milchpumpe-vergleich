# Free-guide release candidate

## Content

- Five substantive four-page A4 PDFs: Unterwegs-Packplan, Arbeitsplatz- und Übergabeplan, Reinigung und Teileroutine, Passform-Beratungsvorbereitung, Set- und Teilepass.
- Twenty pages and 222 blank interactive fields across those five documents. Actual PDF previews, source references and reproducible build/QA sources included.
- Five standalone V15 detail pages plus `/gratis-guides/`, independent direct downloads, navigation, canonical metadata, sitemap and lazy presentation.
- Original eight-page Kaufcheck remains unchanged and has an independent direct-download action.
- Ten original 1000×1500 Pinterest PNG creatives, two per guide. Their presence as website assets is not Pinterest publication.
- First-party newsletter response handling and consent integration, with no collecting form until all existing readiness flags and the exact provider identity match.
- Additive `/datenschutz/#newsletter` section; existing analytics and withdrawal behavior retained.

## Verification before publication

Parent execution: production build/prerender, **369 tests passed**, TypeScript lint and `git diff --check` passed. All five PDF/preview hashes, page/field counts, blank public field values and actual 1200×1080 preview dimensions independently checked. Parent inspected all five four-page contact sheets and the ten-pin contact sheet. The pin ZIP passes CRC and all ten contained PNG hashes match the final campaign records.

The newsletter UI separately passed eight real-browser runs at 320/390/768/1440 with and without client JavaScript, including direct PDF download/hash verification, no unexpected external requests and no reported text clipping. An empty-email request from the actual production origin established readable Brevo HTTP400 validation; no recipient was submitted by that probe.

## Independent outstanding operations

Newsletter collection remains disabled: accepted form POST does not establish actual DOI inbox receipt, welcome PDF delivery, unsubscribe suppression, MIME tracking behavior or account-contract/retention completion. No readiness flag is relaxed by this release. Pinterest account publication and live pin URLs must be verified separately, only after the landing targets and downloads have been read back on the live site.

This note records a locally verified candidate, not a successful deployment. Deployment commit, workflow result and live HTTP/asset verification belong to the final release evidence.
