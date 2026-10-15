# Kostenlose SEO-Werkzeuge für milchpumpe-vergleich.de

Recherche- und Abrufstand: 14.10.2026. Sieben Werkzeuge anhand tatsächlich gelesener offizieller Produkt-/Hilfeseiten. Dies ist eine Werkzeugrecherche mit öffentlichem Website-Abgleich und einem Messplan, **kein bereits ausgeführter vollständiger SEO-, Lighthouse- oder Konten-Audit**. Keine Anmeldung, Kontoverknüpfung, Installation, Veröffentlichung oder Quellcodeänderung wurde vorgenommen.

## Ausgangslage und wichtigster Befund

- **Übernommene historische GSC-Basis:** 2 Klicks, 1.507 Impressionen und durchschnittliche Position 75,9 über drei Monate stammen laut Aufgabenübergabe aus einem echten Export. Der Export wurde in diesem Auftrag nicht erneut geprüft; Zeitraumgrenzen, Filter und Aktualität sind hier nicht belegt. Diese Zahlen sind ausdrücklich keine neu verifizierten aktuellen Werte.
- **Lokaler Stand:** 31 unterschiedliche Artikel-Slugs wurden programmatisch in `src/milk-guides.json`, `src/buying-guides.ts`, `src/niche-guides-a.ts`, `src/niche-guides-b.ts` und `src/data.ts` gezählt. Die Übergabe nennt außerdem 61 Katalogprodukte, nur 6 Pumpen im Finder, 4 verifizierte Amazon-ASINs und 57 Modellsuchen. Die letztgenannten Bestandszahlen wurden hier nicht separat nachgezählt; Katalog, Finder und genaue Händlerziele dürfen nicht gleichgesetzt werden.
- **Öffentlich beobachtet:** Die abgerufene Startseite trägt noch den Titel „Milchpumpen im Vergleich: 6 Modelle transparent eingeordnet“ und verweist auf eine Aktualisierung am 16. Juli 2026.[16]
- **Öffentliche Sitemap:** Ein unabhängiger HTTP-/XML-Abruf lieferte Status 200 und genau 16 `<loc>`-Einträge: darunter 3 einzelne Ratgeber-URLs und 6 einzelne Produkt-URLs. Der Ratgeber-Index ist zusätzlich enthalten; die übrigen lokalen Artikel-Slugs sind in dieser gelesenen Sitemap nicht aufgeführt. Das belegt eine Differenz zwischen lokalem Artikelbestand und öffentlicher Sitemap, **nicht**, dass alle fehlenden URLs unveröffentlicht oder nicht indexiert sind.[18]
- **robots.txt:** Der gelesene Text enthält `User-agent: *`, `Allow: /` und den Verweis auf die Sitemap. Daraus lässt sich weder eine vollständige Indexfreigabe jeder URL noch ihr tatsächlicher Indexstatus ableiten.[17]

**Priorität:** Erst den öffentlichen Stand und die erreichbaren Artikel prüfen, dann über Snippets und Sichtbarkeit urteilen. Ein lokaler neuer Artikel kann nicht anhand einer alten öffentlichen Sitemap als bereits ausgerollt gelten.

## Werkzeugvergleich: kostenlos ist nicht gleich unbegrenzt

