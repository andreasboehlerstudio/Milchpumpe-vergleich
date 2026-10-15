# /// script
# requires-python = ">=3.11"
# dependencies = ["reportlab==5.0.1", "pypdf==6.20.1", "pymupdf==1.28.2", "pillow==12.3.0", "fonttools==4.67.0"]
# ///
"""Reproducible private eight-page A4 guide. No network or website writes."""
from pathlib import Path
from io import BytesIO
import hashlib
import json
from html import escape

from fontTools.ttLib import TTFont as Font
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DictionaryObject, NameObject, NumberObject, ArrayObject, DecodedStreamObject, FloatObject
import pymupdf as fitz
from PIL import Image, ImageOps, ImageDraw

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OUT = ROOT / 'private/newsletter-guide'
ASSETS = HERE / 'assets'
DATA = json.loads((HERE / 'content.json').read_text(encoding='utf-8'))
W, H = A4
M = 44
CW = W - 2*M
CREAM = '#fff9ee'
PAPER = '#fffefb'
PETROL = '#086d61'
DARK = '#233c37'
MUTED = '#526660'
MINT = '#e9f0e9'
CORAL = '#cf765d'
LINE = '#c7d5cb'
layout = []
page_no = 0


def font_setup():
    for name, weight in [('ML', 300), ('MR', 400), ('MS', 600)]:
        target = ASSETS / f'Manrope-{weight}.ttf'
        f = instantiateVariableFont(Font(ASSETS / 'Manrope-Variable.ttf'), {'wght': weight}, inplace=True)
        # ReportLab deduplicates by PostScript name, NOT registerFont alias.
        # Static instances must get distinct names or all weights collapse.
        style_name = {300: 'Light', 400: 'Regular', 600: 'SemiBold'}[weight]
        replacements = {1: 'Manrope Purchase Guide', 2: style_name,
                        4: 'Manrope Purchase Guide '+style_name,
                        6: 'ManropePG-'+style_name, 16: 'Manrope Purchase Guide', 17: style_name}
        for record in f['name'].names:
            if record.nameID in replacements:
                record.string = replacements[record.nameID].encode(record.getEncoding())
        # Fixed timestamps make generated font bytes stable.
        f['head'].modified = f['head'].created
        f.recalcTimestamp = False
        f.save(target, reorderTables=True)
        pdfmetrics.registerFont(TTFont(name, str(target)))
    pdfmetrics.registerFontFamily('MR', normal='MR', bold='MS', italic='MR', boldItalic='MS')


def box(x, y, w, h, color, radius=0, stroke=None):
    c.setFillColor(HexColor(color))
    c.setStrokeColor(HexColor(stroke or color))
    c.setLineWidth(.65)
    if radius:
        c.roundRect(x, H-y-h, w, h, radius, fill=1, stroke=int(bool(stroke)))
    else:
        c.rect(x, H-y-h, w, h, fill=1, stroke=int(bool(stroke)))


def line(x0, y0, x1, y1, color=LINE, width=.6):
    c.setStrokeColor(HexColor(color)); c.setLineWidth(width)
    c.line(x0, H-y0, x1, H-y1)


def para(text, x, y, width, size=10.5, leading=None, color=DARK, font='MR', track=True):
    style = ParagraphStyle('p', fontName=font, fontSize=size, leading=leading or size*1.48,
                           textColor=HexColor(color), splitLongWords=False, spaceAfter=0)
    p = Paragraph(escape(text).replace('\n', '<br/>'), style)
    _, h = p.wrap(width, 1000)
    if track:
        assert x >= 30 and x+width <= W-30 and y >= 22 and y+h <= H-44, (page_no, text, y, h)
        layout.append({'page': page_no, 'text': text, 'rect_top': [x, y, x+width, y+h]})
    p.drawOn(c, x, H-y-h)
    return y+h


def label(text, x, y, width=CW, color=PETROL):
    return para(text, x, y, width, size=8.4, leading=12, font='MS', color=color)


def field(name, title, x, y, width, height=29, size=10):
    label(title, x, y, width, color=MUTED)
    top = y+18
    c.acroForm.textfield(name=name, tooltip=title, x=x, y=H-top-height,
        width=width, height=height, fontName='Helvetica', fontSize=size,
        textColor=HexColor(DARK), fillColor=HexColor(PAPER), borderColor=HexColor(LINE),
        borderWidth=.7, forceBorder=True, value='', maxlen=max(24,int(width/5)), fieldFlags=0,
        annotationFlags='print', borderStyle='underlined')
    layout.append({'page': page_no, 'field': name, 'rect_top': [x, top, x+width, top+height]})
    return top+height


