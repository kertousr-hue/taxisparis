import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Car,
  Clock3,
  HeartHandshake,
  Building2,
  MapPin,
  Microscope,
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

const services = [
  { icon: Stethoscope, title: 'Consultation médicale', text: 'Tous vos rendez-vous spécialisés' },
  { icon: Activity, title: 'Dialyse', text: 'Trajets réguliers organisés' },
  { icon: HeartHandshake, title: 'Chimiothérapie', text: 'Un accompagnement de confiance' },
  { icon: Building2, title: 'Hospitalisation', text: 'À l’aller comme au retour' },
  { icon: Microscope, title: 'Examens médicaux', text: 'IRM, scanner, analyses et soins' },
  { icon: ShieldCheck, title: 'Transport CPAM', text: 'Selon prescription et prise en charge' },
];

const departments = [
  { code: '75', name: 'Paris', detail: 'Tous les arrondissements', path: '/taxi-conventionne-paris-75' },
  { code: '91', name: 'Essonne', detail: '50+ communes', path: '/taxi-conventionne-essonne-91' },
  { code: '92', name: 'Hauts-de-Seine', detail: '36 communes', path: '/taxi-conventionne-hauts-de-seine-92' },
  { code: '93', name: 'Seine-Saint-Denis', detail: '40 communes', path: '/taxi-conventionne-seine-saint-denis-93' },
  { code: '94', name: 'Val-de-Marne', detail: '47 communes', path: '/taxi-conventionne-val-de-marne-94' },
];

