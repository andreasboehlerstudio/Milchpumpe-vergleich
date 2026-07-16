import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { REVIEW_DATE_ISO, SITE_URL } from '../src/data';
import { ROUTES, getRouteSeo, getStructuredData } from '../src/seo';

const distDir = path.resolve('dist');
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function pageHtml(routePath: string) {
  const seo = getRouteSeo(routePath);
  const canonical = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`;
  const markup = renderToString(<App initialPath={routePath} />);
  const jsonLd = JSON.stringify(getStructuredData(routePath)).replaceAll('<', '\\u003c');

  return template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(seo.description)}" />`)
    .replace(/<meta name="robots" content="[^"]*"\s*\/>/, `<meta name="robots" content="${seo.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(seo.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(seo.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`)
    .replace('<!--seo-jsonld-->', `<script type="application/ld+json">${jsonLd}</script>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
}

for (const route of ROUTES) {
  const output = route.path === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.path, 'index.html');
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, pageHtml(route.path), 'utf8');
}

await writeFile(path.join(distDir, '404.html'), pageHtml('/404/'), 'utf8');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.filter((route) => !route.noindex).map((route) => `  <url>
    <loc>${SITE_URL}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${REVIEW_DATE_ISO}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>
`;

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