| Werkzeug | Tatsächlich gelesene offizielle Grundlage / Nutzen | Kostenloser Umfang und Grenzen | Kostenpflichtiges / Zugang | Konkreter nächster Einsatz |
|---|---|---|---|---|
| **1. Google Search Console (GSC)** | Kostenloser Google-Dienst für Suchleistung, Crawling, Indexierung und Links.[1] | Eigene Suchleistung statt Markt-Suchvolumen. Konto erforderlich; für diese Website muss ein autorisierter Eigentümer bzw. Nutzer die Property bereitstellen. Diagramm- und Tabellensummen können wegen unterschiedlicher Aggregation auseinanderliegen.[1][19] | Kein kostenpflichtiger Search-Console-Tarif in der gelesenen Quelle. Agenturleistungen oder andere Google-Produkte sind kein Bestandteil der kostenlosen GSC.[1] | Eigentümer exportiert Seiten, Suchanfragen und Datumsdaten mit dokumentiertem Zeitraum, Suchtyp, Land und Gerät. Sitemap-Bericht und URL-Prüfung für die priorisierten Artikel separat sichern. Hier kein Kontenzugriff. |
| **2. PageSpeed Insights (PSI)** | Öffentliche URL-Analyse; offizielle Hilfe beschreibt mobile/desktop Labordaten und CrUX-Felddaten.[2] | Öffentliche Weboberfläche ohne hier benötigte Anmeldung; keine belastbare feste tägliche Gratis-Webabfragezahl in der gelesenen Hilfe. CrUX erfordert genügend echte Stichproben; sonst Ursprung statt URL oder gar keine Felddaten. Feldzeitraum: zurückliegende 28 Tage.[2] | Kein bezahlter Weboberflächen-Tarif in der gelesenen Dokumentation ausgewiesen. API-Nutzung und deren Quoten sind nicht mit der interaktiven Oberfläche gleichzusetzen; kein API-Zugriff eingerichtet. | Nach Erreichbarkeitsprüfung Startseite, Vergleich und einen erreichbaren Ratgeber mobil/desktop messen. URL, Zeit, Gerät, Feldabdeckung und Bericht sichern; fehlende Felddaten als „nicht verfügbar“ erfassen, nicht als bestanden. |
| **3. Lighthouse in Chrome DevTools** | Open-Source-Audits für Performance, Accessibility, SEO und weitere Kategorien; DevTools, CLI und Node-Modul sind offiziell dokumentiert.[3] | Lokaler Test ohne kommerzielle Lizenz; Chrome benötigt, CLI/Node zusätzlich Node. Ein URL-Labortest, kein vollständiger Site-Crawl und kein Ranking- oder Suchvolumenbericht.[3] | Lighthouse selbst ist Open Source. Kommerzielle Monitoring-/Hostingdienste sind davon zu trennen und werden hier nicht beauftragt.[3] | Auf denselben drei Seiten jeweils drei mobile Läufe unter möglichst gleichen Bedingungen; Median der Messwerte und konkrete fehlgeschlagene Audits dokumentieren. SEO-Score nicht als Beleg für Google-Rankings verwenden. |
| **4. Screaming Frog SEO Spider** | Offizielle Produkt- und Preisseite gelesen. Freier Download ohne Registrierung; Grundanalyse von Links, Statuscodes, Titles, Metadaten und Direktiven.[4][5] | **500 URLs pro Crawl**, nicht 500 Artikel. Ressourcen und URL-Varianten bei der Planung mit berücksichtigen. Crawl-Konfiguration, Speichern/Öffnen und fortgeschrittene Funktionen sind in Free eingeschränkt.[5] | Lizenz hebt Crawl-Limit auf und öffnet u. a. JavaScript-Rendering, Custom Extraction und API-Integrationen; jährliche Verlängerung. Die reine Textextraktion der Preisvergleichstabelle verlor die Häkchen — deshalb wurden Funktionsgrenzen gegen den erklärenden Produkttext geprüft.[4][5] | Erst Roh-HTML-Crawl der öffentlichen Website; interne HTML-URLs, 4xx/5xx, Redirects, Canonicals, noindex, Titles/H1 und Inlinks exportieren. Bei Limit Trefferzahl und Abbruch dokumentieren. React-/JS-Inhalte bei Bedarf mit DevTools/Lighthouse prüfen, statt kostenpflichtiges Rendering als gratis auszugeben. |
| **5. Ahrefs Webmaster Tools / Ahrefs Free** | Offizielle aktuelle Seite beschreibt Site Audit, Site Explorer und Web Analytics für verifizierte Websites.[6] | Unbegrenzte Zahl **verifizierter** Websites; Site Audit **5.000 Crawl Credits pro Projekt/Monat**. Credits für HTML mit Status 200; Redirects, Fehler und Nicht-HTML zählen laut FAQ nicht. Site Explorer zeigt bis **1.000 Backlinks bzw. Keywords gleichzeitig**, nicht garantiert einen vollständigen Bericht. Web Analytics bis **1 Mio. Events pro Projekt**; AI Content Helper **1 Dokument/Monat**.[6] | Premium bietet höhere Datenkontingente und Analyse nicht verifizierter Wettbewerber. Registrierung/Verifizierung erforderlich; keine Eigentumsverifizierung oder GSC-Verknüpfung in diesem Auftrag. Web-Analytics-Script nicht installiert.[6] | Optional durch den Eigentümer nach Datenschutz-/Berechtigungsprüfung: technische Fehler und Links der eigenen Domain ergänzend prüfen. Ahrefs-Schätzungen deutlich von echten GSC-Impressionen trennen. Für die erste Runde nicht zwingend nötig. |
| **6. Bing Webmaster Tools** | Offizielle About-Seite nennt kostenlose SEO/GEO-Werkzeuge, Suchleistungsberichte, Backlinks, Keyword Research und Site Scan.[7] | Für eigene Site-Berichte Anmeldung und autorisierte Site-Einrichtung als Voraussetzung einplanen. Die gelesene About-Seite nennt **keine feste aktuelle Site-Scan-Gratisquote**; vor Nutzung im Konto prüfen, keine Zahl behaupten. Bing-Keyworddaten nicht als Google-Suchvolumen ausgeben.[7] | Das auf derselben Seite beworbene Microsoft Advertising ist getrennte, kostenpflichtige Werbung; Werbeguthaben erfordert laut Banner Ausgaben. Kein Kauf und keine Kampagne nötig, um die kostenlosen SEO-Werkzeuge zu beurteilen.[7] | Eigentümer kann Bing-Index-/Sitemapstand und verfügbare Suchdaten getrennt von Google sichern. Kein Kontoimport, keine URL-Submission und keine Kontoaktion hier durchgeführt. |
| **7. Google Rich Results Test** | Google empfiehlt das öffentliche Tool zur Prüfung unterstützter Google-Rich-Result-Typen; für generische Schema.org-Prüfung verweist Google getrennt auf den Schema Markup Validator.[8] | Öffentlicher Einzeltest, kein Site-Crawl. In der gelesenen Quelle sind weder ein kostenpflichtiger Tarif noch eine feste Gratisabfragequote ausgewiesen. Kein Freibrief für inhaltlich falsche strukturierte Daten.[8] | Kein kostenpflichtiger Google-Testtarif in der gelesenen Quelle. Bezahlte Schema-Plugins/Agenturleistungen gehören nicht zum Testwerkzeug.[8] | Einen erreichbaren Artikel und eine Produktdetailseite testen. Erkannten Typ, Fehler und Warnungen sichern; Abgleich mit sichtbarem Inhalt. Keine erfundenen Bewertungen, Angebote oder eigenen Tests ergänzen. Kein Rich-Result-Versprechen. |

