# Vergleichsmethodik v3: Text- und Bildentwurf

Status: redaktioneller Entwurf für die Superdesign-Freigabe. Keine Änderung an der Website, kein veröffentlichter Produkttest. Die folgenden Textblöcke sind direkt für den Canvas bestimmt; Gestaltungsanweisungen und Freigabepunkte sind ausdrücklich getrennt. Die Quellenkennziffern gehören beim Übertragen als verlinkte Nachweise an die jeweiligen Aussagen.

## 1. Ausgangslage und Belegstand (intern)

Gelesen wurden `src/pages.tsx` (MethodologyPage, Vergleich, Produktseiten, Über uns und Rechtstexte), `src/components.tsx` (Footer, Händlerlinks, Consent), die drei Stylesheets, `src/seo.ts`, `scripts/prerender.tsx`, `src/analytics.ts`, `public/llms.txt` und die unten genannten Evidenzdateien.

Die aktuelle Methodik besteht aus einer kurzen Einleitung, sechs gleichartigen Karten und dem Herstellerregister. Auswahl und Grenzen sind richtig angelegt, konkrete Rechercheentscheidungen, fremde Erfahrungsberichte, Variantenprüfung und Aktualisierung fehlen als nachvollziehbare Beispiele. Die sechs Karten sollten nicht nur mit mehr Text gefüllt werden.

`PRODUCTS` in `src/data.ts` enthält sechs direkt gegenübergestellte Modelle. `docs/wearable-market-reconciled.json` enthält dagegen 35 unterschiedliche Hersteller-/Modellidentitäten: 31 mit beobachtetem öffentlichem Angebot, vier mit Status `not-found`. Diese Zahlen wurden aus der Datei gezählt und nach Marke/Modell dedupliziert. Sie belegen weder 35 getestete Pumpen noch 35 gleich tief ausgearbeitete Vergleiche, vollständige Marktabdeckung oder heutige Lieferbarkeit. Der Produktwegweiser ist wiederum ein eigenes Sortiment mit Zubehör und Aufbewahrung; seine Einträge sind nicht mit der Zahl der Pumpen gleichzusetzen.

Vorhandene Belege: `docs/external-report-checks.json`, `docs/media-rights-research.md`, `docs/product-targets.json`, `docs/editorial-review.json`, `docs/wearable-market-reconciled.json`, `docs/longtail-guide-evidence.json`, `src/niche-guides-a.ts`, `src/niche-guides-b.ts`, `docs/editorial-art-v2.json`, `docs/image-rights-manifest.csv`, `docs/typography-audit-summary.json`. Fremde Quellenkennziffern aus diesen Dateien wurden nicht übernommen: ihre Nummerierung ist teilweise nur innerhalb einer Recherchecharge gültig.

Für diesen Entwurf wurden die zwei Mumsnet-Berichte, Momcozys M9-Produktseite und S12-Quick-FAQ, zwei Philips-Modellseiten und der BZfE-Beitrag zusätzlich im öffentlichen HTML gelesen. Die Philips-Textantwort zeigte Modellnamen und Zubehör, aber keine vollständige Standard-Stückliste. Deshalb reproduziert das Beispiel keine vermeintlich neu bestätigte Bundle-Stückliste. Das frühere Setdetail in `src/niche-guides-a.ts` bleibt vorhandene Recherche, nicht eine hier erneut vollständig bestätigte Lieferung.

## 2. Exakte öffentliche Texte für den Canvas

Die Kennungen M01–M12 sind Produktionshilfen, keine sichtbaren Abschnittsnummern. Alle Abschnitte sind zunächst offen lesbar. Nur zusätzliche Fragen können später als Details-Elemente erscheinen.

### M01 · Einstieg

Eyebrow: Vergleichsmethodik

H1: So entsteht unser Milchpumpen-Vergleich

Einleitung:

Eine Pumpe soll in deinen Alltag passen: vielleicht für eine gelegentliche Flasche, vielleicht für regelmäßige Pausen bei der Arbeit. Deshalb schauen wir auf die Unterschiede, die vor dem Kauf eine Rolle spielen. Wo sitzt der Motor? Welche Teile liegen im Set? Brauchst du für die gewünschten Funktionen eine App? Und was muss nach dem Pumpen auseinandergebaut werden?

Unser Vergleich beruht auf Herstellerunterlagen, dokumentierten Produktmerkmalen und einzelnen, ausdrücklich zugeordneten Erfahrungsberichten anderer Veröffentlichungen. Für die hier vorgestellten Modelle liegen in dieser Übersicht keine dokumentierten standardisierten Labor- oder Alltagsergebnisse aus eigenen Versuchen vor.

