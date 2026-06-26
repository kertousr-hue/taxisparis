import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import { getAllRoutes } from './routes.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist-ssg');
const DIST_CLIENT = path.join(__dirname, '..', 'dist');
const DIST_SSR = path.join(__dirname, '..', 'dist-ssr');
const DOMAIN = 'https://www.taxisparis-conventionnes.fr';

async function buildSSR() {
  console.log('\nBuild SSR en cours...');
  await build({
    build: {
      ssr: 'scripts/server-entry.tsx',
      outDir: DIST_SSR,
      rollupOptions: {
        output: {
          format: 'esm',
          entryFileNames: '[name].js',
        },
      },
      sourcemap: false,
      minify: false,
    },
    ssr: {
      noExternal: ['react-helmet-async'],
    },
  });
  console.log('Build SSR termine');
}

function stripHelmetTags(html: string): string {
  return html
    .replace(/<title[^>]*data-rh[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta[^>]+data-rh[^>]*\/?>/gi, '')
    .replace(/<link[^>]+data-rh[^>]*\/?>/gi, '')
    .replace(/<script[^>]+data-rh[^>]*>[\s\S]*?<\/script>/gi, '');
}

function stripDataRh(str: string): string {
  return str.replace(/\s+data-rh="[^"]*"/g, '');
}

function normalizeRoutePath(routePath: string): string {
  if (!routePath || routePath === '/') return '/';
  const cleaned = routePath.replace(/^\/+|\/+$/g, '');
  return `/${cleaned}`;
}

function canonicalFor(routePath: string): string {
  const cleanPath = normalizeRoutePath(routePath);
  return cleanPath === '/' ? `${DOMAIN}/` : `${DOMAIN}${cleanPath}`;
}

async function prerenderAll() {
  console.log('\nDemarrage du SSG avec ReactDOMServer...\n');

  if (!fs.existsSync(DIST_CLIENT)) {
    throw new Error('Le dossier dist client n\'existe pas. Lancez d\'abord `npm run build`');
  }

  await buildSSR();

  const serverEntryPath = path.join(DIST_SSR, 'server-entry.js');
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`Fichier SSR introuvable: ${serverEntryPath}`);
  }

  const { render } = await import(serverEntryPath);

  const rawTemplate = fs.readFileSync(path.join(DIST_CLIENT, 'index.html'), 'utf-8');
  const template = stripHelmetTags(rawTemplate);

  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });

  console.log('Copie des assets client...');
  copyDirectory(DIST_CLIENT, DIST_DIR);
  fs.writeFileSync(path.join(DIST_DIR, '.htaccess'), buildHtaccess(), 'utf-8');
  console.log('Assets copies + .htaccess SSG ecrit\n');

  const routes = getAllRoutes();
  console.log(`Prerendu de ${routes.length} routes avec SSR...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    try {
      const renderPath = normalizeRoutePath(route.path);
      const { html: appHtml, helmet } = render(renderPath);
      const fullHtml = injectIntoTemplate(template, appHtml, helmet, renderPath);

      const cleanRoutePath = normalizeRoutePath(route.path);
      const outputPath = cleanRoutePath === '/'
        ? path.join(DIST_DIR, 'index.html')
        : path.join(DIST_DIR, cleanRoutePath, 'index.html');

      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, fullHtml, 'utf-8');
      successCount++;

      if ((i + 1) % 10 === 0 || (i + 1) === routes.length) {
        console.log(`  ${i + 1}/${routes.length} routes generees...`);
      }
    } catch (error) {
      console.error(`  Erreur pour ${route.path}:`, error instanceof Error ? error.message : error);
      errorCount++;
    }
  }

  const notFoundHtml = render404(template);
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8');
  console.log('\n  404.html genere');

  console.log('\nPrerendu SSR termine :');
  console.log(`  - ${successCount} routes generees avec succes`);
  if (errorCount > 0) {
    console.log(`  - ${errorCount} erreurs`);
  }

  fs.rmSync(DIST_SSR, { recursive: true, force: true });
  console.log('Dossier SSR temporaire nettoye');
}

interface RouteMeta {
  title: string;
  description: string;
}

function getRouteMeta(routePath: string): RouteMeta {
  const cleanPath = normalizeRoutePath(routePath);
  const staticMeta: Record<string, RouteMeta> = {
    '/': {
      title: 'Taxi Conventionne CPAM & VSL Paris Ile-de-France | Reservation 24h/24',
      description: 'Taxi conventionne et VSL agrees CPAM en Ile-de-France. Transport medical rembourse 24h/24 dans le 75, 91, 92, 93 et 94. Reservation rapide.',
    },
    '/reservation-taxi-vsl': {
      title: 'Reservation Taxi Conventionne VSL CPAM | Ile-de-France 24/7',
      description: 'Reservez votre taxi conventionne ou VSL en ligne. Transport medical rembourse CPAM. Service 24/7 en Ile-de-France (75, 91, 92, 93, 94).',
    },
    '/taxis-aeroports-parisiens': {
      title: 'Taxi Conventionne Aeroports Paris - CDG, Orly, Beauvais | CPAM',
      description: 'Transport medical conventionne vers les aeroports parisiens : Roissy-CDG, Orly et Beauvais. Prise en charge CPAM possible. Disponible 24h/24.',
    },
    '/taxis-gares-parisiennes': {
      title: 'Taxi Conventionne Gares Paris - Gare du Nord, Lyon, Montparnasse',
      description: 'Transport medical vers toutes les gares parisiennes : Gare du Nord, Gare de Lyon, Montparnasse, Saint-Lazare. Service conventionne CPAM.',
    },
    '/zones-desservies': {
      title: 'Zones desservies - Taxi Conventionne Ile-de-France | Paris, 91, 92, 93, 94',
      description: 'Nos taxis conventionnes interviennent dans tout Paris et l Ile-de-France : Essonne, Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne.',
    },
    '/qui-sommes-nous': {
      title: 'Qui sommes-nous ? | Taxis Paris Conventionnes',
      description: 'Decouvrez notre equipe de transport medical conventionne en Ile-de-France. Professionnels agrees CPAM pour vos trajets de sante.',
    },
    '/blog': {
      title: 'Blog - Taxis Conventionnes Paris Ile-de-France',
      description: 'Actualites, conseils et informations sur le transport medical conventionne en Ile-de-France.',
    },
    '/faq': {
      title: 'FAQ - Questions frequentes | Taxi Conventionne CPAM Ile-de-France',
      description: 'Toutes les reponses a vos questions sur le taxi conventionne, le VSL et la prise en charge CPAM en Ile-de-France.',
    },
    '/contact': {
      title: 'Contact - Taxi Conventionne Paris Ile-de-France',
      description: 'Contactez notre service de taxi conventionne et VSL en Ile-de-France. Disponible 24h/24 pour vos transports medicaux.',
    },
    '/mentions-legales': {
      title: 'Mentions legales | Taxis Paris Conventionnes',
      description: 'Mentions legales du site Taxis Paris Conventionnes.',
    },
    '/conditions-generales-de-vente': {
      title: 'Conditions generales de vente | Taxis Paris Conventionnes',
      description: 'Conditions generales de vente du service de taxi conventionne et VSL en Ile-de-France.',
    },
    '/conditions-generales': {
      title: 'Conditions generales | Taxis Paris Conventionnes',
      description: 'Conditions generales du service de taxi conventionne et VSL en Ile-de-France.',
    },
  };

  if (staticMeta[cleanPath]) return staticMeta[cleanPath];

  const citiesData = require('../src/data/cities.json');
  const parts = cleanPath.split('/').filter(Boolean);

  if (parts.length === 1) {
    const deptSlug = parts[0];
    const dept = (citiesData as any).departments.find((d: any) => d.slug === deptSlug);
    if (dept) {
      return {
        title: `Taxi Conventionne ${dept.name} (${dept.code}) | Transport Medical CPAM`,
        description: `Taxi conventionne et VSL agree CPAM en ${dept.name} (${dept.code}). Transport medical rembourse 24h/24 pour tous vos rendez-vous medicaux.`,
      };
    }
  }

  if (parts.length === 2) {
    const [deptSlug, citySlug] = parts;
    const dept = (citiesData as any).departments.find((d: any) => d.slug === deptSlug);
    const city = dept?.cities.find((c: any) => c.slug === citySlug);
    if (city) {
      return {
        title: `Taxi Conventionne ${city.name} (${city.postalCode}) | CPAM | Transport Medical 24h/24`,
        description: `Taxi conventionne et VSL a ${city.name} (${city.postalCode}). Transport medical rembourse CPAM 24h/24 en Ile-de-France. Reservation rapide.`,
      };
    }
  }

  return {
    title: 'Taxi Conventionne CPAM & VSL Paris Ile-de-France | Reservation 24h/24',
    description: 'Taxi conventionne et VSL agrees CPAM en Ile-de-France. Transport medical rembourse 24h/24.',
  };
}

function injectIntoTemplate(template: string, appHtml: string, helmet: any, routePath: string): string {
  const canonicalUrl = canonicalFor(routePath);
  const helmetTitle = stripDataRh(helmet?.title?.toString() || '');
  const helmetMeta = stripDataRh(helmet?.meta?.toString() || '');
  const helmetLink = stripDataRh(helmet?.link?.toString() || '');
  const helmetScript = stripDataRh(helmet?.script?.toString() || '');

  const isHelmetTitleEmpty = !helmetTitle || helmetTitle === '<title></title>';
  let titleTag: string;
  let metaTags: string;
  let linkTags: string;
  let scriptTags: string;

  if (isHelmetTitleEmpty) {
    const meta = getRouteMeta(routePath);
    titleTag = `<title>${escapeHtml(meta.title)}</title>`;
    metaTags = `<meta name="description" content="${escapeHtml(meta.description)}" />\n  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`;
    linkTags = '';
    scriptTags = '';
  } else {
    titleTag = helmetTitle;
    metaTags = helmetMeta;
    linkTags = helmetLink;
    scriptTags = helmetScript;
  }

  const hasCanonical = linkTags.includes('rel="canonical"');
  const canonicalTag = hasCanonical ? '' : `<link rel="canonical" href="${canonicalUrl}" />`;

  let html = template;
  const hasTitleTag = /<title[^>]*>[\s\S]*?<\/title>/i.test(html);

  if (hasTitleTag) {
    html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, titleTag);
  }

  html = html.replace(
    '</head>',
    `  ${hasTitleTag ? '' : `${titleTag}\n  `}${metaTags}\n  ${linkTags}\n  ${canonicalTag}\n  ${scriptTags}\n  </head>`
  );

  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${appHtml}</div>`);

  return html;
}

