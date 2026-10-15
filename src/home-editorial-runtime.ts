import comparisonData from './home-editorial-data.json';
import { trackAffiliateClick } from './analytics';

type ComparisonModel = typeof comparisonData.models[number];

function required<T extends Element>(root: HTMLElement, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Approved editorial control missing: ${selector}`);
  return element;
}

export function bindEditorialHome(root: HTMLElement): () => void {
  const Controller = root.ownerDocument.defaultView?.AbortController || AbortController;
  const controller = new Controller();
  const listen = (target: EventTarget, type: string, handler: EventListener) => target.addEventListener(type, handler, { signal: controller.signal });
  const query = required<HTMLInputElement>(root, '#v4-model-search');
  const architecture = required<HTMLSelectElement>(root, '#v4-architecture');
  const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-model]'));
  const count = required<HTMLElement>(root, '#v4-model-count');
  const empty = required<HTMLElement>(root, '#v4-empty');
  const normalize = (value: string) => value.toLocaleLowerCase('de').normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
  const filterDirectory = () => {
    let visible = 0;
    for (const row of rows) {
      const matches = normalize(row.dataset.model || '').includes(normalize(query.value)) && (!architecture.value || row.dataset.architecture === architecture.value);
      row.hidden = !matches;
      if (matches) visible += 1;
    }
    count.textContent = `${visible} von ${rows.length} Modellen in der Recherche`;
    empty.hidden = visible !== 0;
  };
  listen(query, 'input', filterDirectory);
  listen(architecture, 'change', filterDirectory);
  listen(required(root, '#v4-filter-reset'), 'click', () => {
    query.value = '';
    architecture.value = '';
    filterDirectory();
    query.focus();
  });
  const a = required<HTMLSelectElement>(root, '#v9-compare-a');
  const b = required<HTMLSelectElement>(root, '#v9-compare-b');
  const registry = new Map(comparisonData.models.map(model => [model.key, model]));
  const renderSide = (side: 'a' | 'b', model: ComparisonModel) => {
    const card = required<HTMLElement>(root, `#v9-card-${side}`);
    required(card, 'h3').textContent = model.name;
    card.querySelectorAll<HTMLElement>('[data-value]').forEach(cell => {
      const key = cell.dataset.value as keyof ComparisonModel;
      cell.textContent = String(model[key] ?? 'Noch offen.');
    });
    const primary = required<HTMLAnchorElement>(root, `#v9-source-${side}`);
    primary.hidden = !model.source;
    if (model.source) primary.href = model.source;
    required<HTMLElement>(card, '.v9-source-missing').hidden = Boolean(model.source);
    const shop = required<HTMLAnchorElement>(root, `#v9-amazon-${side}`);
    shop.href = model.amazon;
    shop.textContent = `${model.exact ? 'Ausführung bei Amazon prüfen*' : 'Modell bei Amazon suchen*'} ↗`;
  };
  const renderComparison = () => {
    const left = registry.get(a.value), right = registry.get(b.value);
    if (!left || !right) return;
    renderSide('a', left);
    renderSide('b', right);
    required(root, '#v9-compare-status').textContent = a.value === b.value
      ? `Du hast zweimal dasselbe Modell ausgewählt: ${left.name}. Wähle ein anderes Modell für die Gegenüberstellung.`
      : `${left.name} und ${right.name} im Vergleich.`;
  };
  const defaults = [a.value, b.value] as const;
  listen(a, 'change', renderComparison);
  listen(b, 'change', renderComparison);
  listen(required(root, '#v9-compare-swap'), 'click', () => {
    [a.value, b.value] = [b.value, a.value];
    renderComparison();
  });
  listen(required(root, '#v9-compare-reset'), 'click', () => {
    [a.value, b.value] = defaults;
    renderComparison();
    a.focus();
  });
  const openComparison = () => {
    required<HTMLDetailsElement>(root, '#v9-compare-box').open = true;
    a.focus({ preventScroll: true });
    const motionReduced = root.ownerDocument.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    required<HTMLElement>(root, '#v9-comparison').scrollIntoView?.({ behavior: motionReduced ? 'instant' : 'smooth', block: 'start' });
  };
  root.querySelectorAll<HTMLElement>('[data-compare-pair-a]').forEach(button => listen(button, 'click', () => {
    a.value = button.dataset.comparePairA || a.value;
    b.value = button.dataset.comparePairB || b.value;
    renderComparison();
    openComparison();
  }));
  root.querySelectorAll<HTMLElement>('[data-compare-key]').forEach(link => listen(link, 'click', event => {
    event.preventDefault();
    a.value = link.dataset.compareKey || a.value;
    renderComparison();
    openComparison();
  }));
  listen(required(root, '#v4-directory-open'), 'click', event => {
    event.preventDefault();
    const directory = required<HTMLDetailsElement>(root, '#modellsuche');
    directory.open = true;
    query.focus({ preventScroll: true });
    directory.scrollIntoView?.({ behavior: 'instant', block: 'start' });
  });
  const caseButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-case]'));
  const caseCards = Array.from(root.querySelectorAll<HTMLElement>('[data-pick-case]'));
  caseButtons.forEach(button => listen(button, 'click', () => {
    caseButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    caseCards.forEach(card => { card.hidden = button.dataset.case !== 'all' && card.dataset.pickCase !== button.dataset.case; });
    required(root, '#v4-case-status').textContent = button.dataset.case === 'all' ? 'Drei Einstiege nach Einsatzbereich' : `Ein Einstieg: ${button.textContent}`;
  }));
  listen(root, 'click', event => {
    const target = event.target as Element | null;
    const link = target?.closest?.<HTMLAnchorElement>('a[rel~="sponsored"]');
    if (!link || !root.contains(link)) return;
    const url = new URL(link.href);
    if (url.hostname !== 'www.amazon.de' && url.hostname !== 'amazon.de') return;
    const model = comparisonData.models.find(model => new URL(model.amazon).href === link.href);
    const placement = link.closest('#v9-comparison') ? 'home_model_comparison' : 'home_case_shortlist';
    trackAffiliateClick(model?.name || 'Milchpumpe', model?.key || link.id, placement);
  });
  filterDirectory();
  renderComparison();
  return () => controller.abort();
}
