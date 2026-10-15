# Footer: kompakter Review und SEO-/GEO-Spezifikation

Status: Spezifikation für Superdesign, keine Änderung an Produktion, CSS, Daten oder Konten. Umsetzung erst nach ausdrücklicher Freigabe des Canvas. Geprüft wurde der aktuelle lokale Quellstand, nicht die veröffentlichte Website. „GEO“ meint hier auffindbare, verständlich zuordenbare Inhalte für Antwortsysteme, keine zugesicherte KI-Nennung.

## Aktueller Footer-Fokuscheck

Der vorgeschlagene Canvas-Footer wurde in derselben Entwurfs-ID auf Version 3 verfeinert: Links, Affiliate- und Schlusszeile mindestens 14px; Gruppenüberschriften in normaler Schreibweise mit Gewicht 500; benannter Footer-Landmark; drei benannte Navigationsgruppen. Bestehende Marken-, Betreiber-, Methoden-, Kontakt-, Rechts- und Affiliateinformationen bleiben erhalten. Keine neue Generierung oder Credit-Nachkäufe.

Nach dem Remote-Readback geprüft: 320/390/768/1440px, keine gefundenen Footer-Überläufe oder Text-Clippings, mindestens 44px hohe Bedienelemente und gemessener Mindestkontrast 7,4197:1 gegen den einfarbigen Petrolhintergrund. Echte mobile 390px-Emulation bestätigt Größe und Cookie-Vorschau mit Fokus-Rückkehr. Die Vorschau steuert keine Einwilligung der echten Website.

Alle zwölf unterschiedlichen Footer-Seitenziele antworten lokal mit HTTP 200 und passenden Seitentiteln. Live sind `/produkte/`, der Kühltransport- und der Beutel-/Mehrwegartikel noch HTTP 404; zudem fehlt dort der Anker `/ratgeber/#pumpenfinder`. Neuer Footer und seine Zielseiten müssen gemeinsam veröffentlicht werden. Die Live-Seite zeigt weiterhin den älteren Footer. Produktion und Deployment wurden im Footer-Fokuscheck nicht geändert. Vollständige Messwerte: `docs/footer-focused-qa.json`.

## Nachtrag der übergeordneten Prüfung

Die folgenden Befunde sind der historische Review des damaligen Quellstands. Anschließend wurden die technischen Consent-Probleme lokal korrigiert: ausdrücklicher Analytics-Opt-out-Schalter, Löschen der Ereigniswarteschlange, Loader-/Event-Einwilligungsprüfung, Widerruf mit Seitenneuladen bei geladenem Runtime sowie Prüfung ungültiger und abgelaufener Einwilligungen. Die echte lokale Consent-UI verspricht keine Anonymität mehr, hält Tastaturfokus im Dialog, setzt Hintergrundinhalte vorübergehend inert und stellt Fokus/Bedienbarkeit beim Schließen wieder her. Bei 320×568 px ist das Panel auf die verfügbare Höhe begrenzt und scrollbar; es liegt nicht mehr oberhalb des Bildschirms.

Verifikation: 62 Tests, Typecheck, Build und Diff-Prüfung bestanden. Im echten Chromium-Browser funktionierten Vorwärts-/Rückwärts-Fokusfalle, Escape, Fokuswiederherstellung und Ablehnung. Vor bzw. nach Ablehnung waren keine Analytics-Skripte oder Analytics-Ressourcenrequests vorhanden. Der Widerruf bereits geladenen Analytics wurde mit der tatsächlichen lokalen Modulimplementierung in einer kontrollierten Browser-Umgebungsfixture getestet; der öffentlich abgerufene gtag-Code enthält den verwendeten `ga-disable-<ID>`-Schalter. Kein synthetischer Test wurde an das echte Analytics-Konto gesendet. Diese Prüfungen sind keine vollständige Datenschutz- oder Rechtsfreigabe und kein End-to-End-Test sämtlicher automatischer GA-Ereignisse.

Die vier Long-Tail-Routen sind jetzt funktionsfähig, Bilder vorhanden und relatedSlugs umgesetzt. Die ursprünglichen Soft-Brush-Importfehler weiter unten sind historische Diagnose, keine aktuellen Blocker. Canvas-Richtung, lange Methodik und Marktübersichts-UI sind weiterhin nicht als neue Websitegestaltung freigegeben; nichts wurde veröffentlicht.

## 1. Was bereits vorhanden ist

