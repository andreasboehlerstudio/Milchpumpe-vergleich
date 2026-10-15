"""Read-only, optional live URL audit. Never required for offline PDF build."""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path
import hashlib
import json
import re
import urllib.request

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
DATA = json.loads((HERE / 'content.json').read_text(encoding='utf-8'))


def fetch(item):
    result = dict(item)
    result['checked_at'] = datetime.now().astimezone().isoformat()
    try:
        req = urllib.request.Request(item['url'], headers={'User-Agent': 'Mozilla/5.0 (compatible; PurchaseGuideLinkAudit/1.0)'})
        with urllib.request.urlopen(req, timeout=45) as response:
            body = response.read()
            result.update(status=response.status, final_url=response.url, bytes=len(body),
                          content_sha256=hashlib.sha256(body).hexdigest())
        title = re.search(r'<title[^>]*>(.*?)</title>', body.decode('utf-8', errors='replace'), re.S | re.I)
        result['title'] = re.sub(r'\s+', ' ', title.group(1)).strip() if title else None
        result['reachable'] = result['status'] == 200
    except Exception as error:
        result.update(reachable=False, error=str(error))
    return result


if __name__ == '__main__':
    items = [{'url': s['url'], 'label': s['label'], 'role': 'primary', 'content_basis': s['scope']} for s in DATA['sources']]
    items += [{'url': 'https://milchpumpe-vergleich.de/ratgeber/'+a['slug']+'/', 'label': a['label'], 'role': 'site article'} for a in DATA['articles']]
    with ThreadPoolExecutor(max_workers=5) as pool:
        results = list(pool.map(fetch, items))
    report = {
        'method': 'Independent read-only urllib GET; source content was also read through web extraction during editorial research.',
        'content_review_date': DATA['verified_date'],
        'limits': 'Reachability is not evidence of product performance; regional set contents must be checked separately.',
        'excluded_source': {'url': 'https://www.cdc.gov/infant-toddler-nutrition/breast-milk/how-to-clean-and-sanitize-breast-pumps.html', 'reason': 'Web extraction timed out; not used as a cited source.'},
        'results': results,
    }
    target = ROOT / 'private/newsletter-guide/source-checks.json'
    target.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'target': str(target), 'checked': len(results), 'reachable': sum(x['reachable'] for x in results), 'results': results}, ensure_ascii=False, indent=2))
