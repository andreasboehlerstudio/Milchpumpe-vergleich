"""Reconcile public market observations without treating a missing variant as a missing model."""
import collections
import copy
import csv
import datetime
import json
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
docs = root / 'docs'
main = json.loads((docs / 'wearable-market-mainstream.json').read_text(encoding='utf-8'))
other = json.loads((docs / 'wearable-market-other.json').read_text(encoding='utf-8'))
rechecks = json.loads((docs / 'wearable-market-parent-recheck.json').read_text(encoding='utf-8'))
checks = {row['requestedAsin']: row for row in rechecks}
rows = []
architecture_map = {
    'fully-in-bra-electric-wearable': 'Vollständig im BH',
    'vollintegriert-in-bra': 'Vollständig im BH',
    'in-bra-cups-with-tubing-and-external-portable-motor': 'BH-Becher, Schlauch und externer Motor',
}
for batch, original in [('mainstream', row) for row in main['rows']] + [('other', row) for row in other['records']]:
    row = copy.deepcopy(original)
    row['sourceBatch'] = batch
    row['originalBatchAvailabilityStatus'] = row['availabilityStatus']
    row['originalBatchAsin'] = row['observedAsin']
    row['additionalOfferObservations'] = []
    candidate = 'B0GX538F1R' if row['brand'] == 'Momcozy' and row['canonicalModel'] == 'Mobile Flow M9' else row['observedAsin']
    if candidate in checks:
        observed = checks[candidate]
        row['additionalOfferObservations'].append(observed)
        # Stock plus an actual delivery message is a public offer observation,
        # not a guarantee for an address that was never entered.
        stock = observed.get('availabilityText', '')
        positive = 'auf lager' in stock.lower() and 'nicht auf lager' not in stock.lower()
        if observed.get('identityVerified') and positive and observed.get('deliveryText'):
            row['availabilityStatus'] = 'public-offer-observed'
            row['observedAsin'] = observed['selectedAsin']
            row['amazonDetailUrl'] = observed['url']
            row['amazonTitle'] = observed['title']
            row['availabilityEvidence'] = stock + ' | ' + observed['deliveryText']
            row['checkedAt'] = observed['checkedAt']
            if observed['url'] not in row['sourceUrls']:
                row['sourceUrls'].append(observed['url'])
            row['caveats'].append('Öffentliche anonyme Amazon.de-Anzeige; Lieferadresse nicht gesetzt. Verfügbarkeit, Verkäuferzustand und Lieferbarkeit für den eigenen Ort im Angebot prüfen.')
    row['architectureLabel'] = architecture_map.get(row['pumpArchitecture'], 'Bauart offen')
    if row['brand'] == 'Kinderkraft' and row['canonicalModel'] == 'MAMAFLOW':
        row['architectureLabel'] = 'Bauart noch zu prüfen'
    row['qualityScore'] = None
    if row['observedAsin']:
        assert re.fullmatch(r'[A-Z0-9]{10}', row['observedAsin']), row['observedAsin']
        assert row['amazonDetailUrl'] == 'https://www.amazon.de/dp/' + row['observedAsin']
        row['affiliateUrl'] = row['amazonDetailUrl'] + '?tag=andreasboeh09-21'
    else:
        row['affiliateUrl'] = None
    rows.append(row)

assert len({(row['brand'], row['canonicalModel']) for row in rows}) == len(rows)
rows.sort(key=lambda row: (row['brand'].casefold(), row['canonicalModel'].casefold()))
counts = dict(collections.Counter(row['availabilityStatus'] for row in rows))
output = {
    'schemaVersion': 1,
    'reconciledAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'completeMarketCoverage': False,
    'rankingIsQualityTest': False,
    'sourceCitationIdsAreBatchScoped': True,
    'method': 'Two public research batches reconciled by manufacturer/model; 15 detail identities and stock/delivery messages reread by the parent. No addresses entered, no checkout, no prices or review scores adopted.',
    'counts': counts,
    'rows': rows,
    'deferredDiscoveryNotIncludedInModelCount': other['deferredDiscovery'],
    'limits': ['Stock/delivery messages are observations in an anonymous page context, not address-specific delivery guarantees.', 'Offer existence is independent from confirmed architecture, exact manufacturer-generation mapping, warranty or comparative quality.', 'No own tests, numerical quality scores or exhaustive marketplace coverage.'],
}
target = docs / 'wearable-market-reconciled.json'
csv_target = docs / 'wearable-market-reconciled.csv'
assert not target.exists() and not csv_target.exists(), 'Read and merge any existing export before replacing it.'
target.write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
fields = ['Marke', 'Modell', 'Bauart', 'Angebotsstatus', 'Geprüft am', 'ASIN', 'Gelesener Amazon-Titel', 'Amazon-Affiliate-Link', 'Herstellerquelle', 'Angebotsbeleg', 'Grenzen']
with csv_target.open('w', encoding='utf-8-sig', newline='') as handle:
    writer = csv.DictWriter(handle, fieldnames=fields, delimiter=';')
    writer.writeheader()
    for row in rows:
        writer.writerow({'Marke': row['brand'], 'Modell': row['canonicalModel'], 'Bauart': row['architectureLabel'], 'Angebotsstatus': row['availabilityStatus'], 'Geprüft am': row['checkedAt'], 'ASIN': row['observedAsin'] or '', 'Gelesener Amazon-Titel': row['amazonTitle'] or '', 'Amazon-Affiliate-Link': row['affiliateUrl'] or '', 'Herstellerquelle': row['manufacturerUrl'] or '', 'Angebotsbeleg': row['availabilityEvidence'] or '', 'Grenzen': ' | '.join(row['caveats'])})
readback = json.loads(target.read_text(encoding='utf-8'))
with csv_target.open(encoding='utf-8-sig', newline='') as handle:
    csv_rows = list(csv.DictReader(handle, delimiter=';'))
assert len(csv_rows) == len(readback['rows']) == 35
assert counts == {'public-offer-observed': 31, 'not-found': 4}
print(json.dumps({'models': len(rows), 'counts': counts, 'csvRows': len(csv_rows), 'parentDetailIdentitiesVerified': sum(row.get('identityVerified', False) for row in rechecks), 'm9PreferredAsin': next(row['observedAsin'] for row in rows if row['brand'] == 'Momcozy' and row['canonicalModel'] == 'Mobile Flow M9'), 'paths': [str(target), str(csv_target)]}, ensure_ascii=False))
