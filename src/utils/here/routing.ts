export interface RouteResult {
  distance_km: number | null;
  duree_minutes: number | null;
}

export async function calculateRoute(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  _apiKey?: string,
  departureDate?: string,
  departureTime?: string
): Promise<RouteResult | null> {
  if (![originLat, originLng, destLat, destLng].every(Number.isFinite)) {
    return null;
  }

  try {
    const response = await fetch('/api/here-route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin: { lat: originLat, lng: originLng },
        destination: { lat: destLat, lng: destLng },
        departureDate: departureDate || '',
        departureTime: departureTime || '',
      }),
    });

    if (!response.ok) {
      console.error('HERE Routing proxy error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    if (!Number.isFinite(data?.distance_km) || !Number.isFinite(data?.duree_minutes)) {
      return null;
    }

    return {
      distance_km: data.distance_km,
      duree_minutes: data.duree_minutes,
    };
  } catch (error) {
    console.error('Error calculating route:', error);
    return null;
  }
}
