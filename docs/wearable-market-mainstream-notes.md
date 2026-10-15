# Amazon-DE-Marktübersicht: Mainstream-Batch

Stand der Erhebung: 14.10.2026, UTC-Zeitstempel je Modell im JSON. Gezielter Suchlauf, kein vollständiges oder dauerhaft gültiges Amazon-Sortiment.

## Ergebnis und Validierung

- 24 nach Hersteller und tatsächlichem Modell deduplizierte Modellzeilen.
- 19 `public-offer-observed`, 1 `detail-found-offer-unverified`, 4 `not-found`, 0 `blocked` im abschließenden Modellstatus.
- 20 echte, zum Modell passende Amazon-DE-Detailseiten mit ausgewählter ASIN gelesen; davon eine ohne verifiziertes Angebot.
- 24 Hersteller-Evidenzzitate sowie 86 Quellenzitat-Vorkommen gegen die gelesenen Texte geprüft; 44 referenzierte Quellen im eingebetteten Ledger.
- 15 vollständig im BH integrierte elektrische Wearables, 9 Systeme mit BH-Bechern, Schläuchen und externem portablem Motor.
- Keine Testnoten, Rangfolge, Suchvolumina oder gemessenen Vergleichswerte. `rankingEvidence` beschreibt Bauform-Qualitäten und konstruktive Trade-offs, keine Testergebnisse.

## Modellidentität und wichtige Stolperstellen

- Motion InBra ist ein reales Medela-Modell, nicht bloß ein Suchbegriff.[98]
- Freestyle Mini Hands-free ist ein eigenständiges aktuelles Modell mit separater handtellergroßer Motoreinheit, kein vollständig in den BH integriertes System.[220]
- Zusätzlich wurde Melody InBra als echtes Modell belegt.[225]
- M5 und M5 Smart sind getrennt zu behandeln. Der Hersteller-Support führt das ursprüngliche M5 separat, während die aktuelle deutsche Produktseite M5 Smart mit App-Steuerung beschreibt.[235][182]
- S12 Pro und S12 Pro Quick sind nicht derselbe Generationsdatensatz. Der Hersteller führt das ursprüngliche S12 Pro im Support; auf der Quick-Seite weist er ausdrücklich auf modellspezifisches Zubehör hin.[238][159]
- Elvie Stride und Stride 2 besitzen Schläuche und einen separaten Hub; sie sind nicht mit dem schlauchlosen Elvie Pump gleichzusetzen.[59][224]
- Philips Avent SCF547/11 ist ein elektrisches Doppel-System mit zwei Silikonschläuchen und wiederaufladbarer separater Motoreinheit, keine vollständig integrierte BH-Pumpe.[133]

## Unsichere und negative Amazon-Befunde

- Momcozy M9: konkrete rote Zweierpack-Detailseite gefunden, aber keine Buybox. Der öffentliche Alle-Angebote-Link wurde read-only gelesen, lieferte jedoch wieder eine Detailseite ohne auswertbare Verkäufer-/Lieferdaten. **Nicht als ausverkauft gewertet.** Andere Varianten können Angebote haben.
- Original-M5, ursprüngliches S12 Pro, Elvie Stride 2 und Perifit Pump: in diesem begrenzten Lauf kein modellgenaues Amazon-DE-Angebot verifiziert. `not-found` heißt nicht „auf Amazon grundsätzlich nicht erhältlich“.
- Ein Stride-2-Discovery-Kandidat auf Amazon UK lieferte bei Prüfung auf Amazon.de tatsächlich Titel und ausgewählte ASIN für Stride Single der ersten Generation. Im JSON als verworfener Lead erhalten, nicht als Stride-2-Verfügbarkeitsnachweis.
- Ein älterer geteilter Hersteller-Amazon-Link für Momcozy V1 Pro/V2 Pro führte zu einer generisch betitelten Pro-ASIN mit Nichtverfügbarkeitstext. Modellgenaue, tatsächlich angebotene V1-Pro- und V2-Pro-Detailseiten wurden separat gefunden. Der problematische Lead bleibt dokumentiert.
- Bei Perifit wurde ein Suchtreffer für eine Ersatzflasche nicht als elektrische Milchpumpe gezählt. Ebenso keine Handpumpen, Haakaa-Silikonauffänger oder reine Becher-/Zubehörsets als eigenständige elektrische Wearables aufgenommen.

## Methodik und Grenzen

Öffentliche Suche und Herstellerseiten plus Amazon-DE-Detailseiten per HTTP-GET; Titel, ausgewählte ASIN und Variante gemeinsam gelesen. Keine Konten, Checkout-, Warenkorb- oder Kaufaktionen, kein Apify. Der anonyme Amazon-Seitenkontext zeigte Rust 77977; keine Lieferadresse eingegeben. Liefertermine gelten nur für den beobachteten Kontext. Der Zustand wurde an der Standard-Buybox nicht nochmals gesondert als „Neu“ verifiziert, deshalb ist `condition` null.

Browser-Sitzung `milk-market-mainstream` scheiterte an Timeouts. Einige Such-URLs lieferten Bot-Zwischenseiten, und web_extract erreichte vorübergehend ein Rate-Limit; alternative öffentliche HTTP-GETs ermöglichten die Detailprüfung. Internationale Herstellerseiten wurden ausschließlich zur Modell-/Bauformbestätigung verwendet: keine US-/CA-/FR-Lieferumfänge auf deutsche Varianten übertragen. Fehlgeschlagene oder falsche Modell-Leads sind soweit modellrelevant im JSON erhalten.

Die Daten sind ein Recherche-Batch für nachgelagerte Integration, keine Kaufempfehlung oder Vollständigkeitsbehauptung.

## Sources

[59] https://elvie.com/products/elvie-stride
[98] https://www.medela.com/en/breastfeeding-pumping/products/pumps/inbra-electric/motion-inbra?productId=45198
[133] https://www.philips.de/c-p/SCF547_11/hands-free-elektrische-doppelmilchpumpe
[159] https://de.momcozy.com/products/s12-pro-quick-wearable-breast-pump
[182] https://de.momcozy.com/products/m5-smart-wearable-breast-pump-upgraded-with-app-control
[220] https://www.medela.com/en/breastfeeding-pumping/products/pumps/hands-free-electric/freestyle-mini-hands-free-double-electric-breast-pump?productId=45524
[224] https://elvie.com/products/elvie-stride-2
[225] https://www.medela.com/en-us/breastfeeding-pumping/products/pumps/inbra-electric/melody-inbra?productId=45485
[235] https://support.momcozy.com/article/52731862475161
[238] https://support.momcozy.com/article/52718189260313
