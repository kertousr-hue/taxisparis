import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Building2,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { generateJsonLD } from '../utils/seoData';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const hospitalSlides = [
  {
    image: 'https://static.mediapart.fr/etmagine/article_google_discover/files/2026/02/19/260219-img-la-justice-confirme-l-exclusion-de-huit-mois-dune-infirmiere-qui-refuse-d-oter-son-calot.jpg',
    title: 'Hôpital Universitaire La Pitié-Salpêtrière',
    place: 'Paris 13e',
    alt: 'Entrée de l’Hôpital Universitaire La Pitié-Salpêtrière à Paris',
  },
  {
    image: 'https://sprintally.com/static/uploads/2017/09/Gustave-Roussy-Cancer-Center-France.jpg',
    title: 'Hôpital Gustave Roussy',
    place: 'Villejuif',
    alt: 'Hôpital Gustave Roussy à Villejuif',
  },
  {
    image: 'https://www.myhospitalnow.com/file_managament/storage/photo_gallery_files/1626_aleson6%40greendike.com/P_1626_1716296494_IMG_20210213_140431.jpg',
    title: 'Hôpital Bichat',
    place: 'Paris 18e',
    alt: 'Centre Hospitalier Universitaire Bichat à Paris',
  },
];

const reassurance = [
  { icon: Clock, title: 'Disponible 24h/24', text: 'et 7j/7' },
  { icon: Users, title: 'Chauffeurs formés', text: 'et bienveillants' },
  { icon: Car, title: 'Véhicules confortables', text: 'et adaptés' },
  { icon: ShieldCheck, title: 'Prise en charge', text: 'CPAM' },
  { icon: MapPin, title: 'Dans toute', text: 'l’Île-de-France' },
];

const services = [
  {
    title: 'Consultations médicales',
    text: 'Médecins spécialistes et généralistes',
    image: 'https://www.lifelink-medical.com/storage/2026/04/zahnimplantate-mrt_2-1024x647.jpg',
    alt: 'Consultation médicale',
  },
  {
    title: 'Hospitalisations',
    text: 'Entrées et sorties d’hôpital',
    image: '/gustave-roussy.webp',
    alt: 'Hôpital Gustave Roussy à Villejuif',
  },
  {
    title: 'Soins réguliers',
    text: 'Dialyse, chimiothérapie, radiothérapie…',
    image: 'https://www.promedour.com/cdn/shop/files/Care.png?v=1772415090&width=1536',
    alt: 'Soins médicaux réguliers',
  },
  {
    title: 'Examens médicaux',
    text: 'IRM, scanner, analyses…',
    image: 'https://www.trinityhealthma.org/sites/default/files/cards/imaging-mri.jpg',
    alt: 'Examen médical',
  },
];

const reviews = [
  { quote: '“Chauffeur ponctuel et très professionnel. Un service au top !”', name: 'Jean M. – 92' },
  { quote: '“Un accompagnement bienveillant et rassurant pour ma mère.”', name: 'Nadia R. – 75' },
  { quote: '“Réservation simple, chauffeur très aimable. Je recommande vivement.”', name: 'Patrick L. – 91' },
];

const zones = [
  ['75', 'Paris'],
  ['77', 'Seine-et-Marne'],
  ['78', 'Yvelines'],
  ['91', 'Essonne'],
  ['92', 'Hauts-de-Seine'],
  ['93', 'Seine-Saint-Denis'],
  ['94', 'Val-de-Marne'],
  ['95', 'Val-d’Oise'],
];

