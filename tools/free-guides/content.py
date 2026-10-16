"""German editorial source and all twenty usable page layouts; no network or account integration."""
FREE='Kostenlos ohne E-Mail; Newsletter optional. In einer lokalen PDF-Kopie ausfüllen und speichern. Persönliche Notizen werden nicht zurückgesendet.'
LIMIT='Für das gesunde eigene Kind. Bei Frühgeburt, Erkrankung oder individuellen Fachvorgaben den Ablauf gesondert fachlich abstimmen. [3]'

def unterwegs(G):
    g=G('unterwegs-packplan','Dein Unterwegs-Packplan fürs Abpumpen','Unterwegs-Packplan')
    y=g.start('Ein Termin, ein Weg', 'Plane einen konkreten Ausflug: von der Abfahrt bis zur Rückkehr. Die Uhrzeiten hier beschreiben deinen Weg, keinen Pumpplan.')
    y=g.text(FREE,42,y,size=10.5,leading=15)+14
    y=g.field('Anlass / Datum / Ziel',y,tip='Einen konkreten Termin und das Ziel notieren; keine Pumpintervalle vorgeben.')
    y=g.row(['Abfahrt / geplante Rückkehr','Stationen auf dem Hin- und Rückweg'],y)
    y=g.row(['Kontakt am Ziel / Erreichbarkeit','Ruhiger Platz / Zugang'],y)
    y=g.section('VOR ORT: JE ZEILE NUR EINEN STATUS WÄHLEN',y)
    for task in ['Händewaschen','Saubere Ablage','Strom, falls benötigt','Kühlmöglichkeit']:
        g.text(task,42,y,180,11,15,'MS'); end=max(g.check(s,y,228+i*109,103,size=10) for i,s in enumerate(['geklärt','offen','nicht nötig']));y=end+3
    y=g.field('Vorher nachfragen bei … / welche Frage?',y,h=49,tip='Kontakt und offene Ortsfrage festhalten. Ohne geklärte Kühlung keinen Sicherheitsstatus annehmen.')
    g.note('Ein ungeklärter Ort ist eine Organisationsfrage, keine Pflicht zum Zubehörkauf. Kühlung und Pflegeweg vor der Abfahrt klären. [1][2]',y)
    g.end()

    y=g.start('Was gehört in meine Tasche?', 'Die Liste ist kein Einkaufszettel. Kreuze unabhängig an: Was ist da, was muss mit, was fehlt und was ist noch ungeklärt?')
    for task in ['Vollständiges Pumpset nach eigener Anleitung','Geeignete Milchbehälter / Beschriftung','Energieversorgung nach Modellanleitung','Sauberer Aufbewahrungsplatz für trockene Teile','Getrennte Organisation benutzter Teile','Kühlmöglichkeit für genau diesen Weg [1]']:
        y=g.text(task,42,y,size=11.5,leading=16,font='MS')+6
        y=g.options(['vorhanden','mitnehmen','fehlt','klären'],y)+8
    y=g.section('MEINE ERGÄNZUNGEN',y)
    y=g.row(['Eigene Ergänzung 1 / Status','Eigene Ergänzung 2 / Status'],y,h=44)
    y=g.field('Reserve – nur falls für diesen Ablauf nötig und passend',y)
    g.note('Benutzte Teile brauchen einen eingeplanten Pflegeweg. BZfE nennt Reinigung nach jedem Gebrauch; welche Komponenten wie behandelt werden, zusätzlich in der eigenen Anleitung prüfen. [2]',y)
    g.end()

    y=g.start('Wo bleibt die Milch?', 'Dokumentiere eine Portion oder einen Behälter. Für weitere Behälter diese Seite lokal kopieren. Ein Eintrag ist keine Freigabe der Verwendbarkeit.')
    y=g.note('Nach dem Abpumpen sofort kühlen; den Transport mit durchgehender Kühlung organisieren. Keine pauschale Stundenzahl für jede Kühltasche. [1]',y)
    y=g.row(['Gewinnungsdatum / Uhrzeit','Behälterkennung / Zuordnung'],y)
    y=g.row(['Zeitpunkt des Kühlens','Kühlplatz am Start'],y)
    y=g.field('Transportbehälter / Kühlelemente / passende Anleitung',y)
    y=g.row(['Abfahrt / gekühlter Transport organisiert','Ankunft / Kühlplatz am Ziel'],y)
    y=g.row(['Übergabeperson / vereinbarter Kontakt','Kennzeichnung am Behälter geprüft'],y)
    y=g.field('Offene Kühlfrage / wen frage ich vor der Verwendung?',y,h=49,tip='Unbekannte Bedingungen beschreiben und fachliche Rückfrage notieren. Keine automatische Haltbarkeitsberechnung.')
    y=g.note('Eine spätere Kühlung macht eine unbekannte Warmphase nicht automatisch unbedenklich. Bei unklaren Bedingungen fachlich rückfragen; dieser Plan entscheidet nicht über die Verwendung.',y)
    g.text(LIMIT,42,y,size=10.5,leading=15)
    g.end()

    y=g.start('Vor der Tür. Wieder zu Hause.', 'Nutze die beiden Listen für denselben Ausflug. Ein Häkchen bedeutet „selbst geprüft“, nicht eine medizinische oder technische Freigabe.')
    y=g.section('VOR DER ABFAHRT',y)
    for text in ['Vollständigkeit nach eigener Anleitung geprüft','Akkustand / Versorgung nach Geräteanzeige geprüft','Benötigte Behälter und Kühlweg organisiert','Zielkontakt und Zugang geklärt']:y=g.check(text,y)
    y=g.section('NACH DER RÜCKKEHR',y+3)
    for text in ['Benutzte Teile in den vorgesehenen Pflegeablauf gegeben','Trockene Reserve / Zustand geprüft']:y=g.check(text,y)
    y=g.row(['Das hat organisatorisch gefehlt','Das kann nächstes Mal zu Hause bleiben'],y,h=49)
    y=g.field('Bei fehlender Kühlung / defektem Teil: Kontakt und Alternative',y,h=44,tip='Eine erreichbare Person und einen anderen organisatorischen Ablauf notieren; keine Ersatz-Hygieneregel erfinden.')
    y=g.text('Keinen ungeklärten Ablauf mit einer erfundenen Ersatzregel überbrücken. Aktuelle Fachhinweise und die konkrete Modellanleitung bleiben maßgeblich.',42,y,size=10.5,leading=15)+12
    g.sources([1,2,3],y)
    g.end();return g.save()

