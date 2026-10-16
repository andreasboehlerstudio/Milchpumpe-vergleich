# /// script
# requires-python = ">=3.11"
# dependencies = ["reportlab==5.0.1", "pypdf==6.20.1", "pymupdf==1.28.2", "pillow==12.3.0", "fonttools==4.67.0"]
# ///
"""Build five blank four-page AcroForm masters and faithful real-page previews.
Run: uv run tools/free-guides/build.py
Only tools/free-guides, five approved public targets, and private evidence are written.
"""
from pathlib import Path
from io import BytesIO
import hashlib,json,sys,unicodedata,re
from html import escape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from fontTools.ttLib import TTFont as Font
from pypdf import PdfReader,PdfWriter
from pypdf.generic import DictionaryObject,NameObject,NumberObject,ArrayObject,DecodedStreamObject,BooleanObject
import pymupdf as fitz
from PIL import Image,ImageDraw,ImageFilter
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent; ROOT=HERE.parents[1]
OUT=ROOT/'private/free-guides-production'; ASSETS=ROOT/'tools/purchase-guide/assets'
W,H=A4; M=42; CW=W-2*M
CREAM='#fff9ee'; PAPER='#fffefb'; PETROL='#086d61'; DARK='#233c37'; MUTED='#526660'; MINT='#e9f0e9'; CORAL='#cf765d'; LINE='#c7d5cb'
SOURCES={s['id']:s for s in json.loads((HERE/'sources.json').read_text(encoding='utf-8'))['sources']}
SOURCE_LABELS={1:('Gesund ins Leben · Muttermilch abpumpen','gesund-ins-leben.de · Kühlung und Transport'),2:('BZfE · Muttermilch abpumpen','bzfe.de · Reinigung und Beratungsweg'),3:('Nationale Stillkommission · Umgang mit Muttermilch','mri.bund.de · gesundes eigenes Kind; Abschnitt 2/3.1'),4:('§ 7 Abs. 2 MuSchG · Freistellung','gesetze-im-internet.de · Voraussetzungen im Volltext'),5:('§ 23 Abs. 1 MuSchG · Entgelt und Pausen','gesetze-im-internet.de · Freistellung nach § 7'),6:('Familienportal des Bundes · Stillfreistellung','familienportal.de · gilt auch für das Abpumpen'),9:('Elvie · Perfecting Size and Fit','elvie.com · US-orientiert; Pump/Stride ≠ Stride 2'),10:('Elvie · Size Guide','elvie.com · modellbezogene Teilezuordnung'),11:('Medela · Room to Move','medela.com · englische Größen- und Kompatibilitätshilfe'),12:('Medela · Hands-free Collection Cups, IFU','medela.com · EN/FR/ES; Kap. 6, 7, 10; US/CA-Bezüge'),13:('Medela · Freestyle Hands-free, IFU','medela.com · abweichende Schlauchvorgabe, PDF-S. 23')}
for name,weight in [('ML',300),('MR',400),('MS',600)]: pdfmetrics.registerFont(TTFont(name,str(ASSETS/f'Manrope-{weight}.ttf')))
pdfmetrics.registerFontFamily('MR',normal='MR',bold='MS',italic='MR',boldItalic='MS')

