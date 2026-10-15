// Current source findings sit beside, never inside, the historical offer snapshot.
export const MARKET_SOURCE_UPDATED_ON = '2026-10-15';
export type MarketEvidenceOverlay = {
  architecture?: string;
  architectureLabel?: string;
  note: string;
  mapping: string;
  variant: string;
  limitations: string;
  sources: { url: string; label: string }[];
};

export const MARKET_EVIDENCE_OVERLAY: Record<string, MarketEvidenceOverlay> = {
  'KISSBOBO|K5': {
    architectureLabel: 'Vollständig im BH (Motor integriert) · DE-Ausführung weiter abgleichen',
    note: 'K5-Markenseite belegt In-Bra-Bauweise. DE-Ausführung und widersprüchliche Saugkraft-/Abschaltangaben bleiben offen.',
    mapping: 'DE-Ausführung weiter abgleichen; Markenseite vorhanden.',
    variant: 'Modellcode, Generation und vollständigen Setumfang im Angebot abgleichen.',
    limitations: 'Die Markenseite ist kein Beleg für gleiche Technik im DE-Zweierset oder die Zuordnung zum dort genannten rechtlichen Hersteller. Die gescannte Anleitung wurde nicht inhaltlich ausgewertet; Saugkraft und Abschalttimer nicht übertragen.',
    sources: [
      { url: 'https://kissbobo.co/products/electrical-breast-pump-k5', label: 'K5-Markenseite: Bauweise; DE-Konfiguration nicht gleichgesetzt' },
      { url: 'https://kissbobo.co/pages/faqs', label: 'Marken-FAQ: abweichende technische Angaben' },
    ],
  },
  'NCVI|AM8161A (beheiztes Wearable)': {
    architectureLabel: 'Vollständig im BH (Motor integriert) · nur auf 8161-Familienebene belegt',
    note: 'AM8161-Anleitung und aktuelle NC8161-Produktseite gefunden. Die genaue AM8161A-Ausführung ist damit noch nicht gleichgesetzt.',
    mapping: 'AM8161A-Zuordnung und genaue Ausführung offen.',
    variant: 'Modellcode, Generation und vollständigen Setumfang im Angebot abgleichen.',
    limitations: 'Die verlinkte Anleitung nennt AM8161, die aktuelle Produktseite NC8161; der Suffix A ist nicht aufgelöst. Wärmefunktion nur laut DE-Angebot. Kapazität und tatsächliche Pumpenanzahl im exakten Set prüfen; nicht mit 8131 gleichsetzen.',
    sources: [
      { url: 'https://ncvi.com/NCVI-Heated-Wearable-Breast-Pump-pd528285148.html', label: 'NCVI-Produktseite: NC8161, nicht AM8161A' },
      { url: 'https://m.media-amazon.com/images/I/C1e20HOGFyL.pdf', label: 'NCVI-Anleitung AM8161 (Amazon-CDN; vom AM8161A-Angebot verlinkt)' },
    ],
  },
  'eufy|S2 Pro (Amazon T60A1; Hersteller T600P + T60A0)': {
    note: 'Anker-Anleitung nennt T60A1/T600P gemeinsam. Deutsches S2-Pro-Modell mit Ladecase belegt; regionale Komponenten und Teilezählung nicht gleichsetzen.',
    mapping: 'T60A1/T600P im gemeinsamen Guide; regionale Ausstattung prüfen.',
    variant: 'T60A1-Setumfang prüfen. Internationale Teilezahl- und Laufzeitangaben nicht übertragen.',
    limitations: 'Die deutsche Seite nennt sechs Reinigungsteile, der internationale Support fünf abwaschbare Teile. Zählumfang, regionale Komponenten, Pumpenanzahl und Case-Code im DE-Set sind nicht vollständig abgeglichen; daraus folgt keine vergleichbare Reinigungszeit.',
    sources: [
      { url: 'https://www.anker.com/de/products/t60a13b0', label: 'Deutsches S2-Pro-Modell mit Ladecase' },
      { url: 'https://m.media-amazon.com/images/I/B14nz4ngPeL.pdf', label: 'Anker-Kurzanleitung T60A1/T600P (Amazon-CDN)' },
      { url: 'https://service.eufy.com/article-description/My-Wearable-Breast-Pump-S2-T600P-S2-Pro-T600P-T60A0-has-many-parts-what-is-the-function-of-each-part', label: 'Internationaler Teile-Support: anderer Zählumfang' },
    ],
  },
  'Willow|Go (PDL60)': {
    note: 'PDL60 in älterer Herstelleranleitung dokumentiert. Aktuelle SplashGuard-Ausstattung ist für das DE-Angebot nicht bestätigt.',
    mapping: 'Regionaler Support und genaue Setausführung offen.',
    variant: 'Modellcode, Revision und vollständigen Setumfang im Angebot abgleichen.',
    limitations: 'Die ältere PDL60-Anleitung nennt fünf waschbare Teile, die neuere Go-Anleitung sechs mit SplashGuard. Kein Beleg für eine neue Motorgeneration. Region, autorisierter Verkäufer, Garantie, App-Zugang und deutsche Ersatzteilversorgung bleiben offen; die Regions-FAQ beweist keinen Ausverkauf bei Amazon.de.',
    sources: [
      { url: 'https://onewillow.com/products/willow-go-pump-kit', label: 'Aktuelle Go-Produktseite: US-Set, nicht exaktes DE-PDL60-Kit' },
      { url: 'https://onewillow.com/pages/faq', label: 'Willow-FAQ: regionale Vertriebs- und Supportgrenzen' },
      { url: 'https://pumpsformom.com/wp-content/uploads/Willow_Go_UserGuide.pdf', label: 'Herstelleranleitung PDL60 ©2021 (Händler-Spiegel)' },
      { url: 'https://m.media-amazon.com/images/I/D1bjxgPwr2L.pdf', label: 'Herstelleranleitung Go ©2025 (Amazon-CDN; anderes Teilekit)' },
    ],
  },
  'Kinderkraft|MAMAFLOW': {
    architecture: 'fully-in-bra-electric-wearable',
    architectureLabel: 'Vollständig im BH (Motor integriert)',
    note: 'Anleitung bestätigt die Motoreinheit am Sammler und das Tragen im Still-BH. Motoreinheit nicht waschen.',
    mapping: 'BH-Nutzung in der modellgenauen Anleitung bestätigt.',
    variant: 'Einzelpumpe, nicht Doppelset. Größe, vollständigen Lieferumfang und Anleitung prüfen.',
    limitations: 'MAMAFLOW DOUBLE wurde nicht auf technische Setgleichheit geprüft. Individuelle Passform und vergleichbare Laufzeit bleiben offen.',
    sources: [{ url: 'https://kinderkraft.pl/media/wysiwyg/manual/Kinderkraft-MAMAFLOW-v-1-0.pdf', label: 'MAMAFLOW v1.0: Montage, BH-Nutzung und Reinigung (S. 19–21)' }],
  },
};