- `src/components.tsx:111–145`: ein semantischer Footer mit Logo, kurzer Beschreibung, fünf Inhaltslinks, Impressum, Datenschutz, Kontakt und einem echten Button zum Wiederöffnen der Einwilligung. Affiliate-Hinweis und Copyright stehen offen darunter.
- Händlerbuttons in derselben Datei tragen `rel="noopener sponsored"` und die Kennzeichnung `*`. `src/data.ts` setzt den Tag `andreasboeh09-21`; vier der sechs Kernmodelle haben direkt zugeordnete ASINs, zwei öffnen Suchergebnisse. Diese Unterscheidung beibehalten. Google empfiehlt `sponsored` für Werbe-/bezahlte Links; das ist eine Suchmaschinenkennzeichnung, kein Ersatz für einen lesbaren Werbehinweis.[5]
- `src/visual-editorial.css:142–151, 191–209` gestaltet den Footer bereits in dunklem Petrol mit hellen Texten, schrumpfbaren Grid-Kindern und zwei-/einspaltigem Mobilraster. Die lokalen Manrope-Schriften unterstützen 300–800. Ein kompletter visueller Neustart ist nicht nötig.
- `src/seo.ts` enthält individuelle Metadaten, `WebSite` und den Betreiber als `Person`, Breadcrumbs, merkmalsbezogene `Product`-Objekte und `Article`-Quellen. `scripts/prerender.tsx` schreibt HTML, Canonicals, Social-Metadaten und Sitemap. Keine erfundenen Sterne oder Angebote ergänzen.
- `public/llms.txt` verweist auf Vergleich, Produktwegweiser, Ratgeber, Methodik und Betreiber. Es ist bereits eine knappe Navigationsdatei, kein Ort für Kaufversprechen.

## 2. Befunde nach Priorität

| Priorität | Konkreter Befund im Bestand | Vorgeschlagene Änderung / Nachweis vor Abnahme |
|---|---|---|
| P0 · Einwilligung | Footer-Button öffnet den Dialog. Ablehnung ruft `resetConsent()` auf; diese Funktion löscht lokale Auswahl und versucht `_ga`-Cookies zu entfernen. Bereits geladenes `gtag.js`, `window.gtag` und `window.gaLoaded` bleiben jedoch bestehen. Der Affiliate-Event prüft die aktuelle Auswahl; das beweist nicht, dass andere GA-Ereignisse nach Widerruf gestoppt werden. | Widerruf technisch vollständig prüfen und umsetzen: weiterer Datentransfer muss tatsächlich gestoppt werden, nicht nur die Cookieanzeige verschwinden. Wiederannahme und abgelaufene Einwilligung gesondert testen. Netzwerkprüfung vor Annahme, nach Ablehnung und nach Widerruf. Fachliche Datenschutzprüfung zusätzlich erforderlich. |
| P0 · Formulierung | Der Dialog heißt „Anonyme Nutzungsanalyse erlauben?“, während die Datenschutzerklärung Geräte-/Nutzungsdaten und IP-Verarbeitung beschreibt. Das Anonymitätsversprechen ist aus dem Quellcode nicht belegt. | Vorschlag für den separaten Consent-Entwurf: „Nutzungsanalyse mit Google Analytics erlauben?“ Keine Anonymität versprechen. Nicht im Rahmen dieses Dokumentauftrags ändern. |
| P0 · Partnerrolle | Footer und Datenschutz behaupten Amazon-Partnerstatus; das Repository belegt Links und Tag, nicht ein aktives, zugelassenes Konto. | Betreiber bestätigt PartnerNet-Status, registrierte Site und aktuellen Pflichtwortlaut. Kein Nachweis von Verkäufen/Provisionen vorhanden. Bedingter Entwurf im Abschnitt 3; keine rechtliche Zertifizierung. |
| P0 · Produkt-/Bilddaten | Produktfotos sind im Rechte-Manifest nicht freigegeben. Kein autorisierter Produktdaten-/Bildzugang und keine Herstellerfreigabe sind hier nachgewiesen. | Nur vorhandene eigene Illustrationen/Logo verwenden. Keine Amazon-Fotos herunterladen, keine Reviewbilder kopieren und keine Herstellerfotos als frei lizenziert behandeln. Bild-/API-/Pinterest-Rechte separat klären. |
| P1 · Orientierung | Die fünf Inhaltslinks sind solide, aber nur globale Hubs. Footerbeschreibung nennt Alltag, lässt den Einstieg zur Passform unkonkret. | Ein kuratierter Zusatzweg „Passform & Reinigung“ mit zwei existierenden Artikeln; keine Markenliste und kein Katalog aller URLs. Vier schlanke Desktopbereiche, zwei auf Tablet, einspaltig auf kleinen Mobilgeräten. |
| P1 · Bedienung | Sichtbare Footerziele haben aktuell `min-height: 40px`; Rechts-/Affiliateblock ist relativ klein. Gruppen bestehen aus `div`, nicht benannten Navigationen. | Mindestens 44px hohe/sinnvoll große Ziele als Projektziel, sichtbarer Tastaturfokus, Linkgruppen als benannte `nav`-Bereiche, Zeilenumbruch ohne Ellipse. Affiliatetext nicht verstecken oder noch kleiner setzen. |
| P1 · Datenstände | `REVIEW_DATE_ISO` ist global `2026-07-16`. Metadaten und Sitemap greifen auf diesen Wert zurück, während einige Seiten/Quellen später verändert/geprüft wurden. MethodologyPage ist als `WebPage` ohne eigenen redaktionellen Änderungsstand angelegt. | Artikeldatum, Quellenabgleich und Angebotssnapshot getrennt führen. Sitemap-`lastmod` nur bei tatsächlicher Änderung; kein automatisch „heute“ datierter Footer als Frischebeleg. |
| P1 · Konsistenz | `RouteSeo.heading` der Startseite („Mit gutem Gefühl entscheiden.“) weicht vom sichtbaren H1 („Für deinen Alltag.“) ab. Das Footerprojekt löst das nicht von selbst. | Separate Metadatenkorrektur nach Freigabe vormerken; sichtbare Texte und Schema-Bezeichnungen abstimmen. |
| P2 · Ruhe | Der große Abstand vor der Affiliatezeile (`margin-top: 4rem`) macht den Footer höher als nötig. Großbuchstabenüberschriften mit weitem Tracking wirken strenger als der übrige Stillalltag-Auftritt. | Abstand in der freigegebenen Variante verkürzen, Überschriften in normaler Schreibweise, Gewicht 500–600; keine Badge-Reihe oder zusätzliche Selbsterklärungswand. |

