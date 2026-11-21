const VALID_DEPARTMENTS = new Set(['75', '77', '78', '91', '92', '93', '94', '95', '45', '28', '60']);
const IDF_DEPARTMENTS = new Set(['75', '77', '78', '91', '92', '93', '94', '95']);
const MEDICAL_GENERIC_TOKENS = new Set([
  'hopital', 'hospital', 'clinique', 'centre', 'medical', 'medicaux', 'sante', 'soins',
  'chu', 'ch', 'ghu', 'maternite', 'polyclinique', 'cabinet', 'laboratoire',
  'dialyse', 'radiotherapie', 'oncologie', 'imagerie', 'institut', 'fondation',
  'de', 'du', 'des', 'la', 'le', 'les', 'd', 'l',
]);
const ALLOWED_ORIGINS = new Set([
  'https://www.taxisparis-conventionnes.fr',
  'https://taxisparis-conventionnes.fr',
  'http://localhost:5173',
]);

function isAllowedOrigin(origin: string | null) {
  if (!origin) return true;
  return ALLOWED_ORIGINS.has(origin) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
}

function corsHeaders(origin: string | null) {
  return {
    ...(origin && isAllowedOrigin(origin) ? { 'Access-Control-Allow-Origin': origin } : {}),
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin',
  };
}

function json(body: unknown, status = 200, origin: string | null = null) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(origin) });
}

function normalizeForSearch(value: unknown): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function queryTokens(query: string): string[] {
  return normalizeForSearch(query)
    .split(/\s+/)
    .filter(token => token.length >= 2 && !/^\d{5}$/.test(token));
}

function medicalSpecificTokens(query: string): string[] {
  return queryTokens(query).filter(token => !MEDICAL_GENERIC_TOKENS.has(token));
}

function looksLikeMedicalPlace(query: string): boolean {
  const q = normalizeForSearch(query);
  return /\b(hopital|hospital|clinique|centre medical|centre de sante|centre de soins|chu|ghu|maternite|polyclinique|dialyse|radiotherapie|oncologie|imagerie|cabinet medical|laboratoire medical|institut|fondation)\b/.test(q);
}

function postalCodeOf(item: any): string {
  const direct = String(item?.postcode || '').trim();
  if (/^\d{5}$/.test(direct)) return direct;
  const label = String(item?.formatted || item?.address_line2 || '').trim();
  return label.match(/\b(\d{5})\b/)?.[1] || '';
}

function cityOf(item: any): string {
  return String(item?.city || item?.town || item?.village || item?.municipality || '').trim();
}

function parseStructuredQuery(query: string): {
  name?: string;
  housenumber?: string;
  street?: string;
  postcode?: string;
  city?: string;
  country?: string;
} | null {
  const match = query.match(/\b\d{5}\b/);
  if (!match || match.index === undefined) return null;

  const postcode = match[0];
  const beforePostcode = query.slice(0, match.index).replace(/[\s,;\-]+$/, '').trim();
  const afterPostcode = query.slice(match.index + postcode.length).replace(/^[\s,;\-]+/, '').trim();

  const out: {
    name?: string;
    housenumber?: string;
    street?: string;
    postcode?: string;
    city?: string;
    country?: string;
  } = { postcode, country: 'France' };

  if (afterPostcode) out.city = afterPostcode;

  if (beforePostcode) {
    if (looksLikeMedicalPlace(beforePostcode)) {
      out.name = beforePostcode;
    } else {
      const houseMatch = beforePostcode.match(/^\s*(\d+[a-zA-Z]?(?:[-/]\d+[a-zA-Z]?)?(?:\s*(?:bis|ter))?)\b\s*(.*)$/i);
      if (houseMatch?.[1]) out.housenumber = houseMatch[1].trim();
      const street = (houseMatch?.[2] || beforePostcode).replace(/^[\s,;\-]+/, '').trim();
      if (street) out.street = street;
    }
  }

  return out;
}

function placeFeatureToResult(feature: any): any {
  const properties = feature?.properties || {};
  const coordinates = Array.isArray(feature?.geometry?.coordinates) ? feature.geometry.coordinates : [];
  const lon = Number(properties?.lon ?? coordinates?.[0]);
  const lat = Number(properties?.lat ?? coordinates?.[1]);

  return {
    ...properties,
    lat,
    lon,
    postcode: postalCodeOf(properties),
    result_type: properties?.result_type || 'amenity',
    _source: 'places',
  };
}

