import concurrent.futures, datetime, json, pathlib, subprocess, urllib.request, urllib.error, xml.etree.ElementTree as ET
from html.parser import HTMLParser

SITE='https://milchpumpe-vergleich.de'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.title=[];self.h1=[];self.in_title=False;self.in_h1=False;self.canonical=None;self.robots=None
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag=='title':self.in_title=True
        if tag=='h1':self.in_h1=True;self.h1.append('')
        if tag=='link' and d.get('rel')=='canonical':self.canonical=d.get('href')
        if tag=='meta' and d.get('name')=='robots':self.robots=d.get('content')
    def handle_endtag(self,tag):
        if tag=='title':self.in_title=False
        if tag=='h1':self.in_h1=False
    def handle_data(self,data):
        if self.in_title:self.title.append(data)
        if self.in_h1:self.h1[-1]+=data

def get(url):
    try:r=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'MilchpumpeVergleich-PublicAudit/1.0'}),timeout=20)
    except urllib.error.HTTPError as e:r=e
    with r:return r.status,r.url,r.read(1024*1024).decode('utf-8',errors='replace')

out=subprocess.run(['npx.cmd','tsx','-e','import {GUIDE_ARTICLES} from "./src/data.ts"; console.log(JSON.stringify(GUIDE_ARTICLES.map(g=>({slug:g.slug,title:g.title}))));'],capture_output=True,text=True,encoding='utf-8',errors='replace',check=True)
guides=json.loads(out.stdout); assert len({g['slug'] for g in guides})==len(guides)
sitemap_status,sitemap_url,sitemap=get(SITE+'/sitemap.xml')
sitemap_urls=[e.text for e in ET.fromstring(sitemap).iter() if e.tag.endswith('loc')]

def audit(guide):
    url=SITE+'/ratgeber/'+guide['slug']+'/'
    try:
        status,final,html=get(url); p=Page();p.feed(html)
        canonical=p.canonical
        confirmed=status==200 and final.rstrip('/')==url.rstrip('/') and canonical and canonical.rstrip('/')==url.rstrip('/') and len(p.h1)==1 and bool(p.h1[0].strip())
        return {'slug':guide['slug'],'url':url,'status':status,'finalUrl':final,'title':''.join(p.title),'h1':p.h1,'canonical':canonical,'robots':p.robots,'inPublicSitemap':url in sitemap_urls,'matchingArticleHtmlConfirmed':bool(confirmed),'gscIndexStatus':'not checked in this public audit'}
    except Exception as e:return {'slug':guide['slug'],'url':url,'error':str(e),'matchingArticleHtmlConfirmed':False}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(audit,guides))
summary={'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'localArticles':len(rows),'publicSitemapStatus':sitemap_status,'publicSitemapUrls':len(sitemap_urls),'publicSitemapIndividualGuides':sum('/ratgeber/' in u and u.rstrip('/')!=SITE+'/ratgeber' for u in sitemap_urls),'matchingArticleHtmlConfirmed':sum(r['matchingArticleHtmlConfirmed'] for r in rows),'unconfirmedArticles':sum(not r['matchingArticleHtmlConfirmed'] for r in rows),'statuses':{str(s):sum(r.get('status')==s for r in rows) for s in sorted({r['status'] for r in rows if 'status' in r})},'limits':'Public reachability/sitemap audit only, not Google index status or ranking performance. A valid canonical and H1 do not replace a full editorial review.'}
pathlib.Path('docs/public-live-audit.json').write_text(json.dumps({'summary':summary,'articles':rows,'sitemapUrls':sitemap_urls},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False))