def arbeit(G):
    g=G('arbeitsplatz-uebergabeplan','Dein Arbeitsplatz- und Übergabeplan','Arbeitsplatz & Übergabe')
    y=g.start('Das Gespräch vor dem Start', 'Halte betriebliche Absprachen fest, nicht persönliche Gesundheitsdetails. Beschäftigungsstatus und zuständige Ansprechstelle selbst prüfen.')
    y=g.text(FREE,42,y,size=10.5,leading=15)+12
    y=g.note('Deutschland: Nach § 7 Abs. 2 MuSchG auf Verlangen in den ersten zwölf Monaten nach der Entbindung Freistellung für die erforderliche Stillzeit, mindestens zweimal täglich 30 Minuten oder einmal 60 Minuten. Das Familienportal nennt ausdrücklich auch Abpumpen. Gesetzliche Mindestfreistellung ist keine medizinische Pumpfrequenz. [4][6]',y,size=10.8)
    y=g.row(['Beschäftigung / Zuständigkeit geprüft bei','Arbeitgeber / Personalstelle: Kontakt'],y)
    y=g.row(['Gewünschter Start / Gesprächsdatum','Geeigneter Ort / Zugang'],y)
    y=g.field('Vereinbarte Freistellung / noch zu klärende Voraussetzung',y,tip='Eine konkrete betriebliche Absprache notieren; keinen universellen Pumpzeitplan aus dem Gesetz ableiten.')
    y=g.row(['Vertretung / Unterbrechung organisieren','Persönliche Angaben: wer braucht was?'],y)
    y=g.options(['angesprochen','vereinbart','Rückfrage'],y)
    g.text('Keine Rechtsberatung und kein Anspruchsrechner. Besondere Beschäftigungsformen und die gesetzliche Sonderregel bei längerer Arbeitszeit im Volltext bzw. mit zuständiger Stelle klären. [4]',42,y,size=10.5,leading=15)
    g.end()

    y=g.start('Kühlplatz heißt auch Zugang', 'Gehe den wiederkehrenden Arbeitstag durch: Wer kommt wann an welchen Platz – auch dann, wenn deine übliche Kontaktperson fehlt?')
    y=g.note('Milch nach dem Abpumpen sofort kühlen; die Kühlschranktür ist ungeeignet. Die Stillkommission beschreibt für den Personalkühlschrank separat und aufrecht stehende Flaschen in einer Kunststoffbox – keinen individuellen Anspruch auf einen eigenen Kühlschrank. [1][3]',y,size=11)
    y=g.field('Unmittelbarer Kühlplatz nach dem Abpumpen',y)
    y=g.row(['Sauberer separater Boxplatz','Temperaturbedingungen: wie / wer prüft?'],y)
    y=g.row(['Zugang während der Schicht','Zugang nach Feierabend'],y)
    y=g.row(['Vertretung: Zugang / erreichbare Person','Bei Ausfall: alternative Ansprechstelle'],y)
    y=g.field('Was wurde zum Transport bis zum Ziel konkret vereinbart?',y,h=49)
    y=g.field('Offene Zugangsfrage / Rückmeldung bis',y)
    g.text(LIMIT+' Bei Ausfall nicht aus einer gefühlten Temperatur auf Verwendbarkeit schließen.',42,y,size=10.5,leading=15)
    g.end()

    y=g.start('Vom Arbeitsplatz zur Übergabe', 'Eine Karte pro Portion oder Behälter. Bei Bedarf diese Seite lokal kopieren; mit Betreuungseinrichtungen deren Annahmebedingungen vorab absprechen.')
    y=g.row(['Behälterkennung / Zuordnung','Gewinnungsdatum / Uhrzeit'],y)
    y=g.section('DOKUMENTIERTER ZUSTAND: EINEN STATUS WÄHLEN',y)
    y=g.options(['frisch gekühlt','gefroren','aufgetaut','unklar'],y)
    y=g.row(['Gekühlte Abfahrt / Uhrzeit','Ankunft / Uhrzeit'],y)
    y=g.field('Transportbehälter / Kühlelemente nach deren Anleitung',y)
    y=g.row(['Zielkontakt / Übergabeperson','Vereinbarter Kühlplatz am Ziel'],y)
    y=g.options(['Betreuung: Angaben besprochen','noch rückfragen','nicht zutreffend'],y)
    y=g.field('Bei unklarer Zuordnung: Rückfrage an / Kontaktweg',y)
    y=g.field('Übergabe abgesprochen am / offene Bedingung',y,h=49)
    y=g.note('Durchgehende Kühlung organisieren. [1] Diese Karte berechnet keine Verwendbarkeitsfrist und begründet kein Annahmerecht bei einer Betreuungseinrichtung. „Unklar“ bleibt eine Rückfrage, keine Freigabe.',y)
    g.text('Die Einträge bleiben in deiner lokalen Kopie. Nur die für die konkrete Übergabe nötigen Angaben weitergeben.',42,y,size=10.5,leading=15)
    g.end()

    y=g.start('Den Arbeitstag gemeinsam prüfen', 'Ordne die Schritte zu. Trage jeweils Person, Zugang und offene Frage ein; prüfe die Vereinbarung erneut, wenn Schicht oder Zuständigkeit wechseln.')
    for task in ['Raum / Unterbrechung','Kühlplatz / Box','Transport / Abfahrt','Übergabe / Ziel']:
        y=g.field(task+' · wer / Zugang geklärt / offene Frage',y,tip='Verantwortliche Person, bestätigten Zugang und verbleibende Frage für diesen Schritt festhalten.')
    y=g.row(['Betrieblicher Rückruf: Kontakt / Frage','Fachliche Milchfrage: Kontakt / Frage'],y,h=44)
    y=g.note('§ 23 Abs. 1 MuSchG: Bei Freistellung nach § 7 kein Entgeltausfall; weder Vor- noch Nacharbeit; keine Anrechnung auf gesetzlich festgelegte Ruhepausen. [5] Die Sonderregel für mehr als acht Stunden zusammenhängende Arbeitszeit bitte vollständig in § 7 Abs. 2 lesen. Keine pauschalen 90 Minuten für alle. [4]',y,size=10.5)
    g.sources([4,5,6,1,3],y)
    g.end();return g.save()

