import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Calendar,
  ChevronDown,
  FileText,
  HeartHandshake,
  HeartPulse,
  Hospital,
  MapPin,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { generateJsonLD } from '../utils/seoData';
import heroImage from '../assets/image.png';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    icon: Stethoscope,
    title: 'Consultation médicale',
    text: 'Tous vos rendez-vous spécialisés',
  },
  {
    icon: Activity,
    title: 'Dialyse',
    text: 'Trajets réguliers organisés',
  },
  {
    icon: HeartPulse,
    title: 'Chimiothérapie',
    text: 'Un accompagnement de confiance',
  },
  {
    icon: Sparkles,
    title: 'Radiothérapie',
    text: 'Des trajets en toute sérénité',
  },
  {
    icon: Hospital,
    title: 'Hospitalisation',
    text: 'À l’aller comme au retour',
  },
  {
    icon: Microscope,
    title: 'Examens médicaux',
    text: 'IRM, scanner, analyses…',
  },
];

const departments = [
  { code: '75', name: 'Paris', count: 'Tous les arrondissements', path: '/taxi-conventionne-paris-75' },
  { code: '91', name: 'Essonne', count: '50 villes', path: '/taxi-conventionne-essonne-91' },
  { code: '92', name: 'Hauts-de-Seine', count: '36 communes', path: '/taxi-conventionne-hauts-de-seine-92' },
  { code: '93', name: 'Seine-Saint-Denis', count: '40 communes', path: '/taxi-conventionne-seine-saint-denis-93' },
  { code: '94', name: 'Val-de-Marne', count: '47 communes', path: '/taxi-conventionne-val-de-marne-94' },
];

const faqs = [
  {
    question: 'Comment réserver un taxi conventionné ?',
    answer:
      'Vous pouvez réserver en ligne via notre formulaire ou par téléphone au 06 50 36 64 91. Préparez les informations de votre trajet et de votre rendez-vous médical.',
  },
  {
    question: 'Puis-je bénéficier du tiers payant ?',
    answer:
      'Le tiers payant peut être proposé lorsque les conditions de prise en charge de l’Assurance Maladie sont réunies, selon votre situation et votre prescription.',
  },
  {
    question: 'Quels documents dois-je prévoir ?',
    answer:
      'Selon votre prise en charge, prévoyez votre prescription médicale de transport, votre carte Vitale à jour et les justificatifs nécessaires.',
  },
  {
    question: 'Le service fonctionne-t-il le week-end ?',
    answer:
      'Oui, nous pouvons organiser des transports 24h/24 et 7j/7, y compris les week-ends et jours fériés.',
  },
];

