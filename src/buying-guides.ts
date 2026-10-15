export type BuyingGuide = {
  slug: string;
  title: string;
  description: string;
  lead: string;
  category: string;
  published: string;
  updated: string;
  productIds: string[];
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    bullets?: string[];
    sourceIndexes?: number[];
  }[];
  sources: { label: string; url: string }[];
  faqs: { question: string; answer: string }[];
  pinTitle: string;
  pinDescription: string;
};

export const BUYING_GUIDES: BuyingGuide[] = [
  {
    slug: 'momcozy-m9-oder-s12-pro',
    title: 'Momcozy M9 oder S12 Pro: App-Komfort oder direkte Bedienung?',
    description: 'M9 und ursprüngliche S12 Pro nach Bedienung, Passform und Alltag vergleichen – mit klarer Abgrenzung zur S12 Pro Quick.',
    lead: 'Die Entscheidung hängt weniger von möglichst vielen Leistungswerten ab als davon, wie du die Pumpe bedienen, tragen und reinigen möchtest. Die Modellinfos stammen aus Herstellerunterlagen. Besonders wichtig: Die ursprüngliche S12 Pro und die S12 Pro Quick sind verschiedene Generationen.',
    category: 'Modellvergleich',
    published: '2026-10-14',
    updated: '2026-10-14',
    productIds: ['momcozy-m9', 'momcozy-s12-pro'],
    sections: [
      {
        id: 'generation-pruefen',
        title: 'Zuerst klären: S12 Pro oder S12 Pro Quick?',
        paragraphs: [
          'Momcozy unterscheidet in seinem Herstellerartikel ausdrücklich die ältere S12 Pro vom Nachfolger S12 Pro Quick. Auch der Support beschreibt Quick als nächste Generation. Ein Shopname, der nur „S12 Pro“ enthält, reicht deshalb nicht zur Identifikation. Gleiche vor einer Bestellung die vollständige Modellbezeichnung auf Verpackung, Artikelbeschreibung und Anleitung ab. Eine umgeleitete ältere Produktadresse belegt nicht, welche Generation ein Händler tatsächlich liefert.',
          'Dieser Vergleich meint mit S12 Pro das ursprüngliche Modell. Angaben zu Quick, etwa dessen verändertem Auffangvolumen, Motorgeräusch oder vereinfachter Reinigung, werden nicht auf den Vorgänger übertragen. Wenn das Angebot ausdrücklich Quick nennt, ist eine neue Prüfung erforderlich. Das gilt ebenfalls für Sets und Ersatzteile: Ein ähnlicher Produktname ersetzt keine konkrete Modellzuordnung.',
        ],
        sourceIndexes: [1, 2],
      },
      {
        id: 'bedienung',
        title: 'M9: App als zusätzliche Bedienoberfläche',
        paragraphs: [
          'Die M9 lässt sich laut Hersteller per App und über Tasten bedienen. Ihre regulären Modi sind am Gerät erreichbar; individuelle Muster und bestimmte zusätzliche Programme nutzen die App. Momcozy nennt 15 einstellbare Intensitätsstufen. Das ist eine Beschreibung der Bedienmöglichkeiten, kein Nachweis für mehr Milch oder eine bessere Passform. Entscheidend ist, ob du solche Einstellungen im Alltag tatsächlich verwenden möchtest.',
          'Für die S12-Familie beschreibt Momcozy eine direkte Tastenbedienung ohne App. Prüfe beim ursprünglichen S12-Pro-Angebot dennoch die beiliegende Anleitung statt die Quick-Anleitung zu übernehmen. Wenn du Einstellungen lieber unmittelbar am Gerät änderst, ist das ein nachvollziehbares Auswahlkriterium. Wenn du nicht an die Pumpe greifen möchtest, kann die zusätzliche App-Bedienung der M9 praktischer sein.',
        ],
        sourceIndexes: [0, 1],
      },
      {
        id: 'alltag-ohne-smartphone',
        title: 'Wie viel Smartphone möchtest du beim Pumpen?',
        paragraphs: [
          'Für die M9-App nennt der Hersteller eine Einrichtung mit Konto und Bluetooth-Verbindung. Prüfe die aktuellen Betriebssystemanforderungen und die Berechtigungen vor dem Kauf. Überlege auch, ob du dein Telefon beim Pumpen ohnehin dabei hast oder es bewusst beiseitelegen möchtest. Eine App kann das Ändern von Einstellungen vereinfachen, bringt aber einen zusätzlichen Einrichtungs- und Pflegeaufwand mit.',
          'Die Tasten der M9 bleiben deshalb ein wichtiges Gegenargument zur pauschalen Behauptung, sie funktioniere nur mit Smartphone. Vergleiche vielmehr, welche Funktionen ohne App verfügbar sind und welche du wirklich brauchst. Eine tägliche Dokumentation ist nicht für jede Nutzerin sinnvoll. Notierte Mengen oder Sitzungsdaten sind außerdem keine medizinische Bewertung und ersetzen keine persönliche Beratung bei Fragen zum Stillen.',
        ],
        sourceIndexes: [0, 3],
      },
      {
        id: 'passform',
        title: 'Passform vor Stufenzahl und Werbeversprechen',
        paragraphs: [
          'Für die M9 nennt Momcozy einen 24-mm-Flansch und Einsatzoptionen mit 17, 19 und 21 mm. Daraus folgt weder, dass alle Einsätze in jedem Set enthalten sind, noch dass eine dieser Größen automatisch zu dir passt. Gleiche den konkreten Lieferumfang ab und nutze die Messhinweise zur jeweiligen Pumpe. Die Größe des BHs ist dafür kein verlässlicher Ersatz.',
          'Das BZfE verweist bei der Auswahl des passenden Trichteraufsatzes auf Hebammen und Stillberaterinnen. Plane diese Hilfe ein, wenn du unsicher bist, statt mehrere Zubehörgrößen auf Verdacht zu kaufen. Bei der S12 Pro muss die Größen- und Teileauswahl zur ursprünglichen Generation passen. Der Hersteller weist darauf hin, dass andere Zubehörteile als die im Artikel besprochenen Einsätze modellspezifisch sind.',
        ],
        sourceIndexes: [0, 1, 3],
      },
      {
        id: 'reinigung-und-ersatzteile',
        title: 'Reinigung und Ersatzteilweg in den Kauf einrechnen',
        paragraphs: [
          'Ein Wearable spart nicht automatisch die Arbeit nach dem Pumpen. Das BZfE empfiehlt, Pumpset und Behälter nach jedem Gebrauch mit Spülmittel und heißem Wasser zu reinigen, abzuspülen und zu trocknen. Welche Bauteile wie behandelt werden dürfen, bestimmt zusätzlich die jeweilige Anleitung. Plane einen sauberen Ablageplatz und genug Zeit zum Zerlegen, Trocknen und erneuten Zusammensetzen ein.',
          'Frage vor dem Kauf nach passenden Ventilen, Membranen und Auffangteilen für die exakte Generation. Gerade bei einem älteren S12-Pro-Angebot ist ein nachvollziehbarer Ersatzteilweg wichtiger als ein vermeintlich attraktives Bundle. Wir behaupten hier keine aktuelle Verfügbarkeit. Lege einen Artikel nur dann als passenden Ersatz ab, wenn der Anbieter das genaue Modell nennt; Fotos und Markenname allein reichen nicht.',
        ],
        sourceIndexes: [1, 3],
      },
      {
        id: 'entscheidung',
        title: 'Welche Entscheidung lässt sich daraus ableiten?',
        paragraphs: [
          'Die M9 ist eine prüfenswerte Option, wenn du App-Steuerung und individuell angelegte Muster ausdrücklich nutzen möchtest. Die ursprüngliche S12 Pro kommt als Gegenmodell infrage, wenn direkte Bedienung im Vordergrund steht und die Generation eindeutig dokumentiert ist. Kann der Händler diese Zuordnung nicht leisten, solltest du das Angebot nicht anhand von Quick-Daten bewerten. Keine der beiden wird hier zum Testsieger erklärt.',
          'Lies zuletzt die Sicherheitshinweise der vollständigen Anleitung. Die M9-Produktseite enthält insbesondere eine Warnung für Personen mit Herzschrittmacher, implantiertem Defibrillator oder anderen metallischen beziehungsweise elektronischen Implantaten. Das ist kein Detail, das eine Vergleichstabelle ersetzen kann. Dieser Artikel unterstützt die Produktauswahl; er gibt keine medizinische Freigabe und verspricht weder eine bestimmte Milchmenge noch einen bestimmten Komfort.',
        ],
        bullets: [
          'M9 prüfen, wenn App-Funktionen ein konkretes Alltagsproblem lösen.',
          'S12 Pro nur anhand eindeutig zugeordneter Informationen zum ursprünglichen Modell bewerten.',
          'Lieferumfang, passende Größe, Anleitung und Ersatzteilzuordnung vor dem Bestellen abgleichen.',
        ],
        sourceIndexes: [0, 1, 2],
      },
    ],
    sources: [
      { label: 'Momcozy: M9 Produktinformationen und Bedienmöglichkeiten', url: 'https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump' },
      { label: 'Momcozy: S12 Pro Quick FAQ mit Abgrenzung zum Vorgänger', url: 'https://momcozy.com/blogs/momcare/s12-pro-quick-setup-pumping-cleaning' },
      { label: 'Momcozy Support: Änderungen der S12 Pro Quick', url: 'https://support.momcozy.com/article/50367888991257' },
      { label: 'BZfE: Muttermilch abpumpen, Passform und Hygiene', url: 'https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen' },
    ],
    faqs: [
      { question: 'Brauche ich für die M9 bei jeder Anwendung die App?', answer: 'Nein. Momcozy beschreibt die regulären Modi als per App oder direkt an der Pumpe wählbar. Individuelle Muster und bestimmte Zusatzprogramme sind appbezogen. Prüfe vor dem Kauf, welche dieser Funktionen du wirklich nutzen willst.' },
      { question: 'Ist ein Angebot mit dem Namen S12 Pro automatisch die S12 Pro Quick?', answer: 'Nein. Der Hersteller unterscheidet die Generationen. Verlange die vollständige Modellbezeichnung und eine zugehörige Anleitung. Daten der Quick sind kein Beleg für Eigenschaften der ursprünglichen S12 Pro.' },
      { question: 'Passen vorhandene S12-Pro-Ersatzteile auch zur M9?', answer: 'Eine allgemeine Kompatibilität ist hier nicht belegt. Kaufe Ventile, Membranen, Cups oder Einsätze nur mit ausdrücklicher Zuordnung zum Zielmodell und gegebenenfalls zur Generation. Derselbe Hersteller und dieselbe Größenangabe reichen nicht.' },
    ],
    pinTitle: 'Momcozy M9 oder S12 Pro? Erst die Generation prüfen',
    pinDescription: 'App oder Tasten, Passform und Ersatzteile: Der redaktionelle Vergleich trennt S12 Pro und S12 Pro Quick. Kein eigener Produkttest. Der Website-Artikel enthält Affiliate-Links.',
  },
  {
    slug: 'medela-freestyle-oder-philips-avent',
    title: 'Medela Freestyle oder Philips Avent: Zwei Hands-free-Systeme einordnen',
    description: 'Freestyle Hands-free und Philips Avent SCF547/11 nach Cups, Bedienung, Reinigung und konkretem Setumfang vergleichen.',
    lead: 'Bei beiden Kandidaten steht nicht ein Motor in jedem Cup im Mittelpunkt, sondern ein Hands-free-System mit separater Motoreinheit. Für die Entscheidung zählen Ausrichtung, Bedienablauf und die Teile, die du nach jeder Sitzung versorgst. Grundlage sind Herstellerinformationen, keine persönlichen Testerfahrungen.',
    category: 'Modellvergleich',
    published: '2026-10-14',
    updated: '2026-10-14',
    productIds: ['medela-freestyle', 'philips-avent-scf547'],
    sections: [
      {
        id: 'bauweise',
        title: 'Was die separate Motoreinheit im Alltag verändert',
        paragraphs: [
          'Medela beschreibt die Freestyle Hands-free ausdrücklich mit einer separaten, tragbaren Pumpe und Auffangschalen im BH. Auch bei Philips gehört die kompakte Motoreinheit zum System. Damit ist Hands-free nicht gleichbedeutend mit einem vollständig im BH integrierten Gerät. Überlege vor dem Kauf, wo du den Motor unterbringen und wie du die Verbindungen beim Anlegen führen möchtest.',
          'Diese Bauweise kann interessant sein, wenn du das Motorgewicht nicht direkt in den Cups tragen willst. Sie bringt aber zusätzliche Komponenten außerhalb des BHs mit. Ob das für dich angenehmer ist, lässt sich aus der Produktbeschreibung nicht sicher ableiten. Prüfe deshalb deine typische Kleidung und deinen vorgesehenen Pumpplatz, statt nur das Wort „kabellos“ oder ein Werbefoto als Entscheidungsgrundlage zu verwenden.',
        ],
        sourceIndexes: [0, 1],
      },
      {
        id: 'sicht-und-ausrichtung',
        title: 'Transparente Cups sind bei beiden ein relevantes Merkmal',
        paragraphs: [
          'Philips hebt die vollständig durchsichtigen Auffangschalen der SCF547/11 hervor. Medela beschreibt ebenfalls transparente Cups, mit denen die Ausrichtung und der Milchfluss sichtbar sein sollen. Transparenz ist also kein exklusiver Vorteil nur eines Kandidaten. Interessanter ist, wie du die Schalen vor dem Anlegen kontrollierst und ob du die benötigte Größe im konkreten Set findest.',
          'Vergleiche dazu Produktbilder, Anleitung und Größenangebot nebeneinander. Eine transparente Schale kann die Sicht erleichtern, garantiert aber keinen korrekten Sitz. Das BZfE empfiehlt Unterstützung durch Hebammen oder Stillberaterinnen bei der Wahl des passenden Aufsatzes und der Anwendung. Diese Beratung kann hilfreicher sein als eine lange Liste von Leistungswerten, die nichts über deine individuelle Passform aussagt.',
        ],
        sourceIndexes: [0, 1, 2],
      },
      {
        id: 'bedienung-und-app',
        title: 'Bedienung prüfen, ohne die App zum Hauptkriterium zu machen',
        paragraphs: [
          'Medela nennt eine Verbindung zur Medela-Family-App. Betrachte sie als zusätzliche Funktion und prüfe, was die aktuelle App für das angebotene Gerät tatsächlich unterstützt. Eine App-Verbindung bedeutet nicht automatisch, dass jede Einstellung per Smartphone verändert werden kann. Sie ist auch kein Nachweis für höhere Milchmengen. Wer keine Sitzungsdaten verwalten möchte, sollte diesen Punkt im Vergleich geringer gewichten.',
          'Bei Philips solltest du dir die Bedienung der Motoreinheit anhand der Anleitung ansehen, statt aus der Zahl beworbener Saugbewegungen einen persönlichen Zeitgewinn abzuleiten. Vergleiche Erreichbarkeit der Tasten, Anzeige und den Ablauf beim Starten und Beenden. Das BZfE betont, dass passende Einstellungen individuell sind. Dieser Artikel legt deshalb weder eine Stufe noch eine bestimmte Sitzungsdauer für dich fest.',
        ],
        sourceIndexes: [0, 1, 2],
      },
      {
        id: 'reinigung',
        title: 'Wenige Teile: hilfreich, aber keine Hygiene-Abkürzung',
        paragraphs: [
          'Medela nennt drei Cup-Teile und beschreibt die Schalen als spülmaschinengeeignet. Philips wirbt mit wenigen Teilen und einfachem Zusammensetzen. Zähle beim konkreten Set trotzdem alle milchberührenden Bauteile, einschließlich eingesetzter Größenanpassungen. Die Zahl der Teile kann den Ablauf übersichtlicher machen, sagt allein aber nichts darüber aus, wie viel Trockenplatz und Vorbereitungszeit du brauchst.',
          'Das BZfE empfiehlt die Reinigung von Pumpset und Behältern nach jedem Gebrauch mit Spülmittel und heißem Wasser sowie anschließendes Abspülen und Trocknen. Beachte daneben die Modellanleitung: Nicht jede Komponente darf genauso behandelt werden wie ein Cup. Rechne auch die Schalenmontage und den Transport sauberer Teile ein. Ein Reinigungsplan ist für mehrere Sitzungen am Tag wichtiger als ein pauschales Versprechen von mühelosem Abpumpen.',
        ],
        sourceIndexes: [0, 1, 2],
      },
      {
        id: 'set-und-ersatzteile',
        title: 'Freestyle Hands-free und SCF547/11 exakt zuordnen',
        paragraphs: [
          'Achte bei Medela auf die vollständige Bezeichnung Freestyle Hands-free und bei Philips auf SCF547/11. Ähnlich benannte Pumpen, Auffangschalen und Varianten müssen nicht denselben Lieferumfang haben. Die Medela-Seite nennt einen konkreten Setinhalt; die Philips-Seite führt die Modellnummer und separates Zubehör auf. Vergleiche diese Angaben mit dem Händlerangebot und nicht nur mit dessen Titel.',
          'Schreibe die enthaltenen Cups, Größen, Ladekomponenten und Zubehörnummern auf. Prüfe anschließend, ob benötigte Ersatzteile ausdrücklich für dieses Modell beschrieben werden. Wir bestätigen hier keine aktuelle Lieferbarkeit und keine Austauschbarkeit zwischen Marken oder Varianten. Wenn ein Zusatzset für eine andere Modellnummer angeboten wird, braucht es eine eindeutige Herstellerzuordnung, bevor es in deinen Warenkorb gehört.',
        ],
        sourceIndexes: [0, 1],
      },
      {
        id: 'entscheidung',
        title: 'Nach Arbeitsablauf wählen, nicht nach einem pauschalen Sieger',
        paragraphs: [
          'Nimm Medela in die engere Auswahl, wenn die dokumentierte Cup-Konstruktion und die optionalen App-Funktionen zu deinem Alltag passen. Prüfe Philips, wenn dir die transparente Schale, die Bedienung der Motoreinheit und das konkret passende Größenangebot zusagen. Beide Entscheidungen bleiben an den tatsächlichen Lieferumfang und deine Passform gebunden. Eine Marke gewinnt nicht allein deshalb, weil ihre Werbung mehr Leistung verspricht.',
          'Bei nur gelegentlichem Bedarf lohnt sich vor beiden Käufen auch die Frage, ob eine einfachere Lösung ausreicht. Das BZfE ordnet manuelle Pumpen kleinen, gelegentlichen Mengen und elektrische Pumpen häufigerem Abpumpen zu; es nennt außerdem Leihmöglichkeiten in Apotheken und Sanitätshäusern.',
        ],
        bullets: [
          'Bei beiden Systemen den Platz für die externe Motoreinheit mitdenken.',
          'Transparenz, passende Größe und Reinigung als gemeinsame Prüfpunkte behandeln.',
          'Herstellerwerbung nicht als garantierten Zeit- oder Mengenvorteil übernehmen.',
        ],
        sourceIndexes: [0, 1, 2],
      },
    ],
    sources: [
      { label: 'Medela: Freestyle Hands-free, Cups und Setinhalt', url: 'https://www.medela.com/en-us/breastfeeding-pumping/products/pumps/hands-free-electric/freestyle-hands-free-breast-pump?productId=4072' },
      { label: 'Philips: Avent Hands-free Doppelmilchpumpe SCF547/11', url: 'https://www.philips.de/shop/mutter-und-kind/milchpumpen-und-brustpflege/hands-free-elektrische-doppelmilchpumpe/p/SCF547_11' },
      { label: 'BZfE: Auswahl, Anwendung und Reinigung von Milchpumpen', url: 'https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen' },
    ],
    faqs: [
      { question: 'Ist nur die Philips Avent SCF547/11 durchsichtig?', answer: 'Nein. Philips beschreibt vollständig transparente Auffangschalen; Medela nennt bei der Freestyle Hands-free ebenfalls ein transparentes Design. Vergleiche deshalb Ausrichtung und Größenangebot statt Transparenz als Alleinstellungsmerkmal zu behandeln.' },
      { question: 'Sitzt bei der Freestyle Hands-free der Motor im BH?', answer: 'Nein. Medela beschreibt eine separate Motoreinheit, während die Auffangschalen im BH sitzen. Plane den Platz für den Motor und die Verbindungen mit ein, auch wenn das System als Hands-free bezeichnet wird.' },
      { question: 'Kann ich das Zubehör jeder Philips-Avent-Pumpe für die SCF547/11 nehmen?', answer: 'Nein, eine markenweite Austauschbarkeit ist hier nicht belegt. Prüfe die genaue Pumpenmodellnummer und die ausdrückliche Zubehörzuordnung. Auch ein ähnlicher Name oder dieselbe Millimeterangabe genügt nicht als Kompatibilitätsnachweis.' },
    ],
    pinTitle: 'Medela Freestyle oder Philips Avent SCF547/11?',
    pinDescription: 'Cups, externe Motoreinheit, Reinigung und Setvarianten verständlich vergleichen. Redaktionelle Kaufhilfe ohne eigene Testbehauptung. Der Website-Artikel enthält Affiliate-Links.',
  },
  {
    slug: 'hands-free-milchpumpe-kaufen',
    title: 'Hands-free-Milchpumpe kaufen: Die Bauweise muss zum Alltag passen',
    description: 'Ein Entscheidungsweg für Hands-free-Pumpen: Bauweise, Einsatzhäufigkeit, Passform, Bedienung und Aufwand nach der Sitzung.',
    lead: 'Hands-free beschreibt freie Hände, nicht automatisch einen unsichtbaren Motor, weniger Reinigung oder bessere Ergebnisse. Mit einem klaren Anforderungsprofil kannst du Angebote aussortieren, bevor dich App-Funktionen und lange Datenblätter vom eigentlichen Bedarf ablenken.',
    category: 'Kaufberatung',
    published: '2026-10-14',
    updated: '2026-10-14',
    productIds: ['momcozy-m9', 'medela-freestyle', 'philips-avent-scf547'],
    sections: [
      {
        id: 'bedarf',
        title: 'Erst den Bedarf festhalten, dann die Modelle öffnen',
        paragraphs: [
          'Notiere, wo und wie häufig du voraussichtlich pumpen möchtest. Geht es um gelegentliche kurze Abwesenheiten oder um einen wiederkehrenden Arbeitsablauf mit mehreren Vorbereitungs- und Reinigungsschritten? Das BZfE nennt manuelles Abpumpen als Möglichkeit für gelegentliche kleine Mengen und elektrische Pumpen für häufigeres Abpumpen. Eine aufwendige Hands-free-Ausstattung ist deshalb nicht automatisch der sinnvolle Einstieg für jede Situation.',
          'Schreibe außerdem auf, was dir heute konkret fehlt: freie Hände am Schreibtisch, weniger Gewicht im BH, eine Bedienung ohne Telefon oder ein übersichtlicher Reinigungsablauf. Beschränke dich zunächst auf wenige Anforderungen. So verhinderst du, dass ein zusätzliches Programm zum Kaufargument wird, obwohl es keines deiner Probleme löst. Bei Unsicherheit können Hebammen und Stillberaterinnen die Auswahl und Anwendung begleiten.',
        ],
        sourceIndexes: [0],
      },
      {
        id: 'bauformen',
        title: 'All-in-one und separate Motoreinheit unterscheiden',
        paragraphs: [
          'Die Momcozy M9 steht für ein tragbares System mit Motoreinheit an der Pumpe im BH. Medela Freestyle Hands-free beschreibt dagegen separate Pumpe und Cups; Philips SCF547/11 arbeitet ebenfalls mit einer kompakten Motoreinheit. In allen Fällen können die Hände frei bleiben, aber die Verteilung der Komponenten unterscheidet sich. Das beeinflusst, welche Kleidung und welcher Platz für das System infrage kommen.',
          'Bei einer integrierten Lösung prüfst du vor allem, ob die komplette Pumpe im vorgesehenen BH untergebracht werden kann. Bei einem getrennten System brauchst du zusätzlich einen praktikablen Platz für Motor und Verbindungen. Daraus folgt keine allgemeine Komfort-Rangliste. Nimm deine typische Nutzungssituation als Maßstab: Ein ruhiger Arbeitsplatz kann andere Anforderungen stellen als ein enger Umkleidebereich oder eine Fahrt als Passagierin.',
        ],
        sourceIndexes: [1, 2, 3],
      },
      {
        id: 'passform',
        title: 'Die richtige Größe gehört vor die Bestellung',
        paragraphs: [
          'Prüfe die Größeninformationen des konkreten Modells und vergleiche sie mit dem Lieferumfang. Momcozy nennt für die M9 einen 24-mm-Flansch und zusätzliche Einsatzoptionen. Philips führt verschiedene Brustkissen und Einsätze auf; Medela nennt Größen im Setinhalt seiner Produktseite. Eine aufgelistete Zubehörgröße bedeutet nicht, dass sie beim Händler bereits im gewählten Paket enthalten ist.',
          'Vermeide die Annahme, ein im Karton beiliegendes Standardteil müsse automatisch passen. Das BZfE nennt fachliche Unterstützung bei der Auswahl des Trichteraufsatzes. Nutze diese Möglichkeit, wenn die Hersteller-Messhilfe Fragen offenlässt. Wir geben hier keine individuelle Größenempfehlung. Auch Zubehör mit derselben Millimeterangabe ist nicht ohne Weiteres zwischen Modellen austauschbar; die genaue Form und Herstellerzuordnung müssen ebenfalls passen.',
        ],
        sourceIndexes: [0, 1, 2, 3],
      },
      {
        id: 'bedienung',
        title: 'Bedienung nach deiner Routine gewichten',
        paragraphs: [
          'Die M9 bietet laut Momcozy Tasten und App-Steuerung, wobei bestimmte personalisierte Funktionen die App nutzen. Medela nennt eine App-Verbindung als Zusatzfunktion. Das sind unterschiedliche Beschreibungen; aus dem Wort „App“ lässt sich nicht für jedes Modell dieselbe Fernsteuerung ableiten. Lies genau nach, was ohne Telefon möglich ist und was eine Einrichtung, ein Konto oder eine Verbindung benötigt.',
          'Frage dich, ob du Einstellungen lieber am Gerät kontrollierst oder am Smartphone. Vergleiche Anzeigen und erreichbare Bedienelemente in der Anleitung. Mehr Intensitätsstufen bieten zusätzliche Auswahl, beweisen aber keine bessere Wirkung. Die passende Einstellung ist individuell, wie das BZfE betont. Ein Herstellerprogramm oder eine App-Auswertung ist kein Ersatz für fachliche Unterstützung bei Beschwerden oder Fragen zur Milchversorgung.',
        ],
        sourceIndexes: [0, 1, 2],
      },
      {
        id: 'folgekosten-und-reinigung',
        title: 'Die Arbeit nach dem Pumpen gehört zum Vergleich',
        paragraphs: [
          'Ein vollständiger Vergleich endet nicht mit dem Ausschalten des Motors. Du musst die Milch entsprechend deiner Aufbewahrungsplanung versorgen, milchberührende Teile reinigen, trocknen und wieder zusammensetzen. Das BZfE empfiehlt Reinigung nach jedem Gebrauch. Medela nennt drei Cup-Teile, Philips wenige Teile. Diese Angaben helfen beim Einschätzen des Ablaufs, befreien aber nicht von den jeweiligen Hygiene- und Pflegehinweisen.',
          'Ergänze in deiner Einkaufsliste benötigte Größenanpassungen und eindeutig passende Ersatzteile. Prüfe deren Zuordnung und den Beschaffungsweg, ohne von einer heute sichtbaren Produktseite auf dauerhafte Lieferbarkeit zu schließen. Ein zweites passendes Pumpset kann organisatorisch interessant sein, ist aber keine Pflichtanschaffung. Entscheide darüber anhand deiner Reinigungsmöglichkeiten und nicht anhand eines Bundles, das möglichst viele Zubehörartikel zusammenfasst.',
        ],
        sourceIndexes: [0, 1, 2, 3],
      },
      {
        id: 'kaufcheck',
        title: 'Ein kurzer Kaufcheck statt eines pauschalen Testsiegers',
        paragraphs: [
          'Erstelle eine kurze Auswahlliste nur mit Modellen, die deine Muss-Kriterien erfüllen. Für App-Steuerung kannst du die M9 prüfen; für separate Motoreinheit und transparente Cups kommen Freestyle Hands-free und SCF547/11 in Betracht. Das sind begründete Ansatzpunkte, keine allgemeine Rangfolge. Erst danach vergleichst du den konkreten Setumfang und die Händlerbedingungen des tatsächlich angebotenen Produkts.',
          'Lies vor der Bestellung Anleitung und Sicherheitshinweise, nicht erst nach dem Auspacken. Wenn du den Bedarf noch nicht einschätzen kannst, frage auch nach Leihmöglichkeiten: Das BZfE nennt Apotheken und Sanitätshäuser. Er verspricht weder unbemerkte Nutzung noch eine bestimmte Milchmenge oder garantierte Zeitersparnis.',
        ],
        bullets: [
          'Exakte Modellnummer und Variante mit dem Setinhalt abgleichen.',
          'Größenbedarf, Reinigungsplatz und Ersatzteilzuordnung vorher klären.',
          'Nur Funktionen bezahlen, die deine tatsächliche Routine unterstützen.',
        ],
        sourceIndexes: [0, 1, 2, 3],
      },
    ],
    sources: [
      { label: 'BZfE: Pumpenarten, Beratung und Reinigung', url: 'https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen' },
      { label: 'Momcozy: M9, App und Tasten sowie Größenoptionen', url: 'https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump' },
      { label: 'Medela: Freestyle Hands-free mit separater Pumpe', url: 'https://www.medela.com/en-us/breastfeeding-pumping/products/pumps/hands-free-electric/freestyle-hands-free-breast-pump?productId=4072' },
      { label: 'Philips: SCF547/11, Cups und Zubehör', url: 'https://www.philips.de/shop/mutter-und-kind/milchpumpen-und-brustpflege/hands-free-elektrische-doppelmilchpumpe/p/SCF547_11' },
    ],
    faqs: [
      { question: 'Ist Hands-free immer vollständig im BH integriert?', answer: 'Nein. Bei Medela Freestyle Hands-free und Philips SCF547/11 gehört eine separate Motoreinheit zum System. Die M9 ist ein anderer Aufbau. Prüfe nicht nur die Werbebezeichnung, sondern alle Komponenten und ihren vorgesehenen Platz.' },
      { question: 'Was sollte ich vor App-Funktionen vergleichen?', answer: 'Zuerst Bedarf, Bauweise, passende Größe, konkreten Setinhalt und Reinigungsablauf. Danach ist die Frage sinnvoll, welche Bedienfunktionen du tatsächlich am Smartphone nutzen möchtest. App-Verbindung und vollständige Fernsteuerung sind nicht automatisch dasselbe.' },
      { question: 'Muss ich bei unklarem Bedarf sofort eine Hands-free-Pumpe kaufen?', answer: 'Nein. Das BZfE nennt je nach Nutzung auch manuelle Pumpen und Leihmöglichkeiten für elektrische Pumpen. Kläre den Bedarf und die Passform mit fachlicher Unterstützung, bevor du ein umfangreiches Set bestellst.' },
    ],
    pinTitle: 'Hands-free-Milchpumpe kaufen: 6 sinnvolle Prüfpunkte',
    pinDescription: 'Bauweise, Passform, Bedienung und Reinigung vor dem Kauf sortieren – ohne pauschalen Testsieger. Der Website-Artikel enthält Affiliate-Links.',
  },
  {
    slug: 'milchpumpe-fuer-unterwegs',
    title: 'Milchpumpe für unterwegs: Nicht nur den Akku einplanen',
    description: 'Eine praktische Planung für Arbeit und Ausflüge: Pumpplatz, saubere Teile, Energieversorgung, Umfüllen und Rückweg.',
    lead: 'Unterwegs ist die passende Pumpe nur ein Teil der Lösung. Ebenso wichtig sind ein geeigneter Ort, ein realistischer Reinigungsablauf und eine geklärte Aufbewahrung der Milch. Dieser Ratgeber gibt Planungshilfen, aber keine individuellen medizinischen Empfehlungen oder pauschalen Lagerzeiten.',
    category: 'Alltag und Planung',
    published: '2026-10-14',
    updated: '2026-10-14',
    productIds: ['momcozy-m9', 'medela-freestyle', 'philips-avent-scf547'],
    sections: [
      {
        id: 'weg-durchspielen',
        title: 'Den gesamten Weg durchspielen, nicht nur die Sitzung',
        paragraphs: [
          'Gehe gedanklich von der Abfahrt bis zur Rückkehr durch deinen Tag. Wo kannst du Hände waschen, saubere Teile auspacken, die Pumpe anlegen und anschließend alles versorgen? Das BZfE empfiehlt sauberes Pumpzubehör und saubere Auffang- beziehungsweise Aufbewahrungsbehälter als Vorbereitung. Ein Sitzplatz allein ist deshalb noch kein vollständig geeigneter Pumpplatz. Kläre die Bedingungen vor einem längeren Termin, statt auf spontane Lösungen zu setzen.',
          'Plane auch die Unterbrechungen ein: Anlegen, Abnehmen, gegebenenfalls Umfüllen und Verstauen brauchen einen ruhigen Ablauf. Hands-free bedeutet nicht, dass jeder Schritt nebenbei möglich ist. Wenn du für einen Arbeitsweg oder Ausflug keine geeignete Umgebung organisieren kannst, ist das ein Planungsproblem, das ein zusätzliches Pumpenprogramm nicht löst. Der Kauf sollte zur verfügbaren Infrastruktur passen.',
        ],
        sourceIndexes: [0],
      },
      {
        id: 'bauform-und-kleidung',
        title: 'Bauform und Kleidung gemeinsam auswählen',
        paragraphs: [
          'Bei der M9 befinden sich die Pumpeneinheiten im BH; Medela Freestyle Hands-free und Philips SCF547/11 nutzen eine separate Motoreinheit mit Auffangschalen. Überlege deshalb nicht nur, was in die Tasche passt, sondern auch, wie du alles anlegen und bedienen möchtest. Eine externe Motoreinheit braucht einen praktikablen Platz, eine integrierte Lösung ausreichend Raum im vorgesehenen BH.',
          'Probiere das Anlegen und Verstauen zunächst zu Hause nach der Anleitung aus. Dabei geht es um einen organisatorischen Probelauf, nicht um einen veröffentlichten Produkttest. Prüfe, ob deine Kleidung den Zugriff auf Bedienelemente zulässt und ob du beim Abnehmen eine saubere Ablage erreichen kannst. Herstellerbilder sind kein Beleg dafür, dass die Pumpe unter deiner Kleidung unsichtbar bleibt oder bei jeder Bewegung sicher sitzt.',
        ],
        sourceIndexes: [1, 2, 3],
      },
      {
        id: 'energie-und-bedienung',
        title: 'Energieversorgung vor der Abfahrt klären',
        paragraphs: [
          'Die Hersteller beschreiben die drei hier verlinkten elektrischen Systeme mit wiederaufladbarem Akku. Lade gemäß der jeweiligen Anleitung und kontrolliere den Zustand vor der Abfahrt. Verlasse dich nicht allein auf eine beworbene Zahl von Anwendungen pro Ladung. Stelle auch sicher, dass Kabel und gegebenenfalls Netzteil zum konkreten Gerät gehören und dass du am Ziel eine nutzbare Lademöglichkeit hast.',
          'Eine Powerbank ist nicht automatisch eine bestätigte Lösung: Prüfe Anschluss und elektrische Anforderungen anhand der Modellanleitung, statt nur auf die Steckerform zu schauen. Bei der M9 kannst du reguläre Modi laut Hersteller auch über Tasten bedienen. Wenn du zusätzliche App-Funktionen nutzen möchtest, gehört ein eingerichtetes und geladenes Telefon ebenfalls zur Planung. Richte neue Verbindungen nicht erst unter Zeitdruck unterwegs ein.',
        ],
        sourceIndexes: [1, 2, 3],
      },
      {
        id: 'reinigung-unterwegs',
        title: 'Saubere und benutzte Teile getrennt organisieren',
        paragraphs: [
          'Das BZfE empfiehlt, Pumpset und Behälter nach jedem Gebrauch mit Spülmittel und heißem Wasser zu reinigen, anschließend abzuspülen und zu trocknen. Kläre, ob du das am Ziel entsprechend den zusätzlichen Herstellerhinweisen umsetzen kannst. Ein kurzer Blick auf ein Waschbecken beantwortet noch nicht die Frage nach sauberer Ablage, Trocknung und dem Umgang mit den einzelnen Komponenten.',
          'Wenn du benutzte Teile für den Heimweg verstauen musst, kennzeichne sie eindeutig und halte sie von einsatzbereiten Teilen getrennt. Das ersetzt die Reinigung nicht. Ein zusätzliches, vollständig passendes und sauber vorbereitetes Set kann den Ablauf vereinfachen, wenn am Ziel keine Wiederaufbereitung möglich ist. Es ist aber nur dann hilfreich, wenn du auch dessen spätere Reinigung und Trocknung einplanst.',
        ],
        sourceIndexes: [0],
      },
      {
        id: 'milch-und-rueckweg',
        title: 'Aufbewahrung und Rückweg gesondert planen',
        paragraphs: [
          'Pumpenakku und Milchtransport sind zwei verschiedene Themen. Lege vorab fest, in welchen geeigneten Behältern du die Milch versorgst und welche Aufbewahrungs- und Transportbedingungen auf deiner Strecke möglich sind. Das BZfE verweist hierfür auf Informationen des Netzwerks Gesund ins Leben und auf Unterstützung durch Hebammen und Stillberaterinnen. Dieser Artikel nennt bewusst keine universellen Aufbewahrungszeiten für unterschiedliche Umgebungen.',
          'Das BZfE empfiehlt möglichst direkt in den späteren Aufbewahrungsbehälter zu pumpen, um Umfüllschritte zu vermeiden. Bei einem Cup-System kann ein Umfüllen notwendig sein; richte dafür einen sauberen Arbeitsablauf nach der Anleitung ein. Ein Auffangcup ist nicht automatisch ein dichtes Transportgefäß. Prüfe die vorgesehene Verwendung und plane geeignete Behälter sowie die erforderliche Aufbewahrung, bevor du dich auf den Weg machst.',
        ],
        sourceIndexes: [0, 1, 2, 3],
      },
      {
        id: 'packliste',
        title: 'Eine schlanke Packliste mit klaren Aufgaben',
        paragraphs: [
          'Packe nicht jedes angebotene Zubehör ein, sondern nur Teile mit einer konkreten Aufgabe. Zur Pumpe gehören die passende Größe, sämtliche benötigten Komponenten und eine geprüfte Energieversorgung. Ergänze geeignete Behälter und eine getrennte Organisation für saubere und benutzte Teile. Wie du die Milch aufbewahrst, muss für den konkreten Weg geklärt sein; eine beliebige Tasche löst diese Frage nicht.',
          'Plane eine ruhige, dafür geeignete Situation statt Pumpen mit sicherheitskritischen Aufgaben zu kombinieren. Eine Hands-free-Pumpe ist keine Empfehlung für Nutzung beim Fahren oder für ununterbrochenes Multitasking. Für gelegentliche kleine Mengen nennt das BZfE auch manuelle Möglichkeiten; nicht jeder Ausflug rechtfertigt eine neue elektrische Pumpe. Wähle das System erst, wenn du seine Vorbereitung, Nutzung und Nachbereitung zuverlässig organisieren kannst.',
        ],
        bullets: [
          'Vollständiges Pumpset in der zu dir passenden Größe und mit zugehöriger Anleitung.',
          'Passende Ladekomponenten und vorab kontrollierter Akku.',
          'Geeignete Milchbehälter sowie getrennte Aufbewahrung sauberer und benutzter Teile.',
          'Geklärter Pumpplatz, Reinigungsweg und Plan für den Rücktransport.',
        ],
        sourceIndexes: [0, 1, 2, 3],
      },
    ],
    sources: [
      { label: 'BZfE: Vorbereitung, Hygiene und Hinweise zur Aufbewahrung', url: 'https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen' },
      { label: 'Momcozy: M9 Bauform, Akku und Bedienung', url: 'https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump' },
      { label: 'Medela: Freestyle Hands-free und wiederaufladbarer Akku', url: 'https://www.medela.com/en-us/breastfeeding-pumping/products/pumps/hands-free-electric/freestyle-hands-free-breast-pump?productId=4072' },
      { label: 'Philips: SCF547/11 System und Motoreinheit', url: 'https://www.philips.de/shop/mutter-und-kind/milchpumpen-und-brustpflege/hands-free-elektrische-doppelmilchpumpe/p/SCF547_11' },
    ],
    faqs: [
      { question: 'Kann ich einen vollen Auffangcup einfach in die Handtasche legen?', answer: 'Nicht ohne die vorgesehene Verwendung und Verschlüsse zu prüfen. Ein Cup ist nicht automatisch ein dichtes Transportgefäß. Plane geeignete Behälter und einen sauberen Umfüllablauf nach der Modellanleitung sowie die erforderlichen Aufbewahrungsbedingungen.' },
      { question: 'Reicht eine beliebige USB-Powerbank für die Pumpe?', answer: 'Das ist nicht pauschal belegt. Steckerform, benötigte elektrische Leistung und Herstellerhinweise müssen zum konkreten Modell passen. Prüfe die Anleitung und teste die organisatorische Vorbereitung vor der Reise, statt erst am Ziel improvisieren zu müssen.' },
      { question: 'Was mache ich, wenn ich am Ziel keine Teile reinigen kann?', answer: 'Plane die Wiederaufbereitung vorher. Ein zusätzliches passendes, sauber vorbereitetes Set kann organisatorisch helfen, ersetzt aber nicht die Reinigung benutzter Teile. Das BZfE empfiehlt Reinigung nach jedem Gebrauch; benutzte Teile getrennt zu verpacken ist nur eine Transportorganisation.' },
    ],
    pinTitle: 'Milchpumpe unterwegs: Diese Planung zählt wirklich',
    pinDescription: 'Pumpplatz, Akku, saubere Teile und Rückweg als zusammenhängenden Ablauf planen. Keine pauschalen Lagerzeiten. Der Website-Artikel enthält Affiliate-Links.',
  },
  {
    slug: 'milchpumpe-einzel-oder-doppelpumpe',
    title: 'Milchpumpe: Einzel- oder Doppelpumpe sinnvoll auswählen',
    description: 'Einzelset und Doppelset nach Ablauf, Reinigungsaufwand und Lieferumfang unterscheiden, ohne garantierte Zeit- oder Mengenvorteile.',
    lead: 'Eine Einzelpumpe arbeitet an einer Brust zur gleichen Zeit; ein dafür ausgelegtes Doppelset ermöglicht die gleichzeitige Nutzung an beiden Seiten. Welche Variante sinnvoll ist, hängt von deinem vorgesehenen Ablauf ab – nicht allein von der Anzahl der Cups im Produktfoto.',
    category: 'Kaufberatung',
    published: '2026-10-14',
    updated: '2026-10-14',
    productIds: ['momcozy-m9', 'medela-freestyle', 'philips-avent-scf547'],
    sections: [
      {
        id: 'begriffe',
        title: 'Einzel, doppelt und Hands-free sind unterschiedliche Merkmale',
        paragraphs: [
          'Einzel- oder Doppelset beschreibt zunächst, wie viele Seiten das angebotene System gleichzeitig bedienen kann. Hands-free beschreibt dagegen eine Nutzungsform mit freien Händen. Diese Angaben beantworten unterschiedliche Fragen. Die Philips SCF547/11 wird vom Hersteller als elektrische Doppelmilchpumpe bezeichnet; Medela nennt für die Freestyle Hands-free zwei Auffangschalen im Setinhalt. Bei Momcozy musst du die konkret gewählte M9-Setvariante prüfen.',
          'Leite die Funktion nicht nur aus zwei sichtbaren Schalen ab. Maßgeblich ist das vollständig angebotene System einschließlich benötigter Pumpeneinheit, Verbindungen und Anleitung. Ersatzcups oder ein Zubehörpaket sind nicht automatisch eine zweite vollständige Pumpe. Überlege zuerst, ob du beide Seiten gleichzeitig nutzen möchtest; erst danach ist sinnvoll zu vergleichen, ob das passende System integriert oder mit separatem Motor aufgebaut ist.',
        ],
        sourceIndexes: [0, 1, 2],
      },
      {
        id: 'gelegentlich-oder-haeufig',
        title: 'Die Einsatzhäufigkeit ist die erste Weiche',
        paragraphs: [
          'Das BZfE unterscheidet zwischen gelegentlichem Abpumpen kleiner Mengen, für das manuelle Möglichkeiten infrage kommen, und häufigem Abpumpen mit elektrischer Pumpe. Das ist eine hilfreiche Grundorientierung, aber noch keine Entscheidung zwischen Einzel- und Doppelset. Frage dich zusätzlich, ob du einen festen wiederkehrenden Ablauf planst oder zunächst nur einzelne Situationen überbrücken möchtest.',
          'Bei unklarem Bedarf kann es sinnvoll sein, erst Beratung oder eine Leihmöglichkeit zu prüfen. Das BZfE nennt dafür Apotheken und Sanitätshäuser. Ein Doppelset vorsorglich zu kaufen ist nicht automatisch wirtschaftlicher, ein Einzelset nicht automatisch ausreichend. Entscheidend sind die benötigte Funktion und die Möglichkeiten zur Vorbereitung und Reinigung. Dieser Ratgeber legt keinen persönlichen Pumpplan fest und gibt keine medizinische Indikation vor.',
        ],
        sourceIndexes: [3],
      },
      {
        id: 'einzelablauf',
        title: 'Wann ein Einzelset zum vorgesehenen Ablauf passen kann',
        paragraphs: [
          'Ein Einzelset ist als Kaufoption prüfenswert, wenn dein geplanter Ablauf die Nutzung einer Seite zur gleichen Zeit vorsieht. Dadurch musst du zunächst weniger vollständige Auffangkomponenten vorbereiten und transportieren. Das sagt nichts darüber aus, wie viel Milch du damit gewinnen wirst. Wenn du nacheinander beide Seiten nutzen möchtest, berücksichtige das Umsetzen und den gesamten Ablauf statt nur die Laufzeit des Motors.',
          'Kläre vor dem Kauf, ob du das Set später möglicherweise erweitern möchtest. Eine Erweiterung ist nicht für jedes System gleich möglich. Bei einem integrierten Wearable kann eine weitere vollständige Einheit etwas anderes sein als bei einer Pumpe mit zentralem Motor. Wir bestätigen hier keine Nachrüstbarkeit. Lass dir die vorgesehene Konfiguration und benötigte Teile ausdrücklich für das genaue Modell zuordnen.',
        ],
        sourceIndexes: [0, 1, 2],
      },
      {
        id: 'doppelablauf',
        title: 'Wann ein Doppelset organisatorisch interessant wird',
        paragraphs: [
          'Wenn dein Ablauf die gleichzeitige Nutzung beider Seiten vorsieht, bietet ein dafür ausgelegtes Doppelset die passende technische Möglichkeit. Medela Freestyle Hands-free und Philips SCF547/11 sind deshalb konkrete Kandidaten zum Prüfen. Das gleichzeitige Arbeiten kann die Reihenfolge der Arbeitsschritte verändern. Wir leiten daraus aber weder eine garantierte Halbierung deiner gesamten Pumpzeit noch einen festen Mengenvorteil ab.',
          'Zum Gesamtaufwand gehören auch zwei korrekt angelegte Schalen, ihre Kontrolle und die spätere Reinigung. Rechne Vorbereitung und Nachbereitung in den Vergleich ein. Eine Werbeaussage über Geschwindigkeit beantwortet nicht, wie schnell du persönlich mit einem System zurechtkommst. Das BZfE betont, dass Pumpen Zeit und Übung braucht und die passenden Einstellungen individuell sind. Wähle daher nach deinem Ablauf, nicht nach einem pauschalen Effizienzversprechen.',
        ],
        sourceIndexes: [1, 2, 3],
      },
      {
        id: 'reinigung-und-setumfang',
        title: 'Zwei Schalen bedeuten auch eine vollständige Nachbereitung',
        paragraphs: [
          'Das BZfE empfiehlt, Pumpset und Behälter nach jedem Gebrauch zu reinigen, abzuspülen und zu trocknen. Bei einem Doppelset betrifft die Nachbereitung beide verwendeten Auffangsysteme. Medela nennt drei Teile pro Cup; Philips beschreibt wenige Teile. Die Angaben helfen dir, die Konstruktion einzuschätzen, ohne eine konkrete Reinigungsdauer zu garantieren. Größenanpassungen und weitere milchberührende Teile gehören ebenfalls in deinen Plan.',
          'Prüfe beim Händler, ob der Lieferumfang alles für die gewählte Konfiguration enthält. Benötigte Größen müssen für beide Seiten berücksichtigt werden; eine individuelle Größenklärung gehört zur Beratung, nicht in eine pauschale Kaufempfehlung. Vergleiche auch den dokumentierten Ersatzteilweg. Mehr Zubehör im Paket ist nur dann ein Vorteil, wenn die Teile tatsächlich passen und in deinem Alltag gebraucht werden.',
        ],
        sourceIndexes: [1, 2, 3],
      },
      {
        id: 'entscheidung',
        title: 'So triffst du die Entscheidung ohne Fehlkauf',
        paragraphs: [
          'Schreibe deinen vorgesehenen Ablauf in einem Satz auf: eine Seite zur gleichen Zeit oder beide Seiten gleichzeitig, zu Hause oder an einem bestimmten anderen Ort. Prüfe dann genau diesen Ablauf in Anleitung und Setbeschreibung. Bei der M9 achtest du besonders auf die gewählte Variante; bei Medela und Philips auf die vollständige Modellbezeichnung und den angebotenen Doppelsetumfang.',
          'Wenn der Bedarf noch offen ist, verschiebe die Entscheidung über zusätzliche Einheiten und kläre zuerst Passform und Nutzung mit fachlicher Hilfe. Ein kleineres passendes Set kann sinnvoller sein als ein umfangreiches unpassendes, während ein Einzelset einen ausdrücklich gewünschten gleichzeitigen Ablauf nicht ersetzt.',
        ],
        bullets: [
          'Gewünschten Ablauf eindeutig festlegen: nacheinander oder gleichzeitig.',
          'Vollständige Konfiguration statt nur die Zahl der abgebildeten Cups prüfen.',
          'Vorbereitung, Reinigung und passende Größen auf beiden Seiten mitdenken.',
          'Eine spätere Erweiterung nur bei dokumentierter Modellfreigabe einplanen.',
        ],
        sourceIndexes: [0, 1, 2, 3],
      },
    ],
    sources: [
      { label: 'Momcozy: M9 Produkt und angebotene Setvarianten', url: 'https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump' },
      { label: 'Medela: Freestyle Hands-free mit zwei Auffangschalen', url: 'https://www.medela.com/en-us/breastfeeding-pumping/products/pumps/hands-free-electric/freestyle-hands-free-breast-pump?productId=4072' },
      { label: 'Philips: SCF547/11 als elektrische Doppelmilchpumpe', url: 'https://www.philips.de/shop/mutter-und-kind/milchpumpen-und-brustpflege/hands-free-elektrische-doppelmilchpumpe/p/SCF547_11' },
      { label: 'BZfE: Einsatzhäufigkeit, Übung und Hygiene', url: 'https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen' },
    ],
    faqs: [
      { question: 'Ist eine Doppelpumpe automatisch doppelt so schnell?', answer: 'Eine dafür ausgelegte Doppelpumpe ermöglicht die gleichzeitige Nutzung beider Seiten. Daraus folgt keine garantierte Halbierung des gesamten Ablaufs. Anlegen, individuelle Anwendung, Umfüllen und Reinigung bleiben Bestandteil der Planung.' },
      { question: 'Kann ich aus zwei Ersatzcups ein Doppelset machen?', answer: 'Nicht automatisch. Du brauchst die vom Hersteller vorgesehene vollständige Konfiguration mit allen nötigen Komponenten. Prüfe die Anleitung und eine ausdrückliche Zuordnung zum genauen Pumpenmodell; Zubehörschalen allein belegen die Funktion nicht.' },
      { question: 'Welche der genannten Pumpen ist ausdrücklich ein Doppelset?', answer: 'Philips bezeichnet die SCF547/11 als elektrische Doppelmilchpumpe. Medela nennt zwei Auffangschalen im Freestyle-Hands-free-Set. Bei der M9 musst du die gewählte Setvariante abgleichen; ein Produktname allein belegt keinen konkreten Händlerlieferumfang.' },
    ],
    pinTitle: 'Einzel- oder Doppelpumpe: Was passt zu deinem Ablauf?',
    pinDescription: 'Gleichzeitig oder nacheinander, vollständiger Setumfang und Reinigung: eine Kaufhilfe ohne garantierte Zeitersparnis. Der Website-Artikel enthält Affiliate-Links.',
  },
  {
    slug: 'milchpumpe-zubehoer-checkliste',
    title: 'Milchpumpen-Zubehör: Eine Checkliste ohne unnötige Extras',
    description: 'Passende Größen, modellbezogene Ersatzteile, Reinigung und Transport systematisch prüfen statt beliebige Zubehör-Bundles kaufen.',
    lead: 'Gutes Zubehör löst eine konkrete Aufgabe und ist eindeutig deiner Pumpe zugeordnet. Eine bekannte Marke, ein ähnliches Foto oder dieselbe Größenangabe reichen nicht als Kompatibilitätsnachweis. Diese Checkliste hilft beim Prüfen, ohne aktuelle Verfügbarkeit oder universelle Passform zu behaupten.',
    category: 'Zubehör und Pflege',
    published: '2026-10-14',
    updated: '2026-10-14',
    productIds: ['momcozy-m9', 'momcozy-s12-pro', 'medela-freestyle', 'philips-avent-scf547'],
    sections: [
      {
        id: 'modellkarte',
        title: 'Vor jeder Bestellung eine Modellkarte anlegen',
        paragraphs: [
          'Notiere Marke, vollständige Modellbezeichnung, Generation und den vorhandenen Setumfang. Bei Philips gehört beispielsweise die Bezeichnung SCF547/11 dazu, bei Medela Freestyle Hands-free der Zusatz Hands-free. Halte außerdem die Teilenummern aus der passenden Anleitung fest. Diese kleine Liste macht spätere Ersatzteilbestellungen nachvollziehbarer als eine Suche allein nach „Milchpumpe Ventil“ oder nach dem Markennamen.',
          'Besonders wichtig ist die Generation bei Momcozy: Der Hersteller unterscheidet die ursprüngliche S12 Pro von der S12 Pro Quick und beschreibt Veränderungen am System. Kaufe deshalb nicht anhand einer alten Produktadresse, die inzwischen zu einem Nachfolger führen kann. Verlange eine ausdrückliche Zuordnung zum vorhandenen Gerät. Wenn Angaben widersprüchlich sind, kläre sie beim Anbieter oder Hersteller vor dem Bestellen.',
        ],
        sourceIndexes: [1, 2, 3, 4],
      },
      {
        id: 'groessen',
        title: 'Flansche, Brustkissen und Einsätze gezielt auswählen',
        paragraphs: [
          'Für die M9 nennt Momcozy einen 24-mm-Flansch und Einsatzoptionen mit 17, 19 und 21 mm. Philips führt Größenvarianten für Brustkissen und Einsätze auf; Medela dokumentiert Größen im Lieferumfang. Nutze diese Angaben zur Orientierung, prüfe aber das tatsächliche Paket. Eine verfügbare Größe ist nicht automatisch im Set enthalten und nicht automatisch deine passende Größe.',
          'Das BZfE verweist bei der Wahl des Trichteraufsatzes auf Hebammen und Stillberaterinnen. Hole Hilfe, wenn die Messhinweise der Modellanleitung unklar bleiben. Kaufe nicht wahllos mehrere Größen und leite die passende Variante nicht aus der BH-Größe ab. Auch gleiche Millimeterangaben belegen keine marken- oder modellübergreifende Austauschbarkeit. Größenmaß und genaue Zubehörzuordnung müssen gemeinsam geprüft werden.',
        ],
        bullets: [
          'Größenbedarf mit der Messhilfe des konkreten Herstellers klären.',
          'Prüfen, welche Größen bereits im gewählten Paket enthalten sind.',
          'Einsatz oder Brustkissen nur mit ausdrücklicher Zuordnung zum Pumpenmodell bestellen.',
        ],
        sourceIndexes: [0, 1, 3, 4],
      },
      {
        id: 'ersatzteile',
        title: 'Ventile und Membranen nicht nach Ähnlichkeit kaufen',
        paragraphs: [
          'Lege für die im jeweiligen System verwendeten Ventile, Membranen und Dichtungen einen dokumentierten Ersatzteilweg an. Welche Teile deine Pumpe besitzt und wie sie montiert werden, ergibt sich aus ihrer Anleitung. Eine optisch ähnliche Form oder die Aussage „für Momcozy“ reicht nicht. Suche nach der genauen Modell- und gegebenenfalls Generationszuordnung und halte diese zusammen mit der Teilenummer fest.',
          'Der Momcozy-Artikel zur S12 Pro Quick spricht ausdrücklich von modellspezifischen Teilen außerhalb der dort besprochenen Einsätze. Daraus wird hier keine allgemeine Kompatibilitätsfreigabe abgeleitet. Wir nennen auch keine pauschalen Wechselintervalle: Beachte Pflegehinweise und den vorgesehenen Umgang mit beschädigten Teilen in der passenden Anleitung. Prüfe die Beschaffung im Bedarfsfall; eine verlinkte Produktseite ist keine Garantie für aktuellen Lagerbestand.',
        ],
        sourceIndexes: [2],
      },
      {
        id: 'reinigungsplatz',
        title: 'Reinigungszubehör nach dem Ablauf auswählen',
        paragraphs: [
          'Das BZfE empfiehlt nach jedem Gebrauch Spülmittel und heißes Wasser, gründliches Abspülen und anschließendes Trocknen. Plane deshalb zuerst einen geeigneten Reinigungs- und Trockenplatz. Beachte zusätzlich die Herstellerhinweise zu den einzelnen Komponenten. Eine Aussage zur Reinigung von Cups gilt nicht automatisch für Motoreinheit, Kabel oder sämtliche Zubehörteile. Elektronik ist kein gewöhnliches Spülteil.',
          'Eine geeignete Ablage und ein übersichtlicher Platz für kleine Teile können sinnvoller sein als ein großes Pflege-Bundle. Prüfe bei Bürsten oder zusätzlichem Reinigungsgerät, ob deren Verwendung für die jeweiligen Materialien vorgesehen ist. Wir empfehlen keine universelle Behandlungsmethode und keine bestimmte Zusatzanschaffung. Medelas Angabe zu drei Cup-Teilen und Philips Hinweis auf wenige Teile helfen beim Sortieren, ersetzen aber nicht den vollständigen Pflegeablauf.',
        ],
        sourceIndexes: [0, 3, 4],
      },
      {
        id: 'behaelter-und-laden',
        title: 'Transportbehälter und Ladezubehör separat prüfen',
        paragraphs: [
          'Zum Zubehör gehören auch geeignete Milchbehälter und eine Organisation für saubere beziehungsweise benutzte Pumpenteile. Das BZfE empfiehlt möglichst direkt in das spätere Aufbewahrungsgefäß zu pumpen, um zusätzliche Umfüllschritte zu vermeiden. Wenn ein Cup-System einen anderen Ablauf erfordert, plane eine saubere Handhabung nach der Anleitung. Ein Auffangteil ist nicht automatisch ein dichtes Transportgefäß für jede Situation.',
          'Bei Ladezubehör zählen die elektrischen Anforderungen des Modells ebenso wie der Anschluss. Ein passend aussehender USB-Stecker bestätigt nicht jede Kombination aus Kabel, Netzteil und Powerbank. Vergleiche die Anleitung und den konkreten Setinhalt vor einer Zusatzbestellung. Dieser Beitrag bestätigt weder universelle Ladegeräte noch Lagerzeiten für Milch. Aufbewahrung und Transport musst du anhand der vorgesehenen Bedingungen und fachlich geeigneter Informationen klären.',
        ],
        sourceIndexes: [0, 1, 3, 4],
      },
      {
        id: 'prioritaeten',
        title: 'Zubehör in notwendig, praktisch und unklar aufteilen',
        paragraphs: [
          'Notwendig sind die für dein vollständiges System vorgesehenen Teile und eine passende Größenlösung. Praktisch können zusätzliche passende Auffangsets oder eine bessere Organisation der Teile sein, wenn sie einen konkreten Engpass beheben. Unklar ist alles, dessen Aufgabe oder Modellzuordnung du nicht erklären kannst. Bestelle diese Kategorie nicht vorsorglich, nur weil sie gemeinsam mit der Pumpe beworben wird.',
          'Gehe die Liste nach den ersten organisatorischen Erfahrungen erneut durch. Fehlt dir wirklich ein Teil oder lässt sich der Ablauf mit vorhandenen Komponenten verbessern? Diese Frage vermeidet unnötige Käufe. Er nennt bewusst keine beliebigen Affiliate-Produkte als Pflichtausstattung und behauptet keine dauerhaft gesicherte Ersatzteilversorgung.',
        ],
        bullets: [
          'Notwendig: vollständige Modellkonfiguration und geklärte Größenlösung.',
          'Praktisch: nur ausdrücklich passende Extras mit konkreter Aufgabe.',
          'Vor Bestellung klären: fehlende Teilenummer, unklare Generation oder widersprüchliche Kompatibilitätsangaben.',
          'Nicht automatisch nötig: jedes Zubehör aus einem beworbenen Bundle.',
        ],
        sourceIndexes: [0, 1, 2, 3, 4],
      },
    ],
    sources: [
      { label: 'BZfE: Passende Aufsätze, Vorbereitung und Reinigung', url: 'https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen' },
      { label: 'Momcozy: M9 Flansch- und Einsatzoptionen', url: 'https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump' },
      { label: 'Momcozy: S12 Pro und Quick, generationsbezogenes Zubehör', url: 'https://momcozy.com/blogs/momcare/s12-pro-quick-setup-pumping-cleaning' },
      { label: 'Medela: Freestyle Hands-free Setinhalt und Cup-Konstruktion', url: 'https://www.medela.com/en-us/breastfeeding-pumping/products/pumps/hands-free-electric/freestyle-hands-free-breast-pump?productId=4072' },
      { label: 'Philips: SCF547/11 und zugeordnetes Zubehör', url: 'https://www.philips.de/shop/mutter-und-kind/milchpumpen-und-brustpflege/hands-free-elektrische-doppelmilchpumpe/p/SCF547_11' },
    ],
    faqs: [
      { question: 'Sind Einsätze mit derselben Millimeterangabe universell passend?', answer: 'Nein. Die Größenangabe allein belegt keine Kompatibilität. Prüfe die genaue Zuordnung zum Pumpenmodell und zur Generation, gegebenenfalls die Teilenummer und die Anleitung. Eine allgemeine Austauschbarkeit wird hier nicht bestätigt.' },
      { question: 'Kann ich für die ursprüngliche S12 Pro einfach Quick-Ersatzteile kaufen?', answer: 'Nicht pauschal. Momcozy unterscheidet die Generationen und beschreibt andere Zubehörteile als die im Artikel besprochenen Einsätze als modellspezifisch. Verlange für jedes Ersatzteil die ausdrückliche Freigabe für dein vorhandenes Modell.' },
      { question: 'Welche Extras sollte ich zuerst kaufen?', answer: 'Zuerst fehlende notwendige Komponenten und eine geklärte passende Größenlösung. Weitere Sets oder Organisationshilfen kommen erst danach infrage, wenn sie einen konkreten Ablauf verbessern. Ein großes Bundle ist kein Nachweis, dass alle Teile nötig oder passend sind.' },
    ],
    pinTitle: 'Milchpumpen-Zubehör: Erst prüfen, dann kaufen',
    pinDescription: 'Checkliste für passende Größen, modellbezogene Ersatzteile, Reinigung und Transport – ohne universelle Kompatibilitätsversprechen. Der Website-Artikel enthält Affiliate-Links.',
  },
];