def reinigung(G):
    g=G('reinigung-teileroutine','Deine Reinigungs- und Teileroutine','Reinigung & Teileroutine')
    y=g.start('Erst die richtige Anleitung', 'Übertrage nur die Pflegehinweise deines vorhandenen Systems. Unklare oder widersprüchliche Verfahren bleiben offen, bis sie geklärt sind.')
    y=g.text(FREE,42,y,size=10.5,leading=15)+12
    y=g.row(['Modell / Generation','Cup- oder Flaschensystem'],y)
    y=g.row(['Land / Sprachfassung','Dokumentkennung / Version'],y)
    y=g.field('Anleitungs-URL oder eigener Aufbewahrungsort',y,h=62,tip='Langen Link mehrzeilig oder den eigenen Datei-/Ordnernamen notieren; Modell und Version getrennt festhalten.')
    y=g.field('Relevante Kapitel / Seiten',y)
    y=g.section('WELCHE VORGABEN HABE ICH GEFUNDEN?',y)
    for text in ['Vor erster Nutzung','Nach jeder Nutzung','Zusätzliche Behandlung nach Anleitung','Gesonderte fachliche Vorgabe']:y=g.check(text,y,tip='Nur markieren, wenn diese Vorgabe für dein konkretes System gefunden wurde; Details auf Seite 2 eintragen.')
    y=g.field('Offene Abweichung / Klärung mit Hersteller oder Fachperson',y,h=49)
    g.note('Waschen, Desinfizieren und Sterilisieren sind nicht dasselbe. BZfE-Grundhygiene und komponentengenaue Herstellerhinweise getrennt lesen; keine Auskochdauer oder Spülmaschinentemperatur aus diesem Blatt ableiten. [2][12]',y,size=10.5)
    g.end()

    y=g.start('Jedes Teil hat seinen Pflegeweg', 'Zwei Detailzeilen für deine Komponenten; bei Bedarf lokal kopieren. Trage nur freigegebene Verfahren ein. „Unklar“ bedeutet: nicht selbst ergänzen.')
    for i in [1,2]:
        y=g.section(f'TEIL {i} · ANGABEN AUS DEINER ANLEITUNG',y)
        y=g.row([f'{i}: Teil / milchberührend ja–nein–unklar',f'{i}: Demontieren wie?'],y,h=24)
        y=g.row([f'{i}: Waschverfahren freigegeben?',f'{i}: Zusatzbehandlung: wann / wie?'],y,h=24)
        y=g.row([f'{i}: Trocknen / Lagern',f'{i}: Quelle / Kapitel / Seite'],y,h=24)
    y=g.section('GESONDERT PRÜFEN · KEINE AUTOMATISCHE WASSERFREIGABE',y)
    for part in ['Motor','Schlauch / Verbinder','Ladekomponenten']:
        y=g.field(part+' · Vorgabe / Quelle / noch offen',y,h=24,tip='Die genaue Vorgabe zur Reinigung, Prüfung oder zum Herstellerkontakt dokumentieren. Nicht automatisch als waschbar behandeln.')
    g.text('BZfE nennt Reinigen von Pumpset und Behältern nach Gebrauch. [2] Das ist keine pauschale Waschfreigabe für Motor, Schläuche oder Elektronik. Abweichende Schlauchhinweise nicht zwischen Fassungen übertragen. [12][13]',42,y,size=10.3,leading=14.5)
    g.end()

    y=g.start('Benutzt. In Trocknung. Bereit.', 'Statusblatt statt Pumpkalender. Trage eigene Teil- oder Setkennungen ein und aktualisiere den Zustand. Kein Pumpintervall und kein Wechselkalender.')
    for title,tip in [('BENUTZT','Welche Teile warten auf den Pflegeweg aus der eigenen Anleitung?'),('IN TROCKNUNG','Welche Teile sind noch nicht vollständig trocken oder müssen noch geprüft werden?'),('EINSATZBEREIT','Nur vollständig trockene, saubere, nach eigener Anleitung geprüfte Komponenten eintragen.')]:
        y=g.section(title,y)
        y=g.field(tip,y,h=62,tip=tip)
    y=g.row(['Zuletzt geprüft am / von','Noch zu erledigen / zuständig'],y,h=44)
    y=g.note('Die gelesene Medela-Cup-Anleitung verlangt saubere und trockene Teile vor dem Zusammenbau (Kap. 7). Sie ist EN/FR/ES mit US-/Kanada-Bezügen; das ist keine universelle Freigabe für jede Pumpe. Die passende Fassung deines Systems übertragen. [12]',y,size=11)
    g.text('Ein noch feuchtes, gespültes Teil hier nicht als einsatzbereit markieren. Bei besonderen medizinischen Situationen individuelle Vorgaben klären.',42,y,size=10.5,leading=15)
    g.end()

    y=g.start('Meine kurze Abschlusskontrolle', 'Stelle die persönliche Routine aus deiner Anleitung zusammen. Nicht zutreffende Punkte offenlassen; ein Häkchen ersetzt keine Verfahrensfreigabe.')
    for text in ['Vorgesehenes Waschverfahren durchgeführt','Erforderliche zusätzliche Behandlung laut Anleitung erledigt','Vollständig trocken','Zustand und Vollständigkeit geprüft','Sauber und geschützt gelagert']:y=g.check(text,y)
    y=g.field('Mein zusätzlicher Kontrollpunkt',y)
    y=g.check('Diesen eigenen Kontrollpunkt erledigt',y)
    y=g.row(['Nicht weiterbenutzen: Teil / Grund','Mit Hersteller oder Fachperson klären'],y,h=49)
    y=g.note('Beispiel, nicht Universalroutine: Die Medela-Cup-IFU trennt Waschen und zusätzliche Desinfektion. [12] Die Stillkommission sagt in ihrem Geltungsbereich „Eine Sterilisation ist nicht erforderlich“. [3] Daraus folgt nicht, eine verlangte Hersteller-Desinfektion wegzulassen. Bei Widerspruch konkret klären.',y,size=10.5)
    g.sources([2,3,12,13],y)
    g.end();return g.save()