def check(text, x, y, width, size=10):
    box(x, y+3, 10, 10, PAPER, radius=1.3, stroke=PETROL)
    end = para(text, x+20, y, width-20, size=size, leading=14.5)
    return max(y+16,end)


def link(text, url, x, y, width=CW, size=9):
    bottom = para(text, x, y, width, size=size, leading=size*1.35, font='MS', color=PETROL)
    c.linkURL(url, (x,H-bottom-2,x+width,H-y+2), relative=0, thickness=0)
    return bottom


def article(index, y=754):
    a = DATA['articles'][index]
    link('Weiterlesen: '+a['label']+'  /', 'https://milchpumpe-vergleich.de/ratgeber/'+a['slug']+'/', M,y)


def start(section, title=None, intro=None):
    global page_no
    page_no += 1
    box(0,0,W,H,CREAM)
    label(DATA['author'],M,28,width=280)
    para('KAUFCHECK / '+section.upper(),W-224,29,180,size=7.5,leading=10,color=MUTED)
    line(M,53,W-M,53)
    # Folio rail and running footer remain understated.
    para('Milchpumpe-Vergleich.de · '+DATA['edition'],M,H-34,CW-40,size=7.2,leading=10,color=MUTED,track=False)
    para(f'{page_no:02d}',W-M-20,H-36,20,size=10,leading=12,font='MS',color=PETROL,track=False)
    if title:
        end=para(title,M,79,CW,size=29,leading=35,font='ML')
        if intro:
            return para(intro,M,end+15,CW,size=10.5,leading=16,color=MUTED)+26
        return end+22
    return 80


def end():
    c.showPage()


def cup(x,y,s=1,motor=False):
    c.saveState();c.translate(x,H-y);c.scale(s,s)
    c.setStrokeColor(HexColor(PETROL));c.setFillColor(HexColor(PAPER));c.setLineWidth(1.4)
    p=c.beginPath();p.moveTo(-32,0);p.curveTo(-36,-49,-25,-68,0,-68);p.curveTo(25,-68,36,-49,32,0);p.curveTo(27,18,-27,18,-32,0);c.drawPath(p,stroke=1,fill=1)
    c.setStrokeColor(HexColor(LINE));c.ellipse(-22,-51,22,-7,stroke=1,fill=0)
    c.setStrokeColor(HexColor(CORAL));c.line(-15,-56,15,-56)
    if motor:
        c.setFillColor(HexColor(PETROL));c.setStrokeColor(HexColor(PETROL))
        c.roundRect(-24,-4,48,25,10,stroke=0,fill=1)
        c.setFillColor(HexColor(MINT));c.circle(0,8,3,fill=1,stroke=0)
    c.restoreState()


def cover():
    start('Deine Auswahl')
    label('DEINE AUSWAHL. DEIN TEMPO.',M,83)
    para('Dein',M,116,CW,size=42,leading=49,font='ML')
    para('Milchpumpen-Kaufcheck',M,168,CW,size=35,leading=46,font='ML')
    para('\n'.join(DATA['subtitle']),M,239,390,size=17,leading=25,font='ML',color=PETROL)
    # Original editorial still-life: checklist, cup, separated motor.
    box(M,325,CW,195,MINT,28)
    c.saveState();c.translate(144,H-410);c.rotate(-8)
    c.setFillColor(HexColor(PAPER));c.setStrokeColor(HexColor(LINE));c.roundRect(-52,-69,104,138,9,fill=1,stroke=1)
    c.setStrokeColor(HexColor(PETROL))
    for yy in [32,0,-32]:
        c.rect(-34,yy-7,10,10,stroke=1,fill=0);c.line(-12,yy,30,yy)
    c.restoreState()
    cup(306,378,1.25,True)
    box(410,384,70,92,PETROL,18)
    c.setFillColor(HexColor(MINT));c.circle(445,H-408,4,fill=1,stroke=0)
    line(409,433,375,433,CORAL,1.4)
    label('ALLTAG VOR AUSSTATTUNG',M+23,492,CW-46)
    para(DATA['cover']['intro'],M,544,CW,size=11,leading=17)
    for i,(n,t) in enumerate(DATA['cover']['sections']):
        x=M+i*(CW/4)
        label(n,x,614,110,color=PETROL)
        para(t,x,633,120,size=9.1,leading=14)
    para(DATA['cover']['use'],M,676,CW,size=9.2,leading=14,color=MUTED)
    para(DATA['cover']['note'],M,733,CW,size=8.5,leading=12.5,color=MUTED)
    end()


