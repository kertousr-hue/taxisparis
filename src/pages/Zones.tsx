import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ChevronDown, ChevronUp, CheckCircle, Phone, Building2, CircleDot, BadgeCheck } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface ZonesProps {
  onNavigate?: (page: string) => void;
}

const DEPARTMENTS = [
  {
    code: '75',
    name: 'Paris',
    slug: 'taxi-conventionne-paris-75',
    description: 'Tous les arrondissements de Paris intramuros, du 1er au 20e.',
    sector: '20 arrondissements',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    btnColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
    hex: '#2563eb',
    tint: '#dbeafe',
    mapPoints: '70,29 88,32 103,47 99,70 82,90 58,84 46,64 51,41',
    routePath: 'M58 82 C69 68 77 55 89 34',
    labels: [
      { name: 'Paris', x: 72, y: 61 },
      { name: 'Bercy', x: 88, y: 72 },
    ],
    villesCount: '20+',
    hopitauxCount: '35+',
  },
  {
    code: '91',
    name: 'Essonne',
    slug: 'taxi-conventionne-essonne-91',
    description: 'Évry-Courcouronnes, Corbeil-Essonnes, Massy, Palaiseau et 50+ villes.',
    sector: 'Secteur sud',
    badgeClass: 'bg-green-50 text-green-700 border-green-200',
    btnColor: 'bg-green-600 hover:bg-green-700 focus:ring-green-300',
    hex: '#16a34a',
    tint: '#dcfce7',
    mapPoints: '57,18 88,14 116,31 130,62 112,96 74,110 42,88 35,51',
    routePath: 'M51 85 C68 70 88 56 112 35',
    labels: [
      { name: 'Évry', x: 86, y: 59 },
      { name: 'Palaiseau', x: 55, y: 39 },
      { name: 'Étampes', x: 96, y: 90 },
    ],
    villesCount: '40+',
    hopitauxCount: '25+',
  },
  {
    code: '92',
    name: 'Hauts-de-Seine',
    slug: 'taxi-conventionne-hauts-de-seine-92',
    description: 'Nanterre, Boulogne-Billancourt, Courbevoie, Neuilly-sur-Seine et plus.',
    sector: 'Secteur ouest',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    btnColor: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-300',
    hex: '#d97706',
    tint: '#fef3c7',
    mapPoints: '68,16 86,30 78,49 94,67 75,104 51,89 43,58 51,27',
    routePath: 'M52 84 C63 66 69 47 80 29',
    labels: [
      { name: 'Nanterre', x: 63, y: 44 },
      { name: 'Boulogne', x: 59, y: 78 },
      { name: 'Antony', x: 82, y: 95 },
    ],
    villesCount: '35+',
    hopitauxCount: '20+',
  },
  {
    code: '93',
    name: 'Seine-Saint-Denis',
    slug: 'taxi-conventionne-seine-saint-denis-93',
    description: 'Bobigny, Saint-Denis, Montreuil, Aulnay-sous-Bois et plus.',
    sector: 'Secteur nord-est',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    btnColor: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-300',
    hex: '#e11d48',
    tint: '#ffe4e6',
    mapPoints: '44,25 78,13 110,28 121,57 101,85 63,94 34,68',
    routePath: 'M44 68 C64 58 78 45 108 30',
    labels: [
      { name: 'Saint-Denis', x: 65, y: 38 },
      { name: 'Bobigny', x: 82, y: 58 },
      { name: 'Montreuil', x: 95, y: 78 },
    ],
    villesCount: '30+',
    hopitauxCount: '15+',
  },
  {
    code: '94',
    name: 'Val-de-Marne',
    slug: 'taxi-conventionne-val-de-marne-94',
    description: 'Créteil, Vitry-sur-Seine, Champigny-sur-Marne et 40+ villes.',
    sector: 'Secteur sud-est',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    btnColor: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-300',
    hex: '#e11d48',
    tint: '#ffe4e6',
    mapPoints: '52,18 84,13 112,34 108,69 82,96 48,88 31,56',
    routePath: 'M43 82 C58 66 74 54 102 34',
    labels: [
      { name: 'Créteil', x: 82, y: 57 },
      { name: 'Ivry', x: 54, y: 43 },
      { name: 'Vitry', x: 65, y: 80 },
    ],
    villesCount: '30+',
    hopitauxCount: '20+',
  },
];

type DepartmentCard = (typeof DEPARTMENTS)[number];

