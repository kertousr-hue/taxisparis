export interface HereAutocompleteSuggestion {
  id: string;
  title: string;
  address: {
    label: string;
    countryCode?: string;
    postalCode?: string;
    city?: string;
  };
  resultType: string;
  position?: {
    lat: number;
    lng: number;
  };
}

const VALID_DEPARTMENTS = ['75', '77', '78', '91', '92', '93', '94', '95', '45', '28', '60'];
const GEOAPIFY_AUTOCOMPLETE_URL =
  'https://qwsgtmzpirrbnmcbdvue.supabase.co/functions/v1/geoapify-autocomplete';

export async function fetchHereAutocomplete(
  query: string,
  _apiKey?: string
): Promise<HereAutocompleteSuggestion[]> {
  if (!query || query.length < 3) {
    return [];
  }

  try {
    const params = new URLSearchParams({ q: query, limit: '5' });
    const response = await fetch(`${GEOAPIFY_AUTOCOMPLETE_URL}?${params.toString()}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Geoapify Supabase autocomplete error:', response.status, response.statusText, errorText);
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

        if (!/^\d{5}$/.test(foundPostalCode)) return false;

        const department = foundPostalCode.substring(0, 2);
        return VALID_DEPARTMENTS.includes(department);
      })
      .map((item: any) => {
        const label = item.address.label || '';
        const postalCodeMatch = label.match(/\b(\d{5})\b/);
        const postalCode = item.address.postalCode || (postalCodeMatch ? postalCodeMatch[1] : '');
        const hasPosition = Number.isFinite(item.position?.lat) && Number.isFinite(item.position?.lng);

        return {
          id: item.id,
          title: item.title,
          address: {
            label: item.address.label,
            countryCode: item.address.countryCode || 'FR',
            postalCode,
            city: item.address.city,
          },
          resultType: item.resultType,
          ...(hasPosition ? { position: { lat: item.position.lat, lng: item.position.lng } } : {}),
        };
      });
  } catch (error) {
    console.error('Error fetching Geoapify autocomplete from Supabase:', error);
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