Link: Modelle direkt vergleichen → `/vergleich/`

Bildunterschrift: Redaktionelle Themenillustration zum Alltag mit abgepumpter Milch.

### M02 · Orientierung

Navigationslabel: Auf dieser Seite

- Welche Informationen wir verwenden → `#informationen`
- Welche Modelle im Vergleich stehen → `#auswahl`
- Was wir gegenüberstellen → `#kriterien`
- Drei konkrete Recherchebeispiele → `#beispiele`
- Erfahrungen aus anderen Veröffentlichungen → `#erfahrungsberichte`
- Quellenstand und Korrekturen → `#aktualisierung`
- Finanzierung und Grenzen → `#finanzierung`

### M03 · Welche Informationen wir verwenden {#informationen}

Eine Bedienungsanleitung beantwortet andere Fragen als ein Händlerangebot. Ein Erfahrungsbericht kann wiederum zeigen, worauf du im Alltag achten möchtest. Wir halten diese Informationen auseinander, damit aus einer einzelnen Beobachtung keine allgemeine Produkteigenschaft wird.

| Information | Was du daraus ablesen kannst | Wo die Aussage endet |
|---|---|---|
| Herstellerunterlagen | Beschriebene Bauart, Bedienung, Zubehörzuordnung und Pflege des jeweiligen Modells. | Werbeaussagen über Komfort, Effizienz oder Lautstärke sind dadurch keine von uns gemessenen Ergebnisse. |
| Öffentliches Händlerangebot | Welche Variante eine Angebotsseite zeigt und welcher Lieferumfang dort beschrieben wird. | Das Angebot kann wechseln. Ein sichtbarer Liefertermin gilt nicht automatisch für deinen Wohnort oder die später ausgewählte Variante. |
| Externer Erfahrungsbericht | Was eine benannte Testerin laut der jeweiligen Veröffentlichung erlebt hat. | Ihre Passform, Geräuschwahrnehmung und abgepumpte Menge lassen sich nicht auf andere Nutzerinnen übertragen. |
| Redaktionelle Einordnung | Welche dokumentierten Unterschiede für eine bestimmte Kaufentscheidung relevant sein können. | Sie ist keine Messung und keine individuelle medizinische Empfehlung. |

Wenn eine Information nicht eindeutig zum Modell gehört oder in den Unterlagen fehlt, bleibt die Frage offen. Ein fehlender Nachweis für eine Funktion bedeutet nicht automatisch, dass die Funktion fehlt.

### M04 · Welche Modelle im Vergleich stehen {#auswahl}

Im direkten Vergleich stehen sechs Modelle: Momcozy Mobile Flow M9, Medela Freestyle Hands-free, Philips Avent SCF547/11 Hands-free, Momcozy S12 Pro, Elvie Pump Single und Haakaa Generation 3. Sie zeigen unterschiedliche Konzepte: elektrische Pumpen mit Motor im BH, Auffangschalen mit separater Motoreinheit und eine manuelle Silikonpumpe.

Diese Auswahl ist keine vollständige Übersicht aller lieferbaren Milchpumpen. Die Haakaa ist als manuelle Ergänzung aufgenommen; wir stellen sie nicht einer elektrischen Doppelpumpe als gleichwertigen Ersatz gegenüber.

Unsere ergänzende Marktrecherche erfasst 35 Hersteller-/Modellidentitäten. Das ist ein Rechercheumfang, nicht die Zahl eigener Produkttests oder vollständig ausgearbeiteter Detailvergleiche. Weitere Produkt- und Zubehörinformationen findest du im Produktwegweiser. Für eine Kaufentscheidung ist entscheidend, wie gut die Angaben zum konkreten Modell belegt sind, nicht wie lang eine Liste ist.

Links: Zum direkten Vergleich → `/vergleich/` · Zum Produktwegweiser → `/produkte/`

### M05 · Was wir gegenüberstellen {#kriterien}

#### Bauart und Trageweise

„Hands-free“ sagt noch nicht, ob Schläuche und eine separate Motoreinheit vorhanden sind. In der Tabelle stehen deshalb Antrieb und Trageweise getrennt. Wenn der Motor außerhalb des BHs sitzt, brauchst du einen Platz dafür. Bei einer vollständig integrierten Pumpe trägst du die Motoreinheit im BH. Daraus allein folgt noch nicht, welche Lösung für dich bequemer ist.

#### Einzelpumpe, Doppelset und Zubehör

Wir unterscheiden das Modell von der angebotenen Packung. Ein Single-Set bleibt eine Einzelpumpe, auch wenn Reserveflaschen beiliegen. Zusätzliche Einsätze, Cups oder Taschen sind ebenfalls keine zweite vollständige Pumpe. Prüfe beim Händler die ausgewählte Variante und die Stückliste, nicht nur das Vorschaubild.

