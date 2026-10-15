# Newsletter mit PDF-Kaufcheck: Texte und Einrichtung

Status: vorbereitete Texte und technischer Einrichtungsentwurf. Kein Formular angeschlossen, keine Kontakte erfasst, kein Versand aktiviert. Das PDF ist noch nicht produziert. Anbieterwahl, Konto, Absenderfreigabe, fertige PDF-Datei und rechtliche Prüfung stehen aus.

## Angebot

Vorgeschlagener Guide: „Kauf noch keine Milchpumpe, bevor du diesen Check gemacht hast.“

Er soll einen ausfüllbaren Alltagscheck, Bauartenvergleich, Set-/Größencheck und persönlichen Kaufzettel enthalten. Keine Seitenzahl oder fertigen Download behaupten, bevor die Datei vorliegt.

Der Guide wird als Willkommensgeschenk für die bestätigte Newsletter-Anmeldung angeboten. Kein irreführender Sofortdownload-Button. Eine echte Zugangsbeschränkung ist von einer Auslieferung per E-Mail zu unterscheiden: Eine öffentlich auf GitHub Pages abgelegte Datei kann weitergegeben werden. Für exklusive technische Freigabe braucht es geschützten Speicher und signierte, begrenzt gültige Links, nicht nur eine noindex-Seite.

## Website-Text für den Start nach Freigabe

**Überschrift:** Kauf noch keine Milchpumpe, bevor du diesen Check gemacht hast.

**Text:** Welches Set brauchst du wirklich? Wo sitzt der Motor? Und was kommt nach dem Pumpen an Reinigung und Zubehör dazu? Der PDF-Kaufcheck hilft dir, diese Fragen vor deiner Bestellung zu sortieren.

**Bedingung direkt am Formular:** Den PDF-Guide erhältst du als Willkommensgeschenk, wenn du dich für unseren Newsletter anmeldest und deine E-Mail-Adresse bestätigst.

**Inhalte:**
- Dein persönlicher Alltagscheck zum Ausfüllen.
- Ein Vergleich der Bauarten und Setvarianten.
- Ein Kaufzettel für Größen, Lieferumfang und offene Fragen.

**Pflichtfeld:** E-Mail-Adresse. Kein Name, Geburtsdatum oder Gesundheitsfragebogen.

**Vorgeschlagene, nicht vorausgewählte Einwilligung; vor Einsatz rechtlich prüfen:**
„Ja, ich möchte den Newsletter von Milchpumpe-Vergleich.de (Andreas Böhler) mit Tipps zur Pumpenauswahl, zum Abpumpalltag und gelegentlichen Produktempfehlungen erhalten. Zum Einstieg bekomme ich bis zu vier E-Mails innerhalb einer Woche, danach bis zu zwei E-Mails im Monat. Ich kann meine Einwilligung jederzeit über den Abmeldelink widerrufen. Informationen zur Datenverarbeitung finde ich in der Datenschutzerklärung.“

**Button:** Newsletter abonnieren & PDF-Guide erhalten

**Hinweis:** Nach deiner Bestätigung schicken wir dir den Download-Link per E-Mail. Du kannst dich jederzeit wieder abmelden.

Die Verknüpfung von PDF und Newsletter ist kein automatisch rechtssicheres Modell. Die Freiwilligkeit einer Einwilligung und die konkrete Kopplung müssen geprüft werden. Double-Opt-in allein löst diese Frage nicht. Bei fehlender Freigabe als risikoärmere Alternative PDF-Zustellung und optionales Newsletter-Abonnement trennen.[3]

## Anbieter und Steuerung

Vorschlag: Brevo als zentrale Oberfläche für Kontakte, Formulare und E-Mails. Seine eigenen Formulare unterstützen die doppelte Bestätigung, die Weiterleitung nach dem Formular/der Bestätigung und eine abschließende Bestätigungs-E-Mail.[1] Die DOI-Vorgänge können zur Dokumentation der Anmeldung nachvollzogen werden.[2]

Für die aktuelle statische React-/GitHub-Pages-Website ist ein Anbieterformular der einfachste Start. Zuerst ein von Brevo gehostetes Formular verlinken; nach Prüfung von Datenschutz und externen Requests kann eine passend gestaltete Formulareinbindung folgen. Kein selbstgebautes Frontend, das einen Brevo-API-Schlüssel ausliefert. Make, Zapier oder n8n sind für diesen Grundablauf nicht vorgesehen. Automationsumfang und Limits des konkreten Kontos vor Aktivierung prüfen; kein Upgrade ohne Freigabe.