**Empfohlener kostenloser Kern:** GSC-Export durch den Eigentümer + Screaming Frog Free + PSI/Lighthouse + Rich Results Test. Ahrefs und Bing optional später. Es wurden keine Keyword-Volumina, Wettbewerbs-Scores, Ranglisten oder Umsatzprognosen erhoben oder erfunden.

## Nächste Mess- und Optimierungsschritte

### P0 — Öffentlichen Bestand klären, bevor Kontendaten interpretiert werden

1. Liste der 31 lokalen Artikel-Slugs mit den 16 öffentlichen Sitemap-URLs abgleichen. Für jede Artikel-URL `https://milchpumpe-vergleich.de/ratgeber/<slug>/` HTTP-Status, Redirectziel, sichtbaren Titel, Canonical, robots-Metatag, Roh-HTML-Inhalt und interne Verlinkung prüfen. Nur tatsächlich gelesene HTML-Antworten als live zählen; eine SPA-Fehlerantwort mit Status 200 ist kein Artikelbeleg.
2. Zusätzlich `/produkte/`, `/vergleich/` und `/ratgeber/` prüfen. Trennen: Katalogeintrag, Finder-Auswahl, Produktdetailseite und Händlerziel. Die 57 Modellsuchen dürfen nicht wie 57 exakt verifizierte ASIN-Angebote beschriftet werden.
3. Dokumentation um Status `lokal / öffentlich erreichbar / Sitemap / GSC geprüft / indexiert` je URL ergänzen. Letzte zwei Felder bleiben ohne Eigentümerdaten **offen**. Erst danach eine vom Eigentümer freigegebene Veröffentlichungs-/Sitemap-Korrektur planen; dieser Auftrag veröffentlicht nichts.
4. Erfolgskriterium: Jede zur Veröffentlichung vorgesehene Seite ist eindeutig erreichbar, liefert passendes HTML/Canonical und ist intern auffindbar; jede Abweichung hat eine dokumentierte Ursache. Nicht sämtliche Redirect- oder noindex-URLs pauschal „reparieren“.

