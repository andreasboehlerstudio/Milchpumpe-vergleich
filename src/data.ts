export const SITE_URL = 'https://milchpumpe-vergleich.de';
export const REVIEW_DATE = '16. Juli 2026';
export const REVIEW_DATE_ISO = '2026-07-16';
export const CONTACT_EMAIL = 'admin@andreasboehler.com';
export const AFFILIATE_TAG = 'andyboeh-21';

export type Product = {
  id: string;
  brand: string;
  name: string;
  shortName: string;
  focus: string;
  category: string;
  set: string;
  app: boolean;
  energy: string;
  wearStyle: string;
  cleaning: string;
  summary: string;
  facts: string[];
  strengths: string[];
  limitations: string[];
  sourceUrl: string;
  sourceLabel: string;
  color: string;
  initials: string;
  amazonQuery: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'momcozy-m9',
    brand: 'Momcozy',
    name: 'Mobile Flow M9',
    shortName: 'M9',
    focus: 'App und Personalisierung',
    category: 'Elektrisch, tragbar',
    set: 'Einzel- oder Doppelset',
    app: true,
    energy: 'Akku, USB-Ladung',
    wearStyle: 'Motor sitzt im BH',
    cleaning: 'Mehrteiliger Cup mit separater Milchschale',
    summary: 'Eine Option für Nutzerinnen, die Einstellungen diskret per App steuern und unterschiedliche Intensitäten fein abstimmen möchten.',
    facts: [
      'App-Steuerung mit personalisierbaren Mustern',
      '15 Intensitätsstufen laut Hersteller',
      'Als Einzel- und Doppelset angeboten',
      'Hersteller nennt vier bis fünf Anwendungen pro Akkuladung',
    ],
    strengths: ['Viele Einstellmöglichkeiten', 'Bedienung ohne Griff in den BH', 'Vollständig tragbares System'],
    limitations: ['App verlangt ein kompatibles Smartphone und Konto', 'Mehr Teile bedeuten mehr Reinigungsaufwand', 'Herstellerangaben ersetzen keinen Praxistest'],
    sourceUrl: 'https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump',
    sourceLabel: 'Momcozy Produktseite M9',
    color: '#d78672',
    initials: 'M9',
    amazonQuery: 'Momcozy M9 Milchpumpe',
  },
  {
    id: 'medela-freestyle',
    brand: 'Medela',
    name: 'Freestyle Hands-free',
    shortName: 'Freestyle',
    focus: 'Leichte Cups und externe Motoreinheit',
    category: 'Elektrisch, Hands-free',
    set: 'Doppelpumpe',
    app: true,
    energy: 'Akku, USB-C',
    wearStyle: 'Cups im BH, Motor separat',
    cleaning: 'Drei Cup-Teile laut Hersteller',
    summary: 'Interessant, wenn möglichst wenig Gewicht direkt im BH sitzen soll und eine separate, kompakte Motoreinheit akzeptabel ist.',
    facts: [
      'Zwei Auffangschalen mit je 150 ml Herstellerangabe',
      'Neun Vakuumstufen in Stimulations- und Abpumpphase',
      'Verbindung mit der Medela-Family-App',
      'Transparente, spülmaschinengeeignete Cups aus drei Teilen',
    ],
    strengths: ['Leichte Auffangschalen', 'Transparenz erleichtert die Ausrichtung', 'Wenige Cup-Teile'],
    limitations: ['Schläuche und separate Motoreinheit', 'Nicht vollständig im BH integriert', 'App-Funktionen sind optional, aber nicht für alle relevant'],
    sourceUrl: 'https://www.medela.com/en-us/breastfeeding-pumping/products/pumps/hands-free-electric/freestyle-hands-free-breast-pump?productId=4072',
    sourceLabel: 'Medela Produktseite Freestyle Hands-free',
    color: '#e2b8a7',
    initials: 'MF',
    amazonQuery: 'Medela Freestyle Hands-Free Milchpumpe',
  },
  {
    id: 'philips-avent-scf547',
    brand: 'Philips Avent',
    name: 'SCF547/11 Hands-free',
    shortName: 'SCF547',
    focus: 'Transparente Auffangschalen',
    category: 'Elektrisch, Hands-free',
    set: 'Doppelpumpe',
    app: false,
    energy: 'Akku, USB',
    wearStyle: 'Cups im BH, Motor separat',
    cleaning: 'Wenige Teile laut Hersteller',
    summary: 'Eine nachvollziehbare Wahl für Nutzerinnen, die den Milchfluss sehen möchten und eine klassische Bedienung ohne App bevorzugen.',
    facts: [
      'Vollständig transparente Auffangschalen',
      'Bis zu 85 Saugbewegungen pro Minute laut Hersteller',
      'Verschiedene Brustkissen- und Einsatzgrößen',
      'Als elektrische Doppelpumpe ausgelegt',
    ],
    strengths: ['Milchfluss und Ausrichtung sichtbar', 'Keine App erforderlich', 'Wenige Teile laut Produktbeschreibung'],
    limitations: ['Separate Motoreinheit und Schläuche', 'Keine App-Steuerung', 'Leistungsangaben stammen vom Hersteller'],
    sourceUrl: 'https://www.philips.de/shop/mutter-und-kind/milchpumpen-und-brustpflege/hands-free-elektrische-doppelmilchpumpe/p/SCF547_11',
    sourceLabel: 'Philips Produktseite SCF547/11',
    color: '#a7c5c1',
    initials: 'PA',
    amazonQuery: 'Philips Avent SCF547 Milchpumpe',
  },
  {
    id: 'momcozy-s12-pro',
    brand: 'Momcozy',
    name: 'S12 Pro',
    shortName: 'S12 Pro',
    focus: 'Direkte Bedienung am Gerät',
    category: 'Elektrisch, tragbar',
    set: 'Einzel- oder Doppelset',
    app: false,
    energy: 'Akku, USB-C',
    wearStyle: 'Motor sitzt im BH',
    cleaning: 'Cup-System mit mehreren Einzelteilen',
    summary: 'Für Nutzerinnen, die eine vollständig tragbare Pumpe ohne App suchen und Einstellungen direkt am Gerät vornehmen möchten.',
    facts: [
      'Drei Modi mit jeweils neun Stufen laut Hersteller',
      '24-mm-Flansch im Standardumfang',
      'Als Einzel- und Doppelset angeboten',
      'Hersteller nennt weniger als 45 dB und bis zu 240 Minuten Nutzung',
    ],
    strengths: ['Keine Konto- oder App-Abhängigkeit', 'Vollständig tragbar', 'Viele direkt wählbare Stufen'],
    limitations: ['Motoreinheiten erhöhen das Gewicht im BH', 'Akku- und Lautstärkewerte sind Herstellerangaben', 'Passende Einsätze müssen gegebenenfalls separat gewählt werden'],
    sourceUrl: 'https://uk.momcozy.com/products/momcozy-s12-pro-wearable-breast-pump',
    sourceLabel: 'Momcozy Produktseite S12 Pro',
    color: '#cfa0b3',
    initials: 'S12',
    amazonQuery: 'Momcozy S12 Pro Milchpumpe',
  },
  {
    id: 'elvie-pump-single',
    brand: 'Elvie',
    name: 'Pump Single',
    shortName: 'Pump',
    focus: 'Kabelloses All-in-one-System',
    category: 'Elektrisch, tragbar',
    set: 'Einzelpumpe',
    app: true,
    energy: 'Akku, USB-Ladung',
    wearStyle: 'Motor sitzt im BH',
    cleaning: 'Geschlossenes System mit Flasche',
    summary: 'Eine Einzelpumpe für Nutzerinnen, denen ein schlauchloses System und App-Unterstützung wichtiger sind als gleichzeitiges beidseitiges Pumpen.',
    facts: [
      'Ohne externe Schläuche oder Kabel während der Nutzung',
      'Optionale Steuerung und Sitzungsdaten über die Elvie-App',
      'Als Einzelpumpe eingeordnet',
      'Geschlossenes System laut Herstellerinformationen',
    ],
    strengths: ['All-in-one-Bauform', 'App-Unterstützung', 'Einzeln flexibel einsetzbar'],
    limitations: ['Nur eine Brust gleichzeitig mit dem Single-Set', 'Passform und Geräuschwahrnehmung sind individuell', 'App-Kompatibilität vor dem Kauf prüfen'],
    sourceUrl: 'https://www.elvie.com/de-de/haufig-gestellte-fragen-faqs/elvie-pump',
    sourceLabel: 'Elvie FAQ zur Elvie Pump',
    color: '#d6c4aa',
    initials: 'EP',
    amazonQuery: 'Elvie Pump Single Milchpumpe',
  },
  {
    id: 'haakaa-gen3',
    brand: 'Haakaa',
    name: 'Generation 3 Silikon-Milchpumpe',
    shortName: 'Gen 3',
    focus: 'Manuelle Ergänzung ohne Elektronik',
    category: 'Manuell, Silikon',
    set: 'Einzelpumpe',
    app: false,
    energy: 'Ohne Strom',
    wearStyle: 'Wird an der Brust angesetzt',
    cleaning: 'Silikonflansch, Ring und Flasche',
    summary: 'Eine einfache manuelle Ergänzung für kleine Mengen oder gelegentliche Nutzung – funktional nicht mit einer elektrischen Doppelpumpe gleichzusetzen.',
    facts: [
      'Manuelle Saugwirkung ohne Motor oder Akku',
      'Modulares Generation-3-System mit Schraubring und Flasche',
      'Keine App und keine elektrischen Komponenten',
      'Für gelegentliche Nutzung beziehungsweise kleine Mengen einzuordnen',
    ],
    strengths: ['Leise und stromlos', 'Wenige Komponenten', 'Kompakt für gelegentliche Nutzung'],
    limitations: ['Keine geregelten Pumpzyklen', 'Nicht direkt mit elektrischen Pumpen vergleichbar', 'Saugwirkung und Eignung sind individuell'],
    sourceUrl: 'https://haakaausa.com/products/haakaa-gen-3-silicone-breast-pump-1-pk',
    sourceLabel: 'Haakaa Produktseite Generation 3',
    color: '#9eb5a7',
    initials: 'H3',
    amazonQuery: 'Haakaa Gen 3 Silikon Milchpumpe',
  },
];

export function productUrl(product: Product) {
  return `/produkte/${product.id}/`;
}

export function amazonUrl(product: Product) {
  return `https://www.amazon.de/s?k=${encodeURIComponent(product.amazonQuery)}&tag=${AFFILIATE_TAG}`;
}

export const GUIDE_ARTICLES = [
  {
    slug: 'richtige-flanschgroesse',
    title: 'Flanschgröße richtig einordnen',
    description: 'Warum die Passform wichtig ist, wie Hersteller messen lassen und wann fachliche Unterstützung sinnvoll ist.',
  },
  {
    slug: 'milchpumpe-reinigen',
    title: 'Milchpumpe hygienisch reinigen',
    description: 'Ein praktischer Ablauf auf Basis der Empfehlungen des Bundeszentrums für Ernährung.',
  },
  {
    slug: 'tragbar-oder-elektrisch',
    title: 'Tragbar, elektrisch oder manuell?',
    description: 'Die Pumpenarten nach Einsatzhäufigkeit, Bewegungsfreiheit und Reinigungsaufwand unterscheiden.',
  },
];
