import { SourceLink } from './components';

const REPORTS: Record<string, { tester: string; period: string; url: string; experience: string; caveat: string }> = {
  'momcozy-m9': {
    tester: 'Alex', period: 'regelmäßige Nutzung über drei Monate',
    url: 'https://www.mumsnet.com/reviews/momcozy-m9-breast-pump-review',
    experience: 'Mumsnet berichtet über Alex, die das M9-Doppelset nutzte. Sie schilderte Probleme beim Protokollieren der Milchmenge in der App. Das ist ein konkreter Hinweis für alle, denen die Dokumentation wichtiger ist als zusätzliche Pumpmodi.',
    caveat: 'Der Bericht bezeichnet die App als unverzichtbar. Das passt nicht zur aktuellen Herstellerbeschreibung der regulären Tastenbedienung. Deshalb trennen wir diese persönliche Einschätzung von der dokumentierten Funktion: Reguläre Modi sind am Gerät auswählbar; bestimmte Zusatzprogramme benötigen die App.',
  },
  'medela-freestyle': {
    tester: 'Charlotte', period: 'einmal täglich über vier Wochen',
    url: 'https://www.mumsnet.com/reviews/medela-freestyle-breast-pump-review',
    experience: 'Mumsnet-Testerin Charlotte empfand die Freestyle Hands-free als bequem und einfach zusammenzubauen, fand sie für ein gemeinsam genutztes Büro aber zu laut. Sie schilderte außerdem einen undichten Cup, der trotz hörbarem Klick noch nicht vollständig zusammengesetzt war.',
    caveat: 'Die Lautstärke ist ihre Alltagseinschätzung, kein vergleichbarer Messwert. Auch die Reinigungsbeschreibung im Bericht ist keine aktuelle Herstelleranleitung: Für die konkreten Cups gelten die jeweils passenden Medela-Unterlagen. Ein älterer Bericht ersetzt deren Material- und Pflegehinweise nicht.',
  },
};

export function ExternalReports({ productId }: { productId: string }) {
  const report = REPORTS[productId];
  if (!report) return null;
  return <section className="section product-answer" id="fremde-erfahrungsberichte"><p className="eyebrow">Was andere im Alltag berichten</p><h2>Mumsnet-Erfahrungsbericht</h2><p><strong>Mumsnet · Testerin {report.tester}</strong><br />Im Bericht beschriebener Umfang: {report.period}.</p><p>{report.experience}</p><p>{report.caveat}</p><p>Die Erfahrungen stammen aus dem genannten Mumsnet-Bericht. Für Anwendung und Reinigung ist die aktuelle Herstelleranleitung des konkreten Modells maßgeblich. Mumsnet legt Affiliate-Finanzierung offen. Eine einzelne Erfahrung erlaubt keine Garantie für deine Passform, Milchmenge oder die aktuelle Geräte-/App-Version.</p><SourceLink href={report.url}>Den vollständigen Mumsnet-Erfahrungsbericht lesen</SourceLink></section>;
}