### P1 — Reproduzierbare Nullmessung

- **GSC, Eigentümeraufgabe:** Aktuelle vollständige Vergleichszeiträume exportieren, z. B. abgeschlossene 28 Tage gegen vorherige 28 Tage plus Drei-Monatsübersicht. Exportdatum, exakte Datumsgrenzen, Suchtyp und Filter notieren. Seiten und Queries getrennt auswerten; nicht versuchen, Tabellen- und Diagrammsummen durch erfundene Restdaten gleichzumachen.[19]
- **Technik:** Free-Crawl mit Datum, tatsächlich gecrawlter URL-Anzahl und ggf. 500-URL-Abbruch sichern. Priorisieren: falsche Statuscodes, versehentliches noindex, Canonical-Konflikte und fehlende interne Links vor kosmetischen Title-Längen.
- **Performance:** PSI und Lighthouse auf den drei repräsentativen, zuerst bestätigten URLs ausführen. LCP, CLS, Lab-TBT und — nur bei vorhandenen Felddaten — Feld-INP getrennt erfassen. PSI nennt für „gut“ LCP bis 2,5 s, CLS bis 0,1 und INP bis 200 ms am 75. Perzentil; Laborscore und Felddaten sind nicht austauschbar.[2]
- **Markup:** Rich Results Test nach Fehlern/Warnungen prüfen; sichtbare Produktidentität und Artikelangaben abgleichen. Ein technisch gültiger Test ist kein gemessener Sichtbarkeitsgewinn.

### P2 — Bestehende Artikel gezielt verbessern, nicht weitere dünne Varianten anlegen

- Als **redaktionelle Hypothesen ohne belegtes Suchvolumen** zuerst `reserve-pumpset-reinigen-trocknen-organisieren`, `muttermilch-beschriften-portionen-gefrierfach`, `muttermilch-arbeitsplatz-transport-kuehlkette`, `muttermilch-erwaermen-ohne-flaschenwaermer` und `abgepumpte-muttermilch-flasche-sauger-auswaehlen` prüfen. Die gelesenen öffentlichen Problemquellen und Grenzen stehen in `parent-problems-research.md`.
- Pro URL eine konkrete Einstiegsfrage, direkte kurze Antwort, Entscheidungs-/Ablaufcheckliste, offizielle Belege und sinnvolle Weiterleitung zu genau einem nächsten Schritt. Vorhandene Inhalte schärfen statt dieselbe Frage in mehreren neuen Slugs wiederholen.
- Mobile Alltagstauglichkeit überprüfen: lesbare Schrift, verständliche Begriffe, gut erreichbare Navigation, keine horizontale Tabellenüberbreite. Freundliche Ansprache ohne Schuldzuweisung, Gerätezwang oder erfundene Erfahrungsberichte.
- Titles und Descriptions erst auf Basis passender tatsächlich exportierter Queries ändern; vorher/nachher protokollieren. Bei der übergebenen schwachen historischen Sichtbarkeit zuerst Erreichbarkeit, Indexierung und Intent prüfen, nicht allein CTR optimieren.
- Finder transparent als Auswahl aus 6 Pumpen kennzeichnen, nicht als Vollabdeckung der 61 Katalogprodukte. Produkt- und Zubehörlinks müssen das konkrete Ziel erklären; Affiliate-Offenlegung erhalten.

### P3 — Wirkung prüfen

