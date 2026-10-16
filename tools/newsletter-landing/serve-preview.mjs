import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../../', import.meta.url));
const files = new Map([
  ['/', ['private/newsletter-landing/index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['private/newsletter-landing/index.html', 'text/html; charset=utf-8']],
  ['/inactive.html', ['private/newsletter-landing/inactive.html', 'text/html; charset=utf-8']],
  ['/fonts/manrope-latin.woff2', ['public/fonts/manrope-latin.woff2', 'font/woff2']],
  ['/newsletter-assets/kaufcheck-preview.webp', ['public/newsletter-assets/kaufcheck-preview.webp', 'image/webp']],
]);

/** Local-only allowlist: never expose the private guide or repository directory. */
export function createNewsletterPreviewServer({ html } = {}) {
  return createServer(async (request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Robots-Tag', 'noindex, nofollow');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Content-Security-Policy', "default-src 'none'; img-src 'self'; font-src 'self'; style-src 'unsafe-inline'; form-action 'none'; connect-src 'none'; frame-ancestors 'none'; base-uri 'none'");
    if (!['GET', 'HEAD'].includes(request.method ?? '')) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end('No submissions accepted.');
      return;
    }
    const entry = files.get(new URL(request.url ?? '/', 'http://127.0.0.1').pathname);
    if (!entry) { response.writeHead(404).end('Not part of this isolated preview.'); return; }
    try {
      // Test HTML is supplied in memory: regression tests never depend on ignored generated HTML.
      const data = html !== undefined && entry[0] === 'private/newsletter-landing/index.html'
        ? Buffer.from(html)
        : await readFile(resolve(root, entry[0]));
      response.writeHead(200, { 'Content-Type': entry[1] });
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch {
      response.writeHead(404).end('Generate the local preview first.');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.NEWSLETTER_PREVIEW_PORT || 4318);
  createNewsletterPreviewServer().listen(port, '127.0.0.1', () => console.log(`Newsletter design preview: http://127.0.0.1:${port}/`));
}
