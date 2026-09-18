import { useEffect, useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone, Mail, Shield, Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { supabase } from '../lib/supabase';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
}

interface FAQByCategory {
  [category: string]: FAQItem[];
}

const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  { id: 'default-reservation', question: 'Comment réserver un taxi conventionné ou VSL ?', answer: 'Vous pouvez réserver par téléphone au 06 50 36 64 91 ou via le formulaire en ligne. Préparez votre adresse de départ, votre destination médicale, la date du rendez-vous et, si vous l’avez déjà, votre prescription médicale de transport.', category: 'Réservation', display_order: 1 },
  { id: 'default-documents', question: 'Quels documents faut-il prévoir pour un transport remboursé CPAM ?', answer: 'Pour une prise en charge par l’Assurance Maladie, il faut généralement une prescription médicale de transport, votre carte Vitale et, selon votre situation, une attestation ALD, CSS ou mutuelle. Sans prescription, le trajet reste possible mais peut ne pas être remboursé.', category: 'Remboursement CPAM', display_order: 2 },
  { id: 'default-remboursement', question: 'Le taxi conventionné est-il remboursé par la CPAM ?', answer: 'Oui, lorsqu’un médecin prescrit un transport médical et que les conditions de prise en charge sont réunies. Le remboursement peut être partiel ou total selon votre situation : ALD, hospitalisation, soins réguliers, accident du travail, maternité ou autre motif médical reconnu.', category: 'Remboursement CPAM', display_order: 3 },
  { id: 'default-dialyse-chimio', question: 'Peut-on organiser des trajets réguliers pour dialyse ou chimiothérapie ?', answer: 'Oui. Pour les soins répétés comme la dialyse, la chimiothérapie ou la radiothérapie, nous pouvons planifier des trajets récurrents afin de respecter vos horaires de séance et de simplifier vos démarches.', category: 'Soins réguliers', display_order: 4 },
  { id: 'default-zones', question: 'Quelles zones sont desservies en Île-de-France ?', answer: 'Nous intervenons à Paris (75), en Essonne (91), dans les Hauts-de-Seine (92), en Seine-Saint-Denis (93) et dans le Val-de-Marne (94), avec des trajets vers les hôpitaux, cliniques, centres de soins, gares et aéroports pour raisons médicales.', category: 'Zones desservies', display_order: 5 },
  { id: 'default-urgence', question: 'Le service est-il disponible la nuit, le week-end et les jours fériés ?', answer: 'Oui, le service est disponible 24h/24 et 7j/7 selon les disponibilités. Pour une demande urgente ou un trajet tôt le matin, appelez directement le 06 50 36 64 91 afin de confirmer rapidement la prise en charge.', category: 'Disponibilité', display_order: 6 },
];

function groupFAQ(items: FAQItem[]): FAQByCategory {
  return items.reduce<FAQByCategory>((groups, item) => {
    const category = item.category || 'Général';
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

const DEFAULT_FAQ_GROUPS = groupFAQ(DEFAULT_FAQ_ITEMS);

export default function FAQ() {
  const [faqItems, setFaqItems] = useState<FAQByCategory>(DEFAULT_FAQ_GROUPS);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchFAQ(); }, []);

  const fetchFAQ = async () => {
    try {
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      if (data && data.length > 0) setFaqItems(groupFAQ(data));
    } catch (error) {
      console.error('Erreur lors du chargement de la FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (id: string) => setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Object.values(faqItems).flat().map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": stripHtml(item.answer) }
    }))
  };

  return (
    <>
      <SEOHead
        title="Questions Fréquentes - Taxi Conventionné Paris"
        description="Retrouvez toutes les réponses à vos questions sur nos services de taxi conventionné et VSL en Île-de-France. Transport médical, tarifs, réservation et plus."
        keywords="faq taxi conventionné, questions taxi, transport médical paris, remboursement sécurité sociale"
        canonical="https://www.taxisparis-conventionnes.fr/faq"
        jsonLD={schemaData}
      />

      <section className="relative overflow-hidden border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_34%),linear-gradient(135deg,#f8fbff_0%,#ffffff_52%,#eef8ff_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.04fr_.96fr] lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-cyan-700 shadow-sm">
              <HelpCircle size={16} />
              Questions fréquentes
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Toutes les réponses pour
              <span className="block bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
                préparer votre transport médical
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Réservation, prescription médicale, prise en charge CPAM, zones desservies et transports réguliers : retrouvez les réponses essentielles avant votre trajet.
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
              <HeroProof icon={<Shield size={18} />} title="Agréé CPAM" text="Transport conventionné" />
              <HeroProof icon={<Clock size={18} />} title="24h/24 · 7j/7" text="Selon disponibilités" />
              <HeroProof icon={<MapPin size={18} />} title="Paris & IDF" text="193 villes desservies" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-200/40 via-blue-200/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-[0_28px_80px_rgba(15,23,42,.18)]">
              <img src="/image.png" alt="Taxi conventionné devant un établissement de santé" className="h-[360px] w-full rounded-[1.6rem] object-cover sm:h-[430px]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-slate-950/80 px-5 py-4 text-white backdrop-blur">
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-cyan-200">Besoin d'aide ?</p>
                <p className="mt-1 text-lg font-black">Une équipe disponible pour vous renseigner.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            ['Réservation', 'Comment réserver et préparer votre trajet'],
            ['Remboursement CPAM', 'Prescription, tiers payant et documents'],
            ['Soins réguliers', 'Dialyse, chimiothérapie et radiothérapie'],
            ['Zones desservies', 'Paris, 91, 92, 93 et 94'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <CheckCircle className="text-teal-500" size={22} />
              <h2 className="mt-3 font-black text-slate-900">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">FAQ</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Questions les plus fréquentes</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">Des réponses claires, classées par thème, pour préparer votre transport en toute sérénité.</p>
          </div>

          <div className="space-y-10">
            {Object.entries(faqItems).map(([category, items]) => (
              <section key={category}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-blue-700 to-cyan-500" />
                  <h2 className="text-xl font-black text-slate-900 sm:text-2xl">{category}</h2>
                </div>
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-slate-50"
                        aria-expanded={openItems[item.id]}
                      >
                        <span className="font-bold text-slate-900">{item.question}</span>
                        <ChevronDown className={`shrink-0 text-blue-600 transition ${openItems[item.id] ? 'rotate-180' : ''}`} size={20} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openItems[item.id] ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 sm:text-base" dangerouslySetInnerHTML={{ __html: item.answer }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {loading && <p className="sr-only" aria-live="polite">Mise à jour de la FAQ en cours</p>}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-600 p-8 text-white shadow-xl sm:p-10">
            <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <MessageCircle size={30} className="text-cyan-200" />
                <h2 className="mt-4 text-3xl font-black tracking-tight">Vous ne trouvez pas votre réponse ?</h2>
                <p className="mt-3 max-w-2xl leading-7 text-blue-100">Notre équipe est disponible pour vous renseigner et vous accompagner dans vos démarches.</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-700"><Mail size={17} /> Contactez-nous</Link>
                <a href="tel:+33650366491" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white"><Phone size={17} /> Appeler</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroProof({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
      <span className="text-teal-500">{icon}</span>
      <div>
        <p className="text-sm font-extrabold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{text}</p>
      </div>
    </div>
  );
}
