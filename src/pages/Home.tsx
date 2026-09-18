import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Building2,
  CalendarDays,
  Car,
  CheckCircle2,
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

const trustItems = [
  { icon: Stethoscope, title: 'Tous types de trajets médicaux' },
  { icon: Car, title: 'Véhicules confortables et adaptés' },
  { icon: FileText, title: 'Prise en charge CPAM' },
  { icon: MapPin, title: 'Dans toute l’Île-de-France' },
];

const commitments = [
  { icon: ShieldCheck, title: 'Sécurité', text: 'et ponctualité' },
  { icon: Car, title: 'Confort', text: 'et véhicules adaptés' },
  { icon: Users, title: 'Équipe à l’écoute', text: 'et bienveillante' },
  { icon: Clock, title: 'Disponibilité', text: '24h/24 · 7j/7' },
];

const services = [
  {
    title: 'Consultations médicales',
    text: 'Tous vos rendez-vous spécialisés',
    image: 'https://www.lifelink-medical.com/storage/2026/04/zahnimplantate-mrt_2-1024x647.jpg',
  },
  {
    title: 'Hospitalisations',
    text: 'À l’aller comme au retour',
    image: 'https://www.melstahospitals.com/images/facilities/facilities-hero.webp',
  },
  {
    title: 'Soins réguliers',
    text: 'Traitements et séances organisés',
    image: 'https://www.promedour.com/cdn/shop/files/Care.png?v=1772415090&width=1536',
  },
  {
    title: 'Examens médicaux',
    text: 'IRM, scanner, analyses',
    image: 'https://www.trinityhealthma.org/sites/default/files/cards/imaging-mri.jpg',
  },
];

