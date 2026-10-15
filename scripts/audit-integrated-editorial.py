from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote, parse_qs
import hashlib
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
ORIGIN = 'https://milchpumpe-vergleich.de'

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.tags = []
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

urls = [x.text for x in ET.parse(DIST/'sitemap.xml').findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
pages = {}
for url in urls:
    path = urlparse(url).path
    html = (DIST/path.lstrip('/')/'index.html').read_text(encoding='utf-8')
    pages[path] = (html, Page(html))
errors = []
titles = set()
descriptions = set()
commercial = []
local_links = 0
for path, (html, page) in pages.items():
    ids = [attrs['id'] for _, attrs in page.tags if 'id' in attrs]
    if len(ids) != len(set(ids)):
        errors.append([path, 'duplicate-id'])
    if sum(tag == 'main' for tag, _ in page.tags) != 1 or sum(tag == 'h1' for tag, _ in page.tags) != 1:
        errors.append([path, 'landmark-or-h1-count'])
    title = re.search(r'<title>(.*?)</title>', html)[1]
    description = next(a.get('content') for t, a in page.tags if t == 'meta' and a.get('name') == 'description')
    if title in titles or description in descriptions:
        errors.append([path, 'duplicate-metadata'])
    titles.add(title); descriptions.add(description)
    canonical = next(a.get('href') for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical')
    if canonical != ORIGIN+path:
        errors.append([path, 'canonical'])
    for tag, attrs in page.tags:
        value = attrs.get('href') if tag == 'a' else attrs.get('src') if tag in ('img', 'script') else None
        if not value:
            continue
        parsed = urlparse(value)
        if tag == 'a' and parsed.netloc == 'www.amazon.de' and (parsed.path.startswith('/dp/') or parsed.path == '/s'):
            commercial.append([path, value])
            if parse_qs(parsed.query).get('tag') != ['andreasboeh09-21'] or 'sponsored' not in attrs.get('rel', '').split():
                errors.append([path, 'affiliate-target', value])
        if parsed.scheme in ('mailto', 'tel', 'data') or (parsed.netloc and parsed.netloc != urlparse(ORIGIN).netloc):
            continue
        target_path = unquote(parsed.path) or path
        if not target_path.startswith('/'):
            continue
        local_links += 1
        if Path(target_path).suffix:
            if not (DIST/target_path.lstrip('/')).is_file():
                errors.append([path, 'missing-asset', value])
        elif target_path not in pages:
            errors.append([path, 'missing-route', value])
        elif parsed.fragment and parsed.fragment not in {a.get('id') for _, a in pages[target_path][1].tags}:
            errors.append([path, 'missing-cross-page-anchor', value])
    if 'andyboeh-21' in html or 'cdn.tailwindcss.com' in html:
        errors.append([path, 'obsolete-tag-or-runtime-cdn'])

snapshot = json.loads((ROOT/'docs/market-open-evidence-recheck.json').read_text(encoding='utf-8'))
preserved = all(hashlib.sha256((ROOT/p).read_bytes()).hexdigest() == h for p, h in snapshot['inputSnapshotHashes'].items())
assert preserved, 'Historical evidence snapshots changed'
report = {'routes':len(pages), 'sitemapUrls':len(urls), 'commercialLinkOccurrences':len(commercial), 'checkedLocalTargets':local_links, 'historicalSnapshotsPreserved':preserved, 'errors':errors}
(ROOT/'docs/editorial-home-production-audit.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps(report, ensure_ascii=False))
assert not errors, 'Production audit failed'
