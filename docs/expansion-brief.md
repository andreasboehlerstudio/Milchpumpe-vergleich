# Ausbau-Entscheidung: mindestens 50 Produkte, keine 50 dünnen SEO-Seiten

## Verbindliche Qualitätsgrenzen

- Mindestens 50 unterschiedliche reale Produkte nach deduplizierter Hersteller-/Modellidentität. Farben, Mengensets oder bloße Größenänderungen werden nicht als künstliche Zusatzmodelle gezählt.
- Bestehende sechs Pumpen behalten ihre Produktdetailseiten. Neue Zubehörprodukte werden zunächst als quellenbelegte Einträge im Produktwegweiser geführt, nicht automatisch als dünne Einzel-Landingpages.
- Zusätzlich recherchierte Themen: Aufbewahrung, Transport, Pumpenreinigung/-teile, Stillalltag und Füttern abgepumpter Milch.
- Neue Artikel beantworten je eine praktische Frage und enthalten konkrete Produktbeispiele. Kein Aufblähen mit Varianten derselben Suchintention.
- Redaktioneller Ton: lebensnah, ruhig und konkret. Keine erfundenen Ich-Erlebnisse, Real-User-/UGC-Testimonials, Testnoten oder Gesundheitsversprechen.
- Empfehlung mit Gegenfall: Wann nützlich, wann vorhandene Ausstattung reicht, was vor dem Kauf geprüft werden muss.
- Affiliate-Hinweis ist sichtbar. Zurückhaltendes Design bedeutet nicht verborgene Werbung.

## Produktdaten

Pro Eintrag: exaktes Modell, Herstellerquelle, belegte Merkmale, Grenzen, Prüfungspunkte und Bildrechte-Status. Keine unbestätigten Preise, Lieferbarkeit oder ASINs. Amazon-Suchziele werden als Suche gekennzeichnet und nutzen die bestätigte Tracking-ID.

Neue Quellen müssen tatsächlich gelesen werden. Quellenzitate im privaten/redaktionellen Evidence-Ledger sind Belege, keine frei übernehmbaren Produktbeschreibungen oder Fotolizenzen. Widersprüchliche Daten werden nicht automatisch zugunsten der Werbung geglättet.

## Fachliche Trennung

Herstellerquellen beschreiben das Produkt. Behördenquellen tragen allgemeine Hygiene-/Aufbewahrungshinweise. Produkte sind keine Behandlung bei Schmerzen, Mastitis oder geringer Milchbildung. Für Frühgeborene, kranke Säuglinge und individuelle Probleme gelten Hinweise des betreuenden Fachpersonals. Kein Tee-/Supplement-Upsell zur Milchsteigerung.

## Bildstatus

Echte Herstellerfotos benötigen eine konkrete Freigabe. Amazon-Programmbilder sind zweckgebundene Inhalte; sie dürfen nicht einfach aus einem öffentlichen Angebot kopiert werden. Creators API kann Bildadressen liefern, setzt aber eigenen berechtigten Zugang und Einhaltung der aktuellen Programmbedingungen voraus.

Offizielle Fundstellen:
- https://partnernet.amazon.de/help/operating/license
- https://partnernet.amazon.de/creatorsapi/docs/en-us/api-reference

Der native ChatGPT-Chat **Bildset generieren** erhielt einen Imagegen-Auftrag für eine 12-Motive-Montage (markenfreie Muttermilch-Alltagsstillleben). Status zum Auftrag: abgeschickt, Ausgabe/Originaldownload noch nicht bestätigt. Das ist kein Satz von zwölf heruntergeladenen Dateien und keine echte Markenproduktfotografie.

Originale werden über den offiziellen manuellen Download übernommen, nicht per versteckter URL, Cache oder automatischer Output-Extraktion. Erst nach realer Dateiprüfung werden sie integriert; Themenbilder werden entsprechend beschriftet.

## Zwei abschließende Optimierungsdurchgänge

Diese Durchgänge erfolgen nach vollständiger Integration, nicht als Ersatz für den noch laufenden Ausbau.

### Durchgang 1 – Inhalt, Suchintention und Gestaltung

- Alle Produkte zentral deduplizieren und die Mindestzahl von 50 unterschiedlichen Modellen/Artikeln prüfen.
- Jede Artikelseite auf eigenständige Suchfrage, konkreten Nutzen, belegte Produktzuordnung und sinnvolle interne Links prüfen; Überschneidungen konsolidieren statt neue Keywordvarianten erzeugen.
- Titel, Kurzantworten, Quellen, GEO-Entitäten und Pinterest-Zielseiten an den tatsächlich sichtbaren Inhalt angleichen.
- Blogartigen Leseton, Gegenfälle ohne Neukauf und transparente Affiliate-Hinweise kontrollieren; erfundene Erfahrungs-/UGC-Aussagen ausschließen.
- Bildrechte und reale Bilddateien getrennt prüfen. Fotos und Illustrationen eindeutig kennzeichnen; offene Lizenzen nicht als freigegeben behandeln.
- Layout, Farbkontrast, Animationen, reduzierte Bewegung und mobile Bedienung optimieren.

### Durchgang 2 – Erneute unabhängige Gesamtprüfung am fertigen Build

- Produktionsbuild neu erzeugen; vollständige Testsuite erneut laufen lassen, nicht nur Ergebnisse aus dem ersten Durchgang übernehmen.
- Alle veröffentlichten Routen auf HTML, Canonicals, eindeutige H1/Metadaten, Schema-Inhalt, Sitemap, Bilder, Links und Anker prüfen.
- Stichproben der wichtigsten Kaufwege im Browser auf Desktop und Mobil nachgehen; Überlauf gegen `documentElement.clientWidth` prüfen.
- Affiliate-Ziele, aktive Tracking-ID im HTML, korrekte Modell-/Bundlebeschriftung und Einwilligungsabhängigkeit der Messung erneut prüfen. Keine Verkaufsattribution aus bloßen Websiteklicks ableiten.
- Befunde aus Durchgang 1 auf Regressionen prüfen. Neue Fehler beheben und die betroffenen sowie vollständigen Prüfungen wiederholen.
- Git-Push, Remote-Commit/CI und gegebenenfalls tatsächliches Live-Deployment separat verifizieren. Nur ausgeführte Prüfungen als bestanden melden; offene Bild- oder Kontozugangsfragen ausdrücklich ausweisen.

## Veröffentlichungs-Gate

Ausstehende parallel recherchierte Produktbatches und Muttermilch-Artikel werden erst nach Rückmeldung integriert. Beide Abschlussdurchgänge gehören zum Auftrag. Erst danach Git-Push und nachvollziehbare Remote-/Deploymentprüfung.
