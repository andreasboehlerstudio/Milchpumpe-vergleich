# Newsletter-Anbindung: tatsächlicher Stand und Freigabekriterien

## Entscheidung und aktueller Zustand

- Versanddienst: Brevo neu einrichten; der Betreiber übernimmt Registrierung und Absenderfreigabe.
- Website bleibt bei statischem React/GitHub Pages. Keine Provider-Schlüssel im Browser, Repository oder Chat.
- `src/newsletter-config.ts` enthält nur öffentliche Verbindungsmetadaten. Alle Freigaben sind derzeit ausdrücklich **false**; kein produktives Formularziel wurde erfunden.
- `src/newsletter.tsx` zeigt den gestalteten Inhaltsblock nur bei vollständig bestätigter Verbindung. Bis dahin werden weder E-Mail-Adressen erfasst noch externe Formularskripte geladen.
- Anmeldung: bewusst angeklicktes, von Brevo gehostetes Formular. Keine Popups, automatische Fremd-Embeds oder Frontend-Kontaktspeicherung.
- Der achtseitige PDF-Guide mit 16 ausfüllbaren Feldern ist produziert und geprüft; Quelle: `tools/purchase-guide/`, privates Ergebnis: `private/newsletter-guide/`. Eine geprüfte Datei ist noch kein bestätigter Versand.

## Einrichtung nach der Registrierung

1. Verifizierte Absenderadresse und gewünschten sichtbaren Absender im echten Brevo-Konto ablesen. Keine aus anderen Projekten übernommene Adresse erraten. Kein Upgrade oder kostenpflichtiges Zusatzpaket ohne Freigabe.
2. Brevo-Vertrag/Auftragsverarbeitung und tatsächliche Kontofunktionen vom Betreiber prüfen lassen. Der konfigurierte Formularablauf ersetzt keine individuelle rechtliche Prüfung der Newsletter-/PDF-Kopplung.
3. Eigene Liste nur für bestätigte Anmeldungen dieser Website anlegen. Keine bestehenden Kontakte importieren oder ungefragt anmelden.
4. Ganzseitiges/eingebettetes Brevo-Anmeldeformular erstellen. Nur E-Mail als Pflichtangabe; nicht vorausgewähltes Einwilligungsfeld, Link zu Impressum/Datenschutz und geeigneter Spam-Schutz.
5. Beschriebene Einwilligung: Newsletter von Milchpumpe-Vergleich.de mit Tipps zur Pumpenauswahl, zum Abpumpalltag und gelegentlichen Produktempfehlungen; zum Start PDF-Kaufcheck, danach bis zu zwei E-Mails monatlich; jederzeitige Abmeldung. Im ursprünglichen Konzept beschriebene Tag-2/4/7-Serie bleibt **deaktiviert**, bis sie ausdrücklich eingerichtet und geprüft ist.
6. Brevos eingebaute doppelte Bestätigung verwenden. Den Bestätigungslink im Editor über den Linktyp **Double opt-in link** einfügen, keine normale Homepage-URL oder geratenen Template-Platzhalter als Ersatz.
7. DOI-E-Mail enthält ausschließlich Bestätigungszweck und denselben Einwilligungstext, keine Werbung und noch keinen PDF-Download.
8. Genau **einen** Zustellweg nach Bestätigung einrichten: abschließende Bestätigung oder Welcome-Automation. PDF bevorzugt als geprüften Anhang versenden, wenn die tatsächliche Konto-/Template-Funktion dies unterstützt. Marketingkampagnen unterstützen laut Brevo einen PDF-Anhang bis 4 MB; das beweist nicht automatisch dieselbe Funktion für jede DOI-/Welcome-Vorlage. Nicht ungeprüft auf das finale Bestätigungstemplate übertragen.
9. Keine komplette PDF-Datei in `public/` legen, solange Zustellung ausschließlich nach Anmeldung gewünscht ist. Eine öffentliche oder nur mit `noindex` versehene URL ist keine echte Zugangsbeschränkung. Falls Anhang nicht unterstützt wird, geschützten Zustellweg mit dem Betreiber abstimmen, statt Exklusivität vorzutäuschen.
10. Öffnungs-/Klicktracking für diesen einfachen Ablauf möglichst deaktivieren; kein zusätzlicher Website-Tracker. Unbestätigte Kontakte bekommen weder Guide noch weitere Werbung. Abmeldung, Beschwerde und Hard Bounce müssen weitere Marketing-Zustellung verhindern.
11. Tatsächlichen Datenschutzabschnitt veröffentlichen, der zum eingerichteten Formular/Versand und seinen Aufbewahrungs-/Tracking-Einstellungen passt. Kein vorzeitiger Text, der nicht bestehende Dienste als aktiv darstellt.
12. Erst nach erfolgreicher, ausdrücklich freigegebener Testanmeldung: Formular, DOI-Zustellung, echte Bestätigung, PDF-Datei/Anhang und funktionierende Abmeldung prüfen. Keine erfundenen Kontakte/Testnachrichten, keine fremden Adressen und keine Bestätigung stellvertretend für andere Personen.
13. Exakte öffentliche Brevo-Formular-URL und nur die tatsächlich verifizierten Freigaben in `NEWSLETTER_CONNECTION` setzen. Private Ereignis-/Zustellbelege getrennt vom öffentlichen Repository halten.
14. Neu bauen, Tests und Browserprüfung, veröffentlichen und exaktes Live-Ziel samt Datenschutzhinweis erneut lesen. Erst dann die Anmeldung als aktiv melden.

## Quellen, am 15.10.2026 abgerufen

- Brevo: https://help.brevo.com/hc/de/articles/208771869-Erstellen-eines-Anmeldeformulars-in-Brevo
- Brevo DOI und Ereignis-/Transaktionsnachweise: https://help.brevo.com/hc/de/articles/208733449-Double-Opt-In-DOI-Was-das-ist-und-wie-du-die-Anmeldungen-von-Benutzer-innen-verfolgen-kannst
- DOI-Template und eingebauter Linktyp: https://help.brevo.com/hc/en-us/articles/360019540880-Create-a-custom-double-opt-in-DOI-email-template-for-a-sign-up-form-created-in-Brevo
- PDF-Anhang in Kampagnen; Umfang nicht auf alle Versandarten übertragen: https://help.brevo.com/hc/en-us/articles/11098615382802-Add-an-attachment-to-an-email-campaign
- Provider-Datenschutzhinweise: https://www.brevo.com/legal/privacypolicy/
