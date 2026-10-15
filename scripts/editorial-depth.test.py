import os
import re
import unittest
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parents[1]
DRAFT = ROOT / os.environ.get('EDITORIAL_DEPTH_HTML', '.superdesign/tmp/oct15-depth-refined.html')

class Inventory(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

class EditorialDepthContract(unittest.TestCase):
    def test_real_pump_parts_photo_is_used_with_source_and_licence(self):
        source = DRAFT.read_text(encoding='utf-8')
        self.assertTrue('editorial-pump-parts-cc0' in source,
                        'The editorial cleaning feature needs the acquired real photo, not another generic illustration')
        self.assertIn('LeslieKnope345', source)
        self.assertIn('https://commons.wikimedia.org/wiki/File:Hands_Free_Breast_Pump.jpg', source)
        self.assertIn('https://creativecommons.org/publicdomain/zero/1.0/', source)
        self.assertIn('deines Modells', source)

    def test_methodology_has_a_concrete_illustrated_source_to_decision_example(self):
        source = DRAFT.read_text(encoding='utf-8')
        self.assertTrue('id="v6-method-figure"' in source,
                        'The methodology needs a labelled visual example, not only three generic text cards')
        parser = Inventory()
        parser.feed(source)
        self.assertEqual(sum(tag == 'li' and 'data-method-step' in a for tag, a in parser.tags), 4)
        self.assertTrue('id="v6-method-caption"' in source)
        self.assertTrue('M5 Smart' in source and 'Einzelset' in source)
        self.assertTrue('https://milchpumpe-vergleich.de/testmethodik/#quellen' in source)

    def test_search_question_has_visible_answer_and_real_market_destination(self):
        source = DRAFT.read_text(encoding='utf-8')
        self.assertTrue('id="v6-quick-answer"' in source,
                        'The best-wearable query needs a visible answer with named case recommendations')
        answer = re.search(r'<div id="v6-quick-answer"[\s\S]*?</div>', source)
        self.assertIsNotNone(answer)
        self.assertTrue(all(name in answer[0] for name in ['M5 Smart', 'Air 1', 'Freestyle Hands-free']))
        self.assertTrue('id="v6-market-full"' in source)
        self.assertTrue('https://milchpumpe-vergleich.de/tragbare-milchpumpen/' in source)
        self.assertTrue('id="v6-faq"' in source)
        self.assertNotIn('AggregateRating', source)
        self.assertNotIn('ReviewRating', source)

    def test_recommendations_show_exact_set_before_the_purchase_button(self):
        source = DRAFT.read_text(encoding='utf-8')
        cards = re.findall(r'<article class="v4-pick"[\s\S]*?</article>', source)
        self.assertEqual(len(cards), 3)
        for card in cards:
            self.assertTrue('class="v8-set-label"' in card,
                            'Exact set must be visible without opening optional technical details')
            self.assertLess(card.index('class="v8-set-label"'), card.index('class="v4-buy"'))
        self.assertTrue('>Vier Teile reinigen</button>' in source)
        self.assertNotIn('>Weniger Teile</button>', source)
        headings = re.findall(r'<h1[^>]*>([\s\S]*?)</h1>', source)
        self.assertEqual(len(headings), 1)
        self.assertIn('Milchpumpen', headings[0])

if __name__ == '__main__':
    unittest.main()
