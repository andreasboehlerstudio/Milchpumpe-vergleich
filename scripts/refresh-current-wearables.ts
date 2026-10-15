import fs from 'node:fs';
import { Window, HTMLSelectElement } from 'happy-dom';
import { WEARABLE_MARKET, wearableMarketDestination } from '../src/wearable-market';
import { wearableMarketEvidence } from '../src/wearable-market-evidence-overlay';
import rawUpdates from '../src/wearable-market-offer-updates.json';
const updates = rawUpdates as Record<string, { checkedAt: string }>;
const templatePath = 'src/home-editorial-template.json';
const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
const oldData = JSON.parse(fs.readFileSync('src/home-editorial-data.json', 'utf8'));
const existing = new Map<string, any>(oldData.models.map((model: any) => [model.key, model]));
const win = new Window();
win.document.body.innerHTML = template.html;
const list = win.document.getElementById('v4-model-results')!;
const priorRows = new Map([...list.children].map(row => [row.getAttribute('data-model'), row]));
list.replaceChildren();
const models = WEARABLE_MARKET.models.map(model => {
  const key = `${model.brand}|${model.canonicalModel}`;
  const prior = existing.get(key);
  const overlay = wearableMarketEvidence(model);
  const destination = wearableMarketDestination(model);
  const name = `${model.brand} ${model.canonicalModel}`;
  const observedOn = (updates[key]?.checkedAt || model.amazonObservation.checkedAt).slice(0, 10);
  const row = priorRows.get(name.toLocaleLowerCase('de')) || win.document.createElement('li');
  row.setAttribute('data-model', name.toLocaleLowerCase('de'));
  row.setAttribute('data-architecture', overlay?.architecture || model.architecture.normalized);
  if (!row.children.length) {
    const title = win.document.createElement('span'); title.textContent = name;
    const label = win.document.createElement('small'); label.textContent = overlay?.architectureLabel || model.architecture.buyerLabel;
    row.append(title, label);
  }
  if (!row.querySelector('[data-compare-key]')) {
    const link = win.document.createElement('a'); link.href = '#v9-comparison'; link.dataset.compareKey = key; link.textContent = 'Vergleichen ↗'; row.append(link);
  }
  list.append(row);
  return { key, name, short: prior?.short || (name.length > 26 ? name.slice(0, 25) + '…' : name), architecture: overlay?.architectureLabel || model.architecture.buyerLabel, note: overlay?.note || model.buyerNote, mapping: overlay?.mapping || (model.manufacturerMapping.editorialStatus === 'named-model-supported-in-research' ? 'Modell in Herstellerunterlagen abgeglichen.' : 'Modell-/Regionszuordnung weiter prüfen.'), source: overlay?.sources[0]?.url || model.manufacturerMapping.url || '', observation: `${model.amazonObservation.status === 'public-offer-observed' ? 'Angebot im Suchlauf beobachtet' : 'Kein Angebot im Suchlauf bestätigt'} · ${observedOn}`, variant: overlay?.variant || prior?.variant || model.amazonObservation.priorBatch.variantEvidence, amazon: destination.href, exact: destination.kind === 'exact-offer' };
});
for (const side of ['a', 'b']) {
  const select = win.document.getElementById(`v9-compare-${side}`)! as unknown as HTMLSelectElement;
  const selected = side === 'a' ? 'Momcozy|M5 Smart' : 'Medela|Freestyle Hands-free';
  select.replaceChildren();
  for (const model of models) {
    const option = win.document.createElement('option'); option.value = model.key; option.textContent = model.short; option.setAttribute('aria-label', model.name); option.title = model.name;
    if (model.key === selected) option.setAttribute('selected', '');
    select.append(option);
  }
  const model = models.find(row => row.key === selected)!;
  const card = win.document.getElementById(`v9-card-${side}`)!;
  card.querySelectorAll('[data-value]').forEach(cell => { const key = cell.getAttribute('data-value')! as keyof typeof model; cell.textContent = String(model[key] ?? 'Noch offen.'); });
}
const count = models.length, brands = WEARABLE_MARKET.counts.brands, offers = WEARABLE_MARKET.counts.amazonOfferObserved;
win.document.getElementById('v4-model-count')!.textContent = `${count} Modelle in der Recherche`;
win.document.querySelector('.v4-directory-intro p')!.textContent = `Angebotsbeobachtungen vom 15. Oktober 2026: ${count} Modelle aus ${brands} Marken; bei ${offers} Modellen wurde ein öffentliches Amazon.de-Angebot beobachtet. Vier bleiben ohne bestätigtes Angebot. Verkäufer, Set und Lieferung für deinen Ort erneut prüfen.`;
const walker = win.document.createTreeWalker(win.document.body, 4);
let node;
while ((node = walker.nextNode())) {
  node.textContent = node.textContent!.replace(/35(?= recherchierte Modelle| recherchierten Modelle| recherchierte Modellidentitäten| Modelle ansehen)/g, String(count)).replace(/17 Marken/g, `${brands} Marken`);
}
win.document.querySelectorAll('.v4-fine').forEach(node => { if (node.textContent?.includes('Zuordnung der Recherchefunde: 14. Oktober')) node.textContent = node.textContent.replace('14. Oktober', '15. Oktober'); });
template.html = win.document.body.innerHTML;
template.productionDataUpdatedOn = '2026-10-15';
fs.writeFileSync(templatePath, JSON.stringify(template, null, 2) + '\n');
fs.writeFileSync('src/home-editorial-data.json', JSON.stringify({ sourceVersion: oldData.sourceVersion, productionDataUpdatedOn: '2026-10-15', models }, null, 2) + '\n');
console.log(JSON.stringify({ models: count, brands, observedOffers: offers, sourceDraftUnchanged: template.sourceDraft }));
