// One focused search intent per page. These are editorial titles, not search-volume claims.
export const GUIDE_SEARCH_TITLES: Record<string, string> = {
  'richtige-flanschgroesse': 'Milchpumpe: Flanschgröße und passende Einsätze prüfen',
  'milchpumpe-reinigen': 'Milchpumpe reinigen: Hygiene, Trocknen & Modellanleitung',
  'tragbar-oder-elektrisch': 'Tragbare, elektrische oder manuelle Milchpumpe?',
  'momcozy-m9-oder-s12-pro': 'Momcozy M9 vs. S12 Pro: Unterschiede & Kaufhilfe',
  'medela-freestyle-oder-philips-avent': 'Medela Freestyle vs. Philips Avent SCF547/11',
  'hands-free-milchpumpe-kaufen': 'Hands-free-Milchpumpe kaufen: Checkliste & Modelle',
  'milchpumpe-fuer-unterwegs': 'Milchpumpe für unterwegs: Bauart, Akku & Transport',
  'milchpumpe-einzel-oder-doppelpumpe': 'Einzel- oder Doppelmilchpumpe? Sets richtig vergleichen',
  'milchpumpe-zubehoer-checkliste': 'Milchpumpen-Zubehör: Was passt zu welchem Modell?',
  'momcozy-m9-ohne-app': 'Momcozy M9 ohne App: Welche Funktionen bleiben?',
  'momcozy-m9-einzel-oder-doppelset': 'Momcozy M9: Einzel- oder Doppelset? Lieferumfang prüfen',
  'momcozy-s12-pro-quick-unterschiede': 'S12 Pro vs. S12 Pro Quick: Generationen unterscheiden',
  'medela-freestyle-hands-free-drei-teile-reinigung': 'Medela Freestyle Hands-free reinigen: Teile & Ablauf',
  'medela-freestyle-hands-free-schlaeuche-motor': 'Medela Freestyle Hands-free: Motor, Cups & Schläuche',
  'philips-avent-scf547-11-oder-scd553-11': 'Philips SCF547/11 vs. SCD553/11: Pumpe oder Set?',
  'philips-avent-scf547-einsaetze-15-17-mm': 'Philips Avent SCF547: 15-/17-mm-Einsätze prüfen',
  'elvie-pump-single-oder-double': 'Elvie Pump Single vs. Double: Welche Ausführung?',
  'elvie-pump-oder-elvie-stride': 'Elvie Pump vs. Elvie Stride: Bauart und Unterschiede',
  'haakaa-generation-3-oder-generation-2': 'Haakaa Gen 2 vs. Gen 3: Aufbau und Zubehör',
  'haakaa-generation-3-groessen': 'Haakaa Generation 3: Größen & Lieferumfang prüfen',
  'milchpumpe-app-datenschutz': 'Milchpumpen mit App: M9, Elvie & Datenschutz',
  'milchpumpe-ersatzteile-ventile-membranen': 'Milchpumpen-Ersatzteile: Ventile & Membranen zuordnen',
  'milchpumpe-lautstaerke-herstellerangaben': 'Leise Milchpumpe? dB-Angaben richtig vergleichen',
  'muttermilchbeutel-oder-mehrwegbecher': 'Muttermilchbeutel oder Becher? Einweg & Mehrweg',
  'muttermilch-beschriften-portionen-gefrierfach': 'Muttermilch beschriften: Portionen im Gefrierfach ordnen',
  'muttermilch-arbeitsplatz-transport-kuehlkette': 'Muttermilch transportieren: Kühlkette vom Arbeitsplatz',
  'muttermilch-kuehlschrankbox-getrennt-aufbewahren': 'Muttermilch im Kühlschrank: Box und Behälter organisieren',
  'muttermilch-erwaermen-ohne-flaschenwaermer': 'Muttermilch erwärmen: Wasserbad oder Flaschenwärmer?',
  'reserve-pumpset-reinigen-trocknen-organisieren': 'Reserve-Pumpset: Kompatibilität, Reinigung und Trocknen',
  'abgepumpte-muttermilch-flasche-sauger-auswaehlen': 'Flasche für Muttermilch: Sauger und Systeme auswählen',
  'stilleinlagen-einweg-mehrweg-unterwegs-organisieren': 'Stilleinlagen unterwegs: Einweg oder waschbar?',
  'milchpumpe-reinigen-ohne-spuelmaschine': 'Milchpumpe reinigen ohne Spülmaschine: Handspül-Ablauf',
  'muttermilch-kita-mitgeben': 'Muttermilch Kita mitgeben: Behälter, Etikett & Übergabe',
  'medela-muttermilchflaschen-150-250-ml': 'Medela Muttermilchflaschen: 150 oder 250 ml?',
  'milchpumpe-mikrowellenbeutel-desinfizieren': 'Milchpumpe mit Mikrowellenbeutel desinfizieren: Quick Clean',
};

