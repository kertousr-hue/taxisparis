import assert from 'node:assert/strict';
import { localDate, reservationPrefill } from '../src/utils/bookingPrefill';

const today = '2026-09-22';
const state = { homeBooking: {
  departure: '  Gare de Lyon, 75012 Paris  ', destination: 'Hôpital Cochin, Paris',
  date: '2026-10-15', trip: 'aller_retour',
  departureCoordinates: { lat: 48.8449, lng: 2.3734 },
  destinationCoordinates: { lat: 48.838, lng: 2.338 },
} };
const result = reservationPrefill(state, '', today);
assert.equal(result.departure, 'Gare de Lyon, 75012 Paris');
assert.equal(result.destination, state.homeBooking.destination);
assert.equal(result.date, '2026-10-15');
assert.equal(result.trip, 'aller_retour');
assert.deepEqual(result.departureCoordinates, state.homeBooking.departureCoordinates);
assert.deepEqual(result.destinationCoordinates, state.homeBooking.destinationCoordinates);
assert.equal(result.recurring, false);

for (const trip of ['aller_simple', 'aller_retour', 'regulier']) {
  const value = reservationPrefill({ homeBooking: { ...state.homeBooking, trip } }, '', today);
  assert.equal(value.recurring, trip === 'regulier');
  assert.equal(value.trip, trip === 'regulier' ? null : trip);
}
for (const date of ['2026-09-21', '2026-02-30', 'not-a-date', '2026-13-01']) {
  assert.equal(reservationPrefill({ homeBooking: { ...state.homeBooking, date } }, '', today).date, '');
}
assert.equal(reservationPrefill({ homeBooking: { date: today } }, '', today).date, today);
assert.equal(localDate(new Date(2026, 0, 2, 0, 5)), '2026-01-02');
for (const badState of [null, undefined, '', {}, { homeBooking: false }]) {
  const value = reservationPrefill(badState, '', today);
  assert.equal(value.hasDraft, false);
  assert.equal(value.trip, null);
}
assert.equal(reservationPrefill({ homeBooking: { departure: '', departureCoordinates: { lat: 48, lng: 2 } } }).departureCoordinates, null);
assert.equal(reservationPrefill({ homeBooking: { departure: 'Paris', departureCoordinates: { lat: 999, lng: 2 } } }).departureCoordinates, null);
assert.equal(reservationPrefill(null, '?service=consultation').careType, 'consultation');
assert.equal(reservationPrefill(null, '?service=soins-reguliers').recurring, true);
assert.equal(reservationPrefill(null, '?service=hospitalisation').careType, null);
assert.match(reservationPrefill(null, '?service=examens').note, /Examens médicaux/);
assert.equal(reservationPrefill(null, '?service=constructor').serviceLabel, '');
assert.equal(reservationPrefill(null, '?service=unknown').note, '');
console.log('PASS: all trip choices, address coordinates, dates, empty entry and service-card presets.');
