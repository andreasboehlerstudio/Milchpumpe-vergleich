// Primary-source research checked on 2026-10-29. Shared with visible content and SEO.
export type FoundationSource = { url: string; label: string; context: string };
export type FoundationSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  sourceKeys: string[];
  table?: { caption: string; headings: string[]; rows: { cells: string[]; sourceKeys: string[] }[] };
};
export type FoundationGuide = {
  title: string; lead: string; updated: string;
  sections: FoundationSection[];
  sources: FoundationSource[];
  faqs: { question: string; answer: string; sourceKeys: string[] }[];
  pdfSlug: string;
  noPurchase: string;
  related: { slug: string; title: string }[];
};

export const FOUNDATION_SOURCES: Record<string, FoundationSource> = {
  bzfe: {
    url: 'https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen',
    label: 'BZfE: Muttermilch abpumpen',
    context: 'Grundhygiene und Unterstützung bei Trichterwahl und Anwendung; keine modellbezogene Pflegefreigabe.',
  },
  medelaCups: {
    url: 'https://www.medela.com/040-services/manual-instructions/instruction-manuals-for-medela-accessories--pumping-accessories/hands-free-collection-cups-.pdf',
    label: 'Medela: Hands-free Collection Cups – Gebrauchsanleitung (PDF, EN/FR/ES)',
    context: 'Kapitel 6 und 7: Reinigung, Schlauchausschluss, Größenwahl und Montage. Die verlinkte regionale Fassung enthält einen O-Ring; mit dem eigenen Set abgleichen.',
  },
  medelaFit: {
    url: 'https://www.medela.com/en/breastfeeding-pumping/articles/pumping-tips/a-step-by-step-guide-to-breast-shield-sizes',
    label: 'Medela: Größenhilfe für Brusthauben (Englisch)',
    context: 'Brustwarzendurchmesser ohne Warzenhof messen; Herstellerhilfe, keine markenübergreifende Größenformel.',
  },
  philipsSupport: {
    url: 'https://www.philips.de/c-p/SCF547_11/hands-free-elektrische-doppelmilchpumpe/support',
    label: 'Philips Avent SCF547/11: modellspezifischer Support',
    context: 'Mess-, Reinigungs- und Montagevideos sowie Verknüpfung zur passenden Anleitung und Größenhilfe.',
  },
  philipsManual: {
    url: 'https://www.documents.philips.com/assets/20250205/613d84c6c5494844b22bb27b00c0841f.pdf',
    label: 'Philips Avent: Anleitung einschließlich SCF547 (PDF)',
    context: 'Deutsch S. 162 und 166–174: Modellzuordnung, Pflege je Komponente, Desinfektion und Größenkarte.',
  },
  philipsFit: {
    url: 'https://www.philips.de/c-f/XC000021982/wie-w%C3%A4hle-ich-die-richtige-gr%C3%B6%C3%9Fe-f%C3%BCr-brusthauben-oder-brustwarzeneins%C3%A4tze-aus',
    label: 'Philips Avent: Größenhilfe für Hands-free-Brusthauben und Einsätze',
    context: 'Über SCF547/11-Support verlinkte Hilfe für die 21-/24-mm-Brusthaubenfamilie; nicht mit Natural Care Wearable und dessen 27-mm-System vermischen.',
  },
  momcozyFit: {
    url: 'https://momcozy.com/pages/size-guide-all',
    label: 'Momcozy: Messhilfe und Größentabelle (Englisch)',
    context: 'Beide Seiten messen und Sitz kontrollieren; allgemeine Tabelle belegt nicht die Verfügbarkeit jeder Größe für die M9.',
  },
  momcozyClean: {
    url: 'https://support.momcozy.com/article/53211695912473',
    label: 'Momcozy: M9 reinigen und desinfizieren (Englisch)',
    context: 'M9-spezifische Handreinigung, zerlegte milchberührende Teile, Auskochen und getrennte Außenpflege; Spülmaschinensicherheit laut dieser Seite nicht bestätigt.',
  },
  momcozyDishwasher: {
    url: 'https://support.momcozy.com/article/62313088992281',
    label: 'Momcozy: Spülmaschinen-FAQ einschließlich M9 (Englisch)',
    context: 'Abweichende bedingte Freigabe für waschbare Teile: kein UV, unter 110 °C und 5–10 Minuten Desinfektionszeit. Widerspruch zur M9-Pflegeseite bleibt offen.',
  },
  momcozyAssembly: {
    url: 'https://support.momcozy.com/article/48283958148633',
    label: 'Momcozy: M9 zerlegen und zusammenbauen (Englisch)',
    context: 'Nach jeder Nutzung zerlegen; Motor, Ladekabel und Netzteil niemals in Wasser oder Spülmaschine. Vor Montage abkühlen lassen.',
  },
  momcozyM9: {
    url: 'https://support.momcozy.com/article/52733617426201',
    label: 'Momcozy: M9 (BP223) – Größen und Komponenten (Englisch)',
    context: '24-mm-Standardflansch, Einsätze 17/19/21 mm im beschriebenen Paket; waschbare Komponenten getrennt vom Motor.',
  },
};

