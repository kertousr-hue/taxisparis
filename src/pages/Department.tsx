import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Shield,
  Stethoscope,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { departmentsSEO, generateBreadcrumbList, generateJsonLD } from '../utils/seoData';
import citiesData from '../data/cities.json';

interface DepartmentPageProps {
  department: string;
  onNavigate: (page: string) => void;
}

interface City {
  name: string;
  postalCode: string;
  slug: string;
}

interface DepartmentData {
  code: string;
  name: string;
  slug: string;
  cities: City[];
}

const services = [
  'Transport vers hôpitaux et cliniques',
  'Consultations médicales spécialisées',
  'Dialyse et chimiothérapie',
  'Transport ALD (Affections Longue Durée)',
  'Chirurgie ambulatoire',
  'Radiothérapie et traitements',
];

const PREPOSITION: Record<string, string> = {
  '75': 'à',
  '91': 'en',
  '92': 'dans les',
  '93': 'en',
  '94': 'dans le',
};

const DEPARTMENT_ACCENT: Record<string, { primary: string; soft: string; glow: string }> = {
  '75': { primary: '#0f64d8', soft: '#e9f3ff', glow: 'rgba(15,100,216,.22)' },
  '91': { primary: '#0f9b8e', soft: '#eafbf8', glow: 'rgba(15,155,142,.2)' },
  '92': { primary: '#1677c8', soft: '#edf7ff', glow: 'rgba(22,119,200,.2)' },
  '93': { primary: '#3855c9', soft: '#eef0ff', glow: 'rgba(56,85,201,.2)' },
  '94': { primary: '#0d8fb4', soft: '#ebf9fd', glow: 'rgba(13,143,180,.2)' },
};

