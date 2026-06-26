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
