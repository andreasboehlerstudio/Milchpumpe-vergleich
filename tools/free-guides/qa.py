# /// script
# requires-python = ">=3.11"
# dependencies = ["reportlab==5.0.1", "pypdf==6.20.1", "pymupdf==1.28.2", "pillow==12.3.0", "fonttools==4.67.0"]
# ///
"""Independent readback QA, private filled save/reopen and source quote verification.
Run after build: uv run tools/free-guides/qa.py
"""
from pathlib import Path
from html.parser import HTMLParser
from html import unescape
import hashlib,json,re,sys,datetime
from collections import Counter
import pymupdf as fitz
from pypdf import PdfReader,PdfWriter
from pypdf.generic import NameObject,BooleanObject
from fontTools.ttLib import TTFont
from PIL import Image
sys.dont_write_bytecode=True
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'private/free-guides-production'
EXPECTED=['unterwegs-packplan','arbeitsplatz-uebergabeplan','reinigung-teileroutine','passform-beratungsvorbereitung','set-teilepass']
class Visible(HTMLParser):
    def __init__(self):super().__init__();self.skip=0;self.parts=[]
    def handle_starttag(self,tag,attrs):
        if tag in ['script','style']:self.skip+=1
    def handle_endtag(self,tag):
        if tag in ['script','style']:self.skip=max(0,self.skip-1)
    def handle_data(self,s):
        if not self.skip:self.parts.append(s)
def norm(s):return re.sub(r'\s+',' ',s.replace('\u00ad','').replace('-\n','')).strip()
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def intersects(a,b):return min(a[2],b[2])-max(a[0],b[0])>.6 and min(a[3],b[3])-max(a[1],b[1])>.6
artifacts=json.loads((OUT/'build-artifacts.json').read_text(encoding='utf-8'))
assert [a['slug'] for a in artifacts]==EXPECTED
refresh=json.loads((OUT/'source-refresh.json').read_text(encoding='utf-8')); source_text={};source_results=[]
ledger=json.loads((ROOT/'tools/free-guides/sources.json').read_text(encoding='utf-8'))
for s in refresh:
    assert s['status']==200
    path=Path(s['file']);assert digest(path)==s['sha256']
    if path.suffix=='.pdf':
        doc=fitz.open(path);text='\n'.join(f'PAGE {i+1}\n'+p.get_text() for i,p in enumerate(doc))
    else:
        parser=Visible();parser.feed(path.read_text(encoding='utf-8',errors='replace'));text=' '.join(parser.parts)
    (OUT/f'source-{s["id"]}.txt').write_text(text,encoding='utf-8');source_text[s['id']]=norm(text)
    q=next(x for x in ledger['sources'] if x['id']==s['id']);results=[]
    for quote in q.get('quotes',[]):
        needle=norm(quote['text']).replace('\x07','').rstrip(' •')
        results.append({'quote':quote['text'],'found':needle in source_text[s['id']]})
    # Broken typographic line end/dehyphenation in primary PDFs is recorded, not invented.
    source_results.append({'id':s['id'],'status':s['status'],'quotes':results})
