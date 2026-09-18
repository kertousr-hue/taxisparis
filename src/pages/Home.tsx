import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Calendar,
  Car,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  HeartPulse,
  Hospital,
  MapPin,
  Microscope,
  Phone,
  Shield,
  Star,
  Stethoscope,
  Users,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { generateJsonLD } from '../utils/seoData';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const benefits = [
  {
    icon: Car,
    title: 'Taxi conventionné',
    text: 'Transport médical assis agréé CPAM pour vos rendez-vous de santé.',
  },
  {
    icon: FileText,
    title: 'Prise en charge CPAM',
    text: 'Tiers payant disponible selon votre situation et votre prescription.',
  },
  {
    icon: Clock,
    title: 'Disponible 24/7',
    text: 'À votre service jour et nuit, week-ends et jours fériés inclus.',
  },
  {
    icon: Users,
    title: 'Chauffeurs formés',
    text: 'Des professionnels ponctuels, attentifs et habitués aux trajets médicaux.',
  },
];

const services = [
  {
    icon: Stethoscope,
    title: 'Consultations médicales',
    text: 'Médecins, spécialistes, centres de santé et rendez-vous de suivi.',
  },
  {
    icon: Activity,
    title: 'Dialyse',
    text: 'Des trajets réguliers organisés avec ponctualité et sérénité.',
  },
  {
    icon: HeartPulse,
    title: 'Chimiothérapie',
    text: 'Un accompagnement confortable et adapté à vos séances de soins.',
  },
  {
    icon: Star,
    title: 'Radiothérapie',
    text: 'Des déplacements récurrents assurés avec discrétion et fiabilité.',
  },
  {
    icon: Hospital,
    title: 'Hospitalisations',
    text: "Admissions, sorties d'hôpital et transferts entre établissements.",
  },
  {
    icon: Microscope,
    title: 'Examens & analyses',
    text: 'Laboratoire, IRM, scanner, radiographie et autres examens médicaux.',
  },
];

const trustItems = [
  { icon: Shield, title: 'Agrément CPAM', text: 'Service conventionné et reconnu.' },
  { icon: Clock, title: 'Ponctualité', text: 'Vos rendez-vous médicaux sont prioritaires.' },
  { icon: Car, title: 'Véhicules confortables', text: 'Des taxis récents, propres et spacieux.' },
  { icon: MapPin, title: 'Couverture complète', text: "Paris et une large partie de l'Île-de-France." },
  { icon: Calendar, title: 'Réservation simple', text: 'En ligne ou par téléphone en quelques instants.' },
];

const departments = [
  { code: '75', name: 'Paris', count: '20 arrondissements', path: '/taxi-conventionne-paris-75' },
  { code: '91', name: 'Essonne', count: '50 villes', path: '/taxi-conventionne-essonne-91' },
  { code: '92', name: 'Hauts-de-Seine', count: '36 communes', path: '/taxi-conventionne-hauts-de-seine-92' },
  { code: '93', name: 'Seine-Saint-Denis', count: '40 communes', path: '/taxi-conventionne-seine-saint-denis-93' },
  { code: '94', name: 'Val-de-Marne', count: '47 communes', path: '/taxi-conventionne-val-de-marne-94' },
];

const faqs = [
  {
    question: 'Comment réserver un taxi conventionné ?',
    answer:
      'Vous pouvez réserver en ligne via notre formulaire ou par téléphone au 06 50 36 64 91. Préparez les informations du trajet et de votre rendez-vous médical.',
  },
  {
    question: 'Quels documents dois-je fournir ?',
    answer:
      "Selon votre prise en charge, prévoyez votre prescription médicale de transport, votre carte Vitale à jour et, si nécessaire, votre justificatif complémentaire.",
  },
  {
    question: 'Le tiers payant est-il disponible ?',
    answer:
      "Oui, le tiers payant peut être proposé lorsque les conditions de prise en charge par l'Assurance Maladie sont réunies.",
  },
  {
    question: 'Intervenez-vous le week-end et les jours fériés ?',
    answer:
      'Oui. Notre service de réservation et de transport est disponible 24h/24 et 7j/7, y compris les week-ends et jours fériés.',
  },
];

