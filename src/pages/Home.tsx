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
  { icon: ShieldCheck, title: 'Conventionné CPAM', text: 'Transport médical agréé' },
  { icon: Car, title: 'Véhicules confortables', text: 'Adaptés à vos trajets' },
  { icon: FileText, title: 'Prise en charge CPAM', text: 'Selon prescription et situation' },
  { icon: MapPin, title: 'Toute l’Île-de-France', text: 'Paris et départements proches' },
];

const commitments = [
  { icon: ShieldCheck, title: 'Sécurité', text: 'Une prise en charge sérieuse et ponctuelle.' },
  { icon: Car, title: 'Confort', text: 'Des véhicules adaptés à vos trajets médicaux.' },
  { icon: Users, title: 'Équipe à l’écoute', text: 'Des chauffeurs attentionnés et bienveillants.' },
  { icon: Clock, title: 'Disponibilité', text: 'Service organisé 24h/24 et 7j/7.' },
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
              <h1>Taxi conventionné &amp; VSL<br />à Paris et en Île-de-France</h1>
              <p className="home2-hero-lead">
                Vos rendez-vous médicaux, notre priorité. Un transport sûr, confortable et humain,
                avec des chauffeurs conventionnés à vos côtés pour tous vos trajets de santé.
              </p>

              <div className="home2-hero-points">
                <span><ShieldCheck size={17} /> Conventionné CPAM</span>
                <span><CheckCircle2 size={17} /> Prise en charge à domicile</span>
                <span><Users size={17} /> Chauffeurs professionnels</span>
                <span><HeartHandshake size={17} /> Accompagnement humain</span>
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

            <div className="home2-hero-photo" aria-label="Chauffeur accompagnant une patiente">
              <div className="home2-photo-paris" aria-hidden="true">
                <span className="home2-photo-tower">A</span>
                <span className="home2-photo-building"><Building2 size={50} /></span>
              </div>
              <div className="home2-photo-people" aria-hidden="true">
                <span className="home2-driver"><Users size={36} /></span>
                <span className="home2-patient"><HeartHandshake size={31} /></span>
              </div>
              <div className="home2-photo-car" aria-hidden="true">
                <span>TAXI</span>
                <Car size={148} strokeWidth={1.25} />
              </div>
              <p className="home2-script-note">Parce que votre santé compte</p>
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
                  <div className="home2-booking-tabs">
                    <span className="is-active">Trajet simple</span>
                    <span>Aller-retour</span>
                    <span>Rendez-vous régulier</span>
                  </div>
                </div>

                <div className="home2-booking-fields">
                  <div><MapPin size={16} /><span><small>Adresse de départ</small>Votre adresse</span></div>
                  <div><Building2 size={16} /><span><small>Destination</small>Hôpital, clinique, cabinet…</span></div>
                  <div><CalendarDays size={16} /><span><small>Date du trajet</small>Choisir une date</span></div>
                  <Link to="/reservation-taxi-vsl" aria-label="Continuer vers la réservation"><ArrowRight size={20} /></Link>
                </div>
              </div>

              <aside className="home2-help-card">
                <span className="home2-help-avatar"><Users size={24} /></span>
                <div>
                  <strong>Une question ?</strong>
                  <small>Notre équipe vous écoute</small>
                  <a href="tel:+33650366491"><Phone size={14} /> 06 50 36 64 91</a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="home2-reassurance">
          <div className="home2-container home2-reassurance-grid">
            {trustItems.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span><Icon size={20} /></span>
                <div><strong>{title}</strong><small>{text}</small></div>
              </article>
            ))}
          </div>
        </section>

        <section className="home2-human">
          <div className="home2-container home2-human-grid">
            <div className="home2-human-photo" aria-label="Paris et accompagnement médical">
              <div className="home2-human-skyline" aria-hidden="true">
                <span>A</span>
                <span><Building2 size={44} /></span>
              </div>
              <div className="home2-human-quote">
                <HeartHandshake size={22} />
                <p>« Un service fiable, des chauffeurs attentionnés. Je me sens en confiance à chaque trajet. »</p>
                <small>Marie D. · Paris</small>
              </div>
            </div>

            <div className="home2-human-copy">
              <p className="home2-section-kicker">Un service à vos côtés</p>
              <h2>Un accompagnement humain à chaque étape</h2>
              <p>
                Nous vous accompagnons avec bienveillance vers vos établissements de soins.
                Notre objectif : vous offrir un trajet simple, rassurant et confortable.
              </p>
              <ul>
                <li><CheckCircle2 size={16} /> Trajets toutes distances</li>
                <li><CheckCircle2 size={16} /> Véhicules confortables et adaptés</li>
                <li><CheckCircle2 size={16} /> Aide à la montée et à l’installation</li>
                <li><CheckCircle2 size={16} /> Ponctualité et discrétion</li>
              </ul>
              <Link to="/qui-sommes-nous" className="home2-dark-btn">
                Découvrir nos engagements <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="home2-commitments">
          <div className="home2-container">
            <div className="home2-section-heading">
              <p>Nos engagements pour votre santé</p>
              <h2>Votre santé mérite une attention particulière</h2>
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
              <p>Vos trajets médicaux</p>
              <h2>Vers tous les établissements de santé</h2>
              <span>Hôpitaux, cliniques, cabinets médicaux et centres de soins en Île-de-France.</span>
            </div>

            <div className="home2-service-grid">
              <article><Stethoscope size={24} /><strong>Consultations médicales</strong><span>Médecine générale et spécialistes</span></article>
              <article><Building2 size={24} /><strong>Hospitalisations</strong><span>Entrées, sorties et transferts</span></article>
              <article><Activity size={24} /><strong>Soins réguliers</strong><span>Dialyse, chimiothérapie, radiothérapie</span></article>
              <article><FileText size={24} /><strong>Examens médicaux</strong><span>IRM, scanner, analyses et radiologie</span></article>
            </div>
          </div>
        </section>

        <section className="home2-final">
          <div className="home2-container home2-final-card">
            <div className="home2-final-visual"><Car size={112} /></div>
            <div className="home2-final-copy">
              <p>Besoin d’un transport médical ?</p>
              <h2>Réservez dès maintenant</h2>
              <span>Notre équipe est disponible pour organiser votre trajet en toute sérénité.</span>
              <div className="home2-final-badges">
                <small><Clock size={13} /> 24h/24 · 7j/7</small>
                <small><ShieldCheck size={13} /> Conventionné CPAM</small>
                <small><Users size={13} /> Équipe à l’écoute</small>
              </div>
            </div>
            <div className="home2-final-actions">
              <Link to="/reservation-taxi-vsl" className="home2-primary-btn">Réserver en ligne <ArrowRight size={16} /></Link>
              <a href="tel:+33650366491" className="home2-outline-btn"><Phone size={16} /> 06 50 36 64 91</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