## Versandablauf

1. Besucherin liest einen Artikel oder sieht die Guide-Box und öffnet das Newsletterformular.
2. Sie gibt ihre E-Mail-Adresse ein und stimmt dem beschriebenen Newsletter aktiv zu.
3. Der Anbieter versendet ausschließlich die Bestätigungs-E-Mail. Keine Produktempfehlung und kein Guide-Link in dieser DOI-Mail.
4. Ohne Bestätigung keine Newsletteraufnahme und keine Folgeserie. Unbestätigte Versuche nach einem festzulegenden kurzen Löschkonzept behandeln.
5. Nach Bestätigung: eine Willkommensmail mit dem PDF-Link. Entweder die abschließende Formular-E-Mail oder eine Automation dafür nutzen, nicht beide parallel.
6. Bestätigte neue Anmeldung startet die kurze Einstiegsserie genau einmal. Bestehende Abonnentinnen erhalten den angeforderten Guide, ohne die Serie bei jedem Formularaufruf neu zu starten.
7. Vor jedem weiteren Versand aktuellen Abmeldestatus prüfen. Abmeldung, Beschwerde oder Hard Bounce beendet die Serie und verhindert neue Marketingmails.
8. Anschließend maximal zwei redaktionelle Ausgaben pro Monat im vorgeschlagenen Modell.

Keine bestätigten Kontakte aus fremden Listen importieren und keine persönlichen Testkontakte ohne deren Einverständnis anschreiben.

## Vorbereitete E-Mail-Texte

### Bestätigung, direkt nach Formularübermittlung

**Betreff:** Bitte bestätige deine Newsletter-Anmeldung

Du hast dich für den Newsletter von Milchpumpe-Vergleich.de angemeldet. Bitte bestätige deine Anmeldung über die Schaltfläche. Danach schicken wir dir deinen PDF-Kaufcheck.

**Schaltfläche:** Ja, Newsletter-Anmeldung bestätigen

Falls du die Anmeldung nicht angefordert hast, ignoriere diese E-Mail.

Technik: Anbieter-eigenen eindeutigen DOI-Link einsetzen. Ein normaler Homepage-Link ersetzt ihn nicht. Keine Affiliate-Werbung in dieser E-Mail.

### E-Mail 1, sofort nach bestätigter Anmeldung

**Betreff:** Dein Milchpumpen-Kaufcheck ist da

Danke für deine Bestätigung. Hier kannst du den Kaufcheck herunterladen:

**Schaltfläche:** PDF-Kaufcheck öffnen

Beginne mit deinem Alltag: Wann möchtest du pumpen, was ist schon vorhanden und welche Fragen musst du vor dem Kauf noch klären? Halte auf dem Kaufzettel auch die genaue Setvariante fest. Ein Ersatzbecher ist schließlich keine zweite vollständige Pumpe.

In den nächsten Tagen bekommst du die angekündigten Einstiegstipps. Jede E-Mail enthält einen Abmeldelink.

Technik: Nur eine bereits hochgeladene und geprüfte echte PDF-Datei verlinken. Keinen Platzhalter versenden.

### E-Mail 2, zwei Tage nach Bestätigung

**Betreff:** Hands-free bedeutet nicht immer schlauchlos

Bei manchen Pumpen sitzt der Motor direkt im BH. Bei anderen befinden sich dort nur die Auffangschalen; ein Schlauch führt zur separaten Motoreinheit. Beides kann die Hände freilassen, braucht aber unterschiedlich viel Platz am Körper und in deiner Tasche.

Notiere in deinem Kaufcheck, wo du pumpen möchtest und wo ein separater Motor unterkommen könnte.

**Artikel-Link:** Bauarten und Kaufcheck auf der Website lesen.

Ziel vor Versand prüfen: /ratgeber/hands-free-milchpumpe-kaufen/

### E-Mail 3, vier Tage nach Bestätigung

**Betreff:** Was ist in deinem Pumpset wirklich enthalten?

Das Produktfoto zeigt nicht immer nur den Lieferumfang der ausgewählten Variante. Prüfe die Zahl der vollständigen Pumpeneinheiten, die enthaltenen Größen und das Ladezubehör. Ähnlich benannte Generationen können andere Teile benötigen.

