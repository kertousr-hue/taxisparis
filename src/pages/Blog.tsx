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

      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <BookOpen size={14} aria-hidden="true" />
            Guides & conseils transport médical
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Blog Taxi VSL Conventionné<br className="hidden sm:block" /> en Île-de-France
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Tout savoir sur le transport médical remboursé CPAM : démarches, remboursements, zones desservies et conseils pratiques
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/reservation-taxi-vsl"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition shadow-lg"
            >
              Réserver maintenant
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href="tel:+33650366491"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition"
            >
              <Phone size={16} aria-hidden="true" />
              06 50 36 64 91
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50" aria-label="Articles et guides du blog">
        <div className="container mx-auto px-4">
          {hasPublishedPosts ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  {post.featured_image_url && (
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Article
                      </span>
                      {post.published_at && (
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Calendar size={13} aria-hidden="true" />
                          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                        </div>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                    )}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:gap-3 transition-all"
                      aria-label={`Lire l'article : ${post.title}`}
                    >
                      Lire la suite
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                  Guides pratiques taxi conventionné CPAM
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Les réponses essentielles pour préparer un transport médical remboursé en Île-de-France.
                </p>
                {loading && <p className="sr-only" aria-live="polite">Mise à jour des articles en cours</p>}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {STATIC_GUIDES.map((guide) => (
                  <article
                    key={guide.title}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <span className="inline-flex text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
                        {guide.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug">
                        {guide.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {guide.excerpt}
                      </p>
                      <Link
                        to={guide.href}
                        className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:gap-3 transition-all"
                      >
                        Consulter le guide
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-white" aria-label="Guide du transport médical conventionné">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
            Guide complet du transport médical en taxi conventionné
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
              Qu'est-ce qu'un taxi conventionné VSL CPAM ?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Un <strong>taxi conventionné</strong> est un véhicule agréé par la Caisse Primaire d'Assurance Maladie (CPAM) pour assurer les transports médicaux non urgents. Il s'adresse aux patients dits « assis », capables de se déplacer sans assistance médicale particulière pendant le trajet.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Notre entreprise intervient sur Paris (75), l'Essonne (91), les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94), 24h/24, 7j/7, pour les consultations, soins réguliers, hospitalisations et sorties d'établissement.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
              Conditions et démarches pour obtenir le remboursement CPAM
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Le remboursement repose sur une <strong>prescription médicale de transport</strong>, un trajet lié à des soins reconnus par l'Assurance Maladie et une situation médicale justifiant le recours à un transport adapté.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Selon votre situation, la prise en charge peut atteindre 100 %, notamment en cas d'ALD, de maternité, d'accident du travail ou de soins répétés. Pour les transports en série, une ordonnance peut couvrir plusieurs séances.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
              Types de transports médicaux pris en charge
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Notre service couvre les consultations, examens médicaux, hospitalisations programmées, sorties d'hôpital, séances de rééducation, dialyse, chimiothérapie, radiothérapie et transferts inter-hospitaliers en Île-de-France.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Les trajets vers les gares et aéroports peuvent aussi être organisés lorsqu'ils sont liés à un motif médical prescrit. Chaque demande est étudiée selon votre situation et vos documents de prise en charge.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
              Départements couverts
            </h3>
            <p className="text-gray-700 leading-relaxed mb-5">
              Nos chauffeurs interviennent dans les cinq départements suivants. Consultez la page de votre département pour connaître les villes desservies et les établissements hospitaliers proches.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {DEPARTMENTS.map((dept) => (
                <Link
                  key={dept.label}
                  to={dept.href}
                  className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 hover:bg-blue-100 hover:border-blue-300 transition group"
                  aria-label={`Taxi conventionné ${dept.label}`}
                >
                  <span className="flex-shrink-0 w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    {dept.label.match(/\d+/)?.[0]}
                  </span>
                  <span className="font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition">
                    Taxi conventionné {dept.label}
                  </span>
                  <ArrowRight size={14} className="ml-auto text-blue-400 group-hover:translate-x-1 transition" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50" aria-label="Questions fréquentes">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={`blog-faq-answer-${index}`}
                    id={`blog-faq-question-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    type="button"
                  >
                    <span className="font-semibold text-gray-800 text-sm sm:text-base pr-2">
                      {item.question}
                    </span>
                    <span className="flex-shrink-0 text-blue-600" aria-hidden="true">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  <div
                    id={`blog-faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`blog-faq-question-${index}`}
                    hidden={!isOpen}
                  >
                    <p className="px-5 pb-5 text-gray-700 leading-relaxed text-sm sm:text-base border-t border-gray-100 pt-3">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white" aria-label="Réserver un transport médical">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Besoin d'un transport médical remboursé ?
          </h2>
          <p className="text-gray-600 mb-6">
            Réservez votre taxi conventionné VSL en quelques minutes. Disponible 24h/24, 7j/7 dans toute l'Île-de-France.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/reservation-taxi-vsl"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition shadow-md"
            >
              Réserver maintenant
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href="tel:+33650366491"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-600 hover:text-white transition"
            >
              <Phone size={16} aria-hidden="true" />
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
