# Five free German PDF worksheets

## Build and verify

From the website root, with `uv` and Python available:

```bash
python tools/free-guides/verify_sources.py
uv run tools/free-guides/build.py
uv run tools/free-guides/qa.py
python tools/free-guides/rebuild_check.py
```

The builder and QA have pinned PEP 723 dependencies. Production used ReportLab 5.0.1, pypdf 6.20.1, PyMuPDF 1.28.2, Pillow 12.3.0 and fontTools 4.67.0. Build performs no network calls. `verify_sources.py` is the separately auditable public-primary-source refresh, retaining actual responses, retrieval time, status and hash privately.

Source and design inputs:
- `content.py`: all twenty substantial worksheet pages, not covers or fillers.
- `sources.json`: fixed primary-source ledger snapshot with exact IDs, URLs and original evidence quotations; refreshed on 16 October 2026.
- Read-only fonts from `../purchase-guide/assets/Manrope-{300,400,600}.ttf` and their `OFL-Manrope.txt`. The approved original guide's palette is reused: cream `#fff9ee`, petrol `#086d61`, mint `#e9f0e9`, coral `#cf765d`; Manrope Light headings and Regular text.
- Original research remains unmodified under `private/newsletter-expansion-2026-10-15/research/`.

## Only public outputs

| Slug | PDF | Preview |
| --- | --- | --- |
| unterwegs-packplan | `public/downloads/unterwegs-packplan.pdf` | `public/free-guide-assets/unterwegs-packplan-preview.webp` |
| arbeitsplatz-uebergabeplan | `public/downloads/arbeitsplatz-uebergabeplan.pdf` | `public/free-guide-assets/arbeitsplatz-uebergabeplan-preview.webp` |
| reinigung-teileroutine | `public/downloads/reinigung-teileroutine.pdf` | `public/free-guide-assets/reinigung-teileroutine-preview.webp` |
| passform-beratungsvorbereitung | `public/downloads/passform-beratungsvorbereitung.pdf` | `public/free-guide-assets/passform-beratungsvorbereitung-preview.webp` |
| set-teilepass | `public/downloads/set-teilepass.pdf` | `public/free-guide-assets/set-teilepass-preview.webp` |

All masters are blank, four A4 pages each, directly free without email. Newsletter remains optional. No submit action, script, account, newsletter integration or purchase action is added. Fields are local notes. The original eight-page guide is never written; its pre/post SHA-256 is checked.

## Verification and evidence

`private/free-guides-production/production-report.json` records final exact paths, hashes, bytes, page/field totals, per-page fields, source IDs and QA. Per-guide folders hold 144-dpi blank page PNGs, four-page contact sheets and private synthetic filled/re-edited copies. Public 1200×1080 WebPs composite only real blank page 1 and page 2 rasterizations with neutral shadows; no generated document graphics or private filled values are used.

QA checks actual serialized PDFs with pypdf and MuPDF, not merely design specs: blank defaults; no repeated field names; meaningful tooltips; widget bounds and pairwise collisions; actual static-word bounds and field collisions; A4 and exact four pages; source citations/URI parity; no missing static font glyphs; no submit/JavaScript actions. Every text field is filled with `ÄÖÜ äöü ß`, every checkbox checked, saved, reopened, value-compared, appearance-extracted and rendered. A second saved edit is reopened to prove continuing editability. No Adobe Reader GUI interoperability or independent professional medical/legal review is claimed.

## Reusable production lessons

- Embed a full WinAnsi Manrope font in AcroForm resources: static-page font embedding alone does not cover later typed German umlauts. Regenerate and extract appearance text, not only `/V` metadata.
- Keep existing static font PostScript names distinct for weights; do not run the original font-generation function, which writes its own asset directory.
- Check `pypdf.generic.BooleanObject.value`, not Python truthiness, for `/NeedAppearances`: a false wrapper can otherwise make a correct file fail QA.
- Design broad component matrices as repeated paired-field records on A4; seven tiny columns make meaningful instructions and user notes unreadable. Provide local-copy instructions for further records.
- Allocate multi-line space to long document URLs and exact references, not just a short one-line underline.
- Keep freshly fetched evidence separate from build inputs. Record real primary-page/PDF retrieval hashes and test decisive quotations rather than replacing unavailable sources with plausible content.
- Derive previews solely from final blank masters, then hash them and re-run a byte-exact build comparison. A WebP mockup is not a separate invented page design.
- Preserve model/generation/region distinctions, never interpolate disputed flange sizes or tubing instructions, and distinguish workplace legal minimum release time from an individual pumping schedule.