def everyday():
    d=DATA['everyday']; y=start('01 / Alltag',d['heading'],d['intro'])
    top=y
    for group in d['groups']:
        label(group['title'],M,y,300)
        y+=26
        for text in group['checks']:
            y=check(text,M,y,306)+10
        y+=20
    sx=M+337
    box(sx,top,170,270,MINT,18)
    para(d['sidebar_title'],sx+18,top+21,134,size=18,leading=24,font='ML')
    para(d['sidebar'],sx+18,top+100,134,size=10,leading=15.5)
    y=max(y,top+290)
    field('alltag_ort',d['prompts'][0],M,y,CW/2-12)
    field('alltag_voraussetzung',d['prompts'][1],M+CW/2+12,y,CW/2-12)
    field('alltag_prioritaeten',d['prompts'][2],M,y+70,CW)
    end()


def architecture():
    d=DATA['architecture'];y=start('02 / Bauart',d['heading'],d['intro'])
    for i,t in enumerate(d['types']):
        top=y+i*147
        if i==1:box(M-10,top-9,CW+20,140,MINT,16)
        cx=M+49
        if i==0:cup(cx,top+36,.85,True)
        elif i==1:
            cup(cx-11,top+31,.68,False)
            box(cx+26,top+37,25,47,PETROL,7)
            line(cx+11,top+43,cx+25,top+43,PETROL,1)
        else:
            cup(cx,top+41,.68,False)
            line(cx-4,top+26,cx+28,top+7,PETROL,3)
            line(cx+28,top+7,cx+39,top+23,PETROL,3)
        tx=M+124
        label(t['tag'],tx,top,CW-124)
        para(t['title'],tx,top+19,CW-124,size=18,leading=23,font='ML')
        b=para(t['body'],tx,top+49,CW-124,size=10,leading=14.5)
        para(t['check'],tx,b+9,CW-124,size=9.3,leading=14,color=MUTED)
    para(d['bottom'],M,y+451,CW,size=9.6,leading=14.5,color=MUTED)
    article(0)
    end()


def sets():
    d=DATA['sets'];y=start('03 / Single & Double',d['heading'],d['intro'])
    widths=[143,174,CW-317]
    xs=[M,M+143,M+317]
    box(M,y,CW,39,PETROL,10)
    for i,t in enumerate(['SYSTEM','SINGLE / EINZEL','DOUBLE / DOPPEL']):
        label(t,xs[i]+12,y+13,widths[i]-24,color=CREAM)
    y+=48
    for j,row in enumerate(d['rows']):
        heights=[]
        for i,text in enumerate(row):
            heights.append(para(text,xs[i]+12,y+10,widths[i]-24,size=9.6,leading=15,font='MS' if i==0 else 'MR'))
        bottom=max(heights)+16
        line(M,bottom,W-M,bottom)
        y=bottom+4
    y+=20
    box(M,y,CW,103,MINT,16)
    para(d['trap_title'],M+18,y+15,CW-36,size=18,leading=24,font='ML')
    para(d['trap'],M+18,y+49,CW-36,size=9.6,leading=14.4)
    y+=125
    for text in d['checks']:y=check(text,M,y,CW,size=9.8)+10
    para(d['bottom'],M,y+9,CW,size=9.3,leading=14,color=MUTED)
    article(1)
    end()


def fit():
    d=DATA['fit'];y=start('04 / Passform',d['heading'],d['intro'])
    for num,title,text in d['steps']:
        para(num,M,y-2,43,size=22,leading=29,font='ML',color=CORAL)
        label(title,M+56,y,CW-56)
        y=para(text,M+56,y+22,CW-56,size=10,leading=15)+22
    # A pair of manufacturer-specific notes, not a universal sizing table.
    columns=(CW-20)/2
    box(M,y,CW,152,MINT,16)
    for i,(title,text) in enumerate(d['examples']):
        x=M+16+i*(columns+20)
        label(title,x,y+17,columns-32)
        para(text,x,y+41,columns-32,size=9.5,leading=14.3)
    y+=173
    field('passform_links','Laut Modellanleitung links: Haube / Einsatz',M,y,CW/2-12)
    field('passform_rechts','Laut Modellanleitung rechts: Haube / Einsatz',M+CW/2+12,y,CW/2-12)
    para(d['bottom'],M,y+66,CW,size=8.6,leading=13,color=MUTED)
    article(2)
    end()


