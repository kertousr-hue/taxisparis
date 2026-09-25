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
  position: {
    lat: number;
    lng: number;
  };
}

const VALID_DEPARTMENTS = ['75', '77', '78', '91', '92', '93', '94', '95', '45', '28', '60'];
const GEOAPIFY_AUTOCOMPLETE_URL =
  'https://qwsgtmzpirrbnmcbdvue.supabase.co/functions/v1/geoapify-autocomplete';

export async function fetchGeoapifyAutocomplete(
  query: string
): Promise<GeoapifyAutocompleteSuggestion[]> {
  if (!query || query.length < 3) {
    return [];
  }

  try {
    const params = new URLSearchParams({ q: query, limit: '8' });
    const response = await fetch(`${GEOAPIFY_AUTOCOMPLETE_URL}?${params.toString()}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Geoapify Supabase search error:', response.status, response.statusText, errorText);
      return [];
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      return [];
    }

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
          position: {
            lat: item.position.lat,
            lng: item.position.lng,
          },
        };
      });
  } catch (error) {
    console.error('Error fetching Geoapify search from Supabase:', error);
    return [];
  }
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