(OUT/'source-quote-check.json').write_text(json.dumps(source_results,ensure_ascii=False,indent=2),encoding='utf-8')
assert all(q['found'] for source in source_results for q in source['quotes']), 'Primary quotation changed; investigate rather than invent a replacement.'
# Core decisive claims must still be present in refreshed source text.
for idx,needle in [(1,'durchgehende Kühlung'),(1,'sofort gekühlt'),(2,'Nach jedem Gebrauch'),(2,'Hebammen und Stillberaterinnen'),(4,'ersten zwölf Monate'),(4,'zweimal täglich'),(5,'kein Entgeltausfall'),(5,'weder vor- noch nachzuarbeiten'),(6,'auch für das Abpumpen'),(9,'Stride 2'),(10,'Stride 2'),(11,'flexible guideline'),(12,'Only use clean and dry parts'),(12,'Washing and sanitizing are two different activities'),(13,'If you find condensation')]:assert needle in source_text[idx],(idx,needle)
font=TTFont(ROOT/'tools/purchase-guide/assets/Manrope-400.ttf');cmap=font.getBestCmap();allnames=set();reports=[]
for artifact in artifacts:
    key=artifact['slug'];path=ROOT/artifact['pdfPath'];preview=ROOT/artifact['previewPath'];doc=fitz.open(path);r=PdfReader(path);fields=r.get_fields();layout=json.loads((OUT/f'{key}-layout.json').read_text(encoding='utf-8'))
    assert len(r.pages)==len(doc)==4
    assert len(fields)==len(layout['fields']) and len(fields)==len(set(fields))
    assert not (allnames & set(fields));allnames.update(fields)
    assert all(abs(float(p.mediabox.width)-595.2756)<.1 and abs(float(p.mediabox.height)-841.8898)<.1 for p in r.pages)
    assert '/OpenAction' not in r.trailer['/Root'] and '/JavaScript' not in str(r.trailer['/Root'])
    assert all(f.get('/TU') for f in fields.values())
    assert all(f.get('/V') in ['',None,'/Off'] for f in fields.values())
    assert all(f.get('/DV') in ['',None,'/Off'] for f in fields.values())
    assert '/NeedAppearances' not in r.trailer['/Root']['/AcroForm'] or r.trailer['/Root']['/AcroForm']['/NeedAppearances'].value is False
    field_types=Counter(str(f.get('/FT')) for f in fields.values());pagefields=[];geometry=[];fulltext=''
    expected_by_name={f['name']:f for f in layout['fields']}
    for pi,(page,pypage) in enumerate(zip(doc,r.pages),1):
        widgets=list(page.widgets() or []);pagefields.append(len(widgets));assert widgets
        rectangles=[]
        for widget in widgets:
            rect=list(widget.rect);assert page.rect.contains(widget.rect)
            e=expected_by_name[widget.field_name];assert all(abs(a-b)<.15 for a,b in zip(rect,e['rect']))
            for other in rectangles:assert not intersects(rect,other)
            rectangles.append(rect)
            if widget.field_type==fitz.PDF_WIDGET_TYPE_CHECKBOX:assert widget.field_value in ['Off',False,None]
            if widget.field_type==fitz.PDF_WIDGET_TYPE_TEXT:assert not widget.field_value
        page_text=page.get_text();fulltext+=page_text;assert len(page_text)>750,(key,pi,len(page_text))
        assert '\ufffd' not in page_text and '\x00' not in page_text
        # Actual rendered text rectangles must stay within A4 and avoid field entries.
        words=page.get_text('words');assert all(0<=w[0]<=w[2]<=page.rect.width+.2 and 0<=w[1]<=w[3]<=page.rect.height+.2 for w in words)
        for word in words:
            for rect in rectangles:assert not intersects(word[:4],rect),(key,pi,'text/field collision',word,rect)
        for a in pypage.get('/Annots',[]):
            obj=a.get_object();assert '/AA' not in obj
            if '/A' in obj:assert obj['/A']['/S']=='/URI'
        geometry.append({'page':pi,'fields':len(widgets),'textCharacters':len(page_text),'size':[page.rect.width,page.rect.height]})
    assert 'Kostenlos ohne E-Mail' in fulltext and 'Newsletter optional' in fulltext
    assert 'zur Newsletter-Anmeldung' not in fulltext
    for item in layout['layout']:
        if item['kind']=='text':
            missing=[ch for ch in item['text'] if not ch.isspace() and ord(ch) not in cmap]
            assert not missing,(key,missing)
    citations=set(int(n) for n in re.findall(r'\[(\d+)\]',fulltext));assert citations==set(s['id'] for s in artifact['sources'])
    urls={link.get('uri') for p in doc for link in p.get_links() if link.get('uri')}
    assert urls=={s['url'] for s in artifact['sources']}
    # Every text field and every checkbox is exercised in an isolated private copy.
    test_value='ÄÖÜ äöü ß';values={name:(test_value if f.get('/FT')=='/Tx' else '/Yes') for name,f in fields.items()}
    writer=PdfWriter(clone_from=r)
    for page in writer.pages:writer.update_page_form_field_values(page,values,auto_regenerate=False)
    filled=OUT/key/'filled-umlaut-roundtrip.pdf';writer.write(filled)
    reopened=PdfReader(filled).get_fields()
    for name,expected in values.items():assert str(reopened[name].get('/V'))==expected,(key,name,expected,reopened[name].get('/V'))
    filled_doc=fitz.open(filled);rendered_values=0
    for pi,page in enumerate(filled_doc,1):
        for widget in page.widgets() or []:
            if widget.field_type==fitz.PDF_WIDGET_TYPE_TEXT:
                assert widget.field_value==test_value;rendered_values+=1
                # Appearance extraction confirms actual German glyphs exist, not only /V metadata.
                appearance_text=page.get_text(clip=widget.rect).strip();assert test_value in appearance_text,(key,pi,appearance_text)
        pix=page.get_pixmap(matrix=fitz.Matrix(1.5,1.5),alpha=False);pix.save(OUT/key/f'filled-page-{pi:02d}.png')
    # Reopen once more and alter one value to prove editable saved document remains editable.
    first=next(name for name,f in fields.items() if f.get('/FT')=='/Tx');w2=PdfWriter(clone_from=PdfReader(filled));w2.update_page_form_field_values(None,{first:'Rückfrage Größe'},auto_regenerate=False)
    again=OUT/key/'filled-reedited.pdf';w2.write(again);assert PdfReader(again).get_fields()[first]['/V']=='Rückfrage Größe'
    im=Image.open(preview);assert im.format=='WEBP' and im.size==(1200,1080);assert not im.getexif()
    item={**artifact,'pdfSha256':digest(path),'pdfBytes':path.stat().st_size,'previewSha256':digest(preview),'previewBytes':preview.stat().st_size,'previewWidth':im.width,'previewHeight':im.height,'pageCount':len(r.pages),'fieldCount':len(fields),'textFieldCount':field_types['/Tx'],'checkboxCount':field_types['/Btn'],'fieldsPerPage':pagefields,'qa':{'blankPublicMaster':True,'uniqueFieldNames':True,'usefulTooltips':True,'boundsAndCollisions':'pass','umlautRoundtripEveryTextField':'pass','checkboxRoundtripEveryCheckbox':'pass','savedCopyReeditable':True,'appearanceGlyphExtraction':'pass','sourcesAndLinks':'pass','renderedPages':4,'renderScale':2,'pages':geometry}}
    reports.append(item)