## 3. Exakte Footertexte für den Canvas

Keine Testimonials, Testplaketten, KI-Qualitätsslogans oder „35 getestete Pumpen“. Das vorhandene echte Markensymbol `/brand-symbol.svg` nutzen, keine neuen Initialenmarken erfinden.

### Markenbereich

Marke: Milchpumpe-Vergleich.de

Text: Milchpumpen vergleichen und den Alltag mit abgepumpter Milch organisieren. Mit Ratgebern zu Passform, Reinigung und Aufbewahrung.

### Navigation „Milchpumpen & Alltag“

| Sichtbarer Link | Ziel |
|---|---|
| Milchpumpen vergleichen | `/vergleich/` |
| Produktwegweiser | `/produkte/` |
| Alle Ratgeber | `/ratgeber/` |
| Passform verstehen | `/ratgeber/richtige-flanschgroesse/` |
| Reinigung organisieren | `/ratgeber/milchpumpe-reinigen/` |

### Navigation „Redaktion“

| Sichtbarer Link | Ziel |
|---|---|
| So entsteht der Vergleich | `/testmethodik/` |
| Über die Redaktion | `/ueber-uns/` |
| Kontakt & Quellenhinweise | `mailto:admin@andreasboehler.com` |

### Navigation „Rechtliches & Einstellungen“

| Sichtbares Ziel | Verhalten |
|---|---|
| Impressum | Link `/impressum/` |
| Datenschutz | Link `/datenschutz/` |
| Cookie-Einstellungen | Echter `button type="button"`; vorhandenes Ereignis `open-cookie-settings` beibehalten. Nicht zu einer leeren `href="#"`-Attrappe umbauen. |

### Offen sichtbare Abschlusszeile

Arbeitsfassung, solange der Kontostatus nicht belegt ist:

> Affiliate-Hinweis: Mit * gekennzeichnete Links führen zu Amazon. Bei einem qualifizierten Kauf über diese Links kann eine Provision entstehen. Für dich ändert sich der Preis dadurch nicht.

Nach Bestätigung der aktiven Teilnahme und Prüfung des aktuellen Partnerprogramm-Wortlauts als gesondert freizugebende Fassung:

> Affiliate-Hinweis: Mit * gekennzeichnete Links führen zu Amazon. Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Für dich ändert sich der Preis dadurch nicht.

Diese Alternative ist keine Behauptung, dass ein notwendiger Programmsatz bei aktiver Teilnahme weggelassen werden darf. Betreiber muss die zutreffende Fassung vor Veröffentlichung festlegen. Auch die „unveränderter Preis“-Aussage und die bisherige Erklärung, dass Provisionen die Redaktion nicht bestimmen, benötigen eine tatsächliche Betreiberbestätigung. Die längere redaktionelle Finanzierungserklärung bleibt auf Methodik/Über uns, nicht in einer weiteren Footerwand.

