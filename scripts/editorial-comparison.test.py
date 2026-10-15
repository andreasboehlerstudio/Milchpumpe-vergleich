import os
import re
import unittest
from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]
DRAFT = ROOT / os.environ.get('COMPARISON_DRAFT', '.superdesign/tmp/oct15-comparison-candidate.html')

class Inventory(HTMLParser):
    def __init__(self):
        super().__init__()
        self.select = None
        self.options = {}
        self.tags = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'select':
            self.select = attrs.get('id')
            self.options[self.select] = []
        if tag == 'option' and self.select in ('v9-compare-a', 'v9-compare-b'):
            self.options[self.select].append(attrs.get('value'))
    def handle_endtag(self, tag):
        if tag == 'select':
            self.select = None

class ComparisonContract(unittest.TestCase):
    def test_reader_can_choose_any_two_of_the_same_35_models(self):
        source = DRAFT.read_text(encoding='utf-8')
        p = Inventory()
        p.feed(source)
        self.assertIn('v9-compare-a', p.options, 'A real two-model comparison is missing')
        self.assertIn('v9-compare-b', p.options)
        for key in ('v9-compare-a', 'v9-compare-b'):
            self.assertEqual(len(p.options[key]), 35)
            self.assertEqual(len(set(p.options[key])), 35)
        self.assertEqual(p.options['v9-compare-a'], p.options['v9-compare-b'])
        self.assertTrue('id="v9-compare-swap"' in source)
        self.assertTrue('id="v9-compare-status"' in source)
        self.assertTrue('id="v9-compare-reset"' in source)
        self.assertNotIn('AggregateRating', source)
        self.assertNotIn('ReviewRating', source)

    def test_open_mapping_or_architecture_gaps_are_visible_in_the_directory(self):
        source = DRAFT.read_text(encoding='utf-8')
        p = Inventory()
        p.feed(source)
        notes = [attrs for tag, attrs in p.tags if tag == 'span' and 'data-directory-evidence' in attrs]
        self.assertEqual(len(notes), 5,
                         'Five existing model/mapping gaps need visible directory context, not a hidden ranking penalty')

    def test_long_comparison_is_opened_from_an_explicit_native_disclosure(self):
        source = DRAFT.read_text(encoding='utf-8')
        self.assertTrue('<details id="v9-compare-box"' in source,
                        'Keep the homepage curated; the detailed comparison should open on demand')
        opening = re.search(r'<details id="v9-compare-box"[^>]*>', source)[0]
        self.assertNotIn(' open', opening)
        self.assertEqual(source.count('data-compare-key='), 3)

    def test_desktop_comparison_uses_shared_header_fact_and_action_rows(self):
        source = DRAFT.read_text(encoding='utf-8')
        self.assertTrue('grid-template-rows:subgrid' in source,
                        'Comparison rows must align across both models, even when descriptions wrap differently')
        self.assertTrue('grid-row:2 / span 5' in source)
        self.assertTrue('grid-row:7' in source)

if __name__ == '__main__':
    unittest.main()
