export type ProductFocus = {
  productId: string;
  whyItHelps?: string;
  noPurchaseAlternative?: string;
  paragraphOverrides?: Record<string, Record<number, string>>;
  /** Compatibility paragraph for the existing milk-article renderer. */
  existingAlternative: string;
};

// Canonical article → product mapping; accessory readers do not need a new pump.
const ARTICLE_FOCUS: Record<string, Omit<ProductFocus, 'existingAlternative'> & { noPurchaseAlternative: string }> = {
  'muttermilch-beschriften-portionen-gefrierfach': {
    productId: 'medela-easy-pour-storage-bags',
    whyItHelps: 'Fehlt dir eine flach verstaubare Lösung für portionierte Vorräte, können die Medela Easy Pour Beutel helfen: Sie lassen sich laut Hersteller flach einfrieren und beschriften. Sie sind Einwegbeutel, kein direkter Pumpenanschluss.',
    noPurchaseAlternative: 'Wenn du schon geeignete Muttermilchbehälter hast, beginne mit gut lesbaren Etiketten und einem festen Platz für die nächste Portion. Neue Beutel sind dafür nicht zwingend nötig.',
  },
  'muttermilch-arbeitsplatz-transport-kuehlkette': {
    productId: 'medela-cooler-bag',
    whyItHelps: 'Wenn dir für den Heimweg eine Transportlösung fehlt, bündelt die Medela Kühltasche Flaschen und ein passend geformtes Kühlelement. Prüfe den deutschen Setumfang; die Tasche allein belegt keine sichere Kühlzeit für deinen Arbeitsweg.',
    noPurchaseAlternative: 'Eine vorhandene geeignete Kühltasche kann ausreichen. Prüfe zuerst, ob deine verschlossenen Behälter und passende Kühlelemente hineinpassen und wie die Milch vor und nach dem Arbeitsweg gekühlt wird.',
  },
  'reserve-pumpset-reinigen-trocknen-organisieren': {
    productId: 'philips-avent-scf149-00',
    whyItHelps: 'Wenn gereinigte Teile keinen geordneten Platz haben, bietet das Philips Avent Trockengestell SCF149/00 eine Ablage mit abnehmbarer Abtropfschale. Prüfe, ob deine Teile darauf Platz finden; es trocknet an der Luft und sterilisiert nicht.',
    noPurchaseAlternative: 'Ein sauberer, geschützter Trockenplatz kann bereits genügen. Entscheidend ist, dass die nach Anleitung gereinigten Einzelteile vollständig an der Luft trocknen können; ein Gestell ersetzt die Reinigung nicht.',
  },
  'muttermilchbeutel-oder-mehrwegbecher': {
    productId: 'medela-easy-pour-storage-bags',
    whyItHelps: 'Für einen flach gelagerten Gefriervorrat sind die Medela Easy Pour Beutel eine konkrete Option. Die getrennten Öffnungen dienen dem Einfüllen und Ausgießen; ein Beutel ist kein Mehrwegbecher und lässt sich nicht direkt an die Pumpe anschließen.',
    noPurchaseAlternative: 'Wenn deine vorhandenen Mehrwegbehälter für die geplante Lagerung geeignet sind, bleib dabei. Einwegbeutel lohnen sich nur, wenn dir die flache Aufbewahrung tatsächlich hilft; sie werden nicht wiederverwendet.',
  },
  'muttermilch-kuehlschrankbox-getrennt-aufbewahren': {
    productId: 'medela-muttermilchflaschen',
    whyItHelps: 'Wenn geeignete verschließbare Behälter fehlen, sind Medela Muttermilchflaschen eine Mehrwegoption für den festen Milchplatz. Wähle die passende Volumenvariante und den Aufbewahrungsverschluss. Die Flaschen sind keine Kühlschrankbox und ersetzen keine Kühlung.',
    noPurchaseAlternative: 'Ein fester Platz im kalten Innenbereich und eindeutig beschriftete, geeignete geschlossene Behälter reichen zum Trennen oft schon aus. Eine zusätzliche Box oder neue Flaschen sind dafür nicht automatisch nötig.',
  },
  'muttermilch-erwaermen-ohne-flaschenwaermer': {
    productId: 'philips-avent-scf358-00',
    whyItHelps: 'Wenn du häufig geeignete Flaschen erwärmst und dafür ein Gerät möchtest, ist der Philips Avent SCF358/00 mit Erwärm- und Auftaumodus eine Option. Nicht jeder Beutel darf hinein; die Warmhaltefunktion ist keine Lagerempfehlung für Muttermilch.',
    noPurchaseAlternative: 'Für wenige Portionen kann ein lauwarmes Wasserbad mit einem dafür geeigneten vorhandenen Gefäß genügen. Richte dich nach den offiziellen Empfehlungen und der Behälteranleitung; die Milch gehört nicht in die Mikrowelle.',
  },
  'abgepumpte-muttermilch-flasche-sauger-auswaehlen': {
    productId: 'medela-calma-feeding-system',
    whyItHelps: 'Wenn ein neues Fütterungssystem tatsächlich gebraucht wird, kannst du Medela Calma anhand seiner Anleitung prüfen. Der Hersteller beschreibt die Milchabgabe durch aktives Saugen; das garantiert weder Akzeptanz noch problemlosen Wechsel zwischen Brust und Flasche.',
    noPurchaseAlternative: 'Wenn die vorhandene geeignete Flasche und der Sauger beim Füttern gut passen, ist kein neues System nötig. Bei anhaltenden Schwierigkeiten kläre den Ablauf mit Fachpersonal statt immer neue Sauger zu kaufen.',
  },
  'stilleinlagen-einweg-mehrweg-unterwegs-organisieren': {
    productId: 'lansinoh-blue-lock-stilleinlagen',
    whyItHelps: 'Für einen Einweg-Wechselvorrat unterwegs lassen sich die einzeln verpackten Lansinoh Blue Lock Stilleinlagen getrennt von benutzten Einlagen einpacken. Die Fixierstreifen helfen beim Befestigen im BH, garantieren aber weder passenden Sitz noch Auslaufsicherheit.',
    noPurchaseAlternative: 'Vorhandene passende Mehrwegeinlagen lassen sich weiterverwenden, wenn Waschen, vollständiges Trocknen und Wechseln organisiert sind. Pack saubere und benutzte Einlagen getrennt; neue Einwegeinlagen sind keine Voraussetzung dafür.',
  },
  'hands-free-milchpumpe-kaufen': {
    productId: 'momcozy-m9',
    whyItHelps: 'Wenn du die beste tragbare Milchpumpe für deinen Alltag suchst, beginne mit deinen Muss-Kriterien. Die Momcozy M9 ist eine Option, wenn du eine im BH integrierte Pumpe mit App-Steuerung und regulärer Tastenbedienung möchtest. Passform, Setumfang und Sicherheitshinweise bleiben vor dem Kauf zu prüfen.',
    paragraphOverrides: { kaufcheck: { 0: 'Für eine im BH integrierte Bauform mit App-Steuerung kannst du die Momcozy M9 prüfen. Entscheide zuerst, ob du diese Funktionen wirklich brauchst und ob die Passform geklärt ist. Die im Artikel beschriebenen anderen Bauweisen dienen der Einordnung, nicht einer zusätzlichen Einkaufsliste. Vergleiche bei der M9 anschließend den konkreten Setumfang und die Händlerbedingungen des tatsächlich angebotenen Produkts.' } },
    noPurchaseAlternative: 'Wenn deine vorhandene Pumpe zu deinem Ablauf passt, brauchst du keine tragbare Ergänzung. Bei noch offenem Bedarf kannst du mit Hebamme oder Stillberatung klären, ob eine Leihmöglichkeit sinnvoller ist als der sofortige Kauf.',
  },
  'milchpumpe-fuer-unterwegs': {
    productId: 'medela-freestyle',
    whyItHelps: 'Für einen geplanten Pumpplatz unterwegs ist die Medela Freestyle Hands-free eine Option, wenn du das Motorgewicht außerhalb des BHs tragen möchtest. Die Akkubauweise arbeitet mit Schläuchen; Reinigung, geeignete Behälter und gekühlter Rücktransport müssen zusätzlich geklärt sein.',
    noPurchaseAlternative: 'Plane den Weg zunächst mit deiner vorhandenen geeigneten Pumpe: vollständiges Set, Energieversorgung, Reinigung und gekühlter Milchtransport. Für einen seltenen Ausflug muss nicht automatisch eine weitere elektrische Pumpe dazu kommen.',
  },
  'milchpumpe-einzel-oder-doppelpumpe': {
    productId: 'momcozy-m9',
    whyItHelps: 'An der Momcozy M9 lässt sich die Entscheidung zwischen einer und zwei vollständigen Pumpeneinheiten konkret prüfen: Der Hersteller führt Single und Double. Unser Amazon-Ziel ist das registrierte Doppelset, kein Einzelset; es passt nur, wenn du genau diesen Umfang brauchst.',
    noPurchaseAlternative: 'Wenn nacheinander pumpen deinem geklärten Ablauf entspricht und dein vorhandenes System passt, brauchst du keine zweite Einheit. Ist der Bedarf noch offen, kläre ihn vor dem Kauf mit fachlicher Unterstützung.',
  },
  'milchpumpe-zubehoer-checkliste': {
    productId: 'philips-avent-scf149-00',
    whyItHelps: 'Fehlt in deiner Checkliste ein geordneter Trockenplatz, ist das Philips Avent Trockengestell SCF149/00 ein konkretes Zubehörbeispiel mit abnehmbarer Abtropfschale. Es ist keine neue Pumpe und kein kompatibles Reserveset; prüfe den Platz für die tatsächlich vorhandenen Teile.',
    noPurchaseAlternative: 'Ein vorhandener sauberer, geschützter Trockenplatz kann ausreichen. Prüfe erst, welches Teil oder welcher Handgriff wirklich fehlt; ein Gestell ersetzt weder Reinigung noch passende Ersatzteile.',
  },
  'momcozy-m9-ohne-app': {
    productId: 'momcozy-m9',
    whyItHelps: 'Die Momcozy M9 bleibt eine Option, wenn du ihre Bauform möchtest, reguläre Modi aber direkt am Gerät bedienst. Der Hersteller bestätigt die Tastenbedienung; appgebundene Zusatzprogramme sind dadurch nicht verfügbar. App-Verzicht hebt die Implantatwarnung nicht auf.',
    noPurchaseAlternative: 'Hast du bereits eine passende M9, prüfe die reguläre Tastenbedienung in ihrer Anleitung. Für diese Modi brauchst du weder eine neue Pumpe noch die App; die App-Zusatzprogramme stehen damit nicht zur Verfügung.',
  },
  'momcozy-m9-einzel-oder-doppelset': {
    productId: 'momcozy-m9',
    whyItHelps: 'Das verlinkte Momcozy-M9-Angebot ist im Register als Doppelset in Hellgrau zugeordnet. Es ist nur dann ein sinnvoller Kaufpfad, wenn du zwei vollständige Einheiten möchtest. Kontrolliere die ausgewählte Variante und den aktuellen Inhalt, statt Paketmenge und Setgröße gleichzusetzen.',
    noPurchaseAlternative: 'Zähle zuerst deine vorhandenen vollständigen M9-Einheiten und notiere, welchen Ablauf du brauchst. Wenn das Set ihn schon abdeckt, ist kein zusätzliches Paket nötig; Cup und Motor sind nicht dieselbe Bestelleinheit.',
  },
  'medela-freestyle-hands-free-drei-teile-reinigung': {
    productId: 'medela-freestyle',
    whyItHelps: 'Wenn du ohnehin eine Pumpe suchst und die Sortierung beim Reinigen wichtig ist, kannst du die Freestyle Hands-free anhand ihrer drei Teile pro Cup prüfen. Beim Doppelset sind es zwei Cups; Motor und Schlauch brauchen ihren eigenen Pflegeweg. Daraus folgt keine gemessene Zeitersparnis.',
    noPurchaseAlternative: 'Mit einer vorhandenen Freestyle lässt sich der Pflegeablauf anhand ihrer passenden Anleitung organisieren. Drei Cup-Teile sind kein Grund für einen Neukauf und keine Abkürzung bei Reinigung, Trocknung oder dem getrennten Umgang mit Motor und Schlauch.',
  },
  'medela-freestyle-hands-free-schlaeuche-motor': {
    productId: 'medela-freestyle',
    whyItHelps: 'Die Medela Freestyle Hands-free passt als Kaufoption zu dem Wunsch nach Cups im BH und einer separat getragenen Motoreinheit. Sie ist nicht schlauchlos. Wenn kein Motor außerhalb des BHs dein Muss-Kriterium ist, passt dieses Modell nicht dazu.',
    noPurchaseAlternative: 'Wenn dein vorhandenes System zu deinem Pumpplatz und deiner Kleidung passt, behalte es. Plane Motorplatz und Schlauchführung vor einem Kauf; eine neue Pumpe ist keine Lösung für jeden organisatorischen Engpass.',
  },
  'elvie-pump-oder-elvie-stride': {
    productId: 'elvie-pump-single',
    whyItHelps: 'Elvie Pump Single ist eine Option, wenn du eine vollständige schlauchlose Einheit im BH möchtest. Der Motor sitzt anders als bei Stride direkt in der Einheit. Unser Kaufpfad sucht ausdrücklich Single, nicht Double oder Stride; kontrolliere die Modellbezeichnung im Suchergebnis.',
    noPurchaseAlternative: 'Wenn du mit deinem vorhandenen System und seinem Motorplatz zurechtkommst, ist der Wechsel zu Elvie Pump nicht nötig. Notiere zuerst, ob Schlauchlosigkeit wirklich ein Muss ist und ob du eine oder zwei vollständige Einheiten brauchst.',
  },
  'milchpumpe-ersatzteile-ventile-membranen': {
    productId: 'philips-avent-cp2203-01',
    whyItHelps: 'Das Philips Avent Hands-free Ventil CP2203/01 ist eine konkrete Ersatzteiloption, wenn genau dieses Ventil laut aktueller Herstellerzuordnung zu deiner vollständigen Modellnummer passt. Es ist keine Membran und kein Universalventil; für M9 oder Medela ist es hier nicht freigegeben.',
    paragraphOverrides: { ersatzteilentscheidung: { 1: 'Wenn deine Bestellmatrix das Ventil CP2203/01 eindeutig dem vorhandenen Philips-Modell zuordnet, kannst du unten genau dieses Teil suchen. Prüfe im Suchergebnis Teilenummer, Stückzahl und aktuelle Herstellerfreigabe. Für eine Membran, M9 oder Medela bleib bei den entsprechenden Hersteller-Teilelinks im Artikel; eine neue Pumpe brauchst du zum Ersatzteilabgleich nicht.' } },
    noPurchaseAlternative: 'Prüfe zuerst Zustand, Montage und die passende Anleitung des vorhandenen Ventils. Wenn das Teil intakt ist und der Support keinen Austausch vorsieht, ist kein vorsorglicher Kauf nötig. Beschädigte Teile nicht improvisiert reparieren oder als Universalteil ersetzen.',
  },
  'momcozy-s12-pro-quick-unterschiede': {
    productId: 'momcozy-s12-pro',
    whyItHelps: 'Der Kaufpfad sucht die ursprüngliche Momcozy S12 Pro als Option für direkte Bedienung ohne App. Er ist kein verifiziertes Quick-Angebot. Prüfe die Generation im Ergebnis und übernimm Quick-Daten oder Ersatzteile nicht ungeprüft auf S12 Pro.',
    noPurchaseAlternative: 'Eine funktionsfähige, passende S12 Pro musst du nicht ersetzen, nur weil es Quick gibt. Halte die Anleitung der vorhandenen Generation bereit und kläre die Freigabe jedes benötigten Ersatzteils einzeln.',
  },
  'milchpumpe-app-datenschutz': {
    productId: 'momcozy-m9',
    whyItHelps: 'Die Momcozy M9 ist hier eine Kaufoption, wenn du App-Fernbedienung möchtest und Konto, Berechtigungen sowie die aktuelle Datenschutzerklärung geprüft hast. Ihre reguläre Tastenbedienung bleibt die Alternative ohne diese App-Funktionen. Das ist keine Empfehlung als Datenschutz-Testsieger.',
    paragraphOverrides: { 'datensparsame-entscheidung': { 1: 'Wenn App-Fernbedienung für dich einen konkreten Nutzen hat, prüfe die M9 nach diesem Prüfblatt und lies ihre aktuellen Datenschutzhinweise. Der Produktlink unten bezieht sich nur auf die M9 und bewertet nicht die technische Sicherheit der App. Die anderen Anbieterpassagen helfen beim Einordnen vorhandener Systeme, ohne einen weiteren Kauf vorauszusetzen.' } },
    noPurchaseAlternative: 'Für reguläre M9-Modi kannst du die vorhandenen Gerätetasten nutzen und auf zusätzliche App-Aufzeichnungen verzichten. Wenn du nur eine Notiz brauchst, reicht ein privater Zettel; dafür brauchst du keine neue Pumpe und kein App-Konto.',
  },
  'milchpumpe-reinigen-ohne-spuelmaschine': {
    productId: 'mam-soft-brush',
    noPurchaseAlternative: 'Eine vorhandene, intakte und nach ihrer Anleitung gereinigte Flaschenbürste kann genügen. Verwende sie nur an Flaschen und ausdrücklich geeigneten Flächen.',
  },
  'muttermilch-kita-mitgeben': {
    productId: 'mam-aufbewahrungsbecher',
    noPurchaseAlternative: 'Bereits vorhandene, für Muttermilch geeignete und von der Kita akzeptierte Behälter weiterverwenden; ein bestimmtes Bechersystem ist nicht nötig.',
  },
  'medela-muttermilchflaschen-150-250-ml': {
    productId: 'medela-muttermilchflaschen',
    noPurchaseAlternative: 'Vorhandene geeignete Flaschen weiterverwenden, wenn Zustand, Verschluss, Pflege und gegebenenfalls Pumpenanschluss zum geplanten Einsatz passen.',
  },
  'milchpumpe-mikrowellenbeutel-desinfizieren': {
    productId: 'medela-quick-clean-microwave-bags',
    noPurchaseAlternative: 'Wenn deine Pumpenanleitung bereits ein anderes Desinfektionsverfahren erlaubt und du es zu Hause umsetzen kannst, ist ein Mikrowellenbeutel nicht erforderlich.',
  },
};

export const PROBLEM_PRODUCT_FOCUS: Record<string, ProductFocus | undefined> = Object.fromEntries(
  Object.entries(ARTICLE_FOCUS).map(([slug, focus]) => [slug, focus.whyItHelps ? {
    ...focus,
    // The milk renderer already exposes this paragraph. Keep its no-purchase
    // path first, then explain the optional purchase without changing that renderer.
    existingAlternative: `${focus.noPurchaseAlternative} ${focus.whyItHelps}`,
  } : { productId: focus.productId, existingAlternative: focus.noPurchaseAlternative }]),
);
