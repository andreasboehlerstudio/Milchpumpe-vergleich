import json
import os
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DRAFT = ROOT / os.environ.get('RANKING_DRAFT', '.superdesign/tmp/ranking-candidate.html')

def comparison(source):
    return json.loads(re.search(r'<script id="v9-comparison-data" type="application/json">([\s\S]*?)</script>', source)[1])

class CaseRankingContract(unittest.TestCase):
    def test_case_order_and_visible_alternatives(self):
        source = DRAFT.read_text(encoding='utf-8')
        cards = re.findall(r'<article class="v4-pick"[\s\S]*?</article>', source)
        self.assertEqual([re.search(r'data-pick-case="([^"]+)"', x)[1] for x in cards], ['parts', 'external', 'charging'])
        for card, alternative in zip(cards, ['Elvie Pump', 'Philips Avent SCF547/11', 'eufy S1']):
            self.assertIn('class="v11-alternative"', card)
            self.assertIn(alternative, card)
            self.assertIn('data-compare-pair-a=', card)
            self.assertIn('data-compare-pair-b=', card)
        self.assertEqual(source.count('class="v11-pair"'), 3)
        self.assertIn('link.dataset.comparePairB', source)

    def test_resolved_and_partial_model_findings_are_not_conflated(self):
        source = DRAFT.read_text(encoding='utf-8')
        models = {m['key']: m for m in comparison(source)}
        kk = models['Kinderkraft|MAMAFLOW']
        self.assertEqual(kk['architecture'], 'Vollständig im BH (Motor integriert)')
        self.assertIn('Anleitung', kk['note'])
        self.assertIn('Einzelpumpe', kk['variant'])
        self.assertTrue(kk['source'].endswith('Kinderkraft-MAMAFLOW-v-1-0.pdf'))
        self.assertNotIn('data-model="kinderkraft mamaflow" data-architecture="unverified"', source)
        self.assertIn('DE-Ausführung', models['KISSBOBO|K5']['mapping'])
        self.assertIn('AM8161A', models['NCVI|AM8161A (beheiztes Wearable)']['mapping'])
        self.assertIn('Regional', models['Willow|Go (PDL60)']['mapping'])

    def test_model_identities_sets_affiliate_targets_and_images_are_preserved(self):
        source = DRAFT.read_text(encoding='utf-8')
        baseline = (ROOT / '.superdesign/tmp/ranking-source.html').read_text(encoding='utf-8')
        original = comparison(baseline)
        updated = comparison(source)
        self.assertEqual([x['key'] for x in updated], [x['key'] for x in original])
        self.assertEqual(len(updated), 35)
        self.assertEqual([x['amazon'] for x in updated], [x['amazon'] for x in original])
        self.assertEqual(re.findall(r'<img\b[^>]*>', source), re.findall(r'<img\b[^>]*>', baseline))
        self.assertNotIn('ReviewRating', source)
        for asin in ['B0G1MWP4FB', 'B0BKGFBKHJ', 'B0G2MQH1DF']:
            self.assertIn('/dp/' + asin + '?tag=andreasboeh09-21', source)

    def test_research_matrix_has_complete_local_citation_and_identity_references(self):
        data = json.loads((ROOT / 'docs/ranking-next-evidence.json').read_text(encoding='utf-8'))
        inventory = json.loads((ROOT / 'src/wearable-market-data.json').read_text(encoding='utf-8'))
        keys = {(m['brand'], m['canonicalModel']) for m in inventory['models']}
        model_ids = {m['id'] for m in data['models']}
        source_ids = {s['id'] for s in data['sources']}
        self.assertEqual(len(model_ids), 6)
        for model in data['models']:
            self.assertIn((model['modelRef']['brand'], model['modelRef']['canonicalModel']), keys)
        for fact in data['facts']:
            self.assertIn(fact['modelId'], model_ids)
            self.assertIn(fact['sourceId'], source_ids)
            self.assertTrue(fact['quote'])
            self.assertTrue(fact['setIdentity'])

if __name__ == '__main__':
    unittest.main()