#### Bedienung, App und Energieversorgung

Die Angabe „mit App“ ist ein Einstieg. Für die Entscheidung zählt, welche Funktionen du direkt am Gerät bedienen kannst und welche ein kompatibles Smartphone benötigen. Herstellerangaben zu Akkusitzungen lassen sich nur mit ihren jeweiligen Bedingungen einordnen. Wir machen daraus keine gemeinsame Laufzeitrangliste.

#### Reinigung und Ersatzteile

Wir beschreiben den dokumentierten Aufbau und verweisen auf die passende Anleitung. Eine geringe Zahl von Cup-Teilen kann für deine Planung interessant sein, sagt aber nicht, wie lange du für das Zerlegen, Reinigen und Trocknen brauchst. Einsätze und weiteres verwendetes Zubehör gehören mit in die Überlegung. Für erlaubte Reinigungsverfahren ist die Anleitung des konkreten Systems maßgeblich.

#### Was wir nicht in eine Gesamtnote umrechnen

Passform, Geräusch und Milchmenge lassen sich mit den vorhandenen Quellen nicht einheitlich bewerten. Mehr Intensitätsstufen sind kein Beleg für eine höhere Milchmenge. Eine App macht eine Pumpe nicht automatisch geeigneter. Deshalb zeigt der Vergleich Merkmale und Kaufprüfpunkte statt einer Punktewertung.

Kleine Entscheidungshilfe:

| Wenn dir das wichtig ist … | Dann prüfe zuerst … |
|---|---|
| Einstellungen ohne Smartphone ändern | Die regulären Tastenfunktionen des genauen Modells. |
| Beide Brüste gleichzeitig abpumpen | Die Zahl vollständiger Pumpeneinheiten und das ausdrücklich bezeichnete Set. |
| Unterwegs möglichst wenig organisieren | Motorplatz, Schläuche, Ladung und mitzuführende Teile. |
| Bereits vorhandenes Zubehör weiter nutzen | Exakten Teilecode und dokumentierte Kompatibilität. |
| Eine passende Größe finden | Hersteller-Messhilfe und bei Unklarheiten fachliche Unterstützung. |

Das BZfE nennt Hebammen und Stillberaterinnen als Unterstützung bei der Auswahl des Trichteraufsatzes und der Anwendung einer Milchpumpe.[9]

Link: Flanschgröße richtig einordnen → `/ratgeber/richtige-flanschgroesse/`

### M06 · Drei konkrete Recherchebeispiele {#beispiele}

#### Beispiel 1: S12 Pro ist nicht S12 Pro Quick

Momcozy unterscheidet die ursprüngliche S12, die S12 Pro und die aktuelle S12 Pro Quick ausdrücklich.[1] Wenn eine alte Produktadresse inzwischen auf die Quick verweist, übernehmen wir deren Angaben nicht einfach für die S12 Pro. Zuerst muss feststehen, welche Generation der Text, die Anleitung und das Händlerangebot beschreiben.

Für dich heißt das: Notiere den vollständigen Modellnamen vor dem Kauf von Pumpe oder Ersatzteilen. Ein ähnlich aussehender Cup und derselbe Markenname reichen für die Zuordnung nicht aus.

Link: S12 Pro und Quick unterscheiden → `/ratgeber/momcozy-s12-pro-quick-unterschiede/`

#### Beispiel 2: Eine App kann Zusatzfunktionen bieten, ohne für jeden Modus nötig zu sein

Auf der M9-Produktseite beschreibt Momcozy reguläre Pumpmodi, die über die App oder direkt an der Pumpe gewählt werden können.[8] Im verlinkten Mumsnet-Bericht wird die App dagegen als wesentlicher Bestandteil der Nutzung dargestellt.[2] Wir verwenden die aktuelle Herstellerbeschreibung für die Funktionszuordnung und behandeln die App-Erfahrung der Testerin gesondert.

Für dich heißt das: Unterscheide die normalen Modi von den App-Zusatzfunktionen. Wenn du ohne Smartphone pumpen möchtest, ist diese Frage hilfreicher als ein einfaches Ja oder Nein in der App-Spalte.

Link: M9 ohne App nutzen → `/ratgeber/momcozy-m9-ohne-app/`

#### Beispiel 3: Ein anderes Set ist nicht automatisch eine bessere Pumpe

Philips bezeichnet die SCF547/11 als elektrische Doppelmilchpumpe und die SCD553/11 als Starterset mit elektrischer Doppelmilchpumpe.[6][7] Wir behandeln das als Frage nach der genauen Ausstattung. Die Setbezeichnung liefert keinen Nachweis für höhere Milchmengen oder einen leistungsfähigeren Motor.

