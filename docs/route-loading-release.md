# Integrierte Prüfung: gezieltes Laden und Vergleichslinks

## Abgrenzung

Das genehmigte V15-Editorial bleibt die Gestaltungsbasis. Die Änderung betrifft den tatsächlich geladenen JavaScript-Umfang und additive Bedienhilfen; keine neuen Produktbewertungen, Bilder, Newsletterfreigaben oder Artikelrouten. Konten/E-Mail-Bestätigungen wurden in dieser Runde nicht verändert.

## Reale Messung und Inhaltssicherung

- Gespeicherter tatsächlicher Vorher-Build f375880: Startseite 1.092.058 JavaScript-Antwortbytes.
- Isolierter Edge-Nachherlauf: 314.126 JavaScript-Antwortbytes auf der Startseite, **71,24 % weniger**. Das sind dekodierte JavaScript-Antwortkörper, keine gzip-Übertragungsbytes und keine Aussage über Ladezeit, Feld-CWV oder Ranking.
- Die vier Startseitenmodule sind Bootstrap, React-/Bibliotheks-Vendor, Startseitenfamilie und Foto-Responsivitätshelfer. Artikel-/Katalog-/Marktregister werden dort nicht mehr angefordert.
- Alle 50 Routen haben vollständiges SSR. Blockierte/langsame Seitenimporte lassen Inhalt und Einwilligungsbedienung bestehen. Die Kindübergabe wurde gegen tatsächliche Logs/Resource-JSON geprüft; Architektur/Details: `route-loading-implementation.md`.
- Varianten- und Inhaltstrennung unverändert: sechs Detailmodelle, davon fünf elektrisch und Haakaa manuell, sowie eigenständiger 40-Modell-Marktüberblick. Der neue Linkzustand akzeptiert ausschließlich exakte bestehende Detailmodell-IDs.

## Elterliche Integrationstests

- Eigener Typecheck und vollständiger Produktionsbuild mit Gesamttests ausgeführt. Der finale Testlauf umfasst 290 Tests.
- Erneute echte Headless-Edge-Prüfung aller **50 Routen bei 320, 390, 768 und 1440px**: 200 Layout-/Hydrationsprüfungen, je ein main/H1, keine Dokumentüberbreite oder erkannten abgeschnittenen sichtbaren Überschriften/Buttons, keine Seitenfehler. Der gemeinsame Menüschalter wurde vor Messungen tatsächlich auf Eventbereitschaft geprüft, nicht bloß das vorhandene SSR gezählt.
- Alle 6×6 ausgewählten Paare bei 1024/1440px: **72 Ausrichtungsprüfungen**, korrespondierende Fakten innerhalb 1px.
- Vier Interaktionsläufe bei 320/390/768/1440px: geteilte URL stellt Haakaa/Elvie Pump Single und deaktivierte Hervorhebung wieder her; Reset erhält UTM/Anker und räumt eigene Parameter auf; manuelle Linkkopie funktioniert bei gezielt verweigerter Clipboard-API; Umlaut-/ASCII-Suche und Escape mit erhaltenem Themenfilter funktionieren. Die Betreiber-Zwischenablage wurde nicht beschrieben.
- Die echte 320px-Schriftmessung fand zunächst zwei zu lange Select-Labels. Region `/11`, Generation 3 und die Elvie-Single-Kennung blieben beim Kürzen erhalten. Öffentlicher Regressionstest zuerst rot, dann korrigiert; 24 echte native Auswahl-/Breitenprüfungen über sechs Modelle und vier Breiten anschließend erfolgreich.
- Rasteransichten des 320px-Vergleichs, Suchfilters und Desktop-Magazins visuell geprüft. Eine angeschnittene letzte Linkzeile wurde zusätzlich erkannt und durch natürlich mitwachsendes Textfeld (`field-sizing: content`, fünfzeilige Rückfallhöhe) korrigiert.

Rohbelege und Screenshots liegen ignoriert unter `private/route-loading/` und `private/seo-expansion/`. Die Portabilitätsprüfung des Unteragenten nutzte einen separaten Source-Export ohne private Dateien; echte GitHub-CI und öffentliche Veröffentlichung werden separat gelesen und nicht aus diesem Dokument abgeleitet.