export type GuideDecision = {
  question: string;
  primaryProductId: string;
  rows: [string, string][];
  offerNote: string;
};

// Editorial checklists, not medical recommendations or claimed measurements.
export const GUIDE_DECISIONS: Record<string, GuideDecision> = {
  'momcozy-m9-oder-s12-pro': {
    question: 'M9 oder S12 Pro: Welche Bedienung willst du tatsächlich nutzen?', primaryProductId: 'momcozy-m9',
    rows: [['App-Muster sind dir wichtig', 'M9-Funktionen prüfen; normale Tastenbedienung und App-Extras trennen.'], ['Du willst ausschließlich Tasten nutzen', 'Auch M9 kann reguläre Modi am Gerät; S12 Pro nicht allein deshalb ausschließen.'], ['Im Angebot steht „Quick“', 'Andere Generation: nicht mit den Daten der älteren S12 Pro gleichsetzen.']],
    offerNote: 'Der M9-Link führt zur geprüften Doppelset-Variante in Hellgrau. S12-Pro-Angebote findest du über die separate Produktkarte; dort die Generation kontrollieren.',
  },
  'medela-freestyle-oder-philips-avent': {
    question: 'Freestyle oder SCF547/11: Was ist dein ausschlaggebender Unterschied?', primaryProductId: 'philips-avent-scf547',
    rows: [['Du suchst einen Motor vollständig im BH', 'Diese beiden Systeme haben separate Motoreinheiten; andere Bauarten vergleichen.'], ['Du möchtest eine Lösung ohne App', 'SCF547/11 ansehen; Freestyle-App-Funktionen sind nicht mit jeder Smartphone-Steuerung gleichzusetzen.'], ['Reinigung hat Vorrang', 'Cup-Anleitung und tatsächliche Teileliste vergleichen, nicht nur Werbewörter.']],
    offerNote: 'Verlinkt ist die SCF547/11-Doppelmilchpumpe, nicht das SCD553/11-Starterset. Den Medela-Freestyle-Link findest du unten.',
  },
  'hands-free-milchpumpe-kaufen': {
    question: 'Welche Hands-free-Bauart passt zu deinem geplanten Ablauf?', primaryProductId: 'momcozy-m9',
    rows: [['Keine Schläuche zwischen Cups und Motor gewünscht', 'Integrierte Systeme wie M9 oder Elvie Pump prüfen.'], ['Separate Motoreinheit ist in Ordnung', 'Freestyle Hands-free oder SCF547/11 mit den vorgesehenen Cups vergleichen.'], ['Du hast deine Größe noch nicht geklärt', 'Passform zuerst klären; mehr Stufen ersetzen keinen passenden Aufsatz.']],
    offerNote: 'Die M9 ist ein konkretes integriertes Beispiel, kein Testsieger. Das verlinkte Angebot ist ein Doppelset.',
  },
  'milchpumpe-fuer-unterwegs': {
    question: 'Ist dein Pumpplatz unterwegs wirklich vorbereitet?', primaryProductId: 'medela-freestyle',
    rows: [['Du möchtest keinen externen Motor transportieren', 'Integrierte Modelle im Vergleich ansehen.'], ['Externer Motor ist möglich', 'Für Freestyle auch Platz für Motor und Schlauchführung einplanen.'], ['Kein sauberer Wechsel- und Aufbewahrungsablauf vorhanden', 'Vor der Nutzung Reinigung, Trocknung und sichere Milchaufbewahrung organisieren.']],
    offerNote: 'Verlinkt ist Freestyle Hands-free mit externem Motor, nicht Freestyle Mini. Das Angebot ersetzt keine Kühl- oder Hygieneplanung.',
  },
  'milchpumpe-einzel-oder-doppelpumpe': {
    question: 'Brauchst du zwei vollständige Einheiten oder nur zusätzliche Behälter?', primaryProductId: 'momcozy-m9',
    rows: [['Du willst beide Seiten gleichzeitig nutzen', 'Vollständiges Doppelset beziehungsweise ein dafür vorgesehenes Doppelsystem prüfen.'], ['Eine Seite gleichzeitig genügt', 'Einzelset und späteren Erweiterungsbedarf getrennt bewerten.'], ['Ein Bild zeigt zwei Behälter', 'Motor-/Einheitenzahl in der textlichen Setliste kontrollieren.']],
    offerNote: 'Der M9-Link führt zum Doppelset. Für einen Einzelkauf die Setvariante beim Händler ausdrücklich prüfen; keine garantierte Zeit- oder Mengensteigerung.',
  },
  'milchpumpe-zubehoer-checkliste': {
    question: 'Welches Zubehör fehlt dir tatsächlich im konkreten Set?', primaryProductId: 'philips-avent-scf547',
    rows: [['Eine kleinere Größe wird benötigt', 'Exakten Aufsatz-/Einsatzcode und kompatible Grundkomponente prüfen.'], ['Du willst Reserve-Cups', 'Vollständiges Auffangsystem von einzelnen Ersatzteilen unterscheiden.'], ['Alles ist bereits im Lieferumfang', 'Keinen doppelten Zubehörkauf nur wegen einer allgemeinen Checkliste auslösen.']],
    offerNote: 'Das Händlerziel ist die SCF547/11-Pumpe, kein Zubehörpaket. Zubehörnummern im Artikel dienen der Zuordnung, nicht als bestätigter Lieferumfang dieses Angebots.',
  },
  'momcozy-m9-ohne-app': {
    question: 'Reichen dir die M9-Modi am Gerät oder brauchst du App-Extras?', primaryProductId: 'momcozy-m9',
    rows: [['Stimulation, Expression und Mixed reichen dir', 'Reguläre Bedienung am Gerät ist beschrieben.'], ['Du möchtest MyFlow, Milk Boost oder Milk Relief', 'Die dokumentierten App-Funktionen und die aktuelle Einrichtung prüfen.'], ['Du willst keine Registrierung', 'Reguläre Gerätebedienung nicht mit dem App-Einrichtungsweg verwechseln.']],
    offerNote: 'Das geprüfte Amazon-Ziel ist das M9-Doppelset in Hellgrau. App-Programmnamen sind keine medizinischen Wirkungszusagen.',
  },
  'momcozy-m9-einzel-oder-doppelset': {
    question: 'Wie viele vollständige M9-Einheiten bestellst du?', primaryProductId: 'momcozy-m9',
    rows: [['Single ausgewählt, Warenkorbmenge 1', 'Ein Einzelpaket; vollständige Einheit in der Teileliste bestätigen.'], ['Double ausgewählt, Warenkorbmenge 1', 'Ein Doppelpaket; nicht zwei Doppelpakete bestellen.'], ['Du brauchst nur einen Reserve-Cup', 'Zubehör ist keine zweite vollständige Pumpe.']],
    offerNote: 'Dieser Affiliate-Link öffnet das geprüfte Doppelset, nicht ein Single-Angebot. Farbe und gewählte Variante beim Händler erneut prüfen.',
  },
  'momcozy-s12-pro-quick-unterschiede': {
    question: 'Steht auf deinem Gerät und Ersatzteilangebot dieselbe S12-Generation?', primaryProductId: 'momcozy-s12-pro',
    rows: [['Gerät heißt S12 Pro', 'Alte Anleitung und ausdrücklich für S12 Pro bestimmte Teile prüfen.'], ['Angebot heißt S12 Pro Quick', 'Quick als eigene Generation behandeln; technische Werte nicht übertragen.'], ['Nur „für S12“ angegeben', 'Vor Bestellung konkrete Kompatibilität beim Hersteller oder Händler bestätigen lassen.']],
    offerNote: 'Der Link ist eine Amazon-Modellsuche, kein verifiziertes Angebot einer bestimmten S12-Generation. Suchergebnisse können auch Quick zeigen.',
  },
  'medela-freestyle-hands-free-drei-teile-reinigung': {
    question: 'Zählst du die Cup-Teile oder das gesamte Freestyle-System?', primaryProductId: 'medela-freestyle',
    rows: [['Drei Teile pro Cup beworben', 'Die Cup-Komponenten laut Anleitung betrachten, nicht das gesamte Set auf drei Teile reduzieren.'], ['Motor und Ladetechnik liegen daneben', 'Nicht wie milchberührende Cup-Teile behandeln oder ins Wasser legen.'], ['Du planst ein zweites sauberes Set', 'Kompletten Cup-Satz und Einzelmembranen auseinanderhalten.']],
    offerNote: 'Der Händlerlink führt zur Freestyle Hands-free-Pumpe. Die modellbezogene Reinigungsanleitung bleibt maßgeblich; Ersatz-Cups sind nicht automatisch enthalten.',
  },
  'medela-freestyle-hands-free-schlaeuche-motor': {
    question: 'Willst du freie Hände oder ein vollständig schlauchloses System?', primaryProductId: 'medela-freestyle',
    rows: [['Cups im BH, Motor außerhalb ist gewünscht', 'Freestyle Hands-free entspricht dieser Architektur.'], ['Du möchtest keine Verbindungsschläuche', 'Ein integriertes System statt Freestyle prüfen.'], ['Du suchst passende Ersatzschläuche', 'Freestyle Hands-free und konkrete Teilefreigabe kontrollieren, nicht nur den Markennamen.']],
    offerNote: 'Verlinkt ist Freestyle Hands-free, nicht Mini und kein einzelner Schlauch. Hands-free heißt hier nicht schlauchlos.',
  },
  'philips-avent-scf547-11-oder-scd553-11': {
    question: 'Brauchst du die Philips-Pumpe oder die Extras des Startersets?', primaryProductId: 'philips-avent-scf547',
    rows: [['SCF547/11 im Angebot', 'Die Pumpe und ihre konkrete Setliste prüfen.'], ['SCD553/11 im Angebot', 'Starterset mit zusätzlichen Aufbewahrungs-/Fütterungskomponenten prüfen.'], ['Flaschen und Beutel schon vorhanden', 'Nur tatsächlich benötigte Extras als Mehrwert des Bundles zählen.']],
    offerNote: 'Der Affiliate-Link führt ausdrücklich zur SCF547/11, nicht zum SCD553/11-Starterset. Ein Bundle-Kauf ist damit nicht verifiziert.',
  },
  'philips-avent-scf547-einsaetze-15-17-mm': {
    question: 'Passt der SCF554/11-Einsatz zu deiner vorgesehenen Philips-Kombination?', primaryProductId: 'philips-avent-scf547',
    rows: [['SCF554/11 gesucht', '15- und 17-mm-Einsätze; die vorgesehene Kombination mit 21-mm-Brustkissen prüfen.'], ['SCF547/11 bereits vorhanden', 'Vor Nachkauf enthaltene Größen und erforderliche Grundteile zählen.'], ['Deine persönliche Größe ist unsicher', 'Nicht aus dem Produktcode ableiten; fachliche Passformhilfe nutzen.']],
    offerNote: 'Das verlinkte Amazon-Angebot ist die SCF547/11-Pumpe, nicht das Einsatzpaar SCF554/11. Die Herstellerquelle für das Zubehör steht im Artikel.',
  },
  'elvie-pump-single-oder-double': {
    question: 'Wie viele Elvie-Pump-Hubs brauchst du gleichzeitig?', primaryProductId: 'elvie-pump-single',
    rows: [['Eine Seite gleichzeitig', 'Single: ein Hub; zusätzliche Flaschen nicht als zweite Pumpe zählen.'], ['Beide Seiten gleichzeitig', 'Double: zwei vollständige Hubs samt passenden Auffangteilen prüfen.'], ['Single ist bereits vorhanden', 'Eine weitere vollständige Single ist etwas anderes als Reserveflaschen.']],
    offerNote: 'Der Link öffnet eine Modellsuche für Elvie Pump Single. Kein exaktes Double-Angebot und keine verifizierte ASIN; die Setvariante selbst kontrollieren.',
  },
  'elvie-pump-oder-elvie-stride': {
    question: 'Suchst du Elvie vollständig im BH oder Cups mit externem Hub?', primaryProductId: 'elvie-pump-single',
    rows: [['Ohne Schläuche, integrierter Hub', 'Elvie Pump prüfen.'], ['Externer Hub und Schläuche akzeptabel', 'Ursprüngliche Stride getrennt vergleichen.'], ['Im Angebot steht Stride 2', 'Nicht mit Daten der ursprünglichen Stride gleichsetzen.']],
    offerNote: 'Die Produktkarte und Modellsuche beziehen sich auf Elvie Pump Single, nicht Stride oder Stride 2. Der Vergleich ist keine Bestätigung eines Stride-Angebots.',
  },
  'haakaa-generation-3-oder-generation-2': {
    question: 'Willst du eine einteilige Haakaa oder das modulare Gen-3-System?', primaryProductId: 'haakaa-gen3',
    rows: [['Möglichst einfache einteilige Bauform', 'Gen-2-Aufbau und Anleitung prüfen.'], ['Flansch, Schraubring und wechselbare Aufsätze gewünscht', 'Gen-3-System und passende Aufsätze prüfen.'], ['Teile unterschiedlicher Generationen sollen kombiniert werden', 'Keine Kompatibilität allein aus Silikonmaterial oder Marke ableiten.']],
    offerNote: 'Der Link führt zur Gen-3-Variante mit 160 ml in Nude und Kappe, nicht zur Gen 2 oder zu jedem modularen Aufsatz.',
  },
  'haakaa-generation-3-groessen': {
    question: 'Ist die Haakaa-Kapazität oder das Kit-Zubehör dein Kaufkriterium?', primaryProductId: 'haakaa-gen3',
    rows: [['160 oder 250 ml verglichen', 'Behälterkapazität vom tatsächlich gelieferten Zubehör trennen.'], ['Du möchtest auch eine Flaschenfunktion', 'Benötigte Aufsätze und explizite Kit-Liste kontrollieren.'], ['Du erwartest eine größere Milchmenge', 'Ein größeres Gefäß ist kein Nachweis für eine höhere gewonnene Menge.']],
    offerNote: 'Verifiziert ist nur das Gen-3-Angebot mit 160 ml, Nude und Kappe. Der Link ist kein geprüftes 250-ml-Angebot oder Pump-and-Bottle-Kit.',
  },
  'milchpumpe-app-datenschutz': {
    question: 'Welche App-Funktion rechtfertigt für dich zusätzliche Datenverarbeitung?', primaryProductId: 'momcozy-m9',
    rows: [['Nur reguläre M9-Modi benötigt', 'Tastenbedienung als Alternative zur App prüfen.'], ['Protokoll oder individuelle App-Muster gewünscht', 'Aktuellen Dienst, Konto, Berechtigungen und Datenschutzhinweise kontrollieren.'], ['Mehrere Pumpen werden verglichen', 'Fernsteuerung, Protokoll und automatische Messung nicht gleichsetzen.']],
    offerNote: 'M9 ist hier das konkrete Funktionsbeispiel, kein Datenschutz-Testsieger. Der Produktlink sagt nichts über die Sicherheit einer aktuellen App-Version aus.',
  },
  'milchpumpe-ersatzteile-ventile-membranen': {
    question: 'Welcher exakte Modell- und Teilecode gehört auf deine Ersatzteilbestellung?', primaryProductId: 'philips-avent-scf547',
    rows: [['Philips CP2203/01 oder CP2218/01 genannt', 'Ventil und Membran unterscheiden; kompatible Pumpe auf der Herstellerseite prüfen.'], ['Momcozy M9 genannt', 'M9-spezifische Teile, nicht beliebige Momcozy-Ventile auswählen.'], ['Medela genannt', 'Hands-free-Cup-Membran nicht mit jeder Medela-Membran gleichsetzen.']],
    offerNote: 'Das Affiliate-Ziel ist die SCF547/11-Pumpe, nicht ein Ersatzventil. Nutze die Hersteller-Teilelinks im Artikel für die genaue Zuordnung.',
  },
  'milchpumpe-lautstaerke-herstellerangaben': {
    question: 'Sind die beworbenen Lautstärkeangaben überhaupt vergleichbar?', primaryProductId: 'momcozy-m9',
    rows: [['Nur „leise“ oder „diskret“ beworben', 'Keine unabhängige Messung und keine garantierte Unhörbarkeit daraus ableiten.'], ['dB-Zahl genannt, Messbedingungen fehlen', 'Abstand, Gewichtung, Modus und Umgebung erfragen.'], ['Lautstärke ist dein wichtigstes Kaufkriterium', 'Vergleichbare externe Messungen suchen; hier wird kein leisestes Modell gekürt.']],
    offerNote: 'Die M9 wird als konkretes Herstellerbeispiel verlinkt, nicht als gemessener Lautstärke-Sieger. Eigene Schallmessungen liegen nicht vor.',
  },
};
