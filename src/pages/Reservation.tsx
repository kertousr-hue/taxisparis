import { useState, useEffect, useRef } from 'react';
import {
  Calendar, Clock, Phone, Mail, User, CheckCircle, Car,
  Gauge, Timer, MessageSquare, MapPin, Shield, Star,
  ChevronDown, ChevronUp, AlertCircle, Armchair, RefreshCw,
  ClipboardList, FileText, ArrowRight,
} from 'lucide-react';
import { type Reservation, supabase } from '../lib/supabase';
import AutocompleteInput from '../components/AutocompleteInput';
import { calculateRoute } from '../utils/here';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';

const DEPARTMENTS = [
  { label: 'Paris (75)', href: '/taxi-conventionne-paris-75' },
  { label: 'Essonne (91)', href: '/taxi-conventionne-essonne-91' },
  { label: 'Hauts-de-Seine (92)', href: '/taxi-conventionne-hauts-de-seine-92' },
  { label: 'Seine-Saint-Denis (93)', href: '/taxi-conventionne-seine-saint-denis-93' },
  { label: 'Val-de-Marne (94)', href: '/taxi-conventionne-val-de-marne-94' },
];

const SITE_URL = 'https://www.taxisparis-conventionnes.fr';
const RESERVATION_URL = `${SITE_URL}/reservation-taxi-vsl`;
const SEO_KEYWORDS = [
  'réservation taxi conventionné',
  'taxi conventionné CPAM',
  'réserver VSL CPAM',
  'taxi VSL Paris',
  'taxi VSL Île-de-France',
  'transport médical assis',
  'transport médical CPAM',
  'taxi hôpital Paris',
  'taxi conventionné hôpital',
  'bon de transport CPAM',
  'prescription médicale transport',
  'remboursement taxi conventionné',
  'taxi conventionné ALD',
  'transport dialyse',
  'taxi chimiothérapie',
  'taxi radiothérapie',
  'taxi sortie hospitalisation',
  'taxi conventionné 75',
  'taxi conventionné 91',
  'taxi conventionné 92',
  'taxi conventionné 93',
  'taxi conventionné 94',
];

const FAQ_ITEMS = [
  {
    question: 'Comment réserver un taxi conventionné VSL ?',
    answer: "Remplissez le formulaire avec vos coordonnées, les adresses de départ et d'arrivée, la date et l'heure souhaitées. La demande est ensuite confirmée par téléphone pour valider le trajet médical.",
  },
  {
    question: 'Le transport est-il remboursé par la CPAM ?',
    answer: "Oui, si le transport est prescrit par un médecin et que votre situation ouvre droit à une prise en charge. Le remboursement peut être partiel ou total selon l'ALD, la CSS, l'accord préalable ou le motif médical.",
  },
  {
    question: 'Faut-il une prescription médicale ?',
    answer: "Oui, une prescription médicale de transport, souvent appelée bon de transport, est nécessaire pour une prise en charge CPAM. Sans prescription, le trajet reste possible mais il n'est pas remboursé par l'Assurance Maladie.",
  },
  {
    question: 'Quels départements sont couverts ?',
    answer: "Le service couvre Paris (75), l'Essonne (91), les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94) pour les consultations, dialyses, chimiothérapies, radiothérapies et hospitalisations.",
  },
  {
    question: 'Quel est le délai de confirmation ?',
    answer: "La demande en ligne est traitée rapidement. Pour un rendez-vous médical programmé, il est préférable de réserver au moins 24 heures à l'avance. Pour une réponse immédiate, appelez le 06 50 36 64 91.",
  },
];

type SituationALD = 'ald_exonerante' | 'cmu' | 'pas_ald';
type BonTransport = 'deja_etabli' | 'a_etablir' | 'sans_bon';

type FieldErrors = {
  adresse_depart?: string;
  adresse_arrivee?: string;
  fauteuil_roulant?: string;
  type_trajet?: string;

  type_prise_en_charge?: string;
  situation_ald?: string;
  bon_transport?: string;
};

/* ─── Sub-components ─── */

function StepBadge({ n, color }: { n: number; color: string }) {
  return (
    <span className={`flex-shrink-0 w-6 h-6 rounded-full ${color} text-white text-xs font-bold flex items-center justify-center`}>
      {n}
    </span>
  );
}