export default function DepartmentPage({ department, onNavigate: _onNavigate }: DepartmentPageProps) {
  const deptData = citiesData.departments.find((item) => item.code === department) as DepartmentData | undefined;
  const seo = departmentsSEO[department];

  if (!deptData || !seo) {
    return (
      <div className="bg-slate-50 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-black text-slate-900">Département non trouvé</h1>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-700 px-6 py-3 font-extrabold text-white transition hover:bg-blue-800"
          >
            Retour à l'accueil <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  const accent = DEPARTMENT_ACCENT[department] || DEPARTMENT_ACCENT['75'];
  const prep = PREPOSITION[department] || 'en';
  const topCities = deptData.cities.slice(0, 12);
  const remainingCities = deptData.cities.slice(12);

  const jsonLD = [
    generateJsonLD(department),
    generateBreadcrumbList([
      { name: 'Accueil', url: '/' },
      { name: `Taxi VSL ${deptData.name}`, url: `/${deptData.slug}` },
    ]),
  ];

  return (
    <div className="refonte-department department-redesign bg-white">
      <SEOHead
        title={seo.metaTitle}
        description={seo.metaDescription}
        keywords={seo.keywords}
        jsonLD={jsonLD}
      />

      <section
        className="relative overflow-hidden border-b border-slate-100"
        style={{
          background:
            'radial-gradient(circle at 16% 18%, rgba(255,255,255,.18), transparent 24%), linear-gradient(135deg, #073a81 0%, #0b56bd 48%, #0e78c9 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-25"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.35) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div
          className="absolute -right-28 -top-24 h-96 w-96 rounded-full blur-3xl"
          aria-hidden="true"
          style={{ background: accent.glow }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.06fr_.94fr] lg:px-8 lg:py-20">
          <div className="text-white">
            <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-bold text-blue-100 sm:text-sm">
              <Link to="/" className="transition hover:text-white">Accueil</Link>
              <span aria-hidden="true">/</span>
              <Link to="/zones-desservies" className="transition hover:text-white">Zones desservies</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">{deptData.name} ({department})</span>
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              {seo.h1}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-blue-50 sm:text-lg sm:leading-8">
              {seo.metaDescription}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/reservation-taxi-vsl"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-extrabold text-blue-800 shadow-[0_14px_34px_rgba(15,23,42,.22)] transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                <Calendar size={19} aria-hidden="true" />
                Réserver maintenant
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a
                href="tel:+33650366491"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/35 bg-white/10 px-6 py-3.5 font-extrabold text-white backdrop-blur-sm transition hover:bg-white hover:text-blue-800"
              >
                <Phone size={19} aria-hidden="true" />
                06 50 36 64 91
              </a>
            </div>

            <div className="mt-7 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                ['Conventionné CPAM', 'Prise en charge selon conditions'],
                ['Disponible 24h/24', '7j/7, jours fériés inclus'],
                ['Porte à porte', `${deptData.cities.length} zones locales`],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 backdrop-blur-md">
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-blue-100">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-white/10 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.09] p-6 shadow-[0_30px_80px_rgba(15,23,42,.24)] backdrop-blur-md sm:p-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">Zone desservie</p>
                  <p className="mt-2 text-3xl font-black text-white">{deptData.name}</p>
                  <p className="mt-1 text-sm text-blue-100">Département {department}</p>
                </div>
                <span
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl text-2xl font-black text-white shadow-lg"
                  style={{ background: accent.primary }}
                >
                  {department}
                </span>
              </div>

              <div className="mt-7 rounded-3xl bg-white p-5 text-slate-900 shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: accent.soft, color: accent.primary }}>
                    <Navigation size={21} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-black">Transport médical de proximité</p>
                    <p className="text-xs text-slate-500">Depuis votre domicile vers vos soins</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-2xl font-black text-slate-950">{deptData.cities.length}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">villes / secteurs</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-2xl font-black text-slate-950">24/7</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">disponibilité</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                  <CheckCircle size={17} aria-hidden="true" />
                  Taxi conventionné CPAM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-1 bg-slate-50/80 py-8 sm:py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: Shield, title: 'Conventionné CPAM', text: 'Prise en charge possible sur prescription médicale', color: '#0f64d8', bg: '#e9f3ff' },
            { icon: Clock, title: 'Disponible 24h/24', text: '7j/7, week-ends et jours fériés compris', color: '#e07b12', bg: '#fff4e8' },
            { icon: MapPin, title: 'Porte à porte', text: 'Prise en charge depuis votre domicile', color: '#12966e', bg: '#eafaf4' },
          ].map(({ icon: Icon, title, text, color, bg }) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,.06)]">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: bg, color }}>
                  <Icon size={23} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-base font-black text-slate-950">{title}</h2>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,.07)] sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: accent.soft, color: accent.primary }}>
                  <FileText size={21} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Votre transport</p>
                  <h2 className="mt-1 text-2xl font-black tracking-[-0.02em] text-slate-950">
                    Transport médical conventionné CPAM {prep} {deptData.name}
                  </h2>
                </div>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-700">{seo.uniqueParagraph}</p>

              <div className="mt-6 space-y-4 text-[15px] leading-7 text-slate-600">
                {seo.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>

            <aside className="space-y-5">
              <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white">
                  <Shield size={23} aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-950">Prise en charge Assurance Maladie</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Le remboursement dépend de votre prescription et de votre situation. Certaines prises en charge peuvent être remboursées à 100 % selon les conditions prévues.
                </p>
                <a
                  href="https://www.ameli.fr/assure/remboursements/rembourse/frais-transport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 hover:text-blue-900"
                >
                  Conditions officielles sur ameli.fr <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-lg">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Réservation rapide</p>
                <p className="mt-3 text-2xl font-black">Besoin d’un taxi conventionné ?</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Notre équipe organise votre trajet médical 24h/24 et 7j/7.</p>
                <Link
                  to="/reservation-taxi-vsl"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-extrabold text-slate-950 transition hover:bg-cyan-50"
                >
                  <Calendar size={17} aria-hidden="true" /> Réserver en ligne
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-white">
                <Building2 size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Santé</p>
                <h2 className="text-xl font-black text-slate-950">Établissements fréquemment desservis</h2>
              </div>
            </div>
            <ul className="mt-6 grid gap-3">
              {seo.hospitals.map((hospital) => (
                <li key={hospital} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-700">
                  <CheckCircle className="mt-0.5 shrink-0 text-emerald-500" size={17} aria-hidden="true" />
                  {hospital}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                <Stethoscope size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Prestations</p>
                <h2 className="text-xl font-black text-slate-950">Nos services de transport médical</h2>
              </div>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service} className="flex items-start gap-3 rounded-2xl bg-emerald-50/60 px-4 py-3 text-sm font-semibold leading-6 text-slate-700">
                  <CheckCircle className="mt-0.5 shrink-0 text-emerald-500" size={17} aria-hidden="true" />
                  {service}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-orange-600">Accès aux soins</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.02em] text-slate-950">{seo.accessTitle}</h2>
              </div>
              <MapPin className="hidden text-orange-200 sm:block" size={44} aria-hidden="true" />
            </div>

            <ol className="mt-7 grid gap-4 md:grid-cols-3">
              {seo.accessPoints.map((point, index) => (
                <li key={point} className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="mt-4 text-sm leading-6 text-slate-700">{point}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em]" style={{ color: accent.primary }}>Votre secteur</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950">
                Villes desservies {prep} {deptData.name} ({department})
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Sélectionnez votre ville pour consulter la page locale et les informations de prise en charge.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm">
              <span className="text-slate-950">{deptData.cities.length}</span> villes / secteurs
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                to={`/${deptData.slug}/${city.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: accent.soft, color: accent.primary }}>
                    <MapPin size={15} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-extrabold text-slate-900">{city.name}</span>
                    <span className="block text-xs text-slate-400">{city.postalCode}</span>
                  </span>
                </span>
                <ArrowRight size={15} className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" aria-hidden="true" />
              </Link>
            ))}
          </div>

          {remainingCities.length > 0 ? (
            <details className="group mt-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-2 py-1 font-extrabold text-slate-900">
                <span>Voir toutes les autres villes ({remainingCities.length})</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-blue-700 transition group-open:rotate-180">
                  <ChevronDown size={17} aria-hidden="true" />
                </span>
              </summary>
              <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {remainingCities.map((city) => (
                  <Link
                    key={city.slug}
                    to={`/${deptData.slug}/${city.slug}`}
                    className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800"
                  >
                    <MapPin size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
                    <span className="truncate">{city.name}</span>
                  </Link>
                ))}
              </div>
            </details>
          ) : null}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">Questions fréquentes</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950">
              Taxi conventionné {prep} {deptData.name}
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Les réponses aux principales questions concernant votre transport médical conventionné.
            </p>
            <Link to="/faq" className="mt-6 inline-flex items-center gap-2 font-extrabold text-blue-700 hover:text-blue-900">
              Voir toute la FAQ <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="space-y-3">
            {seo.faq.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm open:border-blue-200 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-extrabold text-slate-950">
                  <span>{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-blue-700 transition group-open:rotate-180 group-open:bg-blue-50">
                    <ChevronDown size={17} aria-hidden="true" />
                  </span>
                </summary>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {department === '91' ? (
        <section className="border-y border-slate-100 bg-slate-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 px-6 py-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Navigation size={19} aria-hidden="true" />
                </span>
                <h2 className="text-xl font-black text-slate-950">Notre localisation en Essonne</h2>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29813.101969137475!2d2.3407840008219627!3d48.66473972389701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671a730b6ef99%3A0x60e690c6ca8686ce!2zdGF4aSB2c2wgY29udmVudGlvbm7DqSBhZ3LDqcOpIHPDqWN1cml0w6kgc29jaWFsZQ!5e0!3m2!1sfr!2sfr!4v1776620517246!5m2!1sfr!2sfr"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Google Maps - Taxi VSL Conventionné Essonne"
              />
            </div>
          </div>
        </section>
      ) : null}

      {department === '94' ? (
        <section className="border-y border-slate-100 bg-slate-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 px-6 py-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <Navigation size={19} aria-hidden="true" />
                </span>
                <h2 className="text-xl font-black text-slate-950">Notre localisation dans le Val-de-Marne</h2>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d168280.9689252091!2d2.297381289452775!3d48.77444161404638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67b94662e87b3%3A0x35f4c18f7871832e!2staxi%20%26%20vsl%20conventionn%C3%A9!5e0!3m2!1sfr!2sfr!4v1764499643238!5m2!1sfr!2sfr"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Google Maps - Taxi VSL Conventionné Val-de-Marne"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Départements voisins</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">Besoin d’un autre secteur en Île-de-France ?</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {citiesData.departments
                  .filter((item) => item.code !== department)
                  .map((dept) => (
                    <Link
                      key={dept.code}
                      to={`/${dept.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                    >
                      {dept.name} ({dept.code}) <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#064e8a_0%,#0756b6_48%,#0f9f9a_100%)] px-6 py-8 text-white shadow-[0_24px_65px_rgba(3,105,161,.22)] sm:px-9 sm:py-9">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-cyan-100">Disponible 24h/24 · 7j/7</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
                Besoin d’un transport médical {prep} {deptData.name} ?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50">
                Réservez dès maintenant votre taxi conventionné CPAM. Notre équipe vous accompagne pour organiser votre trajet médical.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Link
                to="/reservation-taxi-vsl"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-extrabold text-blue-800 shadow-lg transition hover:bg-blue-50"
              >
                <Calendar size={18} aria-hidden="true" /> Réserver en ligne
              </Link>
              <a
                href="tel:+33650366491"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 font-extrabold text-emerald-950 shadow-lg transition hover:bg-emerald-300"
              >
                <Phone size={18} aria-hidden="true" /> 06 50 36 64 91
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: Phone, title: 'Téléphone', value: '06 50 36 64 91', href: 'tel:+33650366491' },
            { icon: Mail, title: 'Email', value: 'contact@taxisparis-conventionnes.fr', href: 'mailto:contact@taxisparis-conventionnes.fr' },
            { icon: Building2, title: 'Zone', value: `${deptData.name} (${department})`, href: null },
          ].map(({ icon: Icon, title, value, href }) => {
            const body = (
              <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{title}</p>
                  <p className="truncate text-sm font-extrabold text-slate-900">{value}</p>
                </div>
              </div>
            );

            return href ? (
              <a key={title} href={href} className="transition hover:-translate-y-0.5">{body}</a>
            ) : (
              <div key={title}>{body}</div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
