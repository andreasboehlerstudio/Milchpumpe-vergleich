// Editorial task sheets, independent of newsletter/provider readiness.
export type FreeGuide = {
  slug: string; title: string; heading: string; lead: string; task: string; outcome: string;
  note: string; inside: { title: string; text: string }[]; steps: string[];
  sources: { title: string; href: string; context: string }[];
  articles: { slug: string; title: string }[];
};
const cooling = { title: 'Gesund ins Leben: Muttermilch abpumpen', href: 'https://www.gesund-ins-leben.de/fuer-familien/alles-fuer-die-stillzeit/muttermilch-abpumpen', context: 'Sofortiges Kühlen nach dem Abpumpen und durchgehende Kühlung beim Transport; keine pauschale Freigabe beliebiger Kühltaschen.' };
const bzfe = { title: 'BZfE: Muttermilch abpumpen', href: 'https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen', context: 'Grundhygiene für Pumpset und Behälter sowie Unterstützung durch Hebammen und Stillberatung.' };
const commission = { title: 'Nationale Stillkommission: Umgang mit Muttermilch', href: 'https://www.mri.bund.de/fileadmin/MRI/Themen/Stillkommission/PDFUA_Stellungnahme_Umgang_Muttermilch_bfrei.pdf', context: 'Sammlung und Aufbewahrung für das gesunde eigene Kind, einschließlich getrennter Aufbewahrung im Personalkühlschrank.' };
const cups = { title: 'Medela: Hands-free Collection Cups – Anleitung', href: 'https://www.medela.com/040-services/manual-instructions/instruction-manuals-for-medela-accessories--pumping-accessories/hands-free-collection-cups-.pdf', context: 'Herstellerbeispiel für komponentenbezogene Pflege und saubere, trockene Teile vor dem Zusammenbau. Englisch/französisch/spanische Fassung; nicht auf jedes Modell oder deutsche Set übertragbar.' };
const fit = { title: 'Medela: Room to Move – Größenhilfe', href: 'https://www.medela.com/en/breastfeeding-pumping/articles/pumping-tips/a-step-by-step-guide-to-breast-shield-sizes', context: 'Herstellerbezogene Orientierung, keine universelle Größenregel; bei anhaltenden Schmerzen fachliche Unterstützung suchen.' };
const elvie = { title: 'Elvie: Perfecting Size and Fit', href: 'https://elvie.com/pages/perfecting-size-and-fit', context: 'Der Hersteller unterscheidet Teile für Pump/Stride und Stride 2. Gleiche Marke oder Maßangabe allein belegt keine Kompatibilität; regionale Zuordnung gesondert prüfen.' };
export const FREE_GUIDES: readonly FreeGuide[] = [
  {
    slug: 'unterwegs-packplan', title: 'Dein Unterwegs-Packplan fürs Abpumpen',
    heading: 'Was braucht dein Pumpen-Ausflug außer einem vollen Akku?',
    lead: 'Plane deinen Weg, den Pumpplatz und deine persönliche Packliste – von der Abfahrt bis zur Rückkehr.',
    task: 'Nimm einen konkreten Termin statt „unterwegs“ im Allgemeinen: Wo bist du, was ist dort möglich und welche vorhandenen Dinge brauchst du dafür?',
    outcome: 'Am Ende hast du einen Streckenplan, einen persönlichen Packzettel und eine kurze Liste der Ortsfragen, die du noch klären möchtest.',
    note: 'Der Plan bewertet keine Haltbarkeit. Nach dem Abpumpen sofort kühlen und den Transport mit durchgehender Kühlung organisieren. Ist der Kühlweg unklar, fachlich nachfragen statt eine unbekannte Warmphase als sicher einzuordnen. Bei Frühgeburt, Erkrankung oder besonderen Vorgaben gilt eine individuelle fachliche Abstimmung.',
    inside: [
      { title: 'Ein Termin, ein Weg', text: 'Abfahrt, Rückkehr und Stationen festhalten. Für den Zielort ruhigen Platz, Händewaschen, saubere Ablage, Strom und Kühlung als geklärt, offen oder nicht benötigt einordnen.' },
      { title: 'Was gehört wirklich in meine Tasche?', text: 'Vom eigenen Pumpset über Behälter bis zur Energieversorgung: Vorhandenes prüfen, Mitnehmen markieren und Fehlendes von offenen Fragen trennen. Reserve nur einplanen, wenn sie für diesen Ablauf nötig und passend ist.' },
      { title: 'Wo bleibt die Milch?', text: 'Behälterkennung, Gewinnungszeit, Kühlbeginn, Kühlplätze und Übergabeperson auf dem Weg notieren. Transportbehälter und Kühlelemente nach ihrer Anleitung vorbereiten.' },
      { title: 'Vor der Tür / wieder zu Hause', text: 'Vor Abfahrt Vollständigkeit und Zielkontakt prüfen. Danach gebrauchte Teile in den Pflegeablauf geben und notieren, was beim nächsten Mal fehlt – oder zu Hause bleiben kann.' },
    ],
    steps: ['Wähle den nächsten tatsächlichen Ausflug und gehe seine Stationen im Kopf durch.', 'Kläre offene Ortsfragen mit dem Zielkontakt, bevor du die Packliste abschließt.', 'Packe nach deinem eigenen Set und seiner Anleitung; ergänze den Kühlweg und die Rückkehrkontrolle.'],
    sources: [cooling, bzfe, commission],
    articles: [{ slug: 'milchpumpe-fuer-unterwegs', title: 'Unterwegs mehr als den Akku einplanen' }, { slug: 'stilleinlagen-einweg-mehrweg-unterwegs-organisieren', title: 'Stilleinlagen unterwegs organisieren' }, { slug: 'reserve-pumpset-reinigen-trocknen-organisieren', title: 'Ein Reserve-Pumpset organisieren' }],
  },
  {
    slug: 'arbeitsplatz-uebergabeplan', title: 'Dein Arbeitsplatz- und Übergabeplan',
    heading: 'Wo ist deine Milch, wenn dein Arbeitstag vorbei ist?',
    lead: 'Halte Absprachen, Kühlplätze und Übergaben für deinen Arbeitstag fest – vom ersten Gespräch bis zur Heimfahrt.',
    task: 'Gehe einen wiederkehrenden Arbeitstag mit den beteiligten Personen durch: Wer ermöglicht Zugang, wer organisiert die Kühlung und wer übernimmt am Ziel?',
    outcome: 'Du erhältst ein Gesprächsblatt, eine dokumentierte Kühlstrecke und eine wiederverwendbare Übergabekarte mit Zuständigkeiten.',
    note: 'Das Blatt ist keine Rechtsberatung und kein medizinischer Pumpplan. § 7 Abs. 2 MuSchG nennt auf Verlangen in den ersten zwölf Monaten Mindestfreistellungen von zweimal einer halben Stunde oder einmal einer Stunde; besondere Bedingungen stehen im Gesetz. Das Familienportal bezieht Abpumpen ausdrücklich ein. § 23 regelt Entgeltausfall, Vor-/Nacharbeit und Ruhepausen. Beschäftigungsstatus und individuelle Situation gesondert prüfen. Sofortiges Kühlen und durchgehende Kühlung bleiben unabhängig von der betrieblichen Absprache wichtig.',
    inside: [
      { title: 'Das Gespräch vor dem ersten Arbeitstag', text: 'Kontakt, Gesprächsdatum, geeigneten Ort, Zugang, Freistellung und Vertretung notieren. Unterscheide angesprochen, vereinbart und Rückfrage – eine Anfrage ist noch keine Zusage.' },
      { title: 'Der Kühlplatz ist auch eine Zugangsfrage', text: 'Unmittelbaren Kühlplatz, getrennten Boxplatz und Prüfung der Bedingungen festhalten. Zugang während der Schicht, nach Feierabend und bei Vertretung mitdenken.' },
      { title: 'Vom Arbeitsplatz bis zur Übergabe', text: 'Kennung, Gewinnungszeit und Zustand der Milch dokumentieren. Abfahrt, Ankunft, Zielkontakt und vereinbarten Kühlplatz zuordnen; Annahmebedingungen einer Betreuung vorab besprechen.' },
      { title: 'Ein Arbeitstag, den wir gemeinsam durchgehen', text: 'Schritt für Schritt die zuständige Person und offene Rückfragen eintragen. Einen erreichbaren Kontakt bei Ausfall festhalten, ohne daraus eine pauschale Sicherheits- oder Rechtsfreigabe abzuleiten.' },
    ],
    steps: ['Bereite das Gespräch mit der Personalstelle oder deiner zuständigen Ansprechperson vor.', 'Gehe den tatsächlichen Zugang zu Raum und Kühlung bis nach Feierabend gemeinsam durch.', 'Fülle eine Übergabekarte für deinen Weg aus und kläre offene Zuständigkeiten, bevor du sie wiederverwendest.'],
    sources: [cooling, commission, { title: '§ 7 MuSchG: Freistellung', href: 'https://www.gesetze-im-internet.de/muschg_2018/__7.html', context: 'Voraussetzungen und Mindestfreistellungen; keine Empfehlung für Pumpintervalle.' }, { title: '§ 23 MuSchG: Entgelt und Freistellungszeiten', href: 'https://www.gesetze-im-internet.de/muschg_2018/__23.html', context: 'Kein Entgeltausfall durch die Freistellung nach § 7; keine Vor-/Nacharbeit oder Anrechnung auf gesetzliche Ruhepausen.' }, { title: 'Familienportal: Freistellung zum Stillen', href: 'https://familienportal.de/familienportal/familienleistungen/mutterschutz/wie-lange-muss-mich-mein-arbeitgeber-zum-stillen-freistellen--192660', context: 'Behördliche Erläuterung, die das Abpumpen ausdrücklich einschließt.' }],
    articles: [{ slug: 'muttermilch-arbeitsplatz-transport-kuehlkette', title: 'Vom Arbeitsplatz nach Hause: Kühlkette planen' }, { slug: 'muttermilch-kuehlschrankbox-getrennt-aufbewahren', title: 'Im Kühlschrank getrennt aufbewahren' }, { slug: 'muttermilch-kita-mitgeben', title: 'Absprachen zur Übergabe in der Kita' }],
  },
  {
    slug: 'reinigung-teileroutine', title: 'Deine Reinigungs- und Teileroutine',
    heading: 'Welche Teile sind wirklich wieder bereit fürs nächste Mal?',
    lead: 'Ordne die Teile deiner Pumpe den passenden Pflegehinweisen zu und halte fest, was benutzt, in Trocknung oder einsatzbereit ist.',
    task: 'Lege die Anleitung deines vorhandenen Systems daneben und übersetze ihre komponentengenauen Pflegehinweise in deinen eigenen Ablauf.',
    outcome: 'Eine Pflegematrix und eine Statusübersicht helfen dir, den Pflegeweg einzelner Teile nachzuhalten – ohne einen pauschalen Hygieneplan für alle Pumpen.',
    note: 'Waschen, Desinfizieren und Sterilisieren sind nicht dasselbe. Die genaue Anleitung deines Modells und individuelle fachliche Vorgaben sind maßgeblich. Motor, Schläuche und Ladeteile nicht automatisch als Spülteile behandeln. Widersprüchliche Anleitungen mit dem Hersteller klären; es gibt hier keine universelle Waschfreigabe oder Wechselhäufigkeit.',
    inside: [
      { title: 'Erst die richtige Anleitung', text: 'Modell, Generation, Cup-/Flaschensystem und Dokumentfassung festhalten. Relevante Pflegekapitel und offene Abweichungen markieren, statt eine fremde Routine zu übernehmen.' },
      { title: 'Jedes Teil hat seinen Pflegeweg', text: 'Je Teil Demontage, freigegebenes Waschverfahren, zusätzliche Behandlung, Trocknen und Lagerung eintragen. Die Quelle bleibt direkt bei der jeweiligen Komponente.' },
      { title: 'Benutzt, in Trocknung, einsatzbereit', text: 'Eigene Teil- oder Setkennungen den drei Zuständen zuordnen und verbleibende Aufgaben sichtbar halten. Noch feucht wird nicht vorschnell als bereit markiert.' },
      { title: 'Meine kurze Abschlusskontrolle', text: 'Eine persönliche Kontrolle aus den Vorgaben zusammenstellen: Pflege erledigt, trocken, vollständig, Zustand geprüft und geschützt gelagert. Unklare oder beschädigte Teile gesondert notieren.' },
    ],
    steps: ['Prüfe zuerst, ob die Anleitung wirklich zu deinem Modell und deiner Generation gehört.', 'Übertrage jede Komponente einzeln in die Matrix; lasse unbekannte Verfahren offen.', 'Nutze die Statusübersicht nach deinem Pflegeablauf und kläre Abweichungen beim Hersteller statt eine Regel zu erfinden.'],
    sources: [bzfe, cups, commission],
    articles: [{ slug: 'milchpumpe-reinigen', title: 'Milchpumpe hygienisch reinigen' }, { slug: 'milchpumpe-reinigen-ohne-spuelmaschine', title: 'Der Handspül-Ablauf ohne Spülmaschine' }, { slug: 'reserve-pumpset-reinigen-trocknen-organisieren', title: 'Reserve, Trocknung und Lagerung organisieren' }, { slug: 'medela-freestyle-hands-free-drei-teile-reinigung', title: 'Medela-Cups: drei Teile im Modellkontext' }],
  },
  {
    slug: 'passform-beratungsvorbereitung', title: 'Dein Vorbereitungsblatt für die Passform-Beratung',
    heading: 'Was solltest du zur Passform-Beratung mitbringen – außer deiner Pumpe?',
    lead: 'Sammle Modellangaben, vorhandene Aufsätze und deine Fragen für das Gespräch mit Hebamme oder qualifizierter Stillberatung.',
    task: 'Bereite deinen nächsten Beratungstermin vor: Welches System nutzt du, was ist dir bereits aufgefallen und welche drei Fragen sind dir besonders wichtig?',
    outcome: 'Du hast Modellblatt, freiwillige Beobachtungsnotizen und eine Gesprächsagenda beisammen. Nächste Schritte werden im Gespräch festgehalten, nicht vom PDF berechnet.',
    note: 'Keine Größentabelle, Selbstdiagnose oder Behandlungsempfehlung. Bei unangenehmem oder schmerzhaftem Pumpen die Anwendung beenden und passende Unterstützung suchen; Beschwerden nicht zum Ausfüllen erneut provozieren. Aufgedruckte Millimeterwerte beschreiben vorhandene Teile, nicht automatisch deine passende Größe. Deine persönlichen Notizen bleiben bei dir und werden hier nicht erhoben.',
    inside: [
      { title: 'Mein System für den Termin', text: 'Genaue Pumpe, Generation, Aufsatzsystem und Bezeichnungen vorhandener Hauben oder Einsätze sammeln. Anleitung und Termin ergänzen, damit die Beratung das tatsächliche System zuordnen kann.' },
      { title: 'Was mir aufgefallen ist', text: 'Freiwillig bereits bemerkte Beobachtungen notieren: wann, welche Seite, welches Teil und welche Frage. Keine Mindestmenge, Bewertungsskala oder Aufforderung zu einem weiteren Versuch.' },
      { title: 'Meine Fragen an die Beratung', text: 'Drei Fragen priorisieren: passende Anleitung, Sitz und Anwendung, Unterstützung bei Beschwerden oder notwendige ärztliche Abklärung. Das Blatt rechnet keine Messwerte in Größen um.' },
      { title: 'Was wir geklärt haben', text: 'Besprochene nächste Schritte, gegebenenfalls genau zugeordnete Teile und offene Fragen festhalten. Auch noch nichts bestellen oder erst beim Hersteller nachfragen ist ein mögliches Ergebnis.' },
    ],
    steps: ['Sammle die Bezeichnungen deiner vorhandenen Pumpe und Aufsätze aus Anleitung und Beschriftung.', 'Notiere nur, was dir schon aufgefallen ist; wähle deine wichtigsten Fragen aus.', 'Nimm das Blatt zur Beratung mit und halte die dort besprochenen nächsten Schritte fest.'],
    sources: [bzfe, fit, cups, elvie],
    articles: [{ slug: 'richtige-flanschgroesse', title: 'Flanschgröße richtig einordnen' }, { slug: 'philips-avent-scf547-einsaetze-15-17-mm', title: 'Philips Avent: Einsätze modellbezogen zuordnen' }, { slug: 'milchpumpe-zubehoer-checkliste', title: 'Zubehör ohne unnötige Extras einordnen' }],
  },
  {
    slug: 'set-teilepass', title: 'Dein Set- und Teilepass',
    heading: 'Passt das Ersatzteil wirklich zu deinem Set – oder nur zum Markennamen?',
    lead: 'Dokumentiere dein vorhandenes System, seine Teile und offene Herstellerfragen, bevor du etwas ergänzt oder nachbestellst.',
    task: 'Beginne mit deinem vorhandenen Set und kläre einen konkreten Bedarf: Was fehlt tatsächlich und welcher schriftliche Nachweis ordnet das gewünschte Teil deinem Modell zu?',
    outcome: 'Ein aufbewahrbarer Systempass, ein Bestandsabgleich und eine präzise Supportfrage helfen dir, eine Ergänzung zu klären – oder Vorhandenes weiterzunutzen.',
    note: 'Der Pass ist keine Kompatibilitätsdatenbank. Ähnliches Aussehen, gleicher Markenname und gleiche Millimeterangabe ersetzen keine ausdrückliche Herstellerzuordnung. Generation, Region und Aufsatzsystem können entscheidend sein. Seriennummern nicht öffentlich teilen; es gibt keinen pauschalen Wechselkalender und keine Pflicht, Zubehör nachzukaufen.',
    inside: [
      { title: 'Mein vorhandenes System', text: 'Marke, Modell, Generation, regionale Variante, Cup-/Flaschensystem und Single-/Double-Konfiguration anhand deiner Dokumentation erfassen. Die passende Anleitung gleich dazulegen.' },
      { title: 'Was ist wirklich da?', text: 'Teilename, genaue Kennung, Anzahl, Zustand und erforderlichen Bestand abgleichen. Kategorien an dein Modell anpassen: Nicht jedes System hat dieselben Komponenten.' },
      { title: 'Ein Bedarf, ein Freigabenachweis', text: 'Gewünschtes Teil mit Artikelnummer und Variante notieren. Ausdrückliche Modellzuordnung, Einschränkungen und Quelle mit eigenem Prüfdatum festhalten; Widersprüche bleiben offen.' },
      { title: 'So frage ich konkret nach', text: 'Eine Supportfrage mit vorhandenem Modell, System und gesuchter Funktion vorbereiten. Nach benötigten Zusatzkomponenten und schriftlicher Zuordnung fragen; Antwort und offene Bedingungen dokumentieren.' },
    ],
    steps: ['Erfasse dein tatsächliches Modell aus Gerätedokumentation und Anleitung, nicht nur den Markennamen.', 'Gleiche den Bestand ab und grenze einen konkreten Bedarf ein; ausreichend Vorhandenes wird nicht erneut gekauft.', 'Prüfe die schriftliche Herstellerzuordnung oder nutze die Supportvorlage. Bestelle nicht auf Grundlage einer bloßen Ähnlichkeit.'],
    sources: [elvie, fit, cups],
    articles: [{ slug: 'milchpumpe-zubehoer-checkliste', title: 'Zubehör: was du wirklich brauchst' }, { slug: 'milchpumpe-ersatzteile-ventile-membranen', title: 'Ventile und Membranen modellbezogen prüfen' }, { slug: 'philips-avent-scf547-11-oder-scd553-11', title: 'Philips Avent: Setinhalt unterscheiden' }, { slug: 'momcozy-s12-pro-quick-unterschiede', title: 'Momcozy S12 Pro und Quick: Generationen' }],
  },
];
export const FREE_GUIDES_HUB = '/gratis-guides/';
export const FREE_GUIDES_HUB_HEADING = 'Ein konkreter nächster Schritt. Dein Guide dazu.';
export const freeGuidePath = (guide: FreeGuide) => `${FREE_GUIDES_HUB}${guide.slug}/`;
export const freeGuidePdf = (guide: FreeGuide) => `/downloads/${guide.slug}.pdf`;
export const freeGuidePreview = (guide: FreeGuide) => `/free-guide-assets/${guide.slug}-preview.webp`;
export const FREE_GUIDE_SEO = [
  { path: FREE_GUIDES_HUB, title: 'Gratis-Guides zum Abpumpen: fünf kostenlose PDFs', description: 'Fünf Arbeitsblätter für unterwegs, Arbeitsplatz, Reinigung, Passform-Beratung und Teilebedarf. Vollständige PDFs kostenlos und ohne Anmeldung.', heading: FREE_GUIDES_HUB_HEADING, changefreq: 'monthly' as const, priority: 0.7, dateModified: '2026-10-15' },
  ...FREE_GUIDES.map(guide => ({ path: freeGuidePath(guide), title: `${guide.title} – kostenloser PDF-Guide`, description: `${guide.lead} Vollständiges PDF kostenlos und ohne Anmeldung.`, heading: guide.heading, changefreq: 'monthly' as const, priority: 0.6, dateModified: '2026-10-15' })),
];