// Case display order is editorial, not a quality ranking. Quotes/limits: docs/ranking-next-evidence.json.
export const CURRENT_BUYING_CASES = [
  {
    useCase: 'Schlauchfrei, direkt bedienbar',
    modelRef: { brand: 'Momcozy', canonicalModel: 'M5 Smart' },
    why: 'Wenn du ohne Schläuche abpumpen und die Pumpe direkt bedienen möchtest: Die App ist optional; der Hersteller nennt vier zu reinigende Teile.',
    decisiveProperties: [
      { claim: 'Motor und Becher sitzen im BH; direkte Bedienung oder optionale App.' },
      { claim: 'Vier zu reinigende Teile laut Hersteller; Zählumfang nicht als komplettes Doppelset belegt. Milchmengen werden manuell eingegeben.' },
    ],
    tradeOff: 'Vier Teile sind keine gemessene Reinigungszeit und kein Komfortversprechen. Herstellerwarnung: Nicht bei Herzschrittmacher, implantiertem Defibrillator oder metallischen/elektronischen Implantaten verwenden.',
    purchaseCheck: 'B0G1MWP4FB bezeichnet Grau, 1 Pack (Single), nicht die auf Herstellerbildern mögliche Doppelausführung. Passende Brusthaube, weiteres Pumpenteil bei gewünschtem Doppelbetrieb und Ersatzteile prüfen.',
    sources: [{ url: 'https://de.momcozy.com/products/m5-smart-wearable-breast-pump-upgraded-with-app-control', label: 'M5 Smart: Bedienung, Teile und Warnhinweise' }],
    alternative: {
      name: 'Elvie Pump',
      note: 'Wenn dir eine sensorbedingte Pause bei vollem Behälter wichtiger ist. Die Mengenanzeige ist eine Schätzung; den deutschen Setumfang separat prüfen.',
      sources: [
        { url: 'https://uk.elvie.com/products/elvie-pump', label: 'Elvie Pump: Merkmale beim Hersteller (UK-Set)' },
        { url: 'https://support.elvie.com/en-us/elvie-pump/troubleshooting', label: 'Elvie: Mengenanzeige prüfen und korrigieren' },
      ],
    },
  },
  {
    useCase: 'Motor außerhalb des BH',
    modelRef: { brand: 'Medela', canonicalModel: 'Freestyle Hands-free' },
    why: 'Wenn du nur die Auffangschalen im BH tragen möchtest: Der Motor bleibt separat. Schläuche und dreiteilige Schalen gehören zu dieser Bauart.',
    decisiveProperties: [
      { claim: 'Separater Motor mit Schlauch und zwei Schalen; drei Teile je Schalenaufbau, nicht für das ganze System.' },
      { claim: 'Kein automatisches Abschalten bei vollem Becher. Klassische PersonalFit Flex Teile sind kompatibel, aber separat zu kaufen.' },
    ],
    tradeOff: 'Schläuche und Motor müssen mitgeführt werden. Dreiteilige Schalen erlauben keinen direkten Schluss auf die Reinigungszeit des gesamten Systems; kein Füllstand-Autostopp. Schlauch innen nicht reinigen oder spülen; nicht vollständig bücken oder intensiven Sport treiben.',
    purchaseCheck: 'B0BKGFBKHJ bezeichnet das Freestyle-Hands-free-Doppelsystem. Nicht nur Collection Cups oder Freestyle Mini wählen. Internationalen Hersteller-Lieferumfang nicht ungeprüft auf DE übertragen.',
    sources: [{ url: 'https://www.medela.com/en/breastfeeding-pumping/products/pumps/hands-free-electric/freestyle-hands-free-double-electric-wearable-breast-pump?productId=4072', label: 'Freestyle Hands-free: Schalen, Motor und Nutzung (international)' }],
    alternative: {
      name: 'Philips Avent SCF547/11',
      note: 'Wenn du ein konkret dokumentiertes DE-Größenkit vergleichen möchtest: 21/24-mm-Brustkissen und 19-mm-Einsätze. Ebenfalls mit Schläuchen und externem Motor. Netzadapter nicht enthalten; 15/17-mm-Einsätze SCF554/11 und 26/28-mm-Ergänzungen SCF552/11 separat prüfen.',
      sources: [
        { url: 'https://www.philips.de/c-p/SCF547_11/hands-free-elektrische-doppelmilchpumpe', label: 'Philips SCF547/11: deutsches Kit' },
        { url: 'https://www.philips.de/c-p/SCF547_11/hands-free-elektrische-doppelmilchpumpe/support', label: 'Philips: Größen-Ergänzungen und Support' },
      ],
    },
  },
  {
    useCase: 'Zwischen Sitzungen im Case laden',
    modelRef: { brand: 'Momcozy', canonicalModel: 'Air 1' },
    why: 'Wenn du zwischen Sitzungen im Ladecase nachladen möchtest: Die Air 1 ergänzt das um eine transparente Oberseite und Vollstand-Meldungen.',
    decisiveProperties: [
      { claim: 'Kabelloses Ladecase und transparente Oberseite laut Hersteller; App meldet den vollen Behälter.' },
      { claim: 'Fünf nichtelektrische Teile im Reinigungsabschnitt; Motoreinheit nur trocken abwischen, nie eintauchen.' },
    ],
    tradeOff: 'Die Vollmeldung ist kein belegter Füllstand-Autostopp: Laut Hersteller sollst du die Pumpe bei vollem Behälter selbst ausschalten. Case und Sensor ersetzen keinen Passformcheck. Das Case ist kein Milchkühler oder Hygieneersatz. Herstellerwarnung: Nicht bei Herzschrittmacher, implantiertem Defibrillator oder metallischen/elektronischen Implantaten verwenden.',
    purchaseCheck: 'B0G2MQH1DF ist das beobachtete Rot-Doppelset. Ladecase und Lieferumfang im exakten Amazon-Angebot bestätigen; auf derselben Variantenfamilie stehen auch andere Pumpenmodelle. Die Herstellerseite verweist für Ersatzteile auf die App; DE-Bestand nicht geprüft.',
    sources: [{ url: 'https://de.momcozy.com/products/momcozy-air-1-ultra-slim-breast-pump', label: 'Air 1: Case, Vollmeldung, Reinigung und Warnhinweise' }],
    alternative: {
      name: 'eufy S1',
      note: 'Wenn Wärme am Flansch wichtiger ist. Achtung: Das S1-Grundset enthält kein Ladecase; für diesen Wunsch das genaue S1-Pro-Set oder passende Case separat prüfen. Milchvolumen wird manuell eingegeben; Wärme ist kein Beleg für mehr Milch. Das Case lädt die Motoreinheiten; es ist nicht zur Aufbewahrung benutzter Milchteile vorgesehen.',
      sources: [
        { url: 'https://www.eufy.com/eu-en/products/t8d02381', label: 'S1: EU-Herstellerkit und Wärmefunktion' },
        { url: 'https://www.eufy.com/blogs/baby/eufy-s1-vs-s1-pro-breast-pump', label: 'S1 und S1 Pro: Case-Unterschied (US-Herstellerseite)' },
        { url: 'https://www.eufy.com/products/t87c11b1', label: 'Separates Case: S1/S1-Pro-Kompatibilität, DE-Verfügbarkeit offen' },
      ],
    },
  },
];

export function wearableMarketEvidence(model: { brand: string; canonicalModel: string }) {
  return MARKET_EVIDENCE_OVERLAY[`${model.brand}|${model.canonicalModel}`];
}