export default function Home({ onNavigate }: HomeProps) {
  const submitQuickBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNavigate('/reservation-taxi-vsl');
  };

  return (
    <>
      <SEOHead
        title="Taxi conventionne CPAM & VSL Paris Ile-de-France | Reservation 24h/24"
        description="Taxi conventionne CPAM et VSL a Paris et en Ile-de-France (75, 91, 92, 93, 94). Transport medical assis sur prescription vers consultations, dialyse, chimiotherapie, radiotherapie et hospitalisations. Reservation 24h/24, 7j/7."
        jsonLD={[generateJsonLD()]}
      />

      <div className="overflow-hidden bg-[#fbfaf7] text-[#0a2743]">
        <section className="relative isolate min-h-[660px] overflow-hidden bg-[#062b49] lg:min-h-[610px]">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-55 lg:object-[70%_center]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,32,55,0.98)_0%,rgba(4,32,55,0.92)_42%,rgba(4,32,55,0.46)_70%,rgba(4,32,55,0.22)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fbfaf7] via-[#fbfaf7]/35 to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-28 pt-14 sm:px-6 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-32 lg:pt-20">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d7b76d]/50 bg-[#d7b76d]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f2d28a]">
                <ShieldCheck size={16} />
                Taxi conventionné CPAM
              </span>

              <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4.15rem]">
                Taxi conventionné CPAM à Paris &amp; en Île-de-France
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
                Vos rendez-vous médicaux, notre priorité. Un transport sûr, confortable et humain,
                organisé avec des chauffeurs conventionnés.
              </p>

              <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  ['Chauffeurs conventionnés', '24h/24 · 7j/7', ShieldCheck],
                  ['Prise en charge', 'CPAM selon situation', FileText],
                  ['Établissements', 'Paris & Île-de-France', Hospital],
                ].map(([title, text, Icon]) => {
                  const IconComponent = Icon as typeof ShieldCheck;
                  return (
                    <div key={String(title)} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 backdrop-blur-sm">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d7b76d] text-[#062b49]">
                        <IconComponent size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">{title as string}</p>
                        <p className="text-[11px] text-white/65">{text as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/reservation-taxi-vsl"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-[#c9a352] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#b9903e]"
                >
                  Réserver mon transport
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="tel:+33650366491"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border border-white/35 bg-[#062b49]/70 px-6 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  <Phone size={18} />
                  06 50 36 64 91
                </a>
              </div>
            </div>

            <div className="hidden lg:flex lg:items-end lg:justify-end">
              <div className="max-w-[290px] border-l border-[#d7b76d]/60 pl-5 text-right text-white/80">
                <p className="font-serif text-2xl italic leading-tight text-white">Plus qu’un transport,</p>
                <p className="mt-1 font-serif text-xl italic text-[#efd188]">un accompagnement humain.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={submitQuickBooking}
            className="rounded-2xl border border-[#e7e0d2] bg-white p-4 shadow-[0_20px_55px_rgba(14,39,64,0.16)] sm:p-5"
          >
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-serif text-xl font-semibold text-[#0a2743]">Votre prochain rendez-vous médical ?</p>
                <p className="mt-1 text-sm text-slate-500">Préparez votre trajet en quelques instants.</p>
              </div>
              <span className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a68136] sm:mt-0">Réservation rapide</span>
            </div>

            <div className="grid gap-3 lg:grid-cols-[0.78fr_1.2fr_1.2fr_auto]">
              <label className="group rounded-xl border border-slate-200 bg-[#fcfbf8] px-4 py-3 focus-within:border-[#c9a352] focus-within:ring-2 focus-within:ring-[#c9a352]/15">
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  <Calendar size={14} className="text-[#a68136]" /> Date du trajet
                </span>
                <input type="date" className="mt-1 w-full bg-transparent text-sm font-semibold text-[#0a2743] outline-none" />
              </label>

              <label className="group rounded-xl border border-slate-200 bg-[#fcfbf8] px-4 py-3 focus-within:border-[#c9a352] focus-within:ring-2 focus-within:ring-[#c9a352]/15">
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  <MapPin size={14} className="text-[#a68136]" /> Adresse de départ
                </span>
                <input type="text" placeholder="Votre adresse" className="mt-1 w-full bg-transparent text-sm font-semibold text-[#0a2743] outline-none placeholder:font-normal placeholder:text-slate-400" />
              </label>

              <label className="group rounded-xl border border-slate-200 bg-[#fcfbf8] px-4 py-3 focus-within:border-[#c9a352] focus-within:ring-2 focus-within:ring-[#c9a352]/15">
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  <Hospital size={14} className="text-[#a68136]" /> Destination
                </span>
                <input type="text" placeholder="Hôpital, clinique, cabinet…" className="mt-1 w-full bg-transparent text-sm font-semibold text-[#0a2743] outline-none placeholder:font-normal placeholder:text-slate-400" />
              </label>

              <button
                type="submit"
                className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-xl bg-[#c9a352] px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#b9903e]"
              >
                Réserver
                <ArrowRight size={17} />
              </button>
            </div>
          </form>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-2xl border border-[#ebe5da] bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            {[
              [ShieldCheck, 'Conventionné CPAM', 'Transport médical assis'],
              [FileText, 'Tiers payant', 'Selon votre situation'],
              [Users, 'Chauffeurs professionnels', 'Ponctuels & bienveillants'],
              [MapPin, 'Toute l’Île-de-France', 'Paris et départements'],
            ].map(([Icon, title, text], index) => {
              const IconComponent = Icon as typeof ShieldCheck;
              return (
                <div key={String(title)} className={'flex items-center gap-3 px-5 py-4 ' + (index < 3 ? 'lg:border-r lg:border-[#eee8dc]' : '')}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#092f50] text-white">
                    <IconComponent size={19} />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-[#0a2743]">{title as string}</p>
                    <p className="text-xs text-slate-500">{text as string}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="services" className="bg-white py-14 sm:py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#a68136]">Nos services</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.02em] text-[#0a2743] sm:text-4xl">
                  Nos services de transport médical
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Des solutions adaptées à vos besoins de santé, avec une organisation claire et rassurante.
                </p>
              </div>
              <Link to="/reservation-taxi-vsl" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0a5b96] hover:text-[#083d64]">
                Réserver un transport <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-[#ebe5da] bg-[#fcfbf8] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#d8c28d] hover:shadow-[0_18px_40px_rgba(14,39,64,0.09)]"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c9a352] via-[#e0c581] to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff8e9] text-[#b48835] ring-1 ring-[#ead7ab]">
                      <Icon size={23} />
                    </span>
                    <ArrowRight size={18} className="mt-2 text-[#0a5b96] transition group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-[#0a2743]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fbfaf7] py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] border border-[#e6ded0] bg-white shadow-[0_20px_55px_rgba(14,39,64,0.08)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[320px] overflow-hidden">
              <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#062b49]/75 via-[#062b49]/25 to-transparent" />
              <div className="relative flex min-h-[320px] items-end p-7 sm:p-10">
                <div className="max-w-md text-white">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#f0d08a]">Paris & Île-de-France</p>
                  <p className="mt-3 font-serif text-3xl font-semibold">Plus qu’un transport, un accompagnement humain</p>
                </div>
              </div>
            </div>
            <div className="flex items-center p-7 sm:p-10">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff6e4] text-[#ad8233]">
                  <HeartHandshake size={24} />
                </span>
                <h2 className="mt-5 font-serif text-3xl font-semibold text-[#0a2743]">
                  Votre santé reste au centre du trajet
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Nous vous accompagnons avec attention vers vos consultations, traitements et hospitalisations.
                  Notre priorité : vous offrir un trajet ponctuel, confortable et rassurant.
                </p>
                <Link to="/qui-sommes-nous" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#082f4f] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#0a3b63]">
                  Découvrir notre engagement <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#062b49] py-14 text-white sm:py-18">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#edcb80]">Nos zones desservies</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Paris & Île-de-France</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                Un service de proximité pour vos déplacements médicaux, avec des pages locales dédiées à chaque département.
              </p>
              <Link
                to="/zones-desservies"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#c9a352] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#b9903e]"
              >
                Voir toutes les villes <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {departments.map((department) => (
                <Link
                  key={department.code}
                  to={department.path}
                  className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-[#d8bd78]/45 hover:bg-white/[0.1]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6c67d] text-sm font-black text-[#062b49]">
                      {department.code}
                    </span>
                    <ArrowRight size={17} className="text-[#edcb80] transition group-hover:translate-x-1" />
                  </div>
                  <p className="mt-5 font-serif text-xl font-semibold">{department.name}</p>
                  <p className="mt-1 text-xs text-white/60">{department.count}</p>
                </Link>
              ))}
              <Link
                to="/zones-desservies"
                className="flex min-h-[150px] items-center justify-center rounded-2xl border border-dashed border-[#d8bd78]/45 bg-[#d8bd78]/10 p-5 text-center"
              >
                <span>
                  <MapPin className="mx-auto text-[#edcb80]" size={24} />
                  <span className="mt-3 block text-sm font-extrabold">Voir la carte des zones</span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#a68136]">Questions fréquentes</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0a2743] sm:text-4xl">Avant votre réservation</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Les réponses essentielles sur le taxi conventionné, la CPAM et l’organisation de votre trajet.
              </p>
              <Link to="/faq" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0a5b96]">
                Voir toute la FAQ <ArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-3">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="group rounded-xl border border-[#e9e2d6] bg-[#fcfbf8] px-5 py-4 open:border-[#dcc68e]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold text-[#0a2743]">
                    <span>{question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0a5b96] shadow-sm transition group-open:rotate-180">
                      <ChevronDown size={16} />
                    </span>
                  </summary>
                  <p className="mt-4 border-t border-[#ebe4d8] pt-4 text-sm leading-6 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-[#082f4f] px-6 py-8 text-white shadow-[0_22px_60px_rgba(8,47,79,0.2)] sm:px-10 sm:py-10">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#edcb80]">Disponible 24h/24 · 7j/7</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Besoin d’un transport médical ?</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
                  Réservez votre taxi conventionné à Paris ou en Île-de-France. Notre équipe organise votre trajet avec vous.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                <Link to="/reservation-taxi-vsl" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-lg bg-[#c9a352] px-5 py-3 text-sm font-extrabold text-white">
                  <Calendar size={17} /> Réserver en ligne
                </Link>
                <a href="tel:+33650366491" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.06] px-5 py-3 text-sm font-extrabold text-white">
                  <Phone size={17} /> 06 50 36 64 91
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
