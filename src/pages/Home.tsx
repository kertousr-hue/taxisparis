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

const reassurance = [
  { icon: ShieldCheck, title: 'Conventionné CPAM', text: 'Transport médical agréé' },
  { icon: Car, title: 'Véhicules confortables', text: 'Propres, récents et adaptés' },
  { icon: FileText, title: 'Prise en charge CPAM', text: 'Selon prescription et situation' },
  { icon: MapPin, title: 'Toute l’Île-de-France', text: 'Paris et départements proches' },
];

const commitments = [
  { icon: ShieldCheck, title: 'Sécurité', text: 'Une prise en charge sérieuse et ponctuelle.' },
  { icon: Car, title: 'Confort', text: 'Des véhicules adaptés à vos trajets médicaux.' },
  { icon: Users, title: 'À votre écoute', text: 'Des chauffeurs attentionnés et bienveillants.' },
  { icon: Clock, title: 'Disponibilité', text: 'Service organisé 24h/24 et 7j/7.' },
];

export default function Home({ onNavigate: _onNavigate }: HomeProps) {
  return (
    <>
      <SEOHead
        title="Taxi conventionné CPAM Paris & Île-de-France | Réservation 24h/24"
        description="Taxi conventionné CPAM à Paris et en Île-de-France. Transport médical assis pour consultations, dialyse, chimiothérapie, examens et hospitalisations. Réservation 24h/24 et 7j/7."
        jsonLD={[generateJsonLD()]}
      />

      <div className="home2-page">
        <section className="home2-hero">
          <div className="home2-container home2-hero-grid">
            <div className="home2-hero-copy">
              <p className="home2-eyebrow">Transport médical conventionné</p>
              <h1>Vos rendez-vous médicaux<br />en toute sérénité</h1>
              <p className="home2-hero-lead">
                À Paris et en Île-de-France, des chauffeurs conventionnés vous accompagnent
                pour tous vos trajets de santé avec ponctualité, confort et bienveillance.
              </p>

              <div className="home2-hero-points">
                <span><ShieldCheck size={18} /> Conventionné CPAM</span>
                <span><CheckCircle2 size={18} /> Prise en charge à domicile</span>
                <span><Users size={18} /> Chauffeurs professionnels</span>
                <span><HeartHandshake size={18} /> Accompagnement humain</span>
              </div>

              <div className="home2-hero-actions">
                <Link to="/reservation-taxi-vsl" className="home2-primary-btn">
                  Réserver mon transport <ArrowRight size={17} />
                </Link>
                <a href="tel:+33650366491" className="home2-outline-btn">
                  <Phone size={17} /> 06 50 36 64 91
                </a>
              </div>

              <div className="home2-availability">
                <Clock size={15} /> Disponible 24h/24 · 7j/7
              </div>
            </div>

            <div className="home2-hero-visual" aria-label="Transport médical à Paris">
              <div className="home2-visual-skyline" aria-hidden="true">
                <span className="home2-tower">A</span>
                <span className="home2-building"><Building2 size={56} /></span>
              </div>

              <div className="home2-care-scene">
                <div className="home2-care-people">
                  <div className="home2-care-person home2-care-person-driver"><Users size={38} /></div>
                  <div className="home2-care-person home2-care-person-passenger"><HeartHandshake size={34} /></div>
                </div>

                <div className="home2-car">
                  <div className="home2-car-roof">TAXI</div>
                  <Car size={152} strokeWidth={1.25} />
                </div>
              </div>

              <p className="home2-script-note">Parce que votre santé compte</p>
            </div>
          </div>

          <div className="home2-container">
            <div className="home2-booking-card">
              <div className="home2-booking-heading">
                <p>Réservez votre transport médical</p>
                <span>Simple, rapide et sécurisé</span>
              </div>

              <div className="home2-booking-tabs">
                <span className="is-active">Trajet simple</span>
                <span>Aller-retour</span>
                <span>Rendez-vous régulier</span>
              </div>

              <div className="home2-booking-fields">
                <div><MapPin size={16} /><span><small>Adresse de départ</small>Votre adresse</span></div>
                <div><Building2 size={16} /><span><small>Destination</small>Hôpital, clinique, cabinet…</span></div>
                <div><CalendarDays size={16} /><span><small>Date du trajet</small>Choisir une date</span></div>
                <Link to="/reservation-taxi-vsl" aria-label="Continuer vers la réservation"><ArrowRight size={20} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="home2-reassurance">
          <div className="home2-container home2-reassurance-grid">
            {reassurance.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span><Icon size={20} /></span>
                <div><strong>{title}</strong><small>{text}</small></div>
              </article>
            ))}
          </div>
        </section>

        <section className="home2-human">
          <div className="home2-container home2-human-grid">
            <div className="home2-human-visual" aria-hidden="true">
              <div className="home2-paris-river" />
              <div className="home2-mini-tower">A</div>
              <div className="home2-human-badge">
                <HeartHandshake size={26} />
                <span>Présents à chaque étape</span>
              </div>
            </div>

            <div className="home2-human-copy">
              <p className="home2-section-kicker">Un service à vos côtés</p>
              <h2>Un accompagnement humain à chaque étape</h2>
              <p>
                Nous vous accompagnons avec bienveillance, de votre domicile jusqu’à votre
                établissement de soins. Notre objectif : vous offrir un trajet simple, rassurant et confortable.
              </p>

              <ul>
                <li><CheckCircle2 size={17} /> Trajets toutes distances</li>
                <li><CheckCircle2 size={17} /> Véhicules confortables et adaptés</li>
                <li><CheckCircle2 size={17} /> Aide à la montée et à l’installation</li>
                <li><CheckCircle2 size={17} /> Ponctualité et discrétion</li>
              </ul>

              <Link to="/qui-sommes-nous" className="home2-dark-btn">
                Découvrir notre engagement <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="home2-commitments">
          <div className="home2-container">
            <div className="home2-section-heading">
              <p>Nos engagements</p>
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

        <section className="home2-health-destinations">
          <div className="home2-container">
            <div className="home2-section-heading">
              <p>Vos trajets médicaux</p>
              <h2>Vers tous les établissements de santé</h2>
              <span>Hôpitaux, cliniques, cabinets médicaux et centres de soins en Île-de-France.</span>
            </div>

            <div className="home2-destination-grid">
              <article><Stethoscope size={24} /><strong>Consultations médicales</strong><span>Médecine générale et spécialistes</span></article>
              <article><Building2 size={24} /><strong>Hospitalisations</strong><span>Entrées, sorties et transferts</span></article>
              <article><Activity size={24} /><strong>Soins réguliers</strong><span>Dialyse, chimiothérapie, radiothérapie</span></article>
              <article><FileText size={24} /><strong>Examens médicaux</strong><span>IRM, scanner, analyses et radiologie</span></article>
            </div>
          </div>
        </section>

        <section className="home2-final-cta">
          <div className="home2-container home2-final-grid">
            <div className="home2-final-car">
              <Car size={122} />
            </div>
            <div>
              <p>Besoin d’un transport médical ?</p>
              <h2>Réservez dès maintenant</h2>
              <span>Une équipe disponible pour organiser votre trajet médical en toute sérénité.</span>
            </div>
            <div className="home2-final-actions">
              <Link to="/reservation-taxi-vsl" className="home2-primary-btn">
                Réserver en ligne <ArrowRight size={16} />
              </Link>
              <a href="tel:+33650366491" className="home2-outline-btn">
                <Phone size={16} /> 06 50 36 64 91
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
