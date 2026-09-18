import { useState, useEffect } from 'react';
import { Brain as Train, MapPin, Calendar, Clock, Users, Luggage, Phone, Mail, CheckCircle, Gauge, Timer, Plane } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AutocompleteInput from '../components/AutocompleteInput';
import { calculateRoute } from '../utils/here';
import SEOHead from '../components/SEOHead';

interface StationTransferFormData {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse_depart: string;
  adresse_arrivee: string;
  date_trajet: string;
  heure_trajet: string;
  numero_train?: string;
  nombre_passagers: number;
  nombre_bagages: number;
  distance_km?: number;
  duree_minutes?: number;
  informations_supplementaires?: string;
}

export default function StationTransfer() {
  const [formData, setFormData] = useState<StationTransferFormData>({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse_depart: '',
    adresse_arrivee: '',
    date_trajet: '',
    heure_trajet: '',
    numero_train: '',
    nombre_passagers: 1,
    nombre_bagages: 1,
    informations_supplementaires: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string>('');
  const [distance, setDistance] = useState<number | null>(null);
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [coordsDepart, setCoordsDepart] = useState<{lat: number, lng: number} | null>(null);
  const [coordsArrivee, setCoordsArrivee] = useState<{lat: number, lng: number} | null>(null);

  const apiKey = import.meta.env.VITE_HERE_API_KEY;

  useEffect(() => {
    const calculateDistance = async () => {
      if (coordsDepart && coordsArrivee) {
        setIsCalculating(true);
        setError('');

        try {
          const result = await calculateRoute(
            coordsDepart.lat,
            coordsDepart.lng,
            coordsArrivee.lat,
            coordsArrivee.lng,
            apiKey,
            formData.date_trajet,
            formData.heure_trajet
          );

          if (result) {
            setDistance(result.distance_km);
            setDurationMinutes(result.duree_minutes);
          } else {
            setError('Impossible de calculer la distance');
          }
        } catch (err) {
          console.error('Error calculating distance:', err);
          setError('Erreur lors du calcul de distance');
        } finally {
          setIsCalculating(false);
        }
      }
    };

    const timeoutId = setTimeout(calculateDistance, 500);
    return () => clearTimeout(timeoutId);
  }, [coordsDepart, coordsArrivee, apiKey, formData.date_trajet, formData.heure_trajet]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const reservationRow = {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        email: formData.email || '',
        adresse_depart: formData.adresse_depart,
        adresse_arrivee: formData.adresse_arrivee,
        distance_km: distance || null,
        duree_min: durationMinutes || null,
        date_rdv: formData.date_trajet,
        heure_rdv: formData.heure_trajet,
        nombre_passagers: formData.nombre_passagers || null,
        nombre_bagages: formData.nombre_bagages || null,
        numero_vol: null,
        numero_train: formData.numero_train || null,
        message: formData.informations_supplementaires || null,
        type_trajet: 'gare',
        statut: 'pending',
      };

      const { data: insertedData, error: insertError } = await supabase
        .from('reservations')
        .insert(reservationRow)
        .select()
        .single();

      if (insertError || !insertedData) {
        throw new Error(insertError?.message || 'Impossible d\'enregistrer la réservation.');
      }

      setSubmitSuccess(true);
      setFormData({
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        adresse_depart: '',
        adresse_arrivee: '',
        date_trajet: '',
        heure_trajet: '',
        numero_train: '',
        nombre_passagers: 1,
        nombre_bagages: 1,
        informations_supplementaires: ''
      });
      setCoordsDepart(null);
      setCoordsArrivee(null);
      setDistance(null);
      setDurationMinutes(null);

      setTimeout(() => setSubmitSuccess(false), 5000);

      const emailData = {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        email: formData.email,
        adresse_depart: formData.adresse_depart,
        adresse_arrivee: formData.adresse_arrivee,
        date_rdv: formData.date_trajet,
        heure_rdv: formData.heure_trajet,
        nombre_passagers: formData.nombre_passagers,
        nombre_bagages: formData.nombre_bagages,
        numero_vol: '',
        numero_train: formData.numero_train || '',
        distance_km: distance || 0,
        duree_min: durationMinutes || 0,
        message: formData.informations_supplementaires || '',
        type_trajet: 'gare',
        reservation_id: insertedData.id,
      };

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-reservation-email`;
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(emailData),
      }).catch(() => { /* email notification is best-effort */ });
    } catch (err) {
      console.error('Error submitting station transfer:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Transfert Gare - Taxi VSL Paris",
    "description": "Réservez votre transfert vers les gares de Paris. Service disponible 24/7.",
    "url": "https://www.taxisparis-conventionnes.fr/taxis-gares-parisiennes"
  };

  return (
    <>
      <SEOHead
        title="Transfert Gare Paris | Taxi Gare du Nord, Montparnasse, Lyon - 24/7"
        description="Transfert taxi et VSL vers les gares de Paris : Gare du Nord, Gare de Lyon, Montparnasse, Saint-Lazare. Réservation en ligne, service 24h/24."
        keywords={["taxi gare du Nord", "transfert gare de Lyon", "taxi Montparnasse", "navette gare Paris", "transport gare"]}
        canonical="https://www.taxisparis-conventionnes.fr/taxis-gares-parisiennes"
        jsonLD={jsonLD}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.35) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="container relative mx-auto px-4 py-14 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                <Train size={17} aria-hidden="true" />
                Gares parisiennes & aéroports
              </div>
              <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Transfert Gare & Aéroport à Paris
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
                Réservez votre chauffeur pour un départ ou une arrivée en gare. Prise en charge 24h/24 et 7j/7, avec calcul de distance et de durée avant validation.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#reservation-gare"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-xl transition hover:bg-blue-50"
                >
                  Réserver maintenant
                  <ArrowRightIcon />
                </a>
                <a
                  href="tel:+33650366491"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white hover:text-blue-700"
                >
                  <Phone size={18} aria-hidden="true" />
                  06 50 36 64 91
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Gares parisiennes', 'Nord, Lyon, Montparnasse, Saint-Lazare'],
                  ['Aéroports', 'CDG, Orly, Beauvais, Le Bourget'],
                  ['Disponible 24/7', 'Départs tôt et arrivées tardives'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="font-bold text-white">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-blue-100">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <div className="rounded-[1.6rem] bg-white p-6 text-slate-900 shadow-xl">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Votre trajet</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight">Du quai jusqu'à votre destination</h2>
                  </div>
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50">
                    <Train className="text-blue-700" size={32} />
                  </div>
                </div>

                <div className="my-6 flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-blue-600" />
                  <div className="h-px flex-1 bg-gradient-to-r from-blue-200 via-cyan-300 to-cyan-200" />
                  <span className="h-3 w-3 rounded-full bg-cyan-600" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <Gauge className="mb-2 text-blue-600" size={22} />
                    <p className="font-bold">Distance calculée</p>
                    <p className="mt-1 text-xs text-slate-500">Itinéraire réel</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <Timer className="mb-2 text-cyan-600" size={22} />
                    <p className="font-bold">Durée estimée</p>
                    <p className="mt-1 text-xs text-slate-500">Selon le trajet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Tarifs aéroports</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Forfaits taxis parisiens réglementés
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Les tarifs varient selon la zone de départ à Paris. Les forfaits ci-dessous restent clairement visibles sans prendre le dessus sur la réservation gare.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="rounded-[1.75rem] border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-emerald-600" size={22} />
                      <h3 className="text-xl font-black text-slate-900">Rive Droite</h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      1er, 2e, 3e, 4e, 8e, 9e, 10e, 11e, 12e, 16e, 17e, 18e, 19e, 20e
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">FORFAITS</span>
                </div>
                <div className="mt-5 space-y-3">
                  <FareRow label="CDG" sublabel="Charles de Gaulle" price="56€" tone="green" />
                  <FareRow label="Orly" sublabel="Aéroport d'Orly" price="45€" tone="green" />
                </div>
              </article>

              <article className="rounded-[1.75rem] border border-orange-200 bg-gradient-to-b from-orange-50 to-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-orange-600" size={22} />
                      <h3 className="text-xl font-black text-slate-900">Rive Gauche</h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      5e, 6e, 7e, 13e, 14e, 15e
                    </p>
                  </div>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">FORFAITS</span>
                </div>
                <div className="mt-5 space-y-3">
                  <FareRow label="CDG" sublabel="Charles de Gaulle" price="65€" tone="orange" />
                  <FareRow label="Orly" sublabel="Aéroport d'Orly" price="36€" tone="orange" />
                </div>
              </article>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <Plane className="mt-0.5 shrink-0 text-slate-500" size={20} />
                <div className="text-sm leading-6 text-slate-600">
                  <p><strong className="text-slate-800">Beauvais-Tillé :</strong> prix au compteur (environ 120–150 €).</p>
                  <p><strong className="text-slate-800">Le Bourget :</strong> prix au compteur.</p>
                  <p className="mt-2 text-xs text-slate-500">
                    Les suppléments prévus par la réglementation peuvent s'appliquer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reservation-gare" className="bg-slate-50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-8">
              <div className="mb-8">
                <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Réserver votre trajet</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Informations de réservation</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Renseignez votre trajet. La distance et la durée seront calculées automatiquement après validation des deux adresses.
                </p>
              </div>

              {submitSuccess && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <CheckCircle className="mt-0.5 shrink-0 text-emerald-600" size={22} />
                  <div>
                    <p className="font-bold text-emerald-900">Votre réservation a bien été envoyée.</p>
                    <p className="mt-1 text-sm text-emerald-700">Nous vous contacterons rapidement.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
                  {error}
                </div>
              )}

              <FormStep number="1" title="Vos coordonnées">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nom *">
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required className={inputClass} />
                  </Field>
                  <Field label="Prénom *">
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required className={inputClass} />
                  </Field>
                  <Field label="Téléphone *">
                    <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required className={inputClass} />
                  </Field>
                  <Field label="Email *">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
                  </Field>
                </div>
              </FormStep>

              <FormStep number="2" title="Votre trajet">
                <div className="space-y-4">
                  <AutocompleteInput
                    label="Adresse de départ"
                    value={formData.adresse_depart}
                    placeholder="Ex : Gare du Nord, Paris"
                    required
                    apiKey={apiKey}
                    onAddressSelect={(address, lat, lng) => {
                      setFormData(prev => ({ ...prev, adresse_depart: address }));
                      setCoordsDepart({ lat, lng });
                    }}
                    onInputChange={(value) => {
                      setFormData(prev => ({ ...prev, adresse_depart: value }));
                      setCoordsDepart(null);
                    }}
                    isValidated={coordsDepart !== null}
                  />

                  <AutocompleteInput
                    label="Adresse d'arrivée"
                    value={formData.adresse_arrivee}
                    placeholder="Ex : 25 Avenue des Champs-Élysées, Paris"
                    required
                    apiKey={apiKey}
                    onAddressSelect={(address, lat, lng) => {
                      setFormData(prev => ({ ...prev, adresse_arrivee: address }));
                      setCoordsArrivee({ lat, lng });
                    }}
                    onInputChange={(value) => {
                      setFormData(prev => ({ ...prev, adresse_arrivee: value }));
                      setCoordsArrivee(null);
                    }}
                    isValidated={coordsArrivee !== null}
                  />
                </div>

                {isCalculating && (
                  <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-center text-sm font-medium text-blue-700">
                    Calcul de l'itinéraire en cours...
                  </div>
                )}

                {distance !== null && durationMinutes !== null && (
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-center">
                      <Gauge className="mx-auto text-blue-600" size={24} />
                      <p className="mt-2 text-2xl font-black text-slate-900">{distance} km</p>
                      <p className="text-xs text-slate-500">Distance réelle</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-center">
                      <Timer className="mx-auto text-cyan-600" size={24} />
                      <p className="mt-2 text-2xl font-black text-slate-900">{durationMinutes} min</p>
                      <p className="text-xs text-slate-500">Durée estimée</p>
                    </div>
                  </div>
                )}
              </FormStep>

              <FormStep number="3" title="Date, heure et train">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Date du trajet *" icon={<Calendar size={15} />}>
                    <input
                      type="date"
                      name="date_trajet"
                      value={formData.date_trajet}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Heure de prise en charge *" icon={<Clock size={15} />}>
                    <input
                      type="time"
                      name="heure_trajet"
                      value={formData.heure_trajet}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Numéro de train">
                      <input
                        type="text"
                        name="numero_train"
                        value={formData.numero_train}
                        onChange={handleChange}
                        placeholder="Ex : TGV 6123"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              </FormStep>

              <FormStep number="4" title="Passagers & bagages">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nombre de passagers *" icon={<Users size={15} />}>
                    <input
                      type="number"
                      name="nombre_passagers"
                      value={formData.nombre_passagers}
                      onChange={handleChange}
                      required
                      min="1"
                      max="8"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Nombre de bagages *" icon={<Luggage size={15} />}>
                    <input
                      type="number"
                      name="nombre_bagages"
                      value={formData.nombre_bagages}
                      onChange={handleChange}
                      required
                      min="0"
                      max="10"
                      className={inputClass}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Informations supplémentaires">
                      <textarea
                        name="informations_supplementaires"
                        value={formData.informations_supplementaires}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Demandes particulières, besoins spéciaux..."
                        className={inputClass + ' min-h-[120px] resize-y'}
                      />
                    </Field>
                  </div>
                </div>
              </FormStep>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-4 font-black text-white shadow-lg shadow-blue-200 transition hover:from-blue-800 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Confirmer la réservation'}
              </button>
            </form>

            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
                <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Avant de réserver</p>
                <h3 className="mt-2 text-xl font-black tracking-tight text-slate-900">Tout est prévu pour simplifier votre trajet</h3>
                <div className="mt-5 space-y-3">
                  {[
                    ['1', 'Adresses validées', 'Départ et arrivée avec autocomplétion'],
                    ['2', 'Distance calculée', 'Kilomètres et durée estimée'],
                    ['3', 'Confirmation', 'Enregistrement et notification après validation'],
                  ].map(([number, title, text]) => (
                    <div key={number} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-black text-blue-700">{number}</span>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-slate-500">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="font-black text-emerald-950">Besoin d'aide ?</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-800">
                  Notre équipe est disponible 24h/24 pour répondre à vos questions.
                </p>
                <div className="mt-4 grid gap-2">
                  <a href="tel:+33650366491" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-700">
                    <Phone size={17} />
                    06 50 36 64 91
                  </a>
                  <a href="mailto:contact@taxisparis-conventionnes.fr" className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 py-3 font-bold text-emerald-700 transition hover:bg-emerald-100">
                    <Mail size={17} />
                    Email
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100';

function FormStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7 border-b border-slate-100 pb-7 last:mb-0 last:border-b-0">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-sm font-black text-blue-700">{number}</span>
        <h3 className="text-lg font-black text-slate-900">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-sm font-bold text-slate-700">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function FareRow({
  label,
  sublabel,
  price,
  tone,
}: {
  label: string;
  sublabel: string;
  price: string;
  tone: 'green' | 'orange';
}) {
  const accent = tone === 'green' ? 'text-emerald-600' : 'text-orange-600';

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4">
      <div className="flex items-center gap-3">
        <Plane className={accent} size={22} />
        <div>
          <p className="font-bold text-slate-900">{label}</p>
          <p className="text-xs text-slate-500">{sublabel}</p>
        </div>
      </div>
      <p className={'text-2xl font-black ' + accent}>{price}</p>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
