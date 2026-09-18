import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
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

interface HomeProps { onNavigate: (page: string) => void; }

const services=[
  ['Consultations médicales','Médecins, spécialistes, centres de soins',Stethoscope],
  ['Hospitalisations','Admissions, sorties et transferts',Building2],
  ['Soins réguliers','Dialyse, chimiothérapie, radiothérapie',HeartHandshake],
  ['Examens médicaux','IRM, scanner, radiologie et analyses',FileText],
];

export default function Home({onNavigate:_onNavigate}:HomeProps){
  return <>
    <SEOHead
      title="Taxi conventionne CPAM & VSL Paris Ile-de-France | Reservation 24h/24"
      description="Taxi conventionne CPAM et VSL a Paris et en Ile-de-France (75, 91, 92, 93, 94). Transport medical assis sur prescription vers consultations, dialyse, chimiotherapie, radiotherapie et hospitalisations. Reservation 24h/24, 7j/7."
      jsonLD={[generateJsonLD()]}
    />

    <div className="v4-page">
      <section className="v4-hero">
        <div className="v4-wrap v4-hero-grid">
          <div className="v4-hero-copy">
            <div className="v4-pill"><ShieldCheck size={15}/> Transport médical conventionné</div>
            <h1>Votre transport médical,<br/><em>en toute sérénité.</em></h1>
            <p className="v4-lead">À Paris et en Île-de-France, nos chauffeurs conventionnés vous accompagnent avec ponctualité, confort et bienveillance pour tous vos rendez-vous de santé.</p>

            <div className="v4-points">
              <span><CheckCircle2/>Conventionné CPAM</span>
              <span><CheckCircle2/>Prise en charge à domicile</span>
              <span><CheckCircle2/>Disponible 24h/24 · 7j/7</span>
            </div>

            <div className="v4-hero-actions">
              <Link to="/reservation-taxi-vsl" className="v4-primary">Réserver mon transport <ArrowRight size={18}/></Link>
              <a href="tel:+33650366491" className="v4-secondary"><Phone size={18}/>06 50 36 64 91</a>
            </div>

            <div className="v4-stats">
              <div><strong>24/7</strong><span>disponibilité</span></div>
              <div><strong>5</strong><span>départements</span></div>
              <div><strong>193+</strong><span>villes desservies</span></div>
            </div>
          </div>

          <div className="v4-hero-image">
            <img src="https://www.rideinbliss.com/sablony/rideinbliss3/imagesrib/2026/senior/senior-transportation-big.jpg" alt="Chauffeur accompagnant une personne âgée" loading="eager" decoding="async"/>
            <div className="v4-photo-overlay"/>
            <div className="v4-photo-card"><ShieldCheck size={18}/><div><strong>Service conventionné</strong><span>Assurance Maladie · CPAM</span></div></div>
          </div>
        </div>

        <div className="v4-wrap v4-reserve-card">
          <div className="v4-reserve-heading"><div><span>Réservation rapide</span><h2>Votre prochain rendez-vous médical ?</h2></div><small>Réponse rapide · Service 24/7</small></div>
          <div className="v4-fields">
            <div><MapPin/><span><small>Départ</small>Votre adresse</span></div>
            <div><Building2/><span><small>Destination</small>Hôpital, clinique, cabinet…</span></div>
            <div><CalendarDays/><span><small>Date</small>Choisir une date</span></div>
            <Link to="/reservation-taxi-vsl">Continuer <ArrowRight size={17}/></Link>
          </div>
        </div>
      </section>

      <section className="v4-trust">
        <div className="v4-wrap v4-trust-grid">
          <div><ShieldCheck/><span><strong>Conventionné CPAM</strong><small>Transport médical agréé</small></span></div>
          <div><Car/><span><strong>Véhicules confortables</strong><small>Propres, récents et adaptés</small></span></div>
          <div><Users/><span><strong>Chauffeurs professionnels</strong><small>À l’écoute et ponctuels</small></span></div>
          <div><MapPin/><span><strong>Toute l’Île-de-France</strong><small>Paris et départements proches</small></span></div>
        </div>
      </section>

      <section className="v4-story">
        <div className="v4-wrap v4-story-grid">
          <div className="v4-story-image">
            <img src="https://ber.berlin-airport.de/en/flying/airlines-ziele/inspiration-urlaub/dest-165-paris.thumb.800.480.png?ck=1761569582" alt="Paris et la tour Eiffel" loading="lazy"/>
            <div className="v4-story-chip"><HeartHandshake/><span>Un accompagnement humain</span></div>
          </div>
          <div className="v4-story-copy">
            <span className="v4-kicker">À vos côtés à chaque étape</span>
            <h2>Plus qu’un trajet,<br/><em>une présence rassurante.</em></h2>
            <p>De votre domicile jusqu’à votre établissement de santé, nous prenons le temps de vous accompagner avec attention. Chaque trajet est organisé pour vous apporter confort, simplicité et tranquillité d’esprit.</p>
            <div className="v4-checks">
              <span><CheckCircle2/>Aide à la montée et à l’installation</span>
              <span><CheckCircle2/>Ponctualité et discrétion</span>
              <span><CheckCircle2/>Trajets toutes distances</span>
              <span><CheckCircle2/>Véhicules confortables</span>
            </div>
            <Link to="/qui-sommes-nous" className="v4-dark">Découvrir notre engagement <ArrowRight size={17}/></Link>
          </div>
        </div>
      </section>

      <section id="services" className="v4-services">
        <div className="v4-wrap">
          <div className="v4-section-head"><span className="v4-kicker">Vos trajets médicaux</span><h2>Des solutions adaptées à vos besoins de santé</h2><p>Un service clair, humain et fiable pour vos rendez-vous médicaux en Île-de-France.</p></div>
          <div className="v4-service-grid">
            {services.map(([title,text,Icon]:any)=><article key={title}><span className="v4-service-icon"><Icon size={25}/></span><h3>{title}</h3><p>{text}</p><Link to="/reservation-taxi-vsl">Réserver <ArrowRight size={15}/></Link></article>)}
          </div>
        </div>
      </section>

      <section className="v4-cta">
        <div className="v4-wrap v4-cta-card">
          <div>
            <span className="v4-kicker">Besoin d’un transport médical ?</span>
            <h2>Organisons votre trajet dès maintenant.</h2>
            <p>Réservation en ligne ou par téléphone. Notre équipe reste disponible 24h/24 et 7j/7.</p>
          </div>
          <div className="v4-cta-actions">
            <Link to="/reservation-taxi-vsl" className="v4-primary">Réserver en ligne <ArrowRight size={18}/></Link>
            <a href="tel:+33650366491" className="v4-secondary"><Phone size={18}/>06 50 36 64 91</a>
          </div>
        </div>
      </section>

      <div className="v4-mobile-bar"><a href="tel:+33650366491"><Phone size={17}/>Appeler</a><Link to="/reservation-taxi-vsl"><CalendarDays size={17}/>Réserver</Link></div>
    </div>
  </>;
}