function DepartmentMiniMap({ department }: { department: DepartmentCard }) {
  return (
    <div className="mb-4 rounded-md border border-gray-100 bg-slate-50 p-2.5">
      <svg
        viewBox="0 0 160 128"
        className="h-32 w-full"
        role="img"
        aria-label={`Carte simplifiée du département ${department.name}`}
      >
        <path
          d="M31 23 C47 10 68 11 86 18 C103 10 128 18 140 36 C151 54 146 79 132 95 C116 114 91 118 69 110 C45 118 25 105 16 86 C7 65 12 40 31 23Z"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="1.5"
        />
        <path
          d="M29 75 C49 64 62 70 78 58 C98 43 113 50 131 40"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
        <path
          d="M39 31 C56 42 73 41 91 31 C109 22 123 27 137 39"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <polygon
          points={department.mapPoints}
          fill={department.tint}
          stroke={department.hex}
          strokeWidth="2.25"
          strokeLinejoin="round"
        />
        <path
          d={department.routePath}
          fill="none"
          stroke={department.hex}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="5 4"
          opacity="0.75"
        />
        {department.labels.map((label) => (
          <g key={label.name}>
            <circle cx={label.x} cy={label.y} r="3.25" fill={department.hex} stroke="#ffffff" strokeWidth="1.5" />
            <text
              x={label.x + 6}
              y={label.y + 3}
              fill="#475569"
              fontSize="8.5"
              fontWeight="600"
            >
              {label.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    question: 'Quelle est la différence entre un taxi conventionné et un VSL ?',
    answer:
      'Un taxi conventionné est un véhicule de taxi agréé par la CPAM pour transporter des patients assis. Le VSL (Véhicule Sanitaire Léger) est un véhicule sanitaire dédié, conduit par un auxiliaire ambulancier. Les deux sont remboursables sur prescription médicale. Le taxi conventionné est privilégié pour les patients pouvant se déplacer normalement, tandis que le VSL convient aux patients nécessitant une aide légère à la mobilité.',
  },
  {
    question: 'Quelles conditions faut-il remplir pour bénéficier du remboursement CPAM ?',
    answer:
      'Pour obtenir la prise en charge par la CPAM, trois conditions sont nécessaires : (1) une prescription médicale de transport établie par votre médecin sur formulaire Cerfa S3138 ; (2) un trajet vers un établissement de soin conventionné ou agréé ; (3) une incapacité à utiliser les transports en commun justifiée par votre état de santé. Le remboursement atteint 100 % pour les patients en ALD, CMU-C ou maternité.',
  },
  {
    question: 'Quelles villes d\'Île-de-France sont couvertes par votre service ?',
    answer:
      'Nous desservons plus de 200 communes réparties sur 5 départements : Paris (75) avec tous ses arrondissements, l\'Essonne (91), les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94). Les transferts inter-hospitaliers entre ces départements sont également assurés 24h/24.',
  },
  {
    question: 'Peut-on réserver un taxi conventionné pour une séance de dialyse ou chimiothérapie régulière ?',
    answer:
      'Oui, nous prenons en charge les transports répétitifs pour dialyse, chimiothérapie et radiothérapie. Il suffit d\'une prescription médicale valable pour plusieurs séances (ordonnance de série). Nous établissons un planning récurrent afin que vous soyez pris en charge à chaque séance, sans avoir à réserver à chaque fois.',
  },
  {
    question: 'Quel délai pour confirmer une réservation de taxi VSL ?',
    answer:
      'Après soumission de votre demande en ligne, notre équipe vous contacte par téléphone dans les plus brefs délais pour confirmer la disponibilité. Nous recommandons de réserver au minimum 24 heures à l\'avance. Pour les transports urgents ou non programmés, appelez directement le 06 50 36 64 91 disponible 24h/24, 7j/7.',
  },
];

const jsonLDWebPage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Zones desservies – Taxi VSL Conventionné CPAM Île-de-France',
  description:
    'Toutes les zones desservies par notre service de taxi conventionné et VSL en Île-de-France : Paris (75), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94). Plus de 200 communes.',
  url: 'https://www.taxisparis-conventionnes.fr/zones-desservies',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.taxisparis-conventionnes.fr/' },
      { '@type': 'ListItem', position: 2, name: 'Zones desservies', item: 'https://www.taxisparis-conventionnes.fr/zones-desservies' },
    ],
  },
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
    'Service de taxi conventionné CPAM et VSL en Île-de-France pour tous vos transports médicaux : consultations, dialyse, chimiothérapie, radiothérapie, hospitalisations.',
};

export default function Zones({ onNavigate }: ZonesProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEOHead
        title="Zones desservies Taxi VSL Conventionné CPAM | Île-de-France 200+ villes"
        description="Taxi conventionné et VSL remboursé CPAM en Île-de-France : Paris (75), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94). Plus de 200 communes. Disponible 24h/24."
        keywords={[
          'zones taxi conventionné',
          'villes desservies VSL',
          'taxi conventionné Paris 75',
          'VSL Essonne 91',
          'transport médical Hauts-de-Seine 92',
          'taxi conventionné Seine-Saint-Denis 93',
          'VSL Val-de-Marne 94',
          'taxi conventionné CPAM Île-de-France',
          'transport médical remboursé',
        ]}
        canonical="https://www.taxisparis-conventionnes.fr/zones-desservies"
        jsonLD={[jsonLDWebPage, jsonLDFAQ, jsonLDMedical]}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <MapPin size={14} aria-hidden="true" />
            200+ communes desservies
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Zones desservies par notre service<br className="hidden sm:block" /> de taxi VSL conventionné
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Île-de-France — Paris (75), Essonne (91), Hauts-de-Seine (92),<br className="hidden sm:block" /> Seine-Saint-Denis (93) et Val-de-Marne (94)
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

      {/* ── Cartes départements ─────────────────────────────────────── */}
      <section className="py-12 bg-gray-50" aria-label="Départements couverts">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Nos 5 départements d'intervention
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Couverture CPAM en Île-de-France : réservation rapide, trajets réguliers et accès aux hôpitaux partenaires
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10">
            {DEPARTMENTS.map((dept) => (
              <article
                key={dept.code}
                className="group flex flex-col rounded-lg border border-gray-200 border-t-4 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderTopColor: dept.hex }}
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${dept.badgeClass}`}>
                    {dept.code}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold leading-tight text-gray-900">{dept.name}</h3>
                    <p className="text-xs text-gray-500">{dept.sector}</p>
                  </div>
                </div>

                <DepartmentMiniMap department={dept} />

                <div className="mb-5 flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-gray-400" aria-hidden="true" />
                    <span className="text-sm">
                      <strong className="text-green-600">{dept.villesCount}</strong>{' '}
                      <span className="text-gray-500">villes desservies</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleDot size={14} className="text-gray-400" aria-hidden="true" />
                    <span className="text-sm">
                      <strong className="text-green-600">{dept.hopitauxCount}</strong>{' '}
                      <span className="text-gray-500">hôpitaux partenaires</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={14} className="text-green-500" aria-hidden="true" />
                    <span className="text-sm font-medium text-green-600">Conventionné CPAM</span>
                  </div>
                </div>

                <Link
                  to={`/${dept.slug}`}
                  className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition focus:outline-none focus:ring-4 ${dept.btnColor}`}
                  aria-label={`Voir les villes desservies en ${dept.name} (${dept.code})`}
                >
                  {dept.code === '75' ? 'Voir Paris' : 'Voir les villes'}
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section SEO 700+ mots ────────────────────────────────────── */}
      <section className="py-12 bg-white" aria-label="Informations sur le taxi VSL conventionné">
        <div className="container mx-auto px-4 max-w-4xl">

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
            Tout savoir sur le taxi conventionné VSL en Île-de-France
          </h2>

          {/* H3.1 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
              Qu'est-ce qu'un taxi conventionné VSL ?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Un <strong>taxi conventionné</strong> est un véhicule de transport individuel agréé par la Caisse Primaire d'Assurance Maladie (CPAM) pour assurer des transports médicaux non urgents. Il se distingue de l'ambulance — réservée aux situations d'urgence ou de grande dépendance — et du VSL (Véhicule Sanitaire Léger), destiné aux patients nécessitant une aide légère à la mobilité. Le taxi conventionné transporte des patients dits « assis », c'est-à-dire capables de monter et descendre du véhicule sans assistance particulière.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Notre flotte de taxis conventionnés couvre l'intégralité de l'Île-de-France, 24 heures sur 24 et 7 jours sur 7. Chaque chauffeur est titulaire d'une convention avec la CPAM, ce qui garantit que vos frais de transport sont directement pris en charge par l'Assurance Maladie, sans avance de frais dans la majorité des cas.
            </p>
          </div>

          {/* H3.2 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
              Conditions de prise en charge par la CPAM
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Pour bénéficier du remboursement de votre transport par la Sécurité sociale, plusieurs conditions doivent être réunies. En premier lieu, vous devez disposer d'une <strong>prescription médicale de transport</strong> (formulaire Cerfa S3138), établie par votre médecin traitant ou spécialiste. Ce document précise la destination, la fréquence des trajets et le mode de transport adapté à votre état de santé.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              Le taux de remboursement varie selon votre situation : il atteint <strong>100 % pour les patients en Affection de Longue Durée (ALD)</strong>, les bénéficiaires de la Complémentaire Santé Solidaire (CSS), les femmes enceintes à partir du 6e mois et les victimes d'accident du travail. Pour les autres situations, la prise en charge est de 65 % du tarif conventionné, le solde pouvant être couvert par votre mutuelle.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Il est également possible de bénéficier d'une prise en charge pour des transports en série (dialyse, chimiothérapie, radiothérapie) grâce à une ordonnance de série valable plusieurs mois, évitant ainsi de renouveler la prescription à chaque séance.
            </p>
          </div>

          {/* H3.3 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
              Types de transports médicaux assurés
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Notre service de taxi conventionné prend en charge l'ensemble des déplacements médicaux non urgents : <strong>consultations chez le médecin généraliste ou spécialiste</strong>, bilans biologiques et radiologiques, hospitalisations programmées et sorties d'hôpital, séances de rééducation fonctionnelle, consultations en cabinet de kinésithérapie ou d'orthophonie.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              Nous assurons également les transports répétitifs pour les patients dialysés (2 à 3 fois par semaine), les patients en cours de <strong>chimiothérapie ou de radiothérapie</strong>, ainsi que les transferts inter-hospitaliers entre établissements de santé d'Île-de-France. Les transports vers les aéroports de Roissy-CDG et Orly pour raison médicale sont également couverts.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nos chauffeurs sont formés à l'accueil de patients en situation de fragilité, de handicap ou de mobilité réduite. Le confort, la discrétion et la ponctualité sont au cœur de notre prestation.
            </p>
          </div>

          {/* H3.4 — maillage interne vers les 5 départements */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
              Pourquoi choisir notre service de taxi conventionné ?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Face à la multitude d'opérateurs, plusieurs raisons font de notre service un choix de confiance pour les patients et professionnels de santé d'Île-de-France. Nous sommes conventionnés avec la CPAM, ce qui signifie que la facturation est directe : vous n'avez pas à avancer les frais. Nos chauffeurs connaissent parfaitement les établissements de santé de la région et garantissent des créneaux horaires respectés, essentiels pour les patients sous dialyse ou en chimiothérapie.
            </p>
            <p className="text-gray-700 leading-relaxed mb-5">
              Notre disponibilité 24h/24, 7j/7, y compris les jours fériés, vous assure de ne jamais manquer un rendez-vous médical important. La réservation se fait en ligne ou par téléphone, et une confirmation vous est envoyée rapidement.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {DEPARTMENTS.map((dept) => (
                <Link
                  key={dept.code}
                  to={`/${dept.slug}`}
                  className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 hover:bg-blue-100 hover:border-blue-300 transition group"
                  aria-label={`Taxi conventionné ${dept.name} (${dept.code})`}
                >
                  <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {dept.code}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition">
                      Taxi conventionné {dept.name}
                    </div>
                    <div className="text-xs text-gray-500">{dept.description.split(',')[0]}</div>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-blue-400 group-hover:translate-x-1 transition" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* H3.5 */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
              Zone d'intervention et couverture géographique
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Notre zone d'intervention principale couvre les cinq départements de la petite couronne et de Paris. En pratique, cela représente plus de <strong>200 communes</strong>, des grandes agglomérations comme Boulogne-Billancourt, Nanterre ou Créteil jusqu'aux villes moyennes comme Palaiseau, Massy, Savigny-sur-Orge ou Champigny-sur-Marne. Les transferts entre hôpitaux ou cliniques situés dans des départements différents sont une spécialité de notre service.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              Pour les trajets hors Île-de-France (vers un centre hospitalier universitaire en province par exemple), nous étudions chaque demande au cas par cas. Certains transports longue distance peuvent être pris en charge par la CPAM sous conditions spécifiques, notamment pour les patients ne pouvant être soignés localement.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Vous souhaitez vérifier que votre commune est bien desservie ? Consultez les pages de chaque département ou contactez-nous directement au <a href="tel:+33650366491" className="text-blue-600 font-semibold hover:underline">06 50 36 64 91</a>. Notre équipe vous renseignera sur les modalités de prise en charge et les disponibilités dans votre secteur.
            </p>
          </div>

        </div>
      </section>

      {/* ── FAQ accordéon ───────────────────────────────────────────── */}
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
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
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
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
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

      {/* ── CTA final ───────────────────────────────────────────────── */}
      <section className="py-12 bg-white" aria-label="Réserver un transport médical">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Votre destination n'est pas listée ?
          </h2>
          <p className="text-gray-600 mb-6">
            Contactez-nous pour connaître nos disponibilités. Nous intervenons dans toute l'Île-de-France et étudions chaque demande.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/reservation-taxi-vsl"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition shadow-md"
            >
              Faire une réservation
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
