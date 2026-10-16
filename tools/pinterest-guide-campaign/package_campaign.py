"""Validate the delivered campaign, build review sheets, and package real files.
Run after render.mjs: python tools/pinterest-guide-campaign/package_campaign.py
Uses the existing Pillow installation. No downloads, account access or publication.
"""
from pathlib import Path
from collections import Counter
import csv
import hashlib
import io
import json
import struct
import zipfile
from urllib.parse import urlparse, parse_qs
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
PRIVATE = ROOT / 'private/pinterest-guide-campaign'
PUBLIC = ROOT / 'public/pinterest-guides'
QA = PRIVATE / 'qa'
QA.mkdir(parents=True, exist_ok=True)
manifest = json.loads((PRIVATE / 'campaign.json').read_text(encoding='utf-8'))
pins = manifest['pins']
assert len(pins) == 10
assert len({p['id'] for p in pins}) == 10
assert len({p['SHA256'] for p in pins}) == 10
counts = Counter(p['guideSlug'] for p in pins)
assert len(counts) == 5 and all(v == 2 for v in counts.values())
with (PRIVATE / 'editorial.csv').open(encoding='utf-8-sig', newline='') as f:
    reader = csv.DictReader(f)
    rows = list(reader)
assert len(rows) == 10
assert [r['id'] for r in rows] == [p['id'] for p in pins]
assert not any(v.startswith(('=', '+', '-', '@')) for r in rows for v in r.values())
checks = []
for p, r in zip(pins, rows):
    image = ROOT / p['imagePath']
    raw = image.read_bytes()
    assert hashlib.sha256(raw).hexdigest() == p['SHA256'] == r['SHA256']
    assert raw[:8] == b'\x89PNG\r\n\x1a\n'
    with Image.open(image) as im:
        im.verify()
    with Image.open(image) as im:
        assert im.size == (1000, 1500)
        assert len(im.getcolors(maxcolors=1_000_000)) > 100
    url = urlparse(p['link'])
    assert url.scheme == 'https' and url.netloc == 'milchpumpe-vergleich.de'
    assert url.path == f"/gratis-guides/{p['guideSlug']}/"
    assert parse_qs(url.query) == {'utm_source':['pinterest'], 'utm_medium':['organic'], 'utm_campaign':['gratis_guides'], 'utm_content':[p['id']]}
    assert p['status'] == r['status'] == 'not-published'
    assert p['description'] == r['description'] and p['altText'] == r['altText']
    assert len(p['title']) <= 100
    assert len(p['description']) <= 500
    checks.append({'id':p['id'], 'dimensions':[1000,1500], 'PNGValid':True, 'SHA256':p['SHA256'], 'bytes':len(raw), 'titleCharacters':len(p['title']), 'descriptionCharacters':len(p['description']), 'utmVerified':True})

# Review labels are outside the original PNGs. Use a system UI font only on QA sheets.
try:
    label_font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 18)
except OSError:
    label_font = ImageFont.load_default(size=18)
cream = '#fff9ee'
petrol = '#075449'
sheet = Image.new('RGB', (1220, 788), '#dce9df')
draw = ImageDraw.Draw(sheet)
for i, p in enumerate(pins):
    col, row = i % 5, i // 5
    x, y = 20 + col * 240, 16 + row * 388
    with Image.open(ROOT / p['imagePath']) as im:
        thumb = im.convert('RGB').resize((220, 330), Image.Resampling.LANCZOS)
        sheet.paste(thumb, (x, y))
    draw.text((x, y+342), p['id'], font=label_font, fill=petrol)
sheet.save(QA / 'contact-sheet.png')

for index, slug in enumerate(counts, start=1):
    pair = [p for p in pins if p['guideSlug'] == slug]
    mobile = Image.new('RGB', (680, 540), '#dce9df')
    draw = ImageDraw.Draw(mobile)
    for i, p in enumerate(pair):
        with Image.open(ROOT / p['imagePath']) as im:
            # Exact 320 CSS-pixel feed-width preview, not a separate creative.
            im.convert('RGB').resize((320, 480), Image.Resampling.LANCZOS).save(QA / f"{p['id']}-mobile-320.png")
            mobile.paste(im.convert('RGB').resize((320,480),Image.Resampling.LANCZOS), (10+i*340,10))
        draw.text((10+i*340,505), p['id']+' · 320 px', font=label_font, fill=petrol)
    mobile.save(QA / f'mobile-pair-{index:02}.png')

report = {'imageCount':len(pins), 'uniqueIds':len({p['id'] for p in pins}), 'uniqueHashes':len({p['SHA256'] for p in pins}), 'perGuide':dict(counts), 'csvRows':len(rows), 'csvPurpose':'Editorial only; not a claimed Pinterest native bulk import', 'publicationStatus':'not-published', 'allLinksHaveExactlyFourNonpersonalUTMParameters':True, 'imageChecks':checks, 'mobileReviewWidth':320, 'mobileMainTypeSizes':{'headlineApproxPx':[26.88,32], 'leadPx':12.16, 'badgePx':14.72, 'directAccessLinePx':10.88}}
(PRIVATE / 'verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n',encoding='utf-8')

archive = PRIVATE / 'pinterest-gratis-guides-10-pins.zip'
# Allowlist only campaign-owned artifacts, preserving reproducible source and local font licence.
include = [ROOT / p['imagePath'] for p in pins]
include += [PRIVATE / name for name in ['campaign.json','editorial.csv','render-qa.json','verification.json','reproducibility.json','README.md','visual-review.md'] if (PRIVATE/name).is_file()]
include += [p for p in HERE.rglob('*') if p.is_file() and '__pycache__' not in p.parts]
include += [p for p in QA.rglob('*') if p.is_file()]
assert len(include) == len(set(include))
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for file in sorted(include):
        z.write(file,file.relative_to(ROOT).as_posix())
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    entries = z.namelist()
    assert sum(n.startswith('public/pinterest-guides/') and n.endswith('.png') for n in entries) == 10
    for p in pins:
        assert hashlib.sha256(z.read(p['imagePath'])).hexdigest() == p['SHA256']
    assert 'private/pinterest-guide-campaign/campaign.json' in entries
    assert 'private/pinterest-guide-campaign/editorial.csv' in entries
    assert 'tools/pinterest-guide-campaign/render.mjs' in entries
    assert 'tools/pinterest-guide-campaign/fonts/OFL-manrope.txt' in entries
zip_report = {'path':str(archive.relative_to(ROOT)).replace('\\','/'), 'bytes':archive.stat().st_size, 'SHA256':hashlib.sha256(archive.read_bytes()).hexdigest(), 'entries':len(entries), 'crcVerified':True, 'allTenOriginalPNGHashesVerified':True}
(PRIVATE / 'package-verification.json').write_text(json.dumps(zip_report,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'verification':report,'zip':zip_report},ensure_ascii=False,indent=2))
