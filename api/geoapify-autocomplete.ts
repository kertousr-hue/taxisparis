const SUPABASE_GEOAPIFY_URL =
  'https://qwsgtmzpirrbnmcbdvue.supabase.co/functions/v1/geoapify-autocomplete';

export default async function handler(req: any, res: any) {
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
  const rawLimit = Array.isArray(req.query?.limit) ? req.query.limit[0] : req.query?.limit;
  const limit = Math.min(Math.max(Number(rawLimit) || 5, 1), 10);

  const url = new URL(SUPABASE_GEOAPIFY_URL);
  url.searchParams.set('q', q);
  url.searchParams.set('limit', String(limit));

  try {
    const response = await fetch(url.toString());
    const body = await response.text();
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json; charset=utf-8');
    return res.status(response.status).send(body);
  } catch (error) {
    console.error('[GEOAPIFY] Supabase Edge Function proxy error', error);
    return res.status(502).json({ error: 'Geoapify autocomplete request failed' });
  }
}
