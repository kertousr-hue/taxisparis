export interface RouteResult {
  distance_km: number;
  duree_minutes: number;
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

  // Ne lance aucun appel HERE tant que la date ET l'heure ne sont pas connues.
  // Cela évite les calculs successifs coordonnées -> date -> heure.
  if (!departureDate || !departureTime) {
    return null;
  }

  try {
    const response = await fetch('/api/here-route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin: { lat: originLat, lng: originLng },
        destination: { lat: destLat, lng: destLng },
        departureDate,
        departureTime,
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
