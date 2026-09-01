export interface GeocodeCoordinates {
  lat: number;
  lng: number;
}

export interface GeocodeResult {
  address: string;
  coordinates: GeocodeCoordinates;
}

export async function geocodeAddress(
  address: string,
  _apiKey?: string
): Promise<GeocodeResult | null> {
  if (!address || address.trim().length === 0) {
    return null;
  }

  try {
    const response = await fetch('/api/here-geocode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      console.error('HERE Geocode proxy error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    if (!data || !Number.isFinite(data.coordinates?.lat) || !Number.isFinite(data.coordinates?.lng)) {
      return null;
    }

    return {
      address: data.address || address,
      coordinates: {
        lat: data.coordinates.lat,
        lng: data.coordinates.lng,
      },
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}