export default function Home({ onNavigate: _onNavigate }: HomeProps) {
  const [hospitalSlide, setHospitalSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHospitalSlide((current) => (current + 1) % hospitalSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const previousHospital = () => {
    setHospitalSlide((current) => (current - 1 + hospitalSlides.length) % hospitalSlides.length);
  };

  const nextHospital = () => {
    setHospitalSlide((current) => (current + 1) % hospitalSlides.length);
  };

  return (
    <>
      <SEOHead
        title="Taxi conventionne CPAM & VSL Paris Ile-de-France | Reservation 24h/24"
        description="Taxi conventionne CPAM et VSL a Paris et en Ile-de-France (75, 91, 92, 93, 94). Transport medical assis sur prescription vers consultations, dialyse, chimiotherapie, radiotherapie et hospitalisations. Reservation 24h/24, 7j/7."
        jsonLD={[generateJsonLD()]}
      />

      <div className="exact-home-page">
        <section className="exact-home-hero">
          <div className="exact-home-hero-photo" aria-hidden="true">
            <img
              src="https://www.rideinbliss.com/sablony/rideinbliss3/imagesrib/2026/senior/senior-transportation-big.jpg"
              alt=""
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="exact-home-hero-overlay" />

          <div className="exact-home-container exact-home-hero-inner">
            <div className="exact-home-hero-copy">
              <p className="exact-home-eyebrow">Taxi conventionné CPAM · 24h/24 · 7j/7</p>
              <h1>Taxi Conventionné &amp; VSL à Paris et en Île-de-France</h1>
              <p>
                Transport médical assis agréé Sécurité sociale pour tous les rendez-vous médicaux :
                consultations, dialyse, chimiothérapie, radiothérapie et hospitalisations.
                Intervention rapide sur Paris (75), Essonne (91), Hauts-de-Seine (92),
                Seine-Saint-Denis (93) et Val-de-Marne (94).
              </p>

              <div className="exact-home-hero-benefits">
                <span><ShieldCheck size={18} /> Conventionné<br />CPAM</span>
                <span><CalendarDays size={18} /> Prise en charge<br />100% ou partielle</span>
                <span><Car size={18} /> Chauffeurs<br />professionnels</span>
                <span><MapPin size={18} /> Dans toute<br />l’Île-de-France</span>
              </div>
            </div>

            <p className="exact-home-script">Parce que<br />votre santé<br />compte</p>
          </div>

          <div className="exact-home-container exact-home-booking-wrap">
            <div className="exact-home-booking-card">
              <h2>Réservez votre transport médical</h2>
              <div className="exact-home-tabs">
                <span className="active">Trajet simple</span>
                <span>Aller-retour</span>
                <span>Rendez-vous réguliers</span>
              </div>

              <div className="exact-home-booking-grid">
                <div><MapPin size={17} /><span><small>Adresse de départ</small>Votre adresse</span></div>
                <div><MapPin size={17} /><span><small>Destination</small>Hôpital, clinique, cabinet…</span></div>
                <div><CalendarDays size={17} /><span><small>Date du trajet</small>Choisir une date</span></div>
                <Link to="/reservation-taxi-vsl">Réserver maintenant <ArrowRight size={17} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="exact-home-reassurance">
          <div className="exact-home-container exact-home-reassurance-grid">
            {reassurance.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span><Icon size={20} /></span>
                <div><strong>{title}</strong><small>{text}</small></div>
              </article>
            ))}
          </div>
        </section>

        <section className="exact-home-human">
          <div
            className="exact-home-hospital-carousel"
            role="region"
            aria-roledescription="carrousel"
            aria-label="Établissements de santé partenaires"
          >
            <div className="exact-home-hospital-stack">
              {[-1, 0, 1].map((offset) => {
                const index = (hospitalSlide + offset + hospitalSlides.length) % hospitalSlides.length;
                const slide = hospitalSlides[index];
                const position = offset === 0 ? 'is-active' : offset < 0 ? 'is-prev' : 'is-next';

                return (
                  <article
                    key={`${slide.title}-${position}`}
                    className={`exact-home-hospital-slide ${position}`}
                    aria-hidden={offset !== 0}
                  >
                    <img src={slide.image} alt={offset === 0 ? slide.alt : ''} loading="lazy" decoding="async" />
                    <div className="exact-home-hospital-overlay">
                      <h3>{slide.title}</h3>
                      <span>{slide.place}</span>
                    </div>
                    {offset === 0 && (
                      <span className="exact-home-hospital-count">
                        {hospitalSlide + 1} / {hospitalSlides.length}
                      </span>
                    )}
                  </article>
                );
              })}

              <button
                type="button"
                className="exact-home-hospital-arrow is-left"
                onClick={previousHospital}
                aria-label="Photo d’hôpital précédente"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                className="exact-home-hospital-arrow is-right"
                onClick={nextHospital}
                aria-label="Photo d’hôpital suivante"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="exact-home-hospital-dots" aria-label="Choisir une photo d’hôpital">
              {hospitalSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={index === hospitalSlide ? 'active' : ''}
                  onClick={() => setHospitalSlide(index)}
                  aria-label={`Afficher ${slide.title}`}
                  aria-current={index === hospitalSlide ? 'true' : undefined}
                />
              ))}
            </div>
          </div>

          <div className="exact-home-human-copy">
            <p className="exact-home-section-kicker">Un service à vos côtés</p>
            <h2>Un accompagnement humain à chaque étape</h2>
            <p>
              Nous vous accompagnons avec bienveillance, de votre domicile jusqu’à votre
              établissement de soin. Notre objectif : vous offrir un trajet simple, sécurisé et confortable.
            </p>

            <div className="exact-home-human-list">
              <span><CheckCircle2 size={16} /> Trajets toutes distances</span>
              <span><CheckCircle2 size={16} /> Ponctualité et discrétion</span>
              <span><CheckCircle2 size={16} /> Aide à la montée et à l’installation</span>
              <span><CheckCircle2 size={16} /> Chauffeurs expérimentés</span>
              <span><CheckCircle2 size={16} /> Véhicules récents et adaptés</span>
              <span><CheckCircle2 size={16} /> Une équipe à votre écoute</span>
            </div>

            <Link to="/qui-sommes-nous" className="exact-home-dark-btn">
              Découvrir notre accompagnement <ArrowRight size={16} />
            </Link>
          </div>

          <aside className="exact-home-cpam-card">
            <div className="exact-home-cpam-icon"><ShieldCheck size={34} /></div>
            <strong>Conventionné CPAM</strong>
            <span>Transport médical pris en charge selon votre situation.</span>
            <small>Sur prescription médicale</small>
          </aside>
        </section>

        <section id="services" className="exact-home-services">
          <div className="exact-home-container">
            <div className="exact-home-section-title">
              <h2>Vers tous les établissements de santé</h2>
              <p>Hôpitaux, cliniques, cabinets médicaux et centres de soins en Île-de-France.</p>
            </div>

            <div className="exact-home-service-grid">
              {services.map((service) => (
                <article key={service.title}>
                  <img src={service.image} alt={service.alt} loading="lazy" decoding="async" />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <span><ArrowRight size={15} /></span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="exact-home-process">
          <div className="exact-home-container exact-home-process-grid">
            <div className="exact-home-process-intro">
              <h2>Une prise en charge simple et rapide</h2>
              <p>En 3 étapes, votre trajet est organisé.</p>
            </div>

            <div className="exact-home-process-step">
              <span>1</span>
              <CalendarDays size={22} />
              <div><strong>Réservez</strong><small>En ligne ou par téléphone</small></div>
            </div>
            <div className="exact-home-process-step">
              <span>2</span>
              <Car size={22} />
              <div><strong>Nous organisons</strong><small>Votre trajet avec un chauffeur conventionné</small></div>
            </div>
            <div className="exact-home-process-step">
              <span>3</span>
              <HeartHandshake size={22} />
              <div><strong>Vous voyagez</strong><small>En toute sérénité</small></div>
            </div>
          </div>
        </section>

        <section className="exact-home-coverage">
          <div className="exact-home-container exact-home-coverage-grid">
            <div className="exact-home-map" aria-label="Carte stylisée de l’Île-de-France">
              <svg viewBox="0 0 240 160" role="img">
                <path d="M41 31 78 18 112 28 137 16 179 31 203 59 198 95 172 123 131 145 94 135 61 145 32 119 20 82Z" fill="#e6f1f8" stroke="#bdd4e5" strokeWidth="2"/>
                <path d="M101 55 131 50 149 65 145 91 122 102 97 91 88 70Z" fill="#d7e7f2" stroke="#bdd4e5" strokeWidth="1.5"/>
                <path d="M103 76 120 67 136 77 130 95 111 99 98 89Z" fill="#c28f3f" opacity=".85"/>
                {[
                  [87,44,'95'],[170,62,'93'],[187,95,'77'],[160,112,'94'],
                  [112,126,'91'],[68,105,'78'],[73,72,'92'],[117,86,'75']
                ].map(([x,y,label]) => <text key={label} x={x as number} y={y as number} fontSize="10" fontWeight="700" fill="#0c3a63">{label}</text>)}
              </svg>
            </div>

            <div className="exact-home-coverage-copy">
              <p className="exact-home-section-kicker">Dans toute l’Île-de-France</p>
              <h2>Notre zone de couverture</h2>
              <p>Nous intervenons dans tous les départements d’Île-de-France et dans plus de 193 villes.</p>
              <Link to="/zones-desservies" className="exact-home-gold-btn">
                Voir toutes les villes desservies <ArrowRight size={16} />
              </Link>
            </div>

            <div className="exact-home-zone-list">
              {zones.map(([code, name]) => (
                <span key={code}><MapPin size={14} /> {name} ({code})</span>
              ))}
            </div>
          </div>
        </section>

        <section className="exact-home-reviews">
          <div className="exact-home-container">
            <h2>Ils nous font confiance</h2>
            <div className="exact-home-review-grid">
              {reviews.map((review) => (
                <article key={review.name}>
                  <p>{review.quote}</p>
                  <div className="exact-home-stars">★★★★★</div>
                  <strong>{review.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="exact-home-bottom-cta">
          <div className="exact-home-bottom-car">
            <img
              src="https://www.ouistars.com/uploads/9745/Phoenix_09_Photorealistic_cinematic_hero_image_of_a_luxury_bla_2.jpg?locale=es"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="exact-home-container exact-home-bottom-inner">
            <div className="exact-home-bottom-copy">
              <h2>Besoin d’un transport médical ?</h2>
              <p>Notre équipe est à votre écoute 24h/24 et 7j/7.</p>
            </div>
            <div className="exact-home-bottom-actions">
              <a href="tel:+33650366491"><Phone size={17} /> 06 50 36 64 91</a>
              <Link to="/reservation-taxi-vsl">Réserver en ligne <ArrowRight size={16} /></Link>
            </div>
            <p className="exact-home-bottom-script">Ensemble<br />vers une santé accessible</p>
          </div>
        </section>
      </div>
    </>
  );
}
