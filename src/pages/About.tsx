import { Shield, Users, Award, Heart, CheckCircle, Phone, MapPin, Clock, Star, ChevronDown, ChevronUp, CalendarCheck, Stethoscope, ArrowRight, Hospital } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { generateJsonLD, generateBreadcrumbList } from '../utils/seoData';

const FAQ_ITEMS = [
  { question: 'Qui peut bénéficier d\'un taxi conventionné VSL ?', answer: 'Tout patient dont l\'état de santé nécessite un transport individuel peut bénéficier d\'un taxi conventionné. C\'est notamment le cas des patients atteints d\'une Affection de Longue Durée (ALD), des personnes hospitalisées, de celles qui suivent des traitements réguliers ou qui présentent une incapacité temporaire rendant impossible l\'utilisation des transports en commun.' },
  { question: 'Le transport en taxi conventionné est-il remboursé par la Sécurité sociale ?', answer: 'Oui. Avec une prescription médicale de transport établie par votre médecin, l\'Assurance Maladie prend en charge une partie ou la totalité du coût du trajet selon votre situation.' },
  { question: 'Comment réserver un VSL ou un taxi conventionné ?', answer: 'Vous pouvez réserver directement en ligne via notre formulaire de réservation sur ce site, ou par téléphone au 06 50 36 64 91.' },
  { question: 'Quels départements d\'Île-de-France êtes-vous couverts ?', answer: 'Nous intervenons à Paris (75), dans l\'Essonne (91), les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94).' },
];