def slug(s): return re.sub('[^a-z0-9]+','_',unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()).strip('_')
def overlap(a,b): return min(a[2],b[2])-max(a[0],b[0])>.5 and min(a[3],b[3])-max(a[1],b[1])>.5
class Guide:
    def __init__(self,key,title,short):
        self.key,self.title,self.short=key,title,short;self.page=0;self.layout=[];self.fields=[];self.source_ids=set()
        self.mem=BytesIO();self.c=canvas.Canvas(self.mem,pagesize=A4,pageCompression=1,invariant=1,initialFontName='MR',initialFontSize=12)
        self.c.setTitle(title);self.c.setAuthor('Milchpumpe-Vergleich.de');self.c.setSubject('Kostenloser ausfüllbarer Organisationsguide; persönliche Notizen bleiben lokal')
        self.c.setCreator('Milchpumpe-Vergleich.de / tools/free-guides/build.py');self.c.setCatalogEntry('Lang','de-DE');self.c.setViewerPreference('DisplayDocTitle','true')
    def box(self,x,y,w,h,color=MINT,r=7):
        self.c.setFillColor(HexColor(color));self.c.roundRect(x,H-y-h,w,h,r,stroke=0,fill=1)
    def line(self,x,y,w=CW):
        self.c.setStrokeColor(HexColor(LINE));self.c.setLineWidth(.65);self.c.line(x,H-y,x+w,H-y)
    def text(self,s,x,y,w=CW,size=12,leading=None,font='MR',color=DARK,track=True,url=None):
        p=Paragraph(escape(s).replace('\n','<br/>'),ParagraphStyle('p',fontName=font,fontSize=size,leading=leading or size*1.4,textColor=HexColor(color),splitLongWords=False))
        _,h=p.wrap(w,1200)
        if track:
            assert x>=M-1 and x+w<=W-M+1 and y>=58 and y+h<=790,(self.key,self.page,s,y,h)
            self.layout.append(dict(page=self.page,kind='text',text=s,rect=[x,y,x+w,y+h]))
        p.drawOn(self.c,x,H-y-h)
        if url:self.c.linkURL(url,(x,H-y-h,x+w,H-y),relative=0,thickness=0)
        return y+h
    def start(self,title,intro):
        self.page+=1;self.box(0,0,W,H,CREAM,0)
        self.text('Milchpumpe-Vergleich.de',M,27,265,8.4,font='MS',color=PETROL,track=False)
        self.text(self.short.upper(),W-M-235,28,235,8,color=MUTED,track=False)
        self.line(M,51)
        self.box(M,50.3,19,1.4,CORAL,0)
        self.text(f'{self.page:02d} / 04',W-M-45,H-31,45,9.2,font='MS',color=PETROL,track=False)
        self.text('Notizen bleiben lokal · nichts zurücksenden · Oktober 2026',M,H-31,CW-60,8,color=MUTED,track=False)
        y=self.text(title,M,72,CW,26,32,'ML')
        return self.text(intro,M,y+11,CW,12,17,color=MUTED)+19
    def section(self,title,y):
        return self.text(title,M,y,CW,11,15,'MS',PETROL)+10
    def note(self,s,y,color=MINT,size=11):
        p=Paragraph(escape(s),ParagraphStyle('note',fontName='MR',fontSize=size,leading=size*1.4,textColor=HexColor(DARK)))
        _,h=p.wrap(CW-26,1000);self.box(M,y,CW,h+22,color);self.text(s,M+13,y+11,CW-26,size,size*1.4)
        return y+h+34
    def field(self,label,y,x=M,w=CW,h=29,tip=None):
        b=self.text(label,x,y,w,10.5,14,'MS',MUTED)
        top=b+5; name=f'{self.key}_p{self.page}_{len(self.fields)+1:03d}_{slug(label)[:55]}'
        multiline=h>=40;limit=max(12,int((w-8)/7))*max(1,int((h-8)/16))
        tooltip=label+' — '+(tip or 'Eigene Angaben eintragen; Unbekanntes offenlassen. Nur in deiner lokalen Kopie speichern.')
        self.c.acroForm.textfield(name=name,tooltip=tooltip,x=x,y=H-top-h,width=w,height=h,fontName='Helvetica',fontSize=12,textColor=HexColor(DARK),fillColor=HexColor(PAPER),borderColor=HexColor(LINE),borderWidth=.6,forceBorder=True,value='',maxlen=limit,fieldFlags='multiline' if multiline else '',annotationFlags='print',borderStyle='solid')
        entry=dict(page=self.page,kind='field',name=name,label=label,tooltip=tooltip,rect=[x,top,x+w,top+h],type='text',maxLength=limit)
        self.fields.append(entry);self.layout.append(entry)
        return top+h+12
    def row(self,labels,y,h=29,tips=None):
        gap=16;w=(CW-gap*(len(labels)-1))/len(labels);end=y
        for i,label in enumerate(labels): end=max(end,self.field(label,y,M+i*(w+gap),w,h,(tips or {}).get(i)))
        return end
    def check(self,label,y,x=M,w=CW,tip=None,size=11):
        name=f'{self.key}_p{self.page}_{len(self.fields)+1:03d}_{slug(label)[:55]}'
        self.c.acroForm.checkbox(name=name,tooltip=label+' — '+(tip or 'Nur ankreuzen, wenn für deinen Ablauf geprüft. Nicht vorausgewählt.'),x=x,y=H-y-13,size=12,checked=False,buttonStyle='check',shape='square',fillColor=HexColor(PAPER),borderColor=HexColor(PETROL),textColor=HexColor(PETROL),borderWidth=.7,forceBorder=True,annotationFlags='print')
        entry=dict(page=self.page,kind='field',name=name,label=label,tooltip=label+' — '+(tip or 'Nur nach eigener Prüfung ankreuzen.'),rect=[x,y+1,x+12,y+13],type='checkbox')
        self.fields.append(entry);self.layout.append(entry)
        bottom=self.text(label,x+21,y-1,w-21,size,15)
        return max(y+16,bottom)+7
    def options(self,labels,y):
        w=CW/len(labels);return max(self.check(s,y,M+i*w,w-8,size=10.4) for i,s in enumerate(labels))+3
    def sources(self,ids,y):
        self.source_ids.update(ids);self.line(M,y);y+=10
        y=self.text('QUELLEN · Titel anklicken · erneut abgerufen am 16.10.2026',M,y,CW,9.5,13,'MS',PETROL)+8
        w=(CW-18)/2;ends=[y,y]
        for i,idx in enumerate(ids):
            col=i%2;x=M+col*(w+18);title,scope=SOURCE_LABELS[idx]
            b=self.text(f'[{idx}] '+title,x,ends[col],w,9.3,12.6,'MS',PETROL,url=SOURCES[idx]['url'])
            ends[col]=self.text(scope,x,b+2,w,9,12,color=MUTED)+8
        return max(ends)
    def end(self):self.c.showPage()
    def save(self):
        assert self.page==4
        # Preflight the full collected form geometry before serializing public files.
        for a in self.fields:
            r=a['rect'];assert M<=r[0]<r[2]<=W-M+.1 and 58<=r[1]<r[3]<=790
        for i,a in enumerate(self.layout):
            for b in self.layout[i+1:]:
                if a['page']==b['page'] and (a['kind']=='field' or b['kind']=='field'):assert not overlap(a['rect'],b['rect']),(self.key,'collision',a,b)
        self.c.save();writer=PdfWriter(clone_from=PdfReader(BytesIO(self.mem.getvalue())));embed_form_font(writer)
        writer.add_metadata({'/Title':self.title,'/Author':'Milchpumpe-Vergleich.de','/CreationDate':"D:20261016000000+02'00'",'/ModDate':"D:20261016000000+02'00'"})
        pdf=ROOT/f'public/downloads/{self.key}.pdf';pdf.parent.mkdir(parents=True,exist_ok=True);writer.write(pdf)
        (OUT/f'{self.key}-layout.json').write_text(json.dumps({'title':self.title,'layout':self.layout,'fields':self.fields},ensure_ascii=False,indent=2),encoding='utf-8')
        render(self,pdf)
        return {'slug':self.key,'title':self.title,'pdfPath':pdf.relative_to(ROOT).as_posix(),'previewPath':f'public/free-guide-assets/{self.key}-preview.webp','sources':[{**SOURCES[i],'accessed':'2026-10-16','refreshEvidence':'private/free-guides-production/source-refresh.json'} for i in sorted(self.source_ids)]}