function allowedResult(item: any): boolean {
  const lat = Number(item?.lat);
  const lon = Number(item?.lon);
  const placeId = String(item?.place_id || '').trim();
  const postalCode = postalCodeOf(item);

  if (!Number.isFinite(lat) || !Number.isFinite(lon) || !placeId) return false;
  if (!/^\d{5}$/.test(postalCode)) return false;
  return VALID_DEPARTMENTS.has(postalCode.substring(0, 2));
}

function itemSearchText(item: any): string {
  return normalizeForSearch([
    item?.name,
    item?.address_line1,
    item?.housenumber,
    item?.street,
    postalCodeOf(item),
    cityOf(item),
    item?.formatted,
    item?.address_line2,
  ].filter(Boolean).join(' '));
}

const COMMON_SEARCH_WORDS = new Set([
  'de', 'du', 'des', 'la', 'le', 'les', 'aux', 'avec', 'dans', 'pour', 'sur', 'chez',
  'rue', 'avenue', 'av', 'boulevard', 'bd', 'route', 'chemin', 'allee',
  'impasse', 'quai', 'place', 'cours', 'passage', 'square', 'esplanade',
]);

function relevantTokens(query: string): string[] {
  const raw = looksLikeMedicalPlace(query) ? medicalSpecificTokens(query) : queryTokens(query);
  return raw.filter(token => token.length >= 3 && !COMMON_SEARCH_WORDS.has(token) && !/^\d+$/.test(token));
}

function matchesWord(text: string, token: string): boolean {
  return text.split(/\s+/).some(word => word === token || word.startsWith(token));
}

function medicalNameCoverage(item: any, query: string): number {
  const tokens = medicalSpecificTokens(query);
  if (!tokens.length) return 0;
  const text = normalizeForSearch([item?.name, item?.address_line1, item?.formatted].filter(Boolean).join(' '));
  const matched = tokens.filter(token => matchesWord(text, token)).length;
  return matched / tokens.length;
}

function scoreResult(item: any, query: string): number {
  const rank = item?.rank || {};
  const postalCode = postalCodeOf(item);
  const department = postalCode.substring(0, 2);
  const type = String(item?.result_type || '');
  const source = String(item?._source || 'autocomplete');
  const medical = looksLikeMedicalPlace(query);
  const tokens = relevantTokens(query);
  const nameText = normalizeForSearch(item?.name || item?.address_line1 || '');
  const streetText = normalizeForSearch([item?.housenumber, item?.street].filter(Boolean).join(' '));
  const fullText = itemSearchText(item);
  let score = 0;
  let matched = 0;
  let matchedName = 0;
  let matchedStreet = 0;

  for (const token of tokens) {
    if (matchesWord(nameText, token)) {
      matched++;
      matchedName++;
    } else if (matchesWord(streetText, token)) {
      matched++;
      matchedStreet++;
    } else if (matchesWord(fullText, token)) {
      matched++;
    }
  }
  if (tokens.length) {
    const coverage = matched / tokens.length;
    score += coverage * 420;
    if (matched === tokens.length) score += 180;
    else score -= (1 - coverage) * 180;
    if (medical) {
      score += (matchedName / tokens.length) * 210;
      if (matchedName === tokens.length) score += 160;
      if (matchedName === 0) score -= 90;
    } else if (matchedStreet > 0) {
      score += (matchedStreet / tokens.length) * 115;
    }
  }

  const postcodeFromQuery = query.match(/\b\d{5}\b/)?.[0] || '';
  if (postcodeFromQuery) {
    score += postcodeFromQuery === postalCode ? 440 : -440;
    if (source === 'structured' && postcodeFromQuery === postalCode) score += 15;
  }
  const houseNumberFromQuery = query.match(/^\s*(\d{1,4}[a-z]?)(?=\s|,|$)/i)?.[1] || '';
  if (houseNumberFromQuery) {
    score += normalizeForSearch(item?.housenumber) === normalizeForSearch(houseNumberFromQuery) ? 340 : -280;
  }

  // Location and provider confidence are tie-breakers, not stronger than the requested name.
  if (IDF_DEPARTMENTS.has(department)) score += 24;
  if (department === '75') score += 3;
  if (source === 'places' && medical) score += 12;
  if (type === 'building') score += houseNumberFromQuery ? 22 : 6;
  else if (type === 'amenity' && medical) score += 20;
  else if (type === 'street' && !medical) score += 12;
  else if (type === 'postcode' && postcodeFromQuery) score += 8;
  else if (type === 'city' && tokens.length === 1) score += 5;
  if (rank?.match_type === 'full_match') score += 12;
  else if (rank?.match_type === 'match_by_building') score += 8;
  else if (rank?.match_type === 'match_by_street') score += 5;
  score += Number(rank?.confidence || 0) * 15;
  score += Number(rank?.confidence_building_level || 0) * (houseNumberFromQuery ? 15 : 4);
  score += Number(rank?.confidence_street_level || 0) * 7;
  score += Number(rank?.confidence_city_level || 0) * 4;
  return score;
}

