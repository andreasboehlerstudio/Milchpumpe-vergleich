from pathlib import Path
import urllib.request
import re
import json
import hashlib
from datetime import datetime, timezone

root = Path(__file__).resolve().parents[1]
font_dir = root / 'public' / 'fonts'
license_dir = root / 'docs' / 'font-licenses' / 'manrope'
font_dir.mkdir(parents=True, exist_ok=True)
license_dir.mkdir(parents=True, exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}

def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=40) as response:
        if response.status != 200:
            raise RuntimeError(f'HTTP {response.status}: {url}')
        return response.read()

license_url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt'
license_bytes = get(license_url)
assert b'SIL OPEN FONT LICENSE' in license_bytes
(license_dir / 'OFL.txt').write_bytes(license_bytes)
(font_dir / 'OFL-manrope.txt').write_bytes(license_bytes)
css_url = 'https://fonts.googleapis.com/css2?family=Manrope:wght@300..800&display=swap'
css = get(css_url).decode('utf-8')
(license_dir / 'google-fonts-source.css').write_text(css, encoding='utf-8')
faces = {}
records = []
for subset, declaration in re.findall(r'/\* ([^*]+) \*/\s*(@font-face\s*\{[^}]+\})', css):
    subset = subset.strip()
    if subset not in ['latin', 'latin-ext']:
        continue
    urls = re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', declaration)
    assert len(urls) == 1 and urls[0].endswith('.woff2')
    data = get(urls[0])
    assert data[:4] == b'wOF2' and len(data) > 1000
    target = font_dir / f'manrope-{subset}.woff2'
    target.write_bytes(data)
    local_url = f'/fonts/{target.name}'
    faces[subset] = declaration.replace(urls[0], local_url)
    records.append({'subset': subset, 'source': urls[0], 'path': str(target.relative_to(root)).replace('\\', '/'), 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
assert set(faces) == {'latin', 'latin-ext'}
(license_dir / 'local-font-face.css').write_text('\n\n'.join(faces[k] for k in ['latin-ext', 'latin']), encoding='utf-8')
manifest = {'family': 'Manrope', 'weights': [300, 800], 'license': 'SIL Open Font License 1.1', 'licenseUrl': license_url, 'cssSourceUrl': css_url, 'downloadedAt': datetime.now(timezone.utc).isoformat(), 'visitorGoogleRequests': False, 'assets': records}
(license_dir / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(json.dumps(manifest, indent=2, ensure_ascii=False))
