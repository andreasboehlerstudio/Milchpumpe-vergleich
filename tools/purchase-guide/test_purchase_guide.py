"""Artifact-level acceptance test. Run before and after build (see README)."""
from pathlib import Path
import hashlib
import json
import re

import pymupdf as fitz
from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'private/newsletter-guide'
PDF = OUT / 'dein-milchpumpen-kaufcheck.pdf'


def test_actual_purchase_guide():
    assert PDF.is_file(), 'RED: actual private purchase-guide PDF has not been produced'
    doc = fitz.open(PDF)
    reader = PdfReader(PDF)
    assert 6 <= len(doc) <= 8
    assert reader.metadata.author == 'Milchpumpe-Vergleich.de'
    all_text = re.sub(r'\s+', ' ', '\n'.join(p.get_text() for p in doc))
    for phrase in ['Dein Milchpumpen-Kaufcheck', 'Erst deinen Alltag klären.',
                   'Dann das passende Set wählen.', 'Single', 'Double', 'Handpumpe',
                   'Passform', 'trocknen', 'Lieferumfang', 'Kaufzettel', 'Quellen']:
        assert phrase in all_text, f'Missing required content: {phrase}'
    assert not re.search(r'\b(AI|KDP|Testsieger|unser Praxistest)\b', all_text)
    links, spans, fonts = [], 0, {}
    for n, page in enumerate(doc, 1):
        assert abs(page.rect.width - 595.276) < 0.2
        assert abs(page.rect.height - 841.89) < 0.2
        assert not page.get_contents() == []
        for block in page.get_text('dict')['blocks']:
            for line in block.get('lines', []):
                for span in line['spans']:
                    box = fitz.Rect(span['bbox'])
                    assert fitz.Rect(20, 20, page.rect.width-20, page.rect.height-20).contains(box), (n, span)
                    assert '\ufffd' not in span['text']
                    spans += 1
        for xref, ext, kind, name, *_ in page.get_fonts(full=True):
            if xref:
                extracted = doc.extract_font(xref)
                assert extracted[3], f'Unembedded page font: {name} on {n}'
                fonts[name] = {'embedded': True, 'type': kind}
        for link in page.get_links():
            if link.get('uri'):
                assert page.rect.contains(link['from']), (n, link)
                assert link['uri'].startswith('https://')
                assert not any(host in link['uri'] for host in ['amzn.to', 'amazon.', 'tag='])
                links.append({'page': n, 'uri': link['uri']})
    assert len(fonts) >= 3, 'Light, regular and semibold must remain distinct embedded font faces'
    assert len(links) >= 8
    assert len({x['uri'] for x in links if 'milchpumpe-vergleich.de/ratgeber/' in x['uri']}) >= 4
    # Global font scan includes forms, not just page text resources.
    unembedded = []
    for xref in range(1, doc.xref_length()):
        if doc.xref_get_key(xref, 'Type')[1] == '/Font':
            subtype = doc.xref_get_key(xref, 'Subtype')[1]
            if subtype != '/Type0':
                descriptor = doc.xref_get_key(xref, 'FontDescriptor')[1]
                if descriptor == 'null':
                    unembedded.append(xref)
                else:
                    d = int(descriptor.split()[0])
                    if not any(doc.xref_get_key(d, k)[1] != 'null' for k in ['FontFile', 'FontFile2', 'FontFile3']):
                        unembedded.append(xref)
    assert not unembedded, f'Unembedded font objects: {unembedded}'
    report_layout = json.loads((OUT / 'layout-manifest.json').read_text(encoding='utf-8'))
    for i, item in enumerate(report_layout):
        for other in report_layout[i+1:]:
            if item['page'] == other['page']:
                assert not fitz.Rect(item['rect_top']).intersects(fitz.Rect(other['rect_top'])), (item, other)
    fields = reader.get_fields() or {}
    assert all(f.get('/V') in (None, '') for f in fields.values()), 'Delivery copy must contain no filled QA values'
    assert not reader.trailer['/Root'].get('/OpenAction'), 'No automatic action on opening'
    for xref in range(1, doc.xref_length()):
        assert doc.xref_get_key(xref, 'S')[1] not in ['/JavaScript', '/SubmitForm', '/ImportData'], 'No scripts or submitting form data'
    annotations = [a.get_object() for p in reader.pages for a in p.get('/Annots', [])
                   if a.get_object().get('/Subtype') == '/Widget']
    names = [a.get('/T') for a in annotations]
    assert len(names) == len(set(names)), 'Duplicate field names'
    for n, page in enumerate(reader.pages, 1):
        widgets = [a.get_object() for a in page.get('/Annots', []) if a.get_object().get('/Subtype') == '/Widget']
        for widget in widgets:
            x0, y0, x1, y1 = map(float, widget['/Rect'])
            assert 35 <= x0 < x1 <= float(page.mediabox.width)-35, (n, widget)
            assert 45 <= y0 < y1 <= float(page.mediabox.height)-35, (n, widget)
        for i, a in enumerate(widgets):
            for b in widgets[i+1:]:
                assert not fitz.Rect(a['/Rect']).intersects(fitz.Rect(b['/Rect'])), (n, a['/T'], b['/T'])
    roundtrip = None
    if fields:
        assert len(fields) >= 10
        values = {name: 'Prüfung: Größe für Müller 123' for name, f in fields.items() if f.get('/FT') == '/Tx'}
        writer = PdfWriter(clone_from=reader)
        for page in writer.pages:
            if page.get('/Annots'):
                writer.update_page_form_field_values(page, values, auto_regenerate=False)
        filled = OUT / 'qa-filled-roundtrip.pdf'
        writer.write(filled)
        actual = PdfReader(filled).get_fields()
        assert all(actual[name].get('/V') == value for name, value in values.items())
        fd = fitz.open(filled)
        # Appearance must render too: extraction from the filled widget page includes the value.
        filled_text = ''.join(p.get_text() for p in fd)
        assert filled_text.count('Prüfung: Größe für Müller 123') == len(values), 'Every filled appearance must be visible, not just stored'
        roundtrip = {'tested_fields': len(values), 'visible_value_count': filled_text.count('Prüfung: Größe für Müller 123'), 'unicode_value': 'Prüfung: Größe für Müller 123', 'passed': True}
        fd[-2].get_pixmap(matrix=fitz.Matrix(1.4, 1.4), alpha=False).save(OUT / 'qa-filled-shopping-sheet.png')
    report = {
        'artifact': str(PDF), 'sha256': hashlib.sha256(PDF.read_bytes()).hexdigest(),
        'bytes': PDF.stat().st_size, 'pages': len(doc), 'a4_all_pages': True,
        'text_spans_checked': spans, 'text_span_bounds_passed': True,
        'scope_of_clipping_check': 'Extracted text bounding boxes in safe page area; supplemented by raster visual review.',
        'embedded_fonts': fonts, 'unembedded_font_objects': unembedded,
        'layout_entries_checked': len(report_layout), 'layout_text_field_overlaps': 0,
        'links': links, 'link_count': len(links), 'unique_link_destinations': len({l['uri'] for l in links}),
        'unique_field_count': len(fields), 'widget_bounds_and_nonoverlap_passed': True,
        'privacy': {'delivery_fields_blank': True, 'no_javascript_submit_or_import_actions': True},
        'fill_roundtrip': roundtrip,
        'print_checkboxes': 'Drawn vector boxes; usable on printed copy.',
        'not_claimed': ['PDF/UA conformance', 'PDF/A conformance', 'encryption or access control', 'medical advice', 'physical printer proof'],
    }
    (OUT / 'evidence-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
