const VALID_DEPARTMENTS = new Set(['75', '77', '78', '91', '92', '93', '94', '95', '45', '28', '60']);
const IDF_DEPARTMENTS = new Set(['75', '77', '78', '91', '92', '93', '94', '95']);
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

function looksLikeMedicalPlace(query: string): boolean {
  const q = normalizeForSearch(query);
  return /\b(hopital|clinique|centre medical|centre de sante|centre de soins|chu|ghu|maternite|polyclinique|dialyse|radiotherapie|oncologie|imagerie|cabinet medical|laboratoire medical)\b/.test(q);
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

function dedupeResults(items: any[]): any[] {
  const seen = new Set<string>();
  const out: any[] = [];

  for (const item of items) {
    const placeId = String(item?.place_id || '').trim();
    if (!placeId || seen.has(placeId)) continue;
    seen.add(placeId);
    out.push(item);
  }

  return out;
}

function scoreResult(item: any, query: string): number {
  const rank = item?.rank || {};
  const postalCode = postalCodeOf(item);
  const department = postalCode.substring(0, 2);
  const type = String(item?.result_type || '');
  const source = String(item?._source || 'autocomplete');
  const tokens = queryTokens(query);

  let score = 0;

  if (IDF_DEPARTMENTS.has(department)) score += 100;
  if (department === '75') score += 10;

  const queryPostalCode = query.match(/\b\d{5}\b/)?.[0] || '';
  if (queryPostalCode) {
    score += postalCode === queryPostalCode ? 320 : -180;
    if (source === 'structured') score += 120;
  }

  if (looksLikeMedicalPlace(query) && source === 'places') score += 150;

  const nameText = normalizeForSearch(item?.name || item?.address_line1 || '');
  const streetText = normalizeForSearch([item?.housenumber, item?.street].filter(Boolean).join(' '));
  const fullText = normalizeForSearch([
    item?.name,
    item?.housenumber,
    item?.street,
    postalCode,
    cityOf(item),
    item?.formatted,
    item?.address_line1,
    item?.address_line2,
  ].filter(Boolean).join(' '));

  let nameMatches = 0;
  let totalMatches = 0;
  for (const token of tokens) {
    if (nameText.includes(token)) {
      score += 42;
      nameMatches += 1;
      totalMatches += 1;
    } else if (streetText.includes(token)) {
      score += 22;
      totalMatches += 1;
    } else if (fullText.includes(token)) {
      score += 10;
      totalMatches += 1;
    }
  }

  if (tokens.length && nameMatches === tokens.length) score += 95;
  if (tokens.length && totalMatches === tokens.length) score += 45;

  if (type === 'building') score += 50;
  else if (type === 'amenity') score += 45;
  else if (type === 'street') score += 22;
  else if (type === 'postcode') score += 8;
  else if (type === 'city') score += 4;

  if (item?.housenumber) score += /\d/.test(query) ? 50 : 15;
  if (rank?.match_type === 'full_match') score += 25;
  score += Number(rank?.confidence || 0) * 20;
  score += Number(rank?.confidence_building_level || 0) * 18;
  score += Number(rank?.confidence_street_level || 0) * 12;

  return score;
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
  const q = (requestUrl.searchParams.get('q') || '').trim();
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
    // Base search for every street/address query.
    const autocompleteUrl = new URL('https://api.geoapify.com/v1/geocode/autocomplete');
    autocompleteUrl.searchParams.set('text', q);
    autocompleteUrl.searchParams.set('format', 'json');
    autocompleteUrl.searchParams.set('lang', 'fr');
    autocompleteUrl.searchParams.set('limit', '20');
    autocompleteUrl.searchParams.set('filter', 'countrycode:fr');
    autocompleteUrl.searchParams.set('bias', 'proximity:2.3522,48.8566');
    autocompleteUrl.searchParams.set('apiKey', apiKey);

    const autocompletePromise = fetch(autocompleteUrl).then(async response => {
      if (!response.ok) {
        const detail = await response.text();
        console.error('[GEOAPIFY] Autocomplete failed', response.status, detail.slice(0, 300));
        return [];
      }
      const data = await response.json().catch(() => null);
      return (Array.isArray(data?.results) ? data.results : [])
        .map((item: any) => ({ ...item, postcode: postalCodeOf(item), _source: 'autocomplete' }))
        .filter(allowedResult);
    });

    // Medical places: autocomplete + Places API.
    const medicalPromise = looksLikeMedicalPlace(q)
      ? (() => {
          const placesUrl = new URL('https://api.geoapify.com/v2/places');
          placesUrl.searchParams.set('categories', 'healthcare');
          placesUrl.searchParams.set('name', q.replace(/\b\d{5}\b/g, ' ').replace(/\s+/g, ' ').trim());
          placesUrl.searchParams.set('filter', 'rect:0.5,47.0,4.5,50.2');
          placesUrl.searchParams.set('bias', 'rect:1.2,48.0,3.7,49.3');
          placesUrl.searchParams.set('lang', 'fr');
          placesUrl.searchParams.set('limit', '20');
          placesUrl.searchParams.set('apiKey', apiKey);

          return fetch(placesUrl).then(async response => {
            if (!response.ok) {
              const detail = await response.text();
              console.error('[GEOAPIFY] Places failed', response.status, detail.slice(0, 300));
              return [];
            }
            const data = await response.json().catch(() => null);
            return (Array.isArray(data?.features) ? data.features : [])
              .map(placeFeatureToResult)
              .filter(allowedResult);
          });
        })()
      : Promise.resolve([]);

    // Any query containing a postcode also gets a structured geocoding request.
    const structured = parseStructuredQuery(q);
    const structuredPromise = structured
      ? (() => {
          const structuredUrl = new URL('https://api.geoapify.com/v1/geocode/search');
          structuredUrl.searchParams.set('format', 'json');
          structuredUrl.searchParams.set('lang', 'fr');
          structuredUrl.searchParams.set('limit', '20');
          structuredUrl.searchParams.set('filter', 'countrycode:fr');
          structuredUrl.searchParams.set('apiKey', apiKey);
          for (const [key, value] of Object.entries(structured)) {
            if (value) structuredUrl.searchParams.set(key, String(value));
          }

          return fetch(structuredUrl).then(async response => {
            if (!response.ok) {
              const detail = await response.text();
              console.error('[GEOAPIFY] Structured geocoding failed', response.status, detail.slice(0, 300));
              return [];
            }
            const data = await response.json().catch(() => null);
            return (Array.isArray(data?.results) ? data.results : [])
              .map((item: any) => ({ ...item, postcode: postalCodeOf(item), _source: 'structured' }))
              .filter(allowedResult);
          });
        })()
      : Promise.resolve([]);

    const [autocompleteResults, medicalResults, structuredResults] = await Promise.all([
      autocompletePromise,
      medicalPromise,
      structuredPromise,
    ]);

    const merged = dedupeResults([
      ...autocompleteResults,
      ...medicalResults,
      ...structuredResults,
    ]).sort((a, b) => scoreResult(b, q) - scoreResult(a, q));

    const items = merged.slice(0, limit).map((item: any) => {
      const label = buildPreciseLabel(item, q);
      const streetLine = [item?.housenumber, item?.street].filter(Boolean).join(' ').trim();

      return {
        id: String(item.place_id),
        placeId: String(item.place_id),
        title: String(item?.name || item?.address_line1 || streetLine || label || q),
        resultType: String(item?.result_type || 'address'),
        source: String(item?._source || 'autocomplete'),
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
        places: looksLikeMedicalPlace(q),
        structured: Boolean(structured),
      },
    }, 200, origin);
  } catch (error) {
    console.error('[GEOAPIFY] Search request failed', error instanceof Error ? error.message : 'unknown error');
    return json({ error: 'Geoapify search request failed' }, 502, origin);
  }
});