Copyright: `© 2026 Milchpumpe-Vergleich.de` für den aktuellen Entwurf. Keine Jahreszahl als Beleg eines frischen Produkttests verwenden; bei späterem Jahreswechsel redaktionell bzw. technisch korrekt aktualisieren.

## 4. Gestaltungs- und Responsive-Vertrag

- Desktop: Marke plus drei kompakte Navigationsgruppen auf einem dunklen Petrolgrund `#173c37`; Schlusszeile mit ruhiger Trennlinie über die Gesamtbreite. Tablet: Markenblock oben, Gruppen in einem zweispaltigen, schrumpfbaren Raster. Mobil: klare einspaltige Reihenfolge, alle Ziele sichtbar; Rechtliches und Consent nicht einklappen.
- Creme-/Minttexte aus dem Bestand verwenden. Koralle höchstens als dezente Dekoration, nicht für kleine Pflichttexte. Kontrast der endgültigen Kombinationen messen; nicht allein aus Farbwerten behaupten, er sei ausreichend.
- Manrope lokal, Fließtext 400, Links 500, Gruppenüberschriften höchstens 600. Körper- und Hinweistext im Canvas etwa 14–16px, Zeilenhöhe etwa 1.6–1.8; keine winzige 10-/11px-Rechtszeile. Pixelwerte sind Designziele, keine bereits umgesetzten Ergebnisse.
- Grid-Tracks `minmax(0, 1fr)`, Kinder `min-width: 0`; E-Mail, Marke und lange Linknamen dürfen umbrechen. Keine festen Textblockhöhen, `line-clamp`, `text-overflow: ellipsis` oder Überlaufmaskierung als Reparatur. Vorhandene Clippingkorrekturen nicht überschreiben.
- Kein neuer großer Fotohintergrund im Footer. Falls eine Illustration im Canvas nötig ist, nur ein vorhandenes Editorial-SVG als zurückhaltende Dekoration; dekorativ `alt=""`. Es ist kein Produktfoto. Das Markensymbol dagegen bleibt als wiedererkennbare Marke sichtbar.
- Fokus, Tab-Reihenfolge und Rückkehr zum Consent-Auslöser prüfen. Der heutige Dialog fokussiert die Ablehnen-Schaltfläche; Fokusfalle, Escape-/Schließverhalten und Fokuswiederherstellung sind im gelesenen Code nicht vollständig umgesetzt. Nur dann `aria-modal` als korrekt beurteilen, wenn Tastatur-/Screenreader-Verhalten real geprüft ist.

## 5. SEO und Antwortsysteme: gezielte Verbesserung, keine Footer-Keywordliste

Google sagt für AI Overviews und AI Mode, dass keine zusätzlichen Anforderungen oder speziellen Optimierungen nötig sind. Empfohlen werden dieselben Grundlagen wie für die Suche: erreichbare Seiten, interne Links und wichtige Inhalte in Textform. Auch regelkonforme Seiten sind nicht garantiert indexiert oder ausgespielt.[4]

Daraus folgt für diesen Entwurf:

1. Linktexte müssen eine echte Frage oder ein klares Ziel benennen; genau eine kanonische Route je Inhalt. Footer ergänzt die wichtigsten Hubs und zwei Grundlagenartikel. Weitere Modell- und Quellenlinks bleiben im jeweiligen Artikel, nicht als 35er-Liste im Footer.
2. Die Methodik bekommt nach Freigabe eine kurze zitierfähige Einleitung, sichtbare Quellenarten, konkrete Modellbeispiele und ein Quellenregister. Autor/Betreiber bleibt Andreas Böhler, ohne erfundene medizinische Qualifikationen. Beispiel für ein sichtbares Datumslabel: „Redaktionell aktualisiert: [tatsächliches Datum]“. Der Platzhalter ist intern; nie ungeprüft veröffentlichen.
3. `WebSite`-/`Person`-Identitäten stabil halten und die Methoden-`WebPage` nach Freigabe mit ihnen verknüpfen. Kein zweiter fiktiver Verlag und keine erfundene Firma, nur um Schema aufzublähen. `Product`, `Article` und Breadcrumbs müssen zu sichtbaren Inhalten passen; keine Ratings, eigenen Tests oder Preise eintragen, die es nicht gibt.
4. Für die Methodenroute vorhandenes Canonical `/testmethodik/` behalten, Title/Description/H1 aus `docs/methodology-v3-draft.md` gemeinsam abstimmen. Kein Suchbegriff „Testsieger“ und kein Sprung auf eine neue URL nur wegen des historischen Wortes „test“ im Slug.
5. `llms.txt` kann als vorhandene optionale Navigation gepflegt werden. Google verlangt für seine genannten AI-Suchfunktionen weder neue AI-Textdateien noch ein besonderes Schema.[4] Die Datei ist kein Ersatz für crawlbares HTML, Quellen oder Crawler-/Trainingsentscheidungen. Ein sichtbarer Footerlink zu ihr ist nicht erforderlich.
6. Bei Social Images müssen tatsächlicher Assettyp, URL, Dimensionen und Bildbeschreibung zusammenpassen. Der Prerenderer setzt derzeit pauschal `image/png`; keine neue SVG-OG-URL damit kombinieren. Vorhandene SVGs als Illustrationen, nicht als `Product`-Fotobelege bezeichnen.
7. Search Console und echte per-URL-Daten erst über autorisierten Zugriff zur Erfolgsmessung nutzen. Lighthouse und ein technischer Clippingtest belegen keine Rankings, Verkäufe oder KI-Zitate. Kein Remote-Zugriff wurde für diesen Auftrag vorgenommen.