def embed_form_font(writer):
    raw=(ASSETS/'Manrope-400.ttf').read_bytes();font=Font(BytesIO(raw));scale=1000/font['head'].unitsPerEm;cmap=font.getBestCmap();hmtx=font['hmtx'].metrics;widths=[]
    for i in range(256):
        try:ch=bytes([i]).decode('cp1252')
        except UnicodeDecodeError:ch=' '
        widths.append(NumberObject(round(hmtx[cmap.get(ord(ch),'.notdef')][0]*scale)))
    stream=DecodedStreamObject();stream.set_data(raw);stream[NameObject('/Length1')]=NumberObject(len(raw))
    desc=DictionaryObject({NameObject('/Type'):NameObject('/FontDescriptor'),NameObject('/FontName'):NameObject('/ManropePG-Regular'),NameObject('/Flags'):NumberObject(32),NameObject('/FontBBox'):ArrayObject([NumberObject(round(getattr(font['head'],k)*scale)) for k in ['xMin','yMin','xMax','yMax']]),NameObject('/ItalicAngle'):NumberObject(0),NameObject('/Ascent'):NumberObject(round(font['hhea'].ascent*scale)),NameObject('/Descent'):NumberObject(round(font['hhea'].descent*scale)),NameObject('/CapHeight'):NumberObject(700),NameObject('/StemV'):NumberObject(80),NameObject('/FontFile2'):writer._add_object(stream)})
    replacement=DictionaryObject({NameObject('/Type'):NameObject('/Font'),NameObject('/Subtype'):NameObject('/TrueType'),NameObject('/BaseFont'):NameObject('/ManropePG-Regular'),NameObject('/Encoding'):NameObject('/WinAnsiEncoding'),NameObject('/FirstChar'):NumberObject(0),NameObject('/LastChar'):NumberObject(255),NameObject('/Widths'):ArrayObject(widths),NameObject('/FontDescriptor'):writer._add_object(desc)})
    acro=writer._root_object['/AcroForm'];original=acro['/DR']['/Font']['/Helv'].get_object();original.clear();original.update(replacement)
    for obj in writer._objects:
        if isinstance(obj,DictionaryObject) and obj.get('/Type')=='/Font' and obj.get('/BaseFont')=='/Helvetica':obj.clear();obj.update(replacement)
    acro[NameObject('/NeedAppearances')]=BooleanObject(False)
    acro.pop('/XFA',None)