function SectionCard({ step, stepColor, icon, iconBg, title, children }: {
  step: number; stepColor: string; icon: React.ReactNode; iconBg: string;
  title: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className={`flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-gray-100 rounded-t-2xl ${iconBg}`}>
        <StepBadge n={step} color={stepColor} />
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-bold text-gray-800 text-sm sm:text-base">{title}</h2>
        </div>
      </div>
      <div className="px-4 sm:px-5 py-4 sm:py-5">{children}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{children}</p>
  );
}

function TextInput({ id, name, type = 'text', value, onChange, required, placeholder, hasError }: {
  id: string; name: string; type?: string; value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>; required?: boolean;
  placeholder?: string; hasError?: boolean;
}) {
  return (
    <input
      type={type} id={id} name={name} value={value ?? ''} onChange={onChange}
      required={required} placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        ${hasError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
    />
  );
}

function ErrorMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1"><AlertCircle size={11} />{msg}</p>;
}

function RadioPill({ name, value, checked, onChange, label, sublabel, required }: {
  name: string; value: string; checked: boolean; onChange: () => void;
  label: string; sublabel?: string; required?: boolean;
}) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl border-2 transition-all duration-150 select-none active:scale-[0.98]
      ${checked ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/30'}`}>
      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
        ${checked ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'}`}>
        {checked && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} required={required} className="sr-only" />
      <div className="flex-1 min-w-0">
        <span className={`block text-sm font-semibold leading-tight ${checked ? 'text-blue-800' : 'text-gray-700'}`}>{label}</span>
        {sublabel && <span className="block text-xs text-gray-400 mt-0.5 leading-tight">{sublabel}</span>}
      </div>
      {checked && <CheckCircle size={15} className="text-blue-500 flex-shrink-0" />}
    </label>
  );
}

/* ─── Page ─── */

