import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen, ChevronDown, ChevronUp, CheckCircle, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEOHead from '../components/SEOHead';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  published_at: string;
  meta_description: string;
  meta_keywords: string;
}

const DEPARTMENTS = [
  { label: 'Paris (75)', href: '/taxi-conventionne-paris-75' },
  { label: 'Essonne (91)', href: '/taxi-conventionne-essonne-91' },
  { label: 'Hauts-de-Seine (92)', href: '/taxi-conventionne-hauts-de-seine-92' },
  { label: 'Seine-Saint-Denis (93)', href: '/taxi-conventionne-seine-saint-denis-93' },
  { label: 'Val-de-Marne (94)', href: '/taxi-conventionne-val-de-marne-94' },
];

const STATIC_GUIDES = [
  {
    title: 'Comment obtenir un taxi conventionné remboursé par la CPAM ?',
    excerpt:
      'Les conditions à réunir, les documents à préparer et les situations les plus fréquentes pour bénéficier d’un transport médical pris en charge.',
    href: '/reservation-taxi-vsl',
    category: 'Guide CPAM',
  },
  {
    title: 'Taxi conventionné ou VSL : quelle différence pour un patient assis ?',
    excerpt:
      'Comprendre les modes de transport médical non urgent, les cas d’usage et les démarches à effectuer avant un rendez-vous de soins.',
    href: '/faq',
    category: 'Transport médical',
  },
  {
    title: 'Préparer un trajet régulier pour dialyse, chimiothérapie ou radiothérapie',
    excerpt:
      'Organisation des trajets récurrents, ordonnance de série, horaires hospitaliers et coordination avec le chauffeur conventionné.',
    href: '/reservation-taxi-vsl',
    category: 'Soins réguliers',
  },
  {
    title: 'Zones desservies en taxi conventionné en Île-de-France',
    excerpt:
      'Paris, Essonne, Hauts-de-Seine, Seine-Saint-Denis et Val-de-Marne : retrouvez les départements et communes couverts.',
    href: '/zones-desservies',
    category: 'Zones',
  },
  {
    title: 'Quels documents fournir avant un transport médical ?',
    excerpt:
      'Carte Vitale, prescription médicale de transport, attestation ALD ou CSS : les pièces utiles pour faciliter la prise en charge.',
    href: '/faq',
    category: 'Démarches',
  },
  {
    title: 'Réserver un taxi médical tôt le matin ou le week-end',
    excerpt:
      'Conseils pour anticiper un rendez-vous hospitalier, une sortie d’établissement ou un trajet urgent en dehors des horaires classiques.',
    href: '/contact',
    category: 'Réservation',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Quelle est la différence entre un taxi conventionné et une ambulance ?',
    answer:
      "L'ambulance est réservée aux patients nécessitant une surveillance médicale ou un transport allongé. Le taxi conventionné convient aux patients dits « assis », capables de se déplacer sans assistance médicale particulière. Sur prescription médicale, les deux sont pris en charge par la CPAM. Le taxi conventionné est souvent prescrit pour les consultations, dialyses ou séances de chimiothérapie des patients autonomes.",
  },
  {
    question: 'Comment fonctionne le remboursement CPAM pour un taxi conventionné ?',
    answer:
      "Avec une prescription médicale de transport signée par votre médecin, votre taxi conventionné est pris en charge par la CPAM à 65 % du tarif conventionné, et jusqu'à 100 % selon votre situation. Notre service pratique le tiers payant quand les conditions sont réunies.",
  },
  {
    question: 'Peut-on réserver un taxi conventionné pour un trajet régulier ?',
    answer:
      "Oui. Une ordonnance de série peut couvrir plusieurs séances de dialyse, chimiothérapie ou radiothérapie. Nous planifions vos trajets récurrents à l'avance pour garantir ponctualité et disponibilité.",
  },
  {
    question: 'Le service de taxi VSL est-il disponible la nuit et les week-ends ?',
    answer:
      "Notre service est disponible 24h/24, 7j/7, y compris les jours fériés selon les disponibilités. Pour une demande urgente, appelez le 06 50 36 64 91.",
  },
  {
    question: 'Quels documents dois-je préparer avant ma réservation ?',
    answer:
      "Munissez-vous de votre carte Vitale, de votre prescription médicale de transport et, si applicable, de votre attestation d'ALD, CSS ou mutuelle. Si vous n'avez pas encore la prescription, vous pouvez quand même nous contacter pour organiser le trajet.",
  },
];

const jsonLDWebPage = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Blog Taxi VSL Conventionné CPAM Île-de-France',
  description:
    'Conseils pratiques, guides et actualités sur le transport médical en taxi conventionné et VSL en Île-de-France.',
  url: 'https://www.taxisparis-conventionnes.fr/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Taxis Paris Conventionnés',
    url: 'https://www.taxisparis-conventionnes.fr',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.taxisparis-conventionnes.fr/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.taxisparis-conventionnes.fr/blog' },
    ],
  },
};

const jsonLDItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Guides transport médical taxi conventionné',
  itemListElement: STATIC_GUIDES.map((guide, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `https://www.taxisparis-conventionnes.fr${guide.href}`,
    name: guide.title,
    description: guide.excerpt,
  })),
};

const jsonLDFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const jsonLDMedical = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Taxis Paris Conventionnés',
  url: 'https://www.taxisparis-conventionnes.fr/',
  telephone: '+33650366491',
  areaServed: ['Paris', 'Essonne', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne'],
  openingHours: 'Mo-Su 00:00-23:59',
  description:
    'Service de taxi conventionné CPAM et VSL en Île-de-France. Transports médicaux remboursés pour consultations, dialyse, chimiothérapie, hospitalisations.',
};

export default function Blog({ onNavigate: _onNavigate }: { onNavigate?: (page: string) => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (data) setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const hasPublishedPosts = posts.length > 0;

  return (
    <>
      <SEOHead
        title="Blog Taxi VSL Conventionné CPAM | Guides & Conseils Île-de-France"
        description="Conseils pratiques et guides sur le taxi conventionné et VSL remboursé CPAM en Île-de-France. Remboursements, prescriptions médicales, zones desservies. Disponible 24h/24."
        keywords={[
          'blog taxi conventionné',
          'actualités transport médical',
          'conseils VSL CPAM',
          'guide taxi conventionné Paris',
          'remboursement transport médical',
          'prescription médicale transport',
          'taxi conventionné Île-de-France',
        ]}
        canonical="https://www.taxisparis-conventionnes.fr/blog"
        jsonLD={[jsonLDWebPage, jsonLDItemList, jsonLDFAQ, jsonLDMedical]}
      />

      <section className="relative overflow-hidden border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_34%),linear-gradient(135deg,#f8fbff_0%,#ffffff_52%,#eef8ff_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[.14em] text-cyan-700 shadow-sm">
              <BookOpen size={16} /> Guides & conseils transport médical
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Blog Taxi VSL Conventionné
              <span className="block bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">en Île-de-France</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Comprendre le transport médical remboursé CPAM, préparer vos démarches et trouver les informations utiles avant votre trajet.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/reservation-taxi-vsl" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-blue-700 px-6 py-3.5 font-extrabold text-white shadow-[0_14px_35px_rgba(29,78,216,.25)]">Réserver maintenant <ArrowRight size={18} /></Link>
              <a href="tel:+33650366491" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-2 border-blue-100 bg-white px-6 py-3.5 font-extrabold text-blue-900 shadow-sm"><Phone size={17} /> 06 50 36 64 91</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-200/40 via-blue-200/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-[0_28px_80px_rgba(15,23,42,.18)]">
              <img src="/image.png" alt="Taxi conventionné et transport médical" className="h-[360px] w-full rounded-[1.6rem] object-cover sm:h-[430px]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-slate-950/80 px-5 py-4 text-white backdrop-blur">
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-cyan-200">Guides pratiques</p>
                <p className="mt-1 text-lg font-black">CPAM, prescription, soins réguliers et zones desservies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16" aria-label="Article à la une">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7">
              <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">À la une</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Le guide à lire avant votre prochain trajet
              </h2>
            </div>

            {hasPublishedPosts ? (
              <article className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50 lg:grid-cols-[1.05fr_.95fr]">
                <div className="min-h-[280px] bg-gradient-to-br from-blue-100 to-cyan-100 lg:min-h-[360px]">
                  {posts[0].featured_image_url ? (
                    <img
                      src={posts[0].featured_image_url}
                      alt={posts[0].title}
                      className="h-full w-full object-cover"
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="flex h-full min-h-[280px] items-center justify-center">
                      <BookOpen className="text-blue-500" size={72} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">ARTICLE</span>
                    {posts[0].published_at && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Calendar size={14} aria-hidden="true" />
                        <time dateTime={posts[0].published_at}>{formatDate(posts[0].published_at)}</time>
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
                    {posts[0].title}
                  </h3>
                  {posts[0].excerpt && (
                    <p className="mt-4 leading-7 text-slate-600">{posts[0].excerpt}</p>
                  )}
                  <Link
                    to={'/blog/' + posts[0].slug}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
                  >
                    Lire l'article
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ) : (
              <article className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50 lg:grid-cols-[.9fr_1.1fr]">
                <div className="flex min-h-[280px] items-center justify-center bg-gradient-to-br from-blue-700 to-cyan-600">
                  <BookOpen className="text-white" size={86} />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                    {STATIC_GUIDES[0].category}
                  </span>
                  <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
                    {STATIC_GUIDES[0].title}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-600">{STATIC_GUIDES[0].excerpt}</p>
                  <Link
                    to={STATIC_GUIDES[0].href}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
                  >
                    Consulter le guide
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                  {loading && <p className="sr-only" aria-live="polite">Mise à jour des articles en cours</p>}
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" aria-label="Articles et guides du blog">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Guides pratiques</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Conseils pour vos transports médicaux
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                  Des réponses concrètes sur la CPAM, les prescriptions, les soins réguliers et les zones desservies.
                </p>
              </div>
            </div>

            {hasPublishedPosts && posts.length > 1 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.slice(1).map((post) => (
                  <article key={post.id} className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    {post.featured_image_url ? (
                      <div className="h-48 overflow-hidden bg-slate-100">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
                        <BookOpen className="text-blue-400" size={42} />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">ARTICLE</span>
                        {post.published_at && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                            <Calendar size={12} />
                            {formatDate(post.published_at)}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 text-lg font-black leading-snug text-slate-900">{post.title}</h3>
                      {post.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>}
                      <Link
                        to={'/blog/' + post.slug}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 transition group-hover:gap-2.5"
                        aria-label={'Lire l article : ' + post.title}
                      >
                        Lire la suite
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {STATIC_GUIDES.slice(1).map((guide) => (
                  <article key={guide.title} className="group rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">
                      {guide.category}
                    </span>
                    <h3 className="mt-4 text-lg font-black leading-snug text-slate-900">{guide.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{guide.excerpt}</p>
                    <Link
                      to={guide.href}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 transition group-hover:gap-2.5"
                    >
                      Consulter le guide
                      <ArrowRight size={15} />
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-16" aria-label="Guide du transport médical conventionné">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Guide complet</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Transport médical en taxi conventionné
              </h2>

              <GuideSection
                title="Qu'est-ce qu'un taxi conventionné VSL CPAM ?"
                text={
                  <>
                    Un <strong>taxi conventionné</strong> est un véhicule agréé par la Caisse Primaire d'Assurance Maladie pour assurer certains transports médicaux non urgents. Il convient aux patients pouvant voyager assis sans surveillance médicale particulière.
                  </>
                }
              />
              <GuideSection
                title="Conditions et démarches pour le remboursement CPAM"
                text={
                  <>
                    Le remboursement repose notamment sur une <strong>prescription médicale de transport</strong> et sur les conditions définies par l'Assurance Maladie. Selon la situation, une prise en charge renforcée ou le tiers payant peuvent s'appliquer.
                  </>
                }
              />
              <GuideSection
                title="Types de transports médicaux"
                text={
                  <>
                    Consultations, examens, hospitalisations, sorties d'établissement, rééducation, dialyse, chimiothérapie et radiothérapie peuvent nécessiter un transport adapté selon la prescription.
                  </>
                }
              />
            </article>

            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-800 to-cyan-700 p-6 text-white shadow-xl">
                <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-100">Besoin d'un trajet ?</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">Réservez en quelques minutes</h3>
                <p className="mt-3 text-sm leading-6 text-blue-100">
                  Service disponible 24h/24, 7j/7 selon les disponibilités.
                </p>
                <Link
                  to="/reservation-taxi-vsl"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  Réserver maintenant
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
                <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Zones desservies</p>
                <div className="mt-4 space-y-2">
                  {DEPARTMENTS.map((dept) => (
                    <Link
                      key={dept.label}
                      to={dept.href}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-xs font-black text-white">
                        {dept.label.match(/\d+/)?.[0]}
                      </span>
                      <span className="text-sm font-bold text-slate-800">{dept.label}</span>
                      <ArrowRight className="ml-auto text-blue-500" size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" aria-label="Questions fréquentes">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">FAQ</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Questions fréquentes</h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={item.question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <button
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                      aria-expanded={isOpen}
                      aria-controls={'blog-faq-answer-' + index}
                      id={'blog-faq-question-' + index}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      type="button"
                    >
                      <span className="pr-2 font-bold text-slate-900">{item.question}</span>
                      <span className="shrink-0 text-blue-700" aria-hidden="true">
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </span>
                    </button>
                    <div
                      id={'blog-faq-answer-' + index}
                      role="region"
                      aria-labelledby={'blog-faq-question-' + index}
                      hidden={!isOpen}
                    >
                      <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12 text-white sm:py-16" aria-label="Réserver un transport médical">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Besoin d'un transport médical remboursé ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
              Réservez votre taxi conventionné en quelques minutes pour vos rendez-vous à Paris et en Île-de-France.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/reservation-taxi-vsl"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white transition hover:bg-blue-500"
              >
                Réserver maintenant
                <ArrowRight size={17} />
              </Link>
              <a
                href="tel:+33650366491"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-900 px-7 py-3.5 font-bold text-white transition hover:bg-slate-800"
              >
                <Phone size={17} />
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function GuideSection({
  title,
  text,
}: {
  title: string;
  text: React.ReactNode;
}) {
  return (
    <section className="mt-7 border-t border-slate-100 pt-7 first:border-t-0 first:pt-0">
      <h3 className="flex items-start gap-2 text-xl font-black text-slate-900">
        <CheckCircle className="mt-0.5 shrink-0 text-blue-600" size={21} />
        {title}
      </h3>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </section>
  );
}