def passform(G):
    g=G('passform-beratungsvorbereitung','Deine Vorbereitung für die Passform-Beratung','Passform-Beratung')
    y=g.start('Mein System für den Termin', 'Bringe Modellangaben, vorhandene Aufsätze und Fragen zusammen. Dieses Blatt berechnet keine Größe und ersetzt weder Beratung noch Diagnose.')
    y=g.text(FREE,42,y,size=10.5,leading=15)+13
    y=g.field('Genaue Pumpe / Generation / regionale Variante',y)
    y=g.field('Verwendetes Aufsatzsystem / Cup / Brusthaube',y)
    y=g.row(['Vorhandene Haube / Einsatz links','Vorhandene Haube / Einsatz rechts'],y,h=44)
    y=g.field('Weitere Aufsätze: genau aufgedruckte Bezeichnungen',y,h=44,tip='Aufgedruckte Angaben vorhandener Teile dokumentieren, nicht aus ihnen eine persönliche Empfehlung ableiten.')
    y=g.row(['Anleitung / Version / Fundort','Beratungsstelle / Termin'],y,h=44)
    y=g.note('Maßangaben beschreiben hier vorhandene Teile, keine empfohlene persönliche Größe. Gleiche Millimeter bedeuten nicht gleiche Kompatibilität. Elvie trennt z. B. die Einsätze für Stride 2 von anderen Teilefamilien; US-orientierte Quelle, keine deutsche Setfreigabe. [9]',y,size=11)
    g.text('Hebammen und qualifizierte Stillberatung unterstützen bei Auswahl und Anwendung. [2]',42,y,size=11,leading=16)
    g.end()

    y=g.start('Was mir aufgefallen ist', 'Freiwillige Notizen aus deiner Erinnerung. Nichts erneut ausprobieren, nur um Felder zu füllen. Du musst keine Beschwerden genauer dokumentieren, als du möchtest.')
    y=g.note('Bei Schmerzen oder unangenehmem Pumpen Anwendung beenden und passende Unterstützung holen – nicht für dieses Blatt weiter aushalten. Die Medela-Cup-IFU beschreibt Ausschalten und Abnehmen bei Schmerz/Unbehagen; das konkrete Vorgehen in der eigenen Anleitung beachten. [11][12]',y,size=11)
    y=g.row(['Wann bemerkt / Situation','Auf welcher Seite bemerkt?'],y)
    y=g.row(['Welches genaue Teil war verwendet?','Selbst abgelesene Einstellung, falls bekannt'],y,h=44)
    y=g.field('Was habe ich wahrgenommen – in meinen eigenen Worten?',y,h=94,tip='Neutrale freiwillige Erinnerung, keine Diagnose. Beschwerden nicht erneut provozieren; keine Pumpmenge als Bewertung nötig.')
    y=g.field('Was möchte ich dazu fragen?',y,h=77)
    g.text('Notiere nur, was du besprechen möchtest. Bei anhaltenden Problemen mit Hebamme, qualifizierter Stillberatung oder ärztlich klären. [2][11]',42,y,size=11,leading=16)
    g.end()

    y=g.start('Meine Fragen an die Beratung', 'Notiere zuerst die drei Fragen, die dir am wichtigsten sind. Die Stichworte darunter sind Gesprächsangebote, keine Aufgaben zum Selbsttesten.')
    for i in [1,2,3]:y=g.field(f'Priorität {i} · meine Frage',y,h=49)
    y=g.section('WAS MÖCHTE ICH BESPRECHEN?',y)
    for text in ['Welche Anleitung passt genau zu meinem System?','Wie beurteilen wir Sitz und Anwendung gemeinsam?','Was sollte ich bei Beschwerden tun?','Welche Frage gehört zur ärztlichen Abklärung?']:y=g.check(text,y,tip='Markiert ein Gesprächsthema, nicht das Vorliegen einer Diagnose.')
    y=g.field('Optional: verwendete Hersteller-Messhilfe / Version',y)
    y=g.field('Optional: Notiz nach konkreter Messanleitung oder aus Beratung',y,h=44,tip='Nur freiwillige Angaben nach der konkreten Herstelleranleitung oder aus der Beratung. Keine Umrechnung in eine PDF-Größenempfehlung.')
    g.text('Medela beschreibt seine Größenhilfe als flexible Orientierung, nicht als starre Regel. Keine pauschale Millimeter-Zugabe und keine Universalgrößentabelle verwenden. [11]',42,y,size=10.5,leading=15)
    g.end()

    y=g.start('Was wir geklärt haben', 'Trage nur tatsächlich Besprochenes ein. Ein offenes Ergebnis ist möglich; aus den Notizen entsteht kein automatischer Bestell- oder Behandlungsplan.')
    y=g.field('Mit Fachperson besprochener nächster Schritt / Datum',y,h=49)
    y=g.field('Genaue besprochene Teilekombination – nur falls geklärt',y,h=44)
    y=g.row(['Noch offen / wer beantwortet das?','Nächster vereinbarter Kontakt'],y,h=44)
    for text in ['Noch nichts bestellen','Modellzuordnung beim Hersteller prüfen','Individuelle Vereinbarung oben notiert']:y=g.check(text,y)
    y=g.text('Persönliche Notizen bleiben lokal und werden nicht an ein Newsletterformular übertragen. Das Blatt ist eine Gesprächsvorbereitung, keine medizinische oder technische Freigabe.',42,y,size=10.8,leading=15.5)+15
    g.sources([2,11,12,9],y)
    g.end();return g.save()

