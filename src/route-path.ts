export function normalizePath(path: string) {
  const clean = path.split('?')[0].split('#')[0].replace(/\/+/g, '/');
  return clean === '/' ? '/' : `${clean.replace(/\/$/, '')}/`;
}
