# Amazon.de: öffentlicher Markt- und Angebots-Recheck vor Release

**Beobachtet am 15.10.2026.** Detailseiten 09:19–09:30 Uhr CEST (UTC+02:00); die JSON-Datei enthält die einzelnen UTC-Zeitstempel. Recherche und Quellen-Nachlese reichen darüber hinaus. Keine Änderungen an Produktdaten, Empfehlungen oder Website.

## Ergebnis und Aussagegrenze

- **31 historische ASINs erneut als echte Produktseiten mit passender ausgewählter ASIN gelesen; bei allen ein öffentliches Angebot beobachtet.** Das bestätigt die alte Angebotszahl für diese Auswahl neu, nicht die Vollständigkeit des Marktes.
- Die **35 vorhandenen Modellidentitäten / 17 Marken** bleiben unverändert. Für **33** dieser Identitäten wurde eine genaue DE-Detailseite gelesen: **31 mit Angebot**, **2 mit Detailseite ohne Angebot**. Für **2** weitere Identitäten keine passende DE-Seite bestätigt.
- **5 zusätzliche klar benannte Modellkandidaten mit aktuellem Amazon-Angebot**: Ardo Alyssa Hands-Free, Philips Natural Care SCF495/11, Fizimed Emy Pump, eufy E10 und E20. Das ist eine Erweiterungsliste zur Prüfung, kein automatischer neuer Site-Gesamtstand.
- **23 unterschiedliche Suchanfragen**, breite deutsche Wearable-Suchen und Markensuchen mit breiterem Fallback. **45 unterschiedliche ASIN-Beobachtungen** im normalisierten Hauptprotokoll: 21 `verified`, 19 `partial`, 5 `not-confirmed`; zusätzlich drei klar getrennte Amazon-only-Haokoo-Leads. ASINs sind keine Modellzahl. 40 Hauptprotokoll-ASINs zeigten ein Angebot, einschließlich mehrfacher Sets/Bundles derselben Modelle.
- **Kein Anspruch auf alle Produkte, keine Qualitätsrangliste aus Lagerbestand, Preis, Sternen oder maximalem Unterdruck.** Suchtreffer können fehlen, veraltet sein oder unpassende Produkte liefern.

### Lieferkontext / Statusdefinitionen

Die entscheidenden Detailseiten wurden in einem frischen, nicht angemeldeten Chrome-Kontext unter **Amazon.de / Deutsch / EUR / „Lieferung an Rust 77977“** gelesen. Dieser öffentliche voreingestellte Kontext wurde übernommen; keine eigene Adresse, Postleitzahl oder Kontodaten eingegeben. Lieferdatum und Versand an eine tatsächliche Adresse wurden nicht über Checkout bestätigt. Die Termine sind Anzeigen, keine Zusagen.

- **verified:** ausgewählte ASIN und Produkttitel passen; öffentliches Angebot plus ausdrücklich `Neu` im Angebotslink oder `buyingOptionType: NEW` des **ausgewählten** Varianten-Datensatzes. Das bestätigt weder sämtliche Kit-Komponenten noch Hersteller-/Regionsmapping, echte Zustellung oder Qualität.
- **partial:** Produkt/Angebot gelesen, aber etwa Zustand, exakte Stückzahl oder Modell-/Regionszuordnung bleibt offen. Ein fehlender Verkäuferwert ist „nicht extrahiert“, nicht „kein Verkäufer“.
- **not-confirmed:** kein aktuelles Angebot im begrenzten Lauf belegt oder kein Produktinhalt. Bedeutet ausdrücklich **nicht**, dass das ganze Modell in Deutschland ausverkauft ist.

## Die sechs priorisierten Modelle

