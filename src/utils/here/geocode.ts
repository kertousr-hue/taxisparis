export interface GeocodeCoordinates {
  lat: number;
  lng: number;
}

export interface GeocodeResult {
  address: string;
  coordinates: GeocodeCoordinates;
}

const FALLBACK_API_KEY = 'jLKtWkEMQJyBh7eTCFHb4wWzWQlBxJh4v28SZvT4COA';

export async function geocodeAddress(
  address: string,
  apiKey: string
): Promise<GeocodeResult | null> {
  if (!address || address.trim().length === 0) {
    return null;
  }

  const key = (apiKey && apiKey !== 'votre_clé_here_api') ? apiKey : FALLBACK_API_KEY;

  try {
    const url = new URL('https://geocode.search.hereapi.com/v1/geocode');
    url.searchParams.set('q', address);
    url.searchParams.set('in', 'countryCode:FRA');
    url.searchParams.set('lang', 'fr');
    url.searchParams.set('apiKey', key);

    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error('HERE Geocode API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.warn('No geocoding results found for:', address);
      return null;
    }

    const item = data.items[0];
    const position = item.position;
    const fullAddress = item.address?.label || address;

    return {
      address: fullAddress,
      coordinates: {
        lat: position.lat,
        lng: position.lng,
      },
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}
