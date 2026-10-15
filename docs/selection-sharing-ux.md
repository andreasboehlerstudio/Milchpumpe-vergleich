# Magazin- und Vergleichsbedienung: additive Verbesserung

## Implementiert, noch nicht als veröffentlicht ausgegeben

- Die Ratgebersuche setzt ä/ö/ü/ß und ae/oe/ue/ss gleich; Groß-/Kleinschreibung und Rand-/Mehrfachleerzeichen werden normalisiert. Der Originaltext bleibt unverändert.
- Escape leert nur das Suchfeld, behält den Themenfilter und den Tastaturfokus. Alle 35 Artikel bleiben vollständig in der initialen HTML-Bibliothek.
- Die zwei Detailmodelle lassen sich über `modell-a` und `modell-b` in einer Vergleichs-URL wieder öffnen. `unterschiede=0` schaltet die visuelle Hervorhebung aus. Nur exakte IDs aus dem vorhandenen Sechs-Modell-Register sind gültig; unbekannte/mehrfach gesetzte Parameter bekommen die sicheren Standardwerte.
- Initiales SSR bleibt die bestehende Standardauswahl. URL-Auswahl wird nach dem Hydratisieren übernommen; `popstate` stellt die sichtbare Auswahl wieder her. Es entstehen keine neuen indexierbaren Inhaltsrouten; Canonical und Schema bleiben unverändert.
- Benutzeränderungen aktualisieren ausschließlich die eigenen URL-Parameter via `replaceState`; vorhandene UTM-Parameter, Hash und History-State bleiben bestehen. Zurücksetzen stellt M9/Freestyle plus aktive Hervorhebung wieder her und entfernt die drei eigenen Parameter.
- Eine explizite Aktion „Auswahl-Link kopieren“ schreibt nur nach dem Klick. Falls die Zwischenablage nicht verfügbar oder verweigert ist, bleibt ein beschriftetes, umbrechendes Nur-Lese-Linkfeld zum manuellen Kopieren sichtbar. Offene Links aktualisieren sich bei Auswahländerungen; eine verspätete Clipboard-Antwort darf keine veraltete Erfolgsmeldung anzeigen.
- Der URL-Zustand enthält Modell-IDs und eine Darstellungsoption, keine personenbezogenen Suchbegriffe, Kontaktdaten oder Stillnotizen. Die freie Magazinsuche wird ausdrücklich nicht in die URL geschrieben oder separat gespeichert. Bestehende fremde Query-Parameter bleiben unverändert; keine neuen Analytics-Ereignisse eingeführt.
- Unverändert: medizinische Grenzen, Herstellerquellen, manuell/elektrisch-Trennung, genaue Setidentitäten, Affiliate-Ziele, Newsletter-Sperre und freigegebene Farben/Typografie.

## Tatsächliche isolierte Prüfungen

`node --import tsx --test scripts/magazine-upgrade.test.tsx scripts/comparison-url.test.ts`:
**15 Tests bestanden, 0 fehlgeschlagen**.

Neue Verhaltensslices wurden vor der Umsetzung rot ausgeführt: Transliterationssuche/Escape, URL-Parser, sichere URL-Erzeugung, Wiederherstellung/Reset/History, fehlende Share-Aktion und Clipboard-Verweigerung. Die Clipboard-Schnittstelle wurde im isolierten DOM-Test gezielt verweigert; dies ist kein Zugriff auf die echte Zwischenablage des Betreibers.

Die anschließende integrierte Runde ist in `route-loading-release.md` dokumentiert: Produktionsbuild/Gesamttests, Browser-/Hydrationsprüfung geteilter URLs und vier Viewportbreiten sowie mobile Labelkorrekturen. Veröffentlichung und Live-Prüfung bleiben gesonderte Nachweise; die isolierten Tests allein sind kein Live- oder Performancebeleg.
