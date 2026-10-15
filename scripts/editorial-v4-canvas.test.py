import unittest
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parents[1]
DRAFT = ROOT / '.superdesign/tmp/stillalltag-warm-editorial-v4.html'
LOGO = 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/ec166314-d8f4-47fa-977e-5848c252f006/brand-assets/public-brand-symbol.svg/brand-symbol.svg'

class Inventory(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.images, self.headings = [], [], [], []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])
        if tag == 'a':
            self.links.append(a)
        if tag == 'img':
            self.images.append(a)
        if tag == 'h1':
            self.headings.append(a)

class CanvasContract(unittest.TestCase):
    def test_complete_branded_honest_navigable_draft(self):
        self.assertTrue(DRAFT.is_file(), 'Fresh warm editorial canvas draft not authored yet')
        source = DRAFT.read_text(encoding='utf-8')
        p = Inventory()
        p.feed(source)
        self.assertEqual(len(p.headings), 1)
        self.assertEqual(len(p.ids), len(set(p.ids)))
        self.assertEqual(sum(a['src'] == LOGO for a in p.images), 2)
        self.assertTrue(any('editorial-v4-nursery-clothes' in a['src'] for a in p.images))
        self.assertIn('jackson kondili', source)
        self.assertIn('Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.', source)
        self.assertIn('Beste tragbare Milchpumpe', source)
        self.assertIn('35 recherchierte Modellidentitäten', source)
        self.assertNotIn('AggregateRating', source)
        self.assertNotIn('ReviewRating', source)
        for a in p.links:
            self.assertIn('id', a)
            href = a['href']
            self.assertTrue(href.startswith('https://') or href.startswith('#'))
            if href.startswith('#'):
                self.assertIn(href[1:], p.ids)
            if urlparse(href).hostname in ('www.amazon.de', 'amazon.de'):
                self.assertEqual(parse_qs(urlparse(href).query).get('tag'), ['andreasboeh09-21'])
                self.assertIn('sponsored', a.get('rel', ''))
        for a in p.images:
            self.assertTrue(a['src'].startswith('https://'))
            self.assertIn('alt', a)
            self.assertIn('width', a)
            self.assertIn('height', a)

if __name__ == '__main__':
    unittest.main()
