// Post-build configuration script
// Generates sitemap.xml and robots.txt after Vite build
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const DIST_DIR = path.join(__dirname, 'dist');
const BASE_URL = 'https://www.taxisparis-conventionnes.fr';
const TODAY = new Date().toISOString().split('T')[0];

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildSitemapUrls() {
  const citiesData = require('./src/data/cities.json');

  const staticUrls = [
    { loc: `${BASE_URL}/`, priority: 1.0, changefreq: 'daily' },
    { loc: `${BASE_URL}/reservation-taxi-vsl`, priority: 0.9, changefreq: 'weekly' },
    { loc: `${BASE_URL}/taxis-aeroports-parisiens`, priority: 0.8, changefreq: 'monthly' },
    { loc: `${BASE_URL}/taxis-gares-parisiennes`, priority: 0.8, changefreq: 'monthly' },
    { loc: `${BASE_URL}/zones-desservies`, priority: 0.8, changefreq: 'monthly' },
    { loc: `${BASE_URL}/qui-sommes-nous`, priority: 0.6, changefreq: 'yearly' },
    { loc: `${BASE_URL}/blog`, priority: 0.7, changefreq: 'weekly' },
    { loc: `${BASE_URL}/faq`, priority: 0.7, changefreq: 'monthly' },
    { loc: `${BASE_URL}/contact`, priority: 0.6, changefreq: 'yearly' },
    { loc: `${BASE_URL}/mentions-legales`, priority: 0.4, changefreq: 'yearly' },
    { loc: `${BASE_URL}/conditions-generales-de-vente`, priority: 0.4, changefreq: 'yearly' },
    { loc: `${BASE_URL}/conditions-generales`, priority: 0.4, changefreq: 'yearly' },
  ];

  const deptUrls = [];
  const cityUrls = [];

  citiesData.departments.forEach(dept => {
    deptUrls.push({ loc: `${BASE_URL}/${dept.slug}`, priority: 0.9, changefreq: 'weekly' });
    dept.cities.forEach(city => {
      cityUrls.push({ loc: `${BASE_URL}/${dept.slug}/${city.slug}`, priority: 0.8, changefreq: 'monthly' });
    });
  });

  return [...staticUrls, ...deptUrls, ...cityUrls];
}

function generateSitemapXml(urls) {
  const urlElements = urls
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .map(url => [
      '  <url>',
      `    <loc>${escapeXml(url.loc)}</loc>`,
      `    <lastmod>${TODAY}</lastmod>`,
      `    <changefreq>${url.changefreq}</changefreq>`,
      `    <priority>${url.priority.toFixed(1)}</priority>`,
      '  </url>',
    ].join('\n'))
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlElements,
    '</urlset>',
  ].join('\n');
}

function generateRobotsTxt() {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${BASE_URL}/sitemap.xml`,
  ].join('\n');
}

if (!fs.existsSync(DIST_DIR)) {
  console.error('dist/ not found — run vite build first');
  process.exit(1);
}

const urls = buildSitemapUrls();
const sitemapXml = generateSitemapXml(urls);
const robotsTxt = generateRobotsTxt();

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');

console.log(`Build configuration complete.`);
console.log(`  sitemap.xml : ${urls.length} URLs (${urls.filter(u => u.priority === 0.8 && !u.loc.includes('/taxi-conventionne-') || (u.loc.match(/\/taxi-conventionne-[^/]+\/[^/]+$/))).length} city pages)`);
console.log(`  robots.txt  : generated`);
