export type TripChoice = 'aller_simple' | 'aller_retour' | 'regulier';
export type Coordinates = { lat: number; lng: number };

export interface HomeBookingDraft {
  departure: string;
  destination: string;
  date: string;
  trip: TripChoice;
  departureCoordinates: Coordinates | null;
  destinationCoordinates: Coordinates | null;
}

export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function validCoordinates(value: unknown): Coordinates | null {
  if (!value || typeof value !== 'object') return null;
  const { lat, lng } = value as Coordinates;
  return Number.isFinite(lat) && Math.abs(lat) <= 90 && Number.isFinite(lng) && Math.abs(lng) <= 180
    ? { lat, lng } : null;
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, 500) : '';
}

export function reservationPrefill(state: unknown, search = '', today = localDate()) {
  const draft = state && typeof state === 'object' && 'homeBooking' in state
    && state.homeBooking && typeof state.homeBooking === 'object'
    ? state.homeBooking as Partial<HomeBookingDraft> : {};
  const departure = text(draft.departure);
  const destination = text(draft.destination);
  const date = text(draft.date);
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
    && Number.isFinite(Date.parse(`${date}T12:00:00Z`))
    && new Date(`${date}T12:00:00Z`).toISOString().startsWith(date) && date >= today;
  const service = new URLSearchParams(search).get('service');
  const services: Record<string, string> = {
    consultation: 'Consultation médicale',
    hospitalisation: 'Entrée ou sortie d’hôpital',
    'soins-reguliers': 'Soins réguliers',
    examens: 'Examens médicaux',
  };
  const serviceLabel = service && Object.prototype.hasOwnProperty.call(services, service) ? services[service] : '';

  return {
    departure,
    destination,
    date: validDate ? date : '',
    departureCoordinates: departure ? validCoordinates(draft.departureCoordinates) : null,
    destinationCoordinates: destination ? validCoordinates(draft.destinationCoordinates) : null,
    trip: draft.trip === 'aller_simple' || draft.trip === 'aller_retour' ? draft.trip : null,
    recurring: draft.trip === 'regulier' || service === 'soins-reguliers',
    careType: service === 'consultation' ? 'consultation' : null,
    note: serviceLabel ? `Transport demandé : ${serviceLabel}.` : '',
    hasDraft: Boolean(departure || destination || validDate),
    serviceLabel,
  };
}
