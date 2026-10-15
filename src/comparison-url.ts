export type ComparisonSelection = { pair: readonly [string, string]; emphasize: boolean };
export const DEFAULT_COMPARISON_PAIR = ['momcozy-m9', 'medela-freestyle'] as const;
const KEYS = ['modell-a', 'modell-b', 'unterschiede'] as const;

/** Only registry IDs enter the UI; duplicates and unknown tokens never become model facts. */
export function readComparisonSelection(search: string, modelIds: readonly string[]): ComparisonSelection {
  const params = new URLSearchParams(search);
  const read = (key: string) => params.getAll(key).length === 1 ? params.get(key) : null;
  const a = read(KEYS[0]);
  const b = read(KEYS[1]);
  return {
    pair: [a && modelIds.includes(a) ? a : DEFAULT_COMPARISON_PAIR[0], b && modelIds.includes(b) ? b : DEFAULT_COMPARISON_PAIR[1]],
    emphasize: read(KEYS[2]) !== '0',
  };
}

/** Share model IDs only; preserve the existing attribution and document anchor. */
export function buildComparisonUrl(href: string, selection: ComparisonSelection, modelIds: readonly string[]): string {
  const url = new URL(href);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error('Unsafe comparison URL');
  if (selection.pair.some(id => !modelIds.includes(id))) throw new Error('Unknown comparison model');
  url.pathname = '/vergleich/';
  for (const key of KEYS) url.searchParams.delete(key);
  selection.pair.forEach((id, index) => { if (id !== DEFAULT_COMPARISON_PAIR[index]) url.searchParams.set(KEYS[index], id); });
  if (!selection.emphasize) url.searchParams.set(KEYS[2], '0');
  return url.href;
}
