# Weitere Wearable-Milchpumpen – begrenzter Evidenzbatch

Stand: 2026-10-14T22:13:30+02:00. Ausschließlich öffentliche Read-only-Recherche; keine vollständige Marktabdeckung.

## Ergebnis und Auswahlgrenze

- 11 deduplizierte Modell-/Modellfamilien-Datensätze mit gelesener Amazon.de-Produktdetailseite aus 9 Marken.
- Alle 11: `detail-found-offer-unverified`. Kein `public-offer-observed`, kein bestätigtes Deutschland-Lieferziel. Stock-/USD-Anzeigen sind keine deutschen Bestellbestätigungen.
- 9 Datensätze mit modellbezogener Hersteller-/Supportquelle; 2 nur mit Amazon-Modellidentität.
- Evidenzstufen: 6 benannte Modelle mit Hersteller- und Amazon-Beleg; 3 mit offener Generations-/Regional-/Architekturzuordnung; 2 ohne passenden Primärbeleg.
- 4 getrennte Discovery-Einträge; davon Bellababy W38 und YOUHA THE INs herstellerbelegt, aber ohne gefundenen deutschen Detailtreffer. TSRETE/GROWNSY bleiben ohne erfundene Modellnummer.

## Modellliste mit Quellen

- **Bebeconfort Discreet (3101202300)** — `named-model-primary-and-amazon`.[1][2]
- **Willow Go (PDL60)** — `primary-present-mapping-or-architecture-caveat`.[3][4]
- **eufy S1 (T8D02)** — `named-model-primary-and-amazon`.[5][6]
- **eufy S2 Pro (Amazon T60A1; Hersteller T600P + T60A0)** — `primary-present-mapping-or-architecture-caveat`.[8][9]
- **NCVI 8131** — `named-model-primary-and-amazon`.[11][12]
- **Nuliie S32** — `named-model-primary-and-amazon`.[13][14]
- **Lionelo Fidi Free Slim (LOC-FIDI FREE SLIM)** — `named-model-primary-and-amazon`.[15][16]
- **Neno Sole (beobachtete Variante Sole Twin)** — `named-model-primary-and-amazon`.[17][18]
- **KISSBOBO K5** — `amazon-model-only-primary-missing`.[19]
- **NCVI AM8161A (beheiztes Wearable)** — `amazon-model-only-primary-missing`.[20]
- **Kinderkraft MAMAFLOW** — `primary-present-mapping-or-architecture-caveat`.[21][22]

## Nicht vorschnell übernehmen

- KISSBOBO K5 und NCVI AM8161A: echte Amazon-Modellnummern, aber kein belastbarer modellgenauer Herstellertext/Handbuch; OEM-/White-Label-Exklusivität nicht belegt.
- Kinderkraft MAMAFLOW: Modell identifiziert; In-Bra-Einordnung vor redaktioneller Verwendung mit Handbuch oder Herstellerabbildung nachprüfen.
- Willow Go: aktuelle Herstellerseite kann eine andere Go-Generation als PDL60 betreffen; Garantie-/Import-/Lieferumfangsfragen offen.
- eufy S2 Pro: Amazon T60A1 und Hersteller T600P+T60A0 nicht stillschweigend gleichsetzen; regionale Packung überprüfen.
- Farben, Einzel-/Doppelpacks und reine Ladecase-Varianten erhöhen die Modellzahl nicht. Sole/Twin als eine Familie; eufy S1/S2 sind unterschiedliche Generationen.
- Gleiche Ersatzteile oder gemeinsame Rezensionen beweisen keine identische Pumpentechnik. Keine eigenständigen Tests, Sieger, Testnoten, Suchvolumina oder medizinischen Wirkungszusagen erhoben.

## Technische Grenzen

- SearXNG nicht erreichbar; Such-Fallback lieferte wiederholt unpassende Treffer.
- Browser-Session `milk-market-other` lief beim ersten öffentlichen Amazon-Suchaufruf in einen 300-Sekunden-Timeout; keine Reparatur versucht.
- web_extract war nutzbar, zeigte aber teilweise anonyme US-/Frankreich-Lieferziele und USD. Andere Angebote nicht ausreichend geprüft; leere Extraktfelder nicht als Ausverkauf ausgegeben.
- Ein Amazon-Aufruf für Bebeconfort lief zunächst in 504; der tatsächlich verlinkte Produktpfad lieferte danach Produktdetails.
- Nuliie: sichtbare 1,58 € bezogen sich auf Geräteschutz, nicht die Pumpe; kein Pumpenpreis übernommen.
- Nur `docs/wearable-market-other.json` und diese Notizdatei wurden im Projekt neu erstellt. Keine src-Änderungen, Commits, Uploads oder Veröffentlichungen.

## Sources

[1] https://www.bebeconfort.com/international/baby-feeding-care/discreet-wearable-electric-breast-pump?color_swatch_id=6119
[2] https://www.amazon.de/dp/B0DT4S8TP4
[3] https://onewillow.com/products/willow-go-wearable-pump
[4] https://www.amazon.de/dp/B0B2SK47X6
[5] https://service.eufy.com/article-description/Wearable-Breast-Pump-S1-User-Guide-T8D02
[6] https://www.amazon.de/dp/B0D6YFQ6N8
[8] https://www.eufy.com/products/t600p181-eufy-wearable-breast-pump-s2-pro
[9] https://www.amazon.de/dp/B0GWH8M9DD
[11] https://ncvi.com/ncvi-hands-free-breast-pump-8131-pink.html
[12] https://www.amazon.de/dp/B0H4ZCN5J3
[13] https://nuliie.com/products/s32-breast-pump-white
[14] https://www.amazon.de/dp/B0GVHXGYFC
[15] https://en.lionelo.com/wearable-breast-pump-fidi-free-slim
[16] https://www.amazon.de/dp/B0GGJ3FCGR
[17] https://neno.pl/download/katalog_neno_en_2025.pdf
[18] https://www.amazon.de/dp/B0G59DYCBX
[19] https://www.amazon.de/dp/B0F3HY4N15
[20] https://www.amazon.de/dp/B0G7FJ6XKC
[21] https://kinderkraft.co.uk/products/mamaflow
[22] https://www.amazon.de/dp/B0G3PZR61C
