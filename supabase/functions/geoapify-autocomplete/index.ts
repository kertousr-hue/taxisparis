const VALID_DEPARTMENTS = new Set(['75', '77', '78', '91', '92', '93', '94', '95', '60', '28']);
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
  const requestedLimit = Number(requestUrl.searchParams.get('limit')) || 5;
  const limit = Math.min(Math.max(requestedLimit, 1), 10);

  if (q.length < 3) {
    return json({ items: [], provider: 'geoapify' }, 200, origin);
  }

  const apiKey = Deno.env.get('GEOAPIFY_API_KEY');
  if (!apiKey) {
    console.error('[GEOAPIFY] Server API key missing');
    return json({ error: 'Geoapify server configuration missing' }, 500, origin);
  }

  const upstreamUrl = new URL('https://api.geoapify.com/v1/geocode/autocomplete');
  upstreamUrl.searchParams.set('text', q);
  upstreamUrl.searchParams.set('format', 'json');
  upstreamUrl.searchParams.set('lang', 'fr');
  upstreamUrl.searchParams.set('limit', '20');
  upstreamUrl.searchParams.set('filter', 'countrycode:fr');
  upstreamUrl.searchParams.set('bias', 'proximity:2.3522,48.8566');
  upstreamUrl.searchParams.set('apiKey', apiKey);

  try {
    const response = await fetch(upstreamUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GEOAPIFY] Autocomplete failed', response.status, errorText.slice(0, 300));
      return json({
        error: 'Geoapify autocomplete unavailable',
        geoapify_status: response.status,
      }, 502, origin);
    }

    const data = await response.json();
    const results = Array.isArray(data?.results) ? data.results : [];

    const items = results
      .filter((item: any) => Number.isFinite(item?.lat) && Number.isFinite(item?.lon))
      .map((item: any, index: number) => {
        const label = item.formatted || [item.address_line1, item.address_line2].filter(Boolean).join(', ') || q;
        const title = item.address_line1 || item.name || item.street || label;
        const postalCode = String(item.postcode || label.match(/\b(\d{5})\b/)?.[1] || '');
        const city = item.city || item.town || item.village || item.municipality || '';

        return {
          id: item.place_id || `${item.lat},${item.lon},${index}`,
          title,
          resultType: item.result_type || 'address',
          address: {
            label,
            countryCode: String(item.country_code || 'fr').toUpperCase(),
            postalCode,
            city,
          },
          position: {
            lat: item.lat,
            lng: item.lon,
          },
        };
      })
      .filter((item: any) => {
        const postalCode = item.address.postalCode;
        if (!postalCode) return true;
        return VALID_DEPARTMENTS.has(postalCode.substring(0, 2));
      })
      .slice(0, limit);

    return json({ items, provider: 'geoapify' }, 200, origin);
  } catch (error) {
    console.error('[GEOAPIFY] Autocomplete request failed', error instanceof Error ? error.message : 'unknown error');
    return json({ error: 'Geoapify autocomplete request failed' }, 502, origin);
  }
});
