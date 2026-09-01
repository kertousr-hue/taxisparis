const VALID_DEPARTMENTS = ['75', '77', '78', '91', '92', '93', '94', '95', '60', '28'];
const SITE_ORIGIN = 'https://www.taxisparis-conventionnes.fr';

function isAllowedOrigin(origin?: string) {
  if (!origin) return true;
  return origin === SITE_ORIGIN ||
    origin === 'https://taxisparis-conventionnes.fr' ||
    origin === 'http://localhost:5173' ||
    /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
}

function getHereKey() {
  return process.env.HERE_API_KEY || process.env.VITE_HERE_API_KEY || '';
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

  const key = getHereKey();
  if (!key) {
    console.error('[HERE] Server API key missing');
    return res.status(500).json({ error: 'HERE server configuration missing' });
  }

  const limitRaw = Array.isArray(req.query?.limit) ? req.query.limit[0] : req.query?.limit;
  const limit = Math.min(Math.max(Number(limitRaw) || 5, 1), 10);

  const url = new URL('https://autosuggest.search.hereapi.com/v1/autosuggest');
  url.searchParams.set('q', q);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('lang', 'fr');
  url.searchParams.append('in', 'countryCode:FRA');
  url.searchParams.append('in', 'bbox:0.8000,47.9000,4.2000,50.1000');
  url.searchParams.set('apiKey', key);

  try {
    const response = await fetch(url.toString(), {
      headers: { Referer: `${SITE_ORIGIN}/`, Origin: SITE_ORIGIN },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[HERE] Autosuggest failed', response.status, errorText.slice(0, 300));
      return res.status(response.status).json({ error: 'HERE autosuggest unavailable', here_status: response.status });
    }

    const data: any = await response.json();
    const items = Array.isArray(data?.items) ? data.items : [];

    const filtered = items
      .filter((item: any) => {
        if (!item?.address) return false;
        const label = item.address.label || '';
        const postalCode = item.address.postalCode || label.match(/\b(\d{5})\b/)?.[1] || '';
        if (!postalCode) return true;
        return VALID_DEPARTMENTS.includes(postalCode.substring(0, 2));
      })
      .map((item: any) => ({
        id: item.id,
        title: item.title,
        resultType: item.resultType,
        address: {
          label: item.address?.label || item.title || '',
          countryCode: item.address?.countryCode || 'FRA',
          postalCode: item.address?.postalCode || item.address?.label?.match(/\b(\d{5})\b/)?.[1] || '',
          city: item.address?.city,
        },
        ...(Number.isFinite(item.position?.lat) && Number.isFinite(item.position?.lng)
          ? { position: { lat: item.position.lat, lng: item.position.lng } }
          : {}),
      }));

    return res.status(200).json({ items: filtered });
  } catch (error) {
    console.error('[HERE] Autosuggest proxy error', error);
    return res.status(502).json({ error: 'HERE autosuggest request failed' });
  }
}