def render(g,pdf):
    folder=OUT/g.key;folder.mkdir(parents=True,exist_ok=True);doc=fitz.open(pdf);thumbs=[]
    for i,page in enumerate(doc):
        pix=page.get_pixmap(matrix=fitz.Matrix(2,2),alpha=False);pix.save(folder/f'page-{i+1:02d}.png')
        im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples);im.thumbnail((420,594),Image.Resampling.LANCZOS)
        tile=Image.new('RGB',(448,630),'#e7e7df');tile.paste(im,((448-im.width)//2,10));ImageDraw.Draw(tile).text((18,610),f'{g.short} / {i+1:02d}',fill=DARK);thumbs.append(tile)
    sheet=Image.new('RGB',(896,1260),'#e7e7df')
    for i,tile in enumerate(thumbs):sheet.paste(tile,((i%2)*448,(i//2)*630))
    sheet.save(folder/'contact-sheet.png')
    # Faithful flat artwork: actual blank page 1 plus actual page 2, never fabricated.
    bg=Image.new('RGB',(1200,1080),CREAM)
    for page_id,xy,width in [(1,(640,100),480),(0,(65,44),650)]:
        im=Image.open(folder/f'page-{page_id+1:02d}.png').convert('RGB');im=im.resize((width,round(width*H/W)),Image.Resampling.LANCZOS)
        shadow=Image.new('RGBA',bg.size,(0,0,0,0));d=ImageDraw.Draw(shadow);d.rectangle((xy[0]+5,xy[1]+8,xy[0]+width+5,xy[1]+im.height+8),fill=(35,60,55,40));shadow=shadow.filter(ImageFilter.GaussianBlur(8));bg=Image.alpha_composite(bg.convert('RGBA'),shadow).convert('RGB');bg.paste(im,xy)
    target=ROOT/f'public/free-guide-assets/{g.key}-preview.webp';target.parent.mkdir(parents=True,exist_ok=True);bg.save(target,'WEBP',quality=92,method=6)

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    from content import produce
    results=produce(Guide)
    (OUT/'build-artifacts.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(results,ensure_ascii=True))
if __name__=='__main__':main()