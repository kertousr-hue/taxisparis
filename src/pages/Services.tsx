import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  Hospital,
  Microscope,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

const services = [
  { icon: Stethoscope, title: 'Consultation médicale', text: 'Tous vos rendez-vous spécialisés, examens et suivis médicaux.' },
  { icon: Activity, title: 'Dialyse', text: 'Des trajets réguliers organisés avec ponctualité et sérénité.' },
  { icon: HeartHandshake, title: 'Chimiothérapie', text: 'Un accompagnement humain pour chaque séance de traitement.' },
  { icon: Hospital, title: 'Hospitalisation', text: 'Entrées, sorties et transferts entre établissements de santé.' },
  { icon: Microscope, title: 'Examens médicaux', text: 'IRM, scanner, analyses, radiologie et autres examens prescrits.' },
  { icon: ShieldCheck, title: 'Transport conventionné CPAM', text: 'Selon prescription médicale et conditions de prise en charge.' },
];

export default function Services() {
  return (
    <>
      <SEOHead
        title="Services de transport médical | Taxi conventionné CPAM Paris IDF"
        description="Consultations, dialyse, chimiothérapie, radiothérapie, examens et hospitalisations en taxi conventionné CPAM à Paris et en Île-de-France."
        canonical="https://www.taxisparis-conventionnes.fr/services-transport-medical"
      />

      <div className="maquette-page">
        <section className="maquette-inner-hero maquette-services-hero">
          <div className="maquette-container">
            <p className="maquette-eyebrow">Nos services</p>
            <h1>Nos services de transport médical</h1>
            <p>Des solutions adaptées à tous vos besoins de santé, à Paris et en Île-de-France.</p>
          </div>
        </section>

        <section className="maquette-services-section maquette-services-page">
          <div className="maquette-container">
            <div className="maquette-services-grid">
              {services.map(({ icon: Icon, title, text }) => (
                <article key={title} className="maquette-service-card maquette-service-card-large">
                  <div className="maquette-service-visual"><Icon size={42} /></div>
                  <div>
                    <h2>{title}</h2>
                    <p>{text}</p>
                  </div>
                  <ArrowRight size={18} className="maquette-service-arrow" />
                </article>
              ))}
            </div>

            <div className="maquette-service-banner maquette-service-banner-page">
              <div className="maquette-driver"><Users size={35} /></div>
              <div>
                <strong>Des chauffeurs formés et bienveillants</strong>
                <span>Disponibles pour vous accompagner à chaque étape de votre trajet médical.</span>
              </div>
              <Link to="/reservation-taxi-vsl" className="maquette-gold-link">
                Réserver un transport <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="maquette-service-reassurance">
          <div className="maquette-container maquette-trust-grid">
            <article><span className="maquette-round-icon"><ShieldCheck size={20} /></span><div><strong>Conventionné CPAM</strong><span>Transport médical agréé</span></div></article>
            <article><span className="maquette-round-icon"><CalendarDays size={20} /></span><div><strong>Réservation simple</strong><span>En ligne ou par téléphone</span></div></article>
            <article><span className="maquette-round-icon"><Users size={20} /></span><div><strong>Accompagnement humain</strong><span>Une équipe à votre écoute</span></div></article>
            <article><span className="maquette-round-icon"><Hospital size={20} /></span><div><strong>Établissements de santé</strong><span>Paris et toute l’Île-de-France</span></div></article>
          </div>
        </section>

        <section className="maquette-final-cta">
          <div className="maquette-container">
            <div>
              <p className="maquette-script">Votre santé, notre route</p>
              <h2>Organisons votre prochain trajet médical</h2>
              <span>Notre équipe est disponible 24h/24 et 7j/7.</span>
            </div>
            <div className="maquette-final-actions">
              <Link to="/reservation-taxi-vsl" className="maquette-gold-button">Réserver maintenant</Link>
              <a href="tel:+33650366491" className="maquette-call-cta"><Phone size={17} /> 06 50 36 64 91</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
