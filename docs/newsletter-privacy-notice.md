# Newsletter-/PDF-Datenschutz: Implementierung und Betriebscheck

## Umfang

`src/route-legal-pages.tsx` enthält den Abschnitt `/datenschutz/#newsletter`. Dies ist eine lokale Implementierung, keine Veröffentlichung oder Freigabe der Datenerhebung. Die Änderung setzt keine Newsletter-Gates und verändert keine Anbieterkennzeichnung, Website-Analytics-Einwilligung oder Widerrufslogik.

Der Abschnitt beschreibt den vorgesehenen separaten Newsletter: Tipps zur Pumpenauswahl und zum Abpumpalltag, gelegentliche Produktempfehlungen, bis zu zwei E-Mails im Monat, DOI und der ursprüngliche achtseitige Kaufcheck als Willkommensanhang. Alle vollständigen Guides bleiben direkt ohne E-Mail erhältlich; es werden keine fünf weiteren E-Mail-Flows versprochen. Das Formular befindet sich auf der eigenen Website und übermittelt erst nach ausdrücklicher Einwilligung und Absenden per Browser-POST an Brevo. Die frühere Beschreibung eines extern geöffneten, providergehosteten Formulars gilt dafür nicht mehr.

## Quellengebundene Entscheidungen

- **Vertragsumfang öffentlich:** Die aktuell abgerufenen englischen Brevo-Bedingungen (ausgewiesene Version: 1. Oktober 2025) führen den DPA als Appendix 3 auf. Dessen Einleitung erklärt ausdrücklich, dass DPA und Annex Teil der Terms of Service sind. Die Standardbedingungen verlangen Zustimmung beim Anlegen des Kontos. Damit ist der DPA nach dem veröffentlichten Standardmodell in die AGB einbezogen, nicht erst ein separat zu unterzeichnendes Zusatzformular.[1] Der offizielle Hilfeartikel verweist ebenfalls auf diesen DPA in den Terms of Service.[2]
- **Kein kontobezogener Vertragsnachweis:** Daraus folgt kein Nachweis, welche Version oder abweichende Vereinbarung ein bestimmtes Konto tatsächlich akzeptiert hat. Der Text behauptet keinen individuell unterschriebenen oder bereits geprüften AV-Vertrag. Kontobezogene Nachweise müssen vor Aktivierung separat vorliegen.
- **Gesellschaft und Adresse aus Originalquelle:** Appendix 2 nennt für Nutzer in Deutschland, Österreich und der Schweiz die **Brevo GmbH, Köpenicker Str. 126, 10179 Berlin** als Vertrags- und Rechnungsgesellschaft. Die allgemeinen Bedingungen nennen daneben **Sendinblue**, Paris, **9-17, rue Salneuve, 75017 Paris**. Der öffentliche Abschnitt ordnet die Berliner Gesellschaft ausdrücklich den Standardbedingungen für Nutzer in Deutschland zu, statt eine tatsächliche Konto-Vertragsgesellschaft zu erfinden.[1] Die Privacy Policy nennt für die Muttergesellschaft **17 rue Salneuve, 75017 Paris**; diese quellenspezifisch abweichende Schreibweise ist kein Anlass, die AGB-Adresse frei zu normalisieren.[3]
- **Empfänger und Transfers:** DPA Annex 2 nennt unter anderem OVH/Frankreich, GCP/Belgien, Cloudflare/USA–EU und Zendesk/EU–USA. Optionale Dienste gelten nur bei tatsächlicher Nutzung als Unterauftragsverarbeiter. DPA Abschnitt 9 sieht Drittlandverarbeitung, Standardvertragsklauseln und ergänzende Maßnahmen sowie bei gültigem Rahmen das EU-US Data Privacy Framework vor. Der Abschnitt benennt diese qualifiziert, verlinkt die Liste und bietet den Kontakt für eine Kopie der einschlägigen Garantien. Er behauptet weder EU-only-Verarbeitung noch eine bestimmte Zertifizierung oder deren Prüfung im Konto.[1]
- **Datenspeicherung:** Art. 13 Abs. 2 lit. a DSGVO erlaubt Speicherdauer oder nachvollziehbare Kriterien. Art. 5 begrenzt die Speicherzwecke; Art. 7 verlangt Einwilligungsnachweis und ermöglicht Widerruf. Deshalb unterscheidet der Text aktive/unbestätigte Anmeldung, technische Protokolle, Nachweise/Rechtsverteidigung und begrenzte Abmeldesperre, ohne feste Tage, bereits implementierte Löschjobs oder Sofortlöschung sämtlicher Daten zu behaupten.[4] Brevos DPA weist die Verwaltung der Aufbewahrungsdauer dem Kunden zu; öffentliche Anbieterbedingungen ersetzen kein Löschkonzept.[1]
- **Rechtsgrundlagen:** Anmeldung/Versand beruhen auf Einwilligung; erforderlicher Einwilligungsnachweis auf Art. 6 Abs. 1 lit. c i. V. m. Art. 7 Abs. 1 DSGVO. Begrenzte Rechtsverteidigungs-, Sicherheits- und Abmeldesperrzwecke sind mit ihrem berechtigten Interesse separat Art. 6 Abs. 1 lit. f zugeordnet. Die konkrete Erforderlichkeit und Abwägung ist betrieblich zu dokumentieren.[4]
- **Tracking nicht durch Text gelöst:** Die Newsletter-Einwilligung ist keine Einwilligung in persönliche Öffnungs-/Klickmessung und unabhängig von Website-Analytics. Es gibt keine öffentliche Aussage „trackingfrei“ oder „keine Pixel“. Ohne entsprechende Einwilligung verlangt die BfDI den Versand ohne Zählpixel oder ähnliche Trackingtechnologien; eine Formulareinwilligung ersetzt deren Prüfung nicht.[5]
- **Rollen:** Brevos eigene Datenschutzhinweise ersetzen nicht die Information des Websitebetreibers; für auf Kundenweisung durchgeführten Versand verweist Brevo selbst auf die Datenschutzerklärung des jeweiligen Kunden.[3]