def teile(G):
    g=G('set-teilepass','Dein Set- und Teilepass','Set- & Teilepass')
    y=g.start('Mein vorhandenes System', 'Beginne beim Gerät, das bereits da ist. Der Pass hilft bei der Zuordnung – nicht bei einer vorsorglichen Zubehörbestellung.')
    y=g.text(FREE,42,y,size=10.5,leading=15)+13
    y=g.row(['Marke / exaktes Modell','Generation / regionale Variante'],y)
    y=g.row(['Cup- oder Flaschensystem','Single / Double laut Dokumentation'],y)
    y=g.field('Dokumentkennung / Version / passende URL',y,h=62,tip='Die genaue Dokumentkennung und einen passenden Link mehrzeilig festhalten; keine Seriennummer öffentlich teilen.')
    y=g.field('Artikelkennung vom Typenschild – nur falls nötig',y,tip='Nur notwendige Produktkennung notieren. Seriennummern nicht öffentlich teilen; keine Konto- oder Zugangsdaten eintragen.')
    y=g.field('Mein Anschlussweg: Teilbezeichnungen in eigener Reihenfolge',y,h=77,tip='Die eigenen Anschlüsse in Worten festhalten oder nach Ausdruck skizzieren. Keine markenübergreifende Bauanleitung ableiten.')
    y=g.note('Keine universelle Anschlusszeichnung: Motor, Cups und Verbindungen sind systemabhängig. Die gelesene Medela-Cup-IFU unterscheidet Schlauchzuordnungen und regionale Verfügbarkeit; sie belegt kein deutsches Händlerpaket. [12]',y,size=11)
    g.text('Nur notwendige Angaben für eine konkrete Supportfrage weitergeben. Ein eigener Pass ist keine Herstellerfreigabe.',42,y,size=10.5,leading=15)
    g.end()

    y=g.start('Was ist wirklich da?', 'Drei Bestandszeilen; für weitere Teile diese Seite lokal kopieren. Kategorien wie Motor, Cup/Haube, Einsatz, Ventil, Schlauch oder Deckel sind nur Beispiele, nicht Pflichtteile jeder Pumpe.')
    for i in [1,2,3]:
        y=g.section(f'BESTANDSZEILE {i}',y)
        y=g.row([f'{i}: Teilename laut Anleitung / Kennung',f'{i}: Anzahl vorhanden / laut eigenem Set nötig'],y,h=24)
        y=g.row([f'{i}: Zustand / Frage',f'{i}: Passende Quelle / Kapitel'],y,h=24)
        y=g.options(['ausreichend da','fehlt','Ersatz klären','nicht relevant'],y)+5
    y=g.note('Kein universeller Wechselrhythmus für Ventile oder Membranen. Zustand und Hinweise des konkreten Systems prüfen; gleicher Markenname oder ähnliches Aussehen ist kein Kompatibilitätsnachweis. [11][12]',y,size=11)
    g.text('Was ausreichend vorhanden ist, muss nicht noch einmal gekauft werden.',42,y,size=11,leading=16)
    g.end()

    y=g.start('Ein Bedarf, ein Nachweis', 'Prüfe genau ein Ersatz- oder Ergänzungsteil. „Bestätigt“ nur markieren, wenn die ausdrückliche Herstellerzuordnung für deine konkrete Kombination vorliegt.')
    y=g.row(['Vorhandene Komponente / Kennung','Gesuchter Ersatz / Funktion'],y)
    y=g.field('Gewünschte Artikelnummer / genaue Variante',y)
    y=g.field('Vom Hersteller ausdrücklich benanntes Pumpenmodell',y)
    y=g.field('Einschränkung: Generation / Region / Haubensystem',y,h=44)
    y=g.field('Quelle / exakter Wortlaut oder Fundstelle / eigenes Prüfdatum',y,h=62)
    y=g.options(['bestätigt','widersprüchlich','noch offen'],y)
    y=g.note('Modellbeispiel: Elvie trennt Pump/Stride-Nipple-Cushions von den Einsätzen für Stride 2. [9][10] US-orientierte Seiten; keine Freigabe für ein beliebiges deutsches Set. Gleiche Millimeterwerte oder ähnliche Formen ersetzen keine Zuordnung.',y,size=11)
    g.text('Auch Medela begrenzt Einsätze auf ausgewählte kompatible Pumpen und Brusthauben. Eine Marke allein reicht nicht. [11]',42,y,size=11,leading=16)
    g.end()

    y=g.start('So frage ich konkret nach', 'Kopiere die Vorlage in deine eigene Nachricht. Teile nur nötige Produktangaben; diese PDF sendet selbst keine Daten und enthält keine Bestellfunktion.')
    y=g.note('„Ich nutze [Modell/Generation] mit [vorhandenes System]. Gesucht ist [Teil/Funktion]. Ist [Artikelnummer/Variante] hierfür freigegeben? Welche weiteren Komponenten brauche ich? Bitte nennen Sie die passende Anleitung oder schriftliche Zuordnung.“',y,size=11)
    y=g.row(['Mein Modell / vorhandenes System','Gesuchtes Teil / Artikelnummer'],y,h=44)
    y=g.field('Antwort / Quelle / Datum / noch offene Bedingung',y,h=62)
    y=g.options(['Bestand reicht','Rückfrage nötig'],y)
    y=g.options(['Genau dieses Teil ergänzen','Noch keine Entscheidung'],y)
    y=g.field('Optional: eigene Preis-/Bestandsbeobachtung mit Datum',y,h=24,tip='Nur eigene aktuelle Beobachtung; keine vorproduzierte Preis- oder Lieferbarkeitsbehauptung.')
    g.sources([9,10,11,12],y)
    g.end();return g.save()

def produce(G):return [f(G) for f in [unterwegs,arbeit,reinigung,passform,teile]]
