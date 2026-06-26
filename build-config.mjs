import { writeFileSync, readFileSync, existsSync, readdirSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://www.taxisparis-conventionnes.fr';
const TODAY = new Date().toISOString().split('T')[0];
const OUTPUT_DIR = resolve(__dirname, 'dist-ssg');

const citiesData = JSON.parse(
  readFileSync(resolve(__dirname, 'src/data/cities.json'), 'utf-8')
);

function normalizePath(path) {
  if (!path || path === '/') return '/';
  const cleaned = path.trim().replace(/^\/+|\/+$/g, '');
  return `/${cleaned}`;
}

function normalizeInternalHref(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href;
  }

  const isRootRelative = href.startsWith('/');
  const isAbsoluteInternal = href.startsWith(`${BASE_URL}/`);

  if (!isRootRelative && !isAbsoluteInternal) {
    return href;
  }

  const url = new URL(href, BASE_URL);

  if (url.origin !== BASE_URL) {
    return href;
  }

  if (url.pathname !== '/' && url.pathname.endsWith('/') && !url.pathname.includes('.')) {
    url.pathname = url.pathname.replace(/\/+$/g, '');
  }

  return isAbsoluteInternal ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
}

function normalizeInternalLinks(html) {
  return html.replace(/<a\b([^>]*?)\bhref=(["'])([^"']+)\2/gi, (match, beforeHref, quote, href) => {
    const normalizedHref = normalizeInternalHref(href);
    if (normalizedHref === href) return match;
    return `<a${beforeHref}href=${quote}${normalizedHref}${quote}`;
  });
}

function listHtmlFiles(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = resolve(directory, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(fullPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

function normalizeGeneratedHtmlLinks() {
  const htmlFiles = listHtmlFiles(OUTPUT_DIR);
  let updatedCount = 0;

  htmlFiles.forEach((filePath) => {
    const html = readFileSync(filePath, 'utf-8');
    const normalized = normalizeInternalLinks(html);

    if (normalized !== html) {
      writeFileSync(filePath, normalized, 'utf-8');
      updatedCount++;
    }
  });

  console.log(`internal links normalized - ${updatedCount}/${htmlFiles.length} HTML files updated`);
}

function buildSitemap() {
  const urls = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/reservation-taxi-vsl', priority: 0.9, changefreq: 'weekly' },
    { path: '/taxis-aeroports-parisiens', priority: 0.8, changefreq: 'weekly' },
    { path: '/taxis-gares-parisiennes', priority: 0.8, changefreq: 'weekly' },
    { path: '/zones-desservies', priority: 0.8, changefreq: 'weekly' },
    { path: '/qui-sommes-nous', priority: 0.7, changefreq: 'monthly' },
    { path: '/blog', priority: 0.8, changefreq: 'weekly' },
    { path: '/faq', priority: 0.7, changefreq: 'monthly' },
    { path: '/contact', priority: 0.7, changefreq: 'yearly' },
    { path: '/mentions-legales', priority: 0.3, changefreq: 'yearly' },
    { path: '/conditions-generales-de-vente', priority: 0.3, changefreq: 'yearly' },
    { path: '/conditions-generales', priority: 0.3, changefreq: 'yearly' },
  ];

  citiesData.departments.forEach(dept => {
    urls.push({ path: `/${dept.slug}`, priority: 0.9, changefreq: 'weekly' });
    dept.cities.forEach(city => {
      urls.push({ path: `/${dept.slug}/${city.slug}`, priority: 0.8, changefreq: 'monthly' });
    });
  });

  const entries = urls
    .sort((a, b) => b.priority - a.priority)
    .map(u => {
      const loc = `${BASE_URL}${normalizePath(u.path)}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

mkdirSync(OUTPUT_DIR, { recursive: true });
normalizeGeneratedHtmlLinks();

const sitemap = buildSitemap();
writeFileSync(resolve(OUTPUT_DIR, 'sitemap.xml'), sitemap, 'utf-8');
const urlCount = (sitemap.match(/<url>/g) || []).length;
console.log(`sitemap.xml generated - ${urlCount} URLs`);

const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
writeFileSync(resolve(OUTPUT_DIR, 'robots.txt'), robots, 'utf-8');
console.log('robots.txt generated');

console.log('SITEMAP PATH:', resolve(OUTPUT_DIR, 'sitemap.xml'));
console.log('ROBOTS PATH:', resolve(OUTPUT_DIR, 'robots.txt'));
console.log('SITEMAP EXISTS:', existsSync(resolve(OUTPUT_DIR, 'sitemap.xml')));
console.log('ROBOTS EXISTS:', existsSync(resolve(OUTPUT_DIR, 'robots.txt')));
console.log('DIST-SSG FILES:', readdirSync(OUTPUT_DIR));
console.log('Build configuration complete.');
