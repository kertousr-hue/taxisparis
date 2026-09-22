import { useEffect, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import HomeCoverage from '../components/HomeCoverage';
import HomeBookingForm from '../components/HomeBookingForm';
import '../components/HomeCoverage.css';
import '../components/HomeResponsive.css';
import { generateJsonLD } from '../utils/seoData';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const hospitalSlides = [
  {
    image: '/images/hopital-pitie-salpetriere.webp',
    title: 'Hôpital Universitaire La Pitié-Salpêtrière',
    place: 'Paris 13e',
    alt: 'Entrée de l’Hôpital Universitaire La Pitié-Salpêtrière à Paris',
  },
  {
    image: '/images/hospitalisations-gustave-roussy.jpg',
    title: 'Hôpital Gustave Roussy',
    place: 'Villejuif',
    alt: 'Hôpital Gustave Roussy à Villejuif',
  },
  {
    image: '/images/hopital-bichat.webp',
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
    reservationService: 'consultation',
    text: 'Médecins spécialistes et généralistes',
    image: '/images/consultations-medicales.webp',
    alt: 'Consultation médicale',
  },
  {
    title: 'Hospitalisations',
    reservationService: 'hospitalisation',
    text: 'Entrées et sorties d’hôpital',
    image: '/images/hospitalisations-gustave-roussy.jpg',
    alt: 'Hôpital Gustave Roussy à Villejuif',
  },
  {
    title: 'Soins réguliers',
    reservationService: 'soins-reguliers',
    text: 'Dialyse, chimiothérapie, radiothérapie…',
    image: '/images/soins-reguliers.webp',
    alt: 'Soins médicaux réguliers',
  },
  {
    title: 'Examens médicaux',
    reservationService: 'examens',
    text: 'IRM, scanner, analyses…',
    image: '/images/examens-medicaux.webp',
    alt: 'Examen médical',
  },
];

const reviews = [
  { quote: '“Chauffeur ponctuel et très professionnel. Un service au top !”', name: 'Jean M. – 92' },
  { quote: '“Un accompagnement bienveillant et rassurant pour ma mère.”', name: 'Nadia R. – 75' },
  { quote: '“Réservation simple, chauffeur très aimable. Je recommande vivement.”', name: 'Patrick L. – 91' },
];

const Home: FC<HomeProps> = () => {
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
              src="/images/transport-medical-accompagnement.webp"
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="exact-home-hero-overlay" />

          <div className="exact-home-container exact-home-hero-inner">
            <div className="exact-home-hero-copy">
              <p className="exact-home-eyebrow">Taxi conventionné CPAM · 24h/24 · 7j/7</p>
              <h1>Taxi Conventionné &amp; VSL à Paris et en Île-de-France</h1>
              <p className="exact-home-hero-desktop-description">
                Transport médical assis agréé Sécurité sociale pour tous les rendez-vous médicaux :
                consultations, dialyse, chimiothérapie, radiothérapie et hospitalisations.
                Intervention rapide sur Paris (75), Essonne (91), Hauts-de-Seine (92),
                Seine-Saint-Denis (93) et Val-de-Marne (94).
              </p>
              <p className="exact-home-hero-mobile-description">
                Votre transport médical sur prescription, à Paris et en Île-de-France.
                Un accompagnement de votre domicile jusqu’à vos soins.
              </p>
              <div className="exact-home-mobile-actions">
                <Link to="/reservation-taxi-vsl"><CalendarDays size={18} aria-hidden="true" /> Réserver mon trajet</Link>
                <a href="tel:+33650366491"><Phone size={18} aria-hidden="true" /> Appeler</a>
              </div>

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
            <HomeBookingForm />
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
                  <Link className="home-service-link" to={`/reservation-taxi-vsl?service=${service.reservationService}`} aria-label={`Réserver un transport — ${service.title}`}>
                    <img src={service.image} alt={service.alt} loading="lazy" decoding="async" />
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                    </div>
                    <span className="home-service-arrow"><ArrowRight size={19} aria-hidden="true" /></span>
                  </Link>
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

        <HomeCoverage />

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
              src="/images/transport-medical-accompagnement.webp"
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
};

export default Home;
