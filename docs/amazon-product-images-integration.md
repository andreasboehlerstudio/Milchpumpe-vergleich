# Echte Produktbilder: Einbettungsweg für diese Website

## Aktueller Stand

Die Website ist eine React/Vite-Anwendung mit vorgerenderten HTML-Seiten auf GitHub Pages, keine WordPress-Installation. Die Produktkarten verwenden aktuell grafische Modellkennzeichnungen; das sind keine Produktfotos. Ein Amazon-Affiliate-Tag allein ist kein Bildzugang und keine pauschale Nutzungserlaubnis.

Am Abruf dieser Dokumentation wurde kein authentifizierter Creators-API-Zugriff nachgewiesen, keine API-Antwort mit echten Bilddaten empfangen und kein Produktfoto über die API integriert. Keine Geheimnisse wurden angefordert oder in das Repository geschrieben.

## Der offizielle Weg

Die Creators API kann Katalogdaten über GetItems, SearchItems und Variantenoperationen liefern. Die aktuelle Einführung nennt unter anderem mindestens zehn qualifizierte Verkäufe innerhalb der letzten 30 Tage für Zugriff auf die PA API durch die Creators API. Die tatsächliche Account-Freigabe muss im Partnernet geprüft werden; eine aktive Tracking-ID beweist sie nicht.[1]

Die Ressource `images.primary.large` liefert die Bild-URL sowie tatsächliche Höhe und Breite zum Artikel. Sie ist für alle Locales dokumentiert. Beispielantworten in der Dokumentation sind keine abgerufenen Daten für die Milchpumpen dieser Website.[2]

Die Registrierung setzt einen geprüften und endgültig akzeptierten Associates-Account voraus. Nur der Hauptkontoinhaber kann die Anmeldung vornehmen. Die Zugangsdaten bestehen laut Onboarding aus Credential ID, Secret und Version; sie müssen geschützt außerhalb des öffentlichen Frontends bleiben.[4]

### Umsetzung für React/GitHub Pages

1. Account-Freigabe und genaue deutsche Tracking-ID im Partnernet prüfen. Keine API-Schlüssel im Chat, HTML oder öffentlichen GitHub-Repository übermitteln.
2. Einen serverseitigen Produktdatenabruf einrichten, z. B. in einer serverseitigen Function oder einem Worker. Zugangsdaten nur als geschützte Server-Secrets. Der Server darf kein offener beliebiger URL-/ASIN-Proxy sein; nur freigegebene Artikel und passende Rate Limits zulassen.
3. Für die exakt überprüfte ASIN die autorisierte API-Antwort abrufen. Titel und Ausführung mit dem ausgewählten Modell abgleichen. Eine falsche Generation darf nicht durch ein hübsches Bild ersetzt werden.
4. Bild-URL und echte Dimensionen an die Produktkarte liefern. Das Bild unverzerrt mit `object-fit: contain` darstellen. Die Karten verlinken zum passenden Amazon-Angebot mit `tag=andreasboeh09-21` und sichtbar gekennzeichnetem Affiliate-Link.
5. Ablaufzeiten strikt beachten. Die deutsche Lizenz untersagt das Speichern oder Zwischenspeichern der Bilddateien; Links auf Bilder dürfen laut dortiger Fassung bis zu 24 Stunden gespeichert werden. Daher keine Amazon-Bilder als dauerhafte Dateien in `public/` oder im GitHub-Repository ablegen. Die aktuell für den Account geltenden Creators-API-Bedingungen sind zusätzlich zu prüfen.[3]
6. Abgelaufene oder nicht bestätigte Daten nicht weiter anzeigen. Bei fehlender Berechtigung, fehlendem Modellabgleich oder API-Ausfall auf die neutrale Modellkennzeichnung und den transparenten Händlerlink zurückfallen, nicht auf ein fremdes oder erfundenes Produktfoto.
7. Nach der Integration Netzwerk-/Datenschutzbeschreibung aktualisieren: Direkt geladene Amazon-Bilder können schon beim Seitenaufruf Verbindungsdaten übertragen. Die derzeitige Aussage zum bloßen Textlink beschreibt nicht automatisch den späteren Bildabruf. Einwilligungsbedarf, Rechtsgrundlage und erforderliche Hinweise individuell prüfen.
8. Ausgehenden Link, genaue ASIN, Bildquelle, Ablaufverhalten, mobile Darstellung und Geheimnisfreiheit mit echter API-Antwort testen. Ein lokales Mock-Objekt wäre kein Nachweis einer funktionierenden Integration.