function render404(template: string): string {
  const notFoundHtml = `
    <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f9fafb;font-family:sans-serif;text-align:center;padding:2rem">
      <p style="font-size:5rem;font-weight:700;color:#e5e7eb;margin:0">404</p>
      <h1 style="font-size:1.5rem;font-weight:600;color:#1f2937;margin:.5rem 0">Page introuvable</h1>
      <p style="color:#6b7280;margin:.75rem 0">La page que vous recherchez n'existe pas ou a ete deplacee.</p>
      <a href="/" style="margin-top:2rem;display:inline-block;background:#eab308;color:#fff;font-weight:600;padding:.75rem 1.5rem;border-radius:.5rem;text-decoration:none">Retour a l'accueil</a>
    </div>
  `;

  let html = template;

  html = html.replace(
    '</head>',
    `  <title>Page introuvable - 404 | Taxis Paris Conventionnes</title>\n  <meta name="robots" content="noindex, nofollow" />\n  </head>`
  );

  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${notFoundHtml}</div>`);

  return html;
}

function buildHtaccess(): string {
  return `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Force HTTPS + WWW in a single combined redirect (avoids double 301 chain)
  RewriteCond %{HTTPS} off [OR]
  RewriteCond %{HTTP_HOST} !^www\. [NC]
  RewriteCond %{HTTP_HOST} !^localhost [NC]
  RewriteRule ^(.*)$ https://www.taxisparis-conventionnes.fr/$1 [L,R=301]

  # Serve existing files directly (assets, images, sitemap, robots, etc.)
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]

  # Remove trailing slash (redirect /foo/ -> /foo) except root
  RewriteCond %{REQUEST_URI} ^/(.+)/$
  RewriteRule ^(.+)/$ /$1 [R=301,L]

  # SSG: serve pre-rendered index.html for extensionless URLs
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI}/index.html -f
  RewriteRule ^(.+)$ $1/index.html [L]

  # Root index
  RewriteCond %{DOCUMENT_ROOT}/index.html -f
  RewriteRule ^$ /index.html [L]

  # Everything else: true 404 (not index.html fallback)
  RewriteRule ^ - [R=404,L]