## Betriebscheck — vor Datenerhebung durch den Parent abzugleichen

Diese Liste ist keine Aussage, dass die Punkte bereits erledigt sind. Aktuelle kontobezogene Befunde und konkrete Sperrgründe gehören ausschließlich in `private/newsletter-privacy-implementation/implementation-review.md`.

- [ ] Kontoinhaber/Region, tatsächlich geltende Vertragsgesellschaft, akzeptierte AGB-/DPA-Version, Einbeziehung und etwaige Sondervereinbarungen nachweisen; öffentliche Standardbedingungen und tatsächlichen Vertrag getrennt dokumentieren.
- [ ] Verwendete Dienste, Empfänger, Zugriffsländer und je Transfer einschlägige Garantien prüfen; relevante Nachweise/Kopien für Auskunft verfügbar halten. Optionale SMS-/KI-/Chat-Funktionen nicht pauschal als genutzt behandeln.
- [ ] Die tatsächlichen Anmelde-, DOI-, Versand- und Abmeldedaten/Logs mit dem beschriebenen Umfang abgleichen. Wortlaut und Version der Einwilligung sowie Anmeldung und Bestätigung belastbar nachweisen; keine Gesundheits- oder PDF-Notizfelder erfassen.
- [ ] Konkretes Lösch-/Prüfkonzept für unbestätigte Anmeldungen, aktive Kontakte, technische Logs, Einwilligungsnachweise, Sperrdaten und etwaige Exporte festlegen und ausführen können. Kriterien, Verantwortliche, Prüfintervalle und begründete Ausnahmen dokumentieren; keine neue feste Frist aus dieser Notiz ableiten.
- [ ] Ausdrückliche, leere Newsletter-Checkbox, gleicher Umfang in Landingpage/Formular/DOI und klarer Direktdownload derselben vollständigen PDFs ohne Anmeldung sicherstellen. Kein vorausgewähltes Tracking und keine fünf zusätzlichen Mailserien.
- [ ] Einen autorisierten echten Ablauf belegen: Eingang einer werbefreien DOI, tatsächlicher Bestätigungsklick, danach genau eine vorgesehene Willkommens-Mail mit vollständigem ausfüllbarem Kaufcheck. HTTP-Erfolg ist weder DOI noch Zustellnachweis.
- [ ] Tatsächliche Nachrichten im Rohformat/MIME inklusive HTML, Bilder und Links prüfen: DOI, Willkommen und spätere Newsletter; Öffnungspixel, Weiterleitungs-/Trackinglinks und Kontaktzuordnung abgleichen. Konto-Einstellungen oder fehlende Statistiken allein beweisen kein Tracking-off. Ohne zulässige separate Tracking-Einwilligung keine entsprechende Messung aktivieren.[5]
- [ ] Abmeldelink tatsächlich betätigen und Sperre in Listen, Automationen und allen verwendeten Versandwegen prüfen; alternativ eingehende Widerrufe an die Betreiberadresse bearbeiten können. Nachweis-/Sperrbestände nicht für Werbung weiterverwenden.
- [ ] Auskunft, Löschung, Export und Widerspruch einschließlich begründeter Ausnahmen betrieblich bearbeiten können.
- [ ] Erst nach allen Nachweisen entscheidet der Parent separat über Gates und Veröffentlichung. Anschließend exakte Live-Datenschutzseite, `#newsletter`, Direktdateien, Consent-Wortlaut und Formverhalten zurücklesen. Dieser Auftrag übernimmt diese Entscheidung nicht.

## Lokale Regression

Neue Regression: `scripts/newsletter-privacy.test.tsx`. Sie rendert die echte Legal-Komponente ohne private Fixtures oder Netzwerk und prüft Anker, Inhalte, Drittländer, Direktdownload, getrennte Einwilligungen sowie weiter geschlossene öffentliche Gates.

```sh
npx --no-install tsx --test scripts/newsletter-privacy.test.tsx
npm run lint
```

Private Ausführungsprotokolle enthalten die beobachteten RED-/GREEN-Schritte und die weiteren tatsächlich ausgeführten Tests. Ein grüner Komponententest belegt weder Vertragsabschluss noch echten Nachrichteneingang.

## Sources

[1] https://www.brevo.com/legal/termsofuse
[2] https://help.brevo.com/hc/en-us/articles/15403782599570-Where-can-I-find-the-Data-Processing-Agreement-DPA
[3] https://www.brevo.com/legal/privacypolicy
[4] https://www.bfdi.bund.de/SharedDocs/Downloads/DE/Broschueren/INFO1.pdf?__blob=publicationFile&v=29
[5] https://www.bfdi.bund.de/DE/Fachthemen/Inhalte/Telemedien/Newsletter.html
