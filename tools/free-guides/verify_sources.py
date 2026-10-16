"""Refresh only public primary evidence; writes only private/free-guides-production."""
from pathlib import Path
import concurrent.futures, datetime, hashlib, json, urllib.request
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'private/free-guides-production'; OUT.mkdir(parents=True,exist_ok=True)
ledger=json.loads((ROOT/'tools/free-guides/sources.json').read_text(encoding='utf-8'))
def fetch(s):
    r={'id':s['id'],'url':s['url'],'retrievedAt':datetime.datetime.now(datetime.timezone.utc).isoformat()}
    try:
        req=urllib.request.Request(s['url'],headers={'User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(req,timeout=50) as res:
            raw=res.read(); r.update(status=res.status,finalUrl=res.url,contentType=res.headers.get('Content-Type'),bytes=len(raw),sha256=hashlib.sha256(raw).hexdigest())
        suffix='.pdf' if raw.startswith(b'%PDF') else '.html'
        dest=OUT/f'source-{s["id"]}{suffix}'; dest.write_bytes(raw); r['file']=str(dest)
    except Exception as e: r['error']=str(e)
    return r
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: results=list(pool.map(fetch,[s for s in ledger['sources'] if s['id'] in [1,2,3,4,5,6,9,10,11,12,13]]))
(OUT/'source-refresh.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
original=ROOT/'public/downloads/dein-milchpumpen-kaufcheck.pdf'
(OUT/'original-baseline.json').write_text(json.dumps({'path':str(original),'sha256':hashlib.sha256(original.read_bytes()).hexdigest(),'bytes':original.stat().st_size},indent=2),encoding='utf-8')
print(json.dumps(results,ensure_ascii=True))
