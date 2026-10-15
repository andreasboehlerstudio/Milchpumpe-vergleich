# Eigene Editorialbilder und Pinterest-Entwürfe

## Reproduzieren

```bash
npx tsx scripts/prepare-pinterest.ts
python scripts/generate-editorial-images.py
npm test
```

Das Python-Skript braucht Pillow und die lokal installierten Windows-Schriften Georgia/Arial. Bilder sind eingecheckt; CI braucht kein Windows/Pillow.

## Enthalten

- Pro neuem Artikel eine Pinterest-Themenkarte (1.000 × 1.500 px) und eine Social-/Artikelkarte (1.200 × 630 px).
- `content-map.json`: Zielintention, Modellbezug und Kaufcheck pro URL.
- `pinterest-plan.csv`: Titel, Beschreibung, UTM-Artikelziel, öffentliche Bildadresse, primärer Modellbezug und Status **Entwurf**. Dies ist ein Redaktionsplan, kein zugesichert direkt importierbares Pinterest-Format.
- `image-manifest.json`: Dateizuordnung, Abmessungen und Herkunft der Grafik.

## Rechte und Darstellung

Layouts und SVG-Symbol sind originale Editorialgestaltungen; keine fremden Produktfotos, Herstellerlogos, Screenshots oder kopierten Rezensionen. Die Themenkarten bilden kein reales Pumpenprodukt ab und dienen nicht als Nachweis einer persönlichen Nutzung.

Eine Quellenangabe unter einem Artikel ist keine Lizenz zur Übernahme der dortigen Fotos. Produktfotos werden erst mit belastbarer Nutzungsgrundlage ergänzt, beispielsweise einer konkreten Herstellerfreigabe oder einem korrekt eingebundenen zulässigen Amazon-Programm.

ChatGPT/Imagegen wurde im vorhandenen Nutzerkonto angefragt. Originaldateien wurden noch nicht manuell heruntergeladen und in dieses Repository übernommen; diese Karten werden nicht als Imagegen-Ergebnis ausgegeben.

## Pinterest veröffentlichen

Die Zielartikel und Bildadressen müssen zuerst live funktionieren. Pro Pin wird die passende Frage auf dem Zielartikel beantwortet. Keine irreführenden „selbst getestet“-Aussagen, Gesundheitsversprechen oder Links zu anderen Bundlevarianten.

Affiliate-Bezug ist in der Beschreibung und im Artikel offengelegt. Kein Klickbait mit erfundenen Testnoten, Angebotsrabatten oder garantierten Ergebnissen. Veröffentlichte Pins erst nach tatsächlicher Veröffentlichung mit ihrer URL dokumentieren.