export default function ReservationPage() {
  const [formData, setFormData] = useState<Partial<Reservation>>({
    nom: '', prenom: '', telephone: '', email: '',
    adresse_depart: '', adresse_arrivee: '',
    date_rdv: '', heure_rdv: '', informations_supplementaires: '',
  });

  const [fauteuilRoulant, setFauteuilRoulant] = useState<boolean | null>(null);
  const [typeTrajet, setTypeTrajet] = useState<'aller_simple' | 'aller_retour' | null>(null);

  const [typePriseEnCharge, setTypePriseEnCharge] = useState<string | null>(null);
  const [situationALD, setSituationALD] = useState<SituationALD | null>(null);
  const [bonTransport, setBonTransport] = useState<BonTransport | null>(null);

  const [distance, setDistance] = useState<number | null>(null);
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [coordsDepart, setCoordsDepart] = useState<{ lat: number; lng: number } | null>(null);
  const [coordsArrivee, setCoordsArrivee] = useState<{ lat: number; lng: number } | null>(null);

  const apiKey = import.meta.env.VITE_HERE_API_KEY;

  useEffect(() => {
    if (!submitSuccess) return;
    const el = successRef.current;
    if (!el) return;
    const id = setTimeout(() => {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 120);
    return () => clearTimeout(id);
  }, [submitSuccess]);

  useEffect(() => {
    if (!coordsDepart || !coordsArrivee) return;
    const id = setTimeout(async () => {
      setIsCalculating(true);
      try {
        const result = await calculateRoute(
          coordsDepart.lat, coordsDepart.lng,
          coordsArrivee.lat, coordsArrivee.lng,
          apiKey, formData.date_rdv, formData.heure_rdv,
        );
        if (result) { setDistance(result.distance_km); setDurationMinutes(result.duree_minutes); }
      } catch { /* silent */ } finally { setIsCalculating(false); }
    }, 500);
    return () => clearTimeout(id);
  }, [coordsDepart, coordsArrivee, apiKey, formData.date_rdv, formData.heure_rdv]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearErr = (k: keyof FieldErrors) => setFieldErrors(prev => ({ ...prev, [k]: undefined }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const errs: FieldErrors = {};
    if (!formData.adresse_depart || formData.adresse_depart.trim().length < 5)
      errs.adresse_depart = 'Veuillez renseigner l\'adresse de départ';
    else if (!coordsDepart)
      errs.adresse_depart = 'Sélectionnez une adresse dans les suggestions';
    if (!formData.adresse_arrivee || formData.adresse_arrivee.trim().length < 5)
      errs.adresse_arrivee = 'Veuillez renseigner l\'adresse d\'arrivée';
    else if (!coordsArrivee)
      errs.adresse_arrivee = 'Sélectionnez une adresse dans les suggestions';
    if (fauteuilRoulant === null) errs.fauteuil_roulant = 'Veuillez indiquer si le patient est en fauteuil roulant';
    if (!typeTrajet) errs.type_trajet = 'Veuillez choisir le type de trajet (aller simple ou aller-retour)';

    if (!typePriseEnCharge) errs.type_prise_en_charge = 'Veuillez sélectionner le type de prise en charge';
    if (!situationALD) errs.situation_ald = 'Veuillez indiquer votre situation ALD / CMU';
    if (!bonTransport) errs.bon_transport = 'Veuillez indiquer l\'état de votre bon de transport';

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setIsSubmitting(false);
      const firstErrorKey = Object.keys(errs)[0];
      const fieldIdMap: Record<string, string> = {
        adresse_depart: 'field-adresse_depart',
        adresse_arrivee: 'field-adresse_arrivee',
        fauteuil_roulant: 'field-fauteuil_roulant',
        type_trajet: 'field-type_trajet',
        type_prise_en_charge: 'field-type_prise_en_charge',
        situation_ald: 'field-situation_ald',
        bon_transport: 'field-bon_transport',
      };
      const targetId = fieldIdMap[firstErrorKey] || 'form-error-summary';
      setTimeout(() => {
        const el = document.getElementById(targetId) || document.getElementById('form-error-summary');
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }
    setFieldErrors({});

    try {
      const emailData = {
        nom: formData.nom, prenom: formData.prenom,
        telephone: formData.telephone, email: formData.email,
        adresse_depart: formData.adresse_depart, adresse_arrivee: formData.adresse_arrivee,
        date_rdv: formData.date_rdv, heure_rdv: formData.heure_rdv,
        ald_cmu: situationALD !== 'pas_ald',
        prescription_medicale: bonTransport === 'deja_etabli',
        numero_vol: '', numero_train: '', nombre_passagers: 1, nombre_bagages: 0,
        distance_km: distance || 0, duree_min: durationMinutes || 0,
        message: [
          `Fauteuil roulant: ${fauteuilRoulant ? 'Oui' : 'Non'}`,
          `Type trajet: ${typeTrajet}`,
          `Prise en charge: ${typePriseEnCharge}`,
          `ALD: ${situationALD}`, `Bon transport: ${bonTransport}`,
          formData.informations_supplementaires ? `Note: ${formData.informations_supplementaires}` : '',
        ].filter(Boolean).join(' | '),
        type_trajet: 'vsl',
      };

      const supabaseUrl = (supabase as any).supabaseUrl || import.meta.env.VITE_SUPABASE_URL || 'https://qwsgtmzpirrbnmcbdvue.supabase.co';
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYXNlIiwicmVmIjoicXdzZ3RtenBpcnJibm1jYmR2dWUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc4MDI0NTMyNCwiZXhwIjoyMDk1ODIxMzI0fQ.RFb45xZjY3pDV4QWgr9-ASta84bX09fIcbv7ZZlY_mk';
      const fetchUrl = `${supabaseUrl}/functions/v1/send-reservation-email`;
      const resp = await fetch(fetchUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${supabaseKey}` },
        body: JSON.stringify(emailData),
      });
      const rawBody = await resp.text();
      if (!resp.ok) {
        let errMsg = `Erreur HTTP ${resp.status}`;
        try {
          const errBody = JSON.parse(rawBody);
          errMsg = errBody.error || errBody.message || errMsg;
        } catch {
          if (rawBody) errMsg = rawBody;
        }
        throw new Error(errMsg);
      }

      setSubmitSuccess(true);
      setFormData({ nom: '', prenom: '', telephone: '', email: '', adresse_depart: '', adresse_arrivee: '', date_rdv: '', heure_rdv: '', informations_supplementaires: '' });
      setDistance(null); setDurationMinutes(null); setCoordsDepart(null); setCoordsArrivee(null);
      setFauteuilRoulant(null); setTypeTrajet(null);
      setTypePriseEnCharge(null); setSituationALD(null); setBonTransport(null);
      setTimeout(() => setSubmitSuccess(false), 7000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reservationDescription = 'Réservez un taxi conventionné VSL CPAM en Île-de-France. Transport médical assis 24h/24 pour hôpital, dialyse, chimio, radio, ALD et bon de transport.';
  const webPageLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Réservation Taxi Conventionné VSL CPAM | 24h/24 IDF",
    "description": reservationDescription,
    "url": RESERVATION_URL,
    "inLanguage": "fr-FR",
    "keywords": SEO_KEYWORDS.join(', '),
    "isPartOf": { "@type": "WebSite", "name": "Taxis Paris Conventionnés", "url": `${SITE_URL}/` },
  };
  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": `${SITE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Réservation taxi conventionné VSL", "item": RESERVATION_URL },
    ],
  };
  const faqLD = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQ_ITEMS.map(i => ({ "@type": "Question", "name": i.question, "acceptedAnswer": { "@type": "Answer", "text": i.answer } })) };
  const serviceLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Réservation de taxi conventionné VSL CPAM",
    "description": reservationDescription,
    "keywords": SEO_KEYWORDS.join(', '),
    "serviceType": "Transport médical assis conventionné CPAM",
    "url": RESERVATION_URL,
    "telephone": "+33650366491",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Taxis Paris Conventionnés",
      "url": `${SITE_URL}/`,
      "telephone": "+33650366491",
    },
    "areaServed": DEPARTMENTS.map(dep => ({ "@type": "AdministrativeArea", "name": dep.label })),
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": RESERVATION_URL,
      "servicePhone": { "@type": "ContactPoint", "telephone": "+33650366491", "contactType": "Réservation" },
    },
  };

  const hasErrors = Object.keys(fieldErrors).length > 0 || !!error;

  return (
    <>
      <SEOHead
        title="Réservation Taxi Conventionné VSL CPAM | 24h/24 IDF"
        description={reservationDescription}
        keywords={SEO_KEYWORDS}
        canonical={RESERVATION_URL}
        jsonLD={[webPageLD, breadcrumbLD, faqLD, serviceLD]}
      />

      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-40 bg-blue-700 text-white py-2.5 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between gap-3 text-sm">
          <span className="font-medium hidden sm:block">Confirmation rapide par téléphone</span>
          <a href="tel:+33650366491"
            className="flex items-center gap-2 bg-white text-blue-700 font-bold px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors text-xs sm:text-sm mx-auto sm:mx-0">
            <Phone size={14} /> 06 50 36 64 91
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-b from-blue-50 via-white to-gray-50 min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-10">
          <div className="max-w-2xl mx-auto">

            {/* ── Hero ── */}
            <div className="text-center mb-6 sm:mb-8 px-1">
              <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                <Shield size={12} /> Transport remboursé CPAM
              </div>
              <h1 id="page-title" className="text-xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-2">
                Réservation taxi conventionné VSL CPAM
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
                Réservez votre taxi conventionné ou VSL pour un transport médical assis en Île-de-France. Service 24h/24 pour les rendez-vous médicaux, avec prise en charge CPAM possible sur prescription.
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-yellow-400" />)}
                  <span className="text-gray-500 ml-1">Patients Île-de-France</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={11} /><span className="text-gray-500">Chauffeurs agréés CPAM</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
              <div className="bg-white border border-blue-100 rounded-2xl p-3 text-center shadow-sm">
                <Clock size={16} className="text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-gray-800">Confirmation rapide</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Demande traitée par téléphone</p>
              </div>
              <div className="bg-white border border-green-100 rounded-2xl p-3 text-center shadow-sm">
                <Shield size={16} className="text-green-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-gray-800">Conventionné CPAM</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Sur prescription médicale</p>
              </div>
              <div className="bg-white border border-orange-100 rounded-2xl p-3 text-center shadow-sm">
                <MapPin size={16} className="text-orange-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-gray-800">Paris et Île-de-France</p>
                <p className="text-[11px] text-gray-500 mt-0.5">75, 91, 92, 93 et 94</p>
              </div>
            </div>

            {/* ── Success ── */}
            {submitSuccess && (
              <div ref={successRef} role="alert" className="mb-4 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-bold text-green-800 text-sm">Réservation envoyée !</p>
                  <p className="text-green-700 text-xs mt-0.5">Nous vous contacterons rapidement pour confirmer votre transport.</p>
                </div>
              </div>
            )}

            {/* ── Error summary ── */}
            {hasErrors && (
              <div id="form-error-summary" role="alert" className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={16} />
                  <p className="font-bold text-red-800 text-sm">Veuillez corriger les erreurs</p>
                </div>
                <ul className="space-y-1 ml-5">
                  {Object.values(fieldErrors).filter(Boolean).map((msg, i) => (
                    <li key={i} className="text-xs text-red-700 list-disc">{msg}</li>
                  ))}
                  {error && !Object.keys(fieldErrors).length && (
                    <li className="text-xs text-red-700 list-disc">{error}</li>
                  )}
                </ul>
              </div>
            )}

            {/* ══════════ FORM ══════════ */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" aria-labelledby="page-title">

              {/* 1 – Coordonnées */}
              <SectionCard step={1} stepColor="bg-blue-600" icon={<User size={16} className="text-blue-600" />} iconBg="bg-blue-50" title="Vos coordonnées">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Nom *</FieldLabel>
                    <TextInput id="nom" name="nom" value={formData.nom} onChange={handleChange} required placeholder="Nom" />
                  </div>
                  <div>
                    <FieldLabel>Prénom *</FieldLabel>
                    <TextInput id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required placeholder="Prénom" />
                  </div>
                  <div>
                    <FieldLabel>Téléphone *</FieldLabel>
                    <TextInput id="telephone" name="telephone" type="tel" value={formData.telephone} onChange={handleChange} required placeholder="06 12 34 56 78" />
                  </div>
                  <div>
                    <FieldLabel>Email</FieldLabel>
                    <TextInput id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email (facultatif)" />
                  </div>
                </div>
              </SectionCard>

              {/* 2 – Trajet */}
              <SectionCard step={2} stepColor="bg-green-600" icon={<MapPin size={16} className="text-green-600" />} iconBg="bg-green-50" title="Trajet">
                <div className="space-y-3">
                  <div id="field-adresse_depart">
                    <AutocompleteInput
                      label="Adresse de départ" value={formData.adresse_depart || ''}
                      placeholder="Ex : Hôpital Cochin, Paris" required apiKey={apiKey}
                      onAddressSelect={(addr, lat, lng) => { setFormData(p => ({ ...p, adresse_depart: addr })); setCoordsDepart({ lat, lng }); clearErr('adresse_depart'); }}
                      onInputChange={v => { setFormData(p => ({ ...p, adresse_depart: v })); setCoordsDepart(null); clearErr('adresse_depart'); }}
                      isValidated={!!coordsDepart} hasError={!!fieldErrors.adresse_depart}
                    />
                    <ErrorMsg msg={fieldErrors.adresse_depart} />
                  </div>
                  <div id="field-adresse_arrivee">
                    <AutocompleteInput
                      label="Adresse d'arrivée" value={formData.adresse_arrivee || ''}
                      placeholder="Ex : Hôpital Necker, Paris" required apiKey={apiKey}
                      onAddressSelect={(addr, lat, lng) => { setFormData(p => ({ ...p, adresse_arrivee: addr })); setCoordsArrivee({ lat, lng }); clearErr('adresse_arrivee'); }}
                      onInputChange={v => { setFormData(p => ({ ...p, adresse_arrivee: v })); setCoordsArrivee(null); clearErr('adresse_arrivee'); }}
                      isValidated={!!coordsArrivee} hasError={!!fieldErrors.adresse_arrivee}
                    />
                    <ErrorMsg msg={fieldErrors.adresse_arrivee} />
                  </div>

                  {isCalculating && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      Calcul en cours…
                    </div>
                  )}
                  {distance !== null && durationMinutes !== null && !isCalculating && (
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                        <div className="bg-blue-100 p-1.5 rounded-lg"><Gauge size={14} className="text-blue-600" /></div>
                        <div><p className="text-xs text-gray-400">Distance</p><p className="font-bold text-gray-800 text-sm">{distance} km</p></div>
                      </div>
                      <div className="flex items-center gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5">
                        <div className="bg-orange-100 p-1.5 rounded-lg"><Timer size={14} className="text-orange-600" /></div>
                        <div><p className="text-xs text-gray-400">Durée</p><p className="font-bold text-gray-800 text-sm">{durationMinutes} min</p></div>
                      </div>
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* 3 – Date & Heure de prise en charge */}
              <SectionCard step={3} stepColor="bg-blue-600" icon={<Calendar size={16} className="text-blue-600" />} iconBg="bg-blue-50" title="Date & Heure de prise en charge">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Date *</FieldLabel>
                    <TextInput id="date_rdv" name="date_rdv" type="date" value={formData.date_rdv} onChange={handleChange} required />
                  </div>
                  <div>
                    <FieldLabel>Heure de prise en charge *</FieldLabel>
                    <TextInput id="heure_rdv" name="heure_rdv" type="time" value={formData.heure_rdv} onChange={handleChange} required />
                  </div>
                </div>
              </SectionCard>

              {/* 4 – Véhicule & PMR */}
              <SectionCard step={4} stepColor="bg-blue-600" icon={<Car size={16} className="text-blue-600" />} iconBg="bg-blue-50" title="Véhicule & Mobilité">
                {/* Type véhicule – fixed Taxi/VSL */}
                <div className="mb-4">
                  <FieldLabel>Type de véhicule</FieldLabel>
                  <div className="flex items-center gap-3 px-4 py-3 border-2 border-blue-400 bg-blue-50 rounded-xl">
                    <div className="bg-blue-100 p-1.5 rounded-lg"><Car size={15} className="text-blue-600" /></div>
                    <div className="flex-1">
                      <p className="font-bold text-blue-800 text-sm">Taxi / VSL</p>
                      <p className="text-xs text-blue-500 flex items-center gap-1 mt-0.5"><Armchair size={11} /> Position assise</p>
                    </div>
                    <CheckCircle size={16} className="text-blue-500" />
                  </div>
                </div>

                {/* PMR */}
                <div id="field-fauteuil_roulant">
                  <FieldLabel>Fauteuil roulant (PMR) *</FieldLabel>
                  <div className="grid grid-cols-2 gap-2">
                    <RadioPill name="fauteuil_roulant" value="non" checked={fauteuilRoulant === false}
                      onChange={() => { setFauteuilRoulant(false); clearErr('fauteuil_roulant'); }}
                      label="Non" required />
                    <RadioPill name="fauteuil_roulant" value="oui" checked={fauteuilRoulant === true}
                      onChange={() => { setFauteuilRoulant(true); clearErr('fauteuil_roulant'); }}
                      label="Oui" sublabel="Patient en fauteuil" required />
                  </div>
                  <ErrorMsg msg={fieldErrors.fauteuil_roulant} />
                </div>
              </SectionCard>

              {/* 5 – Type de trajet */}
              <SectionCard step={5} stepColor="bg-teal-600" icon={<RefreshCw size={16} className="text-teal-600" />} iconBg="bg-teal-50" title="Type de trajet">
                <div id="field-type_trajet">
                  <FieldLabel>Type de trajet *</FieldLabel>
                  <div className="grid grid-cols-2 gap-2">
                    <RadioPill name="type_trajet" value="aller_simple" checked={typeTrajet === 'aller_simple'}
                      onChange={() => { setTypeTrajet('aller_simple'); clearErr('type_trajet'); }}
                      label="Aller simple" required />
                    <RadioPill name="type_trajet" value="aller_retour" checked={typeTrajet === 'aller_retour'}
                      onChange={() => { setTypeTrajet('aller_retour'); clearErr('type_trajet'); }}
                      label="Aller-retour" required />
                  </div>
                  <ErrorMsg msg={fieldErrors.type_trajet} />
                </div>
              </SectionCard>

              {/* 6 – Prise en charge */}
              <SectionCard step={7} stepColor="bg-red-500" icon={<ClipboardList size={16} className="text-red-500" />} iconBg="bg-red-50" title="Type de prise en charge">
                <div id="field-type_prise_en_charge" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { value: 'consultation', label: 'Consultation médicale' },
                    { value: 'hospitalisation_complete', label: 'Hospitalisation complète' },
                    { value: 'hospitalisation_partielle', label: 'Hospitalisation partielle' },
                    { value: 'hospitalisation_ambulatoire', label: 'Hospitalisation ambulatoire' },
                    { value: 'chimiotherapie', label: 'Chimiothérapie' },
                    { value: 'radiotherapie', label: 'Radiothérapie' },
                    { value: 'hemodialyse', label: 'Hémodialyse' },
                    { value: 'autre', label: 'Autre motif' },
                  ].map(opt => (
                    <RadioPill key={opt.value} name="type_prise_en_charge" value={opt.value}
                      checked={typePriseEnCharge === opt.value}
                      onChange={() => { setTypePriseEnCharge(opt.value); clearErr('type_prise_en_charge'); }}
                      label={opt.label} required />
                  ))}
                </div>
                <ErrorMsg msg={fieldErrors.type_prise_en_charge} />
              </SectionCard>

              {/* 8 – Situation ALD / CMU */}
              <SectionCard step={8} stepColor="bg-blue-600" icon={<Shield size={16} className="text-blue-600" />} iconBg="bg-blue-50" title="Situation ALD / CMU">
                <div id="field-situation_ald" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <RadioPill name="situation_ald" value="ald_exonerante" checked={situationALD === 'ald_exonerante'}
                    onChange={() => { setSituationALD('ald_exonerante'); clearErr('situation_ald'); }}
                    label="ALD exonérante" sublabel="Prise en charge à 100 %" required />
                  <RadioPill name="situation_ald" value="cmu" checked={situationALD === 'cmu'}
                    onChange={() => { setSituationALD('cmu'); clearErr('situation_ald'); }}
                    label="CMU / CSS" sublabel="Complémentaire santé solidaire" required />
                  <RadioPill name="situation_ald" value="pas_ald" checked={situationALD === 'pas_ald'}
                    onChange={() => { setSituationALD('pas_ald'); clearErr('situation_ald'); }}
                    label="Pas d'ALD / CMU" sublabel="Sans dispositif particulier" required />
                </div>
                {situationALD === 'pas_ald' && (
                  <div role="status" aria-live="polite" className="mt-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                      <p className="leading-relaxed">
                        <strong>Avance des frais requise.</strong> Sans ALD ni CMU, vous devrez avancer <strong>45 %</strong> du montant du transport. La Sécurité sociale prend en charge <strong>55 %</strong>, et votre mutuelle peut rembourser les <strong>45 %</strong> restants selon votre contrat.
                      </p>
                    </div>
                  </div>
                )}
                <ErrorMsg msg={fieldErrors.situation_ald} />
                <p className="mt-3 text-xs text-gray-400 flex items-start gap-1.5">
                  <AlertCircle size={11} className="mt-0.5 flex-shrink-0" />
                  En cas de doute, consultez votre médecin traitant.
                </p>
              </SectionCard>

              {/* 9 – Bon de transport */}
              <SectionCard step={9} stepColor="bg-gray-600" icon={<FileText size={16} className="text-gray-600" />} iconBg="bg-gray-50" title="Bon de transport médical">
                <div id="field-bon_transport" className="space-y-2">
                  <RadioPill name="bon_transport" value="deja_etabli" checked={bonTransport === 'deja_etabli'}
                    onChange={() => { setBonTransport('deja_etabli'); clearErr('bon_transport'); }}
                    label="Déjà établi" sublabel="Votre bon est prêt" required />
                  <RadioPill name="bon_transport" value="a_etablir" checked={bonTransport === 'a_etablir'}
                    onChange={() => { setBonTransport('a_etablir'); clearErr('bon_transport'); }}
                    label="À établir" sublabel="À demander à votre médecin" required />
                  <RadioPill name="bon_transport" value="sans_bon" checked={bonTransport === 'sans_bon'}
                    onChange={() => { setBonTransport('sans_bon'); clearErr('bon_transport'); }}
                    label="Sans bon de transport" sublabel="Transport non remboursé" required />
                </div>
                <ErrorMsg msg={fieldErrors.bon_transport} />
              </SectionCard>

              {/* 10 – Infos sup */}
              <SectionCard step={10} stepColor="bg-gray-500" icon={<MessageSquare size={16} className="text-gray-500" />} iconBg="bg-gray-50" title="Informations complémentaires">
                <textarea
                  name="informations_supplementaires" value={formData.informations_supplementaires}
                  onChange={handleChange} rows={3}
                  placeholder="Accompagnant, accès difficile, besoins spécifiques…"
                  className="w-full px-4 py-3 border border-gray-200 bg-gray-50 focus:bg-white rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </SectionCard>

              {/* ── Submit ── */}
              <div className="pt-1 pb-4">
                <p className="text-center text-xs text-gray-400 mb-3 flex items-center justify-center gap-1">
                  <CheckCircle size={11} className="text-green-500" />
                  Tous les champs sont obligatoires
                </p>
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-4 rounded-2xl font-bold text-base transition-all shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Envoi en cours…</>
                  ) : (
                    <>Confirmer ma réservation <ArrowRight size={18} /></>
                  )}
                </button>
              </div>
            </form>

            {/* ── Contact ── */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-bold text-blue-900 text-sm">Besoin d'une réponse immédiate ?</p>
                  <p className="text-blue-600 text-xs mt-0.5">Disponible 24h/24 – 7j/7</p>
                </div>
                <div className="flex gap-2">
                  <a href="tel:+33650366491" className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-blue-600 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-xs sm:text-sm">
                    <Phone size={13} /> Appeler
                  </a>
                  <a href="mailto:contact@taxisparis-conventionnes.fr" className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-blue-700 border border-blue-300 font-medium px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors text-xs sm:text-sm">
                    <Mail size={13} /> Email
                  </a>
                </div>
              </div>
            </div>

            {/* ── SEO content ── */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
                Réserver un taxi conventionné VSL en Île-de-France
              </h2>
              <div className="space-y-5 text-gray-600 text-sm leading-relaxed">
                <p>
                  Cette page permet de demander une <strong>réservation de taxi conventionné VSL</strong> pour un transport médical assis vers un hôpital, une clinique, un cabinet médical ou un centre de soins. Le service intervient à Paris et dans les départements proches pour les trajets programmés, les sorties d'hospitalisation et les rendez-vous réguliers.
                </p>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Pour quels trajets médicaux ?</h3>
                  <p>
                    Les réservations concernent notamment les consultations spécialisées, la dialyse, la chimiothérapie, la radiothérapie, les hospitalisations de jour, les soins de suite et les contrôles médicaux. Chaque demande est vérifiée afin d'organiser un horaire de prise en charge cohérent avec votre rendez-vous.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Documents à préparer pour la prise en charge CPAM</h3>
                  <ul className="space-y-1.5">
                    {[
                      "Prescription médicale de transport ou bon de transport établi par le médecin",
                      "Carte Vitale, attestation de droits ou justificatif CSS selon votre situation",
                      "Coordonnées complètes du lieu de départ, du lieu d'arrivée et de l'heure du rendez-vous",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={13} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Recherches fréquentes couvertes</h3>
                  <p>
                    Le service répond aux demandes de <strong>taxi conventionné CPAM</strong>, <strong>taxi VSL Paris</strong>, <strong>transport médical assis</strong>, <strong>bon de transport CPAM</strong>, <strong>remboursement taxi conventionné</strong>, transport pour ALD, dialyse, chimiothérapie, radiothérapie, sortie d'hospitalisation et rendez-vous en hôpital ou clinique.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Zones couvertes autour de Paris</h3>
                  <p>
                    Les demandes sont possibles sur Paris (75), l'Essonne (91), les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94). Les trajets peuvent être organisés vers les principaux hôpitaux d'Île-de-France, selon les disponibilités et l'horaire médical demandé.
                  </p>
                </div>
                <nav aria-label="Départements desservis" className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {DEPARTMENTS.map(dep => (
                    <Link key={dep.href} to={dep.href}
                      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl px-3 py-2.5 text-blue-700 font-semibold text-xs transition-colors">
                      <MapPin size={12} /> Taxi – {dep.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Questions fréquentes</h2>
              <div className="space-y-2">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
                      aria-expanded={openFaq === i}>
                      <span className="font-semibold text-gray-800 text-sm">{item.question}</span>
                      {openFaq === i
                        ? <ChevronUp size={15} className="text-blue-600 flex-shrink-0" />
                        : <ChevronDown size={15} className="text-gray-400 flex-shrink-0" />}
                    </button>
                    <div className={`px-4 pb-4 text-gray-600 text-xs leading-relaxed border-t border-gray-100 ${openFaq === i ? 'block' : 'hidden'}`}>
                      <p className="mt-3">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── CTA final ── */}
            <div className="bg-blue-700 text-white rounded-2xl p-5 sm:p-8 text-center">
              <h2 className="text-lg sm:text-xl font-bold mb-1.5">Prêt à réserver ?</h2>
              <p className="text-blue-100 mb-4 text-xs sm:text-sm">Service 24h/24 – 7j/7 en Île-de-France.</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a href="tel:+33650366491"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                  <Phone size={15} /> 06 50 36 64 91
                </a>
                <button type="button"
                  onClick={() => document.getElementById('page-title')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-5 py-3 rounded-xl hover:bg-blue-600 transition-colors text-sm">
                  Remplir le formulaire
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
