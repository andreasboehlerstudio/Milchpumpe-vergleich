"""Verify every deployed sitemap route against the exact local release HTML.
No private Search Console access or analytics events. Public GETs only.
"""
from pathlib import Path
from html.parser import HTMLParser
from concurrent.futures import ThreadPoolExecutor
from urllib.request import Request, urlopen
from urllib.parse import urlparse, parse_qs
from datetime import datetime, timezone
import hashlib
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://milchpumpe-vergleich.de'

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(); self.tags = []; self.feed(html)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

def get(url):
    with urlopen(Request(url, headers={'User-Agent': 'MilchpumpeVergleich-ReleaseVerification/1.0', 'Cache-Control': 'no-cache'}), timeout=30) as response:
        return response.status, response.url, response.read()

status, final, sitemap = get(ORIGIN + '/sitemap.xml')
local_sitemap = (ROOT/'dist/sitemap.xml').read_bytes()
urls = [item.text for item in ET.fromstring(sitemap).findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
local_urls = [item.text for item in ET.fromstring(local_sitemap).findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(urls) == len(set(urls)), 'Duplicate sitemap URLs'

def audit(url):
    path = urlparse(url).path
    try:
        code, destination, body = get(url)
        html = body.decode('utf-8'); page = Page(html)
        local = (ROOT/'dist'/path.lstrip('/')/'index.html').read_bytes()
        canonical = [attrs.get('href') for tag, attrs in page.tags if tag == 'link' and attrs.get('rel') == 'canonical']
        commercial = [(tag, attrs) for tag, attrs in page.tags if tag == 'a' and urlparse(attrs.get('href', '')).netloc == 'www.amazon.de']
        errors = []
        if code != 200 or destination != url: errors.append('status-or-redirect')
        if hashlib.sha256(body).digest() != hashlib.sha256(local).digest(): errors.append('not-exact-release-html')
        if canonical != [url]: errors.append('canonical')
        if sum(tag == 'h1' for tag, _ in page.tags) != 1: errors.append('h1')
        if sum(tag == 'main' for tag, _ in page.tags) != 1: errors.append('main')
        if 'editorial-home v4' not in html: errors.append('editorial-shell')
        for _, attrs in commercial:
            if parse_qs(urlparse(attrs['href']).query).get('tag') != ['andreasboeh09-21'] or 'sponsored' not in attrs.get('rel', '').split(): errors.append('affiliate')
        return {'url': url, 'status': code, 'sha256': hashlib.sha256(body).hexdigest(), 'exactReleaseHtml': body == local, 'amazonLinks': len(commercial), 'errors': errors}
    except Exception as error:
        return {'url': url, 'errors': [str(error)]}

with ThreadPoolExecutor(max_workers=5) as pool:
    rows = list(pool.map(audit, urls))
errors = [row for row in rows if row['errors']]
assets = set()
for url in local_urls:
    html = (ROOT/'dist'/urlparse(url).path.lstrip('/')/'index.html').read_text(encoding='utf-8')
    for tag, attrs in Page(html).tags:
        candidate = attrs.get('src') if tag in ('img', 'script') else attrs.get('href') if tag == 'link' and attrs.get('rel') == 'stylesheet' else None
        if candidate and candidate.startswith('/') and not candidate.startswith('//'): assets.add(candidate)

def asset_check(path):
    try:
        code, _, body = get(ORIGIN + path)
        exact = body == (ROOT/'dist'/path.lstrip('/')).read_bytes()
        return {'path': path, 'status': code, 'exactReleaseAsset': exact}
    except Exception as error: return {'path': path, 'error': str(error), 'exactReleaseAsset': False}

with ThreadPoolExecutor(max_workers=5) as pool:
    asset_rows = list(pool.map(asset_check, sorted(assets)))
report = {'checkedAt': datetime.now(timezone.utc).isoformat(), 'sitemapStatus': status, 'sitemapMatchesRelease': sitemap == local_sitemap, 'sitemapUrlSetsMatch': set(urls) == set(local_urls), 'routes': len(rows), 'exactReleaseHtml': sum(row.get('exactReleaseHtml', False) for row in rows), 'commercialLinkOccurrences': sum(row.get('amazonLinks', 0) for row in rows), 'assets': len(asset_rows), 'exactReleaseAssets': sum(row['exactReleaseAsset'] for row in asset_rows), 'errors': errors, 'pages': rows, 'assetChecks': asset_rows, 'limits': 'Public deployment verification; does not establish Google indexing, rankings, sales or commissions.'}
(ROOT/'docs/editorial-site-live-verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps({key: value for key, value in report.items() if key not in ('pages','assetChecks')}, ensure_ascii=False))
assert not errors and report['sitemapMatchesRelease'] and report['sitemapUrlSetsMatch'] and all(row['exactReleaseAsset'] for row in asset_rows), 'Live release not completely verified'