export default function Home({ onNavigate: _onNavigate }: HomeProps) {
  return (
    <>
      <SEOHead
        title="Taxi conventionné CPAM Paris & Île-de-France | 24h/24"
        description="Taxi conventionné CPAM à Paris et en Île-de-France pour consultations, dialyse, chimiothérapie, examens et hospitalisations. Réservation 24h/24 et 7j/7."
        jsonLD={[generateJsonLD()]}
      />

      <div className="maquette-page maquette-home">
        <section className="maquette-home-hero">
          <div className="maquette-container maquette-home-hero-grid">
            <div className="maquette-hero-copy">
              <div className="maquette-kicker">
                <ShieldCheck size={16} />
                Taxis conventionnés CPAM
              </div>

              <h1>Taxis conventionnés CPAM à Paris &amp; en Île-de-France</h1>
              <p className="maquette-lead">
                Vos rendez-vous médicaux, notre priorité. Un transport sûr, confortable et humain,
                disponible 24h/24 et 7j/7.
              </p>

              <div className="maquette-feature-row">
                <span><ShieldCheck size={18} /> Taxis conventionnés CPAM</span>
                <span><MapPin size={18} /> Prise en charge à domicile</span>
                <span><Clock3 size={18} /> 24h/24 · 7j/7</span>
              </div>

              <div className="maquette-hero-actions">
                <Link to="/reservation-taxi-vsl" className="maquette-primary-cta">
                  Réserver mon transport <ArrowRight size={17} />
                </Link>
                <a href="tel:+33650366491" className="maquette-call-cta">
                  <Phone size={17} /> 06 50 36 64 91
                </a>
              </div>
            </div>

            <div className="maquette-hero-visual" aria-label="Illustration transport médical">
              <div className="maquette-city-skyline" aria-hidden="true">
                <span className="maquette-eiffel">♜</span>
                <span className="maquette-hospital"><Building2 size={42} /></span>
              </div>
              <div className="maquette-human-card">
                <div className="maquette-human-icon"><Users size={32} /></div>
                <div>
                  <strong>Un chauffeur à vos côtés</strong>
                  <span>De votre domicile jusqu’à votre établissement de santé.</span>
                </div>
              </div>
              <div className="maquette-car">
                <div className="maquette-car-sign">TAXI</div>
                <Car size={126} strokeWidth={1.35} />
              </div>
              <p className="maquette-script">Paris, toujours près de votre santé</p>
            </div>
          </div>

          <div className="maquette-container">
            <div className="maquette-booking-strip">
              <div className="maquette-booking-title">Votre prochain rendez-vous médical ?</div>
              <div className="maquette-booking-field"><CalendarDays size={16} /><span>Date du trajet</span></div>
              <div className="maquette-booking-field"><MapPin size={16} /><span>Adresse de départ</span></div>
              <div className="maquette-booking-field"><Building2 size={16} /><span>Destination (hôpital, clinique…)</span></div>
              <Link to="/reservation-taxi-vsl" className="maquette-booking-next" aria-label="Réserver">
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </section>

        <section className="maquette-trust-band">
          <div className="maquette-container maquette-trust-grid">
            {[
              [ShieldCheck, 'Conventionné CPAM', 'Transport médical agréé'],
              [Building2, 'Tiers payant', 'Selon votre situation'],
              [Users, 'Chauffeurs professionnels', 'Ponctuels et bienveillants'],
              [MapPin, 'Toute l’Île-de-France', 'Paris et départements proches'],
            ].map(([Icon, title, text]: any) => (
              <article key={title}>
                <span className="maquette-round-icon"><Icon size={20} /></span>
                <div><strong>{title}</strong><span>{text}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="maquette-story-section">
          <div className="maquette-container maquette-story-grid">
            <div className="maquette-story-visual">
              <div className="maquette-paris-shape">PARIS</div>
              <div className="maquette-story-hospital"><Building2 size={54} /></div>
            </div>
            <div>
              <p className="maquette-script maquette-script-dark">Plus qu’un transport,</p>
              <h2>un accompagnement humain</h2>
              <p>
                Nous vous accompagnons avec bienveillance vers vos établissements de soins.
                Nos chauffeurs connaissent les principaux hôpitaux et centres médicaux franciliens.
              </p>
              <Link to="/qui-sommes-nous" className="maquette-secondary-cta">
                Découvrir notre engagement <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="maquette-services-section">
          <div className="maquette-container">
            <div className="maquette-section-heading">
              <p>Nos services de transport médical</p>
              <h2>Des solutions adaptées à tous vos besoins de santé</h2>
            </div>

            <div className="maquette-services-grid">
              {services.map(({ icon: Icon, title, text }) => (
                <article key={title} className="maquette-service-card">
                  <div className="maquette-service-visual"><Icon size={38} /></div>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <ArrowRight size={16} className="maquette-service-arrow" />
                </article>
              ))}
            </div>

            <div className="maquette-service-banner">
              <div className="maquette-driver"><Users size={33} /></div>
              <div>
                <strong>Des chauffeurs formés et bienveillants</strong>
                <span>Pour vous accompagner à chaque étape.</span>
              </div>
              <Link to="/services-transport-medical" className="maquette-gold-link">
                Découvrir nos engagements <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="maquette-zone-section">
          <div className="maquette-container maquette-zone-grid">
            <div className="maquette-idf-map" aria-label="Carte stylisée Île-de-France">
              <div className="idf-block idf-75">75</div>
              <div className="idf-block idf-91">91</div>
              <div className="idf-block idf-92">92</div>
              <div className="idf-block idf-93">93</div>
              <div className="idf-block idf-94">94</div>
              <div className="idf-block idf-77">77</div>
              <div className="idf-block idf-78">78</div>
              <div className="idf-block idf-95">95</div>
            </div>

            <div>
              <div className="maquette-section-heading maquette-section-heading-left">
                <p>Nos zones desservies</p>
                <h2>Partout en Île-de-France pour vos trajets médicaux</h2>
              </div>
              <div className="maquette-department-list">
                {departments.map((department) => (
                  <Link key={department.code} to={department.path}>
                    <span className="maquette-dept-code">{department.code}</span>
                    <span><strong>{department.name}</strong><small>{department.detail}</small></span>
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
              <Link to="/zones-desservies" className="maquette-primary-cta maquette-zone-cta">
                Voir toutes les villes <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="maquette-final-cta">
          <div className="maquette-container">
            <div>
              <p className="maquette-script">Votre santé, notre route</p>
              <h2>Besoin d’un transport médical ?</h2>
              <span>Réservez dès maintenant ou contactez-nous pour organiser votre trajet.</span>
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