export default function Home({ onNavigate: _onNavigate }: HomeProps) {
  return (
    <>
      <SEOHead
        title="Taxi conventionne CPAM & VSL Paris Ile-de-France | Reservation 24h/24"
        description="Taxi conventionne CPAM et VSL a Paris et en Ile-de-France (75, 91, 92, 93, 94). Transport medical assis sur prescription vers consultations, dialyse, chimiotherapie, radiotherapie et hospitalisations. Reservation 24h/24, 7j/7."
        jsonLD={[generateJsonLD()]}
      />

      <div className="home-redesign overflow-hidden bg-white text-slate-950">
        <section className="relative overflow-hidden border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_34%),linear-gradient(135deg,#f8fbff_0%,#ffffff_50%,#eef8ff_100%)]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-700 shadow-sm">
                <Shield size={16} aria-hidden="true" />
                Transport médical assis à Paris et en Île-de-France
              </div>
              <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                Taxi conventionné &amp; VSL
                <span className="block bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">à Paris et en Île-de-France</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Vos déplacements médicaux en toute sérénité. Service de taxi conventionné par la CPAM, disponible 24h/24 et 7j/7 à Paris et en Île-de-France.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/reservation-taxi-vsl" className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-blue-700 px-6 py-3.5 text-base font-extrabold text-white shadow-[0_14px_35px_rgba(29,78,216,0.26)] transition hover:-translate-y-0.5 hover:bg-blue-800">
                  <Calendar size={19} /> Réserver maintenant <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a href="tel:+33650366491" className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl border-2 border-blue-100 bg-white px-6 py-3.5 text-base font-extrabold text-blue-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50">
                  <Phone size={18} /> 06 50 36 64 91
                </a>
              </div>
              <div className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ['Agréé CPAM', 'Tiers payant'],
                  ['24h/24 · 7j/7', 'Jours fériés inclus'],
                  ['Paris & IDF', '193 villes desservies'],
                ].map(([title, text]) => (
                  <div key={title} className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm">
                    <CheckCircle size={18} className="shrink-0 text-teal-500" />
                    <div><p className="text-sm font-extrabold text-slate-900">{title}</p><p className="text-xs text-slate-500">{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-cyan-200/45 via-blue-200/15 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
                <img src="/image.png" alt="Taxi conventionné devant un établissement de santé" className="h-[380px] w-full rounded-[1.6rem] object-cover sm:h-[460px]" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-slate-950/80 px-5 py-4 text-white backdrop-blur">
                  <p className="text-xs font-extrabold uppercase tracking-[.14em] text-cyan-200">Taxis Paris Conventionnés</p>
                  <p className="mt-1 text-lg font-black">Votre santé, notre priorité à chaque trajet.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-1 border-b border-slate-100 bg-white py-7 sm:py-9">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(30,64,175,0.10)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 ring-1 ring-blue-100">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-black text-slate-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-50/70 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-cyan-600">Nos services</p>
                <h2 className="mt-2 max-w-3xl text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">Des trajets pensés autour de vos soins</h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Un accompagnement adapté à vos rendez-vous et traitements médicaux, ponctuels comme réguliers.</p>
              </div>
              <Link to="/reservation-taxi-vsl" className="inline-flex items-center gap-2 font-extrabold text-blue-700 hover:text-blue-900">
                Réserver un transport <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                  <span className="absolute right-5 top-4 text-5xl font-black text-slate-50">0{index + 1}</span>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/15">
                    <Icon size={23} aria-hidden="true" />
                  </div>
                  <h3 className="relative mt-5 text-xl font-black text-slate-950">{title}</h3>
                  <p className="relative mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                    Service disponible <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-blue-100 bg-[linear-gradient(135deg,#f0f9ff_0%,#ffffff_50%,#effcf9_100%)] p-6 shadow-[0_22px_60px_rgba(15,23,42,0.07)] sm:p-9">
              <div className="grid gap-4 lg:grid-cols-5">
                {trustItems.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-2xl bg-white/80 p-5 ring-1 ring-slate-200/80 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-base font-black text-slate-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-950 py-14 text-white sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-cyan-300">Notre zone d’intervention</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">193 villes desservies en Île-de-France</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">Nous assurons vos déplacements médicaux à Paris et dans plusieurs départements d’Île-de-France avec un service de proximité.</p>
              <Link to="/zones-desservies" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-extrabold text-slate-950 transition hover:bg-cyan-50">
                Voir toutes les villes desservies <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {departments.map((department) => (
                <Link key={department.code} to={department.path} className="group rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.1]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 font-black text-slate-950">{department.code}</span>
                    <ArrowRight size={18} className="text-cyan-200 transition group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-white">{department.name}</h3>
                  <p className="mt-1 text-sm text-slate-300">{department.count}</p>
                </Link>
              ))}
              <Link to="/zones-desservies" className="group flex min-h-[150px] items-center justify-center rounded-3xl border border-dashed border-cyan-300/40 bg-cyan-300/[0.08] p-5 text-center transition hover:bg-cyan-300/[0.12]">
                <span>
                  <MapPin className="mx-auto text-cyan-300" size={24} aria-hidden="true" />
                  <span className="mt-3 block font-black text-white">Voir les 193 villes</span>
                  <span className="mt-1 block text-sm text-slate-300">Liste complète des zones couvertes</span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-cyan-600">FAQ</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-4xl">Vos questions, nos réponses</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Retrouvez les réponses essentielles avant votre réservation de taxi conventionné.</p>
              <Link to="/faq" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-extrabold text-blue-800 hover:bg-blue-100">
                Voir toutes les questions <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-3">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm open:border-blue-200 open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-extrabold text-slate-950">
                    <span>{question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-blue-700 transition group-open:rotate-180 group-open:bg-blue-50">
                      <ChevronDown size={17} aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#064e8a_0%,#0756b6_48%,#0f9f9a_100%)] px-6 py-8 text-white shadow-[0_25px_70px_rgba(3,105,161,0.24)] sm:px-10 sm:py-10">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-cyan-100">Disponible 24h/24 · 7j/7</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl">Besoin d’un transport médical ?</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50 sm:text-base">Réservez dès maintenant votre taxi conventionné à Paris ou en Île-de-France. Notre équipe est à votre écoute pour organiser votre trajet.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                <Link to="/reservation-taxi-vsl" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-extrabold text-blue-800 shadow-lg transition hover:bg-blue-50">
                  <Calendar size={18} aria-hidden="true" /> Réserver en ligne
                </Link>
                <a href="tel:+33650366491" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 font-extrabold text-emerald-950 shadow-lg transition hover:bg-emerald-300">
                  <Phone size={18} aria-hidden="true" /> 06 50 36 64 91
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