export default function Home({ onNavigate: _onNavigate }: HomeProps) {
  return (
    <>
      <SEOHead
        title="Taxi conventionne CPAM & VSL Paris Ile-de-France | Reservation 24h/24"
        description="Taxi conventionne CPAM et VSL a Paris et en Ile-de-France (75, 91, 92, 93, 94). Transport medical assis sur prescription vers consultations, dialyse, chimiotherapie, radiotherapie et hospitalisations. Reservation 24h/24, 7j/7."
        jsonLD={[generateJsonLD()]}
      />

      <div className="home2-page">
        <section className="home2-hero">
          <div className="home2-container home2-hero-grid">
            <div className="home2-hero-copy">
              <p className="home2-eyebrow">Transport médical conventionné</p>
              <h1>Vos rendez-vous médicaux<br />en toute sérénité</h1>
              <p className="home2-hero-lead">
                À Paris et en Île-de-France, des chauffeurs conventionnés à vos côtés
                pour tous vos trajets de santé.
              </p>

              <div className="home2-hero-points">
                <span><ShieldCheck size={17} /> Conventionné<br />CPAM</span>
                <span><FileText size={17} /> Prise en charge<br />de A à Z</span>
                <span><Car size={17} /> Chauffeurs<br />professionnels</span>
                <span><Users size={17} /> Accompagnement<br />humain</span>
              </div>

              <div className="home2-hero-actions">
                <Link to="/reservation-taxi-vsl" className="home2-primary-btn">
                  Réserver mon transport <ArrowRight size={17} />
                </Link>
                <a href="tel:+33650366491" className="home2-hero-phone">
                  <Phone size={17} /> 06 50 36 64 91
                </a>
              </div>
              <p className="home2-availability"><Clock size={14} /> Disponible 24h/24 · 7j/7</p>
            </div>

            <div className="home2-hero-photo">
              <img
                src="https://www.rideinbliss.com/sablony/rideinbliss3/imagesrib/2026/senior/senior-transportation-big.jpg"
                alt="Chauffeur accompagnant une personne âgée"
                loading="eager"
                decoding="async"
              />
              <div className="home2-hero-photo-shade" />
              <div className="home2-eiffel-mark" aria-hidden="true">A</div>
              <p className="home2-script-note">Parce que<br />votre santé compte</p>
            </div>
          </div>

          <div className="home2-container home2-reservation-wrap">
            <div className="home2-reservation">
              <div className="home2-reservation-main">
                <div className="home2-reservation-heading">
                  <div>
                    <h2>Réservez votre transport médical</h2>
                    <p>Simple, rapide et sécurisé</p>
                  </div>
                </div>

                <div className="home2-booking-tabs">
                  <span className="is-active">Trajet simple</span>
                  <span>Aller-retour</span>
                  <span>Rendez-vous régulier</span>
                </div>

                <div className="home2-booking-fields">
                  <div><MapPin size={16} /><span><small>Adresse de départ</small>Votre adresse</span></div>
                  <div><MapPin size={16} /><span><small>Destination</small>Hôpital, clinique, cabinet…</span></div>
                  <div><CalendarDays size={16} /><span><small>Date du trajet</small>Choisir une date</span></div>
                  <Link to="/reservation-taxi-vsl" aria-label="Continuer vers la réservation"><ArrowRight size={20} /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home2-reassurance">
          <div className="home2-container home2-reassurance-grid">
            {trustItems.map(({ icon: Icon, title }) => (
              <article key={title}>
                <span><Icon size={20} /></span>
                <strong>{title}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="home2-human">
          <div className="home2-container home2-human-grid">
            <div className="home2-human-photo">
              <img
                src="https://ber.berlin-airport.de/en/flying/airlines-ziele/inspiration-urlaub/dest-165-paris.thumb.800.480.png?ck=1761569582"
                alt="Paris et la tour Eiffel"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="home2-human-copy">
              <p className="home2-section-kicker">Un service à vos côtés</p>
              <h2>Un accompagnement humain<br />à chaque étape</h2>
              <p>
                Nos équipes vous accompagnent avec bienveillance pour vous garantir
                un transport sûr, confortable et serein.
              </p>

              <div className="home2-testimonial">
                <p>« Un service fiable, des chauffeurs attentionnés.<br />Je me sens en confiance à chaque trajet. »</p>
                <small>Marie D. · Paris</small>
              </div>

              <Link to="/qui-sommes-nous" className="home2-dark-btn">
                Découvrir notre engagement <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="home2-commitments">
          <div className="home2-container">
            <div className="home2-section-heading">
              <h2>Nos engagements pour votre santé</h2>
            </div>

            <div className="home2-commitment-grid">
              {commitments.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <span><Icon size={22} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="home2-services">
          <div className="home2-container">
            <div className="home2-section-heading">
              <h2>Vers tous les établissements de santé</h2>
            </div>

            <div className="home2-service-grid">
              {services.map((service) => (
                <article key={service.title}>
                  <img src={service.image} alt="" loading="lazy" decoding="async" />
                  <div>
                    <strong>{service.title}</strong>
                    <span>{service.text}</span>
                  </div>
                  <ArrowRight size={15} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home2-final">
          <div className="home2-container home2-final-card">
            <div className="home2-final-visual">
              <img
                src="https://www.ouistars.com/uploads/9745/Phoenix_09_Photorealistic_cinematic_hero_image_of_a_luxury_bla_2.jpg?locale=es"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="home2-final-copy">
              <h2>Réservez dès maintenant</h2>
              <p>Notre équipe est à votre écoute pour organiser votre trajet.</p>
            </div>

            <div className="home2-final-actions">
              <Link to="/reservation-taxi-vsl" className="home2-primary-btn">
                Réserver en ligne <ArrowRight size={16} />
              </Link>
              <a href="tel:+33650366491" className="home2-outline-btn">
                <Phone size={16} /> 06 50 36 64 91
              </a>
            </div>

            <p className="home2-final-script">Votre santé<br />Notre route</p>
          </div>
        </section>
      </div>
    </>
  );
}