export const FOUNDATION_GUIDES: Partial<Record<string, FoundationGuide>> = {
  'milchpumpe-reinigen': {
    title: 'Milchpumpe hygienisch reinigen',
    lead: 'Zerlege und reinige die milchberührenden Teile nach jeder Nutzung nach ihrer Anleitung. Motor, Ladeteile und Schläuche gehören nicht automatisch ins Spülwasser. Eine zusätzliche Desinfektion folgt den Modellvorgaben; erst vollständig trocken wieder zusammensetzen oder geschützt lagern.',
    updated: '2026-10-29',
    sources: ['bzfe', 'medelaCups', 'philipsSupport', 'philipsManual', 'momcozyClean', 'momcozyDishwasher', 'momcozyAssembly', 'momcozyM9'].map(key => FOUNDATION_SOURCES[key]),
    pdfSlug: 'reinigung-teileroutine',
    noPurchase: 'Beginne mit deinen vorhandenen Teilen und ihrer Anleitung. Das kostenlose Arbeitsblatt hilft dir, Waschverfahren, zusätzliche Behandlung und den Status „benutzt / in Trocknung / einsatzbereit“ je Teil festzuhalten. Eine neue Pumpe oder ein Zusatzgerät ist dafür nicht Voraussetzung.',
    related: [
      { slug: 'milchpumpe-reinigen-ohne-spuelmaschine', title: 'Handspülen ohne Spülmaschine organisieren' },
      { slug: 'reserve-pumpset-reinigen-trocknen-organisieren', title: 'Reserve-Pumpset, Trocknung und Lagerung planen' },
      { slug: 'medela-freestyle-hands-free-drei-teile-reinigung', title: 'Die Medela-Cups und ihre drei Reinigungsteile' },
      { slug: 'richtige-flanschgroesse', title: 'Passform und Teilezuordnung prüfen' },
    ],
    faqs: [
      { question: 'Muss ich nach jeder Nutzung reinigen?', answer: 'Ja: Die benutzten milchberührenden Teile nach jeder Nutzung nach Modellanleitung zerlegen und reinigen. Das gilt nicht als Waschfreigabe für Motor, Kabel oder Luftschläuche. Eine zusätzliche Desinfektion ist gesondert nach Anleitung einzuplanen.', sourceKeys: ['medelaCups', 'philipsManual', 'momcozyAssembly'] },
      { question: 'Darf die gesamte Milchpumpe in die Spülmaschine?', answer: 'Nein. Eine Spülmaschinenfreigabe betrifft nur die ausdrücklich genannten Waschkomponenten. Bei Philips SCF547 gehören etwa Motor und Schlauch nicht dazu. Für die Momcozy M9 stehen eine Handwäsche-Anweisung und eine bedingte Spülmaschinen-FAQ nebeneinander; die eigene Anleitung und die Abweichung mit dem Support klären.', sourceKeys: ['philipsManual', 'momcozyClean', 'momcozyDishwasher'] },
      { question: 'Soll ich einen Schlauch mit Milch oder Feuchtigkeit ausspülen?', answer: 'Nicht als allgemeine Lösung. Die hier verlinkte Medela-Cup-Anleitung verbietet Reinigen und Ausspülen des Schlauchs und verlangt bei Kondenswasser, Milch oder Schimmel, die Nutzung zu beenden und den Schlauch zu ersetzen. Für andere Systeme deren konkrete Fehlerhilfe verwenden.', sourceKeys: ['medelaCups'] },
      { question: 'Sind Reinigen, Desinfizieren und Sterilisieren dasselbe?', answer: 'Nein. Waschen entfernt Rückstände; eine zusätzliche Behandlung reduziert Keime auf zuvor gereinigten Teilen. Herstellerbegriffe und freigegebene Verfahren unterscheiden sich. Eine häusliche Dampf- oder Kochbehandlung ist hier keine Zusage klinischer Sterilität und ersetzt nicht das Waschen.', sourceKeys: ['medelaCups', 'philipsManual'] },
      { question: 'Kann ich noch feuchte Teile schon zusammensetzen und wegpacken?', answer: 'Erst vollständig trocknen lassen und anschließend sauber und geschützt aufbewahren. Medela warnt ausdrücklich davor, feuchte Teile luftdicht einzuschließen. Plane die Trocknung als eigenen Zustand ein, nicht als bereits erledigten Pflegeschritt.', sourceKeys: ['medelaCups', 'momcozyClean'] },
    ],
    sections: [
      {
        title: '1. Teile sortieren: Was darf ins Wasser?',
        paragraphs: [
          'Suche zuerst die genaue Modell- und Cup-Anleitung. „Geschlossenes System“ bedeutet nicht, dass alle Bauteile zusammen gespült werden dürfen. Trenne Milchweg und Brustkontakt von Elektronik, Ladeteilen und Luftschläuchen, bevor du etwas einweichst.',
          'Die folgende Sortierung ist ein Startpunkt für deine eigene Teileliste. Ob beispielsweise eine Frontkappe gewaschen oder nur abgewischt wird, entscheidet die konkrete Anleitung – nicht ihr Abstand zur Milch.',
        ],
        table: {
          caption: 'Pumpenteile vor der Pflege zuordnen',
          headings: ['Teilegruppe', 'Prüfschritt für dein System', 'Nicht verwechseln'],
          rows: [
            { cells: ['Milchkontakt und Brustkontakt', 'Haube/Flansch, benutzten Einsatz, Becher, Membran und Ventil anhand der Anleitung zuordnen und wie vorgesehen zerlegen. Auch Schutzteile können einen eigenen Pflegeweg haben.', 'Ein montierter Becher ist nicht fertig zerlegt. Philips nennt zum Beispiel auch den Brusthaubenschutz als Wasch- und Desinfektionsteil.'], sourceKeys: ['philipsManual', 'momcozyAssembly'] },
            { cells: ['Motor, Elektronik und Ladeteile', 'Vom waschbaren Set trennen. Nur die Außenpflege anwenden, die der Hersteller für dieses Gehäuse vorgibt.', 'Nicht eintauchen, unter fließendem Wasser spülen, auskochen oder in die Spülmaschine legen. Eine Cup-Freigabe gilt nicht für den Motor.'], sourceKeys: ['philipsManual', 'momcozyAssembly'] },
            { cells: ['Schläuche im Luftweg', 'Bei Medela Hands-free nicht innen reinigen oder ausspülen; die verlinkte Anleitung verlangt bei Kondenswasser, Milch oder Schimmel den Nutzungsstopp und Schlauchersatz. Philips verlangt trockene Silikonschläuche und beschreibt Außenabwischen nach Bedarf.', 'Nicht vorbeugend Spülwasser hindurchlaufen lassen. Die M9 ist ein All-in-one-System; eine Schlauchroutine anderer Pumpen gehört nicht automatisch dazu.'], sourceKeys: ['medelaCups', 'philipsManual', 'momcozyM9'] },
          ],
        },
        sourceKeys: [],
      },
      {
        title: '2. Nach der Nutzung: ein klarer Handspül-Ablauf',
        paragraphs: [
          'Lege eine saubere Schüssel, Wasser in Trinkwasserqualität, ein nach Anleitung geeignetes mildes Spülmittel und eine saubere Ablage bereit. Wasche vor dem Anfassen der Teile die Hände. Eine eigene Schüssel für Säuglingsernährungszubehör hält die Teile vom benutzten Küchenspülbecken getrennt.',
          'Halte Wassertemperatur, Einweichzeit und erlaubte Bürstenanwendung aus deiner Anleitung ein. Nicht jedes kleine Silikonteil darf geschrubbt werden: Philips empfiehlt beim Ventil vorsichtiges Reiben mit den Fingern in warmem Spülwasser und warnt davor, Gegenstände hineinzuführen.',
        ],
        bullets: [
          'Motor und Ladeteile abnehmen; Cup oder Flasche nach Anleitung entleeren und die vorgesehenen Waschkomponenten vollständig zerlegen.',
          'Milchreste abspülen. Teile mit Spülmittel nach Modellvorgabe waschen; kleine Öffnungen und Ventile ohne gewaltsames Dehnen behandeln.',
          'Mit Wasser in Trinkwasserqualität gründlich nachspülen. Sichtbare Rückstände bedeuten: noch einmal reinigen, nicht nur zusätzliche Hitze anwenden.',
          'Die gegebenenfalls vorgeschriebene Desinfektion als eigenen Schritt einplanen. Anschließend vollständig an der Luft trocknen lassen.',
          'Schüssel und Reinigungswerkzeug ebenfalls sauber halten und trocknen lassen; saubere Teile nicht wieder auf die benutzte Ablage legen.',
        ],
        sourceKeys: ['bzfe', 'medelaCups', 'philipsManual', 'momcozyClean'],
      },
      {
        title: '3. Reinigen und Desinfizieren sind zwei Schritte',
        paragraphs: [
          'Reinigung entfernt Milchreste und andere Verunreinigungen von den Oberflächen. Sanitizing bezeichnet in der englischen Medela-Anleitung die zusätzliche Verringerung von Keimen auf bereits gewaschenen Teilen. Auskochen oder eine zugelassene Dampfbehandlung ersetzen das Waschen nicht.',
          'Hersteller verwenden auch Wörter wie „sterilisieren“. Eine häusliche Behandlung ist hier keine Zusage klinischer Sterilität. Entscheidend sind die freigegebenen Teile, das Verfahren, die Dauer und die Häufigkeit in der zugehörigen Anleitung – keine allgemeine Regel für alle Milchpumpen.',
          'Das BZfE beschreibt eine allgemeine Reinigungsroutine mit Spülmittel und heißem Wasser und hält eine heißere Reinigung in diesem Kontext nicht für nötig. Konkrete Herstelleranleitungen können darüber hinausgehen: Bei der SCF547-Familie verlangt Philips Desinfektion vor dem ersten und nach jedem Gebrauch. Übertrage deshalb weder den allgemeinen Hinweis noch den Tagesrhythmus eines anderen Modells ungeprüft.',
          'Bei Frühgeburt, Erkrankung oder besonderen Versorgungsvorgaben den Pflegeablauf mit dem betreuenden Fachteam abstimmen. Dieser Artikel legt dafür weder eine individuelle Häufigkeit noch eine medizinische Behandlung fest.',
        ],
        sourceKeys: ['bzfe', 'medelaCups', 'philipsManual'],
      },
      {
        title: '4. Modellvergleich: Nicht jede Freigabe gilt überall',
        paragraphs: [
          'Die Beispiele zeigen, warum ein universeller Fünf-Minuten-Plan nicht reicht. Prüfe die Anleitung deines tatsächlich vorhandenen Sets, bevor du die Zahlen oder Verfahren übernimmst.',
        ],
        table: {
          caption: 'Dokumentierte Pflegeunterschiede für drei Pumpensysteme',
          headings: ['System und Dokument', 'Wasch- und Zusatzpflege', 'Ausnahme oder offene Frage'],
          rows: [
            { cells: ['Medela Hands-free Collection Cups – verlinkte EN/FR/ES-Anleitung', 'Haube, Außenschale und gelbe Membran nach jeder Nutzung waschen. Die Fassung nennt Desinfektion vor dem ersten Gebrauch und einmal täglich nach Nutzung; Auskochen mindestens 10 Minuten. Für die Spülmaschine: oberer Korb/Kleinteilefach, maximal einmal täglich.', 'Schläuche ausgenommen. Bei regulärer Reinigung bleibt der O-Ring laut dieser Fassung auf der Haube. Andere Set- oder Regionalfassungen nicht mit dieser Anleitung gleichsetzen.'], sourceKeys: ['medelaCups'] },
            { cells: ['Philips Avent SCF547/11 – deutsche Anleitung', 'Membran, Becher, Ventil, Brusthaube, benutzten Einsatz und Brusthaubenschutz vor dem ersten und nach jedem Gebrauch reinigen und desinfizieren. Handwäsche oder oberer Spülmaschinenkorb; das Auskochverfahren nennt 5 Minuten, ohne Kontakt zu Topfboden und -seiten.', 'Frontkappe, Schlauch und Motoreinheit gehören laut Anleitung zur Außenpflege nach Bedarf. Für freigegebene Dampf-/Mikrowellenverfahren zusätzlich die Geräteanleitung beachten. Nicht den gesamten Cup samt Luftschlauch behandeln.'], sourceKeys: ['philipsSupport', 'philipsManual'] },
            { cells: ['Momcozy M9 (BP223) – Support', 'Die M9-Pflegeseite beschreibt Handwäsche der waschbaren Teile und anschließendes Auskochen für 5–10 Minuten, ohne Kontakt zu den Topfseiten. UV-Behandlung wird ausgeschlossen. Vor Montage abkühlen und vollständig trocknen lassen.', 'Die Supportangaben sind zur Spülmaschine widersprüchlich: Die M9-Seite nennt deren Sicherheit nicht bestätigt; eine weitere FAQ erlaubt waschbare Teile nur ohne UV, unter 110 °C und bei 5–10 Minuten Desinfektionszeit. Daraus folgt keine pauschale Spülmaschinenfreigabe.'], sourceKeys: ['momcozyClean', 'momcozyDishwasher', 'momcozyAssembly'] },
          ],
        },
        sourceKeys: [],
      },
      {
        title: '5. Trocken, vollständig und wieder einsatzbereit?',
        paragraphs: [
          'Lege die gereinigten beziehungsweise zusätzlich behandelten Teile auf eine saubere, unbenutzte Unterlage oder das freigegebene Abtropfgestell. Lass sie vollständig trocknen; nicht mit einem benutzten Küchentuch trockenreiben und feuchte Teile nicht luftdicht wegpacken.',
          'Prüfe vor dem Zusammenbau den Zustand und den korrekten Sitz von Ventilen, Membranen und Dichtungen. Nicht jedes Teil muss zum Reinigen gleich weit zerlegt werden: Die verlinkte Medela-Fassung belässt den O-Ring bei der Routine auf der Haube. Vollständig zerlegen heißt deshalb nach Anleitung, nicht möglichst viel auseinanderziehen.',
          'Für die M9 lässt sich der Spülmaschinenwiderspruch mit einer präzisen Anfrage klären: „Ich nutze M9/BP223 mit dieser Anleitung. Gilt für meine Teile die Handwäsche-Seite oder die bedingte Spülmaschinen-FAQ, und welches konkrete Programm ist freigegeben?“ Bis zur Klärung die beschriebene Handwäsche nutzen, statt eine der Angaben als uneingeschränkte Zusage zu lesen.',
          'Du brauchst für einen klaren Ablauf nicht automatisch einen Sterilisator oder ein zweites Pumpset. Ordne zuerst deine vorhandenen Teile und die erlaubten Verfahren. Falls beim nächsten Einsatz noch Teile trocknen, ist das ein Planungsproblem – kein Grund, sie vorschnell als einsatzbereit zu markieren.',
        ],
        bullets: [
          'Pflege erledigt: jedes benutzte Kontaktteil nach seinem dokumentierten Verfahren behandelt?',
          'Trocknung erledigt: auch Vertiefungen und Verbindungen vollständig trocken?',
          'Zustand geprüft: keine erkennbaren Schäden oder ungeklärten Rückstände?',
          'Montage geklärt: alle vorgesehenen Teile vollständig und richtig eingesetzt?',
          'Lagerung geklärt: saubere, trockene Teile bis zur Nutzung geschützt aufbewahrt?',
        ],
        sourceKeys: ['medelaCups', 'philipsManual', 'momcozyClean', 'momcozyDishwasher'],
      },
    ],
  },
  'richtige-flanschgroesse': {
    title: 'Flanschgröße richtig einordnen',
    lead: 'Miss beide Brustwarzen nach der Anleitung deines konkreten Systems und ordne die Werte mit dessen Größenhilfe zu. Entscheidend ist auch der angenehme Sitz beim Pumpen: Eine Millimeterangabe allein bestimmt nicht die passende Brusthaube.',
    updated: '2026-10-29',
    sources: ['bzfe', 'medelaCups', 'medelaFit', 'philipsSupport', 'philipsManual', 'philipsFit', 'momcozyFit', 'momcozyM9'].map(key => FOUNDATION_SOURCES[key]),
    pdfSlug: 'passform-beratungsvorbereitung',
    noPurchase: 'Sammle zuerst die Bezeichnungen deiner vorhandenen Aufsätze und deine bereits beobachteten Fragen. Das Vorbereitungsblatt bündelt Modellangaben, freiwillige Notizen und Gesprächsagenda. Es berechnet keine Größe und setzt weder einen Zubehörkauf noch einen weiteren Pumpversuch voraus.',
    related: [
      { slug: 'philips-avent-scf547-einsaetze-15-17-mm', title: 'Philips SCF547: Einsätze mit 15 und 17 mm zuordnen' },
      { slug: 'milchpumpe-zubehoer-checkliste', title: 'Zubehör prüfen, bevor du etwas ergänzt' },
      { slug: 'milchpumpe-ersatzteile-ventile-membranen', title: 'Ventile und Membranen dem richtigen Modell zuordnen' },
      { slug: 'milchpumpe-reinigen', title: 'Hauben und Einsätze modellgerecht reinigen' },
    ],
    faqs: [
      { question: 'Wie finde ich meine Flanschgröße?', answer: 'Modell und Aufsatzsystem klären, beide Brustwarzen nach der zugehörigen Herstellerhilfe messen und mit deren Hauben-/Einsatztabelle zuordnen. Anschließend den Sitz nach Anleitung kontrollieren. Die aufgedruckte Millimeterzahl allein und ein allgemeiner Zuschlag liefern keine individuelle Passformbestimmung.', sourceKeys: ['medelaFit', 'philipsManual', 'momcozyFit'] },
      { question: 'Brauche ich links und rechts dieselbe Größe?', answer: 'Nicht unbedingt. Philips und Momcozy weisen darauf hin, dass beide Seiten unterschiedlich sein können. Werte und zugeordnete Teile deshalb für links und rechts getrennt notieren, statt nur eine gemeinsame Größe zu übernehmen.', sourceKeys: ['philipsManual', 'momcozyFit'] },
      { question: 'Passt ein 19-mm-Einsatz in jede Brusthaube?', answer: 'Nein. Der Millimeterwert belegt keine mechanische Kompatibilität. Bei Philips ist die Hauben-/Einsatzkombination in der Größenhilfe beschrieben; Momcozy führt für die M9 eigene Teilangaben. Prüfe Modell, System und Herstellerzuordnung, bevor du ein fremdes Teil einsetzt.', sourceKeys: ['philipsFit', 'momcozyM9'] },
      { question: 'Ist bei Schmerzen einfach eine andere Größe nötig?', answer: 'Schmerzen lassen sich hier nicht aus der Ferne einer Größe zuordnen. Anwendung beenden und Sitz, Montage sowie Einstellung mit passender Unterstützung prüfen. Bei anhaltenden Beschwerden oder Verletzungen fachliche Abklärung suchen; nicht weiterpumpen, um einen Größenvergleich zu erzwingen.', sourceKeys: ['philipsManual', 'bzfe'] },
      { question: 'Muss ich sofort neue Hauben kaufen?', answer: 'Nein. Prüfe zuerst, was zu deinem vorhandenen Set gehört, ob es richtig montiert und zugeordnet ist und welche Fragen offen sind. Eine Beratung oder eine genaue Supportanfrage kann vor einer Bestellung sinnvoller sein als mehrere Größen auf Verdacht zu kaufen.', sourceKeys: ['bzfe', 'philipsSupport'] },
    ],
    sections: [
      {
        title: '1. Erst das System klären, dann messen',
        paragraphs: [
          'Flansch, Brusttrichter und Brusthaube bezeichnen den Aufsatz an der Brust. Seine Größenangabe bezieht sich auf den Brustwarzentunnel, nicht auf die Breite der ganzen Brust. Ein Einsatz verkleinert den vorgesehenen Tunnel; er ist kein automatisch passendes Zubehör für jede Haube.',
          'Lege Modellbezeichnung, Anleitung und vorhandene Aufsätze nebeneinander. Notiere bei einem Cup-System auch dessen Namen und bei einem Einsatz die zugehörige Haube. Eine gleiche Zahl auf zwei Teilen verschiedener Marken belegt keine Kompatibilität.',
          'Es gibt hier keine universelle Millimeterformel: Die Hersteller ordnen Messwerte unterschiedlichen Hauben und Einsätzen zu. Verwende deshalb die Messweise und Größenzuordnung deines Modells zusammen, statt einen Zuschlag aus einer anderen Tabelle zu übernehmen.',
        ],
        bullets: [
          'Beide Seiten getrennt erfassen: Links und rechts können verschiedene Größen benötigen.',
          'Brustwarze statt Warzenhof messen. Bei Medela beschreibt die Messhilfe den Durchmesser an der Basis, ohne Warzenhof; Philips führt durch die Größenkarte seines Systems.',
          'Messwert und gewähltes Teil getrennt notieren: „gemessen“ ist nicht dasselbe wie die aufgedruckte Hauben- oder Einsatzgröße.',
          'Nutze eine vorhandene Größenkarte nach ihrer Anleitung. Eine Bildschirmdarstellung ist kein maßstabsgetreues Lineal.',
        ],
        sourceKeys: ['medelaFit', 'philipsManual', 'momcozyFit'],
      },
      {
        title: '2. Drei Herstellerwege im Vergleich',
        paragraphs: [
          'Die Tabelle hilft dir, die richtige Anleitung aufzuschlagen. Sie ist bewusst keine gemeinsame Umrechnungstabelle: Schon die Kombination aus Haube und Einsatz unterscheidet sich zwischen den Systemen.',
        ],
        table: {
          caption: 'Messhilfe und Teilezuordnung für drei konkrete Systeme',
          headings: ['System', 'So gehst du zur Größenwahl vor', 'Vor einer Ergänzung prüfen'],
          rows: [
            { cells: ['Medela Hands-free Collection Cups', 'Brustwarzendurchmesser mit der Medela-Messhilfe erfassen; Kapitel 7.1 der Cup-Anleitung zur Haubenwahl und anschließend die Zentrierung im Tunnel beachten.', 'Die verlinkte Cup-Anleitung beschreibt Hauben mit 21, 24 und 27 mm sowie einen O-Ring. Prüfe, ob genau diese Ausführung deinem Set entspricht. Nicht ungeprüft auf andere Medela-Cups übertragen.'], sourceKeys: ['medelaCups', 'medelaFit'] },
            { cells: ['Philips Avent SCF547/11 Hands-free', 'Auf der SCF547/11-Supportseite das Messvideo und die verlinkte Größenhilfe öffnen. Die Anleitung führt durch die mitgelieferte Brustwarzenkarte und die Kombination aus Brusthaube und gegebenenfalls Einsatz.', 'Die Anleitung beschreibt 21-/24-mm-Hauben und einen 19-mm-Einsatz. Region und Set abgleichen. Die neuere Natural-Care-Wearable-Tabelle mit 27-mm-Basishaube gehört nicht automatisch zur SCF547.'], sourceKeys: ['philipsSupport', 'philipsManual', 'philipsFit'] },
            { cells: ['Momcozy M9 (BP223)', 'Mit der Momcozy-Messhilfe beide Seiten messen und die Herstellertabelle als Ausgangspunkt nutzen. Die M9-Spezifikation danebenlegen, um die verfügbaren Teile zuzuordnen.', 'Momcozy nennt für das beschriebene M9-Paket einen 24-mm-Flansch und Einsätze mit 17, 19 und 21 mm. Die allgemeine Messhilfe enthält weitere Größen: daraus folgt keine M9-Kompatibilität für jedes Teil.'], sourceKeys: ['momcozyFit', 'momcozyM9'] },
          ],
        },
        sourceKeys: [],
      },
      {
        title: '3. Sitz beobachten, Beschwerden nicht wegpumpen',
        paragraphs: [
          'Richte die Brustwarze mittig im vorgesehenen Tunnel aus und halte dich beim Anlegen und Einstellen an die Modellanleitung. Prüfe nicht nur das Teil auf dem Tisch, sondern auch den Sitz im BH: Ein verschobener Cup ist kein verlässlicher Größentest.',
          'Die Medela- und Momcozy-Hilfen beschreiben eine freie beziehungsweise angenehme Bewegung im Tunnel. Starke Reibung, Einklemmen oder ein unangenehmer Zug sind keine Aufforderung, die Saugstufe zu erhöhen. Bei Schmerzen die Anwendung beenden; anhaltende Beschwerden oder Verletzungen fachlich abklären lassen.',
          'Nicht allein aus der Milchmenge auf die Flanschgröße schließen. Die Philips-Fehlerhilfe nennt neben der Größe auch Zentrierung, Montage, Ventil und Membran. Eine geringe Menge beweist deshalb weder einen zu kleinen noch einen zu großen Aufsatz.',
        ],
        bullets: [
          'Vor dem Anlegen: richtige Haube und zugeordneter Einsatz, sauber, trocken und unbeschädigt?',
          'Beim Anlegen: Brustwarze mittig, Cup nach Anleitung zusammengesetzt und ohne störenden BH-Druck?',
          'Bei Unbehagen: Anwendung beenden, verwendete Seite und vorhandenes Teil notieren, statt Beschwerden für einen weiteren Größenvergleich erneut auszulösen.',
        ],
        sourceKeys: ['medelaCups', 'momcozyFit', 'philipsManual'],
      },
      {
        title: '4. Mit einer konkreten Frage zur Beratung',
        paragraphs: [
          'Nimm Modellname, vorhandene Hauben und Einsätze sowie die passende Anleitung zur Hebamme oder qualifizierten Stillberatung mit. Das BZfE nennt diese Unterstützung ausdrücklich für die Auswahl des Trichteraufsatzes und die Pumpenanwendung.',
          'Eine hilfreiche Frage lautet: „Ich nutze dieses Modell mit diesem Aufsatz; auf dieser Seite ist mir Folgendes aufgefallen. Können wir Sitz und Anwendung gemeinsam prüfen?“ Notiere nur bereits Beobachtetes. Du musst schmerzhaftes Pumpen nicht wiederholen, um einen Termin vorzubereiten.',
          'Wenn es um die technische Teilezuordnung geht, frage den Herstellersupport mit Modell, Generation und genauer Artikelnummer. Eine passende Lösung kann auch sein, vorhandene Teile korrekt einzusetzen oder zunächst nichts zu kaufen.',
        ],
        sourceKeys: ['bzfe', 'philipsSupport', 'momcozyM9'],
      },
    ],
  },
};
