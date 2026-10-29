# Milchpumpe-Vergleich.de

Statisch vorgerenderte React-/Vite-Website für einen transparenten Milchpumpen-Vergleich.

Live: [milchpumpe-vergleich.de](https://milchpumpe-vergleich.de/)

## Entwicklung

```bash
npm install
npm run dev
```

## Qualitätsprüfung

```bash
npm run lint
npm test
npm run preview
```

Der Build erzeugt für alle redaktionellen Seiten eigene HTML-Dateien, Metadaten, strukturierte Daten und die Sitemap im Ordner `dist`.

## Analytics

Google Analytics wird ausschließlich nach Einwilligung und nur auf `https://milchpumpe-vergleich.de` über die feste Mess-ID `G-4MTYQGF7VK` geladen. Vorschau, localhost und andere Ursprünge sind ausgeschlossen. Es wird kein Google Tag Manager eingesetzt. Lokaler Betreiber-Opt-out, datensparsame Ereignisse und die Grenzen der Messung sind in [docs/analytics-measurement.md](docs/analytics-measurement.md) beschrieben.

## Deployment

Der Workflow `.github/workflows/pages.yml` baut `dist` und veröffentlicht das Ergebnis über GitHub Pages. In den Repository-Einstellungen muss unter **Pages → Build and deployment → Source** die Option **GitHub Actions** gewählt sein.

### Changelog-Pflicht bei Veröffentlichungen

Jede Veröffentlichung auf `main` muss den Changelog in dieser README im selben Push aktualisieren. Der Pages-Workflow prüft das automatisch und bricht ab, wenn `README.md` bei einem Push nicht geändert wurde.

Regeln:

1. Neue Einträge werden oben unter **Changelog** ergänzt.
2. Jeder Eintrag nennt Datum, Art der Änderung und die wichtigsten Auswirkungen.
3. Changelog und zugehörige Dateien werden gemeinsam committed und gepusht.
4. Reine manuelle Wiederholungen eines bestehenden Workflows benötigen keinen neuen Changelog-Eintrag.

## Changelog

Alle wesentlichen Änderungen an der veröffentlichten Website werden hier in umgekehrt chronologischer Reihenfolge dokumentiert.

### 29. Oktober 2026 – Quellengebundene SEO-/GEO-Vertiefung und saubere Messung

- Flanschgrößen- und Reinigungsgrundlagen mit modellbezogenen Herstelleranleitungen, Entscheidungstabellen, FAQs, praktischen Checklisten und direktem Zugang zu vorhandenen kostenlosen PDFs erweitert. Quellen und tatsächliche Recherchedaten mit den Metadaten abgestimmt; keine neuen dünnen Artikelrouten ergänzt.
- Den bestehenden Vergleich M9 versus ursprüngliche S12 Pro um die verifizierte Original-US-Anleitung und die deutsche Kurzanleitung ergänzt; Original, Quick, Regionalfassung und tatsächliches Händler-Set bleiben getrennt.
- Nicht für Produkt-Snippets qualifizierte Product-Knoten einschließlich verschachtelter Artikelthemen durch ehrliche Themenentitäten ersetzt. Article-, WebPage-, Breadcrumb- und Bestandslisten bleiben vollständig; keine Preise, Sterne oder Reviews erfunden.
- Analytics auf die exakte HTTPS-Produktionsdomain und aktuelle Einwilligung begrenzt. Betreiber-Opt-out ergänzt, Suchtexte und freie URL-Parameter aus den eigenen Ereignissen ausgeschlossen und bestehende Pinterest-Kampagne über festgelegte Kennungen erhalten.
- PDF-Linkklicks, reale Vergleichs-/Finder-Aktionen und bisher nicht erfasste Marktübersicht-Affiliate-Links messbar gemacht. Vorschau-Traffic wird nicht als Produktionsnutzung erfasst; Ereignisse bleiben von Verkäufen und abgeschlossenen Downloads getrennt.
- Tatsächlichen Redaktionshintergrund, Prüfablauf, Korrekturprotokoll und Datenschutzbeschreibung ergänzt. Historische Fizimed-Angebotsnotiz absolut datiert und M9-Pflegeplanung von ungemessener Reinigungszeit getrennt; ursprüngliche Angebotsbelege unverändert erhalten.
- Bestehende 56 Sitemap-Routen, 35 Ratgeber und alle direkten PDFs erhalten. Automatisierte Regressionstests, responsive Browserprüfung und kontrollierte Analytics-Tests ohne Übertragung von Testtraffic in das echte Konto ergänzt. Deployment und Googles spätere Neuverarbeitung werden separat verifiziert.

### 16. Oktober 2026 – Fünf Gratis-Guides und direkter PDF-Zugang

- Fünf eigenständige vierseitige A4-Arbeitsblätter mit insgesamt 222 ausfüllbaren Feldern, Primärquellen und realen PDF-Vorschauen ergänzt: Unterwegs, Arbeitsplatz und Übergabe, Reinigung und Teileroutine, Passform-Beratung sowie Set- und Teilepass.
- Fünf warme V15-Landingpages und `/gratis-guides/` mit unabhängigem Gratis-Download, Navigation, Metadaten, Sitemap und bedarfsgeladenem Seitenmodul ergänzt; alle 50 ursprünglichen Inhaltsrouten und 35 Ratgeber bleiben erhalten.
- Ursprünglichen achtseitigen Kaufcheck unverändert direkt ohne E-Mail zugänglich gemacht. Newsletter bleibt freiwillig und bis zum tatsächlichen DOI-, PDF-, Abmelde- und weiteren Freigabenachweis deaktiviert.
- Kaufcheck-Landingpage auch bei deaktiviertem Newsletter als vollständiges HTML erzeugt: Der Direktdownload bleibt erreichbar, während Formular und Sitemap-Freigabe weiterhin gesperrt sind.
- Eigene Formular-Rückmeldung verhindert die Navigation auf rohe Provider-JSON-Antworten; Einwilligung, Hydrierungssperre und exakte Formularidentität bleiben kontrolliert. Datenschutzabschnitt für Newsletter und PDFs ergänzt, Website-Analytics unverändert erhalten.
- Zehn originale Pinterest-Grafiken samt Text-/Linkpaket fertiggestellt; Website-Dateien sind noch keine veröffentlichten Pinterest-Pins.
- Produktionsbuild, TypeScript und 369 Tests auch aus dem exakten gestagten Dateibaum ohne private oder unversionierte Hilfsdateien bestanden. Veröffentlichungsnachweise werden getrennt vom lokalen Prüfergebnis geführt.

### 15. Oktober 2026 – Gezielt laden und Vergleiche wieder öffnen

- Browser lädt nur die benötigte Seitenfamilie statt sämtliche Ratgeber-, Katalog- und Marktdaten auf jeder Seite. Vollständiges vorgerendertes HTML und derselbe Seitenbaum bleiben erhalten; Cookie-Auswahl funktioniert auch bei verzögertem oder fehlgeschlagenem Seitenmodul.
- Vergleichsauswahl über kontrollierte Modell-IDs in Links wiederherstellbar gemacht; Tauschen, Zurücksetzen und Zurück-/Vorwärtsnavigation berücksichtigen den URL-Zustand. Linkkopie mit beschriftetem manuellem Ersatzweg ergänzt.
- Ratgebersuche versteht Umlaute und ae/oe/ue/ss; Escape leert nur die Suche und erhält das gewählte Thema. Freie Suchbegriffe werden nicht zusätzlich gespeichert oder in die URL geschrieben.
- Zwei zu lange mobile Auswahllabels gekürzt, ohne Generation, Single-Variante oder Regionscode zu verlieren. Vollständige Namen und Fakten stehen weiterhin an den Modellkarten.
- Bestehende 50 Inhaltsrouten, 35 Ratgeber, genaue Modell-/Setdaten, Quellen und Affiliate-Ziele unverändert erhalten. Newsletter bleibt bis zu echten Zustell-/DOI-Nachweisen deaktiviert.

### 15. Oktober 2026 – Magazin, Direktvergleich und PDF-Kaufcheck

- Ratgeber-Einstieg als Magazin mit drei Alltagsthemen, Fotostorys, Suche und Themenfilter ausgebaut; alle 35 Artikel bleiben bereits ohne JavaScript crawlbar.
- Zwei auswählbare Detailmodelle gegenübergestellt, Tauschen/Zurücksetzen und Hervorhebung der Unterschiede ergänzt. Fünf elektrische Pumpen und manuelle Haakaa bleiben klar vom 40-Modell-Marktüberblick getrennt; entsprechende Faktenzeilen sind auf Desktop gemeinsam ausgerichtet.
- Lizenzierte Einstiegsfotos als kleinere WebP-Varianten, lokale Schrift vorab und vorhandene Titelbilder der Grundlagenartikel priorisiert geladen. Der freigegebene Homepage-Aufbau bleibt bestehen.
- Ratgeber-CollectionPage mit vollständiger Artikelliste ergänzt und sichtbare Rechercheangaben, Schema, Social-Metadaten und Sitemap auf explizite Datensätze abgestimmt. Unbekannte ursprüngliche Veröffentlichungsdaten werden nicht ergänzt.
- Achtseitigen ausfüllbaren PDF-Kaufcheck mit reproduzierbaren Quellen und Tests produziert. PDF und Kontobelege bleiben außerhalb des öffentlichen Website-Builds.
- Newsletter-Komponente technisch angebunden, aber bis zum tatsächlichen DOI-/PDF-/Abmeldenachweis vollständig deaktiviert. Kein Formularziel und keine Zustellung werden vorgetäuscht.

### 15. Oktober 2026 – Bilder und Leseführung in den Artikeln

- Alle 35 Ratgeber mit zwei zusätzlichen, thematisch zugeordneten Abbildungen direkt im Lesefluss ergänzt; bestehende Titelmotive und Quellen bleiben erhalten.
- Neue redaktionelle Vektorszenen erklären Bauart, Einzel-/Doppelset, Passformprüfung, Teilezuordnung, Reinigung, Vorrat und Transport. Sie sind keine Fotos konkreter Modelle.
- Dokumentarische Themenfotos mit einzeln dokumentierter Gemeinfreiheit beziehungsweise CC-BY-SA-Lizenz lokal eingebunden; sichtbare Urheber-/Lizenzlinks und Bearbeitungshinweise sowie öffentliche Lizenzdatei ergänzt.
- Fotos als kleine responsive WebP-Varianten ausgeliefert, Abmessungen reserviert und zusätzliche Artikelbilder verzögert geladen.
- Geschätzte Lesezeit, direkte Sprünge zu Inhalt, Produktbeispielen und Quellen sowie ein auf großen Bildschirmen zweispaltiges Inhaltsverzeichnis ergänzt. Leichte Typografie und warme Gestaltung bleiben erhalten.
- Öffentliche selbstreferenzielle Produktionshinweise bereinigt; medizinische Grenzen, Herstellerbelege, Werbekennzeichnung und Affiliate-Ziele bleiben bestehen.

### 15. Oktober 2026 – Klarerer Pumpeneinstieg und Direktvergleich

- Freigegebenen Homepage-Feinschliff mit früherer Modellauswahl, klar beschrifteten Aufbau-/Bedienungsmerkmalen und nützlichem Einzel-/Doppelset-Hinweis übernommen.
- Die vollständige 40-Modellübersicht ist direkt vom Einstieg erreichbar; Auswahl und Direktvergleich stehen vor den Alltagsratgebern.
- Ausgewählte Modellnamen bleiben am zugeklappten Vergleich sichtbar. Header-Verknüpfung und direkte Sprunglinks öffnen die passenden Auswahlbereiche mit Tastaturfokus.
- Alle Bilddateien und Schriften bleiben lokal; bestehende Quellen, genaue Angebotsvarianten, Affiliate-Kennzeichnung und Einwilligungsverwaltung bleiben erhalten.
- Designimport auf den freigegebenen Versionsstand fixiert, alle Stil-Ebenen übernommen und unabhängige Prüfungen ohne private Medienordner ergänzt.

### 15. Oktober 2026 – Stillalltag-Editorial auf allen Seiten

- Marktbestand auf 40 unterschiedliche Modellidentitäten aus 18 Marken erweitert. 36 Modelle mit am 15.10. beobachtetem Amazon-Angebot; vier ohne bestätigtes Angebot separat gekennzeichnet. Farben, Sets und Zubehör nicht zusätzlich gezählt.
- Kaufhilfe, Homepage-Verzeichnis, Zwei-Modell-Auswahl und Metadaten auf denselben Bestand abgestimmt; begründete Einsatzfall-Empfehlungen mit klarer Ausführung vor den Affiliate-Kaufaktionen.
- Pinterest-Websiteprüfungen auf genaue nicht-sensitive Repository-Testdaten umgestellt; private lokale Produktionsmanifeste sind keine CI-Voraussetzung mehr.

- Freigegebenes warmes Editorialdesign auf Ratgeber, Produktseiten, Vergleich, Marktüberblick, Methodik und Informationsseiten übertragen; gemeinsame Navigation und Footer.
- Methodik mit konkreten Rechercheakten, dokumentarischem CC0-Foto, beschrifteten Bauartdiagrammen und unterschiedlichen Layouts überarbeitet.
- Ratgeber-Einstieg mit lizenzierter Fotografie; große Modellmonogramme durch klar benannte Bauart-Schemata ersetzt. Diese sind keine Produktfotos; exakte Produktfotorechte bleiben offen.
- Verlinkte Setvariante und Quellenstand auf Produktseiten vor der Kaufaktion sichtbar gemacht.
- Homepage- und Marktverzeichnis-Suchintentionen getrennt; stabile WebPage-, Article-, Product- und Listen-Entitäten verknüpft. Keine erfundenen Bewertungen oder Angebote ergänzt.
- Quellenzugang, interne Navigation, `llms.txt`, mobile Typografie und zugängliche Brand-Links nachgeschärft.
- Newsletter-/PDF-Ablauf als Einrichtungsentwurf vorbereitet; kein aktives Formular und kein Versand freigeschaltet.

### 14. Oktober 2026 – Modellbezogene SEO-, GEO- und Pinterest-Kaufhilfen

- 20 zusätzliche recherchierte Modell-/Kaufartikel mit eigenen Suchintentionen, Quellen, Kurzantworten und individuellen Kaufchecks; insgesamt 23 Ratgeber.
- Sechs crawlbare Modellcluster, kontextuelle interne Links und interaktiver Pumpenfinder; keine neuen dünnen Marken-Landingpages.
- Produktwegweiser mit 58 unterschiedlichen Produkten: 18 Pumpen, 13 Aufbewahrungs-/Transportprodukte, 14 Reinigungs-/Zubehörartikel und 13 Produkte für Stillalltag/Füttern; neue Einträge mit konkreten Quellen, Merkmalen und Grenzen statt automatischer dünner Einzel-Landingpages.
- Separat cachebare JavaScript-Bereiche für Bibliotheken, Artikel und Katalogdaten; keine bloße Erhöhung der Chunk-Warngrenze.
- Externe Erfahrungsberichte zu M9 und Freestyle benannt und von aktuellen Herstelleranleitungen getrennt; keine angeeigneten Testnoten oder Fotos.
- Präzisere Such-Titel, vollständiges vorgerendertes HTML und sichtbaren Inhalten entsprechende Article-/Product-Entitäten.
- Aktuelle Amazon-Tracking-ID `andreasboeh09-21`; vier verifizierte Modellziele und klar gekennzeichnete Modellsuchen für unsichere Varianten.
- 20 originale Pinterest-Karten, passende Social-Media-Grafiken und ein UTM-Redaktionsplan; keine fremden Produktfotos oder fingierten Praxistests.
- Frischere Petrol-/Korallpalette, originales SVG-Symbol und reduzierte-Bewegung-kompatible Animationen.
- Einwilligungsabhängige Affiliate-Ereignisse mit Artikel-, Produkt- und Linkposition; keine Verkaufs-/Provisionsbehauptungen aus Websiteklicks.
- Automatisierte Prüfungen für TypeScript, Produktions-HTML, Quellenzuordnung, Metadaten, Links, Generationen und Affiliate-ID.
- Recherche- und Messkonzept in `docs/seo-strategy.md`; Veröffentlichung von Pinterest-Pins und Imagegen-Originalübernahme sind nicht Bestandteil dieses Commits.


### 20. Juli 2026 – Google-Analytics-Datenübertragung

#### Behoben

- Die `gtag()`-Initialisierung auf Googles offizielle `dataLayer.push(arguments)`-Implementierung umgestellt.
- Automatischen GA4-Seitenaufruf nach erteilter Analytics-Einwilligung explizit aktiviert.
- Weiterhin ausschließlich die Mess-ID `G-4MTYQGF7VK` verwendet; keine doppelte Analytics-Einbindung ergänzt.

### 16. Juli 2026 – Nachvollziehbare Veröffentlichungen

#### Hinzugefügt

- Changelog direkt in der GitHub-README angelegt.
- Verbindliche Changelog-Regeln für künftige Veröffentlichungen dokumentiert.
- Automatische Prüfung im GitHub-Pages-Workflow ergänzt: Pushes auf `main` müssen `README.md` aktualisieren.

### 16. Juli 2026 – Vollständiger Struktur- und SEO-Neuaufbau

#### Hinzugefügt

- 16 statisch vorgerenderte und eigenständig crawlbare Seiten.
- Produktdetailseiten für sechs Milchpumpen.
- Ratgeberseiten zu Flanschgröße, Reinigung und Pumpenarten.
- Seiten für Vergleichsmethodik, Redaktion, Impressum und Datenschutz.
- Sitemap, `robots.txt`, Canonical-URLs, Favicon, Webmanifest und Social-Media-Metadaten.
- Strukturierte Daten für Website, Breadcrumbs, Produkte, Vergleichsliste und Ratgeberartikel.
- Crawlbare Haupt- und Brotkrümelnavigation.

#### Geändert

- Nicht belegbare Testnoten, Bewertungszahlen und Testimonials entfernt.
- Produktdaten auf offizielle Herstellerquellen umgestellt.
- Medizinische und hygienische Hinweise mit Behördenquellen ergänzt.
- Website in wartbare Daten-, Komponenten-, Seiten-, SEO- und Analytics-Module zerlegt.
- Mobile Navigation, Vergleichstabelle, Filter und Tastaturbedienung verbessert.
- Farbkontraste, Fokusdarstellung und reduzierte Bewegungen optimiert.
- Abhängigkeiten bereinigt und JavaScript-Bundle verkleinert.
- Rechtstexte auf DDG, MStV und den aktuellen Stand der EU-Streitbeilegungsplattform angepasst.

#### Analytics

- Google Tag Manager vollständig entfernt.
- Ausschließlich Google Analytics 4 mit `G-4MTYQGF7VK` integriert.
- Analytics wird erst nach ausdrücklicher Einwilligung geladen.
- Google-Signale und personalisierte Werbefunktionen deaktiviert.

#### Deployment

- GitHub-Pages-Workflow für den Build aus `dist` eingerichtet.
- Custom Domain über `CNAME` eingebunden.
- Live-Auslieferung der gebauten Assets, Unterseiten, Sitemap und SEO-Dateien verifiziert.

### 15. Juli 2026 – GitHub Pages

#### Hinzugefügt

- Automatisches Deployment über GitHub Actions und GitHub Pages.
- Lockdatei für reproduzierbare Installationen.
- Unterstützung der Custom Domain `milchpumpe-vergleich.de`.

### 28. April 2026 – Analytics-Grundlage

#### Hinzugefügt

- Erste Google-Analytics-Einbindung.
- Ereigniserfassung für ausgehende Affiliate-Links.

### 4. April 2026 – Erste Website-Version

#### Hinzugefügt

- React-/Vite-Grundprojekt.
- Erste Vergleichsseite mit Produktübersicht, Tabelle, Ratgeber und FAQ.
- Cookie-Einwilligungsbanner und rechtliche Inhaltsseiten.
