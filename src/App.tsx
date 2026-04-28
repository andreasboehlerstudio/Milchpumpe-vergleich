/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { 
  Star, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Award, 
  Search, 
  Volume2, 
  Battery, 
  Maximize2, 
  Settings, 
  Droplets, 
  Euro,
  ExternalLink,
  Menu,
  Info,
  Lock,
  Cookie
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Product {
  rank: number;
  id: string;
  name: string;
  brand: string;
  score: number;
  rating: number;
  reviews: number;
  price: string;
  description: string;
  pros: string[];
  cons: string[];
  type: string;
  features: string[];
  amazonUrl: string;
  emoji: string;
  imageUrl?: string;
  badge?: string;
  specs: {
    handsFree: boolean;
    app: boolean;
    double: boolean;
    noise: string;
    battery: string;
  };
}

/// --- Data ---
const AFFILIATE_TAG = 'andyboeh-21';
const CURRENT_YEAR = new Date().getFullYear();
const GTM_ID = import.meta.env.VITE_GTM_ID || 'GTM-MMXGDLK9';
const GA_ID = import.meta.env.VITE_GA_ID || 'G-4MTYQGF7VK';

// --- GTM Loader ---
const loadGTM = () => {
  if (typeof window === 'undefined' || (window as any).gtmLoaded) return;
  (window as any).gtmLoaded = true;
  
  (function(w: any, d: any, s: string, l: string, i: string){
    w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
    j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window, document, 'script', 'dataLayer', GTM_ID);
};

// --- Google Analytics Loader ---
const loadGA = () => {
  if (typeof window === 'undefined' || (window as any).gaLoaded) return;
  (window as any).gaLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function() {
    (window as any).dataLayer.push(arguments);
  };
  (window as any).gtag('js', new Date());
  (window as any).gtag('config', GA_ID);
};

// --- Tracking Helpers ---
const trackAmazonClick = (productName: string) => {
  if ((window as any).gtag) {
    (window as any).gtag('event', 'amazon_click', {
      'product_name': productName,
      'event_category': 'affiliate',
      'event_label': productName
    });
  }
};

const PRODUCTS: Product[] = [
  {
    rank: 1,
    id: 'momcozy-m9',
    brand: 'Momcozy',
    name: 'M9',
    score: 9.4,
    rating: 4.8,
    reviews: 3200,
    price: 'ab ca. 99 €',
    description: 'Die Momcozy M9 setzt neue Maßstäbe in Sachen Preis-Leistung. Mit ihrer intuitiven App-Steuerung und den sanften, aber effektiven Pumpmodi ist sie der ideale Begleiter für den Alltag.',
    pros: ['App-Steuerung', '3 Modi', 'Exzellentes Preis-Leistungs-Verhältnis'],
    cons: ['Mittlerer Preisbereich'],
    type: 'Elektrisch freihändig, Doppelpumpe',
    features: ['App-Steuerung', '3 Modi', '9 Saugstufen', 'USB-C'],
    amazonUrl: `https://www.amazon.de/s?k=Momcozy+M9+Milchpumpe&tag=${AFFILIATE_TAG}`,
    emoji: '🤱',
    imageUrl: 'https://m.media-amazon.com/images/I/71X-XXXXXXX.jpg', // Beispiel-URL
    badge: 'BESTSELLER',
    specs: {
      handsFree: true,
      app: true,
      double: true,
      noise: '< 45 dB',
      battery: 'bis zu 180 min'
    }
  },
  {
    rank: 2,
    id: 'medela-freestyle',
    brand: 'Medela',
    name: 'Freestyle Hands-Free',
    score: 9.1,
    rating: 4.7,
    reviews: 1800,
    price: 'ab ca. 179 €',
    description: 'Medizinische Qualität trifft auf maximale Freiheit. Die anatomisch geformten Auffangschalen schmiegen sich perfekt an und sorgen für ein diskretes Abpumperlebnis auf Krankenhaus-Niveau.',
    pros: ['Medizinische Qualität', 'Sehr leise & diskret', 'Anatomische Schalen'],
    cons: ['Premium-Preis', 'Schalen etwas sperrig'],
    type: 'Elektrisch freihändig, Doppelpumpe',
    features: ['MyMedela App', '2-Phasen-Technologie', 'Wiederaufladbar'],
    amazonUrl: `https://www.amazon.de/s?k=Medela+Freestyle+Hands-Free+Milchpumpe&tag=${AFFILIATE_TAG}`,
    emoji: '🏥',
    badge: 'BELIEBT',
    specs: {
      handsFree: true,
      app: true,
      double: true,
      noise: '< 40 dB',
      battery: 'bis zu 120 min'
    }
  },
  {
    rank: 3,
    id: 'philips-avent',
    brand: 'Philips Avent',
    name: 'SCF547',
    score: 8.8,
    rating: 4.6,
    reviews: 2100,
    price: 'ab ca. 189 €',
    description: 'Die Philips Avent überzeugt durch ihre Transparenz und einfache Handhabung. Wenige Einzelteile machen die Reinigung zum Kinderspiel, während die Saugkraft keine Wünsche offen lässt.',
    pros: ['Transparente Cups', 'Einfache Reinigung', 'Starke Saugkraft'],
    cons: ['Keine App-Steuerung', 'Ungenaue Akkuanzeige'],
    type: 'Elektrisch freihändig, Doppelpumpe',
    features: ['85 Pumpbewegungen/min', 'Wenig Teile', 'USB-C'],
    amazonUrl: `https://www.amazon.de/s?k=Philips+Avent+SCF547+Milchpumpe&tag=${AFFILIATE_TAG}`,
    emoji: '✨',
    specs: {
      handsFree: true,
      app: false,
      double: true,
      noise: '< 45 dB',
      battery: 'bis zu 150 min'
    }
  },
  {
    rank: 4,
    id: 'momcozy-s12-pro',
    brand: 'Momcozy',
    name: 'S12 Pro',
    score: 8.5,
    rating: 4.6,
    reviews: 4500,
    price: 'ab ca. 59 €',
    description: 'Der Budget-König unter den Wearables. Die S12 Pro bietet solide Leistung und eine große Auswahl an Flanschgrößen für einen Bruchteil des Preises der Konkurrenz.',
    pros: ['Sehr günstig', 'Viele Flanschgrößen', 'Gute Saugkraft'],
    cons: ['Keine App-Steuerung'],
    type: 'Elektrisch freihändig, Doppelpumpe',
    features: ['Flanschgrößen 15-27mm', '2-Phasen-Programm', 'Leise'],
    amazonUrl: `https://www.amazon.de/s?k=Momcozy+S12+Pro+Milchpumpe&tag=${AFFILIATE_TAG}`,
    emoji: '💰',
    specs: {
      handsFree: true,
      app: false,
      double: true,
      noise: '< 50 dB',
      battery: 'bis zu 140 min'
    }
  },
  {
    rank: 5,
    id: 'elvie-single',
    brand: 'Elvie',
    name: 'Pump Single',
    score: 8.2,
    rating: 4.4,
    reviews: 890,
    price: 'ab ca. 269 €',
    description: 'Wenn Diskretion an erster Stelle steht, ist die Elvie unschlagbar. Sie ist die leiseste Pumpe im Test und verschwindet fast unsichtbar im BH.',
    pros: ['Absolut leise (~22dB)', 'Ultra-kompakt', 'Hervorragende App'],
    cons: ['Sehr teuer', 'Geringes Volumen (120ml)'],
    type: 'Elektrisch freihändig, Einzelpumpe',
    features: ['App-gesteuert', 'Ultra-kompakt', '150 min Akku'],
    amazonUrl: `https://www.amazon.de/s?k=Elvie+Pump+Milchpumpe&tag=${AFFILIATE_TAG}`,
    emoji: '🤫',
    specs: {
      handsFree: true,
      app: true,
      double: false,
      noise: '~ 22 dB',
      battery: 'bis zu 150 min'
    }
  },
  {
    rank: 6,
    id: 'haakaa-gen3',
    brand: 'Haakaa',
    name: 'Silikon Gen. 3',
    score: 7.9,
    rating: 4.5,
    reviews: 12000,
    price: 'ab ca. 17 €',
    description: 'Die perfekte Ergänzung für jede stillende Mama. Ohne Strom und Kabel fängt sie wertvolle Milch auf, während das Baby an der anderen Seite trinkt.',
    pros: ['Extrem günstig', 'Geräuschlos', 'Kein Strom nötig'],
    cons: ['Manuell', 'Geringe Saugkraft', 'Nicht für Vollzeit-Pumpen'],
    type: 'Manuelle Handmilchpumpe, Vollsilikon',
    features: ['BPA-frei', 'Lebensmittelsicheres Silikon', 'Saugnapf'],
    amazonUrl: `https://www.amazon.de/s?k=Haakaa+Silikon+Milchpumpe&tag=${AFFILIATE_TAG}`,
    emoji: '🍼',
    specs: {
      handsFree: true,
      app: false,
      double: false,
      noise: '0 dB',
      battery: 'N/A'
    }
  }
];

const FAQ_ITEMS = [
  {
    question: 'Wie bewahre ich die abgepumpte Milch am besten auf?',
    answer: 'Frisch abgepumpte Milch hält sich bei Raumtemperatur ca. 4 Stunden, im Kühlschrank (nicht in der Tür!) bis zu 4 Tage und im Gefrierschrank bei -18°C ca. 6-12 Monate. Verwende immer BPA-freie Beutel oder Flaschen.'
  },
  {
    question: 'Kann ich während des Abpumpens wirklich arbeiten?',
    answer: 'Ja, das ist der große Vorteil tragbarer Milchpumpen! Da sie im BH sitzen und kabellos sind, kannst du tippen, telefonieren oder leichte Hausarbeit erledigen. Achte nur darauf, dich nicht zu weit nach vorne zu beugen, um Auslaufen zu vermeiden.'
  },
  {
    question: 'Welche Pumpe ist am besten für Erstmamas geeignet?',
    answer: 'Für den Einstieg empfehlen wir die Momcozy M9 oder die Medela Freestyle. Beide bieten eine gute Mischung aus einfacher Bedienung, App-Unterstützung und effektiver Saugkraft, was am Anfang sehr hilfreich sein kann.'
  },
  {
    question: 'Übernimmt die Krankenkasse die Kosten in Deutschland?',
    answer: 'In der Regel übernehmen Krankenkassen die Miete für elektrische Milchpumpen (meist Medela Symphony) auf Rezept bei medizinischer Notwendigkeit. Tragbare Wearables sind oft Privatvergnügen, aber einige Kassen bezuschussen Gesundheits-Budgets. Nachfragen lohnt sich!'
  },
  {
    question: 'Sollte ich eine Doppel- oder Einzelpumpe wählen?',
    answer: 'Doppelpumpen sparen 50% Zeit und können die Milchproduktion besser anregen (Prolektinspiegel). Einzelpumpen wie die Elvie sind diskreter für unterwegs. Wenn du regelmäßig abpumpst, ist eine Doppelpumpe fast immer die bessere Wahl.'
  },
  {
    question: 'Wie oft sollte ich am Tag abpumpen?',
    answer: 'Das hängt von deinem Ziel ab. Um die Produktion aufrechtzuerhalten, wird oft 8-10 Mal in 24 Stunden empfohlen (ähnlich dem Stillrhythmus). Wenn du nur Vorräte anlegen willst, reicht oft 1-2 Mal zusätzlich zum Stillen.'
  }
];

// --- Components ---

const CookieConsent = ({ onAccept }: { onAccept: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:max-w-md"
    >
      <div className="bg-white rounded-3xl p-6 shadow-2xl border border-primary/10">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
            <Cookie size={20} />
          </div>
          <div>
            <h4 className="font-bold text-text-dark mb-1">Cookie-Einstellungen</h4>
            <p className="text-xs text-text-medium leading-relaxed">
              Wir nutzen Cookies, um dein Erlebnis zu verbessern und die Nutzung unserer Seite zu analysieren. Einige sind technisch notwendig, andere helfen uns bei der Optimierung.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleAccept}
            className="flex-grow py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            Alle akzeptieren
          </button>
          <button 
            onClick={handleDecline}
            className="px-6 py-3 bg-bg-cream text-text-medium rounded-xl text-sm font-bold hover:bg-primary/5 transition-colors"
          >
            Ablehnen
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const LegalPage = ({ type, onClose }: { type: 'impressum' | 'datenschutz', onClose: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg-cream pt-32 pb-20 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onClose}
          className="mb-8 flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
        >
          <ChevronDown className="rotate-90" size={20} /> Zurück zur Startseite
        </button>

        {type === 'impressum' ? (
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-primary/5">
            <div className="flex items-center gap-3 mb-8">
              <Info className="text-primary" size={32} />
              <h1 className="text-4xl md:text-5xl">Impressum</h1>
            </div>
            
            <div className="space-y-8 text-text-medium leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-text-dark mb-4">Angaben gemäß § 5 TMG</h2>
                <p>
                  Andreas Böhler<br />
                  Am Mühlbach 14<br />
                  79114 Freiburg
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-dark mb-4">Kontakt</h2>
                <p>
                  E-Mail: admin@andreasboehler.com
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-dark mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <p>
                  Andreas Böhler<br />
                  Am Mühlbach 14<br />
                  79114 Freiburg
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-dark mb-4">EU-Streitschlichtung</h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary underline ml-1">
                    https://ec.europa.eu/consumers/odr/
                  </a>.
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-dark mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-primary/5">
            <div className="flex items-center gap-3 mb-8">
              <Lock className="text-primary" size={32} />
              <h1 className="text-4xl md:text-5xl">Datenschutzerklärung</h1>
            </div>
            
            <div className="space-y-8 text-text-medium leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-text-dark mb-4">1. Datenschutz auf einen Blick</h2>
                <h3 className="font-bold mb-2">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-dark mb-4">2. Datenerfassung auf dieser Website</h2>
                <h3 className="font-bold mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>
                <h3 className="font-bold mt-4 mb-2">Wie erfassen wir Ihre Daten?</h3>
                <p>
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-dark mb-4">3. Affiliate-Programme</h2>
                <p>
                  Diese Website nimmt am Amazon EU-Partnerprogramm teil. Amazon setzt Cookies ein, um die Herkunft der Bestellungen nachvollziehen zu können. Dadurch kann Amazon erkennen, dass Sie den Partnerlink auf dieser Website geklickt haben. Weitere Informationen zur Datennutzung durch Amazon erhalten Sie in der Datenschutzerklärung von Amazon.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-text-dark mb-4">4. Analyse-Tools und Tools von Drittanbietern</h2>
                <p>
                  Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden.
                </p>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={14} 
          className={i < Math.floor(rating) ? "fill-gold text-gold" : "text-gray-300"} 
        />
      ))}
    </div>
  );
};

const Badge = ({ children, color = 'gold' }: { children: ReactNode, color?: 'gold' | 'green' }) => {
  const colors = {
    gold: 'bg-gold/10 text-gold border-gold/20',
    green: 'bg-neutral/10 text-neutral border-neutral/20'
  };
  return (
    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 border rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'impressum' | 'datenschutz'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product | 'price_num'; direction: 'asc' | 'desc' } | null>({ key: 'score', direction: 'desc' });
  const [filters, setFilters] = useState({
    onlyDouble: false,
    onlyApp: false,
    onlyHandsFree: false
  });
  const rankingRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const getPriceValue = (priceStr: string) => {
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filtering
    if (filters.onlyDouble) result = result.filter(p => p.specs.double);
    if (filters.onlyApp) result = result.filter(p => p.specs.app);
    if (filters.onlyHandsFree) result = result.filter(p => p.specs.handsFree);

    // Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === 'price_num') {
          aValue = getPriceValue(a.price);
          bValue = getPriceValue(b.price);
        } else {
          aValue = a[sortConfig.key as keyof Product];
          bValue = b[sortConfig.key as keyof Product];
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [sortConfig, filters]);

  const handleSort = (key: keyof Product | 'price_num') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    // Check for existing consent
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      setCookiesAccepted(true);
      loadGTM();
      loadGA();
      
      // Track page view on view change if GA is already loaded
      if ((window as any).gtag) {
        (window as any).gtag('config', GA_ID, {
          page_path: view === 'home' ? '/' : `/${view}`,
          page_title: document.title
        });
      }
    }

    if (view !== 'home') {
      window.scrollTo(0, 0);
    }
    
    // Dynamically update SEO tags
    const title = `Milchpumpe Vergleich ${CURRENT_YEAR} | Die 6 besten tragbaren Pumpen im Test`;
    const description = `Milchpumpe Vergleich ${CURRENT_YEAR}: Wir zeigen dir die besten tragbaren & freihändigen Brustpumpen. Unabhängige Tests, Erfahrungen und die besten Amazon-Angebote.`;
    
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [view]);

  const scrollToSection = (ref: RefObject<HTMLDivElement | null>) => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleCookieAccept = () => {
    setCookiesAccepted(true);
    loadGTM();
    loadGA();
    console.log('Marketing-Cookies akzeptiert, GTM & GA geladen');
  };

  // SEO: Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": PRODUCTS.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": `${p.brand} ${p.name}`,
        "description": p.description,
        "brand": {
          "@type": "Brand",
          "name": p.brand
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": p.rating,
          "reviewCount": p.reviews
        }
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-secondary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <CookieConsent onAccept={handleCookieAccept} />

      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-50 bg-bg-cream/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-serif text-xl font-bold">M</div>
            <span className="font-serif text-2xl font-bold text-primary tracking-tight">Milchpumpe<span className="text-secondary">-Vergleich.de</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-medium">
            <button onClick={() => scrollToSection(rankingRef)} className="hover:text-primary transition-colors">Ranking</button>
            <button onClick={() => scrollToSection(comparisonRef)} className="hover:text-primary transition-colors">Vergleich</button>
            <button onClick={() => scrollToSection(guideRef)} className="hover:text-primary transition-colors">Ratgeber</button>
            <button onClick={() => scrollToSection(faqRef)} className="hover:text-primary transition-colors">FAQ</button>
          </nav>

          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg-cream pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-xl font-serif">
              <button className="text-left" onClick={() => scrollToSection(rankingRef)}>Produktranking</button>
              <button className="text-left" onClick={() => scrollToSection(comparisonRef)}>Vergleichstabelle</button>
              <button className="text-left" onClick={() => scrollToSection(guideRef)}>Kaufratgeber</button>
              <button className="text-left" onClick={() => scrollToSection(faqRef)}>Häufige Fragen</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'home' ? (
        <main className="flex-grow">
          {/* --- Hero Section --- */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32 px-6 md:px-20 bg-gradient-to-b from-bg-warm to-bg-cream">
          <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold tracking-wider uppercase mb-6">
                <Award size={14} /> Update April {CURRENT_YEAR}
              </div>
              <h1 className="text-5xl md:text-7xl mb-6 leading-[1.1]">
                Der große <span className="text-primary italic">Milchpumpe Vergleich</span> {CURRENT_YEAR}
              </h1>
              <p className="text-lg md:text-xl text-text-medium mb-10 max-w-lg leading-relaxed">
                Wir helfen dir, die perfekte tragbare Milchpumpe zu finden. Wir vergleichen Saugkraft, Lautstärke und Komfort für deinen Alltag.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <button 
                  onClick={() => scrollToSection(rankingRef)}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                >
                  Zum Ranking {CURRENT_YEAR}
                </button>
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/mama${i}/100/100`} 
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      alt={`Zufriedene Mutter ${i}`}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-bg-cream flex items-center justify-center text-[10px] font-bold text-text-light">
                    +2k
                  </div>
                </div>
                <span className="text-xs text-text-light font-medium">Vertraut von über 2.000 Mamas</span>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-primary/10 pt-8">
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-serif font-bold text-primary">8+</span>
                  <span className="text-[10px] text-text-light uppercase tracking-widest font-bold">Modelle getestet</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-serif font-bold text-primary">4.7★</span>
                  <span className="text-[10px] text-text-light uppercase tracking-widest font-bold">Ø-Bewertung</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-serif font-bold text-primary">100%</span>
                  <span className="text-[10px] text-text-light uppercase tracking-widest font-bold">Unabhängig</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden md:block"
            >
              <div className="relative z-10 w-full aspect-square bg-secondary/5 rounded-[40px] flex items-center justify-center overflow-hidden border border-secondary/10">
                <div className="text-[180px] animate-float">🤱</div>
                
                {/* Floating UI Elements */}
                <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl border border-primary/5 flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="w-10 h-10 bg-neutral/10 rounded-full flex items-center justify-center text-neutral">
                    <Volume2 size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-text-light font-bold uppercase">Lautstärke</div>
                    <div className="text-sm font-bold">Ultra Leise</div>
                  </div>
                </div>

                <div className="absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-xl border border-primary/5 flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                    <Battery size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-text-light font-bold uppercase">Akkulaufzeit</div>
                    <div className="text-sm font-bold">3+ Stunden</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative shapes */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary/5 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </section>

        {/* --- Affiliate Notice --- */}
        <div className="bg-white border-y border-primary/5 py-4 px-6 text-center">
          <p className="text-[11px] md:text-xs text-text-light max-w-2xl mx-auto leading-relaxed">
            <ShieldCheck size={14} className="inline mr-1 mb-0.5 text-neutral" />
            <strong>Transparenz-Hinweis:</strong> Diese Seite enthält Affiliate-Links. Als Amazon-Partner erhalten wir eine Provision für qualifizierte Käufe – ohne Mehrkosten für dich. Unsere Empfehlungen bleiben davon unbeeinflusst.
          </p>
        </div>

        {/* --- Ranking Section --- */}
        <section id="ranking" ref={rankingRef} className="py-20 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl mb-6">Das Top-6 Ranking {CURRENT_YEAR}</h2>
            <p className="text-text-medium max-w-2xl mx-auto text-lg">
              Basierend auf Saugkraft, Lautstärke, Akkulaufzeit und Nutzerbewertungen haben wir die besten tragbaren Milchpumpen ermittelt.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {PRODUCTS.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative group bg-white rounded-[32px] p-6 md:p-10 border-2 transition-all hover:shadow-2xl hover:-translate-y-1 ${
                  product.rank === 1 ? 'border-gold shadow-gold/5' : 
                  product.rank === 2 ? 'border-neutral/30 shadow-neutral/5' : 
                  'border-primary/5 shadow-primary/5'
                }`}
              >
                {product.badge && (
                  <div className={`absolute -top-4 right-8 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg ${
                    product.rank === 1 ? 'bg-gold text-white' : 'bg-neutral text-white'
                  }`}>
                    {product.badge}
                  </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  {/* Rank & Image */}
                  <div className="flex flex-row lg:flex-col items-center gap-6 lg:w-48 shrink-0">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-bg-cream flex items-center justify-center text-3xl font-serif font-bold text-primary border border-primary/10">
                      #{product.rank}
                    </div>
                    <div className="relative w-32 h-32 lg:w-full aspect-square bg-gradient-to-br from-bg-warm to-white rounded-3xl flex items-center justify-center border border-primary/5 group-hover:scale-105 transition-transform duration-500 shadow-inner overflow-hidden">
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={`${product.brand} ${product.name}`}
                          className="relative z-10 w-full h-full object-contain p-4 drop-shadow-md"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="relative z-10 text-6xl drop-shadow-md">{product.emoji}</span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-secondary uppercase tracking-wider">{product.brand}</span>
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-text-light font-medium">({product.reviews.toLocaleString()} Reviews)</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl mb-4">{product.name}</h3>
                    <p className="text-text-medium mb-6 leading-relaxed text-lg">
                      {product.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-text-light mb-3 flex items-center gap-2">
                          <Check size={14} className="text-neutral" /> Vorteile
                        </h4>
                        <ul className="space-y-2">
                          {product.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-text-medium">
                              <div className="w-1.5 h-1.5 rounded-full bg-neutral mt-1.5 shrink-0"></div>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-text-light mb-3 flex items-center gap-2">
                          <X size={14} className="text-primary" /> Nachteile
                        </h4>
                        <ul className="space-y-2">
                          {product.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-text-medium">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0"></div>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feat, i) => (
                        <span key={i} className="px-3 py-1 bg-bg-cream text-text-medium text-[11px] font-medium rounded-lg border border-primary/5">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA & Score */}
                  <div className="lg:w-64 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-primary/10 pt-8 lg:pt-0 lg:pl-8">
                    <div className="text-center lg:text-left mb-8">
                      <div className="text-[10px] text-text-light font-bold uppercase tracking-widest mb-1">Gesamtscore</div>
                      <div className="flex items-baseline justify-center lg:justify-start gap-1">
                        <span className="text-5xl font-serif font-bold text-primary">{product.score}</span>
                        <span className="text-xl text-text-light font-serif">/10</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center lg:text-left">
                        <div className="text-[10px] text-text-light font-bold uppercase tracking-widest mb-1">Preisbereich</div>
                        <div className="text-xl font-bold text-text-dark">{product.price}</div>
                      </div>
                      <a 
                        href={product.amazonUrl}
                        target="_blank"
                        rel="noopener sponsored"
                        title={`${product.brand} ${product.name} auf Amazon ansehen`}
                        onClick={() => trackAmazonClick(`${product.brand} ${product.name}`)}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-[#FF9900] text-white rounded-2xl font-bold hover:bg-[#E68A00] transition-all shadow-lg shadow-orange-500/10"
                      >
                        Bei Amazon prüfen <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Comparison Table --- */}
        <section id="vergleich" ref={comparisonRef} className="py-20 md:py-32 bg-bg-warm px-6 md:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl mb-6">Direkter Vergleich</h2>
              <p className="text-text-medium max-w-2xl mx-auto">Alle technischen Daten auf einen Blick, um die richtige Entscheidung zu treffen.</p>
            </div>

            {/* Filter Controls */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={() => setFilters(prev => ({ ...prev, onlyDouble: !prev.onlyDouble }))}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                  filters.onlyDouble 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white border-primary/10 text-text-medium hover:border-primary/30'
                }`}
              >
                Nur Doppelpumpen
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, onlyApp: !prev.onlyApp }))}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                  filters.onlyApp 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white border-primary/10 text-text-medium hover:border-primary/30'
                }`}
              >
                Nur mit App-Steuerung
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, onlyHandsFree: !prev.onlyHandsFree }))}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                  filters.onlyHandsFree 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white border-primary/10 text-text-medium hover:border-primary/30'
                }`}
              >
                Nur Hands-Free
              </button>
              {(filters.onlyDouble || filters.onlyApp || filters.onlyHandsFree) && (
                <button 
                  onClick={() => setFilters({ onlyDouble: false, onlyApp: false, onlyHandsFree: false })}
                  className="text-primary text-sm font-bold hover:underline ml-2"
                >
                  Filter zurücksetzen
                </button>
              )}
            </div>

            <div className="overflow-x-auto rounded-[32px] border border-primary/10 bg-white shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 text-text-dark font-bold text-sm uppercase tracking-wider">
                    <th className="p-6 border-b border-primary/10">Produkt</th>
                    <th 
                      className="p-6 border-b border-primary/10 text-center cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => handleSort('score')}
                    >
                      <div className="flex items-center justify-center gap-2">
                        Score {sortConfig?.key === 'score' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </div>
                    </th>
                    <th 
                      className="p-6 border-b border-primary/10 cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => handleSort('price_num')}
                    >
                      <div className="flex items-center gap-2">
                        Preis {sortConfig?.key === 'price_num' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </div>
                    </th>
                    <th className="p-6 border-b border-primary/10 text-center">App</th>
                    <th className="p-6 border-b border-primary/10 text-center">Doppel</th>
                    <th className="p-6 border-b border-primary/10">Lautstärke</th>
                    <th className="p-6 border-b border-primary/10">Akku</th>
                    <th className="p-6 border-b border-primary/10 text-center">Link</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-text-medium">
                  {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map((p, i) => (
                      <tr key={p.id} className={`hover:bg-primary/5 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-bg-cream/30'}`}>
                        <td className="p-6 font-bold text-text-dark">
                          <div className="flex items-center gap-3">
                            {p.imageUrl ? (
                              <img 
                                src={p.imageUrl} 
                                alt={p.name} 
                                className="w-10 h-10 object-contain rounded-lg bg-white border border-primary/5 p-1"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="text-xl">{p.emoji}</span>
                            )}
                            <div>
                              <div className="text-[10px] text-secondary uppercase tracking-tighter">{p.brand}</div>
                              {p.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-lg font-bold">{p.score}</span>
                        </td>
                        <td className="p-6 font-medium text-text-dark">{p.price.replace('ab ca. ', '')}</td>
                        <td className="p-6 text-center">
                          {p.specs.app ? <Check size={18} className="mx-auto text-neutral" /> : <X size={18} className="mx-auto text-primary/30" />}
                        </td>
                        <td className="p-6 text-center">
                          {p.specs.double ? <Check size={18} className="mx-auto text-neutral" /> : <X size={18} className="mx-auto text-primary/30" />}
                        </td>
                        <td className="p-6">{p.specs.noise}</td>
                        <td className="p-6">{p.specs.battery}</td>
                        <td className="p-6 text-center">
                          <a 
                            href={p.amazonUrl} 
                            target="_blank" 
                            rel="noopener sponsored" 
                            title={`${p.brand} ${p.name} Preis auf Amazon prüfen`}
                            onClick={() => trackAmazonClick(`${p.brand} ${p.name}`)}
                            className="text-primary hover:text-secondary transition-colors"
                          >
                            <ExternalLink size={18} className="mx-auto" />
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="p-20 text-center text-text-light italic">
                        Keine Produkte gefunden, die den Kriterien entsprechen.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- Buying Guide --- */}
        <section id="ratgeber" ref={guideRef} className="py-20 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl mb-6">Worauf du beim Kauf achten solltest</h2>
            <p className="text-text-medium max-w-2xl mx-auto">6 entscheidende Kriterien für deine perfekte Milchpumpe.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Volume2 />,
                title: 'Lautstärke',
                text: 'Warum unter 40 dB wichtig ist: Diskretion ist alles. Eine leise Pumpe ermöglicht es dir, während Zoom-Calls oder in der Öffentlichkeit abzupumpen, ohne aufzufallen.'
              },
              {
                icon: <Battery />,
                title: 'Akkulaufzeit',
                text: 'Mindestanforderungen: Achte auf mindestens 120 Minuten Laufzeit. Das reicht für ca. 4-6 Pumpvorgänge, ohne dass du ständig nach einer Steckdose suchen musst.'
              },
              {
                icon: <Maximize2 />,
                title: 'Flanschgröße',
                text: 'Wie messen & worauf achten: Ein schlecht sitzender Flansch verursacht Schmerzen und mindert die Ausbeute. Miss deinen Brustwarzen-Durchmesser genau nach.'
              },
              {
                icon: <Settings />,
                title: 'Pumpmodi & Stufen',
                text: 'Empfohlene Anzahl: Eine gute Pumpe sollte mindestens einen Stimulations- und einen Abpumpmodus mit jeweils 5+ Saugstufen besitzen.'
              },
              {
                icon: <Droplets />,
                title: 'Reinigung',
                text: 'Anzahl Teile: Je weniger Teile, desto besser. Achte auf Spülmaschinen-Eignung und einfache Montage, um im stressigen Alltag Zeit zu sparen.'
              },
              {
                icon: <Euro />,
                title: 'Budget & Leistung',
                text: 'Preisklassen: Wearables starten bei 60€ und gehen bis 300€. Überlege dir, wie oft du pumpst – für tägliche Nutzung lohnt sich ein Premium-Modell.'
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] border border-primary/5 shadow-lg shadow-primary/5 hover:border-secondary/20 transition-colors"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl mb-4">{item.title}</h3>
                <p className="text-text-medium leading-relaxed text-sm">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section id="faq" ref={faqRef} className="py-20 md:py-32 bg-bg-warm px-6 md:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl mb-6">Häufig gestellte Fragen</h2>
              <p className="text-text-medium max-w-2xl mx-auto">Alles, was du über tragbare Milchpumpen wissen musst.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {FAQ_ITEMS.map((item, i) => (
                <div 
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-primary/5 shadow-sm"
                >
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-bg-cream/50 transition-colors"
                  >
                    <span className="font-bold text-text-dark pr-4">{item.question}</span>
                    {activeFaq === i ? <ChevronUp size={20} className="text-primary shrink-0" /> : <ChevronDown size={20} className="text-text-light shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-text-medium text-sm leading-relaxed border-t border-primary/5">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
        </main>
      ) : (
        <LegalPage type={view} onClose={() => setView('home')} />
      )}

      {/* --- Footer --- */}
      <footer className="bg-text-dark text-white pt-20 pb-10 px-6 md:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-serif text-xl font-bold">M</div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight">Milchpumpe<span className="text-secondary">-Vergleich.de</span></span>
              </div>
              <p className="text-text-light text-sm leading-relaxed mb-8">
                Milchpumpe-Vergleich.de ist dein unabhängiges Portal für die Stillzeit. Wir helfen Mamas, die besten Produkte für ihren Alltag zu finden – ehrlich, fundiert und praxisnah.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"></div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-text-light">
                <li><button onClick={() => scrollToSection(rankingRef)} className="hover:text-white transition-colors">Produktranking</button></li>
                <li><button onClick={() => scrollToSection(comparisonRef)} className="hover:text-white transition-colors">Vergleichstabelle</button></li>
                <li><button onClick={() => scrollToSection(guideRef)} className="hover:text-white transition-colors">Kaufratgeber</button></li>
                <li><button onClick={() => scrollToSection(faqRef)} className="hover:text-white transition-colors">Häufige Fragen</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-6">Rechtliches</h4>
              <ul className="space-y-4 text-sm text-text-light">
                <li><button onClick={() => setView('impressum')} className="hover:text-white transition-colors">Impressum</button></li>
                <li><button onClick={() => setView('datenschutz')} className="hover:text-white transition-colors">Datenschutz</button></li>
                <li><button onClick={() => { localStorage.removeItem('cookie-consent'); window.location.reload(); }} className="hover:text-white transition-colors">Cookie-Einstellungen</button></li>
                <li><a href="mailto:info@milchpumpe-vergleich.de" className="hover:text-white transition-colors">Kontakt</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 text-center">
            <p className="text-[10px] text-text-light max-w-3xl mx-auto leading-relaxed mb-6">
              <strong>Affiliate Disclaimer:</strong> Milchpumpe-Vergleich.de nimmt am Amazon Partnerprogramm teil. Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Die mit einem Sternchen (*) oder als "Bei Amazon prüfen" gekennzeichneten Links sind Affiliate-Links. Wenn du über diese Links kaufst, erhalten wir eine kleine Provision. Für dich ändert sich der Preis nicht. Alle Preisangaben inkl. MwSt., zzgl. Versandkosten. Preise können sich seit der letzten Aktualisierung geändert haben.
            </p>
            <p className="text-[10px] text-text-light uppercase tracking-widest font-bold">
              © {CURRENT_YEAR} Milchpumpe-Vergleich.de – Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