Für dich heißt das: Vergleiche die enthaltenen Größen und Zubehörteile mit dem, was du tatsächlich brauchst. Zusätzliche Teile können sinnvoll sein; schon vorhandene Teile musst du nicht noch einmal kaufen. Die Standardliste des Herstellers und das konkrete Händlerbundle müssen getrennt geprüft werden.

Link: SCF547/11 und SCD553/11 vergleichen → `/ratgeber/philips-avent-scf547-11-oder-scd553-11/`

### M07 · Was Erfahrungen anderer Veröffentlichungen beitragen {#erfahrungsberichte}

Ein Datenblatt erklärt nicht, wie jemand die Pumpe im Büro wahrnimmt oder ob die App im eigenen Alltag gut funktioniert. Dafür können externe Berichte nützlich sein. Wir nennen die Veröffentlichung, die dort benannte Testerin und den beschriebenen Nutzungsumfang. Die Erfahrung bleibt ihrer Quelle zugeordnet.

Mumsnet berichtet, dass Alex das M9-Doppelset regelmäßig über drei Monate genutzt hat. Im Bericht werden unter anderem Probleme bei der Erfassung der Milchmenge in der App genannt.[2] Das ist ein Grund, sich die Dokumentationsfunktion genauer anzusehen. Es ist kein Nachweis, dass jede aktuelle App-Version bei jeder Nutzerin denselben Fehler hat.

Für die Freestyle Hands-free beschreibt Mumsnet Charlottes Nutzung einmal täglich über vier Wochen. Die Testerin empfand die Pumpe als zu laut für ein gemeinsam genutztes Büro.[3] Wir übernehmen das als ihre Alltagseinschätzung, nicht als Dezibelwert oder Rangfolge gegenüber anderen Pumpen.

Mumsnet legt Affiliate-Finanzierung offen.[2][3] Ein externer Alltagstest ist deshalb weder unser eigener Versuch noch automatisch ein unabhängiger Labortest. Für Aufbau und Reinigung gelten weiterhin die Herstellerunterlagen zum genauen Modell.

Links: Mumsnet-Bericht zur M9 → Quelle [2] · Mumsnet-Bericht zur Freestyle → Quelle [3]

### M08 · Vom Quellenstand zur Korrektur {#aktualisierung}

Bei einer Produktangabe ist das Datum des Quellenabgleichs wichtiger als eine allgemeine Jahreszahl im Seitentitel. Auf den Produktseiten steht deshalb, wann die dort verwendete Herstellerquelle abgeglichen wurde. Ein neues Seitendatum bedeutet nicht, dass wir die Pumpe neu getestet haben.

Für eine überprüfbare Angabe brauchen wir den vollständigen Modellnamen, die betreffende Ausführung und die Quelle. Ändert ein Hersteller eine Produktseite oder passen zwei Angaben nicht zusammen, prüfen wir zuerst Generation, Land und Set. Ein Widerspruch bleibt sichtbar, solange er nicht nachvollziehbar geklärt ist.

Händlerpreise und Liefertermine sind Momentaufnahmen. Ein Angebot aus einer früheren Recherche ist kein Versprechen, dass dieselbe Variante heute zu denselben Bedingungen erhältlich ist. Bei einem Kauf gilt das aktuell ausgewählte Händlerangebot.

Wenn du eine Abweichung findest, schicke bitte die betroffene Seitenadresse, den Modell- oder Teilecode und einen Link zur aktuellen Herstellerangabe an `admin@andreasboehler.com`. Bei einem Bundle hilft zusätzlich die genaue Setbezeichnung. Persönliche Gesundheitsdaten brauchst du für einen sachlichen Quellenhinweis nicht mitzuschicken.

Link: Quellenhinweis senden → `mailto:admin@andreasboehler.com`

### M09 · Was der Vergleich für dich leisten kann

Der Vergleich hilft dir, Bauarten und Ausstattung zu sortieren und Fragen vor einem Kauf vorzubereiten. Er kann nicht vorhersagen, wie viel Milch du mit einer Pumpe gewinnen wirst oder wie sie sich an deiner Brust anfühlt.

Bei Schmerzen, Verletzungen, Unsicherheit über die Milchversorgung oder einer besonderen gesundheitlichen Situation brauchst du individuelle Unterstützung durch Hebamme, qualifizierte Stillberatung oder Arztpraxis. Für Frühgeborene und erkrankte Babys können besondere Vorgaben gelten. Eine Produktliste ersetzt diese Betreuung nicht.

