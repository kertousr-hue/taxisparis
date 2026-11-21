export interface GeoapifyAutocompleteSuggestion {
  id: string;
  placeId: string;
  title: string;
  address: {
    label: string;
    countryCode?: string;
    postalCode?: string;
    city?: string;
    street?: string;
    houseNumber?: string;
  };
  resultType: string;
  source?: 'autocomplete' | 'places' | 'structured' | string;
  confidence?: number;
  position: {
    lat: number;
    lng: number;
  };
}

const VALID_DEPARTMENTS = ['75', '77', '78', '91', '92', '93', '94', '95', '45', '28', '60'];
const GEOAPIFY_AUTOCOMPLETE_URL =
  'https://qwsgtmzpirrbnmcbdvue.supabase.co/functions/v1/geoapify-autocomplete';

const CACHE_TTL_MS = 60_000;
const CACHE_MAX_ENTRIES = 40;
const resultCache = new Map<string, { expiresAt: number; items: GeoapifyAutocompleteSuggestion[] }>();

function cacheKey(query: string): string {
  return query.trim().replace(/\s+/g, ' ').toLocaleLowerCase('fr');
}

function putCache(key: string, items: GeoapifyAutocompleteSuggestion[]) {
  if (resultCache.size >= CACHE_MAX_ENTRIES) {
    const oldest = resultCache.keys().next().value;
    if (oldest) resultCache.delete(oldest);
  }
  resultCache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, items });
}

function normalizeItems(data: any): GeoapifyAutocompleteSuggestion[] {
  if (!data?.items || !Array.isArray(data.items)) return [];

  return data.items
    .filter((item: any) => {
      if (!item.address) return false;

      const label = item.address.label || '';
      const postalCode = item.address.postalCode || '';
      const postalCodeMatch = label.match(/\b(\d{5})\b/);
      const foundPostalCode = postalCode || (postalCodeMatch ? postalCodeMatch[1] : '');
      const hasPosition = Number.isFinite(item.position?.lat) && Number.isFinite(item.position?.lng);
      const placeId = String(item.placeId || item.id || '').trim();

      if (!/^\d{5}$/.test(foundPostalCode) || !hasPosition || !placeId) return false;

      const department = foundPostalCode.substring(0, 2);
      return VALID_DEPARTMENTS.includes(department);
    })
    .map((item: any) => {
      const label = item.address.label || '';
      const postalCodeMatch = label.match(/\b(\d{5})\b/);
      const postalCode = item.address.postalCode || (postalCodeMatch ? postalCodeMatch[1] : '');

      return {
        id: String(item.id || item.placeId),
        placeId: String(item.placeId || item.id),
        title: item.title,
        address: {
          label: item.address.label,
          countryCode: item.address.countryCode || 'FR',
          postalCode,
          city: item.address.city,
          street: item.address.street,
          houseNumber: item.address.houseNumber,
        },
        resultType: item.resultType,
        source: item.source,
        confidence: Number(item.confidence || 0),
        position: {
          lat: item.position.lat,
          lng: item.position.lng,
        },
      };
    });
}

export async function fetchGeoapifyAutocomplete(
  query: string,
  signal?: AbortSignal,
): Promise<GeoapifyAutocompleteSuggestion[]> {
  const normalizedQuery = query.trim().replace(/\s+/g, ' ');
  if (normalizedQuery.length < 3 || signal?.aborted) return [];

  const key = cacheKey(normalizedQuery);
  const cached = resultCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.items;
  if (cached) resultCache.delete(key);

  const controller = new AbortController();
  let timedOut = false;
  const abortFromCaller = () => controller.abort();
  signal?.addEventListener('abort', abortFromCaller, { once: true });
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, 7500);

  try {
    const params = new URLSearchParams({ q: normalizedQuery, limit: '8' });
    const response = await fetch(
      GEOAPIFY_AUTOCOMPLETE_URL + '?' + params.toString(),
      { signal: controller.signal },
    );
    if (!response.ok) throw new Error('Geoapify returned HTTP ' + response.status);

    const items = normalizeItems(await response.json());
    // Keep only successful, non-empty lookups in the short cache.
    if (items.length > 0) putCache(key, items);
    return items;
  } catch (error) {
    if (timedOut) throw new Error('Recherche trop longue. Réessayez ou précisez la ville.');
    if (signal?.aborted) return [];
    throw error;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abortFromCaller);
  }
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
