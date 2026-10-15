# SEO-Ausbau: messbare Modellfragen statt generischer Test-SEO

## Tatsächliche Ausgangslage

Quelle: Search-Console-Export aus der freigegebenen Domain-Property, 14. Oktober 2026. Exportzeitraum 15. Juli bis 11. Oktober 2026 (UI: letzte drei Monate). Originalexport und private Analyse bleiben außerhalb des öffentlichen Repositorys.

- 1.507 Impressionen und 2 Klicks im Tagesaggregat.
- Startseite: 1.507 Impressionen, 2 Klicks, durchschnittliche Position 75,94.
- 51 sichtbare Suchanfragen; überwiegend breite Test-/Vergleichsbegriffe. Die Suchanfragentabelle enthält nur 1.472 Impressionen und keine Klicks. Sie ist nicht vollständig mit den Aggregaten gleichzusetzen.
- 3 indexierte Seiten laut Indexierungsbericht mit Aktualisierung 9. Oktober.
- Die beiden ausgeschlossenen Varianten sind HTTP und WWW der Startseite; ihre Weiterleitungen sind beabsichtigt.
- Zuvor keine eingereichte Sitemap. Bestehende Sitemap am 14. Oktober eingereicht; Search Console bestätigt Verarbeitung ohne Fehler und 16 erkannte URLs. Erkannt heißt nicht indexiert.

## Was der Ausbau konkret verändert

1. **Eigene Zielseite pro konkreter Frage:** 20 neue recherchierte Artikel, zusätzlich zu drei Grundlagenartikeln. Modell-/Teilenummern statt austauschbarer Keyword-Varianten. `docs/content-map.json` dokumentiert die Zuständigkeit jeder URL.
2. **Kein zweites dünnes Markenportal:** Sechs crawlbare Modellcluster auf der vorhandenen Ratgeberseite. Produktdetailseiten bündeln Spezifikationen; Ratgeber beantworten spezifische Entscheidungen.
3. **Informationsgewinn:** Jede neue Seite hat einen individuellen Kaufcheck mit unterschiedlichen Ausgangslagen. Generations-, Mengen- und Teileverwechslungen werden praktisch erklärt.
4. **Klarer nächster Schritt:** Kaufcheck → passende Produktdaten oder offengelegter Amazon-Link. Händlerziele werden als genaues Modell oder Modellsuche beschriftet; abweichende Bundle-/Zubehörziele stehen explizit daneben.
5. **Interne Verlinkung:** Nur Artikel mit gemeinsamen Produktentitäten werden als verwandt ausgewählt. Modellwissen und Zubehör sind in eigenen Themenfiltern auffindbar.
6. **GEO ohne Geheimtrick:** Sichtbare Kurzantwort, Quellen je Abschnitt, Entscheidungstabelle, benannter Autor und dazu passende Article-/Product-Entitäten. Keine fingierten Testbewertungen oder medizinischen Garantien.
7. **Pinterest als separate Nachfragequelle:** 20 eigene 2:3-Themenkarten und 20 Entwürfe mit artikelgenauen UTM-Zieladressen. `docs/pinterest-plan.csv` ist ein redaktioneller Plan, kein zugesichert kompatibler Pinterest-Bulkimport. Pins sind noch nicht veröffentlicht.
8. **Messbarkeit:** Nach Analytics-Einwilligung unterscheiden Affiliate-Ereignisse Produkt, Artikel und Linkposition. Websiteklicks sind keine bestätigten Amazon-Verkäufe oder Provisionen.

## Priorisierung ohne erfundene Suchvolumina

| Priorität | Artikelgruppe | Begründung | Grenze |
|---|---|---|---|
| 1 | M9 ohne App, S12 Pro/Quick, SCF547/SCD553, Elvie Single/Double | Klare Modellentscheidung und hoher praktischer Nutzen bei Verwechslungsgefahr | Der Export belegt für diese neuen Modellfragen noch keine Nachfrage oder gute Position |
| 2 | Philips-Einsätze, Ventile/Membranen, Medela-Cup-Reinigung | Konkreter Teile-/Anwendungsbezug, nachvollziehbare Herstellerquellen | Ersatzteilkauf kann wertvoller sein als Pumpenkauf; nicht künstlich auf eine neue Pumpe drängen |
| 3 | Unterwegs, Hands-free-Kaufhilfe, App-Datenschutz | Verbindet praktische Auswahlfragen mit Produktseiten | Breitere Intentionsabdeckung; nach echten Impressionen weiter zuspitzen |

**Nicht priorisieren:** Weitere nahezu identische Seiten zu „beste Milchpumpe“, „Milchpumpe Testsieger“ und umgestellten Test-Keywords. Keine gemessenen Tests liegen vor; breite Testbegriffe werden nicht mit behaupteter Erfahrung bedient.

## Nach Veröffentlichung prüfen

- Produktions-Sitemap muss die neuen Artikel enthalten. Die bereits eingereichte Sitemap-URL bleibt dieselbe; Google muss sie erneut abrufen.
- URL-Prüfung für wichtige Modellartikel: live abrufbar, Canonical richtig, keine robots-/noindex-Sperre. Nicht wahllos jeden Tag Indexierung beantragen.
- Nach ausreichender Datensammlung je Artikel: nichtmarken-/modellbezogene Suchanfragen, Impressionen, Klicks und CTR. Ein 28-Tage-Vergleich ist erst sinnvoll, wenn die neuen URLs tatsächlich Daten sammeln; kleines Datenvolumen erlaubt keine belastbaren Prozent-Erfolgsversprechen.
- Bei derselben Suchintention auf mehreren URLs zuerst Abgrenzung/Konsolidierung prüfen. Kein neuer Artikel nur wegen einer alternativen Formulierung.
- Gute Impressionen ohne Klicks: Snippet und Intent prüfen. Keine Impressionen: Entdeckung, Indexierung und tatsächliche Nachfrage prüfen, nicht sofort den Text verlängern.
- Pinterest: Sitzungen über UTM-Kampagne `modellfragen`, dann Artikel-/Produktklicks; bestätigte Vergütung nur im PartnerNet-Bericht. Aktive Tracking-ID im HTML ist kein Nachweis, dass das Partnerkonto vergütungsberechtigt ist.

## Bild- und Quellenrechte

Alle neuen Karten und das SVG-Symbol sind eigene Editorialgrafiken, keine Originalfotos von Markenprodukten. Sie werden nicht als Testbelege dargestellt. Für echte Amazon-/Herstellerfotos ist keine pauschale Lizenz nachgewiesen; deshalb nicht übernommen. ChatGPT/Imagegen-Originaldownloads sind noch nicht in diesem Paket enthalten. Quellenverlinkung erlaubt nicht automatisch Bildübernahme.

## Qualitätsgate

TypeScript, Produktionsbuild, Tests auf HTML/Links/Anker/Metadaten, Affiliate-ID, Modellgenerationen und Entscheidungswege. Redaktionelle Faktenprüfung bleibt zusätzlich erforderlich; Tests beweisen keinen Suchrang und keine medizinische Richtigkeit.