</IfModule>

# Custom 404 page (returns real HTTP 404 status, NOT 200)
ErrorDocument 404 /404.html

# Security headers
<IfModule mod_headers.c>
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(self), microphone=(), camera=()"
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType application/json "access plus 0 seconds"
  ExpiresDefault "access plus 1 month"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\.(html|htm)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0
  </FilesMatch>
  <FilesMatch "\.(css|js|jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf|otf|eot|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>

# Compression GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json application/xml image/svg+xml
</IfModule>

Options -Indexes
Options +FollowSymLinks
ServerSignature Off
AddDefaultCharset UTF-8

<IfModule mod_mime.c>
  AddType text/html .html
  AddType text/css .css
  AddType application/javascript .js
  AddType application/json .json
  AddType image/svg+xml .svg
  AddType image/webp .webp
  AddType font/woff .woff
  AddType font/woff2 .woff2
</IfModule>

<FilesMatch "^\.">
  Order allow,deny
  Deny from all
</FilesMatch>

FileETag None
`;
}

function copyDirectory(src: string, dest: string) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    try {
      if (entry.isDirectory()) {
        copyDirectory(srcPath, destPath);
      } else {
        fs.writeFileSync(destPath, fs.readFileSync(srcPath));
      }
    } catch (error) {
      console.error(`Warning: Failed to copy ${entry.name}:`, error instanceof Error ? error.message : error);
    }
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  prerenderAll()
    .then(() => {
      console.log('\nSSG termine avec succes !');
      console.log(`Fichiers generes dans: ${DIST_DIR}\n`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('\nErreur lors du SSG:', error);
      process.exit(1);
    });
}
