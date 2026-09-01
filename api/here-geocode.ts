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

function parseBody(body: any) {
  if (typeof body !== 'string') return body || {};
  try { return JSON.parse(body); } catch { return {}; }
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
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { address } = parseBody(req.body);
  if (typeof address !== 'string' || address.trim().length < 3) {
    return res.status(400).json({ error: 'Invalid address' });
  }

  const key = getHereKey();
  if (!key) {
    console.error('[HERE] Server API key missing');
    return res.status(500).json({ error: 'HERE server configuration missing' });
  }

  const url = new URL('https://geocode.search.hereapi.com/v1/geocode');
  url.searchParams.set('q', address.trim());
  url.searchParams.set('in', 'countryCode:FRA');
  url.searchParams.set('lang', 'fr');
  url.searchParams.set('apiKey', key);

  try {
    const response = await fetch(url.toString(), {
      headers: { Referer: `${SITE_ORIGIN}/`, Origin: SITE_ORIGIN },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[HERE] Geocode failed', response.status, errorText.slice(0, 300));
      return res.status(response.status).json({ error: 'HERE geocoding unavailable', here_status: response.status });
    }

    const data: any = await response.json();
    const item = Array.isArray(data?.items) ? data.items[0] : null;
    if (!item || !Number.isFinite(item.position?.lat) || !Number.isFinite(item.position?.lng)) {
      return res.status(404).json({ error: 'Address not found' });
    }

    return res.status(200).json({
      address: item.address?.label || address.trim(),
      coordinates: { lat: item.position.lat, lng: item.position.lng },
    });
  } catch (error) {
    console.error('[HERE] Geocode proxy error', error);
    return res.status(502).json({ error: 'HERE geocoding request failed' });
  }
}
