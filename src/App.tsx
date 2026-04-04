/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode } from 'react';
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
  Menu
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const rankingRef = useRef<HTMLDivElement>(null);

  const scrollToRanking = () => {
    rankingRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-50 bg-bg-cream/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-serif text-xl font-bold">M</div>
            <span className="font-serif text-2xl font-bold text-primary tracking-tight">Milchpumpe<span className="text-secondary">-Vergleich.de</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-medium">
            <a href="#ranking" className="hover:text-primary transition-colors">Ranking</a>
            <a href="#vergleich" className="hover:text-primary transition-colors">Vergleich</a>
            <a href="#ratgeber" className="hover:text-primary transition-colors">Ratgeber</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
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
              <a href="#ranking" onClick={() => setIsMenuOpen(false)}>Produktranking</a>
              <a href="#vergleich" onClick={() => setIsMenuOpen(false)}>Vergleichstabelle</a>
              <a href="#ratgeber" onClick={() => setIsMenuOpen(false)}>Kaufratgeber</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)}>Häufige Fragen</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

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
                <Award size={14} /> Update April 2026
              </div>
              <h1 className="text-5xl md:text-7xl mb-6 leading-[1.1]">
                Der große <span className="text-primary italic">Milchpumpe Vergleich</span> 2026
              </h1>
              <p className="text-lg md:text-xl text-text-medium mb-10 max-w-lg leading-relaxed">
                Wir helfen dir, die perfekte tragbare Milchpumpe zu finden. Wir vergleichen Saugkraft, Lautstärke und Komfort für deinen Alltag.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <button 
                  onClick={scrollToRanking}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
                >
                  Zum Ranking 2026
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
            <h2 className="text-4xl md:text-6xl mb-6">Das Top-6 Ranking 2026</h2>
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
                    <div className="relative w-32 h-32 lg:w-full aspect-square bg-gradient-to-br from-bg-warm to-white rounded-3xl flex items-center justify-center text-6xl border border-primary/5 group-hover:scale-105 transition-transform duration-500 shadow-inner">
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                      <span className="relative z-10 drop-shadow-md">{product.emoji}</span>
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
        <section id="vergleich" className="py-20 md:py-32 bg-bg-warm px-6 md:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl mb-6">Direkter Vergleich</h2>
              <p className="text-text-medium max-w-2xl mx-auto">Alle technischen Daten auf einen Blick, um die richtige Entscheidung zu treffen.</p>
            </div>

            <div className="overflow-x-auto rounded-[32px] border border-primary/10 bg-white shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 text-text-dark font-bold text-sm uppercase tracking-wider">
                    <th className="p-6 border-b border-primary/10">Produkt</th>
                    <th className="p-6 border-b border-primary/10 text-center">Score</th>
                    <th className="p-6 border-b border-primary/10">Preis</th>
                    <th className="p-6 border-b border-primary/10 text-center">App</th>
                    <th className="p-6 border-b border-primary/10 text-center">Doppel</th>
                    <th className="p-6 border-b border-primary/10">Lautstärke</th>
                    <th className="p-6 border-b border-primary/10">Akku</th>
                    <th className="p-6 border-b border-primary/10 text-center">Link</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-text-medium">
                  {PRODUCTS.map((p, i) => (
                    <tr key={p.id} className={`hover:bg-primary/5 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-bg-cream/30'}`}>
                      <td className="p-6 font-bold text-text-dark">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{p.emoji}</span>
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
                          className="text-primary hover:text-secondary transition-colors"
                        >
                          <ExternalLink size={18} className="mx-auto" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- Buying Guide --- */}
        <section id="ratgeber" className="py-20 md:py-32 px-6 md:px-20 max-w-[1440px] mx-auto">
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
        <section id="faq" className="py-20 md:py-32 bg-bg-warm px-6 md:px-20">
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
                <li><a href="#ranking" className="hover:text-white transition-colors">Produktranking</a></li>
                <li><a href="#vergleich" className="hover:text-white transition-colors">Vergleichstabelle</a></li>
                <li><a href="#ratgeber" className="hover:text-white transition-colors">Kaufratgeber</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Häufige Fragen</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-6">Rechtliches</h4>
              <ul className="space-y-4 text-sm text-text-light">
                <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie-Einstellungen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 text-center">
            <p className="text-[10px] text-text-light max-w-3xl mx-auto leading-relaxed mb-6">
              <strong>Affiliate Disclaimer:</strong> Milchpumpe-Vergleich.de nimmt am Amazon Partnerprogramm teil. Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Die mit einem Sternchen (*) oder als "Bei Amazon prüfen" gekennzeichneten Links sind Affiliate-Links. Wenn du über diese Links kaufst, erhalten wir eine kleine Provision. Für dich ändert sich der Preis nicht. Alle Preisangaben inkl. MwSt., zzgl. Versandkosten. Preise können sich seit der letzten Aktualisierung geändert haben.
            </p>
            <p className="text-[10px] text-text-light uppercase tracking-widest font-bold">
              © 2026 Milchpumpe-Vergleich.de – Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