Vergleiche deine vorhandene Ausstattung mit dem Kaufzettel. Vielleicht fehlt nur ein passendes Teil statt einer neuen Pumpe.

**Artikel-Link:** Einzel- und Doppelsets auf der Website einordnen.

Ziel vor Versand prüfen: /ratgeber/milchpumpe-einzel-oder-doppelpumpe/

### E-Mail 4, sieben Tage nach Bestätigung

**Betreff:** Welche Bauart bleibt auf deinem Kaufzettel übrig?

Wenn du Einsatz, Passformfragen und Lieferumfang sortiert hast, kannst du die Modelle gezielter eingrenzen. Der Überblick auf unserer Website unterscheidet Pumpen mit integriertem Motor von Systemen mit separatem Motor und nennt die zugehörigen Herstellerquellen.

**Artikel-Link:** Tragbare Milchpumpen nach Bauart auswählen.

Du musst nicht sofort bestellen. Offene Passformfragen lassen sich mit der passenden Anleitung und qualifizierter Beratung klären.

Ziel vor Versand prüfen: /tragbare-milchpumpen/

Alle regulären E-Mails: rechtliches Absenderfooter, Impressum-/Datenschutzlink, funktionierender Abmeldelink; werbliche Produktempfehlungen kennzeichnen. Im vorgeschlagenen Ablauf führen die Artikelbuttons zur eigenen Website, nicht direkt zu Amazon.

## Betrieb und Datenschutz

- Verifizierte eigene Absenderadresse verwenden; SPF/DKIM nach Anbieteranleitung und DMARC abgestimmt konfigurieren. Bestehende DNS-/Maildienste nicht überschreiben.
- Auftragsverarbeitung, eingesetzte Unterauftragnehmer, Datenverarbeitung und Datenschutzerklärung vor dem Start prüfen.
- Einwilligungstext mit Versionsstand und DOI-Nachweis dokumentieren; keine unbegrenzte Aufbewahrung versprechen.
- Öffnungs- und individuelles Klicktracking im ersten Aufbau deaktivieren. Keine stillbezogenen Gesundheitsprofile, Symptome oder Angaben zum Baby sammeln.
- Kontakte aus dem Anbieter steuern, nicht aus einer öffentlich abgelegten CSV. Keine E-Mail-Adressen, Tokens oder Schlüssel im Repository, in URLs oder in Analytics.
- Zeitpunkte dienen dem Versandablauf, nicht der Diagnose eines Stillbedarfs. Keine Newsletter-Verzweigung nach Gesundheitsangaben.
- Keine automatische Rückkehr in den Newsletter nach Abmeldung. Erneute Anmeldung nur mit neuem wirksamem Opt-in.

## Abnahme vor Aktivierung

- [ ] Anbieter/Konto bestätigt und keine unbeauftragten Kosten.
- [ ] Tatsächliches PDF produziert, mobil und auf Papier geprüft.
- [ ] Formularbedingung, Newsletterinhalt und vorgeschlagene Frequenz sichtbar.
- [ ] Konkretes Kopplungs-/Einwilligungsmodell rechtlich geprüft.
- [ ] Datenschutz-/Absendertexte ergänzt und Absender authentifiziert.
- [ ] Ungültige Adresse abgewiesen, keine vorausgewählte Einwilligung.
- [ ] Ohne DOI keine PDF-Willkommensmail und keine Folgeserie.
- [ ] Mit DOI genau eine echte PDF-Zustellung.
- [ ] Wiederholte Anmeldung löst keine doppelte Serie aus.
- [ ] Abmeldung zwischen zwei Schritten verhindert die nächste Marketingmail.
- [ ] Mobilansicht, Fehlermeldungen, Zustellung und alle Artikellinks geprüft.
- [ ] Test nur mit eigener/freigegebener Adresse, keine echte Liste angeschrieben.

## Sources

[1] https://help.brevo.com/hc/de/articles/208771869-Erstellen-eines-Anmeldeformulars-in-Brevo
[2] https://help.brevo.com/hc/de/articles/208733449-Double-Opt-In-DOI-Was-das-ist-und-wie-du-die-Anmeldungen-von-Benutzer-innen-verfolgen-kannst
[3] https://datenschutzkonferenz-online.de/media/oh/OH-Werbung_Februar%202022_final.pdf
