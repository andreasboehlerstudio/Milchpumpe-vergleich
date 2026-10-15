import { Breadcrumbs } from './components';
import { WearableMarketOverview } from './wearable-market';

export function WearableMarketPage() {
  return <main id="inhalt">
    <section className="page-hero section">
      <Breadcrumbs items={[{ href: '/tragbare-milchpumpen/', label: 'Tragbare Milchpumpen' }]} />
      <p className="eyebrow">Wearables und Hands-free-Systeme</p>
      <h1>Tragbare Milchpumpen: Modelle und Kaufhilfe</h1>
      <p>Vergleiche recherchierte Wearable-Modelle mit Motor im BH und Hands-free-Systeme mit externem Motor. Die Übersicht ergänzt den <a href="/vergleich/">detaillierten Vergleich von sechs ausgewählten Milchpumpen</a>.</p>
      <h2>Welche ist die beste tragbare Milchpumpe?</h2>
      <p>Für schlauchfreies Abpumpen mit optionaler App und vier abwaschbaren Teilen ist die Momcozy M5 Smart ein möglicher Einstieg. Wenn ein Ladecase und sensorbasierte Anzeigen wichtig sind, lohnt sich ein Blick auf die Momcozy Air 1. Möchtest du den Motor außerhalb des BHs tragen, kommt die Medela Freestyle Hands-free infrage. Diese Auswahl folgt dokumentierten Merkmalen und deinem Einsatzfall; sie ist keine Rangfolge der Abpumpleistung oder des Komforts.</p>
      <p><a href="#kaufhilfe">Die fallbezogene Kaufhilfe mit Herstellerbelegen und Abwägungen lesen</a>. Wie wir Quellen und Kriterien gewichten, erklärt die <a href="/testmethodik/#kaufentscheidung">Vergleichsmethodik</a>; die <a href="/testmethodik/#quellen">Herstellerquellen</a> bleiben direkt zugänglich.</p>
      <p>Kläre zuerst die <a href="/ratgeber/richtige-flanschgroesse/">passende Flanschgröße</a> und prüfe, ob deine vorhandene Pumpe mit passenden Einsätzen genügt. Bei Schmerzen oder Problemen mit der Milchversorgung hilft eine qualifizierte Stillberatung.</p>
    </section>
    <div className="section" id="kaufhilfe"><WearableMarketOverview /></div>
  </main>;
}