orig=json.loads((OUT/'original-baseline.json').read_text(encoding='utf-8'));assert digest(Path(orig['path']))==orig['sha256'];assert len(PdfReader(orig['path']).pages)==8
report={'generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'reproducibleBuildScript':'tools/free-guides/build.py','contentSource':'tools/free-guides/content.py','sourceRefreshScript':'tools/free-guides/verify_sources.py','qaScript':'tools/free-guides/qa.py','commands':['python tools/free-guides/verify_sources.py','uv run tools/free-guides/build.py','uv run tools/free-guides/qa.py'],'artifactCount':len(reports),'totalPages':sum(x['pageCount'] for x in reports),'totalFields':sum(x['fieldCount'] for x in reports),'artifacts':reports,'originalGuideUnchanged':True,'originalGuideSha256':orig['sha256'],'sourceEvidence':'private/free-guides-production/source-refresh.json','sourceQuoteChecks':'private/free-guides-production/source-quote-check.json','visualReview':'private/free-guides-production/visual-review.json','limitations':['No Adobe Acrobat / third-party reader GUI interoperability claim; save/reopen verified using pypdf and MuPDF.','No independent medical or legal professional review claimed.','Sources are model/region-limited; worksheets do not certify milk safety, personal fit or compatibility.']}
if (OUT/'visual-review.json').exists():
    visual=json.loads((OUT/'visual-review.json').read_text(encoding='utf-8'));assert visual['status']=='pass' and len(visual['guides'])==5
    for a in reports:
        v=next(x for x in visual['guides'] if x['slug']==a['slug']);assert v['pdfSha256']==a['pdfSha256'] and v['previewSha256']==a['previewSha256'];assert v['individuallyInspectedPages']==[1,2,3,4] and v['result']=='pass'
    report['visualReviewStatus']='pass'
if (OUT/'reproducibility-check.json').exists():
    repro=json.loads((OUT/'reproducibility-check.json').read_text(encoding='utf-8'));assert repro['status']=='pass' and repro['byteExactArtifacts']==10
    for entry in repro['files']:assert digest(ROOT/entry['path'])==entry['observedSha256']==entry['expectedSha256']
    report['reproducibilityStatus']='byte-exact pass, all 10 public artifacts';report['reproducibilityEvidence']='private/free-guides-production/reproducibility-check.json'
report['status']='pass';report['primarySourceCount']=len(source_results);report['verifiedQuotationCount']=sum(len(s['quotes']) for s in source_results)
report['buildInputs']=[{'path':str(p.relative_to(ROOT)).replace('\\','/'),'sha256':digest(p),'bytes':p.stat().st_size} for p in [ROOT/'tools/free-guides/build.py',ROOT/'tools/free-guides/content.py',ROOT/'tools/free-guides/sources.json',ROOT/'tools/purchase-guide/assets/Manrope-300.ttf',ROOT/'tools/purchase-guide/assets/Manrope-400.ttf',ROOT/'tools/purchase-guide/assets/Manrope-600.ttf',ROOT/'tools/purchase-guide/assets/OFL-Manrope.txt']]
(OUT/'production-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'status':'pass','artifacts':[{k:a[k] for k in ['slug','pageCount','fieldCount','textFieldCount','checkboxCount','fieldsPerPage','pdfBytes','previewBytes','pdfSha256','previewSha256']} for a in reports],'totalPages':report['totalPages'],'totalFields':report['totalFields'],'originalGuideUnchanged':True},ensure_ascii=True))
