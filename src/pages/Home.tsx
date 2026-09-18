import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Building2,
  Calendar,
  Car,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  HeartPulse,
  MapPin,
  Microscope,
  Phone,
  Shield,
  Stethoscope,
  Users,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { generateJsonLD } from '../utils/seoData';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    icon: Stethoscope,
    eyebrow: 'Consultations',
    title: 'Rendez-vous médicaux',
    text: 'Médecins, spécialistes, centres de santé et consultations de suivi.',
  },
  {
    icon: Activity,
    eyebrow: 'Soins réguliers',
    title: 'Dialyse & traitements',
    text: 'Des trajets récurrents organisés avec ponctualité et sérénité.',
  },
  {
    icon: HeartPulse,
    eyebrow: 'Oncologie',
    title: 'Chimiothérapie & radiothérapie',
    text: 'Un accompagnement discret, confortable et adapté à vos séances.',
  },
  {
    icon: Building2,
    eyebrow: 'Hôpital',
    title: 'Hospitalisations',
    text: 'Admissions, sorties et transferts entre établissements de santé.',
  },
  {
    icon: Microscope,
    eyebrow: 'Examens',
    title: 'IRM, scanner & analyses',
    text: 'Transport assis pour vos examens médicaux et rendez-vous techniques.',
  },
  {
    icon: Shield,
    eyebrow: 'CPAM',
    title: 'Taxi conventionné',
    text: 'Prise en charge possible sur prescription médicale selon votre situation.',
  },
];

const departments = [
  { code: '75', name: 'Paris', count: '20 arrondissements', path: '/taxi-conventionne-paris-75' },
  { code: '91', name: 'Essonne', count: '50 villes', path: '/taxi-conventionne-essonne-91' },
  { code: '92', name: 'Hauts-de-Seine', count: '36 communes', path: '/taxi-conventionne-hauts-de-seine-92' },
  { code: '93', name: 'Seine-Saint-Denis', count: '40 communes', path: '/taxi-conventionne-seine-saint-denis-93' },
  { code: '94', name: 'Val-de-Marne', count: '47 communes', path: '/taxi-conventionne-val-de-marne-94' },
];

