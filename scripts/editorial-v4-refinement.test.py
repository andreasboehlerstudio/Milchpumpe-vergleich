import re
import unittest
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parents[1]
DRAFT = ROOT / '.superdesign/tmp/warm-editorial-refined-oct15.html'

class RefinementContract(unittest.TestCase):
    def test_three_alltag_entries_have_actual_topic_images_and_specific_help(self):
        source = DRAFT.read_text(encoding='utf-8')
        entries = re.findall(r'<a id="v4-start-(?:buy|store|clean)"[\s\S]*?</a>', source)
        self.assertEqual(len(entries), 3)
        self.assertEqual(sum('<img ' in entry for entry in entries), 3,
                         'All three everyday entry cards need their existing licensed thematic imagery')
        self.assertTrue(all('<small>' in entry for entry in entries))
        self.assertIn('Tragbare Milchpumpen & Stillalltag', source)

    def test_directory_has_labelled_architecture_filter_reset_and_real_model_classification(self):
        source = DRAFT.read_text(encoding='utf-8')
        self.assertIn('id="v4-architecture"', source,
                      'Readers need a real architecture selector, not only a collapsed text list')
        self.assertIn('for="v4-architecture"', source)
        self.assertIn('id="v4-filter-reset"', source)
        self.assertIn('id="v4-empty"', source)
        classifications = re.findall(r'<li data-model="[^"]+" data-architecture="([^"]+)"', source)
        self.assertEqual(len(classifications), 35)
        # Keep this early-round contract valid for historical and newly sourced drafts.
        # A resolved extra in-bra identity requires its actual model manual in the draft.
        mamaflow_resolved = 'Kinderkraft-MAMAFLOW-v-1-0.pdf' in source
        self.assertEqual(classifications.count('fully-in-bra-electric-wearable'), 26 if mamaflow_resolved else 25)
        self.assertEqual(classifications.count('in-bra-cups-with-tubing-and-external-portable-motor'), 9)
        self.assertEqual(classifications.count('unverified'), 0 if mamaflow_resolved else 1)
        self.assertIn('17 Marken', source)

    def test_shortlist_is_selectable_by_real_use_case_without_fabricated_score(self):
        source = DRAFT.read_text(encoding='utf-8')
        self.assertTrue('id="v4-case-controls"' in source,
                        'The three evidence-backed suggestions need selectable everyday criteria')
        cases = re.findall(r'<article class="v4-pick" data-pick-case="([^"]+)"', source)
        self.assertCountEqual(cases, ['parts', 'charging', 'external'])
        self.assertTrue('id="v4-directory-open"' in source)
        self.assertTrue('href="#modellsuche"' in source)
        self.assertNotIn('AggregateRating', source)
        self.assertNotIn('ReviewRating', source)

if __name__ == '__main__':
    unittest.main()
