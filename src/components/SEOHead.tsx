import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const DEFAULT_OG_IMAGE = 'https://www.taxisparis-conventionnes.fr/og-image.svg';
const CANONICAL_DOMAIN = 'https://www.taxisparis-conventionnes.fr';
const MAX_META_DESCRIPTION_LENGTH = 180;

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

  const safeTitle = cleanSeoText(title);
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

      {jsonLDArray.map((schema, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