const TRUST_ITEMS = [
  { icon: <Shield size={18} className="text-blue-600" />, label: 'Chauffeurs agréés CPAM et conventionnés' },
  { icon: <CheckCircle size={18} className="text-blue-600" />, label: 'Transport sécurisé, confortable et ponctuel' },
  { icon: <Clock size={18} className="text-blue-600" />, label: 'Disponible 24h/24 – 7j/7' },
  { icon: <Star size={18} className="text-blue-600" />, label: 'Service orienté patient' },
  { icon: <Award size={18} className="text-blue-600" />, label: 'Véhicules conformes et entretenus' },
  { icon: <Users size={18} className="text-blue-600" />, label: 'Tiers-payant selon les conditions applicables' },
];

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqLD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <SEOHead
        title="Taxi Conventionné VSL Île-de-France | À propos de notre service"
        description="Découvrez notre service de taxi conventionné VSL en Île-de-France (75, 91, 92, 93, 94). Agréés CPAM, disponibles 24h/24. Réservation rapide au 06 50 36 64 91."
        keywords={['taxi conventionné Paris','VSL conventionné Île-de-France','transport médical Paris','transport sanitaire Île-de-France','taxi CPAM Paris','qui sommes-nous taxi VSL','transport médical 75 91 92 93 94']}
        canonical="https://www.taxisparis-conventionnes.fr/qui-sommes-nous"
        jsonLD={[generateJsonLD(), generateBreadcrumbList([{ name: 'Accueil', url: '/' }, { name: 'Qui sommes-nous', url: '/qui-sommes-nous' }]), faqLD]}
      />

      <section className="relative overflow-hidden border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_34%),linear-gradient(135deg,#f8fbff_0%,#ffffff_52%,#eef8ff_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.04fr_.96fr] lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-700 shadow-sm">
              <Shield size={16} />
              Service de transport médical conventionné
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Un accompagnement humain
              <span className="block bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">pour vos trajets médicaux</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Nous accompagnons les patients à Paris et en Île-de-France vers leurs consultations, traitements et hospitalisations avec ponctualité, discrétion et confort.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/reservation-taxi-vsl" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-blue-700 px-6 py-3.5 font-extrabold text-white shadow-[0_14px_35px_rgba(29,78,216,.25)] transition hover:-translate-y-0.5 hover:bg-blue-800">
                Réserver maintenant <ArrowRight size={18} />
              </Link>
              <a href="tel:+33650366491" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-2 border-blue-100 bg-white px-6 py-3.5 font-extrabold text-blue-900 shadow-sm transition hover:bg-blue-50">
                <Phone size={18} /> 06 50 36 64 91
              </a>
            </div>
            <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
              <MiniProof icon={<Shield size={18} />} title="Conventionné CPAM" text="Transport médical" />
              <MiniProof icon={<Clock size={18} />} title="24h/24 · 7j/7" text="Selon disponibilités" />
              <MiniProof icon={<MapPin size={18} />} title="Paris & IDF" text="75, 91, 92, 93, 94" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-200/40 via-blue-200/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-[0_28px_80px_rgba(15,23,42,.18)]">
              <img src="/image.png" alt="Taxi conventionné et accompagnement patient" className="h-[360px] w-full rounded-[1.6rem] object-cover sm:h-[430px]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-slate-950/80 px-5 py-4 text-white backdrop-blur">
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-cyan-200">Notre engagement</p>
                <p className="mt-1 text-lg font-black">Votre santé, notre priorité à chaque trajet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            [Shield, 'Sécurité', 'Chauffeurs professionnels et véhicules entretenus'],
            [Users, 'Écoute', 'Un accompagnement attentif pour chaque patient'],
            [Award, 'Fiabilité', 'Ponctualité et organisation des rendez-vous'],
            [Heart, 'Humain', 'Discrétion, confort et bienveillance'],
          ].map(([Icon, title, text]) => {
            const IconComponent = Icon as typeof Shield;
            return <div key={String(title)} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><IconComponent size={23} /></div><h2 className="mt-4 text-lg font-black text-slate-900">{String(title)}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{String(text)}</p></div>;
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-7 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Qui sommes-nous ?</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Spécialiste du transport médical conventionné</h2>
            <div className="mt-6 space-y-6 text-slate-600">
              <p className="leading-7">Notre service de <strong className="text-slate-900">taxi conventionné VSL</strong> est spécialisé dans le transport médical assis en Île-de-France. Nous accompagnons les patients vers les hôpitaux, cliniques, cabinets médicaux et centres de soins.</p>
              <p className="leading-7">Nous intervenons pour les consultations, hospitalisations programmées, séances de chimiothérapie, dialyse, radiothérapie, examens médicaux et sorties d'établissement.</p>
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex items-start gap-3"><Stethoscope className="mt-0.5 shrink-0 text-blue-700" size={23} /><div><h3 className="font-black text-slate-900">Prise en charge CPAM</h3><p className="mt-2 text-sm leading-6">Selon votre situation et votre prescription médicale, une prise en charge partielle ou totale peut être possible.</p></div></div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start gap-3"><Hospital className="mt-0.5 shrink-0 text-cyan-700" size={23} /><div><h3 className="font-black text-slate-900">Établissements de santé</h3><p className="mt-2 text-sm leading-6">Nous desservons les principaux hôpitaux et cliniques de Paris et de l'Île-de-France.</p></div></div>
              </div>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-800 to-cyan-700 p-6 text-white shadow-xl">
              <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-100">Besoin d'un transport ?</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight">Réservez en quelques minutes</h3>
              <p className="mt-3 text-sm leading-6 text-blue-100">Notre équipe est disponible pour organiser votre trajet médical.</p>
              <Link to="/reservation-taxi-vsl" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-bold text-blue-700">Réserver maintenant <ArrowRight size={16} /></Link>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
              <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Pourquoi nous faire confiance ?</p>
              <div className="mt-4 space-y-3">
                {TRUST_ITEMS.map((item, i) => <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"><div className="mt-0.5 shrink-0">{item.icon}</div><span className="text-sm font-semibold text-slate-700">{item.label}</span></div>)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Nos zones</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Présents dans 5 départements</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Paris (75)', '/taxi-conventionne-paris-75'],
              ['Essonne (91)', '/taxi-conventionne-essonne-91'],
              ['Hauts-de-Seine (92)', '/taxi-conventionne-hauts-de-seine-92'],
              ['Seine-Saint-Denis (93)', '/taxi-conventionne-seine-saint-denis-93'],
              ['Val-de-Marne (94)', '/taxi-conventionne-val-de-marne-94'],
              ['Toutes les zones desservies', '/zones-desservies'],
            ].map(([label, href]) => <Link key={href} to={href} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><MapPin size={18} /></span><span className="font-bold text-slate-800">{label}</span><ArrowRight className="ml-auto text-blue-500 transition group-hover:translate-x-1" size={16} /></Link>)}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">FAQ</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Questions fréquentes sur notre service</h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div key={item.question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-slate-50" aria-expanded={openFaq === index}>
                  <span className="font-bold text-slate-900">{item.question}</span>
                  {openFaq === index ? <ChevronUp size={20} className="shrink-0 text-blue-600" /> : <ChevronDown size={20} className="shrink-0 text-slate-400" />}
                </button>
                {openFaq === index && <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 sm:text-base">{item.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Besoin d'un transport médical en Île-de-France ?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">Réservez en ligne ou appelez-nous directement.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/reservation-taxi-vsl" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white"><CalendarCheck size={18} /> Réserver maintenant</Link>
            <a href="tel:+33650366491" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-900 px-7 py-3.5 font-bold text-white"><Phone size={18} /> 06 50 36 64 91</a>
          </div>
        </div>
      </section>
    </>
  );
}

function MiniProof({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm"><span className="text-teal-500">{icon}</span><div><p className="text-sm font-extrabold text-slate-900">{title}</p><p className="text-xs text-slate-500">{text}</p></div></div>;
}
