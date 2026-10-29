# SEO-Ausbau: messbare Modellfragen statt generischer Test-SEO

## Arbeitsstand nach dem Audit vom 29. Oktober 2026

Die folgende Ausgangslage ist ein historischer Stand vom 14. Oktober, kein aktueller Leistungsbericht. Neue Kontoexporte und Besucherzahlen bleiben im privaten Nachweisordner.

Für die nächste Ausbaustufe gelten diese Prioritäten:

1. Bestehende wichtige URLs mit der URL-Prüfung untersuchen: Indexstatus, Google-Canonical, Abruf und Sitemap-Zuordnung getrennt festhalten. „Gefunden – zurzeit nicht indexiert“ beweist noch keine technische Sperre oder Qualitätsursache. Indexierung nicht versprechen und Anträge nicht täglich wiederholen.
2. Die bestehenden Grundlagen zu Flanschgröße und Reinigung modellgebunden vertiefen: konkrete Primärquellen, umsetzbare Vorbereitung, passende kostenlose Arbeitsblätter und hilfreiche interne Weiterleitungen statt neuer Keyword-Varianten.
3. Unbeabsichtigte Product-Snippet-Kandidaten einschließlich verschachtelter Article-Themen entfernen, wenn keine geeigneten sichtbaren Offers/Reviews gepflegt werden. Passende WebPage-/Article-/Thing-Entitäten, Quellen und Listen erhalten. Keine Preise, Sterne oder Testberichte erfinden.
4. Analytics auf die exakte Produktionsherkunft und aktuelle Einwilligung begrenzen. Vorschau/localhost dürfen keine Produktionsmessung senden; echte Leser aus einem Referral nicht pauschal ausschließen. Für eigene Besuche eine lokale Opt-out-Einstellung nutzen. Ereignisse und Kontokonfiguration sind in `docs/analytics-measurement.md` beschrieben.
5. Tatsächlichen redaktionellen Hintergrund und Korrekturen offenlegen. Eigene Produktaufnahmen und fachliche Mitprüfung sind erst dann Belege, wenn sie tatsächlich vorliegen; Produktionspläne oder Illustrationen ersetzen sie nicht.

GEO baut auf auffindbaren, textlich zugänglichen Antworten und präzisen Belegen auf. `llms.txt` und Spezialmarkup sind keine Voraussetzung für Google-KI-Suche und keine Garantie für Zitate. KI-Referrals und dokumentierte Antwortstichproben sind verschiedene Messgrößen. Google-Suchzugriff und OpenAI-Suchcrawler sind zudem getrennt von der Einwilligung in Modelltraining zu betrachten.

Veröffentlichungsgate: vollständige portable Tests, TypeScript, Produktionsbuild, alle Sitemap-Routen/Assets/Canonicals, Browserprüfung auf kleinen und großen Viewports sowie anschließender Live-Readback. Lokale Ergebnisse, Deployment und Googles spätere Verarbeitung werden separat dokumentiert.

## Tatsächliche Ausgangslage (historisch: 14. Oktober 2026)

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
6. **GEO ohne Geheimtrick:** Sichtbare Kurzantwort, Quellen je Abschnitt, Entscheidungstabelle, benannter Autor und dazu passende Article-/WebPage-/Thing-Entitäten. Keine fingierten Testbewertungen oder medizinischen Garantien.
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
