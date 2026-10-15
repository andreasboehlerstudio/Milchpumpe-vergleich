# Abgleich der neuen Muttermilch-Artikel

Die Rohrecherche steht in `milk-guides-evidence.json`; dieser Abgleich dokumentiert die danach geänderten Kaufbeispiele.

- Philips SCF618/10 wurde nicht als neuer Kaufartikel aufgenommen: Die Produktrecherche hatte das Modell als eingestellt ausgeschlossen. Die drei betreffenden Artikel verwenden nun die bereits quellenbelegten MAM-Aufbewahrungsbecher. Becherzahl, Beschriftung, Zweck und fehlende eindeutige Volumenangabe bleiben den MAM-Quellen zugeordnet; alte Philips-Adapter-/Volumendaten wurden nicht übertragen.
- Die US-Flasche SCY903/01 wurde nicht auf deutsche Ausstattung umgedeutet. Der Artikel vergleicht nun ausdrücklich die deutsche SCY673/01 mit separatem AirFree-Ventil; Quelle, Absatz, Produktname und Katalogziel wurden gemeinsam geändert. Keine Zusage gegen Koliken oder Fütterungsprobleme.
- Drei zusätzliche, belegte Artikelbeispiele wurden ergänzt: Philips SCF358/00, Medela classic PersonalFit Flex double pumping kit und Calma. Ihre Händlerziele sind gekennzeichnete Modellsuchen, keine geprüften Einzelangebote.
- PersonalFit Flex: Internationale Kit-Quelle; Freestyle-/Swing-Maxi-Bezeichnung nicht pauschal auf jede Generation oder Hands-free-Cups übertragen. Ersatzteile vor Bestellung modellgenau abgleichen.
- Calma: Internationale Primärquelle und Belegzitate vorhanden. Der erneute Browserabruf lief in eine Weiterleitungsschleife; das öffentliche Suchergebnis der offiziellen Seite bestätigte den Produkttext. Keine aktuelle deutsche Setverfügbarkeit behauptet.
- Flaschenwärmer: Die Herstellerfunktion zum Warmhalten ist keine Muttermilch-Lagerempfehlung. Eine handwarme Wasserbad-Alternative und die Möglichkeit, nichts neu zu kaufen, bleiben sichtbar.

Artikel-/Produktzuordnung ist explizit über Namen und IDs in `milk-articles.tsx`; unbekannte Namen führen zu einem Fehler statt zu einer geratenen Fuzzy-Zuordnung. Produktions- und Quellenprüfungen werden in den Abschlussdurchgängen erneut durchgeführt.
