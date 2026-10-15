import { useId, useState } from 'react';
import marketData from './wearable-market-data.json';
import { CURRENT_BUYING_CASES, MARKET_SOURCE_UPDATED_ON, wearableMarketEvidence } from './wearable-market-evidence-overlay';

export const WEARABLE_MARKET = marketData;
export type WearableMarketModel = typeof marketData.models[number];

const mappingLabels: Record<string, string> = {
  'named-model-supported-in-research': 'Hersteller-Modell in der Recherche abgeglichen',
  'mapping-unresolved': 'Herstellerzuordnung oder Generation noch offen',
  'primary-missing': 'Nur Amazon-Modell; Primärbeleg fehlt',
};

function ObservationDate({ value }: { value: string }) {
  return <time dateTime={value}>{new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin' }).format(new Date(value))}</time>;
}

export function wearableMarketDestination(model: WearableMarketModel): { href: string; kind: 'exact-offer' | 'model-search' } {
  const asin = model.amazonObservation.observedAsin;
  if (asin && !/^[A-Z0-9]{10}$/.test(asin)) throw new Error('Ungültige ASIN');
  if (asin && model.manufacturerMapping.editorialStatus !== 'mapping-unresolved') {
    return { href: `https://www.amazon.de/dp/${asin}?tag=${WEARABLE_MARKET.scope.affiliateTag}`, kind: 'exact-offer' };
  }
  return { href: `https://www.amazon.de/s?k=${encodeURIComponent(`${model.brand} ${model.canonicalModel} Milchpumpe`)}&tag=${WEARABLE_MARKET.scope.affiliateTag}`, kind: 'model-search' };
}

function MarketPurchaseLink({ model }: { model: WearableMarketModel }) {
  const destination = wearableMarketDestination(model);
  return <a className="wearable-market__shop" href={destination.href} target="_blank" rel="sponsored noopener noreferrer">{destination.kind === 'exact-offer' ? 'Genaues beobachtetes Angebot prüfen*' : 'Dieses Modell bei Amazon suchen*'}<span className="wearable-market__sr-only">: {model.brand} {model.canonicalModel}</span></a>;
}

function MarketCard({ model }: { model: WearableMarketModel }) {
  const evidence = wearableMarketEvidence(model);
  return <article className="wearable-market__card" data-market-model={`${model.brand}|${model.canonicalModel}`} data-architecture={evidence?.architecture || model.architecture.normalized} data-offer-observation={model.amazonObservation.status}>
    <h3>{model.brand} {model.canonicalModel}</h3>
    <p className="wearable-market__architecture">{evidence?.architectureLabel || model.architecture.buyerLabel}</p>
    <p>{evidence?.note || model.buyerNote}</p>
    <p className="wearable-market__evidence">{evidence?.mapping || mappingLabels[model.manufacturerMapping.editorialStatus]}</p>
    {!evidence && model.architecture.primaryQuoteAloneMayNotProveArchitecture && <p className="wearable-market__evidence">Bauform aus der bisherigen Recherche; modellgenauer Architekturbeleg noch offen.</p>}
    <p className="wearable-market__observation">{model.amazonObservation.status === 'public-offer-observed' ? 'Angebot in der Recherche beobachtet' : 'Kein Angebot im Suchlauf verifiziert'} · <ObservationDate value={model.amazonObservation.checkedAt} /></p>
    {evidence ? <>
      <p>{evidence.limitations}</p>
      {evidence.sources.map(source => <p key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></p>)}
      <p className="wearable-market__evidence">Quellenupdate: <ObservationDate value={MARKET_SOURCE_UPDATED_ON} /></p>
      <p><strong>Vor Bestellung: </strong>{evidence.variant}</p>
    </> : model.manufacturerMapping.url && <p><a href={model.manufacturerMapping.url} target="_blank" rel="noopener noreferrer">Herstellerquelle für {model.brand} {model.canonicalModel}</a></p>}
    <div className="wearable-market__actions"><span>Werbung / Affiliate-Link</span><MarketPurchaseLink model={model} />{wearableMarketDestination(model).kind === 'model-search' && <small>Suchergebnisse sind kein verifiziertes Einzelangebot. Modellgeneration und Set prüfen.</small>}</div>
  </article>;
}

function BuyingCaseShortlists() {
  return <div className="wearable-market__shortlists">
    <h3>Welcher Einstieg passt zu Deinem Alltag?</h3>
    <p>Die Auswahl folgt dem jeweiligen Einsatzfall, nicht einer gemessenen Qualitätsrangfolge. Die drei Modelle sind alternative Ausgangspunkte: Abpumpleistung, Komfort und Haltbarkeit wurden nicht vergleichend gemessen.</p>
    <ul className="wearable-market__cases">
      {CURRENT_BUYING_CASES.map(entry => <li key={entry.useCase}>
        <article className="wearable-market__case" data-buying-case={entry.useCase}>
          <h4>{entry.useCase}</h4>
          <p className="wearable-market__candidate">{entry.modelRef.brand} {entry.modelRef.canonicalModel}</p>
          <p>{entry.why}</p>
          <ul>{entry.decisiveProperties.map(property => <li key={property.claim}>{property.claim}</li>)}</ul>
          <p><strong>Die Abwägung: </strong>{entry.tradeOff}</p>
          <p><strong>Vor Bestellung: </strong>{entry.purchaseCheck}</p>
          {entry.sources.map(source => <p key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a> · <ObservationDate value={MARKET_SOURCE_UPDATED_ON} /></p>)}
          <aside aria-label={`Alternative zu ${entry.modelRef.brand} ${entry.modelRef.canonicalModel}`}>
            <h5>Auch ansehen, wenn … {entry.alternative.name}</h5>
            <p>{entry.alternative.note}</p>
            {entry.alternative.sources.map(source => <p key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a> · <ObservationDate value={MARKET_SOURCE_UPDATED_ON} /></p>)}
          </aside>
        </article>
      </li>)}
    </ul>
  </div>;
}

export type WearableMarketFilters = { query?: string; brand?: string; architecture?: string; offers?: string };

export function filterWearableModels(models: WearableMarketModel[], filters: WearableMarketFilters) {
  const query = (filters.query || '').trim().toLocaleLowerCase('de-DE');
  return models.filter(model => (!filters.brand || filters.brand === model.brand)
    && (!filters.architecture || filters.architecture === (wearableMarketEvidence(model)?.architecture || model.architecture.normalized))
    && (!filters.offers || filters.offers === model.amazonObservation.status)
    && `${model.brand} ${model.canonicalModel}`.toLocaleLowerCase('de-DE').includes(query));
}

export function WearableMarketOverview({ initialFilters = {} }: { initialFilters?: WearableMarketFilters } = {}) {
  const [filters, setFilters] = useState<WearableMarketFilters>(initialFilters);
  const headingId = useId();
  const visible = filterWearableModels(WEARABLE_MARKET.models, filters);
  const updateFilter = (key: keyof WearableMarketFilters, value: string) => setFilters(current => ({ ...current, [key]: value }));
  const brands = [...new Set(WEARABLE_MARKET.models.map(model => model.brand))].sort((a, b) => a.localeCompare(b, 'de'));
  return <section className="wearable-market" aria-labelledby={headingId}>
    <h2 id={headingId}>Weitere Wearable-Milchpumpen für Deinen Alltag</h2>
    <p>35 recherchierte Modellidentitäten – keine vollständige Marktübersicht. Stand der Angebotsrecherche: 14. Oktober 2026; Quellenupdate vom 15. Oktober 2026 für die drei Einstiege, ihre Alternativen und fünf nachgeprüfte Modelle. Andere Quellen behalten ihren bisherigen Stand.</p>
    <p>31 Modelle mit öffentlich beobachtetem Amazon.de-Angebot, 4 ohne verifiziertes Angebot in diesem Suchlauf. Das bedeutet nicht „ausverkauft“ und ist keine Zusage heutiger Lieferbarkeit. Prüfe Variante, Verkäufer und Lieferung für Deinen Ort erneut.</p>
    <p>Bei integriertem Motor sitzt die Pumpe vollständig im BH. Bei Systemen mit externem Motor sitzen nur die Becher im BH; Motor und Schläuche gehören dazu. Die Einordnung folgt den dokumentierten Quellen, Deine Passform bleibt individuell.</p>
    <BuyingCaseShortlists />
    <h3>Alle recherchierten Modelle</h3>
    <p>Alphabetisch nach Marke und Modell, nicht nach Qualität. Farben und Single-/Double-Sets zählen nicht als weitere Modellgeneration.</p>
    <fieldset className="wearable-market__filters"><legend>Auswahl eingrenzen</legend>
      <label className="wearable-market__search"><span>Modell oder Modellcode suchen</span><input type="search" value={filters.query || ''} onChange={event => updateFilter('query', event.target.value)} placeholder="z. B. M5 Smart" /></label>
      <label><span>Marke</span><select value={filters.brand || ''} onChange={event => updateFilter('brand', event.target.value)}><option value="">Alle Marken</option>{brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}</select></label>
      <label><span>Bauform</span><select value={filters.architecture || ''} onChange={event => updateFilter('architecture', event.target.value)}><option value="">Alle Bauformen</option><option value="fully-in-bra-electric-wearable">Motor im BH</option><option value="in-bra-cups-with-tubing-and-external-portable-motor">Externer Motor</option><option value="unverified">Bauform offen</option></select></label>
      <label><span>Angebotsbeobachtung</span><select value={filters.offers || ''} onChange={event => updateFilter('offers', event.target.value)}><option value="">Alle Beobachtungen</option><option value="public-offer-observed">Angebot beobachtet</option><option value="not-found">Kein Angebot belegt</option></select></label>
      <button type="button" onClick={() => setFilters({})}>Filter zurücksetzen</button>
    </fieldset>
    <p className="wearable-market__results" aria-live="polite" aria-atomic="true">{visible.length} von {WEARABLE_MARKET.models.length} recherchierten Modellen</p>
    {visible.length === 0 && <p>Kein Modell passt zu Deinen Filtern. Versuche eine andere Suche oder setze die Filter zurück.</p>}
    <ul className="wearable-market__cards">
      {visible.map(model => <li id={`modell-${WEARABLE_MARKET.models.indexOf(model) + 1}`} key={`${model.brand}|${model.canonicalModel}`}><MarketCard model={model} /></li>)}
    </ul>
    <div className="wearable-market__checklist"><h3>Bevor Du Dich entscheidest</h3><ul>{WEARABLE_MARKET.buyerChecklist.map(item => <li key={item}>{item}</li>)}</ul><p>Vielleicht passt Deine vorhandene Pumpe mit den richtigen Einsätzen und Ersatzteilen bereits zu Deinem Bedarf. Kläre die Passform, bevor Du ein neues System bestellst.</p></div>
    <p className="wearable-market__disclosure">* Werbung / Affiliate: Amazon-Links tragen die Kennung andreasboeh09-21. Bei qualifizierten Käufen kann eine Provision entstehen. Suchlinks sind keine verifizierten Einzelangebote; die Herstellerquellen bleiben ohne Affiliate-Kennung zugänglich.</p>
  </section>;
}
