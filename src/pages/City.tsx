import { useParams, Link } from 'react-router-dom'
import { ArrowRight, MapPin, ShieldCheck, Building2, TrainFront, Plane, Users } from 'lucide-react'
import { CityLinks } from '../components/CityDirectory'
import { LocalBookingAside, LocalChecklist, LocalClosing, LocalFAQ, LocalHero, LocalParagraphs, LocalSectionNav, LocalTrust } from '../components/LocalPageUI'
import citiesData from '../data/cities.json'
import SEOHead from '../components/SEOHead'
import { citySeoOverrides } from '../data/cityLocalSeo'


type CityContentRecord = {
  name: string;
  slug: string;
  postalCode: string;
  localText?: string;
  nearHospitals?: string[];
  nearStations?: string[];
  nearCities?: string[];
};

/**
 * Texte utile à la réservation, adapté à chaque commune et à ses destinations.
 * Les données éditoriales locales sont explicites : aucune permutation de
 * phrases, aucune promesse de remboursement ou de disponibilité automatique.
 */
function generateLocalContent(city: CityContentRecord, department: { name: string; slug: string }) {
  const local = citySeoOverrides[city.slug];
  const hospitals = (local?.hospitals?.length ? local.hospitals : city.nearHospitals || [])
    .map((hospital) => hospital.trim())
    .filter(Boolean)
    .slice(0, 4);
  const primaryDestination = hospitals[0] || "l'établissement de santé de votre choix";
  const destinationDetails = hospitals.length > 0
    ? "Parmi les destinations à préciser lors de votre demande : " + hospitals.join(", ") + "."
    : "Nous étudions votre trajet vers l'établissement de santé indiqué sur votre rendez-vous.";
  const context = local?.context || (
    "Depuis " + city.name + ", dans le département " + department.name +
    ", l'organisation dépend du lieu exact de prise en charge et de l'entrée de votre établissement de santé. " +
    "Une adresse complète permet de préparer au mieux votre déplacement."
  );
  const paragraph = [
    "Vous cherchez un taxi conventionné au départ de " + city.name + " (" + city.postalCode +
    ") ? Notre service organise des transports assis pour des rendez-vous médicaux, des examens ou des soins réguliers, sous réserve de disponibilité et des conditions de prise en charge.",
    destinationDetails + " Votre destination ne figure pas dans cette liste ? Vous pouvez aussi nous communiquer un autre hôpital, une clinique ou un centre médical.",
    context,
    "Le remboursement éventuel par l'Assurance Maladie dépend notamment de la prescription médicale et de votre situation. Le taux de droit commun est de 55 %, avec une prise en charge pouvant atteindre 100 % dans certains cas ; le tiers payant ne s'applique que si les conditions sont réunies."
  ].join("\n\n");
  const organizationText = [
    "Pour un départ depuis " + city.name + ", communiquez votre adresse complète, l'horaire auquel vous devez être sur place, le nom du service hospitalier et, si possible, le bâtiment ou l'entrée. Ces informations servent à fixer une heure de prise en charge adaptée au trajet vers " + primaryDestination + ".",
    "Pour un aller-retour ou des rendez-vous récurrents, indiquez les jours prévus et, si elle est connue, l'heure de fin des soins. La disponibilité du retour et les modalités de prise en charge sont à confirmer avant le transport."
  ].join("\n\n");
  const faq = [
    {
      q: "Comment réserver un taxi conventionné depuis " + city.name + " ?",
      a: "Indiquez les adresses de départ et d'arrivée, la date de vos soins et l'heure du rendez-vous dans notre formulaire ou au 06 50 36 64 91. Nous vous confirmons la disponibilité et l'heure de prise en charge."
    },
    {
      q: "Quels sont les documents nécessaires pour le transport ?",
      a: "Selon votre situation, préparez la prescription médicale de transport, votre carte Vitale et les documents relatifs à votre prise en charge. La prescription ne garantit pas à elle seule le remboursement ni le tiers payant."
    },
    {
      q: "La CPAM rembourse-t-elle le trajet depuis " + city.name + " ?",
      a: "Le transport prescrit peut être remboursé sous conditions : 55 % en règle générale, jusqu'à 100 % dans les cas prévus par l'Assurance Maladie. Le tiers payant dépend de vos droits et des modalités de facturation."
    },
    {
      q: "Quels établissements desservez-vous depuis " + city.name + " ?",
      a: (hospitals.length ? "Vous pouvez demander un trajet vers " + hospitals.join(", ") + ". " : "") +
        "Communiquez l'adresse exacte de l'établissement et l'heure du rendez-vous pour vérifier l'organisation possible."
    }
  ];
  const frequentTrips = (hospitals.length ? hospitals : [primaryDestination])
    .map((hospital, index) => ({
      from: city.name,
      to: hospital,
      description: [
        "Consultations et examens : préciser le service et l'heure de convocation.",
        "Soins réguliers : transmettre les jours et horaires des rendez-vous.",
        "Hospitalisation ou sortie : confirmer les modalités de prise en charge.",
        "Trajet aller-retour : vérifier l'horaire de retour avec notre équipe."
      ][index % 4]
    }));
  const whyChoose = [
    "Demande de réservation en ligne ou par téléphone",
    "Adresse et destination hospitalière précisées à l'avance",
    "Organisation du trajet selon l'horaire de convocation",
    "Informations sur la prescription et la prise en charge CPAM",
    "Possibilité de demander un aller-retour ou des trajets réguliers"
  ];
  const selectedAccessibility =
    "Signalez dès la réservation toute difficulté pour monter dans le véhicule, marcher ou transporter un équipement d'aide à la mobilité. Les possibilités d'accompagnement et le type de véhicule doivent être confirmés avant la course.";
  const selectedCoverage = context;
  const selectedBooking =
    "Pour réserver depuis " + city.name + ", précisez votre adresse (" + city.postalCode +
    "), votre établissement de destination, la date et l'horaire de convocation. Nous définirons ensemble l'heure de départ, puis les modalités de retour le cas échéant.";
  return {
    paragraph,
    organizationText,
    faq,
    frequentTrips,
    whyChoose,
    selectedAccessibility,
    selectedCoverage,
    selectedBooking,
    hospitals
  };
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
  const heroName = city.name.startsWith('Le ') ? city.name.slice(3) : city.name
  const heroPreposition = city.name.startsWith('Le ') ? 'au' : 'à'
  const cityLocation = `${heroPreposition} ${heroName}`
  const localSeo = citySeoOverrides[city.slug]

  const seoTitle = `Taxi Conventionné ${city.name} (${city.postalCode}) | CPAM | Transport Médical 24h/24`

  const {
    paragraph,
    organizationText,
    faq,
    frequentTrips,
    whyChoose,
    selectedAccessibility,
    selectedCoverage,
    selectedBooking,
    hospitals
  } = generateLocalContent(city, department)

  const metaDescription = `Taxi conventionné ${cityLocation} (${city.postalCode}) pour vos déplacements médicaux. ${hospitals[0] ? `Trajets vers ${hospitals[0]}. ` : ''}Réservation en ligne, prise en charge CPAM selon conditions.`

  const nearbyCities = localSeo?.nearby?.length
    ? department.cities.filter((c) => localSeo.nearby.includes(c.slug))
    : city.nearCities
    ? department.cities.filter((c) => city.nearCities.includes(c.slug))
    : department.cities.filter((c) => c.slug !== citySlug).slice(0, 5)

  const allNearbyCities = department.cities
    .filter((c) => c.slug !== citySlug)
    .slice(0, 8)

  const jsonLD = [
    {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      "@id": baseUrl + "#taxi-service",
      "name": "Taxis Paris Conventionnés",
      "url": baseUrl,
      "telephone": "+33650366491",
      "description": "Service de taxi conventionné au départ de " + city.name +
        ", transport médical assis sur prescription et prise en charge selon éligibilité.",
      "areaServed": {
        "@type": "City",
        "name": city.name,
        "postalCode": city.postalCode,
        "containedInPlace": { "@type": "AdministrativeArea", "name": department.name }
      },
      "serviceType": "Taxi conventionné pour transport assis professionnalisé"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map((entry) => ({
        "@type": "Question",
        "name": entry.q,
        "acceptedAnswer": { "@type": "Answer", "text": entry.a }
      }))
    }
  ];

  return (
    <div className="local-page local-page-city">
      <SEOHead title={seoTitle} description={metaDescription} canonical={baseUrl} jsonLD={jsonLD} />
      <LocalHero name={heroName} preposition={heroPreposition} code={department.code} citySlug={city.slug} postalCode={city.postalCode} description={`Vos déplacements médicaux depuis ${city.name} vers les hôpitaux et centres de soins de Paris et d’Île-de-France. Prise en charge CPAM possible selon votre prescription et votre situation.`} breadcrumbs={[{ label: 'Zones desservies', href: '/zones-desservies' }, { label: department.name, href: `/${department.slug}` }, { label: city.name }]} />
      <LocalTrust />
      <LocalSectionNav items={[{ id: 'votre-transport', label: 'Votre transport' }, { id: 'trajets', label: 'Trajets & hôpitaux' }, { id: 'organisation', label: 'Organisation' }, { id: 'questions', label: 'Vos questions' }, { id: 'villes-voisines', label: 'Autres communes' }]} />

      <div className="lp-container lp-content">
        <div className="lp-main-column">
          <section id="votre-transport" className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Départ : {city.name}</p><h2>Votre transport médical,<br />avec attention.</h2></div>
            <LocalParagraphs text={paragraph} lead />
          </section>

          <section id="trajets" className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Du domicile à vos soins</p><h2>Vos trajets depuis {city.name}.</h2><p>Exemples de destinations à préciser lors de la réservation, selon la disponibilité.</p></div>
            <div className="lp-trips">{frequentTrips.map((trip, index) => <article className="lp-trip" key={`${trip.to}-${index}`}><div className="lp-trip-path"><i aria-hidden="true" /><span><small>Départ</small><strong>{trip.from}</strong></span><i aria-hidden="true" /><span><small>Destination</small><strong>{trip.to}</strong></span></div><p>{trip.description}</p></article>)}</div>
            <div className="lp-care-note">Votre établissement ne figure pas dans cette liste ? Contactez-nous pour organiser un trajet adapté à votre rendez-vous et à votre prescription.</div>
          </section>

          {hospitals.length > 0 && <section className="lp-section"><div className="lp-section-heading"><p className="lp-eyebrow">Vos établissements</p><h2>Les établissements proposés<br />depuis {city.name}.</h2></div><ul className="lp-hospital-list">{hospitals.map((hospital) => <li key={hospital}><Building2 size={18} aria-hidden="true" /><span>{hospital}</span></li>)}</ul></section>}

          <section id="organisation" className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Un trajet bien préparé</p><h2>L’organisation de votre<br />transport {cityLocation}.</h2></div>
            <LocalParagraphs text={organizationText} />
            <Link to={`/${department.slug}`} className="lp-text-link">Découvrir tout le département {department.name} <ArrowRight size={16} aria-hidden="true" /></Link>
          </section>

          <section className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">À vos côtés</p><h2>Un accompagnement<br />adapté à votre quotidien.</h2></div>
            <LocalChecklist items={whyChoose} />
            <div className="lp-local-details"><div><h3><Users size={18} aria-hidden="true" /> Accessibilité et accompagnement</h3><p>{selectedAccessibility}</p></div><div><h3><MapPin size={18} aria-hidden="true" /> Dans le secteur de {city.name}</h3><p>{selectedCoverage}</p></div></div>
          </section>

          <section className="lp-section">
            <div className="lp-section-heading"><p className="lp-eyebrow">Avant votre rendez-vous</p><h2>Réserver votre taxi conventionné<br />{cityLocation}.</h2></div>
            <LocalParagraphs text={selectedBooking} />
            <ol className="lp-steps"><li><span>01</span><p>Communiquez votre adresse de départ, votre destination et l’horaire de votre rendez-vous.</p></li><li><span>02</span><p>Préparez votre prescription de transport et vos informations de prise en charge.</p></li><li><span>03</span><p>Confirmez les modalités et l’heure de départ avec notre équipe.</p></li></ol>
          </section>
          <LocalFAQ title={`Vos questions ${cityLocation}`} items={faq} />
        </div>
        <LocalBookingAside locality={city.name} departmentName={department.name} departmentSlug={department.slug} />
      </div>

      <section id="villes-voisines" className="lp-neighbors"><div className="lp-container"><div className="lp-neighbors-heading"><div><p className="lp-eyebrow">Et autour de vous</p><h2>Nos taxis dans d’autres communes.</h2></div><Link className="lp-text-link" to={`/${department.slug}`}>Toutes les villes · {department.name} <ArrowRight size={16} aria-hidden="true" /></Link></div><CityLinks cities={nearbyCities} departmentSlug={department.slug} /><div className="lp-other-cities">{allNearbyCities.filter((neighbor) => !nearbyCities.some((nearby) => nearby.slug === neighbor.slug)).map((neighbor) => <Link key={neighbor.slug} to={`/${department.slug}/${neighbor.slug}`}>{neighbor.name}</Link>)}</div></div></section>

      <div className="lp-container lp-lower-content"><div className="lp-section-heading"><p className="lp-eyebrow">Pour vos autres déplacements</p><h2>Nos services complémentaires.</h2></div><div className="lp-complementary"><Link to="/taxis-gares-parisiennes"><TrainFront size={21} aria-hidden="true" />Gares parisiennes<ArrowRight size={15} aria-hidden="true" /></Link><Link to="/taxis-aeroports-parisiens"><Plane size={21} aria-hidden="true" />Aéroports parisiens<ArrowRight size={15} aria-hidden="true" /></Link><Link to="/faq"><ShieldCheck size={21} aria-hidden="true" />Questions sur la prise en charge<ArrowRight size={15} aria-hidden="true" /></Link></div></div>
      <LocalClosing locality={city.name} />
    </div>
  )
}
