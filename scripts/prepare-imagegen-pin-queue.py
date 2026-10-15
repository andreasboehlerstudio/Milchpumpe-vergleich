import csv
import datetime
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
plan = list(csv.DictReader((root / 'docs/pinterest-plan.csv').read_text(encoding='utf-8-sig').splitlines(), delimiter=';'))
by_slug = {row['slug']: row for row in plan}
concepts = [
    ('muttermilch-beschriften-portionen-gefrierfach', 'Welche Portion zuerst?', 'Eine erwachsene Hand sortiert markenlose geschlossene Milchbeutel mit leeren Etiketten in einer Gefrierfachschublade.'),
    ('muttermilch-arbeitsplatz-transport-kuehlkette', 'Vom Büro nach Hause. Und die Milch?', 'Auf einem ruhigen Schreibtisch stehen eine geschlossene markenlose Kühltasche und ein Notizbuch. Am Rand eine erwachsene Hand und ein neutraler Kühlakku.'),
    ('reserve-pumpset-reinigen-trocknen-organisieren', 'Das Pumpset ist noch feucht?', 'Ein sauberer geschützter Trockenplatz mit einigen zerlegten generischen Pumpenteilen, geordnet auf neutralem Abtropfgestell. Keine nachgebildeten Markenmodelle.'),
    ('muttermilchbeutel-oder-mehrwegbecher', 'Beutel oder Becher?', 'Wenige markenlose geschlossene Aufbewahrungsbeutel und wiederverwendbare Becher auf einem hellen Küchentisch, mit freier Fläche um die Gegenstände.'),
    ('muttermilch-kuehlschrankbox-getrennt-aufbewahren', 'Ein fester Platz für deine Milch', 'Saubere Kühlschrankablage mit geschlossenen neutralen Milchbehältern in einem eigenen kleinen Bereich; Etiketten leer, keine lesbaren Haltbarkeitsdaten.'),
    ('muttermilch-erwaermen-ohne-flaschenwaermer', 'Warm machen, ohne neues Gerät?', 'Geschlossene markenlose geeignete Milchflasche in einem ruhigen Wasserbad auf einer Küchenarbeitsplatte. Kein kochendes Wasser, kein sichtbarer Dampf, keine Mikrowelle.'),
    ('abgepumpte-muttermilch-flasche-sauger-auswaehlen', 'Welche Flasche passt zum nächsten Schritt?', 'Eine markenlose leere Babyflasche und ein ruhiges Mulltuch auf einem hellen Holztisch; eine erwachsene Hand am Bildrand, kein Baby und keine nachgebildeten Produktlogos.'),
    ('stilleinlagen-einweg-mehrweg-unterwegs-organisieren', 'Sauber rein. Benutzt separat.', 'Zwei neutrale kleine Organisationsbeutel mit getrennten sauberen und benutzten Stilleinlagen neben einer Alltagstasche; gepflegte, unaufgeregte Szene, keine Werbung.'),
    ('hands-free-milchpumpe-kaufen', 'Tragbare Milchpumpe? Erst diese Fragen.', 'Ein neutraler Still-BH, Notizbuch und geschlossene Alltagstasche auf einem Holztisch; kein bestimmtes Milchpumpenmodell erfinden.'),
    ('milchpumpe-fuer-unterwegs', 'Unterwegs abpumpen: Was kommt mit?', 'Eine erwachsene Hand packt markenlose verschlossene Aufbewahrungsbehälter in eine Alltagstasche; daneben getrennte neutrale Hülle für saubere Teile.'),
    ('milchpumpe-einzel-oder-doppelpumpe', 'Eine Seite oder beide?', 'Zwei neutrale leere Sammelbehälter mit jeweils passenden Deckeln auf heller Fläche, kein dargestelltes Modell, ruhige offene Komposition.'),
    ('milchpumpe-zubehoer-checkliste', 'Erst prüfen. Dann Zubehör kaufen.', 'Wenige generische saubere Behälter und Deckel neben einem Notizbuch und einer erwachsenen Hand; keine erfundenen kompatiblen Marken-Ersatzteile.'),
    ('momcozy-m9-ohne-app', 'Muss die App wirklich mit?', 'Ein ausgeschaltetes Smartphone neben einer geschlossenen Alltagstasche und einem neutralen Notizbuch; kein Produktmodell und keine erfundene App-Oberfläche zeigen.'),
    ('momcozy-m9-einzel-oder-doppelset', 'Was steckt tatsächlich im Set?', 'Eine erwachsene Hand kontrolliert einen offenen neutralen Karton mit zwei leeren generischen Behältern. Keine Verpackungsmarke und kein behaupteter Momcozy-Lieferumfang.'),
    ('medela-freestyle-hands-free-drei-teile-reinigung', 'Nach dem Abpumpen: Teile sortieren', 'Sauber zerlegte generische Becherteile neben einem sauberen Waschbereich; keine elektrische Motoreinheit im Wasser, keine nachgebaute Medela-Cup-Geometrie.'),
    ('medela-freestyle-hands-free-schlaeuche-motor', 'Hands-free ist nicht immer schlauchlos', 'Eine geschlossene neutrale mobile Tasche mit geordnetem Kabel beziehungsweise Schlauch daneben; keine bestimmte Pumpenarchitektur als Markenprodukt inszenieren.'),
    ('elvie-pump-oder-elvie-stride', 'Wo sitzt der Motor?', 'Ein neutraler Still-BH und eine kleine geschlossene Alltagstasche auf heller Fläche, neben einem Notizbuch. Kein Elvie-Produkt rendern und keine Behauptung eines Praxistests.'),
    ('milchpumpe-ersatzteile-ventile-membranen', 'Erst das Modell. Dann das Ersatzteil.', 'Eine erwachsene Hand ordnet kleine generische saubere Ventil- und Membranteile in getrennten neutralen Fächern; keine Markenkompatibilität oder Modellnummern vortäuschen.'),
    ('momcozy-s12-pro-quick-unterschiede', 'Ähnlicher Name. Gleiche Generation?', 'Eine erwachsene Hand hält zwei neutrale unbeschriftete Papierkarten vor einem Notizbuch. Kein nachgebildetes Momcozy-Modell oder erfundene Testmessung.'),
    ('milchpumpe-app-datenschutz', 'Welche Daten braucht die App?', 'Ein Smartphone mit ausgeschaltetem Display neben einem geschlossenen Notizbuch auf hellem Tisch; keine nachgebildete App-Oberfläche oder privaten Daten.'),
]
assert len(concepts) == 20 and len({x[0] for x in concepts}) == 20
focus = {
    'muttermilch-beschriften-portionen-gefrierfach': 'medela-easy-pour-storage-bags',
    'muttermilch-arbeitsplatz-transport-kuehlkette': 'medela-cooler-bag',
    'reserve-pumpset-reinigen-trocknen-organisieren': 'philips-avent-scf149-00',
}
queue = []
for slug, headline, scene in concepts:
    entry = by_slug[slug]
    queue.append({
        'slug': slug,
        'pinTitle': headline,
        'articleDestination': entry['destination'],
        'primaryProductId': focus.get(slug, entry['product']),
        'imagegenPrompt': f'Erstelle einen einzelnen hochwertigen Pinterest-Pin im Hochformat 2:3. Natürliches redaktionelles Lifestyle-Themenfoto, kein Werbeplakat und kein fingierter Nutzerbericht. Szene: {scene} Creme, dezentes Mint und Petrol, natürliche Materialien und Tageslicht, ruhige Bildkomposition. Oben großzügige freie Fläche mit der exakt lesbaren deutschen Überschrift „{headline}“ in moderner leichter Sans-Schrift, maximal drei Zeilen und breite Sicherheitsränder; keinen Text anschneiden. Keine Preisangaben, Ratings, Markenlogos, erfundenen Testergebnisse, fremden Nutzeridentitäten oder echten Produktfotos vortäuschen. Keine gesundheitsbezogenen Versprechen. Keine weitere Schrift, keine URL im Motiv, keine Montage.',
        'generationStatus': 'SOURCE_PHOTO_GENERATED_PIN_NOT_FINAL' if slug == concepts[0][0] else 'NOT_REQUESTED',
        'acquisitionStatus': 'MANUAL DOWNLOAD REQUIRED',
        'originalFileVerified': False,
        'chatDeletionStatus': 'BLOCKED UNTIL ALL ORIGINALS IN CHAT ARE VERIFIED',
        'pinterestPublished': False,
    })
originals = root.parent / 'imagegen-inbox/originals'
baseline = [{'name': p.name, 'bytes': p.stat().st_size, 'modifiedNs': p.stat().st_mtime_ns} for p in originals.iterdir() if p.is_file() and p.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp'}]
output = {
    'preparedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'purpose': '20 original Imagegen pins with problem-article destinations; this is a queue, not 20 generated or downloaded assets.',
    'originalsBaseline': baseline,
    'pins': queue,
}
target = root.parent / 'imagegen-inbox/requests/pinterest-imagegen-queue.json'
assert not target.exists(), 'Refusing to overwrite an existing acquisition queue.'
target.write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
check = json.loads(target.read_text(encoding='utf-8'))
assert len(check['pins']) == 20
assert all(x['articleDestination'].startswith('https://milchpumpe-vergleich.de/ratgeber/' + x['slug'] + '/') for x in check['pins'])
print(json.dumps({'queuePath': str(target), 'pinBriefs': len(check['pins']), 'originalsBeforeManualDownload': len(check['originalsBaseline']), 'finalPinsGenerated': 0, 'sourcePhotoShownInChatGPT': 1}, ensure_ascii=False))