## 6. Ungeklärtes vor Veröffentlichung

- `src/pages.tsx:251–269`: Impressum nennt Andreas Böhler und eine Anschrift, Datenschutz steht auf 16. Juli 2026 und beschreibt GitHub Pages, lokale Auswahl, GA4, Amazon und E-Mail. Identität, erreichbare Zustellanschrift, Tätigkeit, tatsächliches Hosting, Datenempfänger, Aufbewahrung und aktuelle Rechts-/Programmanforderungen müssen zum realen Betrieb passen. Code und Text sind kein Nachweis rechtlicher Vollständigkeit.
- Die Aussage „kein Tag-Manager-Container“ ist mit direktem `gtag.js` technisch vereinbar; dessen Host `googletagmanager.com` allein beweist keinen Container. Tatsächliche Requests und GA-Kontoeinstellungen müssen dennoch geprüft werden.
- Source-Cookies auf höchstens 180 Tage und ausgeschaltete Google-Signale sind im Code konfiguriert; die tatsächliche GA-Datenspeicherung und alle Drittland-/Vertragsfragen sind nicht durch diese Optionen geklärt. Auch die Local-Storage-Nutzung nicht pauschal als rechtlich unproblematisch zertifizieren.
- Keine freigegebenen Hersteller-/Reviewbilder, kein belegter Produktdaten-API-Zugang, keine bestätigte Provision. Die Rechtefrage für Pinterest-Weiterverwendung ist ein gesonderter Umfang; Website-Nutzung erlaubt nicht automatisch Social Uploads.
- Frühere `docs/typography-audit-summary.json` meldet eine lokale Prüfung von 45 Routen bei vier Breiten ohne damalige Fehler. Sie gilt nicht als Abnahme einer künftigen Footer-/Methodikversion oder als Live-Nachweis.

## 7. Freigabe und spätere Abnahme

Superdesign zeigt die langen Methodiktexte und diesen kurzen Footer zusammen, mindestens Desktop und schmale Mobilansicht. Erst nach ausdrücklicher Zustimmung implementieren. Der Review dieses Dokuments genehmigt weder Rechtsinhalte noch Produktionsänderungen.

Nach Umsetzung prüfen: alle Footerziele tatsächlich erreichbar; richtige Ansprechpartner/Quellen; eine H1 je Seite; Canonical/Title/Description/JSON-LD aus dem gebauten HTML; Quellen- und Variantenkonsistenz; sichtbare Affiliate-Kennzeichnung an Händleraktionen. Keine versteckten Pflichttexte. Bei 320/390/768/1440px, 200 % Zoom und klassischem Scrollbalken auf die reale `documentElement.clientWidth`, Textgrenzen und geladene Schrift prüfen. Tastatur und Consent inklusive Annahme → Widerruf → erneute Annahme mit Netzwerkbelegen testen. Erst anschließend von „umgesetzt und geprüft“ sprechen.

## Sources

[4] https://developers.google.com/search/docs/appearance/ai-features
    > "There are no additional requirements to appear in AI Overviews or AI Mode,
  nor other special optimizations necessary. That said, it's always good to review the fundamental SEO best practices . H"
    > "There's also no special schema.org structured data that you need to add. To discover and diagnose potential technical issues quickly,"
[5] https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
    > "Mark links that are advertisements or paid placements (commonly called paid
              links ) with the sponsored value. Read more about Google's stance on paid links . <a rel="sponsored" hre"