def routine():
    d=DATA['routine'];y=start('05 / Pflege & Logistik',d['heading'],d['intro'])
    for i,(tag,title,text) in enumerate(d['steps']):
        yy=y+i*97
        para(f'{i+1:02}',M,yy,35,size=19,leading=25,font='ML',color=CORAL)
        if i<3:line(M+11,yy+33,M+11,yy+83,LINE,1)
        label(tag,M+56,yy,134)
        para(title,M+56,yy+21,145,size=12,leading=18,font='MS')
        para(text,M+216,yy,CW-216,size=10,leading=15)
    y+=397
    label('MEIN LOGISTIK-CHECK',M,y)
    y+=27
    for i,text in enumerate(d['checks']):
        xx=M+(i%2)*(CW/2+10)
        yy=y+(i//2)*49
        check(text,xx,yy,CW/2-15,size=9.5)
    para(d['note'],M,y+107,CW,size=8.6,leading=13,color=MUTED)
    article(3)
    end()


def shopping():
    d=DATA['shopping'];y=start('06 / Einkaufsnotiz',d['heading'],d['intro'])
    # Mostly full-width, with paired fit and cost / spares fields.
    fields=d['fields']
    for i in range(4):
        name,title=fields[i];field('kauf_'+name,title,M,y,CW);y+=54
    for indices in [(4,5),(6,7),(8,9)]:
        for col,index in enumerate(indices):
            name,title=fields[index]
            field('kauf_'+name,title,M+col*(CW/2+10),y,CW/2-10)
        y+=54
    name,title=fields[10];field('kauf_'+name,title,M,y,CW);y+=65
    for text in d['checks']:
        y=check(text,M,y,CW,size=9.4)+6
    y+=6
    label('MEINE ENTSCHEIDUNG – AUCH WARTEN IST EINE OPTION',M,y)
    y+=22
    for i,text in enumerate(d['decisions']):
        check(text,M+i*(CW/3+2),y,CW/3-7,size=8.4)
    end()


def sources():
    d=DATA['closing'];y=start('07 / Quellen',d['heading'],d['intro'])
    label('PRIMÄRQUELLEN / ABGERUFEN AM '+DATA['verified_date'],M,y)
    y+=25
    for s in DATA['sources']:
        para(f"[{s['id']}]",M,y,30,size=10,font='MS',color=CORAL)
        link(s['label']+'  /',s['url'],M+35,y,CW-35,size=10)
        bottom=para(s['scope'],M+35,y+21,CW-35,size=9.2,leading=13.5,color=MUTED)
        y=bottom+16
    line(M,y-1,W-M,y-1)
    y+=14
    label('VERTIEFEN AUF MILCHPUMPE-VERGLEICH.DE',M,y)
    y+=25
    for i,a in enumerate(DATA['articles']):
        col=i%2;row=i//2;x=M+col*(CW/2+12)
        link(a['label']+'  /','https://milchpumpe-vergleich.de/ratgeber/'+a['slug']+'/',x,y+row*42,CW/2-14,size=9.2)
    y+=91
    para('Alle grün markierten Quellen- und Artikeltitel sind anklickbar. Die Ziffern [1]–[5] verweisen auf die Belege oben. Maßgeblich bleibt die aktuelle Anleitung deiner konkreten Modell- und Ländervariante.',M,y,CW,size=8.7,leading=13,color=MUTED)
    para(d['note'],M,y+64,CW,size=8.4,leading=12.5,color=MUTED)
    end()


def embedded_form_font(writer):
    """Embed full Manrope for editable WinAnsi text fields, including German umlauts.

    ReportLab restricts field fonts to its base fonts. Replace the reachable Helv
    font dictionary with a fully embedded, width-mapped TrueType simple font.
    No invisible unembedded Helvetica or Dingbats is left behind.
    """
    raw=(ASSETS/'Manrope-400.ttf').read_bytes()
    font=Font(BytesIO(raw));units=font['head'].unitsPerEm;scale=1000/units
    cmap=font.getBestCmap();hmtx=font['hmtx'].metrics
    widths=[]
    for code in range(256):
        try:ch=bytes([code]).decode('cp1252')
        except UnicodeDecodeError:ch=' '
        glyph=cmap.get(ord(ch),'.notdef')
        widths.append(NumberObject(round(hmtx[glyph][0]*scale)))
    stream=DecodedStreamObject();stream.set_data(raw)
    stream[NameObject('/Length1')]=NumberObject(len(raw))
    descriptor=DictionaryObject({
        NameObject('/Type'):NameObject('/FontDescriptor'),NameObject('/FontName'):NameObject('/ManropePG-Regular'),
        NameObject('/Flags'):NumberObject(32),NameObject('/FontBBox'):ArrayObject([NumberObject(round(getattr(font['head'],k)*scale)) for k in ['xMin','yMin','xMax','yMax']]),
        NameObject('/ItalicAngle'):NumberObject(0),NameObject('/Ascent'):NumberObject(round(font['hhea'].ascent*scale)),
        NameObject('/Descent'):NumberObject(round(font['hhea'].descent*scale)),NameObject('/CapHeight'):NumberObject(700),
        NameObject('/StemV'):NumberObject(80),NameObject('/FontFile2'):writer._add_object(stream)})
    replacement=DictionaryObject({NameObject('/Type'):NameObject('/Font'),NameObject('/Subtype'):NameObject('/TrueType'),
        NameObject('/BaseFont'):NameObject('/ManropePG-Regular'),NameObject('/Encoding'):NameObject('/WinAnsiEncoding'),
        NameObject('/FirstChar'):NumberObject(0),NameObject('/LastChar'):NumberObject(255),
        NameObject('/Widths'):ArrayObject(widths),NameObject('/FontDescriptor'):writer._add_object(descriptor)})
    acro=writer._root_object['/AcroForm']
    original=acro['/DR']['/Font']['/Helv'].get_object()
    original.clear();original.update(replacement)
    for candidate in writer._objects:
        if isinstance(candidate, DictionaryObject) and candidate.get('/Type') == '/Font' and candidate.get('/BaseFont') == '/Helvetica':
            candidate.clear()
            candidate.update(replacement)
    acro[NameObject('/NeedAppearances')]=__import__('pypdf').generic.BooleanObject(False)


def render():
    pdf=OUT/'dein-milchpumpen-kaufcheck.pdf'
    doc=fitz.open(pdf)
    thumbs=[]
    for i,page in enumerate(doc,1):
        pix=page.get_pixmap(matrix=fitz.Matrix(1.5,1.5),alpha=False)
        pix.save(OUT/f'page-{i:02}.png')
        im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
        im.thumbnail((350,495),Image.Resampling.LANCZOS)
        tile=Image.new('RGB',(382,540),'#e7e7df');tile.paste(im,((382-im.width)//2,12))
        draw=ImageDraw.Draw(tile);draw.text((18,514),f'{i:02} / 08',fill='#233c37')
        thumbs.append(tile)
    sheet=Image.new('RGB',(382*4,540*2),'#e7e7df')
    for i,t in enumerate(thumbs):sheet.paste(t,((i%4)*382,(i//4)*540))
    sheet.save(OUT/'contact-sheet.png')
    # Parent can crop / resize this private raster without publishing the PDF.
    Image.open(OUT/'page-01.png').save(OUT/'cover-preview.png')


def main():
    global c
    OUT.mkdir(parents=True,exist_ok=True)
    font_setup()
    memory=BytesIO()
    c=canvas.Canvas(memory,pagesize=A4,pageCompression=1,invariant=1,initialFontName='MR',initialFontSize=10)
    c.setTitle(DATA['title']);c.setAuthor(DATA['author']);c.setSubject('Persönlicher Kaufcheck für Bauart, Setumfang, Passform und Alltag')
    c.setCreator('Milchpumpe-Vergleich.de / purchase-guide build.py');c.setViewerPreference('DisplayDocTitle','true')
    c.setCatalogEntry('Lang','de-DE')
    for func in [cover,everyday,architecture,sets,fit,routine,shopping,sources]:func()
    c.save()
    writer=PdfWriter(clone_from=PdfReader(BytesIO(memory.getvalue())))
    embedded_form_font(writer)
    writer.add_metadata({'/Title':DATA['title'],'/Author':DATA['author'],'/CreationDate':'D:20261015000000+02\'00\'','/ModDate':'D:20261015000000+02\'00\''})
    writer.write(OUT/'dein-milchpumpen-kaufcheck.pdf')
    (OUT/'layout-manifest.json').write_text(json.dumps(layout,ensure_ascii=False,indent=2),encoding='utf-8')
    render()
    print(json.dumps({'pdf':str(OUT/'dein-milchpumpen-kaufcheck.pdf'),'pages':page_no,'contact_sheet':str(OUT/'contact-sheet.png')},ensure_ascii=False))


if __name__=='__main__':main()