| Modell / genaue ASIN | Neu gelesene Auswahl | Angebot / Zustand | Lieferanzeige im öffentlichen Kontext |
|---|---|---|---|
| **Momcozy M5 Smart**, [B0G1MWP4FB](https://www.amazon.de/dp/B0G1MWP4FB?language=de_DE) | (mit App) Grau - 1 Pack | **129,99€ Gesamtanzeige**, Nur noch 10 auf Lager; Zustand nicht separat bestätigt; `partial` | GRATIS Lieferung Samstag, 17. Oktober Oder schnellste Lieferung Morgen, 16. Oktober. |
| **Medela Freestyle Hands-free**, [B0BKGFBKHJ](https://www.amazon.de/dp/B0BKGFBKHJ?language=de_DE) | Freestyle Hands-free / Doppelsystem | **202,99€ Gesamtanzeige**, Auf Lager; Neu (2) ab 202,99€202,99€ Kostenlose Lieferung.; `verified` | GRATIS Lieferung Montag, 19. Oktober Oder schnellste Lieferung Morgen, 16. Oktober. |
| **Momcozy Air 1**, [B0G2MQH1DF](https://www.amazon.de/dp/B0G2MQH1DF?language=de_DE) | Air 1 - Rot, 2 Pack | **399,99€ Gesamtanzeige**, Auf Lager; Selected variant JSON buyingOptionType NEW; `verified` | GRATIS Lieferung Montag, 19. Oktober Oder schnellste Lieferung Morgen, 16. Oktober. |
| **Elvie Pump**, [B0B8SNJ7VW](https://www.amazon.de/dp/B0B8SNJ7VW?language=de_DE) | Double (Inklusive Schalen 21/24mm) | **569,17€ Gesamtanzeige**, Nur noch 1 auf Lager; Zustand nicht separat bestätigt; `partial` | GRATIS Lieferung Dienstag, 8. Dezember Oder schnellste Lieferung Donnerstag, 22. Oktober. |
| **Philips Avent SCF547/11**, [B0DWTCG66J](https://www.amazon.de/dp/B0DWTCG66J?language=de_DE) | Doppelmilchpumpe | **147,99€ Gesamtanzeige**, Auf Lager; Neu (2) ab 147,99€147,99€ Kostenlose Lieferung.; `verified` | GRATIS Lieferung Montag, 19. Oktober Oder schnellste Lieferung Morgen, 16. Oktober. |
| **eufy S1 T8D02**, [B0D6YFQ6N8](https://www.amazon.de/dp/B0D6YFQ6N8?language=de_DE) | S1; exact Amazon pump quantity remains unconfirmed | **189,99€ Gesamtanzeige**, Auf Lager; Selected variant JSON buyingOptionType NEW; `partial` | GRATIS Lieferung Montag, 19. Oktober Oder schnellste Lieferung Morgen, 16. Oktober. |

M5 Smart ist **Single**, Air 1 und Freestyle sind Doppelangebote. Die Preise sind deshalb kein fairer Preisvergleich je Doppelsystem. Elvie zeigt „auf Lager“, aber zugleich die ungewöhnlich späte Standardlieferung **8. Dezember** und schnellste Lieferung **22. Oktober**; Lagerstatus darf nicht zu „morgen lieferbar“ verkürzt werden. Bei S1 ist das genaue deutsche Amazon-Pumpenpaket über die Auswahl „S1“ hinaus nicht vollständig abgeglichen; das EU-Herstellerkit darf dessen Stückzahl nicht ersetzen.

### Wichtige zusätzliche Sets – keine zusätzlichen Modelle

- **eufy S1 Pro mit Ladecase**, [B0DCZKZDJK](https://www.amazon.de/dp/B0DCZKZDJK?language=de_DE): **269,99€**, auf Lager, Verkäufer AnkerDirect DE, **Neu (10) ab 269,99€**, Standardlieferung 19.10./schnellste 16.10. Damit gibt es jetzt auch einen gelesenen exakten Case-Angebotspfad; nicht dem S1-Grundset B0D6YFQ6N8 zuschreiben.
- **Air 1 weiteres Zweierset**, [B0GHHG2VXB](https://www.amazon.de/dp/B0GHHG2VXB?language=de_DE): **399,99€**, auf Lager, Smartlin. Nicht als neues Pumpenmodell zählen; Farbe dieses zweiten Ziels nicht separat belegt.
- **M5 Smart Rot 2 Pack**, [B0GSMR877B](https://www.amazon.de/dp/B0GSMR877B?language=de_DE): genaue Produktseite, aber „Derzeit nicht verfügbar“. Das widerspricht nicht dem verfügbaren grauen Single oder anderen aktuellen Double-Varianten.
- **Philips SCF531/11 Single**, [B0DWTFG3LJ](https://www.amazon.de/dp/B0DWTFG3LJ?language=de_DE): 129,99€, auf Lager, Neu (2). Hier konservativ als Single-Setpfad geführt, nicht als zusätzliche Technikgeneration gezählt; vollständige technische Gleichheit zu SCF547/11 nicht geprüft.
- **Philips SCD596/21**, [B0H4W77YNV](https://www.amazon.de/dp/B0H4W77YNV?language=de_DE): 259,99€, auf Lager, Neu (2). Bundlepfad der Natural-Care-Recherche; nicht ohne Teileabgleich als zusätzliche Modelltechnik zählen.

## Zusätzliche Modelle für die nächste Inventarprüfung

| Hersteller-/Markenmodell | Exakter Amazon.de-Beleg | Aktuelle Beobachtung | Primärbeleg und Grenze |
|---|---|---|---|
| **Ardo Alyssa Hands-Free** | [B0CY2ZXJCW](https://www.amazon.de/dp/B0CY2ZXJCW?language=de_DE) | 199,99€; Nur noch 4 auf Lager; Verkäufer Ardo medical; `partial` | [Ardo Alyssa Hands-Free](https://ardo.de/products/ardo-alyssa-hands-free): BH-Schalen, App, „Schlauch mit Schlauchadapter“. Andere Bauform als die integrierte Melia; nicht als Melia-Variante zusammenlegen. |
| **Philips Avent Natural Care SCF495/11** | [B0H4WJ9YCN](https://www.amazon.de/dp/B0H4WJ9YCN?language=de_DE) | 209,99€; Auf Lager; Verkäufer nicht separat extrahiert; `verified` | [Philips SCF495/11](https://www.philips.de/c-p/SCF495_11/doppelte-elektronische-milchpumpe-natural-care-hands-free-tragbar): 2 Motoreinheiten, 2 Schalen, 27-mm-Brustkissen und 15/17/19/21/24-mm-Einsätze. Nicht mit SCF547/11 und dessen externem Einzelmotor/Schläuchen vermischen. |
| **Fizimed Emy Pump** | [B0D9LV8YLF](https://www.amazon.de/dp/B0D9LV8YLF?language=de_DE) | 89,00€; Nur noch 18 auf Lager; Verkäufer Fizimed; `verified` | [Fizimed Emy Pump](https://emy.fizimed.com/de-eu/products/tragbare-milchpumpe-emy): direkt im BH; keine App erforderlich; Herstellerkit 28 mm + 15/17/19/21/24-mm-Aufsätze. Auswahl auf Amazon „1 Stück / Standard“, nicht Doppelset. |
| **eufy E10 (T8D03)** | [B0D6W5PBKX](https://www.amazon.de/dp/B0D6W5PBKX?language=de_DE) | 129,99€; Auf Lager; Verkäufer AnkerDirect DE; `verified` | [eufy EU-Vergleich auf der S1-Seite](https://www.eufy.com/eu-en/products/t8d02381): E10 ohne Wärme, ohne Case, mit App. Amazon-Detaildaten nennen T8D03; die Variantenfamilie enthält auch E20 und reine Ersatzteile. |
| **eufy E20** | [B0F1Y3S96S](https://www.amazon.de/dp/B0F1Y3S96S?language=de_DE) | 149,99€; Auf Lager; Verkäufer AnkerDirect DE; `partial` | [eufy E20 EU](https://www.eufy.com/eu-en/products/t6060321): eigenständiges beheiztes Wearable. Nicht allein wegen ähnlicher Wärmefunktion mit S1 verschmelzen. Keine Milchmengensteigerungs- oder medizinische Wirksamkeitsbehauptung übernommen. |

Diese fünf Identitäten sind gegenüber den 35 Bestandstupeln neu. Nur **Fizimed** ist dabei eine im Bestand noch nicht vertretene Marke. Die Primärseiten dokumentieren Funktionen und Produktnamen, keine marktweite Überlegenheit oder unabhängig bewiesene OEM-Eigenständigkeit.

### Weitere Leads / bewusst nicht hochgezählt

- **YOUHA The Ins Gen 1 und Gen 2:** modellgenaue regionale Markenseiten vollständig textuell gelesen ([Gen 1](https://youha.de/products/youha-the-ins-gen-1-doppelte-milchpumpe-mit-app), [Gen 2](https://youha.de/en/products/youha-the-ins-gen-2-breast-pump-with-app)); separate Generationen, keine Farben/Sets. Kein passendes Amazon.de-Angebot im Suchlauf gemappt. **Evera** bleibt nur ein Suchlead, nicht als gelesene Produktseite ausgegeben.
- **Bellababy W38/W40/W42:** Herstellerbeitrag nennt die Modelle, Extraktion liefert aber keine belastbare technische Zuordnung. [B09Q34G1VG](https://www.amazon.de/dp/B09Q34G1VG?language=de_DE) ist eine echte Bellababy-DE-Detailseite ohne aktuelles Angebot, jedoch ohne bewiesenen W38-Code. B09QJVFYPQ lieferte keinen ausgewählten Produktinhalt. Keine Gleichsetzung nach Gehäuse, ausländischer ASIN oder Zubehör.
- **Haokoo:** Amazon-only-Leads B0H296PBD1 (Referenz **EUABP1306-A1**, Single, auf Lager), B0DFM7GGGQ (**GLE33**, derzeit nicht verfügbar), B0FM85BQGV (nur Referenz **1 Pack**, derzeit nicht verfügbar). Keine belastbare modellgenaue Herstellerzuordnung; letzterer ist keine zusätzliche Modellidentität. Preis/Zustand/Lieferung dieser drei Leads nicht vollständig geprüft.
- **TSRETE / GROWNSY / Paruu / MomMed:** mehrere Marken- und breitere Folgeanfragen lieferten keine zuverlässig gemappte neue DE-Modellidentität in diesem Lauf. Zubehör, Sterilisatoren, manuelle GROWNSY-Sammler und sachfremde Treffer verworfen; daraus folgt keine Markt-Abwesenheit.
- **Haakaa / passive Milchauffangschalen / Handpumpen** gehören nicht zum elektrischen Wearable-Inventar.

## Bestand: keine historischen Identitäten ersetzen

| Vorhandene Identität | Frisch gelesene ASIN(s) | Ergebnis dieses Laufs |
|---|---|---|
| Ardo Melia | B0D9444NPD | Angebot beobachtet · `partial` |
| Bebeconfort Discreet (3101202300) | B0DT4S8TP4 | Angebot beobachtet · `verified` |
| Elvie Pump | B0B8SNJ7VW | Angebot beobachtet · `partial` |
| Elvie Stride | B0B5HFP4Y1 | Angebot beobachtet · `partial` |
| Elvie Stride 2 | keine exakte Seite bestätigt | Angebot nicht bestätigt · `not-confirmed` |
| eufy S1 (T8D02) | B0D6YFQ6N8 | Angebot beobachtet · `partial` |
| eufy S2 Pro (Amazon T60A1; Hersteller T600P + T60A0) | B0GWH8M9DD | Angebot beobachtet · `partial` |
| Kinderkraft MAMAFLOW | B0G3PZR61C | Angebot beobachtet · `verified` |
| KISSBOBO K5 | B0F3HY4N15 | Angebot beobachtet · `verified` |
| Lansinoh Tragbare Milchpumpe (Wearable) | B0DKTTNJQ8 | Angebot beobachtet · `verified` |
| Lionelo Fidi Free Slim (LOC-FIDI FREE SLIM) | B0GGJ3FCGR | Angebot beobachtet · `verified` |
| Medela Freestyle Hands-free | B0BKGFBKHJ | Angebot beobachtet · `verified` |
| Medela Freestyle Mini Hands-free | B0GL2ZZXXS | Angebot beobachtet · `verified` |
| Medela Melody InBra | B0G8L9ST82 | Angebot beobachtet · `verified` |
| Medela Motion InBra | B0FPML11YW | Angebot beobachtet · `verified` |
| Medela Solo Hands-free | B0CG9JTMWK | Angebot beobachtet · `partial` |
| Medela Swing Maxi Hands-free | B0D6Z5P198 | Angebot beobachtet · `verified` |
| Momcozy Air 1 | B0G2MQH1DF | Angebot beobachtet · `verified` |
| Momcozy M5 | B0FJS124D3 | Detailseite ohne aktuelles Angebot · `not-confirmed` |
| Momcozy M5 Smart | B0G1MWP4FB | Angebot beobachtet · `partial` |
| Momcozy Mobile Flow M9 | B0GX538F1R | Angebot beobachtet · `partial` |
| Momcozy Mobile Style M6 | B0CTKLFN57 | Angebot beobachtet · `verified` |
| Momcozy S12 Pro | B0FMY5J5GF | Detailseite ohne aktuelles Angebot · `not-confirmed` |
| Momcozy S12 Pro Quick | B0GJBRVR54 | Angebot beobachtet · `partial` |
| Momcozy S9 Pro | B0H59ZRQWQ | Angebot beobachtet · `partial` |
| Momcozy V1 Pro | B0FQBRN294 | Angebot beobachtet · `partial` |
| Momcozy V2 Pro | B0H18FRZDT | Angebot beobachtet · `partial` |
| NCVI 8131 | B0H4ZCN5J3 | Angebot beobachtet · `partial` |
| NCVI AM8161A (beheiztes Wearable) | B0G7FJ6XKC | Angebot beobachtet · `partial` |
| Neno Sole (beobachtete Variante Sole Twin) | B0G59DYCBX | Angebot beobachtet · `verified` |
| Nuliie S32 | B0GVHXGYFC | Angebot beobachtet · `partial` |
| Perifit Pump | keine exakte Seite bestätigt | Angebot nicht bestätigt · `not-confirmed` |
| Philips Avent Hands-free elektrische Doppelmilchpumpe SCF547/11 | B0DWTCG66J | Angebot beobachtet · `verified` |
| Tommee Tippee Made for Me In-Bra Wearable | B0BF1D2MCH | Angebot beobachtet · `partial` |
| Willow Go (PDL60) | B0B2SK47X6 | Angebot beobachtet · `verified` |

**M5 und S12 Pro sind nicht mehr bloß „keine Seite gefunden“:** genaue Seiten B0FJS124D3 (M5, Grau Double) und B0FMY5J5GF (S12 Pro, Weiß Single) wurden neu gelesen, zeigten aber keine Angebote. Veraltete Suchauszüge mit 74,99€ und bereits vergangenen Lieferdaten wurden nicht übernommen. Elvie Stride 2 und Perifit Pump bleiben ohne passend bestätigten Amazon.de-Pumpenpfad; Stride-1- und Perifit-Beckenbodentrainer-Treffer sind keine Ersatzbelege.

Der Datensatz vom 14.10. und sein historisches **31 Angebote / 4 nicht gefunden** bleiben erhalten. Das alte JSON allein klassifiziert 25 integrierte + 1 vorläufige + 9 externe Bauformen; die bestehende MAMAFLOW-Anleitungs-Ergänzung bestätigt aktuell **26 integriert / 9 extern**. Dieser Recheck ändert keine Bauform oder Schlüssel. KISSBOBO-K5-DE-Mapping, NCVI-AM8161A-Suffix, eufy-S2-Pro-Regionalkomponenten und Willow-PDL60-Revision bleiben genau so eingeschränkt wie im gelesenen Overlay.

## Fallbezogene Empfehlungen verbessern – nicht nach Lagerbestand sortieren

1. **„Schlauchfrei, direkt bedienbar“ → M5 Smart**, mit Elvie Pump als sichtbarer Sensor-Alternative. Hersteller-M5-Seite bestätigt optionale App und vier Reinigungsteile; manuelles Milchmengenprotokoll ist keine Sensormessung. Elvie dokumentiert Infrarot-Sensoren und Pause bei voller Flasche. Keine Überlegenheit bei Milchmenge, Passform, Sensorpräzision oder Reinigungszeit ableiten. Den Single-Hinweis vor dem M5-Kauflink erhalten.
2. **„Motor außerhalb des BH“ → Freestyle Hands-free**, mit SCF547/11 als konkretem DE-Größenkit-Gegenspieler. Medela beschreibt separaten Taschenmotor und dreiteilige Schalen; Philips nennt 1 Motor / 2 Silikonschläuche / 21- und 24-mm-Brustkissen / 19-mm-Einsätze. Nicht „drei Teile für das ganze Doppelsystem“ schreiben. Ardo Alyssa Hands-Free ergänzt künftig die Auswahl für diesen Fall, nicht automatisch den ersten Rang.
3. **„Zwischen Sitzungen im Case laden“ → Air 1**, alternativ das jetzt exakt gelesene **S1-Pro-Case-Bundle B0DCZKZDJK**, nicht das S1-Grundset. Air beschreibt Vollmeldung und danach selbst ausschalten, also keinen belegten sensorbedingten Autostopp. Ladecase ist kein Kühler und ersetzt keine Reinigung.
4. **Optional eigener Fall „Wärme am Flansch“**: S1 ist dafür dokumentiert; neu entdecktes E20 gehört in den nächsten Funktionsvergleich. Wärme allein rechtfertigt keinen S1-Siegerstatus oder ein Versprechen von mehr Milch. Herstellerangaben zu Heizfunktion, Pumpenanzahl, Case und optionalen App-Rhythmen sauber trennen.
5. **Neue Passform-Alternative statt Markenquote:** Emy Pump dokumentiert 28-mm-Basis plus fünf kleinere Aufsätze und Nutzung ohne App. Philips SCF495/11 bringt ein anderes Zwei-Motor-Kit als SCF547/11. Diese konkreten Größen-/Bedienungsfälle sind redaktionell nützlicher als willkürliche Leistungsplätze 1–5.

Die vorgeschlagene Reihenfolge **M5 Smart → Freestyle Hands-free → Air 1** kann als Navigation verschiedener Routinen bleiben. Sie ist keine empirische Top 3. Zwei Momcozy-Karten sind nur durch unterschiedliche Einsatzfälle gerechtfertigt, nicht durch Angebote oder Markenquote. Neue Kandidaten erst nach vollständiger Kit-, Anleitung-, Teile- und Sicherheitsprüfung in die Site aufnehmen.

### Herstellerquellen für diese Auswahlgründe

- [M5 Smart: Bedienung, Teile, manuelles Protokoll und Implantatwarnung](https://de.momcozy.com/products/m5-smart-wearable-breast-pump-upgraded-with-app-control)
- [Air 1: Case, Vollmeldung, manueller Abschluss und Reinigung](https://de.momcozy.com/products/momcozy-air-1-ultra-slim-breast-pump)
- [Medela Freestyle: separater Motor und dreiteilige Schalen](https://www.medela.com/en/breastfeeding-pumping/products/pumps/hands-free-electric/freestyle-hands-free-double-electric-wearable-breast-pump?productId=4072)
- [Elvie Pump: echte UK-Produktseite im Browser gelesen; Infrarotsensoren und Vollstandpause](https://uk.elvie.com/products/elvie-pump)
- [Philips SCF547/11: DE-Lieferumfang](https://www.philips.de/c-p/SCF547_11/hands-free-elektrische-doppelmilchpumpe)
- [eufy S1 EU: Wärme, manuelles Mengenprotokoll und Lieferumfang](https://www.eufy.com/eu-en/products/t8d02381) / [S1 vs S1 Pro: Case-Unterschied, US-Herstellerseite](https://www.eufy.com/blogs/baby/eufy-s1-vs-s1-pro-breast-pump)

## Methoden- und Zugriffsgrenzen

- Anfangs gab es einen Browser-Timeout, eine HTTP-200-Antwort ohne Produktinhalt und beim M5-Extractor eine generische Homepage. **Nicht** als erfolgreiche Produktverifikation gewertet. Chrome DevTools mit isoliertem anonymen Kontext funktionierte; die ASIN-Seiten wurden dort same-origin geladen und Produkt-DOM, `#ASIN`, `#productTitle`, Buybox, Liefertext sowie ausgewählte Varianten tatsächlich geprüft.
- Ein Textabruf für Freestyle/Air zeigte **USD / Vereinigte Staaten** trotz deutscher Sprache. Nicht als DE-Lieferbeleg verwendet; passgenaue Rust/EUR-Beobachtungen sind getrennt protokolliert.
- „Neu“-Angebotslinks wurden auf den Produktseiten gelesen; ergänzend wurde `buyingOptionType: NEW` nur aus dem jeweils **SELECTED** Variantenwert ausgewertet. Versuche, das All-Offers-Panel direkt zu laden, endeten mit **404**; deshalb kein Anspruch, alle Verkäufer oder alle Neuangebote gesehen zu haben. Fehlende Neu-Information bleibt offen.
- SearXNG war nicht erreichbar; Suchtool nutzte Exa-Fallback. Einige Hersteller-Extraktionen lieferten nur Seitenausschnitte/Shop-Kurztext oder Timeouts; dort wurde auf kanonische Fundstellen bzw. echtes gerendertes Elvie-/Ardo-DOM gewechselt. Abgelehnte Ergebnisse und Recherchebatches bleiben im JSON.
- Keine Konten, Käufe, Registrierung, Apify, bezahlten Aufrufe, Produktfoto-Downloads oder Commits. Nur die zwei neu zugewiesenen Dokumente wurden angelegt. Neutrale Quelllinks enthalten absichtlich keine Affiliate-Tags; spätere kommerzielle Site-Ziele müssen den bestätigten Tag und Sponsored-Kennzeichnung beibehalten.

## Maschinenlesbares Protokoll

`amazon-market-release-recheck.json` enthält Original-Suchbatches, Rohtext der Herstellerabrufe, genaue aktuelle ASIN-/Titel-/Preis-/Liefer-/Setbeobachtungen, getrennte Variantenprüfungen und unter `releaseRecheck` die Python-deduplizierte Zusammenführung mit 35 unveränderten `modelRef`-Tupeln. `normalizedOfferObservations` ist die konsolidierte Lesesicht; frühere Batchfelder bleiben als Provenienz erhalten. Geldbeträge sind beobachtete Gesamtanzeigen, keine Preisgarantie oder nachgerechneten Endpreise.
