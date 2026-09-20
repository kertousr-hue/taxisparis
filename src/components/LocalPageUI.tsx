import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, ChevronRight, Clock3, FileText, MapPin, Phone, ShieldCheck } from 'lucide-react';
import boundaries from '../data/coverageMap.json';
import './LocalPages.css';

type Breadcrumb = { label: string; href?: string };

export function LocalHero({ name, code, postalCode, preposition = 'à', description, breadcrumbs, count }: {
  name: string;
  code: string;
  postalCode?: string;
  preposition?: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  count?: number;
}) {
  return (
    <header className="lp-hero">
      <div className="lp-container">
        <nav className="lp-breadcrumbs" aria-label="Fil d’Ariane">
          <Link to="/">Accueil</Link>
          {breadcrumbs.map(({ label, href }) => <span key={label}><ChevronRight size={12} aria-hidden="true" />{href ? <Link to={href}>{label}</Link> : <span aria-current="page">{label}</span>}</span>)}
        </nav>
        <div className="lp-hero-grid">
          <div className="lp-hero-copy">
            <p className="lp-eyebrow">Transport médical conventionné</p>
            <h1>Taxi conventionné <span>{preposition} {name}</span><small>({postalCode || code})</small></h1>
            <p className="lp-hero-description">{description}</p>
            <div className="lp-actions">
              <Link to="/reservation-taxi-vsl" className="lp-button lp-button-gold"><CalendarDays size={17} aria-hidden="true" /> Réserver mon trajet <ArrowRight size={17} aria-hidden="true" /></Link>
              <a href="tel:+33650366491" className="lp-button lp-button-outline"><Phone size={17} aria-hidden="true" /> 06 50 36 64 91</a>
            </div>
            <div className="lp-hero-note"><ShieldCheck size={17} aria-hidden="true" /> Prise en charge CPAM selon votre situation</div>
          </div>

          <div className="lp-area-card">
            <div className="lp-area-top"><span><MapPin size={15} aria-hidden="true" /> Île-de-France</span><span>Département {code}</span></div>
            <svg className="lp-area-map" viewBox="40 -20 710 550" role="img" aria-label={`Localisation du département ${code} en Île-de-France`}>
              {boundaries.filter((area) => area.code !== code).map((area) => <path key={area.code} className="lp-area-background" d={area.path} />)}
              <path className="lp-area-selected" d={boundaries.find((area) => area.code === code)?.path} />
              <text className="lp-area-code" x="90" y="440" aria-hidden="true">{code}</text>
            </svg>
            <div className="lp-area-bottom"><div><span>{postalCode ? 'Votre départ' : 'Votre département'}</span><strong>{name}</strong></div><div className="lp-area-count"><strong>{postalCode || count}</strong><span>{postalCode ? 'code postal' : code === '75' ? 'arrondissements' : 'villes desservies'}</span></div></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function LocalTrust() {
  return <div className="lp-trust"><div className="lp-container lp-trust-grid">
    <div><ShieldCheck size={23} aria-hidden="true" /><span><strong>Conventionné CPAM</strong><small>Sur prescription, selon éligibilité</small></span></div>
    <div><MapPin size={23} aria-hidden="true" /><span><strong>De porte à porte</strong><small>Du domicile à l’établissement de soins</small></span></div>
    <div><Clock3 size={23} aria-hidden="true" /><span><strong>À votre écoute 7j/7</strong><small>Pour organiser votre rendez-vous</small></span></div>
  </div></div>;
}

export function LocalSectionNav({ items }: { items: Array<{ id: string; label: string }> }) {
  return <nav className="lp-section-nav" aria-label="Dans cette page"><div className="lp-container"><span>Dans cette page</span>{items.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}<ArrowRight size={13} aria-hidden="true" /></a>)}</div></nav>;
}

export function LocalBookingAside({ locality, departmentName, departmentSlug }: { locality: string; departmentName: string; departmentSlug: string }) {
  return <aside className="lp-sidebar" aria-label="Organiser votre transport">
    <div className="lp-booking-panel">
      <span className="lp-eyebrow">Parlons de votre trajet</span>
      <h2>Un rendez-vous<br />à organiser ?</h2>
      <p>Préparez votre transport depuis {locality} avec notre équipe.</p>
      <a className="lp-booking-phone" href="tel:+33650366491"><Phone size={20} aria-hidden="true" /><span><small>Appelez-nous</small><strong>06 50 36 64 91</strong></span></a>
      <Link className="lp-button lp-button-gold" to="/reservation-taxi-vsl">Réserver en ligne <ArrowRight size={17} aria-hidden="true" /></Link>
      <span className="lp-booking-note">Votre horaire et votre prise en charge sont à confirmer lors de la réservation.</span>
    </div>
    <div className="lp-document-note"><FileText size={22} aria-hidden="true" /><div><h3>Pour préparer votre trajet</h3><p>Prescription de transport, carte Vitale, adresse et horaire du rendez-vous.</p><a href="https://www.ameli.fr/assure/remboursements/rembourse/frais-transport" target="_blank" rel="noopener noreferrer">Conditions de prise en charge <ArrowRight size={13} aria-hidden="true" /></a></div></div>
    <Link to={`/${departmentSlug}`} className="lp-back-department"><MapPin size={18} aria-hidden="true" /><span>Toutes nos villes<strong>{departmentName}</strong></span><ArrowRight size={17} aria-hidden="true" /></Link>
  </aside>;
}

export function LocalParagraphs({ text, lead = false }: { text: string; lead?: boolean }) {
  return <div className={`lp-prose${lead ? ' lp-prose-lead' : ''}`}>{text.replace(/\\n/g, '\n').trim().split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;
}

export function LocalFAQ({ title, items }: { title: string; items: Array<{ q: string; a: string }> }) {
  return <section id="questions" className="lp-section lp-faq-section"><div className="lp-section-heading"><p className="lp-eyebrow">Pour vous guider</p><h2>{title}</h2></div><dl className="lp-faq-grid">{items.map(({ q, a }, index) => <div key={q}><dt><span>{String(index + 1).padStart(2, '0')}</span>{q}</dt><dd>{a}</dd></div>)}</dl></section>;
}

export function LocalClosing({ locality }: { locality: string }) {
  return <section className="lp-closing"><div className="lp-container"><div><p className="lp-eyebrow">Votre prochain rendez-vous</p><h2>Votre transport depuis {locality},<br />en toute simplicité.</h2><p>Indiquez-nous votre départ, votre destination et l’heure de vos soins.</p></div><div className="lp-actions"><Link className="lp-button lp-button-gold" to="/reservation-taxi-vsl"><CalendarDays size={17} aria-hidden="true" /> Réserver mon trajet</Link><a className="lp-button lp-button-outline" href="tel:+33650366491"><Phone size={17} aria-hidden="true" /> 06 50 36 64 91</a></div></div></section>;
}

export function LocalChecklist({ items }: { items: string[] }) {
  return <ul className="lp-checklist">{items.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>;
}
