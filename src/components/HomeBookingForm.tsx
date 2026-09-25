import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays } from 'lucide-react';
import AutocompleteInput from './AutocompleteInput';
import { localDate, type Coordinates, type TripChoice } from '../utils/bookingPrefill';

const choices: { value: TripChoice; label: string }[] = [
  { value: 'aller_simple', label: 'Trajet simple' },
  { value: 'aller_retour', label: 'Aller-retour' },
  { value: 'regulier', label: 'Rendez-vous réguliers' },
];

export default function HomeBookingForm() {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [trip, setTrip] = useState<TripChoice>('aller_simple');
  const [departureCoordinates, setDepartureCoordinates] = useState<Coordinates | null>(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState<Coordinates | null>(null);
  const [departurePlaceId, setDeparturePlaceId] = useState<string | null>(null);
  const [destinationPlaceId, setDestinationPlaceId] = useState<string | null>(null);
  const [error, setError] = useState('');

  function continueBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (departure.trim().length < 5 || destination.trim().length < 5) {
      setError('Indiquez une adresse de départ et une destination plus précises.');
      return;
    }
    if (!departureCoordinates || !destinationCoordinates || !departurePlaceId || !destinationPlaceId) {
      setError('Sélectionnez les deux adresses dans la liste Geoapify proposée.');
      return;
    }
    // History state keeps personal addresses out of URLs and analytics page views.
    navigate('/reservation-taxi-vsl', { state: { homeBooking: {
      departure: departure.trim(), destination: destination.trim(), date, trip,
      departureCoordinates, destinationCoordinates,
      departurePlaceId, destinationPlaceId,
    } } });
  }

  return (
    <form className="exact-home-booking-card home-booking-form" onSubmit={continueBooking} aria-labelledby="home-booking-title">
      <h2 id="home-booking-title">Réservez votre transport médical</h2>
      <fieldset className="home-booking-choices">
        <legend className="sr-only">Type de trajet</legend>
        {choices.map(choice => (
          <label key={choice.value} className={trip === choice.value ? 'is-selected' : ''}>
            <input type="radio" name="home-trip" value={choice.value} checked={trip === choice.value}
              onChange={() => setTrip(choice.value)} className="sr-only" />
            <span>{choice.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="home-booking-fields">
        <AutocompleteInput label="Adresse de départ" placeholder="Votre adresse de départ" required apiKey=""
          value={departure} isValidated={Boolean(departureCoordinates && departurePlaceId)}
          onInputChange={value => { setDeparture(value); setDepartureCoordinates(null); setDeparturePlaceId(null); setError(''); }}
          onAddressSelect={(value, lat, lng, placeId) => { setDeparture(value); setDepartureCoordinates({ lat, lng }); setDeparturePlaceId(placeId); }} />
        <AutocompleteInput label="Destination" placeholder="Hôpital, clinique, adresse…" required apiKey=""
          value={destination} isValidated={Boolean(destinationCoordinates && destinationPlaceId)}
          onInputChange={value => { setDestination(value); setDestinationCoordinates(null); setDestinationPlaceId(null); setError(''); }}
          onAddressSelect={(value, lat, lng, placeId) => { setDestination(value); setDestinationCoordinates({ lat, lng }); setDestinationPlaceId(placeId); }} />
        <div className="home-booking-date">
          <label htmlFor="home-trip-date"><CalendarDays size={16} aria-hidden="true" />{trip === 'regulier' ? 'Premier trajet' : 'Date du trajet'} *</label>
          <input id="home-trip-date" name="date" type="date" value={date} min={localDate()} required onChange={event => setDate(event.target.value)} />
        </div>
        <button type="submit" className="home-booking-submit">Continuer <ArrowRight size={19} aria-hidden="true" /></button>
      </div>
      <p className="home-booking-help" aria-live="polite">{trip === 'regulier'
        ? 'Indiquez la date du premier trajet. Nous confirmerons ensemble le planning de vos rendez-vous.'
        : 'Vos coordonnées et l’heure de prise en charge vous seront demandées à l’étape suivante.'}</p>
      {error && <p className="home-booking-error" role="alert">{error}</p>}
    </form>
  );
}