Die deutsche Lizenz fordert außerdem, dass verwendete Programminhalte mit der jeweils zugehörigen Amazon-Seite verknüpft werden. Sie enthält weitere Nutzungsbeschränkungen und vorgeschriebene Hinweise. Keine pauschale Freigabe für Pinterest-Collagen, PDFs, eigene Produktmockups oder andere Plattformen daraus ableiten.[3]

## Was eine Erweiterung leistet – und was nicht

Die aktuelle AAWP-Dokumentation beschreibt einen konkreten WordPress-Weg: Das Plugin bezieht Titel, Produktbilder, Preise und Verfügbarkeit über die Amazon Creators API. Das ist eine Option für WordPress, aber kein direkt installierbares Plugin für die vorhandene React/Vite-Website.[5] Ein WordPress-Umbau oder Plugin-Kauf wurde weder beauftragt noch vorgenommen.

Für die bestehende Website bleibt die passende technische Form eine kleine React-Produktkarten-Erweiterung mit geschütztem serverseitigem API-Abruf. Das ist eine Empfehlung, kein Nachweis eines bereits freigeschalteten oder funktionierenden API-Zugangs.

Ein WordPress-Plugin hilft einer reinen React-Website nicht direkt. Ein React-Modul kann die Karten darstellen, aber es ersetzt weder den autorisierten Datenzugang noch eine sichere serverseitige Anbindung. Eine Browser-Erweiterung, die Bilder kopiert oder ASINs erkennt, verschafft keine zusätzlichen Bildrechte.

Kein neuer Plugin-Kauf ist erforderlich, um das Layout vorzubereiten. Ohne verifizierten Zugang wäre eine als fertig bezeichnete automatische Bildanbindung jedoch irreführend. Deshalb wurde noch kein vermeintlich funktionierender API-Adapter oder Platzhalterfoto veröffentlicht.

## Alternative ohne API

Originale, tatsächlich vorhandene Produktfotos des Betreibers mit dokumentierter Nutzungsgrundlage können nach Prüfung des genauen Modells, der Generation und der Rechte eingesetzt werden. Für Hersteller-Mediendateien eine ausdrückliche Nutzungsgrundlage einholen; ein öffentlich erreichbarer Download ist keine pauschale Freigabe.

Imagegen eignet sich für allgemeine Alltagsszenen, nicht als Ersatz für ein exaktes Produktfoto oder einen echten Produkttest. Die Bilder dürfen nicht mit erfundenen Nutzeridentitäten oder angeblichen persönlichen Erfahrungen verbunden werden.

## Rechtliche Grenze

Diese technische und redaktionelle Prüfung ist keine juristische Freigabe. Vor Veröffentlichung der neuen Bildanbindung sind die aktuelle Account-Lizenz, erforderliche Hinweise und Datenschutzänderungen konkret zu prüfen.

## Sources

[1] https://partnernet.amazon.de/creatorsapi/docs/en-us/introduction
[2] https://partnernet.amazon.de/creatorsapi/docs/en-us/api-reference/resources/images
[3] https://partnernet.amazon.de/help/operating/license
[4] https://partnernet.amazon.de/creatorsapi/docs/en-us/onboarding/register-for-creators-api
[5] https://getaawp.com/docs/article/amazon-creators-api
