import { Link } from 'react-router-dom';
import {
  Activity,
  Accessibility,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Hospital,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { generateJsonLD } from '../utils/seoData';
import heroVehicle from '../assets/image.png';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const services = [
  { icon: Stethoscope, label: 'Rendez-vous médicaux' },
  { icon: Hospital, label: 'Hospitalisations' },
  { icon: Activity, label: 'Chimiothérapie' },
  { icon: Accessibility, label: 'Radiothérapie' },
  { icon: HeartHandshake, label: 'Transports de longue durée' },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Conventionné Sécurité Sociale',
    text: 'Prise en charge selon vos droits',
  },
  {
    icon: Clock3,
    title: 'Disponible 24h/24 - 7j/7',
    text: 'Même les week-ends et jours fériés',
  },
  {
    icon: MapPin,
    title: "Toute l’Île-de-France",
    text: 'Paris, 77, 78, 91, 92, 93, 94, 95 et villes voisines',
  },
  {
    icon: Users,
    title: 'Chauffeurs professionnels',
    text: 'Ponctualité, écoute et discrétion',
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

      <div className="taxinea-home">
        <section className="taxinea-hero" aria-label="Présentation TAXINÉA">
          <div className="taxinea-hero-bg" aria-hidden="true" />
          <div className="taxinea-hero-orbit taxinea-hero-orbit-one" aria-hidden="true" />
          <div className="taxinea-hero-orbit taxinea-hero-orbit-two" aria-hidden="true" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="taxinea-hero-grid">
              <div className="taxinea-hero-copy">
                <p className="taxinea-eyebrow">Votre santé, notre priorité</p>
                <h1>
                  TAXIS et VSL<br />
                  <span>conventionnés agréés</span><br />
                  Sécurité Sociale
                </h1>
                <p className="taxinea-hero-lead">
                  Pour tous vos déplacements dans les centres hospitaliers d’Île-de-France.
                </p>

                <div className="taxinea-hero-features" aria-label="Avantages du service">
                  <div>
                    <ShieldCheck size={27} aria-hidden="true" />
                    <span>Conventionné<br />CPAM</span>
                  </div>
                  <div>
                    <Clock3 size={27} aria-hidden="true" />
                    <span>24h/24<br />7j/7</span>
                  </div>
                  <div>
                    <MapPin size={27} aria-hidden="true" />
                    <span>Île-de-France<br />et départements voisins</span>
                  </div>
                </div>

                <div className="taxinea-hero-actions">
                  <Link to="/reservation-taxi-vsl" className="taxinea-primary-cta">
                    <CalendarDays size={20} aria-hidden="true" />
                    Réserver un transport
                    <ArrowRight size={19} aria-hidden="true" />
                  </Link>
                  <a href="tel:+33650366491" className="taxinea-secondary-cta" aria-label="Appeler le 06 50 36 64 91">
                    <Phone size={20} aria-hidden="true" />
                    06 50 36 64 91
                  </a>
                </div>
              </div>

              <div className="taxinea-hero-visual" aria-label="Véhicule TAXINÉA">
                <div className="taxinea-hospital-sign" aria-hidden="true">
                  <span>H</span>
                  <strong>HÔPITAL</strong>
                </div>
                <div className="taxinea-hero-image-frame">
                  <img
                    src={heroVehicle}
                    alt="Véhicule TAXINÉA pour le transport médical conventionné"
                    width="1264"
                    height="784"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="taxinea-vehicle-badge" aria-hidden="true">
                    <ShieldCheck size={18} />
                    TAXINÉA
                  </div>
                </div>
                <p className="taxinea-handwritten" aria-hidden="true">Votre santé,<br />notre priorité</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="taxinea-services-strip" aria-labelledby="services-title">
          <div className="container mx-auto px-4">
            <h2 id="services-title" className="sr-only">Nos services de transport médical</h2>
            <div className="taxinea-service-grid">
              {services.map(({ icon: Icon, label }) => (
                <div key={label} className="taxinea-service-card">
                  <Icon size={34} aria-hidden="true" />
                  <strong>{label}</strong>
                </div>
              ))}
            </div>
            <p className="taxinea-service-caption">
              Un service fiable, humain et sécurisé pour tous vos déplacements médicaux.
            </p>
          </div>
        </section>

        <section className="taxinea-why" aria-labelledby="why-title">
          <div className="container mx-auto px-4">
            <div className="taxinea-section-title">
              <span aria-hidden="true" />
              <h2 id="why-title">Pourquoi choisir TAXINÉA ?</h2>
              <span aria-hidden="true" />
            </div>

            <div className="taxinea-reasons-grid">
              {reasons.map(({ icon: Icon, title, text }) => (
                <article key={title} className="taxinea-reason-card">
                  <span className="taxinea-reason-icon" aria-hidden="true">
                    <Icon size={28} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="taxinea-medical-cta" aria-labelledby="cta-title">
          <div className="container mx-auto px-4">
            <div className="taxinea-medical-cta-inner">
              <div>
                <h2 id="cta-title">Besoin d’un transport médical ?</h2>
                <p>Notre équipe est à votre écoute 24h/24 et 7j/7.</p>
                <div className="taxinea-medical-cta-actions">
                  <a href="tel:+33650366491" className="taxinea-primary-cta">
                    <Phone size={19} aria-hidden="true" />
                    06 50 36 64 91
                  </a>
                  <Link to="/reservation-taxi-vsl" className="taxinea-secondary-cta">
                    Réserver en ligne
                  </Link>
                </div>
              </div>
              <div className="taxinea-care-visual" aria-hidden="true">
                <HeartHandshake size={86} />
                <span>Plus qu’un transport,<br />un accompagnement</span>
              </div>
            </div>
          </div>
        </section>

        <section className="taxinea-trust-row" aria-label="Engagements TAXINÉA">
          <div className="container mx-auto px-4">
            <div className="taxinea-trust-grid">
              <div>
                <CheckCircle2 size={31} aria-hidden="true" />
                <strong>Service agréé<br />et conventionné</strong>
              </div>
              <div>
                <Users size={31} aria-hidden="true" />
                <strong>Une équipe<br />à votre écoute</strong>
              </div>
              <div>
                <HeartHandshake size={31} aria-hidden="true" />
                <strong>Des patients<br />satisfaits</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