function dedupeByBestScore(items: any[], query: string): any[] {
  const byPlaceId = new Map<string, any>();

  for (const item of items) {
    const placeId = String(item?.place_id || '').trim();
    if (!placeId) continue;
    const current = byPlaceId.get(placeId);
    if (!current || scoreResult(item, query) > scoreResult(current, query)) {
      byPlaceId.set(placeId, item);
    }
  }

  return [...byPlaceId.values()];
}

function buildPreciseLabel(item: any, fallback: string): string {
  const name = String(item?.name || '').trim();
  const houseNumber = String(item?.housenumber || '').trim();
  const street = String(item?.street || '').trim();
  const postcode = postalCodeOf(item);
  const city = cityOf(item);
  const streetLine = [houseNumber, street].filter(Boolean).join(' ').trim();
  const localityLine = [postcode, city].filter(Boolean).join(' ').trim();

  const parts: string[] = [];
  if (name && normalizeForSearch(name) !== normalizeForSearch(streetLine)) parts.push(name);
  if (streetLine) parts.push(streetLine);
  if (localityLine) parts.push(localityLine);

  return parts.join(', ')
    || String(item?.formatted || '').trim()
    || [item?.address_line1, item?.address_line2].filter(Boolean).join(', ')
    || fallback;
}

async function fetchWithDeadline(url: URL, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJsonResults(url: URL, label: string, timeoutMs = 3200): Promise<any[]> {
  try {
    const response = await fetchWithDeadline(url, timeoutMs);
    if (!response.ok) {
      console.warn('[GEOAPIFY] ' + label + ' failed', response.status);
      return [];
    }
    const data = await response.json().catch(() => null);
    return Array.isArray(data?.results) ? data.results : [];
  } catch (error) {
    console.warn('[GEOAPIFY] ' + label + ' timed out or failed', String(error));
    return [];
  }
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('origin');

  if (!isAllowedOrigin(origin)) {
    return json({ error: 'Origin not allowed' }, 403, origin);
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405, origin);
  }

  const requestUrl = new URL(req.url);
  const q = (requestUrl.searchParams.get('q') || '').replace(/\s+/g, ' ').trim();
  const requestedLimit = Number(requestUrl.searchParams.get('limit')) || 8;
  const limit = Math.min(Math.max(requestedLimit, 1), 10);

  if (q.length < 3) {
    return json({ items: [], provider: 'geoapify' }, 200, origin);
  }

  const apiKey = Deno.env.get('GEOAPIFY_API_KEY');
  if (!apiKey) {
    console.error('[GEOAPIFY] Server API key missing');
    return json({ error: 'Geoapify server configuration missing' }, 500, origin);
  }

  try {
    // 1) Always run Address Autocomplete. A rectangle bias avoids over-favouring Paris centre.
    const autocompleteUrl = new URL('https://api.geoapify.com/v1/geocode/autocomplete');
    autocompleteUrl.searchParams.set('text', q);
    autocompleteUrl.searchParams.set('format', 'json');
    autocompleteUrl.searchParams.set('lang', 'fr');
    autocompleteUrl.searchParams.set('limit', '20');
    autocompleteUrl.searchParams.set('filter', 'countrycode:fr');
    autocompleteUrl.searchParams.set('bias', 'rect:1.30,48.05,3.65,49.30');
    autocompleteUrl.searchParams.set('apiKey', apiKey);

    const autocompletePromise = fetchJsonResults(autocompleteUrl, 'Autocomplete')
      .then(results => results
        .map((item: any) => ({ ...item, postcode: postalCodeOf(item), _source: 'autocomplete' }))
        .filter(allowedResult));

    // 2) When a full postcode is present, also run structured geocoding.
    const structured = parseStructuredQuery(q);
    const structuredPromise = structured
      ? (() => {
          const structuredUrl = new URL('https://api.geoapify.com/v1/geocode/search');
          structuredUrl.searchParams.set('format', 'json');
          structuredUrl.searchParams.set('lang', 'fr');
          structuredUrl.searchParams.set('limit', '20');
          structuredUrl.searchParams.set('filter', 'countrycode:fr');
          structuredUrl.searchParams.set('bias', 'rect:1.30,48.05,3.65,49.30');
          structuredUrl.searchParams.set('apiKey', apiKey);
          for (const [key, value] of Object.entries(structured)) {
            if (value) structuredUrl.searchParams.set(key, String(value));
          }

          return fetchJsonResults(structuredUrl, 'Structured geocoding', 3800)
            .then(results => results
              .map((item: any) => ({ ...item, postcode: postalCodeOf(item), _source: 'structured' }))
              .filter(allowedResult));
        })()
      : Promise.resolve([]);

    const [autocompleteResults, structuredResults] = await Promise.all([
      autocompletePromise,
      structuredPromise,
    ]);

    // Rank the geocoding candidates first. For a medical query this gives us a precise
    // anchor, then Places searches healthcare POIs only around that candidate.
    const preliminary = dedupeByBestScore([
      ...autocompleteResults,
      ...structuredResults,
    ], q).sort((a, b) => scoreResult(b, q) - scoreResult(a, q));

    const medicalQuery = looksLikeMedicalPlace(q) && q.length >= 5;
    const medicalTerms = medicalSpecificTokens(q).filter(token => token.length >= 3 && !COMMON_SEARCH_WORDS.has(token));
    const bestMedicalName = normalizeForSearch(preliminary[0]?.name || preliminary[0]?.address_line1 || '');
    // Return immediately when autocomplete already found the requested hospital.
    const directMedicalMatch = medicalQuery && medicalTerms.length > 0
      && medicalTerms.every(token => matchesWord(bestMedicalName, token));
    const anchor = medicalQuery && !directMedicalMatch
      ? preliminary.find(item => Number.isFinite(Number(item?.lat)) && Number.isFinite(Number(item?.lon)))
      : null;

    let placesResults: any[] = [];
    if (anchor) {
      const anchorLon = Number(anchor.lon);
      const anchorLat = Number(anchor.lat);
      const placesUrl = new URL('https://api.geoapify.com/v2/places');
      placesUrl.searchParams.set('categories', 'healthcare');
      placesUrl.searchParams.set('filter', `circle:${anchorLon},${anchorLat},3500`);
      placesUrl.searchParams.set('bias', `proximity:${anchorLon},${anchorLat}`);
      placesUrl.searchParams.set('lang', 'fr');
      placesUrl.searchParams.set('limit', '20');
      placesUrl.searchParams.set('apiKey', apiKey);

      try {
        const response = await fetchWithDeadline(placesUrl, 3800);
        if (response.ok) {
          const data = await response.json().catch(() => null);
          placesResults = (Array.isArray(data?.features) ? data.features : [])
            .map(placeFeatureToResult)
            .filter(allowedResult);
        } else {
          console.warn('[GEOAPIFY] Places failed', response.status);
        }
      } catch (error) {
        console.warn('[GEOAPIFY] Places timed out or failed', String(error));
      }
    }

    const merged = dedupeByBestScore([
      ...preliminary,
      ...placesResults,
    ], q).sort((a, b) => scoreResult(b, q) - scoreResult(a, q));

    const items = merged.slice(0, limit).map((item: any) => {
      const label = buildPreciseLabel(item, q);
      const streetLine = [item?.housenumber, item?.street].filter(Boolean).join(' ').trim();

      return {
        id: String(item.place_id),
        placeId: String(item.place_id),
        title: String(item?.name || item?.address_line1 || streetLine || label || q),
        resultType: String(item?.result_type || 'address'),
        source: String(item?._source || 'autocomplete'),
        confidence: Number(item?.rank?.confidence || 0),
        address: {
          label,
          countryCode: String(item?.country_code || 'fr').toUpperCase(),
          postalCode: postalCodeOf(item),
          city: cityOf(item),
          street: String(item?.street || ''),
          houseNumber: String(item?.housenumber || ''),
        },
        position: { lat: Number(item.lat), lng: Number(item.lon) },
      };
    });

    return json({
      items,
      provider: 'geoapify',
      enrichment: {
        structured: Boolean(structured),
        placesAroundMedicalCandidate: Boolean(anchor),
      },
    }, 200, origin);
  } catch (error) {
    console.error('[GEOAPIFY] Search request failed', error instanceof Error ? error.message : 'unknown error');
    return json({ error: 'Geoapify search request failed' }, 502, origin);
  }
});