Auch ein Neukauf muss nicht der nächste Schritt sein. Je nach Situation kommen vorhandenes Zubehör, eine andere Größenlösung oder die Klärung einer verordneten Versorgung infrage. Die Entscheidung dazu gehört in die individuelle Beratung; unsere Händlerlinks sind nur eine Möglichkeit, ein Angebot anzusehen.

### M10 · Wie sich die Seite finanziert {#finanzierung}

Mit einem Stern gekennzeichnete Links führen zu Amazon. Bei einem qualifizierten Kauf über einen solchen Link kann eine Provision entstehen. Für dich ändert sich der Preis dadurch nicht. Auf der Angebotsseite siehst du den aktuellen Preis und die ausgewählte Ausführung.

Ein direkter Produktlink führt zu der benannten Variante. Wenn wir keine genaue Variante zugeordnet haben, kennzeichnen wir das Ziel als Amazon-Suche. Prüfe dort den vollständigen Modellnamen; ein Suchergebnis kann auch Zubehör, ein anderes Set oder eine neuere Generation zeigen.

Die Vergleichstabelle lässt sich nach dokumentierten Merkmalen filtern und sortieren. Eine Händlerverlinkung ist keine Auszeichnung für das Produkt und keine persönliche Kaufempfehlung.

Link: Redaktion und Betreiber → `/ueber-uns/`

### M11 · Quellen zum direkten Vergleich

Die folgenden Herstellerunterlagen bilden den Ausgangspunkt der sechs Produktseiten. Den jeweiligen Quellenstand und zusätzliche Hinweise findest du beim Modell. Das Datum einer fremden Veröffentlichung und der Zeitpunkt unseres Quellenabgleichs sind unterschiedliche Angaben.

