import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const DEFAULT_OG_IMAGE = 'https://www.taxisparis-conventionnes.fr/og-image.svg';
const CANONICAL_DOMAIN = 'https://www.taxisparis-conventionnes.fr';
const MAX_META_DESCRIPTION_LENGTH = 180;
const MAX_SEO_TITLE_LENGTH = 60;

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string | string[];
  author?: string;
  robots?: string;
  canonical?: string;
  jsonLD?: any | any[];
  ogImage?: string;
}

function cleanSeoText(input: string): string {
  return input
    .replace(/\b(médicalisé|medicalise|médicalisée|medicalisee|médicalisés|medicalises|médicalisées|medicalisees)\b/gi, '')
    .replace(/\b(navette|navettes)\b/gi, '')
    .replace(/\b(liaison|liaisons)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([:;,.!?\)])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim();
}

function limitSeoTitle(input: string): string {
  const title = cleanSeoText(input)
    .replace(/\s+\|\s+Transport médical 24h\/24$/i, '')
    .replace(/\s+\|\s+Île-de-France 200\+ villes$/i, '')
    .replace(/\s+\|\s+Paris et Île-de-France$/i, '')
    .replace(/\s+\|\s+Service 24h\/24$/i, '')
    .replace(/\s+\|\s+R[ée]servation 24h\/24$/i, '')
    .replace(/\s+\|\s+Conseils transport médical Île-de-France$/i, ' | Conseils transport médical')
    .replace(/\s+\|\s+CPAM\s+\|\s+24h\/24$/i, ' | CPAM')
    .replace(/\s*-\s*24\/7$/i, '')
    .trim();

  if (title.length <= MAX_SEO_TITLE_LENGTH) {
    return title;
  }

  const parts = title.split('|').map((part) => part.trim()).filter(Boolean);

  if (parts.length > 1) {
    const firstPart = parts[0];
    const firstPartWithCpam = `${firstPart} | CPAM`;

    if (/\bCPAM\b/i.test(title) && !/\bCPAM\b/i.test(firstPart) && firstPartWithCpam.length <= MAX_SEO_TITLE_LENGTH) {
      return firstPartWithCpam;
    }

    if (firstPart.length <= MAX_SEO_TITLE_LENGTH) {
      return firstPart;
    }
  }

  const candidate = title.slice(0, MAX_SEO_TITLE_LENGTH + 1);
  const lastSpace = candidate.lastIndexOf(' ');
  const cutIndex = lastSpace >= 45 ? lastSpace : MAX_SEO_TITLE_LENGTH;

  return title.slice(0, cutIndex).replace(/[\s,;:|.-]+$/g, '').trim();
}

function limitSeoDescription(input: string): string {
  if (input.length <= MAX_META_DESCRIPTION_LENGTH) {
    return input;
  }

  const candidate = input.slice(0, MAX_META_DESCRIPTION_LENGTH);
  const sentenceEnd = Math.max(candidate.lastIndexOf('.'), candidate.lastIndexOf('!'), candidate.lastIndexOf('?'));

  if (sentenceEnd >= 120) {
    return candidate.slice(0, sentenceEnd + 1).trim();
  }

  const lastSpace = candidate.lastIndexOf(' ');
  const cutIndex = lastSpace >= 120 ? lastSpace : MAX_META_DESCRIPTION_LENGTH;
  return `${candidate.slice(0, cutIndex).replace(/[\s,;:.-]+$/g, '')}.`;
}

function normalizeCanonicalPath(pathname: string): string {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  return cleaned === '/' ? '/' : cleaned;
}

function normalizeCanonicalUrl(url: string): string {
  const cleaned = url.replace(/\/+$/, '');
  return cleaned === CANONICAL_DOMAIN ? `${CANONICAL_DOMAIN}/` : cleaned;
}

function titleCase(value: string): string {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

function labelFromSlug(slug: string): string {
  const departmentMatch = slug.match(/^taxi-conventionne-(.+)-(\d{2})$/);

  if (departmentMatch) {
    const departmentNames: Record<string, string> = {
      paris: 'Paris',
      essonne: 'Essonne',
      'hauts-de-seine': 'Hauts-de-Seine',
      'seine-saint-denis': 'Seine-Saint-Denis',
      'val-de-marne': 'Val-de-Marne',
    };
    const departmentName = departmentNames[departmentMatch[1]] || titleCase(departmentMatch[1].replace(/-/g, ' '));
    return `${departmentName} (${departmentMatch[2]})`;
  }

  return titleCase(slug.replace(/-/g, ' '));
}

function hasBreadcrumbSchema(schema: any): boolean {
  if (!schema) return false;

  if (Array.isArray(schema)) {
    return schema.some(hasBreadcrumbSchema);
  }

  const schemaType = schema['@type'];
  if (schemaType === 'BreadcrumbList' || (Array.isArray(schemaType) && schemaType.includes('BreadcrumbList'))) {
    return true;
  }

  if (Array.isArray(schema['@graph'])) {
    return schema['@graph'].some(hasBreadcrumbSchema);
  }

  return false;
}

function buildAutomaticBreadcrumb(pathname: string) {
  const canonicalPath = normalizeCanonicalPath(pathname);
  const segments = canonicalPath.split('/').filter(Boolean);

  if (segments.length < 2) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: `${CANONICAL_DOMAIN}/`,
      },
      ...segments.map((segment, index) => {
        const segmentPath = `/${segments.slice(0, index + 1).join('/')}`;
        return {
          '@type': 'ListItem',
          position: index + 2,
          name: labelFromSlug(segment),
          item: `${CANONICAL_DOMAIN}${segmentPath}`,
        };
      }),
    ],
  };
}

export default function SEOHead({
  title,
  description,
  keywords,
  author = 'Taxi Conventionné',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  canonical,
  jsonLD,
  ogImage = DEFAULT_OG_IMAGE,
}: SEOHeadProps) {
  const location = useLocation();

  const canonicalPath = normalizeCanonicalPath(location.pathname);
  const canonicalUrl = canonical
    ? normalizeCanonicalUrl(canonical)
    : `${CANONICAL_DOMAIN}${canonicalPath === '/' ? '/' : canonicalPath}`;

  const safeTitle = limitSeoTitle(title);
  const safeDescription = limitSeoDescription(cleanSeoText(description));

  const keywordsString = keywords
    ? Array.isArray(keywords)
      ? keywords.join(', ')
      : keywords
    : '';

  const safeKeywords = keywordsString ? cleanSeoText(keywordsString) : '';
  const ogImageType = ogImage.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg';

  const jsonLDArray = jsonLD
    ? Array.isArray(jsonLD)
      ? jsonLD.filter(Boolean)
      : [jsonLD].filter(Boolean)
    : [];

  const automaticBreadcrumb = !hasBreadcrumbSchema(jsonLDArray)
    ? buildAutomaticBreadcrumb(canonicalPath)
    : null;

  const completeJsonLDArray = automaticBreadcrumb
    ? [...jsonLDArray, automaticBreadcrumb]
    : jsonLDArray;

  return (
    <Helmet>
      <title>{safeTitle}</title>

      <meta name="description" content={safeDescription} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      {safeKeywords && <meta name="keywords" content={safeKeywords} />}

      {/* Canonical - single, authoritative URL for this page */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph - og:url must match canonical */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Taxis Paris Conventionnés" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content={ogImageType} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={safeTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={safeTitle} />

      {completeJsonLDArray.map((schema, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