Nach einer **separat freigegebenen** Umsetzung dieselben technischen Tests wiederholen. Nach einem vergleichbaren abgeschlossenen Messzeitraum GSC je URL/Query mit denselben Filtern vergleichen: Impressionen, Klicks, CTR und Position; zusätzlich Indexstatus dokumentieren. Bei kleinen Stichproben Veränderungen beschreiben, aber weder Kausalität noch Rankinggarantien behaupten. Keine großen Marketingausgaben oder Tool-Upgrades allein wegen eines Health-Scores.

**Messprotokoll-Vorlage, noch keine Messdaten:** Datum | URL | öffentlich bestätigter Stand | Tool/Gerät | Zeitraum/Filter | Status/Canonical | Labormetriken | Feldabdeckung/Feldmetriken | GSC-Status | Maßnahme | erneuter Prüftermin.

## Abrufgrenzen

Der konfigurierte Suchdienst SearXNG war lokal nicht erreichbar; Websuche nutzte den gemeldeten kostenlosen Ersatzdienst. Die offiziellen hier zitierten Seiten wurden anschließend mit Web-Extraktion gelesen. Tariftexte sind Abrufstände, keine Zusicherung dauerhafter Gratislimits. Die Ahrefs-Seite enthält Schätz-/Marketingdaten; daraus wurden keine Domainmetriken abgeleitet. Kein aktueller GSC-/Bing-/Ahrefs-Domainbericht und kein vollständiger Performance- oder strukturierter-Daten-Test liegen aus diesem Auftrag vor.

## Ausgeführte Elternprüfung nach der Recherche

Die folgenden Messungen wurden zusätzlich tatsächlich ausgeführt; sie sind von der reinen Werkzeugrecherche oben zu trennen:

- **Öffentlicher Artikelabgleich:** Alle 31 lokalen Ratgeber-URLs per HTTP abgerufen und Status, H1 sowie Canonical geprüft. Ergebnis: 3 liefern bestätigtes Artikel-HTML mit HTTP 200; 28 liefern HTTP 404. Öffentliche Sitemap: HTTP 200, 16 URLs, davon 3 einzelne Ratgeber. Beleg und vollständige URL-Liste: `public-live-audit.json`; ausführbarer Prüfer: `scripts/audit-live-public.py`.
- **Lighthouse, bestehende Live-Startseite, Mobile/Navigation:** SEO 100, Best Practices 100, Accessibility 96. Zwei fehlgeschlagene Audits: zu geringer Kontrast des Footer-Markenuntertitels und abweichender zugänglicher Name des Header-Links mit sichtbarem „M“. Beleg: `live-lighthouse-summary.json`.
- **Messgrenze:** Dieser Lighthouse-Aufruf schließt Performance ausdrücklich aus. Es wurden dabei weder LCP/INP-Felddaten noch neue Rankings oder ein aktueller GSC-Indexstatus gemessen. SEO 100 bedeutet daher nicht gute Rankings oder vollständige Veröffentlichung.
- **Priorität jetzt:** Die 28 lokal fertigen, öffentlich mit 404 antwortenden Ratgeber sind der konkret belegte Veröffentlichungsrückstand. Vor weiteren kosmetischen Score-Runden den freigegebenen Stand veröffentlichen, Canonicals/Sitemap/Linkpfade erneut prüfen und erst anschließend die tatsächliche Google-Indexierung kontrollieren. Kein eigenmächtiges Deployment in dieser Prüfung.

## Sources

[1] https://support.google.com/webmasters/answer/9128668?hl=en
[2] https://developers.google.com/speed/docs/insights/v5/about
[3] https://developer.chrome.com/docs/lighthouse/overview
[4] https://www.screamingfrog.co.uk/seo-spider/pricing
[5] https://www.screamingfrog.co.uk/seo-spider
[6] https://ahrefs.com/webmaster-tools
[7] https://www.bing.com/webmasters/about
[8] https://developers.google.com/search/docs/appearance/structured-data
[16] https://milchpumpe-vergleich.de
[17] https://milchpumpe-vergleich.de/robots.txt
[18] https://milchpumpe-vergleich.de/sitemap.xml
[19] https://support.google.com/webmasters/answer/7576553?hl=en
