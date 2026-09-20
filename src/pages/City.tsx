import { useParams, Link } from 'react-router-dom'
import { ArrowRight, MapPin, ShieldCheck, Building2, TrainFront, Plane, Users } from 'lucide-react'
import { CityLinks } from '../components/CityDirectory'
import { LocalBookingAside, LocalChecklist, LocalClosing, LocalFAQ, LocalHero, LocalParagraphs, LocalSectionNav, LocalTrust } from '../components/LocalPageUI'
import citiesData from '../data/cities.json'
import SEOHead from '../components/SEOHead'

/* =========================================================
   UTILITAIRES STABLES (anti duplicate Google)
========================================================= */

function hash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0
  }
  return Math.abs(h)
}

function pickStable<T>(arr: T[], seed: number, count = 1) {
  const out: T[] = []
  let s = seed
  while (out.length < count && arr.length > 0) {
    const index = ((s % arr.length) + arr.length) % arr.length
    out.push(arr[index])
    s = Math.imul(33, s + 7)
  }
  return out
}

/* =========================================================
   GÉNÉRATEUR INTELLIGENT ULTRA PREMIUM - CONTENU UNIQUE
========================================================= */

type CityContentRecord = { name: string; slug: string; postalCode: string; nearHospitals?: string[] }

function generateLocalContent(city: CityContentRecord, department: { name: string; slug: string }) {
  const seed = hash(city.slug + department.slug + city.postalCode)
  const hospitals = city.nearHospitals?.filter((hospital) => hospital && hospital.trim()) || []
  const hasHospitals = hospitals.length > 0

  const careTypes = [
    'consultations spécialisées',
    'IRM et scanner',
    'séances de dialyse',
    'radiothérapie',
    'chimiothérapie',
    'hospitalisations programmées',
    'rééducation médicale',
    'examens médicaux',
    'soins oncologiques'
  ]

  const logistics = [
    'ponctualité rigoureuse',
    'respect strict des prescriptions médicales',
    'accompagnement personnalisé',
    'coordination avec les établissements de santé',
    'gestion anticipée des horaires',
    'suivi en temps réel',
    'chauffeurs formés au transport médical'
  ]

  const additionalCareDetails = [
    'Notre service médical conventionné accompagne quotidiennement les patients nécessitant des soins réguliers. Les trajets de dialyse, chimiothérapie ou radiothérapie requièrent une ponctualité absolue que nous garantissons systématiquement.',
    'Spécialisés dans le transport sanitaire, nos chauffeurs connaissent les protocoles médicaux et adaptent leur conduite à votre état de santé. Chaque véhicule est désinfecté après chaque transport.',
    'La coordination avec les services hospitaliers fait partie intégrante de notre métier. Nous vérifions les horaires de rendez-vous et anticipons les temps de stationnement dans les centres médicaux.',
    'Pour les patients en traitement longue durée, nous proposons un service de transport récurrent avec le même chauffeur pour créer une relation de confiance et assurer un suivi personnalisé.',
    'Les examens d\'imagerie médicale (IRM, scanner, radiographie) nécessitent souvent un transport adapté. Nos véhicules spacieux permettent de voyager confortablement même après des examens fatigants.',
    'Notre expérience du transport médical nous permet d\'anticiper les besoins spécifiques : aide à la mobilité, temps supplémentaire pour la marche, accompagnement jusqu\'à la salle d\'attente.'
  ]

  const contextualParagraphs = [
    `La commune de ${city.name}, située dans le ${department.name} en région Île-de-France, bénéficie d'un accès privilégié à notre réseau de transport médical conventionné. Les résidents peuvent compter sur un service de qualité pour tous leurs déplacements de santé prescrits.`,
    `Au cœur du ${department.name}, ${city.name} est parfaitement desservie par notre flotte de taxis conventionnés et VSL. La proximité des grands axes routiers franciliens nous permet de vous conduire rapidement vers n'importe quel établissement de santé de la région.`,
    `${city.name} fait partie intégrante de notre zone d'intervention prioritaire dans le ${department.name}. Nos chauffeurs connaissent parfaitement les spécificités locales de circulation et les meilleurs itinéraires vers les centres hospitaliers.`,
    `Implanté en Île-de-France, notre service dessert quotidiennement ${city.name} et l'ensemble du ${department.name}. Cette proximité géographique nous permet d'assurer des délais d'intervention courts et une grande réactivité.`,
    `${city.name}, comme l'ensemble des communes du ${department.name}, bénéficie de notre expertise en transport médical. Située en région Île-de-France, la ville profite d'un accès direct aux meilleurs établissements hospitaliers.`
  ]

  const introVariants = [
    `Notre service de taxi conventionné CPAM à ${city.name} assure vos déplacements médicaux vers l'ensemble des hôpitaux et cliniques d'Île-de-France. Installés localement, nous connaissons parfaitement les itinéraires optimaux depuis ${city.name} pour vous garantir un transport ponctuel et sécurisé. Chaque trajet médical est organisé avec rigueur pour respecter vos horaires de consultation.`,
    `Depuis ${city.name}, nos chauffeurs professionnels organisent quotidiennement des trajets sanitaires en taxi conventionné et VSL sur prescription médicale. Spécialisés dans le transport médical, nous accompagnons les patients de ${city.name} vers leurs rendez-vous hospitaliers avec un service adapté à chaque situation de santé. La prise en charge CPAM simplifie vos démarches administratives.`,
    `Notre équipe de transport médical intervient spécifiquement à ${city.name} pour l'ensemble de vos rendez-vous médicaux prescrits. Que vous résidiez en centre-ville de ${city.name} ou dans les quartiers périphériques, nous assurons une prise en charge à domicile pour tous vos déplacements de santé. Le service conventionné vous permet de voyager sans avancer de frais.`,
    `Taxi conventionné et VSL à ${city.name} : un service de transport médical agréé Sécurité sociale pour vos consultations spécialisées et soins réguliers. Les habitants de ${city.name} bénéficient d'un accompagnement personnalisé lors de leurs trajets vers les centres hospitaliers franciliens. Notre flotte sanitaire est équipée pour garantir votre confort durant le transport.`,
    `Le service de taxi médical conventionné à ${city.name} facilite vos déplacements de santé dans toute l'Île-de-France. Actifs sur le secteur de ${city.name} depuis de nombreuses années, nous connaissons les spécificités locales et les meilleurs accès aux établissements de soins. Votre prescription médicale de transport suffit pour bénéficier du tiers-payant.`,
    `Implanté à ${city.name} (${department.name}), notre service de transport sanitaire assure l'ensemble des trajets médicaux prescrits par votre médecin traitant. Les patients de ${city.name} profitent d'une disponibilité étendue et d'une réactivité optimale pour leurs rendez-vous médicaux urgents ou programmés. Nous coordonnons chaque trajet avec les services hospitaliers.`,
    `Notre service de transport sanitaire conventionné dessert l'ensemble du territoire de ${city.name} et rayonne sur toute l'Île-de-France pour vos rendez-vous médicaux. Spécialisés dans le transport de personnes nécessitant des soins réguliers, nous sommes le partenaire santé des résidents de ${city.name}. La facturation directe avec la CPAM vous évite toute avance de frais.`,
    `Transport médical agréé CPAM depuis ${city.name} vers l'ensemble des centres hospitaliers et cliniques franciliens. Notre connaissance approfondie du réseau de santé et des itinéraires depuis ${city.name} nous permet d'optimiser chaque trajet médical. Nous intervenons pour tous types de consultations, examens et traitements prescrits.`
  ]

  const serviceVariants = [
    'Notre service de taxi conventionné',
    'Nos chauffeurs professionnels',
    'Notre flotte de véhicules agréés',
    'Notre équipe spécialisée',
    'Nos taxis médicaux',
    'Notre entreprise de transport sanitaire',
    'Nos conducteurs qualifiés'
  ]

  const intro = pickStable(introVariants, seed, 1)[0]
  const serviceType = pickStable(serviceVariants, seed + 2, 1)[0]
  const selectedCare = pickStable(careTypes, seed + 4, 4).join(', ')
  const selectedLogistics = pickStable(logistics, seed + 9, 3).join(', ')
  const additionalDetail = pickStable(additionalCareDetails, seed + 50, 1)[0]
  const contextParagraph = pickStable(contextualParagraphs, seed + 60, 1)[0]

  const organizationIntros = [
    `Le transport médical depuis ${city.name} nécessite une organisation rigoureuse pour garantir le respect de vos horaires de rendez-vous. Notre équipe basée localement connaît parfaitement les spécificités de circulation à ${city.name} et anticipe les temps de trajet pour vous assurer une arrivée ponctuelle à vos consultations médicales.`,
    `Nous planifions méticuleusement chaque trajet médical au départ de ${city.name} pour assurer votre ponctualité absolue. Grâce à notre expérience du secteur de ${city.name}, nous calculons précisément les délais nécessaires et optimisons les itinéraires vers chaque établissement hospitalier francilien.`,
    `Votre confort et votre sérénité sont prioritaires lors de vos déplacements médicaux depuis ${city.name}. Nos chauffeurs formés au transport sanitaire adaptent leur conduite à votre état de santé et veillent à rendre chaque trajet depuis ${city.name} aussi agréable que possible, quelle que soit la distance.`,
    `Chaque transport sanitaire depuis ${city.name} est coordonné avec précision pour respecter vos contraintes horaires médicales. Nous synchronisons nos départs de ${city.name} avec vos rendez-vous hospitaliers et maintenons un contact permanent pour garantir votre tranquillité d'esprit durant tout le parcours.`,
    `La fiabilité de nos services de taxi conventionné à ${city.name} repose sur une préparation minutieuse de chaque trajet médical. En amont de votre prise en charge à ${city.name}, nous vérifions les conditions de circulation et sélectionnons le meilleur itinéraire pour vous conduire sereinement vers votre destination de soins.`
  ]

  const organizationIntro = pickStable(organizationIntros, seed + 12, 1)[0]

  const benefitsList = [
    [
      'Prise en charge directe à votre domicile',
      'Véhicules sanitaires confortables et équipés',
      'Chauffeurs expérimentés et à l\'écoute',
      'Tiers-payant CPAM selon votre situation'
    ],
    [
      'Service disponible 7 jours sur 7',
      'Respect strict des horaires médicaux',
      'Assistance personnalisée durant le trajet',
      'Aucune avance de frais dans la plupart des cas'
    ],
    [
      'Trajets directs sans détour inutile',
      'Coordination avec les services hospitaliers',
      'Véhicules régulièrement contrôlés',
      'Prise en charge par la Sécurité sociale'
    ],
    [
      'Réservation simple et rapide',
      'Confirmation systématique de rendez-vous',
      'Suivi personnalisé de votre dossier',
      'Facturation directe avec la CPAM'
    ]
  ]

  const benefits = pickStable(benefitsList, seed + 18, 1)[0]

  const paragraph = `
${intro}

${serviceType} prend en charge : ${selectedCare}.
Chaque trajet est organisé avec ${selectedLogistics}.

${additionalDetail}

${contextParagraph}

Sur prescription médicale de transport, le tiers-payant CPAM est appliqué selon votre éligibilité. Vous n'avez généralement aucun frais à avancer pour vos trajets médicaux conventionnés. Le transport médical conventionné depuis ${city.name} couvre l'intégralité du territoire francilien.
`

  const organizationText = `
${organizationIntro}

${serviceType} assure :
• ${benefits.join('\n• ')}

Que vous ayez besoin d'un trajet vers ${hasHospitals ? hospitals[0] : 'un établissement hospitalier d\'Île-de-France'} ou tout autre centre médical francilien, nous vous garantissons un service professionnel et ponctuel.
`

  const faq = [
    {
      q: `Comment réserver un taxi conventionné à ${city.name} ?`,
      a: `Appelez-nous au 06 50 36 64 91 ou réservez en ligne sur notre formulaire. Munissez-vous de votre prescription médicale de transport (PMT) et de votre carte Vitale. Nous confirmons votre trajet sous quelques minutes.`
    },
    {
      q: `Le trajet est-il remboursé par la CPAM ?`,
      a: `Oui, sur prescription médicale de transport, la CPAM prend en charge 65% à 100% du trajet selon votre situation (ALD, maternité, accident du travail). Le tiers-payant évite toute avance de frais dans la plupart des cas.`
    },
    {
      q: `Quels transports médicaux proposez-vous depuis ${city.name} ?`,
      a: `Nous assurons tous les transports prescrits : dialyse, chimiothérapie, radiothérapie, consultations spécialisées, examens (IRM, scanner), hospitalisations programmées et sorties d'hôpital. Service disponible 24h/24, 7j/7.`
    },
    {
      q: `Vers quels hôpitaux pouvez-vous m'emmener depuis ${city.name} ?`,
      a: `Nous desservons l'ensemble des hôpitaux d'Île-de-France, notamment l'Institut Gustave Roussy (Villejuif), Hôpital Bicêtre (Le Kremlin-Bicêtre), Pitié-Salpêtrière (Paris 13e), Lariboisière (Paris 10e), Cochin (Paris 14e), Georges Pompidou (Paris 15e) et tous les autres établissements sur prescription.`
    }
  ]

  const tripDescriptions = [
    'Trajets réguliers pour consultations spécialisées',
    'Transport pour examens et imagerie médicale',
    'Déplacements pour soins oncologiques',
    'Accès aux services d\'urgences et consultations',
    'Trajets pour dialyse et traitements réguliers',
    'Transport vers services de cardiologie',
    'Accès aux consultations de médecine interne',
    'Déplacements pour radiothérapie et chimiothérapie'
  ]

  const frequentTrips = hasHospitals
    ? hospitals.slice(0, 4).map((hospital: string, idx: number) => ({
        from: city.name,
        to: hospital,
        description: pickStable(tripDescriptions, seed + idx + 100, 1)[0]
      }))
    : [
        { from: city.name, to: 'Institut Gustave Roussy', description: pickStable(tripDescriptions, seed + 100, 1)[0] },
        { from: city.name, to: 'Hôpital Bicêtre', description: pickStable(tripDescriptions, seed + 101, 1)[0] },
        { from: city.name, to: 'Hôpital Cochin', description: pickStable(tripDescriptions, seed + 102, 1)[0] },
        { from: city.name, to: 'Pitié-Salpêtrière', description: pickStable(tripDescriptions, seed + 103, 1)[0] }
      ]

  const whyChooseVariants = [
    [
      'Agrément CPAM valide et à jour',
      'Flotte de véhicules confortables et récents',
      'Chauffeurs formés au transport de personnes à mobilité réduite',
      'Service client réactif et disponible',
      'Tarifs conventionnés transparents'
    ],
    [
      'Plus de 10 ans d\'expérience dans le transport médical',
      'Connaissance parfaite des hôpitaux franciliens',
      'Respect strict des protocoles sanitaires',
      'Ponctualité garantie pour vos rendez-vous',
      'Accompagnement personnalisé selon vos besoins'
    ],
    [
      'Service de qualité reconnu par nos patients',
      'Véhicules adaptés à tous types de pathologies',
      'Prise en charge douce et sécurisée',
      'Gestion administrative simplifiée',
      'Disponibilité 7j/7 pour urgences et rendez-vous programmés'
    ]
  ]

  const whyChoose = pickStable(whyChooseVariants, seed + 25, 1)[0]

  const additionalSections = {
    accessibility: [
      `L'accessibilité de nos services à ${city.name} constitue une priorité absolue. Nos véhicules sont équipés pour accueillir les personnes à mobilité réduite, avec des systèmes d'aide à l'embarquement et des espaces adaptés pour les fauteuils roulants pliants.`,
      `À ${city.name}, nous adaptons chaque transport aux besoins spécifiques des patients. Que vous nécessitiez une assistance particulière ou un accompagnement renforcé, nos chauffeurs formés sont à votre écoute pour garantir votre confort et votre sécurité.`,
      `Notre flotte de taxis conventionnés desservant ${city.name} comprend des véhicules spacieux permettant le transport de matériel médical (déambulateur, bouteilles d'oxygène) tout en assurant votre confort durant le trajet.`,
      `Les patients de ${city.name} bénéficient d'un service personnalisé tenant compte de leur mobilité. Nos chauffeurs prennent le temps nécessaire pour l'installation en toute sécurité et n'hésitent pas à apporter leur aide jusqu'au service hospitalier.`
    ],
    coverage: [
      `Le service de taxi conventionné à ${city.name} couvre l'ensemble du territoire francilien. Depuis ${city.name}, nous organisons des trajets vers Paris et toutes les communes d'Île-de-France disposant d'établissements de santé. Notre connaissance du réseau routier régional garantit l'optimisation de chaque trajet.`,
      `Implanté dans le ${department.name}, notre service rayonne naturellement sur ${city.name} et ses environs. Cette implantation locale nous permet de connaître parfaitement les spécificités de circulation à ${city.name} et d'anticiper les temps de trajet avec précision.`,
      `${city.name} se situe dans une zone géographique stratégique de l'Île-de-France. Cette position facilite l'accès aux principaux centres hospitaliers parisiens et régionaux. Nos chauffeurs utilisent les axes rapides pour minimiser vos temps de transport.`,
      `Notre couverture géographique depuis ${city.name} englobe les cinq départements de la petite couronne ainsi que Paris intra-muros. Quel que soit l'emplacement de votre établissement de santé, nous vous y conduisons dans les meilleures conditions.`
    ],
    booking: [
      `Réserver un transport médical depuis ${city.name} s'effectue simplement par téléphone ou via notre plateforme en ligne. Indiquez-nous votre adresse à ${city.name}, votre destination médicale et l'horaire souhaité. Nous confirmons immédiatement la disponibilité et planifions votre trajet.`,
      `Pour vos trajets réguliers depuis ${city.name} (dialyse, chimiothérapie), nous proposons la mise en place de créneaux récurrents. Cette organisation systématique vous libère de la contrainte de réservation et assure la continuité de vos soins.`,
      `La réservation anticipée depuis ${city.name} reste recommandée, particulièrement pour les rendez-vous matinaux ou les trajets vers des établissements éloignés. Toutefois, notre réactivité nous permet d'honorer des demandes à court délai selon les disponibilités.`,
      `Lors de votre réservation au départ de ${city.name}, munissez-vous de votre prescription médicale de transport et des coordonnées précises de l'établissement de destination. Ces informations nous permettent d'optimiser l'organisation de votre trajet médical.`
    ]
  }

  const selectedAccessibility = pickStable(additionalSections.accessibility, seed + 70, 1)[0]
  const selectedCoverage = pickStable(additionalSections.coverage, seed + 80, 1)[0]
  const selectedBooking = pickStable(additionalSections.booking, seed + 90, 1)[0]

  return {
    paragraph,
    organizationText,
    faq,
    frequentTrips,
    whyChoose,
    selectedAccessibility,
    selectedCoverage,
    selectedBooking
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function CityPage() {
  const { departmentSlug, citySlug } = useParams()

  const department = citiesData.departments.find(
    (d) => d.slug === departmentSlug
  )

  const city = department?.cities.find(
    (c) => c.slug === citySlug
  )

  if (!department || !city) {
    return <div className="text-center py-20">Ville non trouvée</div>
  }

  const baseUrl = `https://www.taxisparis-conventionnes.fr/${departmentSlug}/${citySlug}`

  const seoTitle = `Taxi Conventionné ${city.name} (${city.postalCode}) | CPAM | Transport Médical 24h/24`

  const {
    paragraph,
    organizationText,
    faq,
    frequentTrips,
    whyChoose,
    selectedAccessibility,
    selectedCoverage,
    selectedBooking
  } = generateLocalContent(city, department)

  const metaDescription = `Taxi conventionné à ${city.name} (${city.postalCode}). Transport médical remboursé CPAM vers hôpitaux de Paris et Île-de-France. Dialyse, chimio, hospitalisation. Réservation 24h/24 : 06 50 36 64 91.`

  const nearbyCities = city.nearCities
    ? department.cities.filter((c) => city.nearCities.includes(c.slug))
    : department.cities.filter((c) => c.slug !== citySlug).slice(0, 5)

  const allNearbyCities = department.cities
    .filter((c) => c.slug !== citySlug)
    .slice(0, 8)

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TaxiService", "MedicalBusiness"],
    "name": `Taxi Conventionné CPAM ${city.name}`,
    "alternateName": `Transport Médical ${city.name}`,
    "description": `Service de taxi conventionné et VSL à ${city.name} (${city.postalCode}) dans le ${department.name}, Île-de-France. Transport médical agréé Sécurité sociale pour consultations, dialyse, chimiothérapie, radiothérapie. Tiers-payant CPAM. Transferts hôpitaux, gares et aéroports.`,
    "url": baseUrl,
    "telephone": "+33650366491",
    "priceRange": "Tiers-payant CPAM (65% à 100% pris en charge)",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Tiers-payant CPAM, Carte bancaire, Mutuelle",
    "areaServed": [
      {
        "@type": "City",
        "name": city.name,
        "postalCode": city.postalCode,
        "addressRegion": department.name,
        "addressCountry": "FR"
      },
      {
        "@type": "State",
        "name": "Île-de-France",
        "addressCountry": "FR"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "postalCode": city.postalCode,
      "addressRegion": department.name,
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "FR"
    },
    "serviceType": ["Transport médical conventionné CPAM", "Taxi conventionné", "VSL", "Transport sanitaire"],
    "availableService": [
      {
        "@type": "Service",
        "name": "Taxi conventionné CPAM",
        "description": "Transport médical individuel avec tiers-payant selon prescription",
        "provider": {
          "@type": "TaxiService",
          "name": `Taxi Conventionné ${city.name}`
        }
      },
      {
        "@type": "Service",
        "name": "VSL (Véhicule Sanitaire Léger)",
        "description": "Transport sanitaire assis professionnalisé pour 3 patients maximum",
        "provider": {
          "@type": "MedicalBusiness",
          "name": `VSL ${city.name}`
        }
      },
      {
        "@type": "Service",
        "name": "Transport pour dialyse",
        "description": "Trajets réguliers pour séances de dialyse avec tiers-payant CPAM"
      },
      {
        "@type": "Service",
        "name": "Transport pour chimiothérapie",
        "description": "Accompagnement pour traitements de chimiothérapie"
      },
      {
        "@type": "Service",
        "name": "Transfert gare et aéroport médical",
        "description": "Transferts vers gares parisiennes et aéroports sur prescription médicale"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.taxisparis-conventionnes.fr"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <div className="local-page local-page-city">
      <SEOHead title={seoTitle} description={metaDescription} canonical={baseUrl} jsonLD={jsonLD} />
      <LocalHero name={city.name} code={department.code} citySlug={city.slug} postalCode={city.postalCode} description={`Vos déplacements médicaux depuis ${city.name} vers les hôpitaux et centres de soins de Paris et d’Île-de-France. Prise en charge CPAM possible selon votre prescription et votre situation.`} breadcrumbs={[{ label: 'Zones desservies', href: '/zones-desservies' }, { label: department.name, href: `/${department.slug}` }, { label: city.name }]} />
      <LocalTrust />
      <LocalSectionNav items={[{ id: 'votre-transport', label: 'Votre transport' }, { id: 'trajets', label: 'Trajets & hôpitaux' }, { id: 'organisation', label: 'Organisation' }, { id: 'questions', label: 'Vos questions' }, { id: 'villes-voisines', label: 'Autour de vous' }]} />

      <div className="lp-container lp-content">
        <div className="lp-main-column">
          <section id="votre-transport" className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Au départ de {city.name}</p><h2>Votre transport médical,<br />avec attention.</h2></div>
            <LocalParagraphs text={paragraph} lead />
          </section>

          <section id="trajets" className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Du domicile à vos soins</p><h2>Vos trajets depuis {city.name}.</h2><p>Quelques destinations hospitalières desservies au départ de votre ville.</p></div>
            <div className="lp-trips">{frequentTrips.map((trip, index) => <article className="lp-trip" key={`${trip.to}-${index}`}><div className="lp-trip-path"><i aria-hidden="true" /><span><small>Départ</small><strong>{trip.from}</strong></span><i aria-hidden="true" /><span><small>Destination</small><strong>{trip.to}</strong></span></div><p>{trip.description}</p></article>)}</div>
            <div className="lp-care-note">Votre établissement ne figure pas dans cette liste ? Contactez-nous pour organiser un trajet adapté à votre rendez-vous et à votre prescription.</div>
          </section>

          {city.nearHospitals?.filter((hospital) => hospital?.trim()).length > 0 && <section className="lp-section"><div className="lp-section-heading"><p className="lp-eyebrow">Vos établissements</p><h2>Les hôpitaux desservis<br />depuis {city.name}.</h2></div><ul className="lp-hospital-list">{city.nearHospitals.filter((hospital) => hospital?.trim()).map((hospital) => <li key={hospital}><Building2 size={18} aria-hidden="true" /><span>{hospital}</span></li>)}</ul></section>}

          <section id="organisation" className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Un trajet bien préparé</p><h2>L’organisation de votre<br />transport à {city.name}.</h2></div>
            <LocalParagraphs text={organizationText} />
            <Link to={`/${department.slug}`} className="lp-text-link">Découvrir tout le département {department.name} <ArrowRight size={16} aria-hidden="true" /></Link>
          </section>

          <section className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">À vos côtés</p><h2>Un accompagnement<br />adapté à votre quotidien.</h2></div>
            <LocalChecklist items={whyChoose} />
            <div className="lp-local-details"><div><h3><Users size={18} aria-hidden="true" /> Accessibilité et accompagnement</h3><p>{selectedAccessibility}</p></div><div><h3><MapPin size={18} aria-hidden="true" /> Autour de {city.name}</h3><p>{selectedCoverage}</p></div></div>
          </section>

          <section className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Avant votre rendez-vous</p><h2>Réserver votre taxi conventionné<br />à {city.name}.</h2></div>
            <LocalParagraphs text={selectedBooking} />
            <ol className="lp-steps"><li><span>01</span><p>Communiquez votre adresse de départ, votre destination et l’horaire de votre rendez-vous.</p></li><li><span>02</span><p>Préparez votre prescription de transport et vos informations de prise en charge.</p></li><li><span>03</span><p>Confirmez les modalités et l’heure de départ avec notre équipe.</p></li></ol>
          </section>
          <LocalFAQ title={`Vos questions à ${city.name}`} items={faq} />
        </div>
        <LocalBookingAside locality={city.name} departmentName={department.name} departmentSlug={department.slug} />
      </div>

      <section id="villes-voisines" className="lp-neighbors"><div className="lp-container"><div className="lp-neighbors-heading"><div><p className="lp-eyebrow">Et autour de vous</p><h2>Nos taxis dans les villes voisines.</h2></div><Link className="lp-text-link" to={`/${department.slug}`}>Toutes les villes · {department.name} <ArrowRight size={16} aria-hidden="true" /></Link></div><CityLinks cities={nearbyCities} departmentSlug={department.slug} /><div className="lp-other-cities">{allNearbyCities.filter((neighbor) => !nearbyCities.some((nearby) => nearby.slug === neighbor.slug)).map((neighbor) => <Link key={neighbor.slug} to={`/${department.slug}/${neighbor.slug}`}>{neighbor.name}</Link>)}</div></div></section>

      <div className="lp-container lp-lower-content"><div className="lp-section-heading"><p className="lp-eyebrow">Pour vos autres déplacements</p><h2>Nos services complémentaires.</h2></div><div className="lp-complementary"><Link to="/taxis-gares-parisiennes"><TrainFront size={21} aria-hidden="true" />Gares parisiennes<ArrowRight size={15} aria-hidden="true" /></Link><Link to="/taxis-aeroports-parisiens"><Plane size={21} aria-hidden="true" />Aéroports parisiens<ArrowRight size={15} aria-hidden="true" /></Link><Link to="/faq"><ShieldCheck size={21} aria-hidden="true" />Questions sur la prise en charge<ArrowRight size={15} aria-hidden="true" /></Link></div></div>
      <LocalClosing locality={city.name} />
    </div>
  )
}
