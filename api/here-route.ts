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

function validCoord(value: unknown, min: number, max: number) {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
}

export default async function handler(req: any, res: any) {
  const originHeader = req.headers?.origin as string | undefined;
  if (!isAllowedOrigin(originHeader)) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  if (originHeader) res.setHeader('Access-Control-Allow-Origin', originHeader);
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

  const body = parseBody(req.body);
  const origin = body.origin || {};
  const destination = body.destination || {};
  const departureDate = typeof body.departureDate === 'string' ? body.departureDate : '';
  const departureTime = typeof body.departureTime === 'string' ? body.departureTime : '';

  if (
    !validCoord(origin.lat, -90, 90) || !validCoord(origin.lng, -180, 180) ||
    !validCoord(destination.lat, -90, 90) || !validCoord(destination.lng, -180, 180) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(departureDate) ||
    !/^\d{2}:\d{2}$/.test(departureTime)
  ) {
    return res.status(400).json({ error: 'Invalid route parameters' });
  }

  const key = getHereKey();
  if (!key) {
    console.error('[HERE] Server API key missing');
    return res.status(500).json({ error: 'HERE server configuration missing' });
  }

  const url = new URL('https://router.hereapi.com/v8/routes');
  url.searchParams.set('transportMode', 'car');
  url.searchParams.set('origin', `${origin.lat},${origin.lng}`);
  url.searchParams.set('destination', `${destination.lat},${destination.lng}`);
  url.searchParams.set('return', 'summary');
  url.searchParams.set('departureTime', `${departureDate}T${departureTime}:00`);
  url.searchParams.set('apiKey', key);

  try {
    const response = await fetch(url.toString(), {
      headers: { Referer: `${SITE_ORIGIN}/`, Origin: SITE_ORIGIN },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[HERE] Routing failed', response.status, errorText.slice(0, 300));
      return res.status(response.status).json({ error: 'HERE routing unavailable', here_status: response.status });
    }

    const data: any = await response.json();
    const summary = data?.routes?.[0]?.sections?.[0]?.summary;
    if (!summary || !Number.isFinite(summary.length) || !Number.isFinite(summary.duration)) {
      return res.status(404).json({ error: 'Route not found' });
    }

    return res.status(200).json({
      distance_km: Number((summary.length / 1000).toFixed(2)),
      duree_minutes: Math.round(summary.duration / 60),
      route_source: 'server_here',
      here_api_used: true,
    });
  } catch (error) {
    console.error('[HERE] Routing proxy error', error);
    return res.status(502).json({ error: 'HERE routing request failed' });
  }
}
