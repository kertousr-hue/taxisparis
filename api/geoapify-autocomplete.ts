const VALID_DEPARTMENTS = ['75', '77', '78', '91', '92', '93', '94', '95', '60', '28'];
const SITE_ORIGIN = 'https://www.taxisparis-conventionnes.fr';

function isAllowedOrigin(origin?: string) {
  if (!origin) return true;
  return origin === SITE_ORIGIN ||
    origin === 'https://taxisparis-conventionnes.fr' ||
    origin === 'http://localhost:5173' ||
    /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
}

function getGeoapifyKey() {
  return process.env.GEOAPIFY_API_KEY || '';
}

export default async function handler(req: any, res: any) {
  const origin = req.headers?.origin as string | undefined;
  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawQ = Array.isArray(req.query?.q) ? req.query.q[0] : req.query?.q;
  const q = typeof rawQ === 'string' ? rawQ.trim() : '';
  if (q.length < 3) return res.status(200).json({ items: [] });

  const key = getGeoapifyKey();
  if (!key) {
    console.error('[GEOAPIFY] Server API key missing');
    return res.status(500).json({ error: 'Geoapify server configuration missing' });
  }

  const limitRaw = Array.isArray(req.query?.limit) ? req.query.limit[0] : req.query?.limit;
  const limit = Math.min(Math.max(Number(limitRaw) || 5, 1), 10);

  // On demande un peu plus de résultats en amont, puis on conserve uniquement
  // les départements desservis, afin d'éviter une liste vide après filtrage.
  const upstreamLimit = Math.min(Math.max(limit * 2, 8), 20);
  const url = new URL('https://api.geoapify.com/v1/geocode/autocomplete');
  url.searchParams.set('text', q);
  url.searchParams.set('format', 'json');
  url.searchParams.set('lang', 'fr');
  url.searchParams.set('limit', String(upstreamLimit));
  url.searchParams.set('filter', 'rect:0.8000,47.9000,4.2000,50.1000');
  url.searchParams.set('bias', 'proximity:2.3522,48.8566');
  url.searchParams.set('apiKey', key);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GEOAPIFY] Autocomplete failed', response.status, errorText.slice(0, 300));
      return res.status(response.status).json({
        error: 'Geoapify autocomplete unavailable',
        geoapify_status: response.status,
      });
    }

    const data: any = await response.json();
    const results = Array.isArray(data?.results) ? data.results : [];

    const items = results
      .filter((item: any) => Number.isFinite(item?.lat) && Number.isFinite(item?.lon))
      .filter((item: any) => {
        const postalCode = String(item?.postcode || '');
        if (!postalCode) return true;
        return VALID_DEPARTMENTS.includes(postalCode.substring(0, 2));
      })
      .slice(0, limit)
      .map((item: any, index: number) => {
        const label = item.formatted || [item.address_line1, item.address_line2].filter(Boolean).join(', ') || q;
        const title = item.address_line1 || item.name || item.street || label;
        return {
          id: item.place_id || `${item.lat},${item.lon},${index}`,
          title,
          resultType: item.result_type || 'address',
          address: {
            label,
            countryCode: String(item.country_code || 'fr').toUpperCase(),
            postalCode: item.postcode || '',
            city: item.city || item.town || item.village || item.municipality || '',
          },
          position: { lat: item.lat, lng: item.lon },
        };
      });

    return res.status(200).json({ items, provider: 'geoapify' });
  } catch (error) {
    console.error('[GEOAPIFY] Autocomplete proxy error', error);
    return res.status(502).json({ error: 'Geoapify autocomplete request failed' });
  }
}
