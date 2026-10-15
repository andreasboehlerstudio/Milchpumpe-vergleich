# Purchase guide: local production

Eight-page A4 German purchase guide for **Milchpumpe-Vergleich.de**. Standalone production: no website build, newsletter account, API key, paid service, upload or publication required. The PDF remains under `private/newsletter-guide/`, never `public/`.

## Rebuild

From the website repository root, with uv available:

```bash
uv run --script tools/purchase-guide/build.py
```

PEP 723 metadata pins the dependencies actually used. The font is vendored; a rebuild does not download images or fonts. uv may fetch Python packages if not cached. Python 3.11+; exercised on Windows with Python 3.14.7.

## Verify

```bash
uv run --with reportlab==5.0.1 --with pypdf==6.20.1 --with pymupdf==1.28.2 --with pillow==12.3.0 --with fonttools==4.67.0 --with pytest==9.1.1 python -m pytest tools/purchase-guide/test_purchase_guide.py -q -p no:cacheprovider
```

The acceptance test uses the actual generated PDF, not mocked data. Optional read-only live source audit:

```bash
python tools/purchase-guide/audit_sources.py
```

`source-checks-initial.json` retains the rejected legacy Elvie URL; the final `source-checks.json` records HTTP 200 for all nine current destinations.

`tests-red.txt` records the expected missing-artifact failure before implementation. `tests-font-regression-red.txt` records the real font-weight regression caught before its fix. `tests-green.txt` records the final passing run.

The test checks A4 page size and count, required text, brand author, safe text-span bounds, all font objects (including form resources) embedded, distinct light / regular / semibold faces, HTTPS links without affiliate URLs, all text / field layout rectangles non-overlapping, field names unique, field bounds, and fill / save / read / visible-appearance roundtrip with German umlauts for every text field. It writes `evidence-report.json` and the explicitly QA-only filled proof.

A bounds check is not a formal proof of every possible clipping operator. Rendered images are reviewed separately. No physical printer proof, PDF/A or PDF/UA certification is claimed.

## Editable sources

- `content.json`: German copy, source URLs, article slugs, field labels.
- `build.py`: deterministic ReportLab page design, vector illustrations, embedded fonts, AcroForm creation, and PyMuPDF rasterization.
- `test_purchase_guide.py`: artifact acceptance test.
- `assets/Manrope-Variable.ttf`: upstream Google Fonts Manrope, downloaded from `https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf` on 15.10.2026.
- `assets/OFL-Manrope.txt`: complete SIL Open Font License and upstream copyright notice.
- `assets/Manrope-{300,400,600}.ttf`: local static instances regenerated during build, renamed internally to `ManropePG-*` to distinguish them in PDF resources. Same OFL.

### Font pitfalls addressed

ReportLab deduplicates dynamic TrueType fonts by internal PostScript name, not by alias. Variable-font instances must be assigned distinct PostScript names before registration; otherwise body and heading weights silently collapse into one face. The artifact test guards against that.

ReportLab's native textfield helper limits names to standard fonts. The build replaces **all** reachable Helvetica dictionaries (form default resources and every widget appearance resource) with an embedded full regular Manrope font and CP1252 widths. Merely replacing the form default dictionary leaves other Helvetica font objects unembedded. German umlauts and the Euro sign are supported. Arbitrary non-Latin form entries are not promised.

## Private outputs

- `dein-milchpumpen-kaufcheck.pdf`: **deliver this blank guide**, not the QA-filled copy.
- `cover-preview.png`: clean cover raster for parent integration; still private here.
- `contact-sheet.png`: all eight pages, 4 × 2 overview.
- `page-01.png` … `page-08.png`: per-page full-size proofs at 108 dpi.
- `qa-filled-roundtrip.pdf`, `qa-filled-shopping-sheet.png`: synthetic QA value only, not real customer data.
- `layout-manifest.json`: source paragraph / field rectangles, in top-origin PDF points.
- `evidence-report.json`: machine acceptance results and artifact SHA-256.
- `visual-review.json`: human/model inspection scope, observations and limitations.
- `source-checks.json`: factual source/retrieval record, not proof of model performance.
- `reproducibility.json`: independently repeated build hashes.

**Privacy:** a directory named private is an organizational boundary, not encryption or access control. A local `.gitignore` deliberately ignores all delivery / QA artifacts to reduce accidental public commits. The parent must keep these files out of public deployment and decide protected storage / delivery. No newsletter integration is provided or implied by this artifact. Fields stay in the user's local copy; the PDF has no submit action, tracking or embedded network form.

## Design / editorial constraints

Warm cream `#fff9ee`, petrol `#086d61`, mint `#e9f0e9`, coral accents `#cf765d`; text `#233c37`, muted `#526660`. These follow the website's current Manrope / light-heading visual direction. Headers and footers are shared; page compositions deliberately vary: illustrated cover, worksheet with sidebar, schematic lanes, comparison table, numbered editorial steps, workflow rail, shopping form, and linked source index.

Original vectors only; no licensed photographs or product art copied. Model names illustrate construction rather than recommendations. No performance trials, fake user reviews, diagnostic claims, universal millimeter formula, milk-storage time/temperature rules or guaranteed time-saving claims. The Medela US product source proves architecture only, not German retailer bundle contents. Actual selected offer and current local instructions must be checked before buying.