| Modell | Herstellerquelle | Interne Produktseite |
|---|---|---|
| Momcozy Mobile Flow M9 | [Momcozy Produktseite M9](https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump), Quelle [8] | `/produkte/momcozy-m9/` |
| Medela Freestyle Hands-free | [Medela Produktseite Freestyle Hands-free, US-Fassung](https://www.medela.com/en-us/breastfeeding-pumping/products/pumps/hands-free-electric/freestyle-hands-free-breast-pump?productId=4072) | `/produkte/medela-freestyle/` |
| Philips Avent SCF547/11 | [Philips Produktseite SCF547/11](https://www.philips.de/c-p/SCF547_11/hands-free-elektrische-doppelmilchpumpe), Quelle [6] | `/produkte/philips-avent-scf547/` |
| Momcozy S12 Pro | [Momcozy FAQ zur Abgrenzung S12 Pro / Quick](https://momcozy.com/blogs/momcare/s12-pro-quick-setup-pumping-cleaning), Quelle [1]. Die FAQ beschreibt die Quick-Generation; ihre Daten gelten nicht pauschal für die ursprüngliche S12 Pro. | `/produkte/momcozy-s12-pro/` |
| Elvie Pump Single | [Elvie FAQ zur Elvie Pump](https://www.elvie.com/de-de/haufig-gestellte-fragen-faqs/elvie-pump) | `/produkte/elvie-pump-single/` |
| Haakaa Generation 3 | [Haakaa Produktseite Generation 3, US-Fassung](https://haakaausa.com/products/haakaa-gen-3-silicone-breast-pump-1-pk) | `/produkte/haakaa-gen3/` |

Canvas-Anweisung, nicht öffentlich: Quellenlinks für Medela, Elvie und Haakaa sind exakt aus dem aktuellen Datenbestand übernommen, hier nicht zusätzlich live geprüft. US-Quellen erlauben keine ungeprüfte Übertragung auf deutsche Sets. Die S12-Quelle belegt die Generationstrennung, nicht sämtliche alten S12-Pro-Spezifikationen: vor Veröffentlichung einen belastbaren Altmodellbeleg ergänzen oder die unbelegten Kartenangaben korrigieren. Keine Dateinamen im öffentlichen Quellenregister zeigen.

### M12 · Abschluss

H2: Die nächste Frage vor dem Kauf

Wenn du die Bauarten schon eingegrenzt hast, vergleiche zuerst Ausführung und Bedienung. Danach lohnt sich der Blick auf die Passformhilfe und die Teile, die du reinigen oder ergänzen musst.

Links: Merkmale vergleichen → `/vergleich/` · Kauf-Checkliste lesen → `/ratgeber/hands-free-milchpumpe-kaufen/`

## 3. Bild- und Layoutregie (intern, keine Websiteänderung)

Die sechs bestehenden SVGs wurden als Kontaktbogen gerendert und visuell angesehen. Alle sind redaktionelle Vektorillustrationen, keine echten Produktaufnahmen. Das Manifest nennt sie `original-vector-illustration`, jeweils 1200 × 900. Es werden keine neuen Motive erzeugt und keine fremden Produkt- oder Testfotos eingebunden.

| Block | Konkrete Anordnung | Vorhandenes Asset / Bildtext |
|---|---|---|
| M01 | Asymmetrischer Einstieg: Text links, vollständiges Stillleben rechts; auf Mobilgeräten H1, Einleitung, Bild, Link untereinander. | `/editorial-v2/alltag.svg`; Alt: „Redaktionelle Illustration mit Kühltasche, zwei Vorratsbechern, gefaltetem Tuch und Zimmerpflanze.“ |
| M02–M03 | Schmale Sprungnavigation, danach großzügiger Leseblock mit Vergleichstabelle. Keine weitere Kartenwand. | Kein Bild erforderlich; Quellenarten als echte HTML-Tabelle, nicht als Grafik. |
| M04–M05 | Bauarten als Textmatrix; daneben kleinere, ruhige Abbildung der Cups und des Telefons. Nicht als Modellabbildung ausgeben. | `/editorial-v2/handfrei.svg`; Alt: „Redaktionelle Illustration mit zwei markenlosen Sammelcups und einem Smartphone.“ Caption: „Themenillustration zu Bauart und Bedienung; die Cups zeigen kein konkretes Modell.“ |
| M05 Reinigung | Breiter, mintfarbener Einschub mit Bild links und einem einzigen Absatz rechts. | `/editorial-v2/reinigung.svg`; Alt: „Redaktionelle Illustration eines Spülbeckens und eines Gestells mit zerlegten, markenlosen Pumpenteilen.“ Caption: „Themenillustration. Für die Pflege gilt die Anleitung deines Pumpensystems.“ |
| M06 | Ein offenes Recherchebeispiel mit Bild, anschließend zwei schlichte Textblöcke mit Trennlinien. Keine drei identischen Kacheln. | `/editorial-v2/passform.svg` beim Set-/Größenbeispiel; Alt: „Redaktionelle Illustration mit drei neutralen Brusttrichtern und einem Maßband ohne Größenangaben.“ Caption: „Themenillustration zu Größen und Zubehör, keine Messanleitung.“ |
| M07 | Lesespalte auf Creme, daneben kleiner Quellenzettel mit Veröffentlichung, Testerin, Umfang und Link. Keine Sterne, Testplaketten oder testimonialartigen Porträts. | Kein Bild; externe Berichte bekommen keine eigenen erfundenen Personenmotive. |
| M08 | Zweispaltiger Quellen-/Datumsblock mit kleinem Stillleben; Quellenhinweis als einfache Textaktion. | Optional `/editorial-v2/portionieren.svg`; Alt: „Redaktionelle Illustration mit zwei beschriftbaren Milchbeuteln, Stift und Vorratsbecher.“ Caption: „Themenillustration zur Organisation. Die dargestellten Etiketten sind keine Produktdaten.“ |
| M09–M10 | Kurzer, offener Hinweisblock für persönliche Grenzen, darunter Finanzierung ohne werblichen Kaufdruck. | Kein zusätzlicher Alarm-/Schutzschild und keine wiederholten Qualitätsslogans. |
| M11–M12 | Quellenregister als ruhige Liste, danach zwei inhaltliche Weiterwege mit Bildfeld nur beim Transportartikel, falls dieser zusätzlich gewählt wird. | Optional `/editorial-v2/kuehltransport.svg`; Alt: „Redaktionelle Illustration einer offenen Kühltasche mit zwei Vorratsbechern und einem separaten Kühlakku.“ Caption: „Themenillustration zum Transport, kein Nachweis einer Kühlleistung.“ |

Primär vier Bilder verwenden (alltag, handfrei, reinigung, passform); Portionieren und Kühltransport sind optionale Motive, keine Pflicht, alle sechs Assets auszureizen. Bilder im Verhältnis 4:3 vollständig zeigen (`contain`, keine wichtigen Teile abschneiden). Nur Bildrahmen dürfen Überlauf begrenzen; Text darf weder gekappt noch auf feste Zeilenhöhen gezwungen werden. Texte, Quellen, Entscheidungstabellen und Bildunterschriften bleiben außerhalb der SVGs.

Palette aus dem Bestand: Creme `#fff9ee`, Petrol `#086d61`, dunkles Petrol `#173c37`, Mintflächen und sparsame Korallakzente passend zu den Motiven. Lokal eingebundene Manrope 300–800: Display/Lead 300–400, Fließtext 400, Links und Bedienelemente 500, kurze Betonungen höchstens 600. Keine vollfetten Fließtextabsätze, keine lauten Großbuchstaben-Hinweise. Lesespalten etwa 60–70 Zeichen, Fließtext mit ausreichend Zeilenhöhe; keine fest eingebaute Mindestbreite am Body.

Die bestehenden `minmax(0, 1fr)`-Tracks, `min-width: 0`, Umbruchregeln und unteren Schriftabstände erhalten. Lange Wörter wie „Vergleichsmethodik“, „Energieversorgung“ und „Herstellerunterlagen“ sowie E-Mail und Modellcodes sind ausdrücklich Teil der späteren Clippingprüfung. Tabellen dürfen innerhalb ihres markierten Containers scrollen; die Seite selbst nicht.

## 4. Freigabepunkte und offene Fragen (intern)

- Erst die Superdesign-Komposition mit diesem Text prüfen und ausdrücklich freigeben lassen. Kein Canvas-Entwurf gilt als Implementierungsfreigabe. Danach erst MethodologyPage, Footer oder CSS anfassen.
- Die 35er-Marktrecherche ist nicht vollständig mit allen öffentlichen Produkt-/Ratgeberdarstellungen integriert. Die aktuelle Sechser-Tabelle darf nicht in eine „35 getestete Milchpumpen“-Aussage umbenannt werden. `not-found` bedeutet nur, dass diese Recherche kein belastbares Angebot dokumentiert hat.
- Die S12-Pro-Produktkarte hat teilweise Altmodellangaben, verweist aber auf eine aktuelle Quick-FAQ. Vor Veröffentlichung für jede Altmodellangabe einen generationsgenauen Beleg prüfen. Nicht alle Quick-Daten auf das alte Modell übertragen.
- Das bisherige globale Prüfdatum ist `16. Juli 2026`; nur einzelne Datensätze sind explizit später geprüft. Dieses Datum nicht durch das Datum dieses Entwurfs ersetzen. Der Methodenartikel erhält ein tatsächliches redaktionelles Veröffentlichungs-/Änderungsdatum erst nach Freigabe; Feldprüfung und Artikeländerung bleiben getrennt.
- Für die erweiterte Erfassung empfiehlt sich pro Aussage ein Belegdatensatz: Modell/Generation, Region, Set, Merkmal, Art der Aussage, Quell-URL, relevante Textstelle, Quellenabgleich, gegebenenfalls Widerspruch und offene Rückfrage. Das ist eine vorgeschlagene Erweiterung, kein bereits lückenlos existierendes Register.
- Für spätere eigene Tests wären ein veröffentlichtes Protokoll, konkrete Testgeräte und Varianten, Testumfang, dokumentierte Bedingungen und Ergebnisse erforderlich. Kauf, Testperson, Testdatum, Messung und persönliche Erfahrung dürfen bis dahin nicht erfunden werden. Ein zukünftiges Protokoll ist kein rückwirkender Testbeleg.
- `docs/product-targets.json` dokumentiert vier direkt zugeordnete Amazon-Varianten und zwei Suchziele für die sechs Modelle. Das belegt weder komplette Bundleinhalte noch aktive PartnerNet-Teilnahme, abgeschlossene Verkäufe oder Provisionen. Tag exakt `andreasboeh09-21` erhalten. Keine Kauf-/Attributionsprobe wurde hier gemacht.
- Der Amazon-Pflichtsatz im bestehenden Footer behauptet eine Partnerrolle. Kontostatus und aktuell vorgeschriebene Formulierung durch Betreiber/PartnerNet prüfen; die konditionale Finanzierungskopie oben ist keine rechtliche Freigabe und ersetzt einen erforderlichen Partnerhinweis nicht.
- `docs/image-rights-manifest.csv` markiert Produktfotos als nicht freigegeben; die Recherche hat keine Hersteller- oder Reviewfotos erworben. Die sechs eigenen Illustrationen sind davon getrennt. Eine Quellenangabe ist keine Lizenz. Herstellerfreigaben, Amazon-Produktdaten-/Bildschnittstelle und Pinterest-Nutzung bleiben ungelöst; nicht aus einem Affiliate-Tag ableiten.
- Impressum, Anschrift, Betreiberstatus, Datenschutzerklärung, Einwilligungswiderruf und Partnerprogrammangaben benötigen die gesonderte Prüfung im Footer-Dokument. Keine rechtliche Unbedenklichkeit attestieren.

## 5. Metadatenentwurf und spätere Abnahme

URL unverändert `/testmethodik/`; keine parallele „Test“-Landingpage erzeugen.

Title: `Vergleichsmethodik: So ordnen wir Milchpumpen ein`

Description: `Wie wir Milchpumpen anhand von Herstellerunterlagen vergleichen, Varianten prüfen und externe Erfahrungsberichte einordnen. Mit konkreten Beispielen und Quellen.`

H1 und `RouteSeo.heading`: `So entsteht unser Milchpumpen-Vergleich`

Schema-Vorschlag: `WebPage` mit stabiler URL, Autor-/Publisher-Bezug auf Andreas Böhler und tatsächlichem redaktionellem Änderungsdatum. Kein `Review`, keine erfundene Bewertung, keine Produktangebote für diesen Artikel. Bilder als Themenillustrationen beschreiben, nicht als fotografische Belege oder Produktbilder. Für Social Preview gegebenenfalls vorhandenes PNG beibehalten oder separat freigegebenes Rasterderivat eines eigenen SVGs vorsehen; eine SVG-URL nicht mit `image/png` deklarieren.

Spätere Abnahme nach Umsetzung: alle Links und Anker, eine H1, sichtbare Quellen, richtige Generationen und Setziele, konsistente Metadaten/JSON-LD, kein globales neu erfundenes Prüfdatum. Responsive Prüfung bei 320, 390, 768 und 1440 Pixeln sowie 200 % Zoom und mit klassischem Scrollbalken. Auf `documentElement.clientWidth` prüfen, Schriftladen abwarten, Range-/Containergrenzen und sichtbare Glyphen ansehen. Frühere 45-Routen-Typografieprüfung ist eine Bestandsaufnahme, keine Abnahme des neuen Entwurfs.

## Sources

[1] https://momcozy.com/blogs/momcare/s12-pro-quick-setup-pumping-cleaning
    > "The lineup has moved from the original S12 to the S12 Pro and now to the current S12 Pro Quick."
[2] https://www.mumsnet.com/reviews/momcozy-m9-breast-pump-review
    > "Mum-of-two and verified Mumsnet parent-tester Alex used the Momcozy M9 Breast Pump regularly over a period of three months to pump milk for her baby (aged between seven and 10 months at the time of testing)."
    > "The app had a few glitches, particularly with regards to recording volume of pump session Alex didn't find it to be quite as efficient as the Elvie or Medela hands-free pumps she's tried Pricey Key specs Type of pump: Wearable | Single or double : Both available, our tester tried the double | Power source: Rechargeable | Number of settings: 5 - Two specialist pumping patterns: Milk Boost and Milk Relief, Three Regular Pumping Modes: Stimulation, Expression and Mixed (combining stimulation and expression) | Closed System: Yes Read next: See how the Momcozy M9 compares to the M5 , Momcozy V2 and Momcozy V1 ; and discover even more tried and tested breast pump options with our guides to the best breast pumps , wearable breast pumps and manual breast pumps"
    > "nk person but I've grown to love it. Is there anything you'd change or improve upon? "The app is essential for the use of this pump but the recording is pretty poor. I wasn't able to use the app t"
    > "o provide honest and independent advice you can trust. Sometimes, we earn revenue through affiliate (click-to-buy) links in our articles. However, we never allow this to influence our coverage. Relat"
[3] https://www.mumsnet.com/reviews/medela-freestyle-breast-pump-review
    > "Our parent-tester Charlotte used the Medela Freestyle Hands-free Breast Pump once a day over four weeks."
    > "Quite noisy - tester says she wouldn't feel comfortable using in an office setting Doesn't come with a travel bag The motor unit is quite sensitive which can cause issues when placed in a pocket You need to make sure the collection cups have clicked into place properly when assembling otherwise it may leak Key specs Single or double pump: Double | Power source: Mains and battery | Number of settings: 4 speeds, 9 vacuum levels | Closed system: Yes | BPA-free: Yes Read next : Discover more of the best breast pumps , including the best wearable breast pumps and top manual pumps according to Mumsnetters"
    > "o provide honest and independent advice you can trust. Sometimes, we earn revenue through affiliate (click-to-buy) links in our articles. However, we never allow this to influence our coverage. All p"
[6] https://www.philips.de/c-p/SCF547_11/hands-free-elektrische-doppelmilchpumpe
    > "Avent Hands-free Elektrische Doppelmilchpumpe SCF547/11"
[7] https://www.philips.de/c-p/SCD553_11/hands-free-starter-set-elektrische-doppelmilchpumpe
    > "Avent Hands-free Starter-Set mit elektrischer Doppelmilchpumpe SCD553/11"
[8] https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump
    > "Regular Pumping Modes  – Select via Momcozy App or Pump Stimulation Mode: Features a quick,"
[9] https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen
    > "Unterstützung bieten Hebammen und Stillberaterinnen, sei es bei der Auswahl des passenden Trichteraufsatzes und der Anwendung der Milch-Pumpe oder der Aufbewahrung und Fütterung der Muttermilch."