const faqs = [
  {
    question: 'Comment réserver un taxi conventionné ?',
    answer: 'Réservez en ligne via notre formulaire ou appelez le 06 50 36 64 91. Pour un rendez-vous programmé, prévoyez de préférence votre demande à l’avance.',
  },
  {
    question: 'Quels documents dois-je fournir ?',
    answer: 'Selon votre situation, prévoyez votre prescription médicale de transport, votre carte Vitale à jour et les justificatifs nécessaires à votre prise en charge.',
  },
  {
    question: 'Le tiers payant est-il disponible ?',
    answer: 'Le tiers payant peut être appliqué lorsque les conditions de prise en charge par l’Assurance Maladie sont réunies.',
  },
  {
    question: 'Intervenez-vous le week-end et les jours fériés ?',
    answer: 'Oui. Le service est disponible 24h/24 et 7j/7, y compris les week-ends et jours fériés.',
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

      <div className="refonte-home">
        <section className="refonte-hero">
          <div className="refonte-container refonte-hero-grid">
            <div className="refonte-hero-copy">
              <div className="refonte-eyebrow">
                <span />
                Transport médical conventionné
              </div>
              <h1>
                Vos trajets de santé,
                <em>pensés autrement.</em>
              </h1>
              <p>
                Taxi conventionné CPAM et VSL à Paris et en Île-de-France.
                Un service humain, ponctuel et confortable pour vos rendez-vous médicaux.
              </p>

              <div className="refonte-hero-actions">
                <Link to="/reservation-taxi-vsl" className="refonte-primary">
                  Réserver mon transport <ArrowRight size={17} />
                </Link>
                <a href="tel:+33650366491" className="refonte-secondary">
                  <Phone size={16} /> 06 50 36 64 91
                </a>
              </div>

              <div className="refonte-hero-trust">
                <span><Shield size={16} /> Conventionné CPAM</span>
                <span><Clock size={16} /> 24h/24 · 7j/7</span>
                <span><MapPin size={16} /> Paris & Île-de-France</span>
              </div>
            </div>

            <div className="refonte-hero-media">
              <img
                src="https://images.unsplash.com/photo-1645178199933-dba13d055d02?auto=format&fit=crop&fm=jpg&q=82&w=1800"
                alt="Tour Eiffel à Paris"
                loading="eager"
                decoding="async"
              />
              <div className="refonte-hero-media-overlay" />
              <div className="refonte-hero-float">
                <span className="refonte-icon-pill"><Car size={20} /></span>
                <div>
                  <strong>Une prise en charge de proximité</strong>
                  <small>De votre domicile jusqu’à votre établissement de santé</small>
                </div>
              </div>
              <div className="refonte-hero-number">
                <strong>193</strong>
                <span>villes desservies</span>
              </div>
            </div>
          </div>

          <div className="refonte-container refonte-reservation-wrap">
            <div className="refonte-reservation-card">
              <div className="refonte-reservation-title">
                <span>Réservation rapide</span>
                <h2>Organisons votre prochain trajet</h2>
              </div>

              <div className="refonte-reservation-fields">
                <div><MapPin size={17} /><span><small>Départ</small>Votre adresse</span></div>
                <div><Building2 size={17} /><span><small>Destination</small>Hôpital, clinique, cabinet…</span></div>
                <div><Calendar size={17} /><span><small>Date</small>Choisir une date</span></div>
                <Link to="/reservation-taxi-vsl" aria-label="Continuer vers la réservation">
                  Continuer <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="refonte-intro">
          <div className="refonte-container refonte-intro-grid">
            <div>
              <span className="refonte-kicker">Transport médical en taxi conventionné & VSL</span>
              <h2>Un service de santé qui commence dès votre porte.</h2>
            </div>
            <div className="refonte-intro-copy">
              <p>
                Nous organisons vos déplacements médicaux sur Paris (75), l’Essonne (91),
                les Hauts-de-Seine (92), la Seine-Saint-Denis (93) et le Val-de-Marne (94).
              </p>
              <div className="refonte-intro-points">
                <span><CheckCircle size={16} /> Chauffeurs professionnels</span>
                <span><CheckCircle size={16} /> Véhicules confortables</span>
                <span><CheckCircle size={16} /> Accompagnement attentif</span>
                <span><CheckCircle size={16} /> Réservation simple</span>
              </div>
            </div>
          </div>
        </section>

        <section className="refonte-services">
          <div className="refonte-container">
            <div className="refonte-section-head">
              <div>
                <span className="refonte-kicker">Nos services</span>
                <h2>Des trajets adaptés à votre parcours de soins.</h2>
              </div>
              <Link to="/reservation-taxi-vsl">Réserver un trajet <ArrowRight size={15} /></Link>
            </div>

            <div className="refonte-services-grid">
              {services.map(({ icon: Icon, eyebrow, title, text }, index) => (
                <article key={title} className={index === 0 || index === 3 ? 'is-large' : ''}>
                  <div className="refonte-service-top">
                    <span className="refonte-service-icon"><Icon size={21} /></span>
                    <span className="refonte-service-index">0{index + 1}</span>
                  </div>
                  <span className="refonte-service-eyebrow">{eyebrow}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link to="/reservation-taxi-vsl" aria-label={`Réserver pour ${title}`}>
                    <ArrowRight size={17} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="refonte-process">
          <div className="refonte-container refonte-process-grid">
            <div className="refonte-process-card">
              <span className="refonte-kicker">Simple & rassurant</span>
              <h2>Votre transport en 3 étapes.</h2>
              <div className="refonte-process-steps">
                <div><strong>01</strong><span><b>Réservez</b>Indiquez votre trajet et votre rendez-vous.</span></div>
                <div><strong>02</strong><span><b>Nous confirmons</b>Votre prise en charge est organisée.</span></div>
                <div><strong>03</strong><span><b>Voyagez sereinement</b>Votre chauffeur vous accompagne.</span></div>
              </div>
            </div>

            <div className="refonte-process-visual">
              <div className="refonte-process-visual-top">
                <span><Users size={22} /></span>
                <p>« Une présence humaine, pas simplement une course. »</p>
              </div>
              <div className="refonte-process-stats">
                <div><strong>24/7</strong><span>Disponibilité</span></div>
                <div><strong>5</strong><span>Départements</span></div>
                <div><strong>193</strong><span>Villes</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="refonte-zones">
          <div className="refonte-container">
            <div className="refonte-section-head">
              <div>
                <span className="refonte-kicker">Zones desservies</span>
                <h2>Une couverture locale, partout autour de Paris.</h2>
              </div>
              <Link to="/zones-desservies">Voir toutes les zones <ArrowRight size={15} /></Link>
            </div>

            <div className="refonte-zones-grid">
              {departments.map((department) => (
                <Link key={department.code} to={department.path}>
                  <span className="refonte-zone-code">{department.code}</span>
                  <div><strong>{department.name}</strong><small>{department.count}</small></div>
                  <ArrowRight size={17} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="refonte-faq">
          <div className="refonte-container refonte-faq-grid">
            <div>
              <span className="refonte-kicker">Questions fréquentes</span>
              <h2>Les réponses essentielles avant votre trajet.</h2>
              <p>Besoin d’une réponse immédiate ? Notre équipe est disponible par téléphone.</p>
              <a href="tel:+33650366491" className="refonte-secondary dark"><Phone size={15} /> 06 50 36 64 91</a>
            </div>

            <div className="refonte-faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>{faq.question}<ChevronDown size={17} /></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="refonte-final">
          <div className="refonte-container refonte-final-card">
            <div>
              <span>Votre prochain rendez-vous</span>
              <h2>Un trajet médical à organiser ?</h2>
              <p>Réservez en ligne ou contactez-nous directement. Notre équipe vous répond 24h/24 et 7j/7.</p>
            </div>
            <div>
              <Link to="/reservation-taxi-vsl" className="refonte-primary">Réserver en ligne <ArrowRight size={17} /></Link>
              <a href="tel:+33650366491" className="refonte-secondary"><Phone size={16} /> Appeler</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
